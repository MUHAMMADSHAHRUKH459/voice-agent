"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  History,
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
  MoreHorizontal,
  Clock,
  FileAudio,
} from 'lucide-react';
import { format } from 'date-fns';

interface TranscriptionRecord {
  id: string;
  title: string;
  duration: string;
  date: string;
  status: 'completed' | 'processing' | 'failed';
  type: 'live' | 'upload';
  keywords: string[];
  emotion: 'positive' | 'neutral' | 'negative';
  confidence: number;
  wordCount: number;
}

const mockTranscriptions: TranscriptionRecord[] = [
  {
    id: '1',
    title: 'Team Meeting - Q4 Planning',
    duration: '45:32',
    date: '2024-01-15T10:30:00Z',
    status: 'completed',
    type: 'live',
    keywords: ['budget', 'timeline', 'goals', 'strategy'],
    emotion: 'positive',
    confidence: 98.5,
    wordCount: 2847,
  },
  {
    id: '2',
    title: 'Client Call - Project Update',
    duration: '28:15',
    date: '2024-01-14T14:00:00Z',
    status: 'completed',
    type: 'upload',
    keywords: ['milestone', 'feedback', 'delivery', 'requirements'],
    emotion: 'neutral',
    confidence: 96.2,
    wordCount: 1923,
  },
  {
    id: '3',
    title: 'Interview - Software Engineer',
    duration: '52:48',
    date: '2024-01-13T09:15:00Z',
    status: 'completed',
    type: 'live',
    keywords: ['experience', 'technical', 'culture', 'skills'],
    emotion: 'positive',
    confidence: 94.8,
    wordCount: 3456,
  },
  {
    id: '4',
    title: 'Product Demo Recording',
    duration: '18:22',
    date: '2024-01-12T16:45:00Z',
    status: 'processing',
    type: 'upload',
    keywords: [],
    emotion: 'neutral',
    confidence: 0,
    wordCount: 0,
  },
  {
    id: '5',
    title: 'Board Meeting - Financial Review',
    duration: '67:18',
    date: '2024-01-11T11:00:00Z',
    status: 'completed',
    type: 'live',
    keywords: ['revenue', 'expenses', 'growth', 'investment'],
    emotion: 'neutral',
    confidence: 97.3,
    wordCount: 4521,
  },
];

export function TranscriptionHistory() {
  const [transcriptions, setTranscriptions] = useState(mockTranscriptions);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredTranscriptions = transcriptions.filter((transcription) => {
    const matchesSearch = transcription.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transcription.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || transcription.status === statusFilter;
    const matchesType = typeFilter === 'all' || transcription.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-700 dark:text-green-300';
      case 'processing': return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300';
      case 'failed': return 'bg-red-500/20 text-red-700 dark:text-red-300';
      default: return 'bg-gray-500/20 text-gray-700 dark:text-gray-300';
    }
  };

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case 'positive': return 'bg-green-500/20 text-green-700 dark:text-green-300';
      case 'negative': return 'bg-red-500/20 text-red-700 dark:text-red-300';
      default: return 'bg-gray-500/20 text-gray-700 dark:text-gray-300';
    }
  };

  const deleteTranscription = (id: string) => {
    setTranscriptions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Transcription History</h1>
        <p className="text-muted-foreground">
          View and manage all your transcription sessions and recordings.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileAudio className="h-4 w-4 text-muted-foreground" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Total</p>
                <div className="text-2xl font-bold">{transcriptions.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Hours</p>
                <div className="text-2xl font-bold">212.3</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Words</p>
                <div className="text-2xl font-bold">12.7k</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Accuracy</p>
                <div className="text-2xl font-bold">96.8%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <History className="mr-2 h-5 w-5" />
            All Transcriptions
          </CardTitle>
          <CardDescription>
            Search and filter your transcription history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transcriptions or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="live">Live Recording</SelectItem>
                <SelectItem value="upload">File Upload</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Keywords</TableHead>
                  <TableHead>Emotion</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTranscriptions.map((transcription) => (
                  <TableRow key={transcription.id}>
                    <TableCell className="font-medium">
                      {transcription.title}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {transcription.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{transcription.duration}</TableCell>
                    <TableCell>
                      {format(new Date(transcription.date), 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(transcription.status)} capitalize`}>
                        {transcription.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {transcription.keywords.slice(0, 2).map((keyword) => (
                          <Badge key={keyword} variant="secondary" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                        {transcription.keywords.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{transcription.keywords.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {transcription.status === 'completed' && (
                        <Badge className={`${getEmotionColor(transcription.emotion)} capitalize text-xs`}>
                          {transcription.emotion}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Export
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => deleteTranscription(transcription.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredTranscriptions.length === 0 && (
            <div className="text-center py-8">
              <FileAudio className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No transcriptions found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}