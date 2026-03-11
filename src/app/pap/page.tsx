'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Users, FileText, Clock, CheckCircle, ArrowRight, Shield, Upload, Search, Save } from 'lucide-react';
import { Button, Card, Input, Select, Badge, Progress } from '@/components/ui';
import { papPrograms, incomeRanges, insuranceStatuses, states, drugs } from '@/lib/data';
import { PAPProgram } from '@/lib/types';
import { useAuthStore } from '@/lib/store/auth';
import { useWatchlistStore } from '@/lib/store/watchlist';

interface EligibilityData {
  income: string;
  insurance: string;
  medication: string;
  diagnosis: string;
  state: string;
}

export default function PAPPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-br from-violet-600 to-violet-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Patient Assistance Programs
          </h1>
          <p className="text-white/80 mb-8">
            Find and apply to medication assistance programs. Match with eligible PAPs based on your situation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Search className="w-6 h-6" />, title: '1. Check Eligibility', desc: 'Complete our 5-question wizard' },
              { icon: <Users className="w-6 h-6" />, title: '2. Match Programs', desc: 'See PAPs you qualify for' },
              { icon: <FileText className="w-6 h-6" />, title: '3. Apply', desc: 'Auto-fill applications instantly' },
            ].map((step, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="font-semibold mb-1">{step.title}</h3>
                <p className="text-sm text-white/70">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="mb-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                Take the Eligibility Quiz
              </h2>
              <p className="text-text-secondary">
                Answer 5 quick questions to find programs you may qualify for.
              </p>
            </div>
            
            <EligibilityWizard />
          </Card>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-text-primary mb-6">
              Popular Patient Assistance Programs
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {papPrograms.slice(0, 6).map((program) => (
                <PAPCard key={program.id} program={program} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function EligibilityWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<EligibilityData>({
    income: '',
    insurance: '',
    medication: '',
    diagnosis: '',
    state: '',
  });
  const [results, setResults] = useState<PAPProgram[] | null>(null);
  
  const { isAuthenticated } = useAuthStore();
  const { addItem, isInWatchlist } = useWatchlistStore();

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      const matchedPrograms = papPrograms.filter((program) => {
        const programMedications = program.medications.map(m => m.toLowerCase());
        const searchMed = formData.medication.toLowerCase();
        const matchesMedication = formData.medication && 
          programMedications.some(m => m.includes(searchMed) || searchMed.includes(m));
        return matchesMedication;
      });
      setResults(matchedPrograms.length > 0 ? matchedPrograms : papPrograms.slice(0, 4));
    }
  };

  const handleApply = (programName: string) => {
    if (!isAuthenticated) {
      alert('Please sign in to apply for patient assistance programs.');
      return;
    }
    alert(`Application started for ${programName}. You will be redirected to the program website.`);
  };

  const updateFormData = (field: keyof EligibilityData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const filteredDrugOptions = drugs.filter(d => 
    d.name.toLowerCase().includes(formData.medication.toLowerCase())
  ).slice(0, 5);

  const steps = [
    {
      number: 1,
      title: 'Annual Income',
      description: 'Select your household income range',
      content: (
        <div className="space-y-3">
          {incomeRanges.map((range) => (
            <button
              key={range.value}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                formData.income === range.value
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => updateFormData('income', range.value)}
            >
              <span className="font-medium text-text-primary">{range.label}</span>
            </button>
          ))}
        </div>
      ),
    },
    {
      number: 2,
      title: 'Insurance Status',
      description: 'What type of health insurance do you have?',
      content: (
        <div className="space-y-3">
          {insuranceStatuses.map((status) => (
            <button
              key={status.value}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                formData.insurance === status.value
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => updateFormData('insurance', status.value)}
            >
              <span className="font-medium text-text-primary">{status.label}</span>
            </button>
          ))}
        </div>
      ),
    },
    {
      number: 3,
      title: 'Medication',
      description: 'Which medication do you need help with?',
      content: (
        <div className="space-y-3">
          <Input
            label="Search for your medication"
            placeholder="Start typing medication name..."
            value={formData.medication}
            onChange={(e) => updateFormData('medication', e.target.value)}
            icon={<Search className="w-5 h-5" />}
          />
          {formData.medication && filteredDrugOptions.length > 0 && (
            <div className="border border-border rounded-lg overflow-hidden">
              {filteredDrugOptions.map((drug) => (
                <button
                  key={drug.id}
                  className="w-full px-4 py-3 text-left hover:bg-slate-50 border-b border-border last:border-0"
                  onClick={() => updateFormData('medication', drug.name)}
                >
                  <div className="font-medium text-text-primary">{drug.name}</div>
                  <div className="text-sm text-text-secondary">{drug.generic} - {drug.dosage}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      ),
    },
    {
      number: 4,
      title: 'Diagnosis',
      description: 'What condition are you being treated for?',
      content: (
        <div className="space-y-3">
          <Input
            label="Enter your diagnosis"
            placeholder="e.g., Diabetes, Hypertension, Arthritis..."
            value={formData.diagnosis}
            onChange={(e) => updateFormData('diagnosis', e.target.value)}
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {['Diabetes', 'Hypertension', 'Arthritis', 'Asthma', 'High Cholesterol'].map((condition) => (
              <button
                key={condition}
                className="px-3 py-1 text-sm border border-border rounded-full hover:border-primary hover:bg-primary/5"
                onClick={() => updateFormData('diagnosis', condition)}
              >
                {condition}
              </button>
            ))}
          </div>
        </div>
      ),
    },
    {
      number: 5,
      title: 'State of Residence',
      description: 'Which state do you live in?',
      content: (
        <Select
          label="Select your state"
          options={states}
          value={formData.state}
          onChange={(e) => updateFormData('state', e.target.value)}
          placeholder="Choose your state"
        />
      ),
    },
  ];

  if (results) {
    return (
      <div className="animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          <h3 className="text-2xl font-bold text-text-primary mb-2">
            We Found {results.length} Programs For You!
          </h3>
          <p className="text-text-secondary">
            Based on your eligibility, these programs may be able to help.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {results.map((program) => (
            <Card key={program.id} hover>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-text-primary">{program.name}</h4>
                    <Badge variant={program.score >= 85 ? 'success' : 'warning'}>
                      {program.score}% Match
                    </Badge>
                  </div>
                  <p className="text-sm text-text-secondary mb-2">
                    {program.medications.slice(0, 3).join(', ')}
                    {program.medications.length > 3 && ` +${program.medications.length - 3} more`}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {program.approvalTime}
                    </span>
                    <span className="flex items-center">
                      <Shield className="w-4 h-4 mr-1" />
                      {program.eligibility.income}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button onClick={() => handleApply(program.name)}>Apply Now</Button>
                  {isInWatchlist(program.medications[0]) ? (
                    <Button variant="outline" size="sm" onClick={() => addItem(program.medications[0])}>
                      <Save className="w-4 h-4 mr-1" /> Saved
                    </Button>
                  ) : (
                    <Button variant="ghost" size="sm" onClick={() => addItem(program.medications[0])}>
                      <Save className="w-4 h-4 mr-1" /> Save
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" onClick={() => { setResults(null); setStep(1); setFormData({income: '', insurance: '', medication: '', diagnosis: '', state: ''}); }}>
            Start Over
          </Button>
        </div>
      </div>
    );
  }

  const currentStep = steps[step - 1];

  return (
    <div>
      <Progress value={(step / 5) * 100} showLabel className="mb-8" />
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-text-primary">
          Question {step} of 5
        </h3>
        <h4 className="text-xl font-bold text-text-primary">{currentStep.title}</h4>
        <p className="text-text-secondary">{currentStep.description}</p>
      </div>

      <div className="min-h-[200px] mb-6">
        {currentStep.content}
      </div>

      <div className="flex justify-between">
        <Button
          variant="ghost"
          onClick={() => setStep(step - 1)}
          disabled={step === 1}
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={
            (step === 1 && !formData.income) ||
            (step === 2 && !formData.insurance) ||
            (step === 3 && !formData.medication) ||
            (step === 5 && !formData.state)
          }
        >
          {step === 5 ? 'Find Programs' : 'Next'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

function PAPCard({ program }: { program: PAPProgram }) {
  const { isAuthenticated } = useAuthStore();
  const { addItem, isInWatchlist } = useWatchlistStore();

  const handleApply = () => {
    if (!isAuthenticated) {
      alert('Please sign in to apply for patient assistance programs.');
      return;
    }
    window.open(program.website, '_blank');
  };

  return (
    <Card hover>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-text-primary">{program.name}</h3>
          <p className="text-sm text-text-secondary">{program.manufacturer}</p>
        </div>
        <Badge variant={program.score >= 85 ? 'success' : 'warning'}>
          {program.score}% Match
        </Badge>
      </div>
      
      <div className="mb-4">
        <p className="text-xs text-text-secondary mb-2">Covered Medications:</p>
        <div className="flex flex-wrap gap-1">
          {program.medications.slice(0, 3).map((med: string) => (
            <Badge key={med} variant="default">{med}</Badge>
          ))}
          {program.medications.length > 3 && (
            <Badge variant="default">+{program.medications.length - 3} more</Badge>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div>
          <span className="text-text-secondary">Income:</span>
          <p className="font-medium text-text-primary">{program.eligibility.income}</p>
        </div>
        <div>
          <span className="text-text-secondary">Approval:</span>
          <p className="font-medium text-text-primary">{program.approvalTime}</p>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button className="flex-1" onClick={handleApply}>Apply Now</Button>
        <Button variant="outline" onClick={() => addItem(program.medications[0])}>
          <Save className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}
