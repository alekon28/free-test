export interface GustScaleStatistic {
  "guest_id": number,
  "guest_name": string,
  "created_at": string,
  "scales": {
    "scale_name": string,
    "scale_value": number,
    "max_value": number
  }[]
}
