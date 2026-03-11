'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, MapPin, Clock, Phone, Navigation, Save, Bell, Check } from 'lucide-react';
import { Button, Input, Card, Badge } from '@/components/ui';
import { drugs, pharmacies } from '@/lib/data';
import { formatCurrency } from '@/lib/utils/currency';
import { useAuthStore } from '@/lib/store/auth';
import { useWatchlistStore } from '@/lib/store/watchlist';

interface SearchResult {
  drug: typeof drugs[number];
  pharmacies: {
    pharmacy: typeof pharmacies[number];
    cashPrice: number;
    discountPrice: number;
    savings: number;
    inStock: boolean;
  }[];
}

export default function PriceComparePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Mati');
  const [radius, setRadius] = useState(10);
  const [sortBy, setSortBy] = useState<'price' | 'distance' | 'savings'>('price');
  const [results, setResults] = useState<SearchResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedDrug, setSelectedDrug] = useState<typeof drugs[number] | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  
  const { isAuthenticated } = useAuthStore();
  const { addItem, removeItem, isInWatchlist } = useWatchlistStore();

  const filteredDrugs = useMemo(() => {
    if (!searchQuery) return [];
    const query = searchQuery.toLowerCase();
    return drugs.filter(
      (drug) =>
        drug.name.toLowerCase().includes(query) ||
        drug.generic.toLowerCase().includes(query)
    ).slice(0, 8);
  }, [searchQuery]);

  const handleSearch = async () => {
    if (!selectedDrug || !location) return;
    
    setLoading(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const mockResults: SearchResult = {
      drug: selectedDrug,
      pharmacies: pharmacies.map((pharmacy) => {
        const basePrice = 50 + Math.random() * 500;
        const discount = Math.random() * 0.3 + 0.1;
        
        return {
          pharmacy,
          cashPrice: Math.round(basePrice),
          discountPrice: Math.round(basePrice * (1 - discount)),
          savings: Math.round(basePrice * discount),
          inStock: Math.random() > 0.2,
        };
      }).sort((a, b) => {
        if (sortBy === 'price') return a.discountPrice - b.discountPrice;
        if (sortBy === 'savings') return b.savings - a.savings;
        return 0;
      }),
    };
    
    setResults([mockResults]);
    setLoading(false);
  };

  const handleSave = (drugName: string, pharmacyName: string) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    addItem(drugName);
    setSavedMessage(`${pharmacyName} - ${drugName} saved to watchlist!`);
    setTimeout(() => setSavedMessage(null), 3000);
  };

  const handleRemove = (drugName: string) => {
    removeItem(drugName);
  };

  const openDirections = (pharmacy: typeof pharmacies[number]) => {
    const address = `${pharmacy.address}, ${pharmacy.city}, ${pharmacy.state} ${pharmacy.zip}`;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-br from-primary to-primary-light py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Medication Price Comparison
          </h1>
          <p className="text-white/80 mb-8">
            Find the best prices at pharmacies in Mati, Davao Oriental. Search anonymously — no account required.
          </p>

          <div className="bg-surface rounded-2xl p-6 card-shadow">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Input
                  label="Medication"
                  placeholder="Search for a medication..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedDrug(null);
                  }}
                  icon={<Search className="w-5 h-5" />}
                />
                {filteredDrugs.length > 0 && !selectedDrug && (
                  <div className="absolute z-10 w-full mt-1 bg-surface border border-border rounded-lg shadow-lg max-h-64 overflow-auto">
                    {filteredDrugs.map((drug) => (
                      <button
                        key={drug.id}
                        className="w-full px-4 py-3 text-left hover:bg-slate-50 border-b border-border last:border-0"
                        onClick={() => {
                          setSelectedDrug(drug);
                          setSearchQuery(drug.name);
                        }}
                      >
                        <div className="font-medium text-text-primary">{drug.name}</div>
                        <div className="text-sm text-text-secondary">
                          {drug.generic} • {drug.dosage} • {drug.form}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="relative">
                <Input
                  label="Location"
                  placeholder="Enter city or area"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  icon={<MapPin className="w-5 h-5" />}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Search Radius: {radius} km
                </label>
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={radius}
                  onChange={(e) => setRadius(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <Button
                onClick={handleSearch}
                loading={loading}
                disabled={!selectedDrug || !location}
                className="w-full"
              >
                <Search className="w-5 h-5 mr-2" />
                Compare Prices
              </Button>
            </div>
          </div>
        </div>
      </section>

      {savedMessage && (
        <div className="fixed top-20 right-4 z-50 bg-success text-white px-6 py-3 rounded-lg shadow-lg flex items-center animate-slide-up">
          <Check className="w-5 h-5 mr-2" />
          {savedMessage}
        </div>
      )}

      {results && (
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-text-primary">
                  {results[0].drug.name} ({results[0].drug.dosage})
                </h2>
                <p className="text-text-secondary">
                  {results[0].pharmacies.length} pharmacies found in {location}, Davao Oriental
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm text-text-secondary">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="px-3 py-2 border border-border rounded-lg bg-surface text-text-primary"
                >
                  <option value="price">Lowest Price</option>
                  <option value="savings">Biggest Savings</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {results[0].pharmacies.map((result, index) => (
                <Card 
                  key={result.pharmacy.id} 
                  hover
                  className={index === 0 ? 'border-primary border-2' : ''}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-text-primary">
                          {result.pharmacy.name}
                        </h3>
                        {index === 0 && (
                          <Badge variant="accent" size="sm">Best Price</Badge>
                        )}
                        {result.inStock ? (
                          <Badge variant="success" size="sm">In Stock</Badge>
                        ) : (
                          <Badge variant="error" size="sm">Out of Stock</Badge>
                        )}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-text-secondary">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {result.pharmacy.address}, {result.pharmacy.city}, {result.pharmacy.state} {result.pharmacy.zip}
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          {result.pharmacy.phone}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {result.pharmacy.hours}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-8">
                      <div className="text-left">
                        <div className="text-sm text-text-secondary line-through">
                          {formatCurrency(result.cashPrice)}
                        </div>
                        <div className="text-2xl font-bold text-primary">
                          {formatCurrency(result.discountPrice)}
                        </div>
                        {result.savings > 0 && (
                          <div className="text-sm text-success font-medium">
                            Save {formatCurrency(result.savings)} ({Math.round((result.savings / result.cashPrice) * 100)}%)
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <Button 
                          size="sm" 
                          disabled={!result.inStock}
                          onClick={() => openDirections(result.pharmacy)}
                        >
                          <Navigation className="w-4 h-4 mr-1" />
                          Get Directions
                        </Button>
                        <div className="flex gap-2">
                          {isInWatchlist(results[0].drug.name) ? (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleRemove(results[0].drug.name)}
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                          ) : (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleSave(results[0].drug.name, result.pharmacy.name)}
                            >
                              <Save className="w-4 h-4" />
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            <Bell className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="mt-8 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Badge variant="info">?</Badge>
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">
                    Not finding what you need?
                  </h3>
                  <p className="text-sm text-text-secondary mb-3">
                    You may qualify for Patient Assistance Programs (PAPs) that provide medications free or at reduced cost.
                  </p>
                  <Button size="sm" variant="secondary" onClick={() => window.location.href = '/pap'}>
                    Check PAP Eligibility
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}
    </div>
  );
}
