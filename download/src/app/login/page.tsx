"use client";
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/icons';
import { Shield, User, GraduationCap } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
  const { login } = useAuth();

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-background p-4">
       <div className="absolute inset-0 bg-primary/10 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]"></div>
       <Card className="relative z-10 w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Logo className="h-8 w-8" />
            </div>
          <CardTitle className="text-3xl font-bold tracking-tight">ProctorExam AI</CardTitle>
          <CardDescription>Select your role to proceed to the dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Button size="lg" className="w-full" onClick={() => login('admin')}>
              <Shield className="mr-2 h-5 w-5" /> Login as Admin
            </Button>
            <Button size="lg" className="w-full" onClick={() => login('faculty')}>
              <GraduationCap className="mr-2 h-5 w-5" /> Login as Faculty/Proctor
            </Button>
            <Button size="lg" className="w-full" onClick={() => login('student')}>
              <User className="mr-2 h-5 w-5" /> Login as Student
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
