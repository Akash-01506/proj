# **App Name**: ProctorExam AI

## Core Features:

- Role-Based Access: Secure authentication using Firebase Authentication (Email/Password and Google login) with role-based access control for Admin, Faculty/Proctor, and Student.
- Exam Creation and Management: Faculty/Proctors can create exams with multiple question types (MCQ, short answers) and assign them to students.
- Real-time Monitoring: Utilize WebRTC for real-time video and audio monitoring of students during exams. Disable student mic and camera initially for privacy reasons, then allow at start of test.
- AI-Assisted Proctoring: Implement AI-assisted proctoring with rule-based simulation using Firebase Cloud Functions to detect multiple faces, absence of face, tab switching, and muted mic/camera. The rule based system acts as a tool. Generate warnings.
- Suspicious Activity Logging: Automatically log suspicious activities with timestamps and snapshots, storing the logs in Firebase Storage. 
- Automated Exam Submission: Automatically submit the exam on severe violations, such as repeated tab switching or detected cheating behavior.
- Admin Reporting and Analytics: Provide system-wide reports and violation analytics for administrators to monitor overall exam integrity and identify potential issues.

## Style Guidelines:

- Primary color: Deep Blue (#1A237E) for trust and seriousness.
- Background color: Light Grey (#F5F5F5), slightly desaturated version of the primary, suitable for a light scheme.
- Accent color: Purple (#7B1FA2), for CTAs and highlights.
- Body and headline font: 'Inter' (sans-serif) for a clean, modern, and neutral academic interface.
- Use a professional and consistent icon set relevant to proctoring and academic activities.
- Design clean, intuitive dashboards with well-organized charts and logs for all user roles.
- Incorporate subtle animations for loading indicators and real-time updates to enhance user experience without causing distractions.