# PathQuest

Interactive healthcare pathway exploration and identity-development platform for Medical Explorations and future CaPS pathway programming at the University of Missouri School of Medicine.

## Vision

PathQuest is designed to move beyond passive healthcare career presentations by creating immersive, collaborative, case-based learning experiences where students investigate pathway scenarios, work in teams, and explore healthcare professions through interactive storytelling.

## Core Features

- Interactive pathway exploration experiences
- Healthcare profession discovery
- Student identity formation framework
- Team-based collaborative learning
- Reflection and assessment tools
- Facilitator and presenter dashboards
- Future live Zoom integration
- Research and analytics infrastructure

## Educational Philosophy

PathQuest is not designed to simulate real-world healthcare systems or clinical infrastructure.

The platform instead focuses on:

- healthcare identity development
- collaborative inquiry learning
- pathway exploration
- career awareness
- professional belonging
- student engagement and reflection

The project is grounded in anti-deficit educational frameworks and student development theory.

## Tech Stack

- Next.js 14+
- TypeScript
- Tailwind CSS
- Supabase
- Vercel
- GitHub

# Current Development Batch

## Batch 1 — Foundation & Authentication

### Primary Objectives

- Establish secure authentication
- Build role-aware architecture
- Scaffold protected application routes
- Configure database foundation
- Create reusable application structure

### Batch 1 Deliverables

| Deliverable | Status |
|---|---|
| Supabase project | Complete |
| Foundation schema | Complete |
| Educational-safe schema language | Complete |
| Role architecture planning | Complete |
| Authentication setup | In Progress |
| Protected routing | Pending |
| Dashboard scaffolding | Pending |
| Session-aware layouts | Pending |

### Batch 1 Success Criteria

A user should be able to:

1. Create an account
2. Log in securely
3. Receive a role assignment
4. Access protected routes
5. Reach a role-aware dashboard

No advanced gameplay, multiplayer, analytics dashboards, AI systems, or gamification layers should be implemented before Batch 1 is complete.

## Planned Development Phases

### Phase 1 — Foundation
- Repository structure
- Authentication scaffold
- Role architecture
- Initial UI prototype
- Database schema and RLS policies

### Phase 2 — Experience Engine
- Dynamic learning experience creation
- Segment sequencing
- Reflection workflows
- Career insight reveal system

### Phase 3 — Engagement Layer
- Live multiplayer collaboration
- Polling system
- Team competitions
- Facilitator controls

### Phase 4 — Institutional & Research Layer
- Analytics dashboards
- Assessment exports
- Longitudinal participation tracking
- Research integration
- Publication-ready data structures

## User Roles

| Role | Primary Function |
|---|---|
| Student | Participate in pathway experiences |
| Presenter | Guide large-group experiences |
| Facilitator | Manage live sessions and teams |
| Administrator | System and content management |

## Foundational Database Architecture

### Core Tables

| Table | Purpose |
|---|---|
| `participant_profiles` | Learner identity and profile data |
| `user_roles` | Role-based access management |
| `learning_activities` | Reusable educational experiences |
| `activity_segments` | Sequenced activity components |
| `participant_groups` | Team structures |
| `group_memberships` | Team membership relationships |
| `session_runs` | Live session instances |
| `participant_responses` | Reflections and learner submissions |
| `career_connections` | Profession exploration content |
| `engagement_metrics` | Educational analytics and research data |

## Recommended Initial Route Structure

```plaintext
app/
│
├── login/
├── dashboard/
├── activity/
│   └── [slug]/
├── session/
│   └── [id]/
├── facilitator/
│   └── [id]/
└── admin/
```

## Educational Activity Schema

To ensure this platform remains clearly educational and avoids resembling real-world clinical systems, cybersecurity tooling, or production healthcare infrastructure, PathQuest uses intentionally neutral and education-focused naming conventions.

### Naming Philosophy

The platform avoids:

- production-style healthcare identifiers
- real-world EHR terminology
- security or exploit-oriented naming
- sensitive or regulated terminology where unnecessary
- vendor-like healthcare system naming patterns

The platform instead uses:

- learner-centered terminology
- educational workflow language
- activity/session-based naming
- collaborative learning descriptors

## Sample Activity Payload

```json
{
  "activity_id": "pq-2026-001",
  "session_title": "The Mystery of the Mountain Hiker",
  "experience_type": "team_pathway_exploration",
  "difficulty_level": "intermediate",
  "participant_group": {
    "group_id": "team-orion",
    "group_name": "Team Orion",
    "participant_total": 6
  },
  "learning_sequence": {
    "sequence_stage": 2,
    "opened_clues": [
      "field-note-01",
      "lab-card-02"
    ],
    "remaining_clues": 4
  },
  "reflection_prompts": [
    {
      "prompt_id": "reflection-01",
      "prompt_text": "What assumptions did your group make early in the activity?"
    }
  ],
  "career_connections": [
    {
      "role_title": "Emergency Medicine Physician",
      "focus_area": "critical decision making"
    },
    {
      "role_title": "Respiratory Therapist",
      "focus_area": "airway support"
    }
  ],
  "session_metrics": {
    "engagement_score": 88,
    "team_collaboration_score": 91,
    "reflection_completion_rate": 100
  },
  "facilitator_notes": {
    "session_status": "active",
    "recommended_followup": "Discuss collaborative reasoning strategies"
  }
}
```

## Reserved Naming Restrictions

The following categories of names should be avoided in schemas, APIs, database tables, and payloads:

### Avoid Healthcare Production Terms

- patient
- medical_record
- ehr
- emr
- chart
- diagnosis_code
- insurance_claim
- provider_gateway

### Avoid Security/Exploit Terms

- payload
- exploit
- beacon
- implant
- persistence
- exfiltration
- root_access
- attack_vector

### Avoid Sensitive Identifier Patterns

- realistic MRN formats
- insurance IDs
- social security formats
- real patient naming conventions

## Recommended Educational Naming Patterns

| Instead Of | Use |
|---|---|
| patient | participant / learner |
| case_file | activity_bundle |
| medical_record | learning_record |
| provider | facilitator |
| diagnosis | scenario_focus |
| clinical_notes | facilitator_notes |
| intervention | learning_action |
| dashboard_alert | session_update |
| clinical_case | learning_experience |
| diagnosis_reveal | career_insight |

## Repository Structure

```plaintext
caps-clinical-quest/
│
├── app/
├── components/
├── lib/
├── database/
├── docs/
├── public/
└── styles/
```

## Current Status

Foundation schema deployed to Supabase.

Current engineering focus:
- authentication setup
- protected routing
- role-aware dashboard architecture
- educational activity engine scaffolding
- facilitator workflow planning
