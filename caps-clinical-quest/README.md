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

- Student
- Presenter
- Facilitator
- Administrator

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

## Schema Field Reference

| Field | Purpose |
|---|---|
| `activity_id` | Unique identifier for a learning activity |
| `session_title` | Educational experience title |
| `experience_type` | Activity classification |
| `participant_group` | Team or cohort information |
| `learning_sequence` | Tracks activity progression and flow |
| `reflection_prompts` | Structured student reflection prompts |
| `career_connections` | Healthcare profession exploration links |
| `session_metrics` | Educational engagement indicators |
| `facilitator_notes` | Presenter/facilitator guidance data |

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

Institutional prototype scaffold initialized.

Current focus:
- foundational database architecture
- authentication and role management
- educational activity engine
- facilitator workflows
- research-informed analytics design
