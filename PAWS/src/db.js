import Dexie from 'dexie'

export const db = new Dexie('jpawsComplianceDB')

db.version(1).stores({
  students: 'studentId, muid, lastName, status, programTrack, cohortYear',
  advisors: 'advisorId, fullName, roleType',
  requirements: 'requirementId, requirementName, requirementCategory, activeFlag',
  studentRequirements: 'studentRequirementStatusId, studentId, requirementId, requirementCycle, completionStatus',
  events: 'eventId, eventName, eventCategory, eventDate',
  participation: 'participationId, studentId, eventId, participationStatus',
  shadowing: 'shadowingWorkflowId, studentId, shadowingCycle, eligibilityStatus, vettingStatus, matchStatus',
  advising: 'meetingId, studentId, advisorId, meetingDate, meetingType',
  outcomes: 'alumniOutcomeId, studentId, updateDate'
})

export const seedIfEmpty = async (seed) => {
  const count = await db.students.count()
  if (count === 0) {
    await Promise.all([
      db.students.bulkPut(seed.students),
      db.advisors.bulkPut(seed.advisors),
      db.requirements.bulkPut(seed.requirements),
      db.studentRequirements.bulkPut(seed.studentRequirements),
      db.events.bulkPut(seed.events),
      db.participation.bulkPut(seed.participation),
      db.shadowing.bulkPut(seed.shadowing),
      db.advising.bulkPut(seed.advising),
      db.outcomes.bulkPut(seed.outcomes)
    ])
  }
}
