import fs from "fs";
import path from "path";
import crypto from "crypto";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export interface StoredAuditEntry {
  id: string;
  organizationId: string;
  userId?: string;
  actorName: string;
  actionEvent: string;
  resourceContext: string;
  resultSummary: string;
  logNonceHash: string;
  ipAddress?: string;
  createdAt: string;
}

const AUDIT_FILE_PATH = path.join(process.cwd(), ".data", "audit_logs_v1.json");

function getPrismaClient(): any {
  try {
    const { PrismaClient } = require("@prisma/client");
    const globalForPrisma = global as unknown as { prisma: any };
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = new PrismaClient();
    }
    return globalForPrisma.prisma;
  } catch (_) {
    return null;
  }
}

function ensureDir(filePath: string) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    ensureDir(dirname);
    fs.mkdirSync(dirname);
  }
}

export class AuditStore {
  /**
   * Logs a cryptographically hashed activity event into database and disk storage.
   */
  public static async recordEvent(event: {
    organizationId: string;
    userId?: string;
    actorName: string;
    actionEvent: string;
    resourceContext: string;
    resultSummary: string;
    ipAddress?: string;
  }): Promise<StoredAuditEntry> {
    const id = `AUD-${Date.now().toString().slice(-5)}`;
    const now = new Date().toISOString();

    // Compute cryptographic log hash
    const rawData = `${id}:${event.organizationId}:${event.userId || "system"}:${event.actionEvent}:${now}`;
    const hash = "0x" + crypto.createHash("sha256").update(rawData).digest("hex").substring(0, 12);

    const record: StoredAuditEntry = {
      id,
      organizationId: event.organizationId,
      userId: event.userId,
      actorName: event.actorName,
      actionEvent: event.actionEvent,
      resourceContext: event.resourceContext,
      resultSummary: event.resultSummary,
      logNonceHash: hash,
      ipAddress: event.ipAddress || "127.0.0.1",
      createdAt: now,
    };

    // 1. Prisma DB
    const db = getPrismaClient();
    if (db) {
      try {
        await db.auditLog.create({
          data: {
            id: record.id,
            organizationId: record.organizationId,
            userId: record.userId,
            actorName: record.actorName,
            actionEvent: record.actionEvent,
            resourceContext: record.resourceContext,
            resultSummary: record.resultSummary,
            logNonceHash: record.logNonceHash,
            ipAddress: record.ipAddress,
          },
        });
      } catch (err: any) {
        console.warn(`[AUDIT STORE DB] Prisma write note: ${err.message}`);
      }
    }

    // 2. Supabase DB
    const supabase = getSupabaseServerClient();
    if (supabase) {
      try {
        await supabase.from("audit_logs").insert({
          id: record.id,
          organization_id: record.organizationId,
          user_id: record.userId,
          actor_name: record.actorName,
          action_event: record.actionEvent,
          resource_context: record.resourceContext,
          result_summary: record.resultSummary,
          log_nonce_hash: record.logNonceHash,
          ip_address: record.ipAddress,
          created_at: record.createdAt,
        });
      } catch (_) {}
    }

    // 3. Disk Storage Fallback
    try {
      ensureDir(AUDIT_FILE_PATH);
      let localLogs: StoredAuditEntry[] = [];
      if (fs.existsSync(AUDIT_FILE_PATH)) {
        try {
          localLogs = JSON.parse(fs.readFileSync(AUDIT_FILE_PATH, "utf-8"));
        } catch (_) {}
      }
      localLogs.unshift(record);
      fs.writeFileSync(AUDIT_FILE_PATH, JSON.stringify(localLogs, null, 2), "utf-8");
    } catch (_) {}

    return record;
  }

  /**
   * Fetches audit log records strictly belonging to the specified organizationId.
   */
  public static async getLogsByOrgId(organizationId: string): Promise<StoredAuditEntry[]> {
    if (!organizationId) return [];
    const cleanOrgId = organizationId.trim();
    const map = new Map<string, StoredAuditEntry>();

    // 1. Prisma DB
    const db = getPrismaClient();
    if (db) {
      try {
        const rows = await db.auditLog.findMany({
          where: { organizationId: cleanOrgId },
          orderBy: { createdAt: "desc" },
        });
        rows.forEach((r: any) => {
          map.set(r.id, {
            id: r.id,
            organizationId: r.organizationId,
            userId: r.userId || undefined,
            actorName: r.actorName,
            actionEvent: r.actionEvent,
            resourceContext: r.resourceContext,
            resultSummary: r.resultSummary,
            logNonceHash: r.logNonceHash,
            ipAddress: r.ipAddress || undefined,
            createdAt: r.createdAt.toISOString(),
          });
        });
      } catch (_) {}
    }

    // 2. Disk Storage Fallback
    try {
      if (fs.existsSync(AUDIT_FILE_PATH)) {
        const localLogs: StoredAuditEntry[] = JSON.parse(fs.readFileSync(AUDIT_FILE_PATH, "utf-8"));
        localLogs.forEach((l) => {
          if (l.organizationId === cleanOrgId && !map.has(l.id)) {
            map.set(l.id, l);
          }
        });
      }
    } catch (_) {}

    return Array.from(map.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
}
