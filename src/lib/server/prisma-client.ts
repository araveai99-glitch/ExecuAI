import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

export function getPrismaClient(): PrismaClient | null {
  try {
    if (!globalForPrisma.prisma) {
      const dbUrl = process.env.DATABASE_URL;
      if (!dbUrl) {
        console.warn("[PRISMA CLIENT] Missing DATABASE_URL in environment variables");
        return null;
      }

      const pool = new Pool({ connectionString: dbUrl });
      const adapter = new PrismaPg(pool);
      globalForPrisma.prisma = new PrismaClient({ adapter });
    }
    return globalForPrisma.prisma;
  } catch (err: any) {
    console.error("[PRISMA CLIENT INIT ERROR]:", err.message);
    return null;
  }
}
