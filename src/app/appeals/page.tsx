'use client';

import { useState, useRef } from 'react';
import { FileText, Upload, Clock, CheckCircle, AlertCircle, Download, Send, Calendar, Search, X, Check } from 'lucide-react';
import { Button, Card, Input, Select, Badge, Modal } from '@/components/ui';
import { useAuthStore } from '@/lib/store/auth';
import { formatCurrency } from '@/lib/utils/currency';

const templates = [
  { id: '1', name: 'Medical Necessity Letter', type: 'Appeal', description: 'Standard appeal for medical necessity coverage' },
  { id: '2', name: 'Prior Authorization Request', type: 'Authorization', description: 'Request for prior authorization' },
  { id: '3', name: 'External Review Request', type: 'External', description: 'Request for independent external review' },
  { id: '4', name: 'Step Therapy Exception', type: 'Exception', description: 'Request for step therapy exception' },
  { id: '5', name: 'Formulary Exception Request', type: 'Exception', description: 'Request for formulary exception' },
  { id: '6', name: 'Urgent Care Appeal', type: 'Urgent', description: 'Expedited appeal for urgent care' },
];

export default function AppealsPage() {
  const [showGenerator, setShowGenerator] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [parsedData, setParsedData] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { isAuthenticated } = useAuthStore();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadedFile(file);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setParsedData({
      insuranceCompany: 'PhilHealth',
      policyNumber: 'PH' + Math.random().toString().slice(2, 12),
      denialReason: 'Not on current formulary',
      drugName: '',
      date: new Date().toISOString().split('T')[0],
    });
    
    setUploading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/pdf' || file.type.startsWith('image/'))) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      if (fileInputRef.current) {
        fileInputRef.current.files = dataTransfer.files;
        handleFileUpload({ target: { files: dataTransfer.files } } as any);
      }
    }
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setParsedData(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-br from-amber-500 to-amber-700 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Insurance Appeal Generator
          </h1>
          <p className="text-white/80 mb-8">
            Upload denial letters, generate professional appeal letters, and track your appeal deadlines.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/10 backdrop-blur-sm border-0 text-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Upload Denial Letter</h3>
                  <p className="text-sm text-white/70">AI extracts key info</p>
                </div>
              </div>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-0 text-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Generate Letter</h3>
                  <p className="text-sm text-white/70">AI-powered assistance</p>
                </div>
              </div>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-0 text-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Track Deadlines</h3>
                  <p className="text-sm text-white/70">Never miss a deadline</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <Card>
                <h2 className="text-xl font-bold text-text-primary mb-6">
                  Upload Denial Letter
                </h2>
                
                <div 
                  className="border-2 border-dashed border-border rounded-xl p-8 text-center mb-6"
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  {uploadedFile ? (
                    <div className="flex flex-col items-center">
                      {uploading ? (
                        <>
                          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
                          <p className="text-text-primary font-medium">Analyzing document...</p>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-12 h-12 text-success mb-4" />
                          <p className="text-text-primary font-medium">{uploadedFile.name}</p>
                          <p className="text-sm text-text-secondary">Document uploaded successfully</p>
                          <button onClick={resetUpload} className="mt-2 text-sm text-error">
                            Upload different file
                          </button>
                        </>
                      )}
                    </div>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-text-secondary mx-auto mb-4" />
                      <p className="text-text-primary font-medium mb-2">
                        Drag and drop your denial letter
                      </p>
                      <p className="text-sm text-text-secondary mb-4">
                        Supports PDF, JPG, PNG (max 10MB)
                      </p>
                      <label htmlFor="file-upload" className="cursor-pointer inline-block">
                        <span className="inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 border-2 border-primary text-primary hover:bg-primary hover:text-white px-4 py-2.5 text-base">
                          Choose File
                        </span>
                      </label>
                    </>
                  )}
                </div>

                {parsedData && (
                  <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span className="font-medium text-success">Document Analyzed</span>
                    </div>
                    <p className="text-sm text-text-secondary">
                      Insurance: {parsedData.insuranceCompany}<br />
                      Reason: {parsedData.denialReason}
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="font-semibold text-text-primary">Or enter details manually:</h3>
                  <Input label="Insurance Company" placeholder="e.g., PhilHealth, Maxicare, etc." />
                  <Input label="Policy Number" placeholder="Enter your policy number" />
                  <Input label="Denial Reason" placeholder="Why was your claim denied?" />
                  <Select
                    label="Appeal Type"
                    options={[
                      { value: 'standard', label: 'Standard Appeal' },
                      { value: 'expedited', label: 'Expedited Appeal' },
                      { value: 'external', label: 'External Review' },
                    ]}
                    placeholder="Select appeal type"
                  />
                  <Button className="w-full" onClick={() => setShowGenerator(true)}>
                    Generate Appeal Letter
                  </Button>
                </div>
              </Card>
            </div>

            <div>
              <Card>
                <h2 className="text-xl font-bold text-text-primary mb-6">
                  Appeal Templates
                </h2>
                
                <div className="space-y-3">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/50 cursor-pointer transition-colors"
                      onClick={() => setShowGenerator(true)}
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium text-text-primary">{template.name}</p>
                          <p className="text-sm text-text-secondary">{template.description}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="mt-6">
                <h2 className="text-xl font-bold text-text-primary mb-6">
                  Upcoming Deadlines
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-error/5 border border-error/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-error" />
                      <div>
                        <p className="font-medium text-text-primary">Urgent Appeal</p>
                        <p className="text-sm text-text-secondary">72 hours remaining</p>
                      </div>
                    </div>
                    <Badge variant="error">72 hrs</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-warning/5 border border-warning/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-warning" />
                      <div>
                        <p className="font-medium text-text-primary">Standard Appeal</p>
                        <p className="text-sm text-text-secondary">45 days remaining</p>
                      </div>
                    </div>
                    <Badge variant="warning">45 days</Badge>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  Add to Calendar
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Modal isOpen={showGenerator} onClose={() => setShowGenerator(false)} title="Generate Appeal Letter" size="lg">
        <AppealLetterGenerator onClose={() => setShowGenerator(false)} />
      </Modal>
    </div>
  );
}

function AppealLetterGenerator({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    patientName: '',
    insuranceCompany: '',
    policyNumber: '',
    drugName: '',
    denialReason: '',
    appealType: 'medical_necessity',
    medicalHistory: '',
    previousTreatments: '',
  });
  const [generatedLetter, setGeneratedLetter] = useState('');

  const generateLetter = () => {
    const letter = `
[Your Name]
[Your Address]
[City, Province ZIP]
[Date]

[Insurance Company Name]
[Address]
[City, Province ZIP]

RE: Appeal for Medical Necessity - ${formData.drugName || '[Drug Name]'}
Policy Number: ${formData.policyNumber || '[Policy Number]'}

Dear Appeals Department:

I am writing to formally appeal the denial of coverage for ${formData.drugName || '[Drug Name]'} for the treatment of my medical condition.

PATIENT INFORMATION:
Name: ${formData.patientName || '[Patient Name]'}
Policy Number: ${formData.policyNumber || '[Policy Number]'}

DENIAL INFORMATION:
Date of Denial: ${new Date().toLocaleDateString()}
Reason for Denial: ${formData.denialReason || '[Denial Reason]'}

MEDICAL NECESSITY:
${formData.medicalHistory || 'My physician has prescribed this medication as medically necessary for my condition. This treatment has been determined to be the most appropriate course of action based on my medical history and current health status.'}

PREVIOUS TREATMENTS:
${formData.previousTreatments || 'I have tried alternative treatments but this medication is required for effective management of my condition.'}

I respectfully request that you reconsider your decision to deny coverage for this medication. I am willing to provide any additional information or documentation required to support my appeal.

Please contact me at your earliest convenience to discuss this matter further.

Sincerely,

[Your Signature]
[Your Name]
[Your Contact Number]
[Your Email]
    `.trim();
    
    setGeneratedLetter(letter);
  };

  return (
    <div>
      <Progress value={(step / 3) * 100} showLabel className="mb-6" />
      
      {step === 1 && (
        <div className="animate-fade-in">
          <h3 className="font-semibold text-text-primary mb-4">Patient & Insurance Information</h3>
          <div className="space-y-4">
            <Input 
              label="Patient Name" 
              value={formData.patientName}
              onChange={(e) => setFormData({...formData, patientName: e.target.value})}
              placeholder="Enter your full name" 
            />
            <Input 
              label="Insurance Company" 
              value={formData.insuranceCompany}
              onChange={(e) => setFormData({...formData, insuranceCompany: e.target.value})}
              placeholder="e.g., PhilHealth, Maxicare" 
            />
            <Input 
              label="Policy Number" 
              value={formData.policyNumber}
              onChange={(e) => setFormData({...formData, policyNumber: e.target.value})}
              placeholder="Enter your policy number" 
            />
            <Input 
              label="Medication/Drug" 
              value={formData.drugName}
              onChange={(e) => setFormData({...formData, drugName: e.target.value})}
              placeholder="Enter the medication name" 
            />
            <Input 
              label="Denial Reason" 
              value={formData.denialReason}
              onChange={(e) => setFormData({...formData, denialReason: e.target.value})}
              placeholder="Why was your claim denied?" 
            />
            <Select
              label="Appeal Type"
              value={formData.appealType}
              onChange={(e) => setFormData({...formData, appealType: e.target.value})}
              options={[
                { value: 'medical_necessity', label: 'Medical Necessity' },
                { value: 'exception', label: 'Formulary Exception' },
                { value: 'step_therapy', label: 'Step Therapy Exception' },
              ]}
            />
          </div>
          <div className="flex justify-end mt-6">
            <Button onClick={() => { generateLetter(); setStep(2); }}>Continue</Button>
          </div>
        </div>
      )}
      
      {step === 2 && (
        <div className="animate-fade-in">
          <h3 className="font-semibold text-text-primary mb-4">Medical Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                Medical History / Diagnosis
              </label>
              <textarea
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                rows={3}
                value={formData.medicalHistory}
                onChange={(e) => setFormData({...formData, medicalHistory: e.target.value})}
                placeholder="Describe your medical condition..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                Previous Treatments Tried
              </label>
              <textarea
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                rows={3}
                value={formData.previousTreatments}
                onChange={(e) => setFormData({...formData, previousTreatments: e.target.value})}
                placeholder="List previous treatments you've tried..."
              />
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
            <Button onClick={() => setStep(3)}>Generate Letter</Button>
          </div>
        </div>
      )}
      
      {step === 3 && (
        <div className="animate-fade-in">
          <h3 className="font-semibold text-text-primary mb-4">Generated Appeal Letter</h3>
          <div className="bg-slate-50 rounded-lg p-4 mb-4 max-h-64 overflow-auto">
            <pre className="text-sm text-text-primary whitespace-pre-wrap font-mono">
{generatedLetter}
            </pre>
          </div>
          <div className="flex justify-between">
            <Button variant="ghost" onClick={() => setStep(2)}>Back</Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => {
                const blob = new Blob([generatedLetter], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'appeal-letter.txt';
                a.click();
              }}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button onClick={onClose}>
                <Send className="w-4 h-4 mr-2" />
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Progress({ value, showLabel, className = '' }: { value: number; showLabel?: boolean; className?: string }) {
  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-text-primary">Progress</span>
          <span className="text-sm font-medium text-text-secondary">{Math.round(value)}%</span>
        </div>
      )}
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
