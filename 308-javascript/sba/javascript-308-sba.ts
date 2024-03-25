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



const getLearnerData = (
  courseInfo: CourseInfo,
  assignmentGroup: AssignmentGroup,
  learnerSubmissions: Array<LearnerSubmission>
) => {
  try {
    if (assignmentGroup.course_id != courseInfo.id)
      throw Error('Assignment Group and Course IDs do not match');

    const uniqueLearnerIds = getUniqueLearners(learnerSubmissions);
  } catch (error) {
    console.log(error);
  }
};

const learnerData = getLearnerData(
  COURSE_INFO_DATA,
  ASSIGNMENT_GROUP_DATA,
  LEARNER_SUBMISSIONS_DATA
);

console.log('LEARNER DATA ', learnerData);

// const mappedLearners = sortedLearners.map((learnerData) => {
//   //   console.log(learner);
//   const learnerResults = new Map();
//   const numeratorWeight: Array<number> = [];
//   const denomninatroWeight: Array<number> = [];

//   learnerResults.set('id', learnerData[0].learner_id);
//   learnerData.forEach((assignment) => {
//     const { assignment_id, submission } = assignment;

//     for (let i = 0; i < assignments.length; i++) {
//       if (assignment_id == assignments[i].id) {
//         console.log(
//           'ASSIGNMENT ',
//           submission.score,
//           assignments[i].points_possible
//         );
//         const assignmentAvg =
//           submission.score / assignments[i].points_possible;
//         learnerResults.set(assignment_id, assignmentAvg);
//         numeratorWeight.push(submission.score);
//         denomninatroWeight.push(assignments[i].points_possible);
//       }
//     }
//   });
//   learnerResults.set('avg', calcAvg(numeratorWeight, denomninatroWeight));
//   console.log(calcAvg(numeratorWeight, denomninatroWeight));
//   return learnerResults;
// });
