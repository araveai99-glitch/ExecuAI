/**
 * ExecuAI - Application Policy Engine
 * Receives structured AI Analysis from Python FastAPI microservice,
 * applies enterprise policy rules, and decides allowed system actions.
 * 
 * Architecture:
 * Email -> AI Analysis -> Structured Result -> Policy Engine -> Safety Gate -> Allowed Action
 */

export interface AIAnalysisResult {
  priority: 'P1_URGENT_ACTION' | 'P2_IMPORTANT' | 'P3_ROUTINE' | 'P4_LOW_PRIORITY';
  intent: 'ACTION_REQUIRED' | 'FYI_ONLY' | 'MEETING_REQUEST' | 'APPROVAL_NEEDED' | 'SECURITY_ALERT';
  risk: 'HIGH_RISK' | 'MEDIUM_RISK' | 'LOW_RISK' | 'NEGLIGIBLE';
  summary: string;
  reasoning_explanation: string;
  draft_eligibility: {
    eligible: boolean;
    auto_send_allowed: boolean;
    reason: string;
  };
  detected_factors?: Array<{
    icon: string;
    title: string;
    detail: string;
  }>;
}

export interface SystemPolicyRules {
  autoSendEnabled: boolean;
  financialLimitThreshold: number;
  confidentialProtectionActive: boolean;
  requireLegalReviewForContracts: boolean;
}

export interface PolicyEngineDecision {
  allowedAction: 'REQUIRE_HUMAN_APPROVAL' | 'SAVE_DRAFT_PENDING_REVIEW' | 'AUTO_REJECT' | 'NEEDS_LEGAL_ESCALATION';
  autoSendPermitted: boolean;
  reason: string;
  policyViolations: string[];
  safetyStateConfirmed: boolean;
}

export class PolicyEngine {
  private static DEFAULT_RULES: SystemPolicyRules = {
    autoSendEnabled: false, // Default is strictly false (fail-closed)
    financialLimitThreshold: 1000.0,
    confidentialProtectionActive: true,
    requireLegalReviewForContracts: true,
  };

  /**
   * Evaluates structured AI result against strict safety rules.
   * Ensures the AI model itself cannot directly perform actions.
   */
  public static evaluatePolicy(
    aiResult: AIAnalysisResult,
    customRules?: Partial<SystemPolicyRules>
  ): PolicyEngineDecision {
    const rules = { ...this.DEFAULT_RULES, ...customRules };
    const violations: string[] = [];

    // Rule 1: Zero-trust auto-send ban for high risk
    if (aiResult.risk === 'HIGH_RISK') {
      violations.push('HIGH_RISK classification forbids direct outbound dispatch.');
    }

    // Rule 2: Contract / Legal Approval Policy
    if (aiResult.intent === 'APPROVAL_NEEDED') {
      violations.push('Approval-needed intent requires explicit executive authorization.');
    }

    // Rule 3: Direct LLM Action execution prohibition
    if (aiResult.draft_eligibility.auto_send_allowed) {
      violations.push('LLM attempted to request direct auto-send. Overridden by Policy Engine.');
    }

    // Rule 4: Financial or Legal Factors
    const hasFinancialOrLegal = aiResult.detected_factors?.some(f =>
      f.title.toLowerCase().includes('financial') ||
      f.title.toLowerCase().includes('contract') ||
      f.title.toLowerCase().includes('approval')
    );

    if (hasFinancialOrLegal) {
      violations.push('High-risk financial or legal signals detected in message content.');
    }

    // Determine final allowed action
    let allowedAction: PolicyEngineDecision['allowedAction'] = 'SAVE_DRAFT_PENDING_REVIEW';

    if (aiResult.intent === 'APPROVAL_NEEDED' || aiResult.risk === 'HIGH_RISK') {
      allowedAction = 'REQUIRE_HUMAN_APPROVAL';
    } else if (violations.length > 0) {
      allowedAction = 'REQUIRE_HUMAN_APPROVAL';
    }

    return {
      allowedAction,
      autoSendPermitted: false, // CRITICAL: AUTO-SEND IS STRICTLY FORBIDDEN AT THE POLICY ENGINE LEVEL
      reason: violations.length > 0
        ? `Policy Engine blocked automated send: ${violations.join(' ')}`
        : 'Routine policy evaluation passed. Saved draft for executive approval.',
      policyViolations: violations,
      safetyStateConfirmed: true
    };
  }
}
