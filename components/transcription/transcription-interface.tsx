"use client";

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Mic,
  Square,
  Upload,
  Download,
  Play,
  Pause,
  RotateCcw,
  FileAudio,
  Zap,
  Brain,
  Clock,
} from 'lucide-react';
import { toast } from 'sonner';

interface TranscriptSegment {
  id: string;
  text: string;
  timestamp: string;
  keywords: string[];
  emotion: 'positive' | 'neutral' | 'negative';
  confidence: number;
}

const mockTranscriptSegments: TranscriptSegment[] = [
  {
    id: '1',
    text: "Good morning everyone, I'm excited to share our quarterly results with the team today.",
    timestamp: '00:00:15',
    keywords: ['quarterly', 'results', 'team'],
    emotion: 'positive',
    confidence: 98.5,
  },
  {
    id: '2',
    text: "Our revenue has increased by 23% compared to last quarter, which is fantastic news.",
    timestamp: '00:00:28',
    keywords: ['revenue', 'increased', '23%'],
    emotion: 'positive',
    confidence: 96.2,
  },
  {
    id: '3',
    text: "However, we did face some challenges with customer retention in the mobile segment.",
    timestamp: '00:00:45',
    keywords: ['challenges', 'customer retention', 'mobile'],
    emotion: 'neutral',
    confidence: 94.8,
  },
];

export function TranscriptionInterface() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcriptSegments, setTranscriptSegments] = useState<TranscriptSegment[]>([]);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState('live');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recordingInterval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isRecording) {
      recordingInterval.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (recordingInterval.current) {
        clearInterval(recordingInterval.current);
      }
    }

    return () => {
      if (recordingInterval.current) {
        clearInterval(recordingInterval.current);
      }
    };
  }, [isRecording]);

  const startRecording = async () => {
    try {
      // In a real app, you'd request microphone access here
      setIsRecording(true);
      setRecordingTime(0);
      setTranscriptSegments([]);
      toast.success('Recording started');
      
      // Simulate real-time transcription
      setTimeout(() => {
        addTranscriptSegment(mockTranscriptSegments[0]);
      }, 3000);
      
      setTimeout(() => {
        addTranscriptSegment(mockTranscriptSegments[1]);
      }, 6000);
      
      setTimeout(() => {
        addTranscriptSegment(mockTranscriptSegments[2]);
      }, 9000);
    } catch (error) {
      toast.error('Failed to start recording');
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    toast.success('Recording stopped');
  };

  const addTranscriptSegment = (segment: TranscriptSegment) => {
    setTranscriptSegments(prev => [...prev, segment]);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      toast.success(`File "${file.name}" uploaded successfully`);
    }
  };

  const processUploadedFile = async () => {
    if (!uploadedFile) return;
    
    setIsTranscribing(true);
    toast.info('Processing audio file...');
    
    // Simulate processing time
    setTimeout(() => {
      setTranscriptSegments(mockTranscriptSegments);
      setIsTranscribing(false);
      toast.success('Transcription completed!');
    }, 3000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const exportTranscription = () => {
    const content = transcriptSegments
      .map(segment => `[${segment.timestamp}] ${segment.text}`)
      .join('\n\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcription-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Transcription exported successfully');
  };

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case 'positive': return 'bg-green-500/20 text-green-700 dark:text-green-300';
      case 'negative': return 'bg-red-500/20 text-red-700 dark:text-red-300';
      default: return 'bg-gray-500/20 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Voice Transcription</h1>
        <p className="text-muted-foreground">
          Record live audio or upload files for AI-powered transcription and analysis.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="live">Live Recording</TabsTrigger>
          <TabsTrigger value="upload">File Upload</TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mic className="mr-2 h-5 w-5" />
                Live Recording
              </CardTitle>
              <CardDescription>
                Start recording to see real-time transcription with keyword detection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-6">
                <div className="flex items-center space-x-4">
                  {!isRecording ? (
                    <Button
                      size="lg"
                      onClick={startRecording}
                      className="h-20 w-20 rounded-full"
                    >
                      <Mic className="h-8 w-8" />
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      variant="destructive"
                      onClick={stopRecording}
                      className="h-20 w-20 rounded-full animate-pulse"
                    >
                      <Square className="h-8 w-8" />
                    </Button>
                  )}
                </div>

                {isRecording && (
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-mono font-bold">
                      {formatTime(recordingTime)}
                    </div>
                    <div className="waveform justify-center">
                      <div className="waveform-bar"></div>
                      <div className="waveform-bar"></div>
                      <div className="waveform-bar"></div>
                      <div className="waveform-bar"></div>
                      <div className="waveform-bar"></div>
                    </div>
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" disabled={!isRecording}>
                    <Pause className="mr-2 h-4 w-4" />
                    Pause
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setRecordingTime(0)}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="mr-2 h-5 w-5" />
                File Upload
              </CardTitle>
              <CardDescription>
                Upload audio files (MP3, WAV, M4A) for transcription
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div
                  className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FileAudio className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium mb-2">
                    {uploadedFile ? uploadedFile.name : 'Click to upload audio file'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supports MP3, WAV, M4A files up to 100MB
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="audio/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>

                {uploadedFile && (
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileAudio className="h-5 w-5" />
                      <div>
                        <p className="font-medium">{uploadedFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button onClick={processUploadedFile} disabled={isTranscribing}>
                      {isTranscribing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Zap className="mr-2 h-4 w-4" />
                          Transcribe
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Transcription Results */}
      {transcriptSegments.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Brain className="mr-2 h-5 w-5" />
                  Transcription Results
                </CardTitle>
                <CardDescription>
                  AI-powered transcription with keyword and emotion detection
                </CardDescription>
              </div>
              <Button onClick={exportTranscription} variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transcriptSegments.map((segment) => (
                <div key={segment.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        <Clock className="mr-1 h-3 w-3" />
                        {segment.timestamp}
                      </Badge>
                      <Badge className={`text-xs ${getEmotionColor(segment.emotion)}`}>
                        {segment.emotion}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {segment.confidence}% confidence
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm leading-relaxed">{segment.text}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {segment.keywords.map((keyword) => (
                      <Badge key={keyword} variant="default" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}