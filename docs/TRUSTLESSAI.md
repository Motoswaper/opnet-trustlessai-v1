# TrustlessAI v1 — OP_NET Deterministic AI Job Protocol

TrustlessAI is a deterministic, fail‑safe AI job marketplace for OP_NET.

Workers run AI models off‑chain.  
The contract handles:

- job creation
- escrow of OP20 tokens
- worker assignment
- result commitments (hashes)
- payouts
- cancellation rules

No AI runs on‑chain.  
Only **money + commitments + events**.

## Job Lifecycle

1. Creator calls `createJob(promptHash, paymentAmount)`
2. Worker calls `acceptJob(jobId)`
3. Worker computes AI output off‑chain
4. Worker calls `submitResult(jobId, resultHash)`
5. Contract pays worker in OP20

## Methods

- `init(token: Address)`
- `createJob(promptHash: string, paymentAmount: u64): u64`
- `acceptJob(jobId: u64): void`
- `submitResult(jobId: u64, resultHash: string): void`
- `cancelJob(jobId: u64): void`

## Events

- `JobCreated(jobId, creator, paymentAmount, promptHash)`
- `JobAccepted(jobId, worker)`
- `JobCompleted(jobId, worker, resultHash)`
- `JobCancelled(jobId)`
