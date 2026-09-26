"""
ExecuAI - Python FastAPI AI Microservice Engine
Provides 3D Triage, Rationale Explanation, and LLM Provider Abstraction.
"""

import os
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

from services.llm_provider import LLMProviderAbstraction, PromptPayload
from services.triage_service import TriageEngine, TriageRequest, TriageResult

app = FastAPI(
    title="ExecuAI Python Engine",
    description="Sovereign AI Microservice for Executive Email Triage & Draft Synthesis",
    version="2.4.0"
)

# Enable CORS for Next.js app communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

llm_service = LLMProviderAbstraction()
triage_engine = TriageEngine()

class DraftGenerationRequest(BaseModel):
    subject: str
    body_text: str
    sender_name: str
    sender_email: str
    tone: str = "professional"
    length: str = "medium"
    executive_name: str = "Alexander Vance"

class DraftGenerationResponse(BaseModel):
    draft_subject: str
    draft_body: str
    provider_used: str

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "ExecuAI Python Engine",
        "primary_llm_provider": llm_service.primary_provider,
        "privacy_policy": "Zero Model Training Guarantee Active"
    }

@app.post("/v1/ai/triage", response_model=TriageResult)
def evaluate_triage(req: TriageRequest):
    """3D Triage Engine: Evaluates Priority, Intent, and Risk with Plain-Language Rationale."""
    try:
        return triage_engine.analyze_email(req)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/v1/ai/draft", response_model=DraftGenerationResponse)
async def generate_draft(req: DraftGenerationRequest):
    """LLM Response Studio: Synthesizes executive voice response."""
    system_prompt = (
        f"You are ExecuAI, the sovereign executive AI assistant for {req.executive_name}, CEO.\n"
        f"Draft a response to {req.sender_name} <{req.sender_email}> regarding '{req.subject}'.\n"
        f"Tone: {req.tone}. Length: {req.length}.\n"
        f"Strict Rule: Do not make binding financial or legal commitments. Include 2x liability cap where appropriate."
    )
    user_prompt = f"Inbound email body:\n{req.body_text}\n\nDraft response:"
    
    payload = PromptPayload(system_prompt=system_prompt, user_prompt=user_prompt)
    completion = await llm_service.generate_completion(payload)

    return DraftGenerationResponse(
        draft_subject=f"Re: {req.subject}",
        draft_body=completion,
        provider_used=llm_service.primary_provider
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
