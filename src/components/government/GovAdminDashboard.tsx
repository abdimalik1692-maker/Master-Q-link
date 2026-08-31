import React, { useState } from 'react';
import { useQLINK } from '../../context/QLINKContext';
import { GovQuestion, GovQuestionType, GovApplicationStatus } from '../../types/qlink';
import {
  FileText,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Eye,
  Send,
  Layers,
  ArrowRight,
  Upload,
  Calendar,
  Clock,
  Sparkles,
  HelpCircle,
  Settings,
} from 'lucide-react';

export const GovAdminDashboard: React.FC = () => {
  const {
    govServices,
    govQuestionnaires,
    govApplications,
    updateGovQuestionnaire,
    updateGovApplicationStatus,
  } = useQLINK();

  const [activeTab, setActiveTab] = useState<'questionnaires' | 'applications'>('applications');
  const [selectedServiceId, setSelectedServiceId] = useState<string>(govServices[0]?.id || 'gov-srv-1');

  // Selected application for review drawer
  const [selectedAppId, setSelectedAppId] = useState<string | null>(govApplications[0]?.id || null);
  const [adminNote, setAdminNote] = useState('');
  const [scheduledDate, setScheduledDate] = useState('2026-09-03');
  const [scheduledTime, setScheduledTime] = useState('11:00 AM');

  // Questionnaire editor state
  const activeQuestionnaire = govQuestionnaires.find((q) => q.serviceId === selectedServiceId) || govQuestionnaires[0];
  const [editingQuestions, setEditingQuestions] = useState<GovQuestion[]>(activeQuestionnaire?.questions || []);
  const [qTitle, setQTitle] = useState(activeQuestionnaire?.title || 'Civil Application Form');
  const [qDesc, setQDesc] = useState(activeQuestionnaire?.description || 'Please complete all required fields.');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const selectedApp = govApplications.find((a) => a.id === selectedAppId);

  const handleAddQuestion = () => {
    const newQ: GovQuestion = {
      id: `q-${Date.now()}`,
      label: 'New Question Label',
      type: 'short_text',
      required: true,
      placeholder: 'Enter response...',
      helpText: 'Guidance note for applicant',
    };
    setEditingQuestions((prev) => [...prev, newQ]);
  };

  const handleRemoveQuestion = (id: string) => {
    setEditingQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleQuestionFieldChange = (id: string, field: keyof GovQuestion, value: any) => {
    setEditingQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const handlePublishQuestionnaire = () => {
    if (activeQuestionnaire) {
      updateGovQuestionnaire(activeQuestionnaire.id, {
        title: qTitle,
        description: qDesc,
        questions: editingQuestions,
        version: activeQuestionnaire.version + 1,
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }
  };

  const fieldTypes: Array<{ type: GovQuestionType; label: string }> = [
    { type: 'short_text', label: 'Short Text' },
    { type: 'long_text', label: 'Long Text / Bio' },
    { type: 'date', label: 'Date Picker' },
    { type: 'time', label: 'Time' },
    { type: 'number', label: 'Numeric' },
    { type: 'dropdown', label: 'Dropdown Select' },
    { type: 'yes_no', label: 'Yes / No Toggle' },
    { type: 'document_upload', label: 'Single Document PDF' },
    { type: 'image_upload', label: 'Photo Upload' },
    { type: 'multiple_documents', label: 'Multiple Files' },
  ];

  const pipelineStages: GovApplicationStatus[] = [
    'Submitted',
    'Under Review',
    'Pending',
    'Resubmitted',
    'Accepted',
    'Scheduled',
    'Checked In',
    'Served',
    'Completed',
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header Bar */}
      <div className="p-6 rounded-3xl bg-gradient-to-b from-[#1C1C1C] via-[#141414] to-[#0D0D0D] border border-[#2A2A2A] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-widest">
            SERVICE ADMINISTRATOR CONSOLE
          </span>
          <h1 className="text-2xl font-extrabold text-white font-display mt-0.5">
            Public Services & Questionnaire Operations
          </h1>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-2 p-1 rounded-xl bg-[#0A0A0A] border border-[#222222]">
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'applications'
                ? 'bg-[#D4AF37] text-black shadow-md'
                : 'text-[#888888] hover:text-white'
            }`}
          >
            Review Applications ({govApplications.length})
          </button>
          <button
            onClick={() => setActiveTab('questionnaires')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'questionnaires'
                ? 'bg-[#D4AF37] text-black shadow-md'
                : 'text-[#888888] hover:text-white'
            }`}
          >
            Questionnaire Builder
          </button>
        </div>
      </div>

      {/* 1. APPLICATIONS REVIEW PIPELINE */}
      {activeTab === 'applications' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Applications list (left 1/3) */}
          <div className="lg:col-span-1 p-5 rounded-3xl bg-[#141414] border border-[#2A2A2A] shadow-xl space-y-3">
            <h3 className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider">
              Incoming Citizen Applications ({govApplications.length})
            </h3>

            <div className="space-y-2">
              {govApplications.map((app) => (
                <div
                  key={app.id}
                  onClick={() => setSelectedAppId(app.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    selectedAppId === app.id
                      ? 'bg-[#1E1A11] border-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.15)]'
                      : 'bg-[#0E0E0E] border-[#222222] hover:border-[#333333]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold">{app.id}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                        app.status === 'Accepted' || app.status === 'Completed'
                          ? 'bg-[#22C55E]/15 text-[#22C55E]'
                          : app.status === 'Pending'
                          ? 'bg-[#EF4444]/15 text-[#EF4444]'
                          : 'bg-[#EAB308]/15 text-[#F5D76E]'
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white mt-1">{app.applicantName}</h4>
                  <p className="text-[11px] text-[#888888]">{app.serviceName}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Application Detail Reviewer & Status Controls (right 2/3) */}
          {selectedApp ? (
            <div className="lg:col-span-2 p-6 rounded-3xl bg-[#141414] border border-[#2A2A2A] shadow-xl space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#242424] pb-4">
                <div>
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold">
                    {selectedApp.serviceName} • {selectedApp.branchName}
                  </span>
                  <h2 className="text-xl font-bold text-white mt-0.5">{selectedApp.applicantName}</h2>
                  <p className="text-xs text-[#888888]">
                    Phone: {selectedApp.applicantPhone} • Email: {selectedApp.applicantEmail}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#888888] block">Current Pipeline Stage</span>
                  <span className="text-sm font-extrabold text-[#F5D76E]">{selectedApp.status}</span>
                </div>
              </div>

              {/* Status advancement pipeline buttons */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider block">
                  Advance Status Pipeline:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {pipelineStages.map((st) => (
                    <button
                      key={st}
                      onClick={() => updateGovApplicationStatus(selectedApp.id, st, adminNote || undefined)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedApp.status === st
                          ? 'bg-[#D4AF37] text-black shadow-[0_0_10px_rgba(212,175,55,0.3)]'
                          : 'bg-[#0E0E0E] text-[#888888] hover:text-white hover:bg-[#1A1A1A] border border-[#222222]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submitted Questionnaire Responses */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                  Citizen Submitted Answers
                </h4>
                <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-[#222222] divide-y divide-[#181818] space-y-2">
                  {Object.entries(selectedApp.formData).map(([k, v]) => (
                    <div key={k} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                      <span className="text-[#888888]">{k}:</span>
                      <span className="text-white font-semibold">{String(v)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Uploaded Documents */}
              {selectedApp.documents.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                    Attached Verification Documents
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedApp.documents.map((doc, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-[#0A0A0A] border border-[#222222] flex items-center justify-between text-xs">
                        <span className="text-white flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#D4AF37]" /> {doc.name}
                        </span>
                        <span className="text-[10px] text-[#22C55E] font-bold">✓ Verified</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Admin Note / Request More Info Action */}
              <div className="p-4 rounded-2xl bg-[#0E0E0E] border border-[#222222] space-y-3">
                <label className="text-xs font-bold text-[#CCCCCC] block">
                  Add Administrator Review Note / Reason for Pending:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Please upload parent ID copies or clear passport photo..."
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0A0A0A] border border-[#333333] focus:border-[#D4AF37] rounded-xl text-xs text-white focus:outline-none"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => updateGovApplicationStatus(selectedApp.id, 'Pending', adminNote || 'Missing documents requested')}
                    className="px-4 py-2 rounded-xl bg-[#EF4444]/20 hover:bg-[#EF4444]/30 text-[#EF4444] border border-[#EF4444]/40 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Flag as Pending & Request Documents
                  </button>
                  <button
                    onClick={() => updateGovApplicationStatus(selectedApp.id, 'Accepted', adminNote || 'Approved for biometrics')}
                    className="px-5 py-2 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-black font-extrabold text-xs transition-colors cursor-pointer"
                  >
                    Accept Application
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="lg:col-span-2 p-12 text-center rounded-3xl bg-[#141414] border border-[#242424]">
              <p className="text-xs text-[#888888]">Select an application on the left to review</p>
            </div>
          )}
        </div>
      )}

      {/* 2. DYNAMIC QUESTIONNAIRE BUILDER */}
      {activeTab === 'questionnaires' && (
        <div className="p-6 rounded-3xl bg-[#141414] border border-[#2A2A2A] shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#242424] pb-4">
            <div>
              <h2 className="text-lg font-bold text-white">Dynamic Questionnaire Schema Builder</h2>
              <p className="text-xs text-[#888888]">Design multi-step forms with conditional logic for citizen services</p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className="px-3.5 py-2 bg-[#0A0A0A] border border-[#333333] rounded-xl text-xs text-white"
              >
                {govServices.map((srv) => (
                  <option key={srv.id} value={srv.id}>
                    {srv.name}
                  </option>
                ))}
              </select>

              <button
                onClick={handlePublishQuestionnaire}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#F5D76E] via-[#D4AF37] to-[#B8860B] text-black font-extrabold text-xs shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publish Schema</span>
              </button>
            </div>
          </div>

          {saveSuccess && (
            <div className="p-3 rounded-xl bg-[#102A14] border border-[#22C55E]/40 text-xs text-[#22C55E] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Questionnaire published successfully! Live applications will use new schema version.</span>
            </div>
          )}

          {/* Form Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#CCCCCC]">Form Title</label>
              <input
                type="text"
                value={qTitle}
                onChange={(e) => setQTitle(e.target.value)}
                className="w-full px-3.5 py-2 bg-[#0A0A0A] border border-[#333333] focus:border-[#D4AF37] rounded-xl text-xs text-white"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#CCCCCC]">Form Guidance Description</label>
              <input
                type="text"
                value={qDesc}
                onChange={(e) => setQDesc(e.target.value)}
                className="w-full px-3.5 py-2 bg-[#0A0A0A] border border-[#333333] focus:border-[#D4AF37] rounded-xl text-xs text-white"
              />
            </div>
          </div>

          {/* Question List Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#AAAAAA] uppercase tracking-wider">
                Question Fields ({editingQuestions.length})
              </span>
              <button
                onClick={handleAddQuestion}
                className="px-3 py-1.5 rounded-xl bg-[#0E0E0E] hover:bg-[#1A1A1A] text-xs font-bold text-[#D4AF37] border border-[#D4AF37]/40 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Field
              </button>
            </div>

            {editingQuestions.map((q, idx) => (
              <div key={q.id} className="p-4 rounded-2xl bg-[#0A0A0A] border border-[#222222] space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#181818] text-[#D4AF37] text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={q.label}
                      onChange={(e) => handleQuestionFieldChange(q.id, 'label', e.target.value)}
                      className="px-3 py-1.5 bg-[#141414] border border-[#333333] focus:border-[#D4AF37] rounded-lg text-xs font-bold text-white"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={q.type}
                      onChange={(e) => handleQuestionFieldChange(q.id, 'type', e.target.value as any)}
                      className="px-3 py-1.5 bg-[#141414] border border-[#333333] rounded-lg text-xs text-[#F5D76E]"
                    >
                      {fieldTypes.map((ft) => (
                        <option key={ft.type} value={ft.type}>
                          {ft.label}
                        </option>
                      ))}
                    </select>

                    <label className="flex items-center gap-1 text-xs text-[#CCCCCC] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={q.required}
                        onChange={(e) => handleQuestionFieldChange(q.id, 'required', e.target.checked)}
                        className="accent-[#D4AF37]"
                      />
                      <span>Required</span>
                    </label>

                    <button
                      onClick={() => handleRemoveQuestion(q.id)}
                      className="p-1.5 rounded-lg bg-[#2A1010] text-[#EF4444] hover:bg-[#3D1414] transition-colors"
                      title="Delete Field"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <input
                    type="text"
                    placeholder="Placeholder text..."
                    value={q.placeholder || ''}
                    onChange={(e) => handleQuestionFieldChange(q.id, 'placeholder', e.target.value)}
                    className="px-3 py-1.5 bg-[#141414] border border-[#282828] rounded-lg text-white"
                  />
                  <input
                    type="text"
                    placeholder="Help / tooltip guidance text..."
                    value={q.helpText || ''}
                    onChange={(e) => handleQuestionFieldChange(q.id, 'helpText', e.target.value)}
                    className="px-3 py-1.5 bg-[#141414] border border-[#282828] rounded-lg text-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
