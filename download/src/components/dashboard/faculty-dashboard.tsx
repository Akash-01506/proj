"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { generateExamFromPrompt } from '@/ai/flows/generate-exam-from-prompt';
import { exams, studentExams } from '@/lib/placeholder-data';
import { PlusCircle, Monitor, FileSignature, Bot, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

export function FacultyDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedExam, setGeneratedExam] = useState('');

  const myExams = exams.filter(e => e.createdBy === user?.name);

  const handleGenerateExam = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsGenerating(true);
    const formData = new FormData(event.currentTarget);
    const prompt = formData.get('prompt') as string;
    const numQuestions = Number(formData.get('numQuestions') as string);
    
    try {
      const result = await generateExamFromPrompt({ prompt, numberOfQuestions: numQuestions });
      setGeneratedExam(result.exam);
      toast({
        title: "Exam Generated",
        description: "AI has successfully generated the exam questions.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "Could not generate exam from the prompt.",
      });
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {user?.name}</CardTitle>
          <CardDescription>Manage your exams, monitor students, and view reports.</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Create New Exam
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Create Exam</DialogTitle>
                <DialogDescription>
                  Fill in the details below or use AI to generate questions.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="title">Exam Title</Label>
                    <Input id="title" placeholder="e.g., Data Structures Mid-Term" />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject Code</Label>
                    <Input id="subject" placeholder="e.g., CS-201" />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input id="duration" type="number" placeholder="e.g., 60" />
                  </div>
                   <Button disabled>Save Exam</Button>
                </form>

                <form className="space-y-4 p-4 border rounded-lg bg-muted/50" onSubmit={handleGenerateExam}>
                  <div className="flex items-center gap-2">
                    <Bot className="h-6 w-6 text-primary"/>
                    <h3 className="font-semibold">Generate with AI</h3>
                  </div>
                  <div>
                    <Label htmlFor="prompt">Exam Prompt</Label>
                    <Textarea id="prompt" name="prompt" placeholder="e.g., A 5 question quiz on React hooks" />
                  </div>
                  <div>
                    <Label htmlFor="numQuestions">Number of Questions</Label>
                    <Input id="numQuestions" name="numQuestions" type="number" defaultValue={5} />
                  </div>
                  {generatedExam && (
                     <Card className="max-h-40 overflow-y-auto">
                        <CardContent className="text-sm p-4 whitespace-pre-wrap">{generatedExam}</CardContent>
                    </Card>
                  )}
                  <Button type="submit" className="w-full" disabled={isGenerating}>
                    {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
                    Generate Questions
                  </Button>
                </form>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My Exams</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Live Students</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myExams.map(exam => {
                const liveCount = studentExams.filter(se => se.examId === exam.id && se.status === 'in_progress').length;
                return (
                  <TableRow key={exam.id}>
                    <TableCell className="font-medium">{exam.title}</TableCell>
                    <TableCell>{exam.subject}</TableCell>
                    <TableCell>
                      <Badge variant={liveCount > 0 ? 'default' : 'outline'}>{liveCount} Active</Badge>
                    </TableCell>
                    <TableCell className="space-x-2">
                      <Button variant="outline" size="sm" disabled={liveCount === 0}>
                        <Monitor className="mr-2 h-4 w-4" /> Monitor
                      </Button>
                      <Button variant="ghost" size="sm">
                        <FileSignature className="mr-2 h-4 w-4" /> Reports
                      </Button>
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
