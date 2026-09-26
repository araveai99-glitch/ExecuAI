"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { EmailDetailView } from "@/components/execuai/EmailDetailView";
import { initialUnifiedEmails } from "@/lib/data/mockExecuData";
import { Button } from "@/components/ui/Button";

export default function StandaloneEmailDetailPage() {
  const params = useParams();
  const router = useRouter();
  const emailId = params?.id as string;

  const email = React.useMemo(() => {
    return (
      initialUnifiedEmails.find((e) => e.id === emailId) ||
      initialUnifiedEmails[0]
    );
  }, [emailId]);

  if (!email) {
    return (
      <div className="p-12 text-center space-y-4 max-w-md mx-auto my-12 bg-white rounded-2xl border border-[#E2E8F0]">
        <h2 className="text-lg font-bold text-[#0F172A]">Email Not Found</h2>
        <p className="text-xs text-[#64748B]">The requested email thread could not be located in your unified stream.</p>
        <Button variant="primary" size="sm" onClick={() => router.push("/app/inbox")}>
          Return to Unified Inbox
        </Button>
      </div>
    );
  }

  return (
    <EmailDetailView
      email={email}
      onBack={() => router.push("/app/inbox")}
      onActionSuccess={(msg) => console.log("Action performed:", msg)}
    />
  );
}
