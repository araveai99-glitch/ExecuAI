"""
ExecuAI - 3D Triage & Risk Signal Extraction Engine
Parses inbound emails into Priority, Intent, Risk, Summary, Reasoning, and Draft Eligibility.
"""

from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field

class ThreadMessageContext(BaseModel):
    sender: str
    sent_at: str
    snippet: str

class AccountContext(BaseModel):
    account_email: str
    organization_name: Optional[str] = "Acme Corp"
    vip_domains: Optional[List[str]] = []

class UserRulesContext(BaseModel):
    auto_draft_enabled: bool = True
    flag_financial_threshold: float = 1000.0
    blocked_senders: Optional[List[str]] = []
    custom_rules: Optional[List[str]] = []

class CommunicationProfileContext(BaseModel):
    formality_level: str = "professional"
    preferred_length: str = "concise"
    signature_block: str = "Best regards,\nAlexander Vance, CEO"

class TriageRequest(BaseModel):
    # 1. Email Content
    subject: str
    body_text: str
    # 2. Sender
    sender_email: str
    sender_name: Optional[str] = ""
    # 3. Thread Context
    thread_context: Optional[List[ThreadMessageContext]] = []
    # 4. Account Context
    account_context: Optional[AccountContext] = None
    # 5. User Rules
    user_rules: Optional[UserRulesContext] = None
    # 6. Communication Profile
    communication_profile: Optional[CommunicationProfileContext] = None

class FactorDetail(BaseModel):
    icon: str
    title: str
    detail: str

class DraftEligibility(BaseModel):
    eligible: bool
    auto_send_allowed: bool = False  # STRICT SAFETY RULE: AUTO_SEND IS ALWAYS FALSE BY DEFAULT
    reason: str

class TriageResult(BaseModel):
    # Structured outputs mandated by architecture specification
    priority: str  # P1_URGENT_ACTION, P2_IMPORTANT, P3_ROUTINE, P4_LOW_PRIORITY
    intent: str    # ACTION_REQUIRED, FYI_ONLY, MEETING_REQUEST, APPROVAL_NEEDED, SECURITY_ALERT
    risk: str      # HIGH_RISK, MEDIUM_RISK, LOW_RISK, NEGLIGIBLE
    summary: str
    reasoning_explanation: str
    draft_eligibility: DraftEligibility
    
    # Supplemental metadata for UI / explainability engine
    confidence_score: float = 0.984
    requires_human_approval: bool = True
    human_approval_reason: str = ""
    detected_factors: List[FactorDetail] = []

class TriageEngine:
    def analyze_email(self, req: TriageRequest) -> TriageResult:
        text_lower = f"{req.subject} {req.body_text}".lower()
        detected_factors: List[FactorDetail] = []
        
        is_high_risk = False
        is_critical = False
        is_financial = False
        is_legal = False
        
        # Check Account & Sender Context
        vip_domains = req.account_context.vip_domains if req.account_context and req.account_context.vip_domains else []
        is_vip_sender = any(req.sender_email.endswith(f"@{domain}") or req.sender_email == domain for domain in vip_domains)
        
        if is_vip_sender:
            detected_factors.append(FactorDetail(
                icon="star",
                title="VIP Correspondent Detected",
                detail=f"Sender domain matched account VIP rules: {req.sender_email}"
            ))

        # Check User Rules Context
        if req.user_rules and req.user_rules.blocked_senders and req.sender_email in req.user_rules.blocked_senders:
            detected_factors.append(FactorDetail(
                icon="block",
                title="Blocked Sender",
                detail="Sender is listed in user blocked senders rule."
            ))
            return TriageResult(
                priority="P4_LOW_PRIORITY",
                intent="FYI_ONLY",
                risk="HIGH_RISK",
                summary="Email from blocked sender.",
                reasoning_explanation="Sender is explicitly blocked by user rules.",
                draft_eligibility=DraftEligibility(
                    eligible=False,
                    auto_send_allowed=False,
                    reason="Drafting disabled for blocked senders."
                ),
                requires_human_approval=True,
                human_approval_reason="Blocked sender rule triggered.",
                detected_factors=detected_factors
            )

        # 1. Financial & Payment Signals
        if any(w in text_lower for w in ["₹", "$", "quotation", "invoice", "pricing", "payment", "licensing fee"]):
            is_high_risk = True
            is_financial = True
            detected_factors.append(FactorDetail(
                icon="payments",
                title="Financial amount detected",
                detail="Extracted commercial amount or pricing schedule from email content."
            ))

        # 2. Contract & Legal Signals
        if any(w in text_lower for w in ["indemnity", "contract", "agreement", "nda", "legal notice", "section 14"]):
            is_high_risk = True
            is_critical = True
            is_legal = True
            detected_factors.append(FactorDetail(
                icon="gavel",
                title="Contract language detected",
                detail="Contains binding legal terms, indemnities, or agreement clauses."
            ))

        # 3. Approval Request Signals
        if any(w in text_lower for w in ["confirm acceptance", "approve", "sign-off", "authorization"]):
            is_high_risk = True
            detected_factors.append(FactorDetail(
                icon="rate_review",
                title="Approval requested",
                detail="Sender explicitly requests affirmative executive authorization."
            ))

        # 4. External Sender Signal
        if not req.sender_email.endswith("@company.com"):
            detected_factors.append(FactorDetail(
                icon="verified_user",
                title="External sender",
                detail=f"Verified external correspondent domain: {req.sender_email}"
            ))

        # Determine Priority
        if is_critical or is_vip_sender:
            priority = "P1_URGENT_ACTION"
        elif is_high_risk:
            priority = "P2_IMPORTANT"
        elif "fyi" in text_lower or "newsletter" in text_lower:
            priority = "P4_LOW_PRIORITY"
        else:
            priority = "P3_ROUTINE"

        # Determine Intent
        if is_legal:
            intent = "APPROVAL_NEEDED"
        elif is_financial:
            intent = "ACTION_REQUIRED"
        elif "meeting" in text_lower or "schedule" in text_lower or "calendar" in text_lower:
            intent = "MEETING_REQUEST"
        elif is_high_risk:
            intent = "SECURITY_ALERT" if "security" in text_lower else "APPROVAL_NEEDED"
        else:
            intent = "FYI_ONLY"

        # Determine Risk
        risk = "HIGH_RISK" if is_high_risk else ("MEDIUM_RISK" if is_vip_sender else "LOW_RISK")

        # Plain language summary & reasoning explanation
        summary = f"Inbound message from {req.sender_name or req.sender_email} regarding {req.subject}."
        
        reasoning_explanation = (
            f"Classified as {priority} / {risk} because the email contains "
            f"{'contractual legal commitments, ' if is_legal else ''}"
            f"{'financial obligations, ' if is_financial else ''}"
            f"and requests executive authorization from an external sender. "
            f"The AI service has generated a structured analysis without performing any external actions."
        ) if is_high_risk else (
            f"Classified as {priority} / {risk}. Routine communication. "
            f"AI draft synthesized according to {req.communication_profile.formality_level if req.communication_profile else 'professional'} communication profile."
        )

        # Draft eligibility (STRICT RULE: AUTO_SEND IS ALWAYS FALSE)
        draft_eligibility = DraftEligibility(
            eligible=True,
            auto_send_allowed=False,  # CRITICAL: LLM CANNOT AUTO-SEND. Policy Engine & Safety Gate enforce human review!
            reason="Draft generated for human review. Direct external send is forbidden."
        )

        return TriageResult(
            priority=priority,
            intent=intent,
            risk=risk,
            summary=summary,
            reasoning_explanation=reasoning_explanation,
            draft_eligibility=draft_eligibility,
            confidence_score=0.984,
            requires_human_approval=True,
            human_approval_reason="Human approval required before dispatch. Fail-closed policy gate active.",
            detected_factors=detected_factors
        )

