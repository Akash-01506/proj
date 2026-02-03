export type UserRole = 'admin' | 'faculty' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export type Question = {
  id: string;
  text: string;
  type: 'mcq' | 'short_answer';
  options?: string[];
  answer: string;
};

export interface Exam {
  id: string;
  title: string;
  subject: string;
  duration: number; // in minutes
  questions: Question[];
  createdBy: string; // faculty name
}

export interface StudentExam {
  id: string;
  examId: string;
  studentId: string;
  status: 'pending' | 'in_progress' | 'completed' | 'violation';
  score?: number;
}

export interface Violation {
  id: string;
  studentExamId: string;
  type: 'Tab Switch' | 'No Face Detected' | 'Multiple Faces' | 'Mic Muted' | 'Camera Off';
  timestamp: Date;
  severity: 'low' | 'medium' | 'high';
}
