'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Heart, User, LogOut, Save, FileText } from 'lucide-react';
import { useAuthStore } from '@/lib/store/auth';
import { AuthModal } from '@/components/features/AuthModal';

const navLinks = [
  { href: '/price-compare', label: 'Price Compare' },
  { href: '/pap', label: 'Patient Assistance' },
  { href: '/appeals', label: 'Appeals' },
  { href: '/shortages', label: 'Shortages' },
  { href: '/medicare', label: 'Medicare' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const { user, isAuthenticated, signOut } = useAuthStore();

  const handleSignOut = () => {
    signOut();
    setShowUserMenu(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-text-primary">MedBridge</span>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary hover:bg-slate-50 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-3">
              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-semibold">{user.name.charAt(0)}</span>
                    </div>
                    <span>{user.name}</span>
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-surface rounded-lg shadow-lg border border-border py-2">
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-2 text-sm text-text-secondary hover:bg-slate-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <User className="w-4 h-4 mr-2" />
                        My Profile
                      </Link>
                      <Link
                        href="/profile?tab=watchlist"
                        className="flex items-center px-4 py-2 text-sm text-text-secondary hover:bg-slate-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        My Watchlist
                      </Link>
                      <Link
                        href="/profile?tab=applications"
                        className="flex items-center px-4 py-2 text-sm text-text-secondary hover:bg-slate-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        My Applications
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-2 text-sm text-error hover:bg-slate-50"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              )}
              <Link
                href="/price-compare"
                className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors"
              >
                Get Started
              </Link>
            </div>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-slate-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-text-primary" />
              ) : (
                <Menu className="w-6 h-6 text-text-primary" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-surface animate-slide-up">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 text-base font-medium text-text-secondary hover:text-primary hover:bg-slate-50 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-border space-y-2">
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-3 text-base font-medium text-text-secondary hover:text-primary hover:bg-slate-50 rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="w-5 h-5 mr-2" />
                      My Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-3 text-base font-medium text-error hover:bg-slate-50 rounded-lg"
                    >
                      <LogOut className="w-5 h-5 mr-2" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => {
                      setShowAuthModal(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 text-base font-medium text-text-secondary hover:text-primary hover:bg-slate-50 rounded-lg text-left"
                  >
                    Sign In
                  </button>
                )}
                <Link
                  href="/price-compare"
                  className="block w-full px-4 py-3 text-base font-medium text-center text-white bg-primary hover:bg-primary-dark rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}
