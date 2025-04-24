
import { describe, expect, it } from "vitest";

const accounts = simnet.getAccounts();
const address1 = accounts.get("wallet_1")!;

/*
  The test below is an example. To learn more, read the testing documentation here:
  https://docs.hiro.so/stacks/clarinet-js-sdk
*/

describe("example tests", () => {
  it("ensures simnet is well initalised", () => {
    expect(simnet.blockHeight).toBeDefined();
  });

  // it("shows an example", () => {
  //   const { result } = simnet.callReadOnlyFn("counter", "get-counter", [], address1);
  //   expect(result).toBeUint(0);
  // });
});
import { describe, it, expect, beforeEach } from "vitest"

// Mock the Clarity contract environment
const mockTxSender = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"
const mockContract = {
  lastAssetId: 0,
  assets: new Map(),
  
  addAsset(assetType, condition) {
    const newId = this.lastAssetId + 1
    this.lastAssetId = newId
    
    this.assets.set(newId, {
      assetType,
      condition,
      available: true,
      owner: mockTxSender,
    })
    
    return { ok: newId }
  },
  
  setAvailability(assetId, isAvailable) {
    if (!this.assets.has(assetId)) {
      return { err: 1 }
    }
    
    const asset = this.assets.get(assetId)
    if (asset.owner !== mockTxSender) {
      return { err: 2 }
    }
    
    asset.available = isAvailable
    this.assets.set(assetId, asset)
    
    return { ok: true }
  },
  
  getAsset(assetId) {
    return this.assets.get(assetId) || null
  },
  
  isAssetAvailable(assetId) {
    const asset = this.assets.get(assetId)
    return asset ? asset.available : false
  },
}

describe("Asset Verification Contract", () => {
  beforeEach(() => {
    mockContract.lastAssetId = 0
    mockContract.assets = new Map()
  })
  
  it("should add a new asset", () => {
    const result = mockContract.addAsset("Excavator", "Good")
    
    expect(result).toEqual({ ok: 1 })
    expect(mockContract.lastAssetId).toBe(1)
    expect(mockContract.assets.size).toBe(1)
    
    const asset = mockContract.getAsset(1)
    expect(asset).toEqual({
      assetType: "Excavator",
      condition: "Good",
      available: true,
      owner: mockTxSender,
    })
  })
  
  it("should update asset availability", () => {
    mockContract.addAsset("Bulldozer", "Excellent")
    
    const result = mockContract.setAvailability(1, false)
    
    expect(result).toEqual({ ok: true })
    expect(mockContract.isAssetAvailable(1)).toBe(false)
    
    const asset = mockContract.getAsset(1)
    expect(asset.available).toBe(false)
  })
  
  it("should fail to update availability for non-existent asset", () => {
    const result = mockContract.setAvailability(999, false)
    
    expect(result).toEqual({ err: 1 })
  })
  
  it("should check if asset is available", () => {
    mockContract.addAsset("Crane", "Fair")
    
    expect(mockContract.isAssetAvailable(1)).toBe(true)
    
    mockContract.setAvailability(1, false)
    
    expect(mockContract.isAssetAvailable(1)).toBe(false)
  })
})
