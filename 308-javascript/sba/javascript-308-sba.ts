import {
  COURSE_INFO_DATA,
  ASSIGNMENT_GROUP_DATA,
  LEARNER_SUBMISSIONS_DATA,
  CourseInfo,
  AssignmentGroup,
  LearnerSubmission,
} from './data';

const getUniqueLearners = (learners: Array<LearnerSubmission>): Array<number> =>
  learners
    .map((learner) => learner.learner_id)
    .filter((id, i, curr) => curr.indexOf(id) === i);

const sortLearnersByID = (
  learnerIds: Array<number>,
  learners: Array<LearnerSubmission>
): Array<Array<LearnerSubmission>> => {
  const sortedLearners = [];
  learnerIds.forEach((id) => {
    const student = [];
    learners.forEach(
      (learner) => id == learner.learner_id && student.push(learner)
    );
    sortedLearners.push(student);
  });
  return sortedLearners;
};


const getLearnerData = (
  courseInfo: CourseInfo,
  assignmentGroup: AssignmentGroup,
  learnerSubmissions: Array<LearnerSubmission>
) => {
  try {
    if (assignmentGroup.course_id != courseInfo.id)
      throw Error('Assignment Group and Course IDs do not match');

    const uniqueLearnerIds = getUniqueLearners(learnerSubmissions);

    const sortedLearners = sortLearnersByID(
      uniqueLearnerIds,
      learnerSubmissions
    );
  } catch (error) {
    console.log(error);
  }
};

const learnerData = getLearnerData(
  COURSE_INFO_DATA,
  ASSIGNMENT_GROUP_DATA,
  LEARNER_SUBMISSIONS_DATA
);
