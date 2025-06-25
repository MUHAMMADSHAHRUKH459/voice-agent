import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Mic } from 'lucide-react';

export function LandingCTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <div className="absolute inset-0 gradient-bg blur-3xl opacity-20"></div>
          <div className="relative bg-card border rounded-3xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your <span className="gradient-text">Voice Data</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who trust VoiceFlow for accurate transcription,
              intelligent analysis, and actionable insights.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/auth?mode=signup">
                <Button size="lg" className="text-lg px-8 py-6">
                  <Mic className="mr-2 h-5 w-5" />
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  Sign In to Dashboard
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
              <div>✓ No setup required</div>
              <div>✓ Cancel anytime</div>
              <div>✓ 14-day free trial</div>
              <div>✓ No credit card needed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}