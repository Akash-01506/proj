import type { User, Exam, StudentExam, Violation, Question } from './types';

export const users: User[] = [
  { id: 'user-1', name: 'Dr. Alan Grant', email: 'alan.grant@example.com', role: 'faculty', avatar: 'https://picsum.photos/seed/101/100/100' },
  { id: 'user-2', name: 'Alice Johnson', email: 'alice.j@example.com', role: 'student', avatar: 'https://picsum.photos/seed/102/100/100' },
  { id: 'user-3', name: 'Bob Williams', email: 'bob.w@example.com', role: 'student', avatar: 'https://picsum.photos/seed/103/100/100' },
  { id: 'user-4', name: 'Super Admin', email: 'admin@example.com', role: 'admin', avatar: 'https://picsum.photos/seed/104/100/100' },
  { id: 'user-5', name: 'Charlie Brown', email: 'charlie.b@example.com', role: 'student', avatar: 'https://picsum.photos/seed/105/100/100' },
  { id: 'user-6', name: 'Dr. Ellie Sattler', email: 'ellie.sattler@example.com', role: 'faculty', avatar: 'https://picsum.photos/seed/106/100/100' },
];

const questions: Question[] = [
    { id: 'q1', text: 'What is the time complexity of a binary search?', type: 'mcq', options: ['O(n)', 'O(log n)', 'O(n^2)', 'O(1)'], answer: 'O(log n)' },
    { id: 'q2', text: 'Explain the concept of polymorphism in OOP.', type: 'short_answer', answer: 'Polymorphism allows objects of different classes to be treated as objects of a common superclass.' },
    { id: 'q3', text: 'Which data structure uses LIFO?', type: 'mcq', options: ['Queue', 'Stack', 'Linked List', 'Tree'], answer: 'Stack' },
    { id: 'q4', text: 'What is a primary key in a database?', type: 'short_answer', answer: 'A unique identifier for a record in a table.' },
    { id: 'q5', text: 'What does "API" stand for?', type: 'mcq', options: ['Application Programming Interface', 'Automated Program Interaction', 'Applied Programming Integration', 'Application Process Interface'], answer: 'Application Programming Interface' },
];

export const exams: Exam[] = [
  { id: 'exam-1', title: 'Data Structures Mid-Term', subject: 'CS-201', duration: 60, questions: questions, createdBy: 'Dr. Alan Grant' },
  { id: 'exam-2', title: 'Introduction to Algorithms', subject: 'CS-301', duration: 90, questions: questions.slice(0,3), createdBy: 'Dr. Ellie Sattler' },
  { id: 'exam-3', title: 'Database Fundamentals Final', subject: 'CS-450', duration: 120, questions: questions.slice(2,5), createdBy: 'Dr. Alan Grant' },
];

export const studentExams: StudentExam[] = [
  { id: 'se-1', examId: 'exam-1', studentId: 'user-2', status: 'pending' },
  { id: 'se-2', examId: 'exam-2', studentId: 'user-2', status: 'completed', score: 85 },
  { id: 'se-3', examId: 'exam-1', studentId: 'user-3', status: 'completed', score: 92 },
  { id: 'se-4', examId: 'exam-3', studentId: 'user-3', status: 'pending' },
  { id: 'se-5', examId: 'exam-2', studentId: 'user-5', status: 'violation' },
  { id: 'se-6', examId: 'exam-3', studentId: 'user-5', status: 'in_progress' },
];

export const violations: Violation[] = [
  { id: 'v-1', studentExamId: 'se-5', type: 'Tab Switch', timestamp: new Date(Date.now() - 2 * 60000), severity: 'medium' },
  { id: 'v-2', studentExamId: 'se-5', type: 'No Face Detected', timestamp: new Date(Date.now() - 5 * 60000), severity: 'high' },
  { id: 'v-3', studentExamId: 'se-5', type: 'Tab Switch', timestamp: new Date(Date.now() - 10 * 60000), severity: 'medium' },
  { id: 'v-4', studentExamId: 'se-6', type: 'Mic Muted', timestamp: new Date(Date.now() - 1 * 60000), severity: 'low' },
];
