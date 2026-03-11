'use client';

import Link from 'next/link';
import { 
  Search, 
  DollarSign, 
  FileText, 
  Bell, 
  Shield, 
  Heart,
  ArrowRight,
  CheckCircle,
  Clock,
  TrendingDown,
  Users,
  Zap,
  Star
} from 'lucide-react';
import { Button, Card } from '@/components/ui';

const features = [
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: 'Anonymous Price Compare',
    description: 'Compare medication prices across pharmacies in your area. No account required.',
    href: '/price-compare',
    color: 'bg-teal-100 text-primary',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Patient Assistance Programs',
    description: 'Find and apply to medication assistance programs. Match with eligible PAPs instantly.',
    href: '/pap',
    color: 'bg-violet-100 text-secondary',
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'Insurance Appeal Generator',
    description: 'Upload denial letters and generate professional appeal letters with AI assistance.',
    href: '/appeals',
    color: 'bg-amber-100 text-accent',
  },
  {
    icon: <Bell className="w-6 h-6" />,
    title: 'Shortage Alerts',
    description: 'Get notified when your medications become available. Track shortages in real-time.',
    href: '/shortages',
    color: 'bg-emerald-100 text-success',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Medicare Part D Navigator',
    description: 'Compare plans, track TrOOP progress, and find state assistance programs.',
    href: '/medicare',
    color: 'bg-blue-100 text-blue-600',
  },
];

const stats = [
  { value: '10,000+', label: 'Monthly Searches' },
  { value: '$500+', label: 'Avg. Savings Per User' },
  { value: '50+', label: 'PAP Programs' },
  { value: '24/7', label: 'Access' },
];

const testimonials = [
  {
    quote: "MedBridge helped me save over $3,000 on my Ozempic prescription. The price comparison feature is incredible!",
    author: "Sarah M.",
    location: "New York, NY",
    rating: 5,
  },
  {
    quote: "The PAP matcher found a program I didn't know existed. Now I get my Humira for free.",
    author: "James R.",
    location: "Austin, TX",
    rating: 5,
  },
  {
    quote: "The appeal generator helped me overturn a denial. My insurance now covers my medication.",
    author: "Maria L.",
    location: "Miami, FL",
    rating: 5,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-light to-secondary">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-30" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center text-white">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium mb-8 animate-fade-in">
              <Zap className="w-4 h-4 mr-2" />
              Trusted by 50,000+ patients nationwide
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
              Your Bridge to
              <span className="block text-accent-light">Affordable Medications</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 animate-slide-up stagger-1">
              Compare prices, find assistance programs, generate appeals, and navigate Medicare — all in one secure platform.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up stagger-2">
              <Link href="/price-compare">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  <Search className="w-5 h-5 mr-2" />
                  Compare Prices Free
                </Button>
              </Link>
              <Link href="/pap">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Find Assistance Programs
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 animate-slide-up stagger-3">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Everything You Need for Affordable Care
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Comprehensive tools to help you navigate the complex world of medication pricing and assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Link key={feature.title} href={feature.href}>
                <Card hover className={`h-full animate-slide-up stagger-${index + 1}`}>
                  <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">{feature.title}</h3>
                  <p className="text-text-secondary">{feature.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
                Save Time and Money with Price Comparison
              </h2>
              <p className="text-lg text-text-secondary mb-8">
                The same medication can vary in price by thousands of pesos between pharmacies. 
                Our anonymous search lets you find the best prices in your area instantly.
              </p>
              
              <div className="space-y-4">
                {[
                  'Search by drug name or condition',
                  'Compare prices from multiple pharmacies',
                  'View discount pricing',
                  'No account or sign-up required',
                ].map((item) => (
                  <div key={item} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-success mr-3" />
                    <span className="text-text-primary">{item}</span>
                  </div>
                ))}
              </div>

              <Link href="/price-compare">
                <Button className="mt-8">
                  Start Comparing Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="bg-background rounded-2xl p-6 border border-border">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-text-secondary">Example Savings</span>
                <TrendingDown className="w-5 h-5 text-success" />
              </div>
              <div className="text-5xl font-bold text-primary mb-2">₱5,200</div>
              <p className="text-text-secondary mb-6">average savings per prescription</p>
              
              <div className="space-y-3">
                {[
                  { drug: 'Ozempic', low: '₱8,500', high: '₱15,000', savings: '₱6,500' },
                  { drug: 'Humira', low: '₱45,000', high: '₱85,000', savings: '₱40,000' },
                  { drug: 'Eliquis', low: '₱4,200', high: '₱8,500', savings: '₱4,300' },
                ].map((item) => (
                  <div key={item.drug} className="flex items-center justify-between p-3 bg-surface rounded-lg">
                    <span className="font-medium text-text-primary">{item.drug}</span>
                    <span className="text-success font-semibold">Save {item.savings}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-text-secondary">
              Join thousands of satisfied patients who found their medications at affordable prices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="animate-slide-up">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-text-primary mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-semibold text-primary">{testimonial.author[0]}</span>
                  </div>
                  <div className="ml-3">
                    <div className="font-medium text-text-primary">{testimonial.author}</div>
                    <div className="text-sm text-text-secondary">{testimonial.location}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Saving?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Your health is important. Don't let high medication costs stand in the way of getting the treatment you need.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/price-compare">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Compare Prices Now
              </Button>
            </Link>
            <Link href="/pap">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Find Assistance Programs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center space-x-4">
              <Shield className="w-10 h-10 text-primary" />
              <div>
                <h3 className="font-semibold text-text-primary">HIPAA Compliant</h3>
                <p className="text-sm text-text-secondary">Your data is protected with industry-standard encryption</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Heart className="w-10 h-10 text-error" />
              <div>
                <h3 className="font-semibold text-text-primary">Patient-First Approach</h3>
                <p className="text-sm text-text-secondary">We're here to help you access the care you need</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Clock className="w-10 h-10 text-secondary" />
              <div>
                <h3 className="font-semibold text-text-primary">24/7 Access</h3>
                <p className="text-sm text-text-secondary">Find help whenever you need it, day or night</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
