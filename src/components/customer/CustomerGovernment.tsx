import React, { useState } from 'react';
import { useQLINK } from '../../context/QLINKContext';
import { GovService, GovBranch } from '../../types/qlink';
import {
  Building2,
  MapPin,
  Clock,
  FileText,
  Upload,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Search,
  AlertCircle,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

export const CustomerGovernment: React.FC = () => {
  const {
    govServices,
    govBranches,
    govQuestionnaires,
    govApplications,
    selectedGovService,
    setSelectedGovService,
    selectedGovBranch,
    setSelectedGovBranch,
    submitGovApplication,
    resubmitGovApplication,
    setCustomerTab,
  } = useQLINK();

  const [step, setStep] = useState<'catalog' | 'branch_select' | 'questionnaire' | 'review' | 'success'>('catalog');
  const [activeSearch, setActiveSearch] = useState('');
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; url: string; type: string; size: string }>>([]);
  const [generatedAppId, setGeneratedAppId] = useState<string>('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Active service and branch
  const activeService = selectedGovService || govServices[0];
  const activeBranch = selectedGovBranch || govBranches.find((b) => b.serviceId === activeService?.id) || govBranches[0];

  // Associated Questionnaire
  const questionnaire = govQuestionnaires.find((q) => q.serviceId === activeService?.id && q.status === 'Published') || govQuestionnaires[0];

  // Filtered services
  const filteredServices = govServices.filter(
    (s) => s.name.toLowerCase().includes(activeSearch.toLowerCase()) || s.category.toLowerCase().includes(activeSearch.toLowerCase())
  );

  const branchesForService = govBranches.filter((b) => b.serviceId === activeService?.id);

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
    if (formErrors[fieldId]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[fieldId];
        return next;
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fieldLabel: string) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newFileObj = {
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      };
      setUploadedFiles((prev) => [...prev, newFileObj]);
      handleFieldChange(fieldLabel, file.name);
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!questionnaire) return true;

    questionnaire.questions.forEach((q) => {
      // Check conditional logic
      if (q.conditionalOnField) {
        const parentVal = formData[q.conditionalOnField];
        if (parentVal !== q.conditionalValue) {
          return; // Condition not met, skip validation
        }
      }

      if (q.required && (!formData[q.id] || formData[q.id].toString().trim() === '')) {
        errors[q.id] = `${q.label} is required`;
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setStep('review');
    }
  };

  const handleFinalSubmit = () => {
    const appId = submitGovApplication(activeService.id, activeBranch.id, formData, uploadedFiles);
    setGeneratedAppId(appId);
    setStep('success');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. SERVICE CATALOG VIEW */}
      {step === 'catalog' && (
        <div className="space-y-6">
          {/* Header */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#181818] to-[#121212] border border-[#2A2A2A] shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37]">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-white font-display">
                  County Government Services
                </h1>
                <p className="text-xs text-[#888888]">
                  Available digital public administration services across Mandera County & Sub-Counties
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mt-5 relative">
              <Search className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search government service e.g. National ID, Birth Certificate, Permit..."
                value={activeSearch}
                onChange={(e) => setActiveSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#0A0A0A] border border-[#333333] focus:border-[#D4AF37] rounded-xl text-xs text-white placeholder-[#666666] focus:outline-none"
              />
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="p-5 rounded-2xl bg-[#141414] hover:bg-[#1A1A1A] border border-[#262626] hover:border-[#D4AF37]/50 transition-all shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#1C1C1C] text-[#D4AF37] border border-[#2A2A2A] uppercase">
                      {service.category}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        service.status === 'Open' ? 'bg-[#22C55E]/15 text-[#22C55E]' : 'bg-[#EAB308]/15 text-[#EAB308]'
                      }`}
                    >
                      ● {service.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mt-2.5">{service.name}</h3>
                  <p className="text-xs text-[#888888] mt-1 line-clamp-2 leading-relaxed">{service.description}</p>

                  {/* Requirements Preview */}
                  <div className="mt-3 pt-3 border-t border-[#202020] space-y-1">
                    <span className="text-[10px] font-bold text-[#AAAAAA] uppercase tracking-wider block">Requirements:</span>
                    <ul className="text-[11px] text-[#CCCCCC] space-y-0.5">
                      {service.requirements.slice(0, 2).map((req, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-[#D4AF37]" /> {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#222222] flex items-center justify-between">
                  <div className="text-[11px] text-[#888888] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> {service.avgWaitMinutes} min avg wait
                  </div>
                  <button
                    onClick={() => {
                      setSelectedGovService(service);
                      setStep('branch_select');
                    }}
                    className="px-4 py-2 bg-[#D4AF37] hover:bg-[#F5D76E] text-black font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View Branches</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. BRANCH SELECTION STEP */}
      {step === 'branch_select' && (
        <div className="space-y-6">
          <button
            onClick={() => setStep('catalog')}
            className="flex items-center gap-1.5 text-xs text-[#D4AF37] hover:text-[#F5D76E] font-semibold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Services Catalog
          </button>

          {/* Service Profile Summary Header */}
          <div className="p-5 rounded-2xl bg-[#141414] border border-[#2A2A2A] shadow-lg">
            <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider font-bold">
              {activeService.organizationName}
            </span>
            <h2 className="text-xl font-bold text-white mt-0.5">{activeService.name}</h2>
            <p className="text-xs text-[#888888] mt-1">{activeService.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-[#222222]">
              <div>
                <span className="text-[10px] font-bold text-[#AAAAAA] uppercase">Operating Hours</span>
                <p className="text-xs text-white mt-0.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> {activeService.operatingHours}
                </p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#AAAAAA] uppercase">Required Documents</span>
                <p className="text-xs text-[#CCCCCC] mt-0.5">
                  {activeService.requiredDocuments.join(', ')}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white mb-3">Select Nearest Processing Branch</h3>
            <div className="space-y-3">
              {(branchesForService.length > 0 ? branchesForService : govBranches).map((branch) => (
                <div
                  key={branch.id}
                  className="p-4 rounded-xl bg-[#141414] hover:bg-[#1A1A1A] border border-[#262626] hover:border-[#D4AF37]/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{branch.name}</h4>
                      <span className="text-[10px] font-semibold px-2 py-0.2 rounded bg-[#1C1C1C] text-[#22C55E] border border-[#2E2E2E]">
                        {branch.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#888888] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> {branch.address}
                    </p>
                    <div className="flex items-center gap-4 text-[11px] text-[#CCCCCC] pt-1">
                      <span>Queue: <strong className="text-[#F5D76E]">{branch.currentQueue} waiting</strong></span>
                      <span>Avg Wait: <strong className="text-white">{branch.avgWaitMinutes} mins</strong></span>
                      <span>Capacity: <strong className="text-white">{branch.capacityUtilization}%</strong></span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedGovBranch(branch);
                      setStep('questionnaire');
                    }}
                    className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#F5D76E] text-black font-bold text-xs rounded-xl shadow-md transition-all self-start sm:self-auto cursor-pointer"
                  >
                    Select Branch & Apply
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. DYNAMIC QUESTIONNAIRE STEP */}
      {step === 'questionnaire' && (
        <form onSubmit={handleProceedToReview} className="space-y-6">
          <button
            type="button"
            onClick={() => setStep('branch_select')}
            className="flex items-center gap-1.5 text-xs text-[#D4AF37] hover:text-[#F5D76E] font-semibold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Change Branch
          </button>

          {/* Form Header */}
          <div className="p-5 rounded-2xl bg-[#141414] border border-[#2A2A2A] shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold">
                Application Form • {activeBranch.name}
              </span>
              <span className="text-[10px] text-[#888888]">Version {questionnaire.version}.0</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">{questionnaire.title}</h2>
            <p className="text-xs text-[#888888] mt-1">{questionnaire.description}</p>
          </div>

          {/* Dynamic Question Fields */}
          <div className="p-6 rounded-2xl bg-[#141414] border border-[#2A2A2A] space-y-5 shadow-xl">
            {questionnaire.questions.map((q) => {
              // Conditional Logic Check
              if (q.conditionalOnField) {
                const parentValue = formData[q.conditionalOnField];
                if (parentValue !== q.conditionalValue) {
                  return null; // Don't render if condition not met
                }
              }

              const hasError = !!formErrors[q.id];

              return (
                <div key={q.id} className="space-y-1.5">
                  <label className="text-xs font-bold text-[#CCCCCC] flex items-center justify-between">
                    <span>
                      {q.label} {q.required && <span className="text-[#EF4444]">*</span>}
                    </span>
                    {q.helpText && (
                      <span className="text-[10px] text-[#888888] font-normal flex items-center gap-1">
                        <HelpCircle className="w-3 h-3 text-[#D4AF37]" /> {q.helpText}
                      </span>
                    )}
                  </label>

                  {/* Input Rendering by Type */}
                  {q.type === 'short_text' && (
                    <input
                      type="text"
                      placeholder={q.placeholder || 'Enter value...'}
                      value={formData[q.id] || ''}
                      onChange={(e) => handleFieldChange(q.id, e.target.value)}
                      className={`w-full px-3.5 py-2.5 bg-[#0A0A0A] border ${
                        hasError ? 'border-[#EF4444]' : 'border-[#333333] focus:border-[#D4AF37]'
                      } rounded-xl text-xs text-white focus:outline-none`}
                    />
                  )}

                  {q.type === 'long_text' && (
                    <textarea
                      rows={3}
                      placeholder={q.placeholder || 'Provide details...'}
                      value={formData[q.id] || ''}
                      onChange={(e) => handleFieldChange(q.id, e.target.value)}
                      className={`w-full px-3.5 py-2.5 bg-[#0A0A0A] border ${
                        hasError ? 'border-[#EF4444]' : 'border-[#333333] focus:border-[#D4AF37]'
                      } rounded-xl text-xs text-white focus:outline-none`}
                    />
                  )}

                  {q.type === 'date' && (
                    <input
                      type="date"
                      value={formData[q.id] || ''}
                      onChange={(e) => handleFieldChange(q.id, e.target.value)}
                      className={`w-full px-3.5 py-2.5 bg-[#0A0A0A] border ${
                        hasError ? 'border-[#EF4444]' : 'border-[#333333] focus:border-[#D4AF37]'
                      } rounded-xl text-xs text-white focus:outline-none`}
                    />
                  )}

                  {q.type === 'dropdown' && q.options && (
                    <select
                      value={formData[q.id] || ''}
                      onChange={(e) => handleFieldChange(q.id, e.target.value)}
                      className={`w-full px-3.5 py-2.5 bg-[#0A0A0A] border ${
                        hasError ? 'border-[#EF4444]' : 'border-[#333333] focus:border-[#D4AF37]'
                      } rounded-xl text-xs text-white focus:outline-none`}
                    >
                      <option value="">-- Select an option --</option>
                      {q.options.map((opt, oIdx) => (
                        <option key={oIdx} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  )}

                  {q.type === 'yes_no' && (
                    <div className="flex gap-3">
                      {['Yes', 'No'].map((choice) => (
                        <button
                          key={choice}
                          type="button"
                          onClick={() => handleFieldChange(q.id, choice)}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all border ${
                            formData[q.id] === choice
                              ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                              : 'bg-[#0A0A0A] text-[#888888] border-[#333333] hover:border-[#D4AF37]'
                          }`}
                        >
                          {choice}
                        </button>
                      ))}
                    </div>
                  )}

                  {(q.type === 'document_upload' || q.type === 'image_upload' || q.type === 'multiple_documents') && (
                    <div className="p-4 rounded-xl bg-[#0A0A0A] border border-dashed border-[#333333] hover:border-[#D4AF37]/60 transition-colors text-center relative">
                      <input
                        type="file"
                        onChange={(e) => handleFileUpload(e, q.id)}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        accept={q.type === 'image_upload' ? 'image/*' : '.pdf,image/*'}
                      />
                      <Upload className="w-5 h-5 text-[#D4AF37] mx-auto mb-1.5" />
                      <p className="text-xs font-semibold text-white">
                        {formData[q.id] ? (
                          <span className="text-[#22C55E] flex items-center justify-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> {formData[q.id]}
                          </span>
                        ) : (
                          'Click or drag file to upload'
                        )}
                      </p>
                      <p className="text-[10px] text-[#666666] mt-0.5">PDF or High-Res JPEG (Max 10MB)</p>
                    </div>
                  )}

                  {hasError && (
                    <p className="text-[11px] text-[#EF4444] flex items-center gap-1 mt-0.5">
                      <AlertCircle className="w-3 h-3" /> {formErrors[q.id]}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setStep('branch_select')}
              className="px-4 py-2.5 rounded-xl bg-[#1C1C1C] hover:bg-[#252525] text-xs font-semibold text-white border border-[#2E2E2E]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#F5D76E] via-[#D4AF37] to-[#B8860B] text-black font-extrabold text-xs shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all cursor-pointer"
            >
              Review Application Details →
            </button>
          </div>
        </form>
      )}

      {/* 4. REVIEW STEP */}
      {step === 'review' && (
        <div className="space-y-6">
          <button
            onClick={() => setStep('questionnaire')}
            className="flex items-center gap-1.5 text-xs text-[#D4AF37] hover:text-[#F5D76E] font-semibold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Edit Questionnaire Answers
          </button>

          <div className="p-6 rounded-2xl bg-[#141414] border border-[#2A2A2A] shadow-xl space-y-5">
            <div className="border-b border-[#242424] pb-4">
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold">Step 4 of 4: Verification</span>
              <h2 className="text-xl font-bold text-white mt-1">Review Your Application</h2>
              <p className="text-xs text-[#888888]">Please confirm all submitted details are legally accurate.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-[#0E0E0E] border border-[#222222]">
                <span className="text-[10px] font-bold text-[#888888] uppercase">Service</span>
                <p className="text-xs font-bold text-white mt-0.5">{activeService.name}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0E0E0E] border border-[#222222]">
                <span className="text-[10px] font-bold text-[#888888] uppercase">Processing Branch</span>
                <p className="text-xs font-bold text-white mt-0.5">{activeBranch.name}</p>
              </div>
            </div>

            {/* Answered Data Key-Values */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Submitted Particulars:</h4>
              <div className="p-4 rounded-xl bg-[#0E0E0E] border border-[#222222] divide-y divide-[#1F1F1F]">
                {Object.entries(formData).map(([key, val]) => (
                  <div key={key} className="py-2 flex items-center justify-between text-xs">
                    <span className="text-[#888888]">{key}:</span>
                    <span className="text-white font-semibold">{String(val)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Uploaded Documents List */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Uploaded Documents:</h4>
                <div className="space-y-1.5">
                  {uploadedFiles.map((doc, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-[#0E0E0E] border border-[#222222] flex items-center justify-between text-xs">
                      <span className="text-white flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-[#D4AF37]" /> {doc.name}
                      </span>
                      <span className="text-[10px] text-[#888888]">{doc.size}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setStep('questionnaire')}
              className="px-4 py-2.5 rounded-xl bg-[#1C1C1C] hover:bg-[#252525] text-xs font-semibold text-white border border-[#2E2E2E]"
            >
              Modify Answers
            </button>
            <button
              onClick={handleFinalSubmit}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#F5D76E] via-[#D4AF37] to-[#B8860B] text-black font-extrabold text-xs shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.5)] transition-all cursor-pointer"
            >
              Confirm & Submit Application
            </button>
          </div>
        </div>
      )}

      {/* 5. SUCCESS CONFIRMATION STEP */}
      {step === 'success' && (
        <div className="p-8 rounded-2xl bg-[#141414] border border-[#D4AF37]/50 shadow-2xl text-center space-y-5 animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37] flex items-center justify-center mx-auto text-[#F5D76E] shadow-[0_0_30px_rgba(212,175,55,0.4)]">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Application Lodged Successfully
            </span>
            <h2 className="text-2xl font-extrabold text-white">Application ID: {generatedAppId}</h2>
            <p className="text-xs text-[#888888] max-w-sm mx-auto">
              Your application has been routed directly to the {activeBranch.name} service administrator.
            </p>
          </div>

          {/* Application Tracking Timeline Preview */}
          <div className="p-4 rounded-xl bg-[#0E0E0E] border border-[#242424] text-left space-y-3">
            <span className="text-[10px] font-bold text-[#AAAAAA] uppercase tracking-wider block">Real-Time Status Pipeline:</span>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="font-bold text-white">Under Review</span>
              <span className="text-[10px] text-[#888888] ml-auto">Estimated decision: 24-48 hrs</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setCustomerTab('my_qlink')}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#F5D76E] text-black font-extrabold text-xs shadow-md transition-all cursor-pointer"
            >
              Track in &ldquo;My Applications&rdquo; →
            </button>
            <button
              onClick={() => {
                setFormData({});
                setUploadedFiles([]);
                setStep('catalog');
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#1C1C1C] hover:bg-[#252525] text-xs font-semibold text-white border border-[#2E2E2E]"
            >
              Submit Another Service
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
