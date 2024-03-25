export type CourseInfo = {
  id: number;
  name: string;
};

export const COURSE_INFO_DATA: CourseInfo = {
  id: 451,
  name: 'Introduction to JavaScript',
};

export type Assignment = {
  id: number;
  name: string;
  due_at: string;
  points_possible: number;
};

export type AssignmentGroup = {
  id: number;
  name: CourseInfo['name'];
  course_id: CourseInfo['id'];
  group_weight: number;
  assignments: Array<Assignment>;
};

export const ASSIGNMENT_GROUP_DATA: AssignmentGroup = {
  id: 12345,
  name: 'Fundamentals of JavaScript',
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: 'Declare a Variable',
      due_at: '2023-01-25',
      points_possible: 50,
    },
    {
      id: 2,
      name: 'Write a Function',
      due_at: '2023-02-27',
      points_possible: 150,
    },
    {
      id: 3,
      name: 'Code the World',
      due_at: '3156-11-15',
      points_possible: 500,
    },
  ],
};

export type Submission = {
  submitted_at: string;
  score: number;
};

export type LearnerSubmission = {
  learner_id: number;
  assignment_id: Assignment['id'];
  submission: Submission;
};

export const LEARNER_SUBMISSIONS_DATA: Array<LearnerSubmission> = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: '2023-01-25',
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: '2023-02-12',
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: '2023-01-25',
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: '2023-01-24',
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: '2023-03-07',
      score: 140,
    },
  },
];