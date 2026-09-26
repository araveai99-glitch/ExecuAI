# ExecuAI — Production UI Design Specification

## 1. Product

**ExecuAI** is a SaaS AI Executive Email Assistant.

It connects multiple Gmail and Zoho mailboxes into one unified workspace. The MVP focuses on:

- Multi-account email connection
- Unified inbox
- Email triage
- Priority classification
- Intent classification
- Risk/confidentiality detection
- AI reply drafting
- Human approval for high-stakes communication
- Decision Center
- Rules and preferences
- Analytics
- Responsive web/mobile experience

The product is not a separate application for every mailbox. One SaaS user can connect multiple Gmail and Zoho accounts, while the AI engine and dashboard remain centralized.

Source project material specifies Gmail + Zoho as the initial integration scope and Read/Draft permissions for initial testing.

---

# 2. Product Principle

## Understand → Prioritize → Protect → Assist → Ask → Act

The AI:

- Reads and understands emails.
- Classifies emails.
- Identifies intent.
- Determines priority.
- Detects potentially risky or confidential communication.
- Generates drafts when permitted.
- Explains why it classified an email.
- Routes consequential communication to human review.

The AI must not independently:

- Approve contracts
- Negotiate prices
- Make financial commitments
- Accept business terms
- Handle confidential communication automatically
- Send high-risk responses

The LLM must never directly control an external email-send operation.

---

# 3. Brand Color System

Use the supplied brand palette as the primary visual identity.

| Token | Hex | Usage |
|---|---|---|
| Primary Green | `#2E936F` | Brand, primary buttons, navigation, active states |
| White | `#FFFFFF` | Main surfaces, cards, forms |
| Primary Yellow | `#FFEC69` | AI highlights, attention, smart suggestions |
| Accent Orange | `#FAB60A` | Warnings, review-required states, pending actions |
| Soft Beige | `#F7D7B0` | Background accents, illustrations, warm empty states |

Do not introduce arbitrary brand colors.

Neutral grayscale values may be used only where required for text hierarchy, borders, disabled states, accessibility, and readable UI.

Avoid rainbow interfaces, neon colors, excessive gradients, and excessive glassmorphism.

---

# 4. Typography

Primary font:

**Inter**

Weights:

- 400 — Regular
- 500 — Medium
- 600 — Semibold
- 700 — Bold

Use a consistent typographic hierarchy across marketing pages and the application.

Avoid mixing unrelated fonts.

---

# 5. Visual Direction

The product should feel:

- Premium
- Calm
- Secure
- Intelligent
- Executive-focused
- Minimal
- Professional
- Human-controlled

Avoid:

- Gaming aesthetics
- Sci-fi dashboards
- Excessive animation
- Cartoon-heavy visuals
- Excessive shadows
- Decorative UI without functional purpose

The interface should look suitable for CEOs, founders, directors, and senior professionals.

---

# 6. Information Architecture

## Public Website

- Home
- Features
- How It Works
- Use Cases
- Security
- Pricing
- Contact / Demo

## Authentication

- Sign Up
- Login
- Forgot Password
- Reset Password
- Email Verification

## Onboarding

- Welcome
- Connect Gmail
- Gmail OAuth Success
- Connect Zoho
- Zoho OAuth Success
- Connected Accounts
- Communication Preferences
- Safety Rules
- Writing Style
- Completion

## Application

- Dashboard
- Inbox
- Email Detail
- Decision Center
- Drafts
- Accounts
- Analytics
- Rules
- Settings
- Security
- Audit Log

---

# 7. Complete Screen Inventory

Every screen must be separately designed.

## Marketing

1. Landing Page
2. Features
3. How It Works
4. Security
5. Use Cases
6. Pricing
7. Contact / Demo

## Authentication

8. Sign Up
9. Login
10. Forgot Password
11. Reset Password
12. Email Verification

## Onboarding

13. Welcome
14. Connect Gmail
15. Gmail OAuth Success
16. Connect Zoho
17. Zoho OAuth Success
18. Connected Accounts Summary
19. Communication Preferences
20. Safety Rules Setup
21. Writing Style Setup
22. Onboarding Complete

## Application

23. Dashboard
24. Unified Inbox
25. Inbox Empty State
26. Email Detail
27. Email Detail + AI Analysis
28. AI Classification Explanation
29. Decision Center
30. High-Risk Review
31. AI Draft
32. Draft Editor
33. Draft Comparison
34. Draft Approval Confirmation
35. Sent Confirmation
36. Drafts List
37. Draft Detail
38. Accounts List
39. Add Account
40. Account Detail
41. Account Sync Status
42. Sync Error
43. Analytics Overview
44. Classification Analytics
45. Risk Analytics
46. Draft Analytics
47. Communication Rules
48. Risk Rules
49. Writing Style
50. Notifications
51. General Settings
52. Security Settings
53. Privacy / Data Controls
54. Audit Log

## System States

55. Loading Dashboard
56. Loading Inbox
57. Email Processing
58. AI Analysis in Progress
59. Empty Inbox
60. No Decisions
61. No Drafts
62. Gmail Connection Error
63. Zoho Connection Error
64. AI Processing Error
65. Network Error
66. Permission Error
67. Session Expired
68. Unauthorized Access
69. Account Sync Paused
70. Account Reconnect Required

---

# 8. Core User Flow

```text
USER
  ↓
SIGN UP / LOGIN
  ↓
CONNECT EMAIL ACCOUNTS
  ↓
GMAIL / ZOHO AUTHORIZATION
  ↓
FETCH EMAILS
  ↓
NORMALIZE EMAIL DATA
  ↓
EMAIL UNDERSTANDING
  ↓
CLASSIFICATION
  ↓
INTENT DETECTION
  ↓
PRIORITY DETECTION
  ↓
RISK / CONFIDENTIALITY CHECK
  ↓
USER POLICY CHECK
  ↓
DECISION ENGINE
  ↓
┌──────────────────────────────┐
│                              │
SAFE                       HIGH RISK
│                              │
↓                              ↓
GENERATE DRAFT             HUMAN REVIEW
│                              │
└──────────────┬───────────────┘
               ↓
        EXECUTIVE DASHBOARD
               ↓
       USER APPROVES / EDITS
               ↓
          SEND / SAVE
               ↓
           AUDIT LOG
```

---

# 9. Multi-Mailbox Model

One SaaS account can contain:

```text
User
├── Gmail Account 1
├── Gmail Account 2
├── Gmail Account 3
└── Zoho Account 1
```

All accounts feed into one normalized email model.

Every email must retain:

- Provider
- Account ID
- Message ID
- Thread ID
- Sender
- Recipients
- Subject
- Body
- Timestamp
- Attachments
- Metadata

The UI must always make the source account visible.

---

# 10. Email Classification

Use three independent classification dimensions.

## Priority

- Critical
- Urgent
- Important
- Normal
- Low Priority
- Spam

## Intent

- Client
- Sales
- Vendor
- Internal
- Finance
- HR
- Legal
- Meeting
- Support
- Newsletter
- Marketing
- Personal
- Other

## Risk

- Safe
- Review Required
- High Risk
- Confidential

Do not combine all three into a single confusing status.

The user should understand:

1. What is this?
2. How important is it?
3. Is it safe?

---

# 11. Risk Detection

The risk engine should look for signals including:

## Financial

- Financial amounts
- Payment requests
- Quotations
- Pricing
- Purchase orders
- Investment commitments

## Legal

- Contracts
- Agreements
- NDA
- Legal notices
- Terms

## Confidential

- Confidential
- Private
- Restricted
- Internal only

## Business Decisions

- Approve
- Accept
- Confirm
- Authorize
- Sign
- Commit

## HR-sensitive

- Salary
- Termination
- Employee complaint
- Performance issue

## Security-sensitive

- Password
- OTP
- Credentials
- Security codes

These signals should contribute to risk evaluation, but should not be treated as a perfect deterministic guarantee of intent.

---

# 12. Decision Engine

Inputs:

```text
Priority
+
Intent
+
Risk
+
Sender
+
Email context
+
User rules
```

Output:

```text
Allowed AI Action
```

Examples:

### Safe

"Can we schedule a meeting on Tuesday?"

→ Safe  
→ Draft may be generated  
→ Human can review and send

### Financial

"We accept your ₹50 lakh quotation. Please confirm."

→ Financial  
→ High Risk  
→ Automatic reply blocked  
→ Human review

### Confidential

"Attached is the confidential acquisition document."

→ Confidential  
→ Restricted  
→ Human attention required

---

# 13. Safety Gate

Core architecture:

```text
EMAIL
  ↓
AI ANALYSIS
  ↓
CLASSIFICATION
  ↓
RISK ENGINE
  ↓
POLICY ENGINE
  ↓
SAFETY GATE
  ↓
┌─────────────────┴─────────────────┐
↓                                   ↓
SAFE TO DRAFT                       HIGH RISK
↓                                   ↓
AI DRAFT                            HUMAN REVIEW
↓                                   ↓
└─────────────────┬─────────────────┘
                  ↓
             USER ACTION
                  ↓
             SEND SERVICE
```

Never:

```text
LLM → Gmail Send
```

Instead:

```text
LLM
 ↓
Draft
 ↓
Safety Engine
 ↓
User Approval
 ↓
Backend Send Service
 ↓
Gmail / Zoho
```

---

# 14. Dashboard

The dashboard should answer:

**"What needs my attention right now?"**

Top summary cards:

- Critical
- Urgent
- Need Review
- Safe to Draft
- Low Priority

Main section:

## Decision Center

Examples:

- Contract approval required
- Updated quotation
- Client escalation
- NDA document
- Board meeting request

Each item should show:

- Sender
- Subject
- Account
- Intent
- Risk
- Time
- Required action

Quick actions:

- View Inbox
- Review Drafts
- Manage Accounts
- Update Rules

---

# 15. Unified Inbox

Top controls:

- All Accounts
- Gmail
- Zoho

Priority filters:

- All
- Critical
- Urgent
- Important
- Normal
- Low

Intent filters:

- Client
- Sales
- Vendor
- Finance
- HR
- Legal
- Meeting
- Internal
- Newsletter
- Other

Risk filters:

- All
- Safe
- Review
- High Risk
- Confidential

Search:

`Search emails, people, or topics`

Every email displays its source account.

---

# 16. Email Detail

Display:

- Sender
- Recipients
- Subject
- Timestamp
- Account
- Thread

Then AI Analysis:

```text
Intent: Financial
Category: Contract
Priority: Critical
Risk: High Risk
```

Reason section:

- Financial amount detected
- Approval requested
- Contract language detected
- External sender

Actions:

- Generate Draft
- Do Not Respond
- Mark as Done
- Forward

For high-risk messages:

**Human approval required**

---

# 17. Decision Center

This is a primary product screen.

Title:

**Decisions Waiting**

Show only messages that may require executive action.

Examples:

- Approve vendor contract
- Review ₹24L quotation
- Respond to client escalation
- Review legal document
- Confirm meeting

Each item:

- Why it matters
- Risk
- Suggested action

Actions:

- Review
- Open Email
- Generate Draft

Do not show hundreds of ordinary messages here.

---

# 18. AI Draft Experience

Display:

1. Original Email
2. AI Analysis
3. AI Draft

Controls:

### Tone

- Professional
- Concise
- Friendly
- Formal

### Length

- Short
- Medium
- Detailed

Actions:

- Edit Draft
- Regenerate
- Copy
- Save Draft
- Approve

Do not make automatic sending the primary action.

---

# 19. High-Risk Review

Example:

**High-Risk Communication**

Reason:

Financial commitment detected.

Signals:

- Financial amount
- Negotiation language
- External sender
- Approval requested

System action:

**Automatic reply blocked.**

Next step:

**Executive review required.**

Actions:

- Review Email
- Create Draft
- Do Not Respond

Use `#FAB60A` carefully for warning states.

---

# 20. Rules & Preferences

## Communication Safety

- Never automatically send emails
- Never respond to confidential emails
- Never negotiate pricing
- Never approve contracts
- Never make financial commitments
- Never respond to legal notices
- Never respond to HR-sensitive matters

## Writing Style

- Tone
- Length
- Greeting
- Sign-off
- Formality

## Personal Rules

Example:

"Emails from our legal team always require review."

"Emails containing financial commitments always require approval."

---

# 21. Accounts

Show:

```text
Gmail
ceo@company.com
Connected

Gmail
sales@company.com
Connected

Zoho
director@company.com
Connected
```

Actions:

- Add Account
- Reconnect
- Pause Sync
- Remove Account

Show synchronization state clearly.

---

# 22. Analytics

Use real data only.

Metrics:

- Emails Processed
- Critical Emails
- Urgent Emails
- Drafts Generated
- Drafts Approved
- Drafts Edited
- High-Risk Emails
- False Positive Rate
- Classification Performance

Charts:

- Email volume
- Priority distribution
- Intent distribution
- Risk distribution
- Draft acceptance/edit rate

If insufficient data exists:

**"Awaiting enough data"**

Do not fabricate performance percentages.

---

# 23. Mobile Design

Mobile is not a shrunken desktop.

Prioritize:

```text
Home
Inbox
Decision Center
Drafts
More
```

Mobile dashboard:

```text
Good Morning

Critical
Urgent
Need Review
Safe Drafts

DECISIONS

Contract approval
Quotation
Client escalation

DRAFTS READY
```

Use minimum 44px touch targets.

Avoid tiny text.

Important actions must be accessible with one hand.

---

# 24. iPad / Tablet

Support:

- Portrait
- Landscape

Landscape iPad:

```text
┌──────────┬─────────────────────┬────────────────────────┐
│ Sidebar  │ Email List          │ Email + AI Analysis    │
│          │                     │                        │
│ Dashboard│ Contract approval   │ Contract approval      │
│ Inbox    │ Updated quotation   │ AI Analysis            │
│ Decisions│ Client escalation   │ Risk: High             │
│ Drafts   │                     │                        │
│ Accounts │                     │                        │
└──────────┴─────────────────────┴────────────────────────┘
```

Portrait iPad:

Use an adaptive two-pane experience.

No horizontal overflow.

---

# 25. Responsive Breakpoints

Design and test:

### Mobile

- 320px
- 375px
- 390px
- 414px

### Tablet

- 768px
- 820px
- 834px
- 1024px

### Desktop

- 1280px
- 1440px
- 1536px
- 1920px

### Large

- 2560px

---

# 26. Accessibility

Design toward WCAG-oriented accessibility.

Requirements:

- Strong contrast
- Visible focus states
- Keyboard navigation
- Semantic hierarchy
- Large touch targets
- Clear errors
- Do not rely only on color
- Status badges include text
- Screen-reader-friendly labels
- Accessible form validation

Because the palette is fixed, verify contrast rather than assuming the colors are accessible in every combination.

---

# 27. Loading States

Create skeleton/loading states for:

- Dashboard
- Inbox
- Email detail
- Analytics

AI state:

**"AI is reviewing this email..."**

Do not show blank screens.

---

# 28. Empty States

### No accounts

"Connect Gmail or Zoho to get started."

### No decisions

"You're all caught up."

### No drafts

"No drafts need your attention."

### Empty inbox

"No new emails."

---

# 29. Error States

Design:

- Gmail authorization failed
- Zoho authorization failed
- Token expired
- Email synchronization failed
- AI processing failed
- Network unavailable
- Permission denied
- Session expired
- Account disconnected

Every error explains:

1. What happened?
2. What can I do?

Example:

**"Gmail needs to be connected again."**

`[Reconnect Gmail]`

---

# 30. Security UX

Create a Security page explaining only capabilities that are actually implemented.

Possible concepts:

- Secure account connection
- Permission-based access
- User-controlled actions
- Human approval for high-risk communication
- Account management
- Audit history

Do not make unsupported compliance/certification claims.

---

# 31. Design System Components

Create reusable components for:

- Buttons
- Icon buttons
- Navigation
- Cards
- Email cards
- Status badges
- Priority badges
- Risk badges
- Tabs
- Search
- Filters
- Tables
- Avatars
- Tooltips
- Toasts
- Modals
- Drawers
- Forms
- Checkboxes
- Radio buttons
- Toggles
- Progress indicators
- Skeleton loaders
- Empty states
- Error states
- Success states

All screens must use the same components.

---

# 32. Navigation

## Desktop

Persistent left sidebar:

```text
ExecuAI

Dashboard
Inbox
Decision Center
Drafts
Accounts
Analytics
Rules
Settings
```

## Mobile

Bottom navigation:

```text
Home
Inbox
Decisions
Drafts
More
```

---

# 33. Technical Target

The design must be implementable with:

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

## Backend

- Next.js API/server functionality
- Python FastAPI AI service

## Database

- PostgreSQL
- Prisma

## Queue

- Redis
- BullMQ or equivalent

## Email

- Gmail API + OAuth 2.0
- Zoho Mail API + OAuth

## Storage

- S3-compatible object storage

## AI

Provider-agnostic LLM service

## Deployment

Vercel for the web application.

---

# 34. Vercel Requirements

Design around a Vercel-deployable frontend.

Do not rely on:

- Local-only services
- Persistent in-process workers
- Browser-side secrets
- Hardcoded localhost APIs

Environment variables will eventually include:

```text
DATABASE_URL
AUTH_SECRET
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
ZOHO_CLIENT_ID
ZOHO_CLIENT_SECRET
LLM_API_KEY
STORAGE credentials
REDIS credentials
```

Never expose secret values to the browser.

Background email/AI processing should be handled through appropriate asynchronous infrastructure rather than long-running Vercel request processes.

---

# 35. Suggested Route Structure

```text
/
├── features
├── how-it-works
├── use-cases
├── security
├── pricing
├── contact
│
├── auth
│   ├── login
│   ├── signup
│   ├── forgot-password
│   └── reset-password
│
├── onboarding
│   ├── welcome
│   ├── connect-gmail
│   ├── connect-zoho
│   ├── preferences
│   ├── safety-rules
│   └── complete
│
└── app
    ├── dashboard
    ├── inbox
    ├── decisions
    ├── drafts
    ├── accounts
    ├── analytics
    ├── rules
    ├── settings
    ├── security
    └── audit-log
```

---

# 36. Core Backend Flow

```text
Gmail / Zoho
      ↓
Email Ingestion
      ↓
Normalization
      ↓
Deduplication
      ↓
AI Classification
      ↓
Intent Detection
      ↓
Priority Detection
      ↓
Risk Engine
      ↓
Policy Engine
      ↓
Safety Gate
      ↓
Draft / Human Review
      ↓
User Action
      ↓
Controlled Send
      ↓
Audit Log
      ↓
Analytics
```

---

# 37. Database Entities

Core entities:

```text
users
organizations
email_accounts
emails
email_threads
email_attachments
email_classifications
risk_assessments
drafts
user_rules
communication_profiles
audit_logs
feedback
```

Use tenant/org IDs to isolate customer data.

---

# 38. Production Quality Checklist

Before considering the UI complete:

- No spelling mistakes
- No font inconsistencies
- No duplicate screens
- No random colors
- No inconsistent terminology
- No clipped text
- No broken alignment
- No overflow
- No impossible interactions
- No fake metrics
- No unsupported security claims
- No automatic high-risk sending
- No confusing navigation
- No mobile horizontal scrolling
- No tiny touch targets
- Loading states exist
- Error states exist
- Empty states exist
- Success states exist
- Desktop tested
- Mobile tested
- iPad tested
- Landscape tested
- Portrait tested
- Large-screen tested

---

# 39. Final UX Principle

The entire product should progressively answer:

```text
WHAT IS THIS?
      ↓
WHY DOES IT MATTER?
      ↓
IS IT SAFE?
      ↓
WHAT DOES AI SUGGEST?
      ↓
WHAT SHOULD I DO?
```

The executive should never have to understand the underlying AI model.

The UI should explain AI decisions in plain language.

Example:

Instead of:

"Risk classifier probability: 0.92"

Show:

"High risk because this email contains a financial amount and asks for approval."

---

# 40. Product Identity

The website should communicate:

**AI that helps with the work without taking control of the decision.**

Core visual/product concepts:

- One inbox
- Multiple accounts
- Intelligent triage
- Explainable AI
- Safety Gate
- Human approval
- Personalized drafts
- Executive Decision Center
- Calm, premium interface

The product should feel like an executive control center rather than another email client.

---

# 41. Master Product Flow

```text
USER
 ↓
SIGN UP
 ↓
CONNECT GMAIL + ZOHO
 ↓
UNIFIED INBOX
 ↓
AI UNDERSTANDS EMAIL
 ↓
CLASSIFY
 ↓
PRIORITIZE
 ↓
IDENTIFY INTENT
 ↓
CHECK RISK
 ↓
CHECK USER RULES
 ↓
SAFETY GATE
 ↓
┌─────────────────┬──────────────────┐
│ SAFE            │ HIGH RISK        │
│                 │                  │
│ AI DRAFT        │ HUMAN REVIEW     │
└────────┬────────┴─────────┬────────┘
         ↓                   ↓
         └─────────┬─────────┘
                   ↓
             USER DECISION
                   ↓
          EDIT / APPROVE / IGNORE
                   ↓
             CONTROLLED SEND
                   ↓
              AUDIT LOG
                   ↓
               ANALYTICS
```

This is the canonical workflow that the UI, frontend implementation, backend architecture, and future product modules should follow.
