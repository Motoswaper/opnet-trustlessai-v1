# TrustlessAI v1 — Indexer Schema

## Tables

### jobs
- id
- creator
- worker
- paymentAmount
- promptHash
- resultHash
- status
- createdAtBlock
- completedAtBlock

### job_events
- id
- jobId
- eventType
- blockNumber
- txHash
- timestamp
