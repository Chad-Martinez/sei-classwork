import {
  COURSE_INFO_DATA,
  ASSIGNMENT_GROUP_DATA,
  LEARNER_SUBMISSIONS_DATA,
} from './data';

import {
  CourseInfo,
  AssignmentGroup,
  Assignment,
  LearnerSubmission,
} from './types';

type ResultData =
  | {
      id: number;
      avg: number;
      [key: number]: number;
    }
  | {};

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

const addNums = (numArr: Array<number>): number =>
  numArr.reduce((acc: number, curr: number): number => acc + curr, 0);

const getAvgs = (numArr: Array<number>, denomArr: Array<number>): number =>
  addNums(numArr) / addNums(denomArr);

const isGradeable = (dueDate: string): boolean =>
  Date.parse(dueDate) <= Date.now();

const isPastDue = (dateSubmitted: string, dateDue: string): boolean =>
  Date.parse(dateSubmitted) > Date.parse(dateDue);

const calculateScores = (
  learnerData: Array<LearnerSubmission>,
  assignments: Array<Assignment>
): ResultData => {
  const learnerResults: ResultData = {};
  const numeratorWeight: Array<number> = [];
  const denomninatroWeight: Array<number> = [];

  learnerData.forEach((assignment) => {
    const { assignment_id, submission } = assignment;

    let i: number = 0;
    while (i < assignments.length) {
      const isScorable: boolean = isGradeable(assignments[i].due_at);
      const pastDue: boolean = isPastDue(
        submission.submitted_at,
        assignments[i].due_at
      );
      const pointsPossible: number = assignments[i].points_possible;

      if (
        assignment_id == assignments[i].id &&
        isScorable &&
        pointsPossible != 0
      ) {
        let score = submission.score;
        if (pastDue) {
          score = score * 0.9;
        }
        const assignmentAvg: number = score / pointsPossible;
        learnerResults[assignment_id] = assignmentAvg;

        numeratorWeight.push(score);
        denomninatroWeight.push(pointsPossible);
        i++;
      } else {
        i++;
        console.log('INDEX IN CONTINUE', i);
        continue;
      }
    }
  });
  learnerResults['avg'] = getAvgs(numeratorWeight, denomninatroWeight);
  return learnerResults;
};

const mapLearners = (
  sortedLearners: Array<Array<LearnerSubmission>>,
  assignments: Array<Assignment>
) =>
  sortedLearners.map((learnerData: Array<LearnerSubmission>): ResultData => {
    const scoreAverages: ResultData = calculateScores(learnerData, assignments);

    return {
      id: learnerData[0].learner_id,
      ...scoreAverages,
    };
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

    return mapLearners(sortedLearners, assignments);
  } catch (error) {
    console.log('ERROR ', error);
  }
};

const learnerData: Array<ResultData> = getLearnerData(
  COURSE_INFO_DATA,
  ASSIGNMENT_GROUP_DATA,
  LEARNER_SUBMISSIONS_DATA
);

console.log('LEARNER DATA ', learnerData);
