"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { CheckCircle, XCircle, Webcam, Mic, Wifi, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { studentExams, exams } from '@/lib/placeholder-data';
import { useRouter } from 'next/navigation';

export function StudentDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [checkingSystem, setCheckingSystem] = useState(false);
  const [systemCheckResults, setSystemCheckResults] = useState({
    camera: false,
    mic: false,
    internet: false,
  });

  const myExams = studentExams.filter(se => se.studentId === user?.id);

  const performSystemCheck = async () => {
    setCheckingSystem(true);
    // Simulate checks
    await new Promise(res => setTimeout(res, 500));
    const camera = await navigator.mediaDevices.getUserMedia({ video: true }).then(() => true).catch(() => false);
    await new Promise(res => setTimeout(res, 500));
    const mic = await navigator.mediaDevices.getUserMedia({ audio: true }).then(() => true).catch(() => false);
    await new Promise(res => setTimeout(res, 500));
    const internet = navigator.onLine;

    setSystemCheckResults({ camera, mic, internet });
    setCheckingSystem(false);
  };
  
  const allChecksPassed = systemCheckResults.camera && systemCheckResults.mic && systemCheckResults.internet;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {user?.name}</CardTitle>
          <CardDescription>Here are your assigned exams. Good luck!</CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My Exams</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Exam Title</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myExams.map(se => {
                const exam = exams.find(e => e.id === se.examId);
                if (!exam) return null;
                const canStart = se.status === 'pending' || se.status === 'in_progress';

                return (
                  <TableRow key={se.id}>
                    <TableCell className="font-medium">{exam.title}</TableCell>
                    <TableCell>{exam.subject}</TableCell>
                    <TableCell>{exam.duration} mins</TableCell>
                    <TableCell>
                      <Badge variant={se.status === 'completed' ? 'secondary' : (se.status === 'pending' ? 'outline' : (se.status === 'in_progress' ? 'default' : 'destructive'))}>
                        {se.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                       <AlertDialog onOpenChange={(open) => { if(open) performSystemCheck() }}>
                        <AlertDialogTrigger asChild>
                           <Button size="sm" disabled={!canStart}>
                            {se.status === 'in_progress' ? 'Resume Exam' : 'Start Exam'}
                           </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Pre-Exam System Check</AlertDialogTitle>
                            <AlertDialogDescription>
                              We need to ensure your system is ready for the proctored exam.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          {checkingSystem ? (
                            <div className="flex items-center justify-center p-8">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                          ) : (
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2"><Webcam className="h-5 w-5"/> Camera Access</div>
                                    {systemCheckResults.camera ? <CheckCircle className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-destructive"/>}
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2"><Mic className="h-5 w-5"/> Microphone Access</div>
                                    {systemCheckResults.mic ? <CheckCircle className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-destructive"/>}
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2"><Wifi className="h-5 w-5"/> Internet Connection</div>
                                    {systemCheckResults.internet ? <CheckCircle className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-destructive"/>}
                                </div>
                            </div>
                          )}
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction disabled={!allChecksPassed || checkingSystem} onClick={() => router.push(`/dashboard/exam/${exam.id}`)}>
                                Proceed to Exam
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
