'use client';

import { useState, useMemo } from 'react';
import { Shield, Search, MapPin, TrendingUp, DollarSign, Info, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button, Card, Input, Select, Badge, Progress } from '@/components/ui';
import { medicarePlans2025, troopThreshold2025, spapPrograms, drugs } from '@/lib/data';
import { MedicarePlan } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/currency';

export default function MedicarePage() {
  const [selectedDrugs, setSelectedDrugs] = useState<string[]>([]);
  const [location, setLocation] = useState('Mati');
  const [showComparison, setShowComparison] = useState(false);
  const [currentSpend, setCurrentSpend] = useState(15000);
  const [selectedPlan, setSelectedPlan] = useState<MedicarePlan | null>(null);

  const filteredPlans = useMemo(() => {
    return medicarePlans2025.filter(
      (plan) => plan.states.includes('ALL') || (location && plan.states.includes('DAVOR'))
    );
  }, [location]);

  const handleAddDrug = (drugName: string) => {
    if (!selectedDrugs.includes(drugName)) {
      setSelectedDrugs([...selectedDrugs, drugName]);
    }
  };

  const handleRemoveDrug = (drugName: string) => {
    setSelectedDrugs(selectedDrugs.filter((d) => d !== drugName));
  };

  const calculateTroopProgress = () => {
    return Math.min((currentSpend / troopThreshold2025) * 100, 100);
  };

  const calculateDonutHoleSavings = () => {
    const genericSavings = 500;
    const monthsDelayed = 3;
    return { genericSavings, monthsDelayed };
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Health Plan Navigator
          </h1>
          <p className="text-white/80 mb-8">
            Compare HMO and health insurance plans in the Philippines, track your medical spending, and find provincial assistance programs.
          </p>

          <Card className="bg-white">
            <h2 className="font-semibold text-text-primary mb-4">Enter Your Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Location"
                placeholder="Enter your city or province"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                icon={<MapPin className="w-5 h-5" />}
              />
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Your Medications
                </label>
                <select
                  className="w-full px-4 py-2.5 border border-border rounded-lg"
                  onChange={(e) => {
                    if (e.target.value) handleAddDrug(e.target.value);
                  }}
                >
                  <option value="">Add a medication...</option>
                  {drugs.slice(0, 20).map((drug) => (
                    <option key={drug.id} value={drug.name}>{drug.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {selectedDrugs.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedDrugs.map((drug) => (
                  <Badge key={drug} variant="info" className="flex items-center gap-1">
                    {drug}
                    <button onClick={() => handleRemoveDrug(drug)} className="ml-1 hover:text-blue-800">
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            <Button className="w-full mt-4" onClick={() => setShowComparison(true)}>
              <Search className="w-4 h-4 mr-2" />
              Compare Plans
            </Button>
          </Card>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-text-primary">
                    Annual Spending Tracker (2025)
                  </h2>
                  <Badge variant="info">{formatCurrency(currentSpend)} / {formatCurrency(troopThreshold2025)}</Badge>
                </div>

                <Progress
                  value={calculateTroopProgress()}
                  showLabel
                  size="lg"
                  variant={calculateTroopProgress() >= 100 ? 'success' : 'default'}
                  className="mb-4"
                />

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold text-text-primary">{formatCurrency(currentSpend)}</div>
                    <div className="text-sm text-text-secondary">Current Spending</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold text-warning">{formatCurrency(troopThreshold2025 - currentSpend)}</div>
                    <div className="text-sm text-text-secondary">Until Max Benefit</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold text-success">{formatCurrency(troopThreshold2025)}</div>
                    <div className="text-sm text-text-secondary">Annual Limit</div>
                  </div>
                </div>

                {currentSpend > 40000 && (
                  <div className="mt-4 p-4 bg-success/10 border border-success/20 rounded-lg flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-success">You&apos;re approaching your annual limit!</p>
                      <p className="text-sm text-text-secondary">
                        Contact your HMO provider for extension or additional coverage options.
                      </p>
                    </div>
                  </div>
                )}
              </Card>

              <Card>
                <h2 className="text-xl font-bold text-text-primary mb-6">
                  Generic vs Brand Savings Calculator
                </h2>

                <div className="space-y-4">
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-amber-800">Consider Generic Alternatives</p>
                        <p className="text-sm text-amber-700">
                          Switching to generic medicines can save you up to 80% on your medication costs.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h3 className="font-medium text-text-primary mb-3">Switch to Generics?</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-text-secondary">Switching could save you:</p>
                        <p className="text-2xl font-bold text-success">
                          {formatCurrency(calculateDonutHoleSavings().genericSavings * 52)}
                        </p>
                        <p className="text-xs text-text-secondary">per year</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-text-secondary">Savings:</p>
                        <p className="text-2xl font-bold text-primary">
                          {calculateDonutHoleSavings().monthsDelayed * 10}%
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      View Generic Alternatives
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            <div>
              <Card>
                <h2 className="text-xl font-bold text-text-primary mb-6">
                  Provincial Programs (SPAP)
                </h2>
                <Input
                  placeholder="Filter by province..."
                  className="mb-4"
                />
                <div className="space-y-3 max-h-96 overflow-auto">
                  {spapPrograms.map((spap) => (
                    <div key={spap.state} className="p-3 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <Badge variant="default">{spap.state}</Badge>
                      </div>
                      <p className="text-sm font-medium text-text-primary">{spap.name}</p>
                      <p className="text-xs text-text-secondary">{spap.phone}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="mt-6">
                <h2 className="text-xl font-bold text-text-primary mb-4">
                  2025 Healthcare Updates
                </h2>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                    <span className="text-text-secondary">
                      PhilHealth benefits expanded for <strong>indigent patients</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                    <span className="text-text-secondary">
                      Maximum HMO deductible: <strong>₱6,000</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                    <span className="text-text-secondary">
                      Free medicines at <strong>public hospitals</strong> for senior citizens
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                    <span className="text-text-secondary">
                      LGU medical assistance up to <strong>₱50,000</strong> per year
                    </span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {showComparison && (
        <section className="py-12 bg-surface">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-text-primary">
                Available Health Plans
              </h2>
              <Button variant="ghost" onClick={() => setShowComparison(false)}>
                Close
              </Button>
            </div>

            <div className="space-y-4">
              {filteredPlans.map((plan) => (
                <Card
                  key={plan.id}
                  hover
                  className={selectedPlan?.id === plan.id ? 'border-primary border-2' : ''}
                  onClick={() => setSelectedPlan(plan)}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-text-primary">{plan.name}</h3>
                        <Badge variant="info">{plan.type}</Badge>
                      </div>
                      <p className="text-sm text-text-secondary">{plan.provider}</p>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-text-secondary">
                        <span>⭐ {plan.starRating}</span>
                        <span>Available: {plan.states.join(', ')}</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="text-center">
                        <div className="text-sm text-text-secondary">Premium</div>
                        <div className="text-2xl font-bold text-text-primary">
                          ₱{plan.premium}<span className="text-sm font-normal">/mo</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-text-secondary">Drug Coverage</div>
                        <div className="text-xl font-bold text-text-primary">
                          ₱{plan.drugDeductible}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-text-secondary">Generic Copay</div>
                        <div className="text-xl font-bold text-primary">
                          ₱{plan.tier1Copay}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
