"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { AIDraftWorkbench } from "@/components/execuai/AIDraftWorkbench";
import { initialUnifiedEmails } from "@/lib/data/mockExecuData";
import { Button } from "@/components/ui/Button";

export default function StandaloneDraftPage() {
  const params = useParams();
  const router = useRouter();
  const draftId = params?.id as string;

  const email = React.useMemo(() => {
    return (
      initialUnifiedEmails.find((e) => e.id === draftId) ||
      initialUnifiedEmails[0]
    );
  }, [draftId]);

  if (!email) {
    return (
      <div className="p-12 text-center space-y-4 max-w-md mx-auto my-12 bg-white rounded-2xl border border-[#E2E8F0]">
        <h2 className="text-lg font-bold text-[#0F172A]">Draft Not Found</h2>
        <p className="text-xs text-[#64748B]">The requested AI draft item could not be located in your workspace.</p>
        <Button variant="primary" size="sm" onClick={() => router.push("/app/drafts")}>
          Return to Drafts Workspace
        </Button>
      </div>
    );
  }

  return (
    <AIDraftWorkbench
      email={email}
      onBack={() => router.push("/app/drafts")}
    />
  );
}
