export type CourseInfo = {
  id: number;
  name: string;
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

export type Submission = {
  submitted_at: string;
  score: number;
};

export type LearnerSubmission = {
  learner_id: number;
  assignment_id: Assignment['id'];
  submission: Submission;
};
