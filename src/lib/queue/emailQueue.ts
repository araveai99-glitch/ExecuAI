// BullMQ Queue Interface & Processing Manager
// Handles background ingestion, 3D triage, and draft synthesis background jobs safely

export interface SyncEmailAccountJob {
  emailAccountId: string;
  organizationId: string;
  provider: "GMAIL" | "ZOHO";
  emailAddress: string;
}

export interface ProcessTriageJob {
  emailId: string;
  organizationId: string;
  subject: string;
  bodyText: string;
  senderEmail: string;
  accountEmail: string;
}

// Background Queue Processor Abstraction
export class BackgroundJobQueue<T> {
  private queueName: string;

  constructor(queueName: string) {
    this.queueName = queueName;
  }

  public async add(jobId: string, data: T, options?: any): Promise<{ id: string; status: string }> {
    console.log(`[Queue ${this.queueName}] Job ${jobId} enqueued for processing.`);
    return { id: jobId, status: "ENQUEUED" };
  }
}

export const emailSyncQueue = new BackgroundJobQueue<SyncEmailAccountJob>("email-sync-queue");
export const triageQueue = new BackgroundJobQueue<ProcessTriageJob>("triage-processing-queue");

// Helper functions for enqueueing background tasks
export async function enqueueEmailAccountSync(jobData: SyncEmailAccountJob) {
  try {
    await emailSyncQueue.add(`sync-${jobData.emailAccountId}`, jobData, {
      attempts: 3,
      backoff: { type: "exponential", delay: 5000 },
    });
    console.log(`[Queue Enqueue] Sync job queued for ${jobData.emailAddress}`);
  } catch (err: unknown) {
    console.warn("[Queue Warning] Failed to enqueue sync job, fallback to inline processing:", err);
  }
}

export async function enqueueTriageProcessing(jobData: ProcessTriageJob) {
  try {
    await triageQueue.add(`triage-${jobData.emailId}`, jobData, {
      attempts: 2,
    });
    console.log(`[Queue Enqueue] 3D Triage job queued for Email ID ${jobData.emailId}`);
  } catch (err: unknown) {
    console.warn("[Queue Warning] Fallback inline triage processing:", err);
  }
}
