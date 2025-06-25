import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, FileAudio, Brain, BarChart3, Shield, Zap } from 'lucide-react';

const features = [
  {
    icon: Mic,
    title: 'Live Recording',
    description: 'Record audio in real-time with crystal clear quality and instant transcription feedback.',
  },
  {
    icon: FileAudio,
    title: 'File Upload',
    description: 'Upload audio files in multiple formats and get accurate transcriptions within seconds.',
  },
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Advanced AI detects emotions, keywords, and context to provide meaningful insights.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Track your transcription history, keyword trends, and usage analytics in one place.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level encryption ensures your audio data and transcriptions remain private and secure.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Get transcriptions in under 10 seconds with 99.9% accuracy across 50+ languages.',
  },
];

export function LandingFeatures() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need for <span className="gradient-text">Voice Intelligence</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Powerful features designed to transform how you work with audio content and voice data.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="p-2 w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}