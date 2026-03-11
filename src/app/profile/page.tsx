'use client';

import { useState } from 'react';
import { User, Mail, Phone, MapPin, Bell, FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Button, Card, Input, Select, Badge } from '@/components/ui';
import { states } from '@/lib/data';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'applications', label: 'Applications', icon: <FileText className="w-4 h-4" /> },
    { id: 'alerts', label: 'Alerts', icon: <Bell className="w-4 h-4" /> },
    { id: 'documents', label: 'Documents', icon: <FileText className="w-4 h-4" /> },
  ];

  const applications = [
    { id: '1', program: 'Novo Nordisk PAP', status: 'approved', date: '2025-02-15', expiry: '2026-02-15' },
    { id: '2', program: 'Lilly Cares Foundation', status: 'pending', date: '2025-03-01', expiry: null },
    { id: '3', program: 'Humana Medicare', status: 'submitted', date: '2025-03-10', expiry: null },
  ];

  const alerts = [
    { id: '1', type: 'shortage', drug: 'Ozempic', message: 'Back in stock at CVS near you', date: '2025-03-10' },
    { id: '2', type: 'renewal', drug: 'Novo Nordisk PAP', message: 'Your PAP renewal is due in 30 days', date: '2025-03-08' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">John Doe</h1>
              <p className="text-text-secondary">Member since January 2025</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-64">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-white'
                        : 'text-text-secondary hover:bg-slate-100'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex-1">
              {activeTab === 'profile' && <ProfileForm />}
              {activeTab === 'applications' && <ApplicationsList applications={applications} />}
              {activeTab === 'alerts' && <AlertsList alerts={alerts} />}
              {activeTab === 'documents' && <DocumentsList />}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProfileForm() {
  return (
    <Card>
      <h2 className="text-xl font-bold text-text-primary mb-6">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="First Name" defaultValue="John" />
        <Input label="Last Name" defaultValue="Doe" />
        <Input label="Email" defaultValue="john.doe@email.com" icon={<Mail className="w-5 h-5" />} />
        <Input label="Phone" defaultValue="(555) 123-4567" icon={<Phone className="w-5 h-5" />} />
        <div className="md:col-span-2">
          <Input label="Address" defaultValue="123 Main Street" icon={<MapPin className="w-5 h-5" />} />
        </div>
        <Input label="City" defaultValue="New York" />
        <Select
          label="State"
          options={states}
          value="NY"
        />
        <Input label="ZIP Code" defaultValue="10001" />
        <Input label="Date of Birth" type="date" defaultValue="1980-01-15" />
      </div>

      <div className="border-t border-border mt-6 pt-6">
        <h3 className="font-semibold text-text-primary mb-4">Insurance Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Insurance Type"
            options={[
              { value: 'medicare', label: 'Medicare' },
              { value: 'medicaid', label: 'Medicaid' },
              { value: 'private', label: 'Private Insurance' },
              { value: 'none', label: 'No Insurance' },
            ]}
          />
          <Input label="Insurance ID" placeholder="Enter your insurance ID" />
        </div>
      </div>

      <div className="border-t border-border mt-6 pt-6">
        <h3 className="font-semibold text-text-primary mb-4">Household Income</h3>
        <Select
          label="Annual Household Income"
          options={[
            { value: 'under_25k', label: 'Under $25,000' },
            { value: '25k_50k', label: '$25,000 - $50,000' },
            { value: '50k_75k', label: '$50,000 - $75,000' },
            { value: '75k_100k', label: '$75,000 - $100,000' },
            { value: 'over_100k', label: 'Over $100,000' },
          ]}
        />
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </Card>
  );
}

function ApplicationsList({ applications }: { applications: { id: string; program: string; status: string; date: string; expiry: string | null }[] }) {
  const statusColors = {
    approved: 'success',
    pending: 'warning',
    submitted: 'info',
    rejected: 'error',
  } as const;

  return (
    <Card>
      <h2 className="text-xl font-bold text-text-primary mb-6">My Applications</h2>
      <div className="space-y-4">
        {applications.map((app) => (
          <div key={app.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center gap-4">
              {app.status === 'approved' ? (
                <CheckCircle className="w-5 h-5 text-success" />
              ) : app.status === 'pending' ? (
                <Clock className="w-5 h-5 text-warning" />
              ) : (
                <AlertCircle className="w-5 h-5 text-info" />
              )}
              <div>
                <p className="font-medium text-text-primary">{app.program}</p>
                <p className="text-sm text-text-secondary">Submitted: {app.date}</p>
              </div>
            </div>
            <div className="text-right">
              <Badge variant={statusColors[app.status as keyof typeof statusColors]}>
                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
              </Badge>
              {app.expiry && (
                <p className="text-xs text-text-secondary mt-1">Expires: {app.expiry}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function AlertsList({ alerts }: { alerts: { id: string; type: string; drug: string; message: string; date: string }[] }) {
  return (
    <Card>
      <h2 className="text-xl font-bold text-text-primary mb-6">My Alerts</h2>
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex items-start justify-between p-4 border border-border rounded-lg">
            <div className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-text-primary">{alert.drug}</p>
                <p className="text-sm text-text-secondary">{alert.message}</p>
              </div>
            </div>
            <p className="text-xs text-text-secondary">{alert.date}</p>
          </div>
        ))}
      </div>
      {alerts.length === 0 && (
        <p className="text-center text-text-secondary py-8">No alerts yet</p>
      )}
    </Card>
  );
}

function DocumentsList() {
  return (
    <Card>
      <h2 className="text-xl font-bold text-text-primary mb-6">My Documents</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-text-secondary" />
            <div>
              <p className="font-medium text-text-primary">Tax Return 2024</p>
              <p className="text-xs text-text-secondary">Uploaded: Jan 15, 2025</p>
            </div>
          </div>
          <Badge variant="success">Verified</Badge>
        </div>
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-text-secondary" />
            <div>
              <p className="font-medium text-text-primary">Insurance Card</p>
              <p className="text-xs text-text-secondary">Uploaded: Jan 15, 2025</p>
            </div>
          </div>
          <Badge variant="success">Verified</Badge>
        </div>
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-text-secondary" />
            <div>
              <p className="font-medium text-text-primary">Denial Letter - Humira</p>
              <p className="text-xs text-text-secondary">Uploaded: Feb 20, 2025</p>
            </div>
          </div>
          <Button size="sm" variant="ghost">View</Button>
        </div>
      </div>
      <Button variant="outline" className="w-full mt-4">
        Upload New Document
      </Button>
    </Card>
  );
}
