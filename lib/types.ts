export interface Event {
  id: string
  timestamp: string
  source: string
  destination: string
  type: string
  subtype: string
  severity: string
  confidence: number
  details: string
  user: string
  hostname: string
  protocol: string
  application: string
  country: string
  department: string
  tags: string[]
}
