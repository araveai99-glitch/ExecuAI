import fs from "fs";
import path from "path";
import crypto from "crypto";
import { getPrismaClient } from "@/lib/server/prisma-client";

export interface StoredOrganization {
  id: string;
  name: string;
  slug: string;
  ownerId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoredUser {
  id: string;
  organizationId: string;
  email: string;
  fullName: string;
  role: "ADMIN" | "MANAGER" | "USER";
  status: "ACTIVE" | "PENDING_APPROVAL" | "INVITED" | "DISABLED";
  passwordHash?: string;
  managerId?: string;
  emailVerified: boolean;
  lastActivityAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoredAccessRequest {
  id: string;
  organizationId: string;
  email: string;
  fullName: string;
  role: "ADMIN" | "MANAGER" | "USER";
  status: "PENDING" | "APPROVED" | "REJECTED";
  invitedByUserId?: string;
  processedByUserId?: string;
  createdAt: string;
  updatedAt: string;
}

const ORG_FILE_PATH = path.join(process.cwd(), ".data", "organizations_v1.json");
const USER_FILE_PATH = path.join(process.cwd(), ".data", "users_v1.json");
const ACCESS_FILE_PATH = path.join(process.cwd(), ".data", "access_requests_v1.json");



function ensureDir(filePath: string) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    ensureDir(dirname);
    fs.mkdirSync(dirname);
  }
}

function readJsonFile<T>(filePath: string, defaultValue: T): T {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
  } catch (_) {}
  return defaultValue;
}

function writeJsonFile<T>(filePath: string, data: T): void {
  try {
    ensureDir(filePath);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err: any) {
    console.warn(`[ORG STORE] Disk write note: ${err.message}`);
  }
}

export class OrganizationStore {
  // --- ORGANIZATION OPERATIONS ---

  public static async createOrganization(name: string, ownerEmail: string): Promise<StoredOrganization> {
    const cleanName = name.trim();
    const slug = cleanName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + crypto.randomBytes(3).toString("hex");
    const orgId = `org_${Date.now()}_${crypto.randomBytes(3).toString("hex")}`;
    const now = new Date().toISOString();

    const orgRecord: StoredOrganization = {
      id: orgId,
      name: cleanName,
      slug,
      createdAt: now,
      updatedAt: now,
    };

    // 1. Prisma DB
    const db = getPrismaClient();
    if (db) {
      try {
        const dbOrg = await db.organization.create({
          data: {
            id: orgRecord.id,
            name: orgRecord.name,
            slug: orgRecord.slug,
          },
        });
        orgRecord.id = dbOrg.id;
      } catch (err: any) {
        console.warn(`[ORG STORE DB] Prisma org create note: ${err.message}`);
      }
    }

    // 2. Disk Storage
    const localOrgs = readJsonFile<StoredOrganization[]>(ORG_FILE_PATH, []);
    localOrgs.push(orgRecord);
    writeJsonFile(ORG_FILE_PATH, localOrgs);

    return orgRecord;
  }

  public static async getOrganizationById(orgId: string): Promise<StoredOrganization | null> {
    if (!orgId) return null;
    const cleanId = orgId.trim();

    // 1. Prisma DB
    const db = getPrismaClient();
    if (db) {
      try {
        const dbOrg = await db.organization.findUnique({ where: { id: cleanId } });
        if (dbOrg) {
          return {
            id: dbOrg.id,
            name: dbOrg.name,
            slug: dbOrg.slug,
            ownerId: dbOrg.ownerId || undefined,
            createdAt: dbOrg.createdAt.toISOString(),
            updatedAt: dbOrg.updatedAt.toISOString(),
          };
        }
      } catch (_) {}
    }

    // 2. Disk Storage
    const localOrgs = readJsonFile<StoredOrganization[]>(ORG_FILE_PATH, []);
    const match = localOrgs.find((o) => o.id === cleanId);
    if (match) return match;

    // Fallback default organization for initial setup
    if (cleanId === "org_default" || cleanId.startsWith("org_")) {
      const defaultOrg: StoredOrganization = {
        id: cleanId,
        name: "ExecuAI Enterprise Tenant",
        slug: "execuai-enterprise",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      localOrgs.push(defaultOrg);
      writeJsonFile(ORG_FILE_PATH, localOrgs);
      return defaultOrg;
    }

    return null;
  }

  // --- USER OPERATIONS ---

  public static async createUser(userData: {
    organizationId: string;
    email: string;
    fullName: string;
    role?: "ADMIN" | "MANAGER" | "USER";
    status?: "ACTIVE" | "PENDING_APPROVAL" | "INVITED" | "DISABLED";
    passwordHash?: string;
    managerId?: string;
    emailVerified?: boolean;
  }): Promise<StoredUser> {
    const cleanEmail = userData.email.trim().toLowerCase();
    const userId = `usr_${Date.now()}_${crypto.randomBytes(3).toString("hex")}`;
    const now = new Date().toISOString();

    const userRecord: StoredUser = {
      id: userId,
      organizationId: userData.organizationId,
      email: cleanEmail,
      fullName: userData.fullName.trim(),
      role: userData.role || "USER",
      status: userData.status || "ACTIVE",
      passwordHash: userData.passwordHash || "",
      managerId: userData.managerId,
      emailVerified: userData.emailVerified ?? false,
      lastActivityAt: now,
      createdAt: now,
      updatedAt: now,
    };

    // 1. Prisma DB
    const db = getPrismaClient();
    if (db) {
      try {
        const dbUser = await db.user.create({
          data: {
            id: userRecord.id,
            organizationId: userRecord.organizationId,
            email: userRecord.email,
            fullName: userRecord.fullName,
            role: userRecord.role,
            status: userRecord.status,
            passwordHash: userRecord.passwordHash,
            managerId: userRecord.managerId,
            emailVerified: userRecord.emailVerified,
            lastActivityAt: new Date(now),
          },
        });
        userRecord.id = dbUser.id;
      } catch (err: any) {
        console.warn(`[USER STORE DB] Prisma user create note: ${err.message}`);
      }
    }

    // 2. Disk Storage
    const localUsers = readJsonFile<StoredUser[]>(USER_FILE_PATH, []);
    const existingIdx = localUsers.findIndex((u) => u.email.toLowerCase() === cleanEmail);
    if (existingIdx >= 0) {
      localUsers[existingIdx] = userRecord;
    } else {
      localUsers.push(userRecord);
    }
    writeJsonFile(USER_FILE_PATH, localUsers);

    return userRecord;
  }

  public static async getUserById(userId: string): Promise<StoredUser | null> {
    if (!userId) return null;
    const cleanId = userId.trim();

    // 1. Prisma DB
    const db = getPrismaClient();
    if (db) {
      try {
        const dbUser = await db.user.findUnique({ where: { id: cleanId } });
        if (dbUser) {
          return {
            id: dbUser.id,
            organizationId: dbUser.organizationId,
            email: dbUser.email,
            fullName: dbUser.fullName,
            role: dbUser.role as any,
            status: dbUser.status as any,
            passwordHash: dbUser.passwordHash || undefined,
            managerId: dbUser.managerId || undefined,
            emailVerified: dbUser.emailVerified,
            lastActivityAt: dbUser.lastActivityAt?.toISOString(),
            createdAt: dbUser.createdAt.toISOString(),
            updatedAt: dbUser.updatedAt.toISOString(),
          };
        }
      } catch (_) {}
    }

    // 2. Disk Storage
    const localUsers = readJsonFile<StoredUser[]>(USER_FILE_PATH, []);
    const match = localUsers.find((u) => u.id === cleanId);
    if (match) return match;

    return null;
  }

  public static async getUserByEmail(email: string): Promise<StoredUser | null> {
    if (!email) return null;
    const cleanEmail = email.trim().toLowerCase();

    // 1. Prisma DB
    const db = getPrismaClient();
    if (db) {
      try {
        const dbUser = await db.user.findUnique({ where: { email: cleanEmail } });
        if (dbUser) {
          return {
            id: dbUser.id,
            organizationId: dbUser.organizationId,
            email: dbUser.email,
            fullName: dbUser.fullName,
            role: dbUser.role as any,
            status: dbUser.status as any,
            passwordHash: dbUser.passwordHash || undefined,
            managerId: dbUser.managerId || undefined,
            emailVerified: dbUser.emailVerified,
            lastActivityAt: dbUser.lastActivityAt?.toISOString(),
            createdAt: dbUser.createdAt.toISOString(),
            updatedAt: dbUser.updatedAt.toISOString(),
          };
        }
      } catch (_) {}
    }

    // 2. Disk Storage
    const localUsers = readJsonFile<StoredUser[]>(USER_FILE_PATH, []);
    const match = localUsers.find((u) => u.email.toLowerCase() === cleanEmail);
    if (match) return match;

    return null;
  }

  public static async getUsersByOrgId(orgId: string): Promise<StoredUser[]> {
    if (!orgId) return [];
    const cleanOrgId = orgId.trim();

    const resultsMap = new Map<string, StoredUser>();

    // 1. Prisma DB
    const db = getPrismaClient();
    if (db) {
      try {
        const dbUsers = await db.user.findMany({ where: { organizationId: cleanOrgId } });
        dbUsers.forEach((u: any) => {
          resultsMap.set(u.id, {
            id: u.id,
            organizationId: u.organizationId,
            email: u.email,
            fullName: u.fullName,
            role: u.role,
            status: u.status,
            passwordHash: u.passwordHash || undefined,
            managerId: u.managerId || undefined,
            emailVerified: u.emailVerified,
            lastActivityAt: u.lastActivityAt?.toISOString(),
            createdAt: u.createdAt.toISOString(),
            updatedAt: u.updatedAt.toISOString(),
          });
        });
      } catch (_) {}
    }

    // 2. Disk Storage
    const localUsers = readJsonFile<StoredUser[]>(USER_FILE_PATH, []);
    localUsers.forEach((u) => {
      if (u.organizationId === cleanOrgId && !resultsMap.has(u.id)) {
        resultsMap.set(u.id, u);
      }
    });

    return Array.from(resultsMap.values());
  }

  public static async updateUser(userId: string, updates: Partial<StoredUser>): Promise<StoredUser | null> {
    const existing = await this.getUserById(userId);
    if (!existing) return null;

    const updated: StoredUser = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    // 1. Prisma DB
    const db = getPrismaClient();
    if (db) {
      try {
        await db.user.update({
          where: { id: userId },
          data: {
            fullName: updated.fullName,
            role: updated.role,
            status: updated.status,
            managerId: updated.managerId,
            emailVerified: updated.emailVerified,
            lastActivityAt: updated.lastActivityAt ? new Date(updated.lastActivityAt) : undefined,
          },
        });
      } catch (_) {}
    }

    // 2. Disk Storage
    const localUsers = readJsonFile<StoredUser[]>(USER_FILE_PATH, []);
    const idx = localUsers.findIndex((u) => u.id === userId);
    if (idx >= 0) {
      localUsers[idx] = updated;
    } else {
      localUsers.push(updated);
    }
    writeJsonFile(USER_FILE_PATH, localUsers);

    return updated;
  }

  public static async deleteUser(userId: string): Promise<boolean> {
    // 1. Prisma DB
    const db = getPrismaClient();
    if (db) {
      try {
        await db.user.delete({ where: { id: userId } });
      } catch (_) {}
    }

    // 2. Disk Storage
    const localUsers = readJsonFile<StoredUser[]>(USER_FILE_PATH, []);
    const filtered = localUsers.filter((u) => u.id !== userId);
    writeJsonFile(USER_FILE_PATH, filtered);

    return true;
  }

  public static async touchLastActivity(userId: string): Promise<void> {
    const now = new Date().toISOString();
    const db = getPrismaClient();
    if (db) {
      try {
        await db.user.update({ where: { id: userId }, data: { lastActivityAt: new Date(now) } });
      } catch (_) {}
    }

    const localUsers = readJsonFile<StoredUser[]>(USER_FILE_PATH, []);
    const user = localUsers.find((u) => u.id === userId);
    if (user) {
      user.lastActivityAt = now;
      writeJsonFile(USER_FILE_PATH, localUsers);
    }
  }

  // --- ACCESS REQUESTS / INVITATIONS ---

  public static async createAccessRequest(reqData: {
    organizationId: string;
    email: string;
    fullName: string;
    role?: "ADMIN" | "MANAGER" | "USER";
    invitedByUserId?: string;
  }): Promise<StoredAccessRequest> {
    const cleanEmail = reqData.email.trim().toLowerCase();
    const reqId = `req_${Date.now()}_${crypto.randomBytes(3).toString("hex")}`;
    const now = new Date().toISOString();

    const record: StoredAccessRequest = {
      id: reqId,
      organizationId: reqData.organizationId,
      email: cleanEmail,
      fullName: reqData.fullName.trim(),
      role: reqData.role || "USER",
      status: "PENDING",
      invitedByUserId: reqData.invitedByUserId,
      createdAt: now,
      updatedAt: now,
    };

    const db = getPrismaClient();
    if (db) {
      try {
        await db.accessRequest.create({
          data: {
            id: record.id,
            organizationId: record.organizationId,
            email: record.email,
            fullName: record.fullName,
            role: record.role,
            status: record.status,
            invitedByUserId: record.invitedByUserId,
          },
        });
      } catch (_) {}
    }

    const localReqs = readJsonFile<StoredAccessRequest[]>(ACCESS_FILE_PATH, []);
    localReqs.push(record);
    writeJsonFile(ACCESS_FILE_PATH, localReqs);

    return record;
  }

  public static async getAccessRequestsByOrgId(orgId: string): Promise<StoredAccessRequest[]> {
    if (!orgId) return [];
    const cleanOrgId = orgId.trim();
    const map = new Map<string, StoredAccessRequest>();

    const db = getPrismaClient();
    if (db) {
      try {
        const rows = await db.accessRequest.findMany({ where: { organizationId: cleanOrgId } });
        rows.forEach((r: any) => {
          map.set(r.id, {
            id: r.id,
            organizationId: r.organizationId,
            email: r.email,
            fullName: r.fullName,
            role: r.role,
            status: r.status,
            invitedByUserId: r.invitedByUserId || undefined,
            processedByUserId: r.processedByUserId || undefined,
            createdAt: r.createdAt.toISOString(),
            updatedAt: r.updatedAt.toISOString(),
          });
        });
      } catch (_) {}
    }

    const localReqs = readJsonFile<StoredAccessRequest[]>(ACCESS_FILE_PATH, []);
    localReqs.forEach((r) => {
      if (r.organizationId === cleanOrgId && !map.has(r.id)) {
        map.set(r.id, r);
      }
    });

    return Array.from(map.values());
  }

  public static async updateAccessRequestStatus(
    requestId: string,
    status: "APPROVED" | "REJECTED",
    processedByUserId: string
  ): Promise<StoredAccessRequest | null> {
    const now = new Date().toISOString();
    const db = getPrismaClient();
    if (db) {
      try {
        await db.accessRequest.update({
          where: { id: requestId },
          data: { status, processedByUserId, updatedAt: new Date(now) },
        });
      } catch (_) {}
    }

    const localReqs = readJsonFile<StoredAccessRequest[]>(ACCESS_FILE_PATH, []);
    const item = localReqs.find((r) => r.id === requestId);
    if (item) {
      item.status = status;
      item.processedByUserId = processedByUserId;
      item.updatedAt = now;
      writeJsonFile(ACCESS_FILE_PATH, localReqs);
      return item;
    }

    return null;
  }
}
