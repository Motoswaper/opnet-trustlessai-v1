// TrustlessAI v1 — Deterministic AI Job Protocol for OP_NET
// AssemblyScript (WASM) — same style as OP721 / OP20

@unmanaged
class Job {
  id: u64;
  creator: Address;
  worker: Address;
  paymentAmount: u64;
  promptHash: string;
  resultHash: string;
  status: u8; // 0=Created, 1=Accepted, 2=Completed, 3=Cancelled
}

export class TrustlessAI {

  private static nextJobId: u64 = 1;
  private static jobs = new Map<u64, Job>();
  private static token: Address; // OP20 token address for payments
  private static trustLayer: Address; // TrustLayer contract address

  // Initialize TrustlessAI with OP20 token + TrustLayer address
  static init(token: Address, trustLayer: Address): void {
    assert(TrustlessAI.token == ZERO_ADDRESS, "ALREADY_INITIALIZED");
    TrustlessAI.token = token;
    TrustlessAI.trustLayer = trustLayer;
  }

  // Create a new AI job
  static createJob(promptHash: string, paymentAmount: u64): u64 {
    assert(paymentAmount > 0, "INVALID_PAYMENT");

    const creator = Context.sender();

    // Pull OP20 tokens from creator
    OP20.transferFrom(creator, Context.contractAddress(), paymentAmount);

    const jobId = TrustlessAI.nextJobId++;
    const job = new Job();

    job.id = jobId;
    job.creator = creator;
    job.worker = ZERO_ADDRESS;
    job.paymentAmount = paymentAmount;
    job.promptHash = promptHash;
    job.resultHash = "";
    job.status = 0;

    TrustlessAI.jobs.set(jobId, job);

    Events.emit("JobCreated", [
      jobId.toString(),
      creator.toString(),
      paymentAmount.toString(),
      promptHash
    ]);

    return jobId;
  }

  // Accept a job — WITH TRUSTLAYER INTEGRATION
  static acceptJob(jobId: u64): void {
    const worker = Context.sender();
    const job = TrustlessAI.jobs.get(jobId);

    assert(job != null, "JOB_NOT_FOUND");
    assert(job.status == 0, "JOB_NOT_AVAILABLE");

    // --- TRUSTLAYER INTEGRATION ---
    // Require worker to have AI_SAFE tag
    assert(
      TrustLayer.hasTag(worker, "AI_SAFE"),
      "NOT_TRUSTED"
    );

    // Require minimum reputation
    const rep = TrustLayer.reputation(worker);
    assert(rep >= 3000, "LOW_REPUTATION");
    // --- END TRUSTLAYER INTEGRATION ---

    job.worker = worker;
    job.status = 1;

    Events.emit("JobAccepted", [
      jobId.toString(),
      worker.toString()
    ]);
  }

  // Submit result
  static submitResult(jobId: u64, resultHash: string): void {
    const worker = Context.sender();
    const job = TrustlessAI.jobs.get(jobId);

    assert(job != null, "JOB_NOT_FOUND");
    assert(job.worker == worker, "NOT_WORKER");
    assert(job.status == 1, "INVALID_STATE");

    job.resultHash = resultHash;
    job.status = 2;

    // Pay worker
    OP20.transfer(worker, job.paymentAmount);

    Events.emit("JobCompleted", [
      jobId.toString(),
      worker.toString(),
      resultHash
    ]);
  }

  // Cancel job (only if not accepted)
  static cancelJob(jobId: u64): void {
    const creator = Context.sender();
    const job = TrustlessAI.jobs.get(jobId);

    assert(job != null, "JOB_NOT_FOUND");
    assert(job.creator == creator, "NOT_CREATOR");
    assert(job.status == 0, "CANNOT_CANCEL");

    job.status = 3;

    // Refund creator
    OP20.transfer(creator, job.paymentAmount);

    Events.emit("JobCancelled", [
      jobId.toString()
    ]);
  }
}
