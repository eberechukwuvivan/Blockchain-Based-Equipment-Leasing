# Blockchain-Based Equipment Leasing System

A decentralized application for managing equipment leasing using blockchain technology. This system provides transparent, secure, and efficient management of equipment leasing operations through smart contracts.

## Overview

This system leverages blockchain technology to create a trustless equipment leasing platform where asset owners can lease their equipment to verified lessees. The system handles the entire leasing lifecycle including asset registration, lessee verification, lease agreement management, usage tracking, and maintenance scheduling.

## Features

- **Asset Management**: Register and track equipment details
- **Lessee Verification**: Validate and rate equipment renters
- **Lease Agreements**: Create and manage lease terms and conditions
- **Usage Tracking**: Monitor equipment utilization
- **Maintenance Scheduling**: Schedule and track equipment maintenance

## Smart Contracts

The system consists of five main Clarity contracts:

1. **Asset Verification Contract** (`asset-verification.clar`)
    - Records details of available equipment (type, condition, availability)
    - Manages equipment availability status
    - Provides functions to add new assets and query asset information

2. **Lessee Verification Contract** (`lessee-verification.clar`)
    - Validates qualified renters
    - Maintains lessee ratings and verification status
    - Provides registration and verification functionality

3. **Lease Agreement Contract** (`lease-agreement.clar`)
    - Manages terms and conditions of leases
    - Handles lease creation and termination
    - Enforces verification checks before lease creation

4. **Usage Tracking Contract** (`usage-tracking.clar`)
    - Monitors equipment utilization
    - Tracks total usage hours
    - Ensures only authorized lessees can log usage

5. **Maintenance Scheduling Contract** (`maintenance-scheduling.clar`)
    - Manages service requirements
    - Schedules and tracks maintenance events
    - Records maintenance history

## Contract Interactions

The contracts interact with each other to provide a complete leasing solution:

- The **Lease Agreement Contract** checks with the **Asset Verification Contract** to ensure an asset is available before creating a lease
- The **Lease Agreement Contract** verifies with the **Lessee Verification Contract** that a lessee is verified before allowing them to lease equipment
- The **Usage Tracking Contract** references the **Lease Agreement Contract** to ensure only the current lessee can log usage
- The **Maintenance Scheduling Contract** interacts with the **Asset Verification Contract** to ensure only the asset owner can schedule maintenance

## Getting Started

### Prerequisites

- Clarity development environment
- Stacks blockchain node (for deployment)

### Installation

1. Clone the repository

Here's a comprehensive README for the blockchain-based equipment leasing system:

```markdown project="Equipment Leasing" file="README.md"
...
```

git clone [https://github.com/yourusername/blockchain-equipment-leasing.git](https://github.com/yourusername/blockchain-equipment-leasing.git)

```plaintext

2. Deploy the contracts to your Clarity-compatible blockchain

## Usage Examples

### Register an Asset
```clarity
(contract-call? .asset-verification add-asset "Excavator" "Excellent")
```

### Register as a Lessee

```plaintext
(contract-call? .lessee-verification register-lessee "Company Name")
```

### Verify a Lessee (by contract owner)

```plaintext
(contract-call? .lessee-verification verify-lessee 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM true)
```

### Create a Lease

```plaintext
(contract-call? .lease-agreement create-lease u1 u30 u1000)
```

### Log Equipment Usage

```plaintext
(contract-call? .usage-tracking log-usage u1 u8 "Used for excavation")
```

### Schedule Maintenance

```plaintext
(contract-call? .maintenance-scheduling schedule-maintenance u1 u150 "Regular service")
```

### Complete Scheduled Maintenance

```plaintext
(contract-call? .maintenance-scheduling complete-maintenance u1)
```

### Terminate a Lease

```plaintext
(contract-call? .lease-agreement terminate-lease u1)
```

## Testing

Run the tests using Vitest:

```plaintext
npm test
```

The test suite includes unit tests for each contract, covering the core functionality and edge cases.

## Security Considerations

- All critical functions include ownership checks to ensure only authorized users can perform certain actions
- Asset availability is enforced at the contract level to prevent double-leasing
- Lessee verification ensures only qualified renters can lease equipment
- All contract interactions are recorded on the blockchain for transparency and auditability


## Future Enhancements

- Payment handling functionality
- Dispute resolution mechanisms
- Insurance tracking
- Enhanced reporting capabilities
- Integration with IoT devices for automated usage tracking


## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## Contact

Project Link: [https://github.com/yourusername/blockchain-equipment-leasing](https://github.com/yourusername/blockchain-equipment-leasing)

```plaintext

This README provides a comprehensive overview of your blockchain-based equipment leasing system, including detailed explanations of each contract, usage examples, and future enhancement possibilities. It's designed to help users understand the system architecture and how to interact with the contracts.

<Actions>
  <Action name="Create PR details file" description="Create a detailed PR description file for the project" />
  <Action name="Add payment handling contract" description="Implement a contract for handling lease payments" />
  <Action name="Create a dispute resolution contract" description="Add a contract to handle disputes between lessors and lessees" />
  <Action name="Add more comprehensive tests" description="Expand test suite to cover more edge cases and integration tests" />
  <Action name="Create a frontend UI" description="Develop a web interface for interacting with the contracts" />
</Actions>


```
