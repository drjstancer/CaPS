# CaPS Clinical Quest

Interactive healthcare identity-building platform for Medical Explorations and future CaPS pathway programming at the University of Missouri School of Medicine.

## Vision

CaPS Clinical Quest is designed to move beyond passive healthcare career presentations by creating immersive, case-based learning experiences where students investigate medical scenarios, collaborate in teams, and explore healthcare professions through interactive storytelling.

## Core Features

- Interactive medical mystery cases
- Healthcare profession exploration
- Student identity formation framework
- Team-based learning experiences
- Reflection and assessment tools
- Presenter and facilitator dashboards
- Future live Zoom integration
- Research and analytics infrastructure

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

### Phase 2 — Case Engine
- Dynamic case creation
- Clue sequencing
- Reflection system
- Profession reveal system

### Phase 3 — Engagement Layer
- Live multiplayer gameplay
- Polling system
- Leaderboards
- Team competitions

### Phase 4 — Institutional & Research Layer
- Analytics dashboards
- Assessment exports
- Longitudinal participation tracking
- Research integration

## User Roles

- Student
- Presenter
- Facilitator
- Administrator

## Educational Activity Schema

To ensure this platform remains clearly educational and avoids resembling real-world clinical systems, cybersecurity tooling, or production healthcare infrastructure, CaPS Clinical Quest uses intentionally neutral and education-focused naming conventions.

### Naming Philosophy

The platform avoids:

- Production-style healthcare identifiers
- Real-world EHR terminology
- Security or exploit-oriented naming
- Sensitive or regulated terminology where unnecessary
- Vendor-like healthcare system naming patterns

The platform instead uses:

- learner-centered terminology
- educational workflow language
- activity/session-based naming
- simulation-oriented descriptors

## Sample Activity Payload

```json
{
  "activity_id": "cq-2026-001",
  "session_title": "The Mystery of the Mountain Hiker",
  "experience_type": "team_case_exploration",
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
    "recommended_followup": "Discuss diagnostic reasoning strategies"
  }
}
```

## Schema Field Reference

| Field | Purpose |
|---|---|
| `activity_id` | Unique identifier for a learning activity |
| `session_title` | Educational case or activity title |
| `experience_type` | Activity classification |
| `participant_group` | Team or cohort information |
| `learning_sequence` | Tracks clue progression and activity flow |
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
