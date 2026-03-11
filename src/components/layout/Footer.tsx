import React from 'react';
import Link from 'next/link';
import { Heart, Mail, Phone, MapPin, Shield, Lock } from 'lucide-react';

const footerLinks = {
  product: [
    { href: '/price-compare', label: 'Price Comparison' },
    { href: '/pap', label: 'Patient Assistance' },
    { href: '/appeals', label: 'Insurance Appeals' },
    { href: '/shortages', label: 'Shortage Alerts' },
    { href: '/medicare', label: 'Medicare Part D' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/careers', label: 'Careers' },
    { href: '/press', label: 'Press' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/hipaa', label: 'HIPAA Notice' },
    { href: '/accessibility', label: 'Accessibility' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-text-primary">MedBridge</span>
            </Link>
            <p className="mt-4 text-sm text-text-secondary leading-relaxed max-w-sm">
              Your trusted companion for affordable medication access. 
              Compare prices, find assistance programs, and navigate healthcare with confidence.
            </p>
            <div className="mt-6 space-y-2">
              <div className="flex items-center text-sm text-text-secondary">
                <Mail className="w-4 h-4 mr-2" />
                support@medbridge.health
              </div>
              <div className="flex items-center text-sm text-text-secondary">
                <Phone className="w-4 h-4 mr-2" />
                1-800-MED-BRIDGE
              </div>
              <div className="flex items-center text-sm text-text-secondary">
                <MapPin className="w-4 h-4 mr-2" />
                Nationwide, USA
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
              Product
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-text-secondary">
              © 2025 MedBridge Health. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-success">
                <Shield className="w-4 h-4 mr-1" />
                HIPAA Compliant
              </div>
              <div className="flex items-center text-sm text-text-secondary">
                <Lock className="w-4 h-4 mr-1" />
                256-bit Encryption
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
