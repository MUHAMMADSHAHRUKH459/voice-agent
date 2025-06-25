"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Play, Mic, Zap, Users } from 'lucide-react';

export function LandingHero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Zap className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm font-medium">AI-Powered Voice Intelligence</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Transform Your <span className="gradient-text">Voice</span> Into
            <br />
            <span className="gradient-text">Intelligent Insights</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Upload audio, record live, and watch as our AI transcribes your voice with precision,
            highlighting keywords and emotions to unlock deeper understanding.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/auth?mode=signup">
              <Button size="lg" className="text-lg px-8 py-6 animate-glow">
                <Mic className="mr-2 h-5 w-5" />
                Start Transcribing
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              <span>10,000+ users trust us</span>
            </div>
            <div className="flex items-center">
              <Zap className="h-4 w-4 mr-2" />
              <span>99.9% accuracy rate</span>
            </div>
            <div className="flex items-center">
              <Mic className="h-4 w-4 mr-2" />
              <span>50+ languages supported</span>
            </div>
          </div>
        </div>
        
        <div className="mt-20 relative">
          <div className="absolute inset-0 gradient-bg blur-3xl opacity-30 animate-float"></div>
          <div className="relative bg-card border rounded-2xl p-8 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">See It In Action</h3>
                <p className="text-muted-foreground mb-6">
                  Watch how VoiceFlow transforms raw audio into structured insights with real-time
                  keyword detection and emotion analysis.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Real-time transcription
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Keyword highlighting
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Emotion detection
                  </div>
                </div>
              </div>
              <div className="bg-background rounded-xl p-6 border">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-xs text-muted-foreground ml-2">Live Transcription</span>
                </div>
                <div className="space-y-2 text-sm">
                  <p>
                    "I'm <span className="bg-green-500/20 px-1 rounded">excited</span> to share our
                    quarterly <span className="bg-blue-500/20 px-1 rounded">results</span> with
                    the team today."
                  </p>
                  <p className="text-muted-foreground">
                    Detected: Positive emotion, Business context
                  </p>
                </div>
                <div className="waveform mt-4">
                  <div className="waveform-bar"></div>
                  <div className="waveform-bar"></div>
                  <div className="waveform-bar"></div>
                  <div className="waveform-bar"></div>
                  <div className="waveform-bar"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}