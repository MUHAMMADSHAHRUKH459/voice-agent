"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Mic, Menu, X } from 'lucide-react';

export function LandingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-gradient-to-r from-primary to-accent">
              <Mic className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">VoiceFlow</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-foreground/80 hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-foreground/80 hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="#about" className="text-foreground/80 hover:text-foreground transition-colors">
              About
            </Link>
            <div className="flex items-center space-x-2">
              <ModeToggle />
              <Link href="/auth">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/auth?mode=signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <ModeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href="#features" className="text-foreground/80 hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-foreground/80 hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link href="#about" className="text-foreground/80 hover:text-foreground transition-colors">
                About
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Link href="/auth">
                  <Button variant="outline" className="w-full">Sign In</Button>
                </Link>
                <Link href="/auth?mode=signup">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}