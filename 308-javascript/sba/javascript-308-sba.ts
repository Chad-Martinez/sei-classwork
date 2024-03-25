import {
  COURSE_INFO_DATA,
  ASSIGNMENT_GROUP_DATA,
  LEARNER_SUBMISSIONS_DATA,
  CourseInfo,
  AssignmentGroup,
  Assignment,
  LearnerSubmission,
} from './data';

type ResultData =
  | {
      id: number;
      avg: number;
      [key: number]: number;
    }
  | undefined;

const getUniqueLearners = (learners: Array<LearnerSubmission>): Array<number> =>
  learners
    .map((learner: LearnerSubmission): number => learner.learner_id)
    .filter(
      (id: number, i: number, curr: number[]): boolean => curr.indexOf(id) === i
    );

const sortLearnersByID = (
  learnerIds: Array<number>,
  learners: Array<LearnerSubmission>
): Array<Array<LearnerSubmission>> => {
  const sortedLearners: Array<Array<LearnerSubmission>> = [];
  learnerIds.forEach((id) => {
    const student = [];
    learners.forEach(
      (learner) => id == learner.learner_id && student.push(learner)
    );
    sortedLearners.push(student);
  });
  return sortedLearners;
};

const calcAvg = (numArr: Array<number>, denomArr: Array<number>): number => {
  const numerator: number = numArr.reduce((acc, curr) => acc + curr, 0);
  const denominator: number = denomArr.reduce((acc, curr) => acc + curr, 0);

  return numerator / denominator;
};

const mapLearners = (
  sortedLearners: Array<Array<LearnerSubmission>>,
  assignments: Array<Assignment>
) =>
  sortedLearners.map((learnerData: Array<LearnerSubmission>): ResultData => {
    const learnerResults: ResultData = undefined;

    const numeratorWeight: Array<number> = [];
    const denomninatroWeight: Array<number> = [];

    learnerResults['id'] = learnerData[0].learner_id;

    learnerData.forEach((assignment) => {
      const { assignment_id, submission } = assignment;

      for (let i = 0; i < assignments.length; i++) {
        if (assignment_id == assignments[i].id) {
          const assignmentAvg =
            submission.score / assignments[i].points_possible;
          learnerResults[assignment_id] = assignmentAvg;
          numeratorWeight.push(submission.score);
          denomninatroWeight.push(assignments[i].points_possible);
        }
      }
    });
    learnerResults['avg'] = calcAvg(numeratorWeight, denomninatroWeight);

    return learnerResults;
  });

const getLearnerData = (
  courseInfo: CourseInfo,
  assignmentGroup: AssignmentGroup,
  learnerSubmissions: Array<LearnerSubmission>
) => {
  try {
    if (assignmentGroup.course_id != courseInfo.id)
      throw Error('Assignment Group and Course IDs do not match');

    const uniqueLearnerIds: Array<number> =
      getUniqueLearners(learnerSubmissions);

    const sortedLearners: Array<Array<LearnerSubmission>> = sortLearnersByID(
      uniqueLearnerIds,
      learnerSubmissions
    );

    const { assignments } = assignmentGroup;

    const mappedLearners: Array<ResultData> = mapLearners(
      sortedLearners,
      assignments
    );
    return mappedLearners;
  } catch (error) {
    console.log(error);
  }
};

const learnerData: Array<ResultData> = getLearnerData(
  COURSE_INFO_DATA,
  ASSIGNMENT_GROUP_DATA,
  LEARNER_SUBMISSIONS_DATA
);

console.log('LEARNER DATA ', learnerData);
