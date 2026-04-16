<div align="center">

# 🤖 TrustlessAI v1  
### **Deterministic AI Job Protocol for OP_NET**

A fail‑safe, trustless, AssemblyScript‑based AI job marketplace built for the OP_NET virtual machine.

Workers run AI models off‑chain.  
The contract handles **escrow, commitments, payouts, and lifecycle** — fully deterministic.

<br>

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![OP_NET](https://img.shields.io/badge/Network-OP__NET-blue.svg)
![AssemblyScript](https://img.shields.io/badge/Language-AssemblyScript-purple.svg)

<br>

### 🔗 Quick Links

[📘 TrustlessAI Docs](./docs/TRUSTLESSAI.md) •  
[🧩 Indexer Schema](./docs/INDEXER_TRUSTLESSAI.md)

<br><br>

</div>

---

# 🧬 Overview

**TrustlessAI v1** is a deterministic AI job protocol for OP_NET.

It enables:

- users to create AI tasks  
- workers to accept tasks  
- off‑chain AI execution  
- on‑chain result commitments (hashes)  
- OP20‑based escrow and payouts  
- full transparency through events  

No AI runs on‑chain.  
Only **money + commitments + lifecycle**.

This ensures:

- deterministic execution  
- predictable gas  
- zero ambiguity  
- indexer‑friendly events  
- fail‑safe job flow  

---

# 📂 Repository Structure
/contracts
└── TrustlessAI.ts

/docs
├── TRUSTLESSAI.md
└── INDEXER_TRUSTLESSAI.md

README.md
LICENSE

---

# 🧱 Contract Features

## 🔵 Job Lifecycle

1. **createJob(promptHash, paymentAmount)**  
   - Escrows OP20 tokens  
   - Emits `JobCreated`

2. **acceptJob(jobId)**  
   - Worker claims the job  
   - Emits `JobAccepted`

3. **submitResult(jobId, resultHash)**  
   - Worker commits output hash  
   - Contract pays worker  
   - Emits `JobCompleted`

4. **cancelJob(jobId)**  
   - Creator cancels if unassigned  
   - Refunds payment  
   - Emits `JobCancelled`

---

# 🧩 Events

- `JobCreated(jobId, creator, paymentAmount, promptHash)`  
- `JobAccepted(jobId, worker)`  
- `JobCompleted(jobId, worker, resultHash)`  
- `JobCancelled(jobId)`  

These events power explorers, dashboards, and AI marketplaces.

---

# 📘 Documentation

- Full protocol spec: [`docs/TRUSTLESSAI.md`](./docs/TRUSTLESSAI.md)  
- Indexer schema: [`docs/INDEXER_TRUSTLESSAI.md`](./docs/INDEXER_TRUSTLESSAI.md)

---

# 📜 License

MIT — open and free for the OP_NET ecosystem.

---

<div align="center">

### Built for the OP_NET ecosystem  
**Deterministic. Minimal. Fail‑safe.**

</div>

