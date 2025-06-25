import { LandingHero } from '@/components/landing/landing-hero';
import { LandingFeatures } from '@/components/landing/landing-features';
import { LandingCTA } from '@/components/landing/landing-cta';
import { LandingNavbar } from '@/components/landing/landing-navbar';

export default function Home() {
  return (
    <div className="min-h-screen">
      <LandingNavbar />
      <LandingHero />
      <LandingFeatures />
      <LandingCTA />
    </div>
  );
}