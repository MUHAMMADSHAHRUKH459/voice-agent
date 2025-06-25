"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  FileAudio,
  Clock,
  TrendingUp,
  Mic,
  Calendar,
  BarChart3,
  Users,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';

const stats = [
  {
    name: 'Total Transcriptions',
    value: '247',
    change: '+12%',
    changeType: 'positive',
    icon: FileAudio,
  },
  {
    name: 'Hours Processed',
    value: '156.2',
    change: '+8%',
    changeType: 'positive',
    icon: Clock,
  },
  {
    name: 'Accuracy Rate',
    value: '99.2%',
    change: '+0.3%',
    changeType: 'positive',
    icon: TrendingUp,
  },
  {
    name: 'Keywords Detected',
    value: '1,847',
    change: '+23%',
    changeType: 'positive',
    icon: Zap,
  },
];

const recentTranscriptions = [
  {
    id: '1',
    title: 'Team Meeting - Q4 Planning',
    duration: '45:32',
    date: '2 hours ago',
    status: 'completed',
    keywords: ['budget', 'timeline', 'goals'],
  },
  {
    id: '2',
    title: 'Client Call - Project Update',
    duration: '28:15',
    date: '1 day ago',
    status: 'completed',
    keywords: ['milestone', 'feedback', 'delivery'],
  },
  {
    id: '3',
    title: 'Interview - Software Engineer',
    duration: '52:48',
    date: '2 days ago',
    status: 'completed',
    keywords: ['experience', 'technical', 'culture'],
  },
];

export function DashboardOverview() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.name?.split(' ')[0]}!
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your voice transcriptions today.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-primary">
              <Mic className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Start Recording</h3>
              <p className="text-sm text-muted-foreground">
                Begin a new live transcription session
              </p>
            </div>
            <Link href="/dashboard/transcribe">
              <Button>Record</Button>
            </Link>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-accent">
              <FileAudio className="h-6 w-6 text-accent-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Upload Audio</h3>
              <p className="text-sm text-muted-foreground">
                Upload an audio file for transcription
              </p>
            </div>
            <Link href="/dashboard/transcribe">
              <Button variant="outline">Upload</Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span
                  className={
                    stat.changeType === 'positive'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }
                >
                  {stat.change}
                </span>{' '}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Recent Transcriptions
            </CardTitle>
            <CardDescription>
              Your latest voice transcription sessions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentTranscriptions.map((transcription) => (
              <div
                key={transcription.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <h4 className="font-medium">{transcription.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {transcription.duration}
                    </span>
                    <span>{transcription.date}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {transcription.keywords.map((keyword) => (
                      <Badge key={keyword} variant="secondary" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Badge
                  variant={transcription.status === 'completed' ? 'default' : 'secondary'}
                >
                  {transcription.status}
                </Badge>
              </div>
            ))}
            <Link href="/dashboard/history">
              <Button variant="outline" className="w-full">
                View All Transcriptions
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Usage Analytics
            </CardTitle>
            <CardDescription>
              Your transcription usage this month
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Monthly Limit</span>
                <span>156 / 200 hours</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>API Calls</span>
                <span>247 / 500</span>
              </div>
              <Progress value={49} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">99.2%</div>
                <div className="text-xs text-muted-foreground">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">8.4s</div>
                <div className="text-xs text-muted-foreground">Avg Speed</div>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <Users className="mr-2 h-4 w-4" />
              Upgrade Plan
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}