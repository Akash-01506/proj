"use client";
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Video, Timer, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { exams, violations as allViolations } from '@/lib/placeholder-data';
import type { Question, Violation } from '@/lib/types';

export default function ExamPage() {
  const params = useParams();
  const { id } = params;
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  const exam = exams.find(e => e.id === id);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState((exam?.duration || 0) * 60);
  const [violations, setViolations] = useState<Violation[]>([]);
  
  // Violation Simulation
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        const newViolation: Violation = { id: `v-${Date.now()}`, studentExamId: 'se-current', type: 'Tab Switch', timestamp: new Date(), severity: 'medium' };
        setViolations(prev => [...prev, newViolation]);
        toast({
          variant: 'destructive',
          title: 'Violation Detected: Tab Switch',
          description: 'Please stay on the exam tab.',
        });
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [toast]);
  
  // Video Feed
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(err => console.error("Could not access camera/mic:", err));
  }, []);

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);


  if (!exam) return <div>Exam not found.</div>;

  const currentQuestion: Question = exam.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / exam.questions.length) * 100;

  const handleNext = () => {
    if (currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(i => i - 1);
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-6 h-[calc(100vh-100px)]">
      <Card className="md:col-span-2 flex flex-col">
        <CardHeader>
          <Progress value={progress} className="mb-4" />
          <CardTitle>Question {currentQuestionIndex + 1} of {exam.questions.length}</CardTitle>
          <p className="text-lg pt-2">{currentQuestion.text}</p>
        </CardHeader>
        <CardContent className="flex-1">
          {currentQuestion.type === 'mcq' && (
            <RadioGroup className="space-y-2">
              {currentQuestion.options?.map((option, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`q${currentQuestion.id}-o${i}`} />
                  <Label htmlFor={`q${currentQuestion.id}-o${i}`} className="text-base">{option}</Label>
                </div>
              ))}
            </RadioGroup>
          )}
          {currentQuestion.type === 'short_answer' && (
            <Textarea placeholder="Type your answer here..." className="h-48 text-base" />
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrev} disabled={currentQuestionIndex === 0}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <Button onClick={() => alert("Exam Submitted!")} variant="destructive">Submit Exam</Button>
          <Button onClick={handleNext} disabled={currentQuestionIndex === exam.questions.length - 1}>
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
      
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Live Proctoring</CardTitle>
            <Video className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <video ref={videoRef} autoPlay muted className="w-full rounded-md aspect-video bg-secondary" />
            <div className="flex items-center space-x-4 rounded-md border p-4 mt-4">
                <Timer />
                <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Time Remaining</p>
                <p className="text-2xl font-bold text-primary">
                    {`${Math.floor(timeLeft / 60).toString().padStart(2, '0')}:${(timeLeft % 60).toString().padStart(2, '0')}`}
                </p>
                </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Violation Log</CardTitle>
            <AlertTriangle className="h-5 w-5 text-destructive" />
          </CardHeader>
          <CardContent className="max-h-48 overflow-y-auto">
            {violations.length === 0 ? <p className="text-sm text-muted-foreground">No violations detected.</p> : (
              <ul className="space-y-2">
                {violations.map(v => (
                  <li key={v.id} className="text-sm text-destructive flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span>{v.type} at {v.timestamp.toLocaleTimeString()}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
