'use client';

import { useState } from 'react';
import { Bell, Search, AlertTriangle, CheckCircle, MapPin, Clock, ArrowRight, Plus, X, Trash2, Save, Check } from 'lucide-react';
import { Button, Card, Input, Badge, Modal } from '@/components/ui';
import { shortages } from '@/lib/data';
import { Shortage } from '@/lib/types';
import { useAuthStore } from '@/lib/store/auth';
import { useWatchlistStore } from '@/lib/store/watchlist';

export default function ShortagesPage() {
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [selectedDrug, setSelectedDrug] = useState<string | null>(null);
  const [alertSettings, setAlertSettings] = useState({
    zipCode: '8200',
    radius: '10',
    email: true,
    sms: false,
  });
  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  
  const { isAuthenticated } = useAuthStore();
  const { addItem, removeItem, isInWatchlist } = useWatchlistStore();

  const filteredShortages = shortages.filter(
    (s) =>
      s.drug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.generic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToWatchlist = (drugName: string) => {
    if (!isAuthenticated) {
      alert('Please sign in to add medications to your watchlist.');
      return;
    }
    addItem(drugName);
    setSavedMessage(`${drugName} added to your watchlist!`);
    setTimeout(() => setSavedMessage(null), 3000);
    setShowAlertModal(false);
  };

  const shortageStatuses = {
    'Shortage': { color: 'error' as const, label: 'In Shortage' },
    'Limited': { color: 'warning' as const, label: 'Limited Supply' },
    'Available': { color: 'success' as const, label: 'Available' },
  };

  return (
    <div className="min-h-screen bg-background">
      {savedMessage && (
        <div className="fixed top-20 right-4 z-50 bg-success text-white px-6 py-3 rounded-lg shadow-lg flex items-center animate-slide-up">
          <Check className="w-5 h-5 mr-2" />
          {savedMessage}
        </div>
      )}

      <section className="bg-gradient-to-br from-emerald-500 to-emerald-700 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Medication Shortage Alerts
          </h1>
          <p className="text-white/80 mb-8">
            Stay informed about medication shortages in the Philippines and get notified when your medications become available.
          </p>

          {isAuthenticated && (
            <Card className="bg-white/10 backdrop-blur-sm border-0">
              <h3 className="font-semibold text-white mb-4">Your Watchlist</h3>
              <div className="flex flex-wrap gap-2">
                {isInWatchlist('') ? (
                  <span className="text-white/70">No medications in your watchlist</span>
                ) : (
                  <span className="text-white/70">Add medications to track their availability</span>
                )}
              </div>
            </Card>
          )}
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Input
              placeholder="Search for medications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-5 h-5" />}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShortages.map((shortage) => (
              <ShortageCard
                key={shortage.id}
                shortage={shortage}
                onAddToWatchlist={() => {
                  setSelectedDrug(shortage.drug);
                  setShowAlertModal(true);
                }}
                isOnWatchlist={isInWatchlist(shortage.drug)}
              />
            ))}
          </div>

          {filteredShortages.length === 0 && (
            <Card className="text-center py-12">
              <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">No Shortages Found</h3>
              <p className="text-text-secondary">
                {searchQuery
                  ? `No medications matching "${searchQuery}"`
                  : 'No medication shortages currently reported'}
              </p>
            </Card>
          )}
        </div>
      </section>

      <Modal isOpen={showAlertModal} onClose={() => setShowAlertModal(false)} title="Set Up Alert">
        <div className="space-y-4">
          <p className="text-text-secondary">
            Get notified when {selectedDrug} is available at pharmacies near you.
          </p>
          
          <Input
            label="ZIP Code"
            placeholder="Enter your ZIP code"
            value={alertSettings.zipCode}
            onChange={(e) => setAlertSettings({...alertSettings, zipCode: e.target.value})}
            icon={<MapPin className="w-5 h-5" />}
          />
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Alert Radius
            </label>
            <select 
              className="w-full px-4 py-2 border border-border rounded-lg"
              value={alertSettings.radius}
              onChange={(e) => setAlertSettings({...alertSettings, radius: e.target.value})}
            >
              <option value="5">5 km</option>
              <option value="10">10 km</option>
              <option value="25">25 km</option>
              <option value="50">50 km</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Notification Method
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  className="mr-2" 
                  checked={alertSettings.email}
                  onChange={(e) => setAlertSettings({...alertSettings, email: e.target.checked})}
                />
                Email
              </label>
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  className="mr-2"
                  checked={alertSettings.sms}
                  onChange={(e) => setAlertSettings({...alertSettings, sms: e.target.checked})}
                />
                SMS
              </label>
            </div>
          </div>

          <Button 
            className="w-full" 
            onClick={() => selectedDrug && handleAddToWatchlist(selectedDrug)}
          >
            <Bell className="w-4 h-4 mr-2" />
            Set Up Alert
          </Button>
        </div>
      </Modal>
    </div>
  );
}

function ShortageCard({
  shortage,
  onAddToWatchlist,
  isOnWatchlist,
}: {
  shortage: Shortage;
  onAddToWatchlist: () => void;
  isOnWatchlist: boolean;
}) {
  const shortageStatusMap = {
    'Shortage': { color: 'error' as const, label: 'In Shortage' },
    'Limited': { color: 'warning' as const, label: 'Limited Supply' },
    'Available': { color: 'success' as const, label: 'Available' },
  };
  
  const status = shortage.status as keyof typeof shortageStatusMap;

  return (
    <Card hover>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-text-primary">{shortage.drug}</h3>
          <p className="text-sm text-text-secondary">{shortage.generic}</p>
        </div>
        <Badge variant={shortageStatusMap[status]?.color || 'default'}>
          {shortageStatusMap[status]?.label || shortage.status}
        </Badge>
      </div>

      <div className="space-y-2 text-sm mb-4">
        <div className="flex items-center text-text-secondary">
          <span className="font-medium text-text-primary w-24">Manufacturer:</span>
          {shortage.manufacturer}
        </div>
        {shortage.reason && (
          <div className="flex items-center text-text-secondary">
            <span className="font-medium text-text-primary w-24">Reason:</span>
            {shortage.reason}
          </div>
        )}
        {shortage.estimatedEnd && (
          <div className="flex items-center text-text-secondary">
            <Clock className="w-4 h-4 mr-2" />
            Est. available: {shortage.estimatedEnd}
          </div>
        )}
      </div>

      {shortage.alternatives.length > 0 && (
        <div className="mb-4 p-3 bg-slate-50 rounded-lg">
          <p className="text-xs font-medium text-text-secondary mb-2">Alternatives:</p>
          <div className="space-y-1">
            {shortage.alternatives.map((alt: { name: string; dosage: string; notes: string }, idx: number) => (
              <div key={idx} className="text-sm">
                <span className="font-medium text-text-primary">{alt.name}</span>
                <span className="text-text-secondary"> - {alt.notes}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2">
        {isOnWatchlist ? (
          <Button variant="outline" className="flex-1" disabled>
            <Check className="w-4 h-4 mr-2" />
            On Watchlist
          </Button>
        ) : (
          <Button className="flex-1" onClick={onAddToWatchlist}>
            <Bell className="w-4 h-4 mr-2" />
            Alert Me
          </Button>
        )}
        <Button variant="ghost" size="sm">
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}
