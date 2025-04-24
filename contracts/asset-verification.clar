;; Asset Verification Contract
;; Records details of available equipment

;; Define data variables
(define-data-var last-asset-id uint u0)

;; Define data maps
(define-map assets
  { asset-id: uint }
  {
    asset-type: (string-utf8 50),
    condition: (string-utf8 20),
    available: bool,
    owner: principal
  }
)

;; Add a new asset
(define-public (add-asset (asset-type (string-utf8 50)) (condition (string-utf8 20)))
  (let
    (
      (new-id (+ (var-get last-asset-id) u1))
    )
    (var-set last-asset-id new-id)
    (map-set assets
      { asset-id: new-id }
      {
        asset-type: asset-type,
        condition: condition,
        available: true,
        owner: tx-sender
      }
    )
    (ok new-id)
  )
)

;; Update asset availability
(define-public (set-availability (asset-id uint) (is-available bool))
  (let
    (
      (asset (unwrap! (map-get? assets { asset-id: asset-id }) (err u1)))
    )
    (asserts! (is-eq tx-sender (get owner asset)) (err u2))
    (map-set assets
      { asset-id: asset-id }
      (merge asset { available: is-available })
    )
    (ok true)
  )
)

;; Get asset details
(define-read-only (get-asset (asset-id uint))
  (map-get? assets { asset-id: asset-id })
)

;; Check if asset is available
(define-read-only (is-asset-available (asset-id uint))
  (default-to false (get available (map-get? assets { asset-id: asset-id })))
)
