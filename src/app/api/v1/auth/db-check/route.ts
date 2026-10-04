import { NextRequest, NextResponse } from "next/server";
import { getPrismaClient } from "@/lib/server/prisma-client";

export async function GET(req: NextRequest) {
  const dbUrl = process.env.DATABASE_URL || "";
  const databaseUrlPresent = Boolean(dbUrl && dbUrl.trim().length > 0);
  const databaseUrlFormatValid = /^postgres(ql)?:\/\//i.test(dbUrl.trim());

  let prismaPgInitSuccess = false;
  let postgresConnectionSuccess = false;
  let organizationsQuerySuccess = false;
  let usersQuerySuccess = false;
  let gmailTokensQuerySuccess = false;
  let emailAccountsQuerySuccess = false;

  let organizationsCount = 0;
  let usersCount = 0;
  let gmailTokensCount = 0;
  let emailAccountsCount = 0;

  let sanitizedError: string | null = null;

  try {
    const db = getPrismaClient();
    if (db) {
      prismaPgInitSuccess = true;

      // 1. SELECT 1 query check
      try {
        await db.$queryRaw`SELECT 1`;
        postgresConnectionSuccess = true;
      } catch (err: any) {
        sanitizedError = `SELECT 1 failed: ${err.message.replace(/postgres:\/\/[^@]+@/i, "postgres://***@")}`;
      }

      // 2. Organizations query check
      try {
        organizationsCount = await db.organization.count();
        organizationsQuerySuccess = true;
      } catch (err: any) {
        if (!sanitizedError) sanitizedError = `Organizations query failed: ${err.message}`;
      }

      // 3. Users query check
      try {
        usersCount = await db.user.count();
        usersQuerySuccess = true;
      } catch (err: any) {
        if (!sanitizedError) sanitizedError = `Users query failed: ${err.message}`;
      }

      // 4. GmailTokens query check
      try {
        gmailTokensCount = await db.gmailToken.count();
        gmailTokensQuerySuccess = true;
      } catch (err: any) {
        if (!sanitizedError) sanitizedError = `GmailTokens query failed: ${err.message}`;
      }

      // 5. EmailAccounts query check
      try {
        emailAccountsCount = await db.emailAccount.count();
        emailAccountsQuerySuccess = true;
      } catch (err: any) {
        if (!sanitizedError) sanitizedError = `EmailAccounts query failed: ${err.message}`;
      }
    } else {
      sanitizedError = "getPrismaClient() returned null";
    }
  } catch (err: any) {
    sanitizedError = `PrismaPg initialization thrown exception: ${err.message}`;
  }

  return NextResponse.json({
    success: true,
    diagnostics: {
      databaseUrlPresent,
      databaseUrlFormatValid,
      prismaPgInitSuccess,
      postgresConnectionSuccess,
      organizationsQuerySuccess,
      usersQuerySuccess,
      gmailTokensQuerySuccess,
      emailAccountsQuerySuccess,
      counts: {
        organizationsCount,
        usersCount,
        gmailTokensCount,
        emailAccountsCount,
      },
      sanitizedError,
    },
  });
}
