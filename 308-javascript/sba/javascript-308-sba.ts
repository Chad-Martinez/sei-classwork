import {
  COURSE_INFO_DATA,
  ASSIGNMENT_GROUP_DATA,
  LEARNER_SUBMISSIONS_DATA,
  CourseInfo,
  AssignmentGroup,
  LearnerSubmission,
} from './data';

type LearnerData = {
  id: number;
  avg: number;
  assignment_id: number;
};

const getLearnerData = (
  courseInfo: CourseInfo,
  assignmentGroup: AssignmentGroup,
  leanerSubmissions: Array<LearnerSubmission>
) => {};

const learnerData = getLearnerData(
  COURSE_INFO_DATA,
  ASSIGNMENT_GROUP_DATA,
  LEARNER_SUBMISSIONS_DATA
);

console.log(learnerData);
