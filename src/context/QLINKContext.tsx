import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  UserProfile,
  UserRole,
  GovService,
  GovBranch,
  GovQuestionnaire,
  GovApplication,
  ApplicationStatus,
  BankOrganization,
  BankBranch,
  BankCounter,
  BankStaffWorkload,
  BankQueueTicket,
  BankAppointment,
  HealthcareFacility,
  HealthcareDoctor,
  HealthAppointment,
  PatientClinicalProfile,
  LabOrder,
  RadiologyOrder,
  MedicineItem,
  Prescription,
  PatientBill,
  WardBed,
  EmergencyCase,
  NurseTask,
  VitalSignRecord,
  PlatformOrganization,
  DashboardInstance,
  GlobalUserRecord,
  RecoverableItem,
  GlobalAuditRecord,
  SystemHealthMetric,
  SecurityAlert,
  NotificationItem,
  QlinkChatMessage,
} from '../types/qlink';

import {
  initialCurrentUser,
  initialPlatformUsers,
  initialGovServices,
  initialGovBranches,
  initialGovQuestionnaires,
  initialGovApplications,
  initialBanks,
  initialBankBranches,
  initialBankCounters,
  initialBankStaffWorkload,
  initialBankTickets,
  initialBankAppointments,
  initialHealthcareFacilities,
  initialHealthcareDoctors,
  initialHealthAppointments,
  initialPatientProfiles,
  initialLabOrders,
  initialRadiologyOrders,
  initialMedicines,
  initialPrescriptions,
  initialPatientBills,
  initialWardBeds,
  initialEmergencyCases,
  initialNurseTasks,
  initialVitalSigns,
  initialPlatformOrgs,
  initialPlatformDashboards,
  initialGlobalUsers,
  initialRecoverableItems,
  initialAuditRecords,
  initialSystemHealthMetrics,
  initialSecurityAlerts,
  initialNotifications,
  initialChatMessages,
} from '../data/mockDatabase';

interface QLINKContextType {
  // Auth & Role
  currentUser: UserProfile;
  allUsers: UserProfile[];
  setCurrentUser: (user: UserProfile) => void;
  switchRole: (role: UserRole) => void;
  loginWithGoogle: () => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;

  // Navigation State
  customerTab: string;
  setCustomerTab: (tab: string) => void;
  selectedGovService: GovService | null;
  setSelectedGovService: (service: GovService | null) => void;
  selectedGovBranch: GovBranch | null;
  setSelectedGovBranch: (branch: GovBranch | null) => void;
  selectedBank: BankOrganization | null;
  setSelectedBank: (bank: BankOrganization | null) => void;
  selectedBankBranch: BankBranch | null;
  setSelectedBankBranch: (branch: BankBranch | null) => void;
  selectedHealthFacility: HealthcareFacility | null;
  setSelectedHealthFacility: (facility: HealthcareFacility | null) => void;
  selectedDoctor: HealthcareDoctor | null;
  setSelectedDoctor: (doctor: HealthcareDoctor | null) => void;
  activeOrgTab: string;
  setActiveOrgTab: (tab: string) => void;
  activeQlinkCeoTab: string;
  setActiveQlinkCeoTab: (tab: string) => void;
  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;
  notificationDrawerOpen: boolean;
  setNotificationDrawerOpen: (open: boolean) => void;
  splashVisible: boolean;
  setSplashVisible: (visible: boolean) => void;

  // Government State & Actions
  govServices: GovService[];
  govBranches: GovBranch[];
  govQuestionnaires: GovQuestionnaire[];
  govApplications: GovApplication[];
  submitGovApplication: (serviceId: string, branchId: string, formData: Record<string, any>, documents: any[]) => string;
  updateApplicationStatus: (appId: string, newStatus: ApplicationStatus, reason?: string, note?: string, scheduledDate?: string, scheduledTime?: string) => void;
  resubmitGovApplication: (appId: string, updatedFormData: Record<string, any>, newDocs?: any[]) => void;
  saveQuestionnaire: (questionnaire: GovQuestionnaire) => void;
  createGovService: (service: Partial<GovService>) => void;
  toggleGovServiceStatus: (serviceId: string, newStatus: 'Open' | 'Paused' | 'Closed') => void;
  createGovBranch: (branch: Partial<GovBranch>) => void;
  bulkUpdateGovApplications: (appIds: string[], newStatus: ApplicationStatus, reason?: string) => void;

  // Banking State & Actions
  banks: BankOrganization[];
  bankBranches: BankBranch[];
  bankCounters: BankCounter[];
  bankStaffWorkload: BankStaffWorkload[];
  bankTickets: BankQueueTicket[];
  bankAppointments: BankAppointment[];
  joinBankQueue: (bankId: string, branchId: string, serviceName: string) => BankQueueTicket;
  leaveBankQueue: (ticketId: string) => void;
  callNextBankCustomer: (counterId: string) => void;
  completeBankCustomer: (counterId: string, outcome: 'Served' | 'Not Served' | 'No-Show') => void;
  updateCounterStatus: (counterId: string, status: 'Busy' | 'Available' | 'Offline') => void;
  bookBankAppointment: (bankId: string, branchId: string, serviceName: string, date: string, time: string, notes?: string) => string;
  updateBankAppointmentStatus: (aptId: string, status: BankAppointment['status']) => void;

  // Healthcare State & Actions
  healthcareFacilities: HealthcareFacility[];
  healthcareDoctors: HealthcareDoctor[];
  healthAppointments: HealthAppointment[];
  patientProfiles: Record<string, PatientClinicalProfile>;
  labOrders: LabOrder[];
  radiologyOrders: RadiologyOrder[];
  medicines: MedicineItem[];
  prescriptions: Prescription[];
  patientBills: PatientBill[];
  wardBeds: WardBed[];
  emergencyCases: EmergencyCase[];
  nurseTasks: NurseTask[];
  vitalSigns: VitalSignRecord[];
  bookHealthAppointment: (facilityId: string, doctorId: string, date: string, time: string, reason: string, priority?: 'Normal' | 'Urgent' | 'Emergency') => string;
  updateHealthAppointmentStatus: (aptId: string, status: HealthAppointment['status']) => void;
  orderLabTest: (patientId: string, patientName: string, testName: string, priority: LabOrder['priority'], cost: number) => void;
  updateLabOrderStatus: (orderId: string, status: LabOrder['status'], result?: string, notes?: string) => void;
  orderRadiology: (patientId: string, patientName: string, modality: RadiologyOrder['modality'], examination: string, priority: RadiologyOrder['priority'], cost: number) => void;
  updateRadiologyStatus: (orderId: string, status: RadiologyOrder['status'], findings?: string, impression?: string) => void;
  createPrescription: (patientId: string, patientName: string, items: Prescription['items']) => void;
  dispensePrescription: (rxId: string) => void;
  addMedicine: (medicine: Omit<MedicineItem, 'id'>) => void;
  updateMedicineStock: (medicineId: string, newQuantity: number) => void;
  applyBillDiscount: (billId: string, discountPercentage: number, discountReason: string) => void;
  payBill: (billId: string, method: PatientBill['paymentMethod']) => void;
  admitPatientToBed: (bedId: string, patientId: string, patientName: string, reason: string, doctorName: string) => void;
  transferOrDischargeBed: (bedId: string, action: 'Clean' | 'Discharge' | 'Make Available') => void;
  reportEmergency: (caseData: Omit<EmergencyCase, 'id' | 'status' | 'timeline' | 'reportedAt' | 'origin'>) => string;
  updateEmergencyStatus: (caseId: string, status: EmergencyCase['status'], note?: string) => void;
  addNurseTask: (task: Omit<NurseTask, 'id' | 'status'>) => void;
  updateNurseTaskStatus: (taskId: string, status: NurseTask['status']) => void;
  recordPatientVitals: (vitals: Omit<VitalSignRecord, 'id' | 'recordedAt'>) => void;
  registerWalkInPatient: (name: string, nationalId: string, phone: string, age: number, gender: string, serviceName: string) => void;

  // QLINK CEO Platform Actions
  platformOrgs: PlatformOrganization[];
  platformDashboards: DashboardInstance[];
  globalUsers: GlobalUserRecord[];
  recoverableItems: RecoverableItem[];
  auditRecords: GlobalAuditRecord[];
  systemHealthMetrics: SystemHealthMetric[];
  securityAlerts: SecurityAlert[];
  notifications: NotificationItem[];
  chatMessages: QlinkChatMessage[];
  activeFeatures: Record<string, boolean>;
  createPlatformOrganization: (org: Partial<PlatformOrganization>) => void;
  updateOrgStatus: (orgId: string, status: PlatformOrganization['status']) => void;
  createOrganizationCeo: (orgId: string, name: string, email: string, phone: string) => void;
  createCustomDashboard: (dashboard: Partial<DashboardInstance>) => void;
  updateUserStatus: (userId: string, status: GlobalUserRecord['status']) => void;
  resetUserAccess: (userId: string) => void;
  restoreRecoverableItem: (recId: string) => void;
  softDeleteItem: (entityType: RecoverableItem['entityType'], originalId: string, title: string, orgName: string, dashName: string, rawData: any) => void;
  resolveSecurityAlert: (alertId: string) => void;
  togglePlatformFeature: (featureKey: string) => void;
  sendBroadcastChat: (message: string) => void;
  addNotification: (notification: Omit<NotificationItem, 'id' | 'time' | 'read'>) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  addAuditLog: (action: { what: string; where: string; orgName: string; dashName: string; recordId: string; details: string }) => void;
}

const QLINKContext = createContext<QLINKContextType | undefined>(undefined);

export const QLINKProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Splash & User State
  const [splashVisible, setSplashVisible] = useState(true);
  const [currentUser, setCurrentUser] = useState<UserProfile>(initialCurrentUser);
  const [allUsers] = useState<UserProfile[]>(initialPlatformUsers);

  // Tab & Navigation State
  const [customerTab, setCustomerTab] = useState('home');
  const [selectedGovService, setSelectedGovService] = useState<GovService | null>(null);
  const [selectedGovBranch, setSelectedGovBranch] = useState<GovBranch | null>(null);
  const [selectedBank, setSelectedBank] = useState<BankOrganization | null>(null);
  const [selectedBankBranch, setSelectedBankBranch] = useState<BankBranch | null>(null);
  const [selectedHealthFacility, setSelectedHealthFacility] = useState<HealthcareFacility | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<HealthcareDoctor | null>(null);
  const [activeOrgTab, setActiveOrgTab] = useState('overview');
  const [activeQlinkCeoTab, setActiveQlinkCeoTab] = useState('overview');
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);

  // Government State
  const [govServices, setGovServices] = useState<GovService[]>(initialGovServices);
  const [govBranches, setGovBranches] = useState<GovBranch[]>(initialGovBranches);
  const [govQuestionnaires, setGovQuestionnaires] = useState<GovQuestionnaire[]>(initialGovQuestionnaires);
  const [govApplications, setGovApplications] = useState<GovApplication[]>(initialGovApplications);

  // Banking State
  const [banks, setBanks] = useState<BankOrganization[]>(initialBanks);
  const [bankBranches, setBankBranches] = useState<BankBranch[]>(initialBankBranches);
  const [bankCounters, setBankCounters] = useState<BankCounter[]>(initialBankCounters);
  const [bankStaffWorkload, setBankStaffWorkload] = useState<BankStaffWorkload[]>(initialBankStaffWorkload);
  const [bankTickets, setBankTickets] = useState<BankQueueTicket[]>(initialBankTickets);
  const [bankAppointments, setBankAppointments] = useState<BankAppointment[]>(initialBankAppointments);

  // Healthcare State
  const [healthcareFacilities, setHealthcareFacilities] = useState<HealthcareFacility[]>(initialHealthcareFacilities);
  const [healthcareDoctors, setHealthcareDoctors] = useState<HealthcareDoctor[]>(initialHealthcareDoctors);
  const [healthAppointments, setHealthAppointments] = useState<HealthAppointment[]>(initialHealthAppointments);
  const [patientProfiles, setPatientProfiles] = useState<Record<string, PatientClinicalProfile>>(initialPatientProfiles);
  const [labOrders, setLabOrders] = useState<LabOrder[]>(initialLabOrders);
  const [radiologyOrders, setRadiologyOrders] = useState<RadiologyOrder[]>(initialRadiologyOrders);
  const [medicines, setMedicines] = useState<MedicineItem[]>(initialMedicines);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(initialPrescriptions);
  const [patientBills, setPatientBills] = useState<PatientBill[]>(initialPatientBills);
  const [wardBeds, setWardBeds] = useState<WardBed[]>(initialWardBeds);
  const [emergencyCases, setEmergencyCases] = useState<EmergencyCase[]>(initialEmergencyCases);
  const [nurseTasks, setNurseTasks] = useState<NurseTask[]>(initialNurseTasks);
  const [vitalSigns, setVitalSigns] = useState<VitalSignRecord[]>(initialVitalSigns);

  // QLINK CEO Platform State
  const [platformOrgs, setPlatformOrgs] = useState<PlatformOrganization[]>(initialPlatformOrgs);
  const [platformDashboards, setPlatformDashboards] = useState<DashboardInstance[]>(initialPlatformDashboards);
  const [globalUsers, setGlobalUsers] = useState<GlobalUserRecord[]>(initialGlobalUsers);
  const [recoverableItems, setRecoverableItems] = useState<RecoverableItem[]>(initialRecoverableItems);
  const [auditRecords, setAuditRecords] = useState<GlobalAuditRecord[]>(initialAuditRecords);
  const [systemHealthMetrics] = useState<SystemHealthMetric[]>(initialSystemHealthMetrics);
  const [securityAlerts, setSecurityAlerts] = useState<SecurityAlert[]>(initialSecurityAlerts);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [chatMessages, setChatMessages] = useState<QlinkChatMessage[]>(initialChatMessages);
  const [activeFeatures, setActiveFeatures] = useState<Record<string, boolean>>({
    'gov_questionnaires': true,
    'gov_queues': true,
    'bank_branch_discovery': true,
    'bank_live_counters': true,
    'health_emergency_command': true,
    'health_live_billing': true,
    'health_wards': true,
    'whatsapp_gateway': true,
  });

  // Auto-hide splash screen after 2.2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashVisible(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  // Helper to add audit log
  const addAuditLog = (action: { what: string; where: string; orgName: string; dashName: string; recordId: string; details: string }) => {
    const newLog: GlobalAuditRecord = {
      id: `aud_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      who: currentUser.name,
      role: currentUser.role,
      what: action.what,
      when: new Date().toLocaleString(),
      where: action.where,
      organizationName: action.orgName,
      dashboardName: action.dashName,
      recordId: action.recordId,
      details: action.details,
    };
    setAuditRecords((prev) => [newLog, ...prev]);
  };

  // Helper to add notification
  const addNotification = (notif: Omit<NotificationItem, 'id' | 'time' | 'read'>) => {
    const newNotif: NotificationItem = {
      ...notif,
      id: `notif_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      time: 'Just now',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Switch role seamlessly
  const switchRole = (role: UserRole) => {
    const foundUser = allUsers.find((u) => u.role === role);
    if (foundUser) {
      setCurrentUser(foundUser);
    } else {
      setCurrentUser({
        ...currentUser,
        role,
        name: `Operator (${role.toUpperCase()})`,
        permissions: ['role_default_access'],
      });
    }
    setActiveOrgTab('overview');
  };

  // Google OAuth simulator
  const loginWithGoogle = () => {
    setCurrentUser(initialCurrentUser);
    setSplashVisible(false);
    try {
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    } catch {
      // Ignore if confetti fails
    }
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setCurrentUser((prev) => ({ ...prev, ...updates }));
    addNotification({
      organizationName: 'QLINK Security',
      category: 'Security',
      title: 'Profile Updated',
      message: 'Your personal information and preferences were updated successfully.',
    });
  };

  // -------------------------------------------------------------
  // GOVERNMENT ACTIONS
  // -------------------------------------------------------------
  const submitGovApplication = (serviceId: string, branchId: string, formData: Record<string, any>, docs: any[]) => {
    const service = govServices.find((s) => s.id === serviceId);
    const branch = govBranches.find((b) => b.id === branchId);
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const appId = `QL-${service?.category?.substring(0, 2).toUpperCase() || 'GOV'}-2026-${randomSuffix}`;

    const newApp: GovApplication = {
      id: appId,
      serviceId,
      serviceName: service?.name || 'Government Service',
      branchId,
      branchName: branch?.name || 'County Centre',
      customerId: currentUser.id,
      customerName: currentUser.name,
      customerEmail: currentUser.email,
      customerPhone: currentUser.phone,
      status: 'Under Review',
      formData,
      documents: docs.map((d, index) => ({
        id: `doc_${Date.now()}_${index}`,
        name: d.name || `Document_${index + 1}.pdf`,
        fileUrl: d.url || '#',
        type: d.type || 'application/pdf',
        size: d.size || '1.2 MB',
        verified: false,
      })),
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      timeline: [
        {
          status: 'Submitted' as any,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          author: currentUser.name,
          note: 'Application submitted via QLINK Citizen App',
        },
        {
          status: 'Under Review',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          author: 'System Intake',
          note: 'Received by service administrator queue',
        },
      ],
    };

    setGovApplications((prev) => [newApp, ...prev]);

    // Update service & branch counts
    setGovServices((prev) =>
      prev.map((s) => (s.id === serviceId ? { ...s, totalApplications: s.totalApplications + 1, pendingCount: s.pendingCount + 1 } : s))
    );
    setGovBranches((prev) =>
      prev.map((b) => (b.id === branchId ? { ...b, applicationsCount: b.applicationsCount + 1, pendingCount: b.pendingCount + 1 } : b))
    );

    addAuditLog({
      what: 'Citizen Submitted Application',
      where: 'Customer Government App',
      orgName: 'Mandera County Government',
      dashName: 'National ID & Civil Registry',
      recordId: appId,
      details: `Application ${appId} submitted for ${service?.name}`,
    });

    addNotification({
      organizationName: 'Mandera County Government',
      category: 'Government',
      title: 'Application Submitted',
      message: `Your application (${appId}) for ${service?.name} has been received and is under review.`,
      relatedId: appId,
    });

    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 } });
    } catch {
      // Ignore
    }

    return appId;
  };

  const updateApplicationStatus = (
    appId: string,
    newStatus: ApplicationStatus,
    reason?: string,
    note?: string,
    scheduledDate?: string,
    scheduledTime?: string
  ) => {
    setGovApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          const updatedTimeline = [
            ...app.timeline,
            {
              status: newStatus,
              time: new Date().toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
              author: currentUser.name,
              note: note || reason || `Status updated to ${newStatus}`,
            },
          ];
          return {
            ...app,
            status: newStatus,
            decisionReason: reason || app.decisionReason,
            scheduledDate: scheduledDate || app.scheduledDate,
            scheduledTime: scheduledTime || app.scheduledTime,
            updatedAt: new Date().toISOString(),
            timeline: updatedTimeline,
          };
        }
        return app;
      })
    );

    addAuditLog({
      what: `Updated Application Status to ${newStatus}`,
      where: 'Government Admin Panel',
      orgName: 'Mandera County Government',
      dashName: 'Application Management',
      recordId: appId,
      details: `Status set to ${newStatus}. Reason: ${reason || 'Processed'}`,
    });

    addNotification({
      organizationName: 'Mandera County Government',
      category: 'Government',
      title: `Application Status: ${newStatus}`,
      message: `Application ${appId} is now ${newStatus}. ${reason ? `Reason: ${reason}` : ''}`,
      relatedId: appId,
    });
  };

  const resubmitGovApplication = (appId: string, updatedFormData: Record<string, any>, newDocs?: any[]) => {
    setGovApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          const updatedDocs = newDocs && newDocs.length > 0 ? newDocs : app.documents;
          return {
            ...app,
            formData: { ...app.formData, ...updatedFormData },
            documents: updatedDocs,
            status: 'Resubmitted',
            decisionReason: undefined,
            updatedAt: new Date().toISOString(),
            timeline: [
              ...app.timeline,
              {
                status: 'Resubmitted',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                author: currentUser.name,
                note: 'Applicant resubmitted updated documents and questionnaire answers.',
              },
            ],
          };
        }
        return app;
      })
    );

    addNotification({
      organizationName: 'Mandera County Government',
      category: 'Government',
      title: 'Application Resubmitted',
      message: `Your corrected application (${appId}) has been resubmitted for admin review.`,
      relatedId: appId,
    });
  };

  const saveQuestionnaire = (quest: GovQuestionnaire) => {
    setGovQuestionnaires((prev) => {
      const exists = prev.some((q) => q.id === quest.id);
      if (exists) {
        return prev.map((q) => (q.id === quest.id ? { ...quest, updatedAt: new Date().toISOString() } : q));
      }
      return [quest, ...prev];
    });

    addAuditLog({
      what: `Saved Questionnaire: ${quest.title}`,
      where: 'Government Questionnaire Builder',
      orgName: 'Mandera County Government',
      dashName: 'Questionnaires',
      recordId: quest.id,
      details: `Version ${quest.version}, ${quest.questions.length} questions, Status: ${quest.status}`,
    });
  };

  const createGovService = (service: Partial<GovService>) => {
    const id = `gov_srv_${Date.now()}`;
    const newService: GovService = {
      id,
      name: service.name || 'New Government Service',
      organizationId: currentUser.organizationId || 'org_gov_mandera',
      organizationName: currentUser.organizationName || 'Mandera County Government',
      category: service.category || 'General Administration',
      description: service.description || '',
      requirements: service.requirements || [],
      requiredDocuments: service.requiredDocuments || [],
      operatingHours: service.operatingHours || 'Monday - Friday: 08:00 AM - 05:00 PM',
      status: service.status || 'Open',
      branchesCount: 1,
      totalApplications: 0,
      pendingCount: 0,
      acceptedCount: 0,
      declinedCount: 0,
      servedCount: 0,
      activeQueueCount: 0,
      avgWaitMinutes: 15,
    };
    setGovServices((prev) => [...prev, newService]);
    addAuditLog({
      what: `Created New Government Service: ${newService.name}`,
      where: 'Government CEO Dashboard',
      orgName: newService.organizationName,
      dashName: 'Service Configuration',
      recordId: id,
      details: `Added service with status ${newService.status}`,
    });
  };

  const toggleGovServiceStatus = (serviceId: string, newStatus: 'Open' | 'Paused' | 'Closed') => {
    setGovServices((prev) => prev.map((s) => (s.id === serviceId ? { ...s, status: newStatus } : s)));
    addAuditLog({
      what: `Changed Service Status to ${newStatus}`,
      where: 'Government CEO Dashboard',
      orgName: 'Mandera County Government',
      dashName: 'Service Management',
      recordId: serviceId,
      details: `Service status updated to ${newStatus}`,
    });
  };

  const createGovBranch = (branch: Partial<GovBranch>) => {
    const id = `gov_br_${Date.now()}`;
    const newBranch: GovBranch = {
      id,
      serviceId: branch.serviceId || govServices[0]?.id || 'gov_srv_id',
      serviceName: branch.serviceName || govServices[0]?.name || 'National ID',
      name: branch.name || 'New Sub-County Branch',
      county: branch.county || 'Mandera County',
      address: branch.address || 'Mandera',
      status: 'Open',
      applicationsCount: 0,
      acceptedCount: 0,
      pendingCount: 0,
      declinedCount: 0,
      servedCount: 0,
      currentQueue: 0,
      avgWaitMinutes: 10,
      capacityUtilization: 30,
    };
    setGovBranches((prev) => [...prev, newBranch]);
  };

  const bulkUpdateGovApplications = (appIds: string[], newStatus: ApplicationStatus, reason?: string) => {
    setGovApplications((prev) =>
      prev.map((app) => {
        if (appIds.includes(app.id)) {
          return {
            ...app,
            status: newStatus,
            decisionReason: reason || app.decisionReason,
            updatedAt: new Date().toISOString(),
            timeline: [
              ...app.timeline,
              {
                status: newStatus,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                author: currentUser.name,
                note: `Bulk updated to ${newStatus}. ${reason || ''}`,
              },
            ],
          };
        }
        return app;
      })
    );
    addAuditLog({
      what: `Bulk Updated ${appIds.length} Applications`,
      where: 'Government Admin Panel',
      orgName: 'Mandera County Government',
      dashName: 'Bulk Operations',
      recordId: appIds.join(', '),
      details: `Bulk status changed to ${newStatus}`,
    });
  };

  // -------------------------------------------------------------
  // BANKING ACTIONS
  // -------------------------------------------------------------
  const joinBankQueue = (bankId: string, branchId: string, serviceName: string) => {
    const bank = banks.find((b) => b.id === bankId);
    const branch = bankBranches.find((b) => b.id === branchId);
    const ticketLetter = serviceName.includes('Teller') ? 'T' : serviceName.includes('Forex') ? 'F' : 'A';
    const randomNum = Math.floor(10 + Math.random() * 89);
    const ticketNumber = `${ticketLetter}-0${randomNum}`;

    const newTicket: BankQueueTicket = {
      id: `tkt_${Date.now()}`,
      ticketNumber,
      bankId,
      bankName: bank?.name || 'KCB Bank Kenya',
      branchId,
      branchName: branch?.name || 'Mandera Main Branch',
      serviceName,
      customerId: currentUser.id,
      customerName: currentUser.name,
      customerPhone: currentUser.phone,
      peopleAhead: branch ? branch.currentQueueCount : 3,
      estimatedWaitMinutes: branch ? Math.max(5, branch.avgWaitMinutes) : 12,
      currentServingTicket: `${ticketLetter}-0${Math.max(1, randomNum - 2)}`,
      status: 'Waiting',
      issuedAt: new Date().toISOString(),
    };

    setBankTickets((prev) => [newTicket, ...prev]);

    // Increase queue count on branch
    setBankBranches((prev) =>
      prev.map((b) => (b.id === branchId ? { ...b, currentQueueCount: b.currentQueueCount + 1, walkInsCount: b.walkInsCount + 1 } : b))
    );

    addAuditLog({
      what: `Customer Joined Bank Queue (${ticketNumber})`,
      where: 'Customer Banking App',
      orgName: bank?.name || 'KCB Bank',
      dashName: 'Live Queue Ticket',
      recordId: newTicket.id,
      details: `Generated ticket ${ticketNumber} for ${serviceName}`,
    });

    addNotification({
      organizationName: bank?.name || 'KCB Bank Kenya',
      category: 'Queues',
      title: `Queue Ticket Issued: ${ticketNumber}`,
      message: `Your ticket for ${serviceName} at ${branch?.name} is ${ticketNumber}. Estimated wait: ${newTicket.estimatedWaitMinutes} mins.`,
      relatedId: newTicket.id,
    });

    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch {
      // Ignore
    }

    return newTicket;
  };

  const leaveBankQueue = (ticketId: string) => {
    setBankTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: 'Cancelled' as any } : t))
    );
    addNotification({
      organizationName: 'KCB Bank Kenya',
      category: 'Queues',
      title: 'Left Queue',
      message: 'You have left the queue successfully.',
      relatedId: ticketId,
    });
  };

  const callNextBankCustomer = (counterId: string) => {
    const counter = bankCounters.find((c) => c.id === counterId);
    const waitingTicket = bankTickets.find((t) => t.status === 'Waiting');
    const nextTicketNum = waitingTicket ? waitingTicket.ticketNumber : `C-0${Math.floor(10 + Math.random() * 80)}`;

    setBankCounters((prev) =>
      prev.map((c) => (c.id === counterId ? { ...c, status: 'Busy', currentCustomerTicket: nextTicketNum } : c))
    );

    if (waitingTicket) {
      setBankTickets((prev) =>
        prev.map((t) => (t.id === waitingTicket.id ? { ...t, status: 'Serving', counterNumber: counter?.counterNumber } : t))
      );
    }

    addNotification({
      organizationName: 'KCB Bank Kenya',
      category: 'Queues',
      title: `Counter ${counter?.counterNumber} Calling Ticket ${nextTicketNum}`,
      message: `Ticket ${nextTicketNum} please proceed to Counter ${counter?.counterNumber} (${counter?.serviceName}).`,
    });
  };

  const completeBankCustomer = (counterId: string, outcome: 'Served' | 'Not Served' | 'No-Show') => {
    const counter = bankCounters.find((c) => c.id === counterId);
    const currentTicket = counter?.currentCustomerTicket;

    setBankCounters((prev) =>
      prev.map((c) => (c.id === counterId ? { ...c, status: 'Available', currentCustomerTicket: undefined } : c))
    );

    if (currentTicket) {
      setBankTickets((prev) =>
        prev.map((t) => (t.ticketNumber === currentTicket ? { ...t, status: outcome === 'Served' ? 'Completed' : 'No-Show' } : t))
      );
    }

    // Update branch served stats
    setBankBranches((prev) =>
      prev.map((b) => ({
        ...b,
        currentQueueCount: Math.max(0, b.currentQueueCount - 1),
        servedCount: outcome === 'Served' ? b.servedCount + 1 : b.servedCount,
      }))
    );
  };

  const updateCounterStatus = (counterId: string, status: 'Busy' | 'Available' | 'Offline') => {
    setBankCounters((prev) => prev.map((c) => (c.id === counterId ? { ...c, status } : c)));
  };

  const bookBankAppointment = (bankId: string, branchId: string, serviceName: string, date: string, time: string, notes?: string) => {
    const bank = banks.find((b) => b.id === bankId);
    const branch = bankBranches.find((b) => b.id === branchId);
    const aptId = `BK-APT-${Math.floor(1000 + Math.random() * 9000)}`;

    const newApt: BankAppointment = {
      id: aptId,
      bankId,
      bankName: bank?.name || 'KCB Bank Kenya',
      branchId,
      branchName: branch?.name || 'Mandera Main Branch',
      serviceName,
      customerId: currentUser.id,
      customerName: currentUser.name,
      customerPhone: currentUser.phone,
      date,
      time,
      notes,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    setBankAppointments((prev) => [newApt, ...prev]);

    addNotification({
      organizationName: bank?.name || 'KCB Bank',
      category: 'Appointments',
      title: 'Bank Appointment Confirmed',
      message: `Your appointment for ${serviceName} is scheduled for ${date} at ${time}.`,
      relatedId: aptId,
    });

    try {
      confetti({ particleCount: 75, spread: 70, origin: { y: 0.6 } });
    } catch {
      // Ignore
    }

    return aptId;
  };

  const updateBankAppointmentStatus = (aptId: string, status: BankAppointment['status']) => {
    setBankAppointments((prev) => prev.map((a) => (a.id === aptId ? { ...a, status } : a)));
  };

  // -------------------------------------------------------------
  // HEALTHCARE ACTIONS
  // -------------------------------------------------------------
  const bookHealthAppointment = (
    facilityId: string,
    doctorId: string,
    date: string,
    time: string,
    reason: string,
    priority: 'Normal' | 'Urgent' | 'Emergency' = 'Normal'
  ) => {
    const facility = healthcareFacilities.find((f) => f.id === facilityId);
    const doctor = healthcareDoctors.find((d) => d.id === doctorId);
    const aptId = `MED-APT-${Math.floor(1000 + Math.random() * 9000)}`;
    const ticketNumber = `MED-0${Math.floor(10 + Math.random() * 89)}`;

    const newApt: HealthAppointment = {
      id: aptId,
      facilityId,
      facilityName: facility?.name || 'Aga Khan Hospital Mandera',
      departmentName: doctor?.departmentName || 'General Medicine',
      doctorId,
      doctorName: doctor?.name || 'Dr. Amina Mohamed',
      doctorSpecialty: doctor?.specialty || 'General Practitioner',
      patientId: currentUser.id,
      patientName: currentUser.name,
      patientPhone: currentUser.phone,
      patientAge: 22,
      patientGender: 'Male',
      date,
      time,
      reason,
      status: 'Requested',
      queueTicketNumber: ticketNumber,
      triagePriority: priority,
      createdAt: new Date().toISOString(),
    };

    setHealthAppointments((prev) => [newApt, ...prev]);

    addAuditLog({
      what: `Patient Booked Health Appointment`,
      where: 'Customer Healthcare App',
      orgName: facility?.name || 'Healthcare Facility',
      dashName: 'Appointments',
      recordId: aptId,
      details: `Booked appointment with ${doctor?.name} on ${date} at ${time}`,
    });

    addNotification({
      organizationName: facility?.name || 'Aga Khan Hospital',
      category: 'Healthcare',
      title: 'Healthcare Appointment Requested',
      message: `Appointment ${aptId} with ${doctor?.name} requested for ${date} at ${time}.`,
      relatedId: aptId,
    });

    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch {
      // Ignore
    }

    return aptId;
  };

  const updateHealthAppointmentStatus = (aptId: string, status: HealthAppointment['status']) => {
    setHealthAppointments((prev) => prev.map((a) => (a.id === aptId ? { ...a, status } : a)));
    addNotification({
      organizationName: 'Aga Khan Hospital Mandera',
      category: 'Healthcare',
      title: `Appointment Status: ${status}`,
      message: `Appointment ${aptId} is now ${status}.`,
      relatedId: aptId,
    });
  };

  const orderLabTest = (patientId: string, patientName: string, testName: string, priority: LabOrder['priority'], cost: number) => {
    const orderId = `LAB-${Math.floor(100 + Math.random() * 900)}`;
    const newOrder: LabOrder = {
      id: orderId,
      patientId,
      patientName,
      doctorId: currentUser.id,
      doctorName: currentUser.name,
      departmentName: 'Diagnostic Laboratory',
      testName,
      priority,
      status: 'Ordered',
      sampleType: 'Whole Blood / Serum',
      cost,
      orderedAt: new Date().toISOString(),
    };

    setLabOrders((prev) => [newOrder, ...prev]);

    // Automatically charge to patient bill
    setPatientBills((prev) =>
      prev.map((bill) => {
        if (bill.patientId === patientId) {
          const newItem = {
            id: `item_lab_${Date.now()}`,
            service: `Lab: ${testName}`,
            category: 'Laboratory' as const,
            quantity: 1,
            price: cost,
            coverage: 0,
            discount: 0,
            patientCost: cost,
          };
          const newSubtotal = bill.subtotal + cost;
          const newPayable = newSubtotal - bill.discountAmount;
          return {
            ...bill,
            items: [...bill.items, newItem],
            subtotal: newSubtotal,
            totalPayable: newPayable,
          };
        }
        return bill;
      })
    );

    addAuditLog({
      what: `Doctor Ordered Lab Test (${testName})`,
      where: 'Doctor Clinical Workspace',
      orgName: 'Aga Khan Hospital Mandera',
      dashName: 'Laboratory Orders',
      recordId: orderId,
      details: `Priority: ${priority}, Cost: $${cost}`,
    });

    addNotification({
      organizationName: 'Aga Khan Hospital Mandera',
      category: 'Healthcare',
      title: `Lab Test Ordered: ${testName}`,
      message: `Dr. ${currentUser.name} ordered ${testName}. Sample intake scheduled.`,
      relatedId: orderId,
    });
  };

  const updateLabOrderStatus = (orderId: string, status: LabOrder['status'], result?: string, notes?: string) => {
    setLabOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status,
              result: result || o.result,
              technicianNotes: notes || o.technicianNotes,
              completedAt: status === 'Verified' ? new Date().toISOString() : o.completedAt,
            }
          : o
      )
    );

    addNotification({
      organizationName: 'Aga Khan Diagnostic Lab',
      category: 'Healthcare',
      title: `Lab Result: ${status}`,
      message: `Test order ${orderId} is now ${status}. ${result ? `Result: ${result}` : ''}`,
      relatedId: orderId,
    });
  };

  const orderRadiology = (
    patientId: string,
    patientName: string,
    modality: RadiologyOrder['modality'],
    examination: string,
    priority: RadiologyOrder['priority'],
    cost: number
  ) => {
    const orderId = `RAD-${Math.floor(100 + Math.random() * 900)}`;
    const newOrder: RadiologyOrder = {
      id: orderId,
      patientId,
      patientName,
      doctorId: currentUser.id,
      doctorName: currentUser.name,
      departmentName: 'Radiology & Imaging',
      modality,
      examination,
      priority,
      status: 'Ordered',
      cost,
      orderedAt: new Date().toISOString(),
    };

    setRadiologyOrders((prev) => [newOrder, ...prev]);

    // Automatically charge to patient bill
    setPatientBills((prev) =>
      prev.map((bill) => {
        if (bill.patientId === patientId) {
          const newItem = {
            id: `item_rad_${Date.now()}`,
            service: `Imaging: ${modality} - ${examination}`,
            category: 'Radiology' as const,
            quantity: 1,
            price: cost,
            coverage: 0,
            discount: 0,
            patientCost: cost,
          };
          const newSubtotal = bill.subtotal + cost;
          const newPayable = newSubtotal - bill.discountAmount;
          return {
            ...bill,
            items: [...bill.items, newItem],
            subtotal: newSubtotal,
            totalPayable: newPayable,
          };
        }
        return bill;
      })
    );

    addNotification({
      organizationName: 'Aga Khan Radiology',
      category: 'Healthcare',
      title: `Radiology Order: ${examination}`,
      message: `${modality} examination (${examination}) ordered for ${patientName}.`,
      relatedId: orderId,
    });
  };

  const updateRadiologyStatus = (orderId: string, status: RadiologyOrder['status'], findings?: string, impression?: string) => {
    setRadiologyOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status,
              findings: findings || o.findings,
              impression: impression || o.impression,
              completedAt: status === 'Report Verified' ? new Date().toISOString() : o.completedAt,
            }
          : o
      )
    );

    addNotification({
      organizationName: 'Aga Khan Radiology',
      category: 'Healthcare',
      title: `Radiology Report Ready (${orderId})`,
      message: `Imaging findings verified. Impression: ${impression || 'Normal'}`,
      relatedId: orderId,
    });
  };

  const createPrescription = (patientId: string, patientName: string, items: Prescription['items']) => {
    const rxId = `RX-${Math.floor(100 + Math.random() * 900)}`;
    const totalPrice = items.reduce((acc, curr) => acc + curr.price * (curr.quantity > 0 ? 1 : 1), 0);

    const newRx: Prescription = {
      id: rxId,
      patientId,
      patientName,
      doctorId: currentUser.id,
      doctorName: currentUser.name,
      items,
      status: 'Prescribed',
      totalPrice,
      prescribedAt: new Date().toISOString(),
    };

    setPrescriptions((prev) => [newRx, ...prev]);

    // Automatically charge to patient bill
    setPatientBills((prev) =>
      prev.map((bill) => {
        if (bill.patientId === patientId) {
          const newItem = {
            id: `item_rx_${Date.now()}`,
            service: `Prescription (${items.map((i) => i.medicineName).join(', ')})`,
            category: 'Pharmacy' as const,
            quantity: 1,
            price: totalPrice,
            coverage: 0,
            discount: 0,
            patientCost: totalPrice,
          };
          const newSubtotal = bill.subtotal + totalPrice;
          const newPayable = newSubtotal - bill.discountAmount;
          return {
            ...bill,
            items: [...bill.items, newItem],
            subtotal: newSubtotal,
            totalPayable: newPayable,
          };
        }
        return bill;
      })
    );

    addAuditLog({
      what: `Prescribed ${items.length} Medications`,
      where: 'Doctor Clinical Workspace',
      orgName: 'Aga Khan Hospital Mandera',
      dashName: 'Prescriptions',
      recordId: rxId,
      details: items.map((i) => `${i.medicineName} (${i.dose} ${i.frequency})`).join('; '),
    });

    addNotification({
      organizationName: 'Aga Khan Main Pharmacy',
      category: 'Healthcare',
      title: `Prescription Sent to Pharmacy (${rxId})`,
      message: `${items.length} medicines queued for dispensing. Total: $${totalPrice}.`,
      relatedId: rxId,
    });
  };

  const dispensePrescription = (rxId: string) => {
    const rx = prescriptions.find((p) => p.id === rxId);
    if (!rx) return;

    // Deduct stock
    setMedicines((prev) =>
      prev.map((med) => {
        const matchingItem = rx.items.find((i) => i.medicineId === med.id || i.medicineName.includes(med.name));
        if (matchingItem) {
          const updatedQty = Math.max(0, med.quantity - matchingItem.quantity);
          return {
            ...med,
            quantity: updatedQty,
            isAvailable: updatedQty > 0,
          };
        }
        return med;
      })
    );

    setPrescriptions((prev) =>
      prev.map((p) => (p.id === rxId ? { ...p, status: 'Dispensed', dispensedAt: new Date().toISOString() } : p))
    );

    addNotification({
      organizationName: 'Aga Khan Main Pharmacy',
      category: 'Healthcare',
      title: `Medication Dispensed (${rxId})`,
      message: `Prescription ${rxId} is packaged and ready for patient collection at Window 1.`,
      relatedId: rxId,
    });
  };

  const addMedicine = (med: Omit<MedicineItem, 'id'>) => {
    const id = `med_${Date.now()}`;
    const newMed: MedicineItem = { ...med, id };
    setMedicines((prev) => [...prev, newMed]);
    addAuditLog({
      what: `Added New Medicine: ${med.name}`,
      where: 'Pharmacy Inventory',
      orgName: 'Aga Khan Hospital Mandera',
      dashName: 'Inventory',
      recordId: id,
      details: `Strength: ${med.strength}, Stock: ${med.quantity} ${med.unit}, Price: $${med.price}`,
    });
  };

  const updateMedicineStock = (medicineId: string, newQuantity: number) => {
    setMedicines((prev) =>
      prev.map((m) => (m.id === medicineId ? { ...m, quantity: newQuantity, isAvailable: newQuantity > 0 } : m))
    );
  };

  const applyBillDiscount = (billId: string, discountPercentage: number, discountReason: string) => {
    setPatientBills((prev) =>
      prev.map((bill) => {
        if (bill.id === billId) {
          const discountAmount = Math.round((bill.subtotal * discountPercentage) / 100);
          const totalPayable = Math.max(0, bill.subtotal - discountAmount);
          return {
            ...bill,
            discountPercentage,
            discountAmount,
            discountReason,
            totalPayable,
          };
        }
        return bill;
      })
    );

    addAuditLog({
      what: `Applied ${discountPercentage}% Discount to Bill`,
      where: 'Accounts & Cashier Desk',
      orgName: 'Aga Khan Hospital Mandera',
      dashName: 'Billing & Discounts',
      recordId: billId,
      details: `Reason: ${discountReason}. Saved: $${discountPercentage}%`,
    });

    addNotification({
      organizationName: 'Aga Khan Accounts',
      category: 'Billing',
      title: 'Discount Applied to Healthcare Bill',
      message: `A ${discountPercentage}% discount was applied to Bill ${billId}. Reason: ${discountReason}.`,
      relatedId: billId,
    });
  };

  const payBill = (billId: string, method: PatientBill['paymentMethod']) => {
    const receiptNum = `RCP-${Math.floor(10000 + Math.random() * 90000)}`;

    setPatientBills((prev) =>
      prev.map((bill) => {
        if (bill.id === billId) {
          return {
            ...bill,
            status: 'Paid',
            amountPaid: bill.totalPayable,
            paymentMethod: method,
            receiptNumber: receiptNum,
            paidAt: new Date().toISOString(),
          };
        }
        return bill;
      })
    );

    addAuditLog({
      what: `Patient Settled Bill via ${method}`,
      where: 'Accounts & Cashier Desk',
      orgName: 'Aga Khan Hospital Mandera',
      dashName: 'Billing',
      recordId: billId,
      details: `Receipt #${receiptNum} generated`,
    });

    addNotification({
      organizationName: 'Aga Khan Accounts',
      category: 'Billing',
      title: 'Payment Successful',
      message: `Payment confirmed for Bill ${billId} via ${method}. Receipt #${receiptNum}.`,
      relatedId: billId,
    });

    try {
      confetti({ particleCount: 90, spread: 75, origin: { y: 0.5 } });
    } catch {
      // Ignore
    }
  };

  const admitPatientToBed = (bedId: string, patientId: string, patientName: string, reason: string, doctorName: string) => {
    setWardBeds((prev) =>
      prev.map((b) =>
        b.id === bedId
          ? {
              ...b,
              status: 'Occupied',
              currentPatientId: patientId,
              currentPatientName: patientName,
              admissionReason: reason,
              attendingDoctor: doctorName,
              admittedAt: new Date().toLocaleDateString(),
            }
          : b
      )
    );

    // Charge admission fee to bill
    setPatientBills((prev) =>
      prev.map((bill) => {
        if (bill.patientId === patientId) {
          const newItem = {
            id: `item_ward_${Date.now()}`,
            service: `Ward Admission (Bed ${bedId})`,
            category: 'Ward' as const,
            quantity: 1,
            price: 50,
            coverage: 0,
            discount: 0,
            patientCost: 50,
          };
          const newSubtotal = bill.subtotal + 50;
          return {
            ...bill,
            items: [...bill.items, newItem],
            subtotal: newSubtotal,
            totalPayable: newSubtotal - bill.discountAmount,
          };
        }
        return bill;
      })
    );

    addAuditLog({
      what: `Admitted Patient to ${bedId}`,
      where: 'Ward & Inpatient Desk',
      orgName: 'Aga Khan Hospital Mandera',
      dashName: 'Ward Management',
      recordId: bedId,
      details: `Patient: ${patientName}. Reason: ${reason}`,
    });
  };

  const transferOrDischargeBed = (bedId: string, action: 'Clean' | 'Discharge' | 'Make Available') => {
    setWardBeds((prev) =>
      prev.map((b) => {
        if (b.id === bedId) {
          if (action === 'Discharge') {
            return {
              ...b,
              status: 'Cleaning',
              currentPatientId: undefined,
              currentPatientName: undefined,
              admissionReason: undefined,
              attendingDoctor: undefined,
            };
          }
          if (action === 'Make Available') {
            return { ...b, status: 'Available' };
          }
        }
        return b;
      })
    );
  };

  const reportEmergency = (caseData: Omit<EmergencyCase, 'id' | 'status' | 'timeline' | 'reportedAt' | 'origin'>) => {
    const caseId = `QL-EM-${Math.floor(10000 + Math.random() * 90000)}`;

    const newCase: EmergencyCase = {
      ...caseData,
      id: caseId,
      status: 'Reported',
      reportedAt: new Date().toISOString(),
      origin: 'App-Reported',
      timeline: [
        {
          status: 'Reported',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          note: `Emergency alert submitted by ${caseData.reporterName || 'Citizen'}. Triage auto-notified.`,
        },
      ],
    };

    setEmergencyCases((prev) => [newCase, ...prev]);

    addAuditLog({
      what: `CRITICAL: Emergency Alert Dispatched (${caseData.emergencyType})`,
      where: 'Citizen Mobile Emergency Dispatch',
      orgName: 'Aga Khan Hospital Mandera',
      dashName: 'Emergency Command Center',
      recordId: caseId,
      details: `Location: ${caseData.locationAddress}. Casualties: ${caseData.peopleAffected}`,
    });

    addNotification({
      organizationName: 'Aga Khan Trauma Center',
      category: 'Emergency',
      title: `EMERGENCY ALERT: ${caseData.emergencyType}`,
      message: `Emergency (${caseId}) at ${caseData.locationAddress}. Dispatch units responding.`,
      relatedId: caseId,
    });

    return caseId;
  };

  const updateEmergencyStatus = (caseId: string, status: EmergencyCase['status'], note?: string) => {
    setEmergencyCases((prev) =>
      prev.map((c) => {
        if (c.id === caseId) {
          const updatedTimeline = [
            ...c.timeline,
            {
              status,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              note: note || `Triage status updated to ${status}`,
              author: currentUser.name,
            },
          ];
          return {
            ...c,
            status,
            timeline: updatedTimeline,
          };
        }
        return c;
      })
    );

    addAuditLog({
      what: `Emergency ${caseId} Status Changed to ${status}`,
      where: 'Emergency Command Center',
      orgName: 'Aga Khan Hospital Mandera',
      dashName: 'Emergency Dispatch',
      recordId: caseId,
      details: note || `Status progressed to ${status}`,
    });

    addNotification({
      organizationName: 'Aga Khan Trauma Center',
      category: 'Emergency',
      title: `Emergency Case ${caseId}: ${status}`,
      message: note || `Status updated to ${status}.`,
      relatedId: caseId,
    });
  };

  const addNurseTask = (task: Omit<NurseTask, 'id' | 'status'>) => {
    const id = `task_${Date.now()}`;
    const newTask: NurseTask = { ...task, id, status: 'Pending' };
    setNurseTasks((prev) => [...prev, newTask]);
  };

  const updateNurseTaskStatus = (taskId: string, status: NurseTask['status']) => {
    setNurseTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status,
              completedAt: status === 'Completed' ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined,
            }
          : t
      )
    );
  };

  const recordPatientVitals = (vitals: Omit<VitalSignRecord, 'id' | 'recordedAt'>) => {
    const id = `vit_${Date.now()}`;
    const newRecord: VitalSignRecord = {
      ...vitals,
      id,
      recordedAt: `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
    };
    setVitalSigns((prev) => [newRecord, ...prev]);
  };

  const registerWalkInPatient = (name: string, nationalId: string, phone: string, age: number, gender: string, serviceName: string) => {
    const patientId = `usr_pt_${Date.now()}`;
    const newProfile: PatientClinicalProfile = {
      patientId,
      fullName: name,
      nationalId,
      phone,
      age,
      gender,
      bloodGroup: 'Unknown',
      allergies: ['None recorded'],
      chronicConditions: ['None recorded'],
      emergencyContact: phone,
      visitHistory: [
        {
          date: new Date().toISOString().split('T')[0],
          doctorName: 'On-Duty Triage Desk',
          department: serviceName,
          diagnosis: 'Walk-in Consultation Intake',
          prescriptionSummary: 'Pending clinical assessment',
          notes: 'Registered as walk-in patient at reception.',
        },
      ],
    };

    setPatientProfiles((prev) => ({ ...prev, [patientId]: newProfile }));

    // Create walk-in appointment
    bookHealthAppointment(
      'org_health_agakhan',
      'doc_amina',
      new Date().toISOString().split('T')[0],
      'Now',
      `Walk-in intake for ${serviceName}`,
      'Urgent'
    );
  };

  // -------------------------------------------------------------
  // QLINK CEO ACTIONS
  // -------------------------------------------------------------
  const createPlatformOrganization = (org: Partial<PlatformOrganization>) => {
    const id = `org_${org.type?.toLowerCase() || 'custom'}_${Date.now()}`;
    const newOrg: PlatformOrganization = {
      id,
      name: org.name || 'New Enterprise Organization',
      type: org.type || 'Government',
      country: org.country || 'Kenya',
      region: org.region || 'East Africa',
      contact: org.contact || '+254 700 000 000',
      email: org.email || 'admin@org.com',
      logo: org.logo || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150&auto=format&fit=crop&q=80',
      description: org.description || 'Enterprise customer on QLINK ecosystem.',
      status: 'Active',
      ceoName: org.ceoName || 'Appointed CEO',
      ceoEmail: org.ceoEmail || 'ceo@org.com',
      usersCount: 1,
      dashboardsCount: 1,
      branchesCount: 1,
      servicesCount: 1,
      createdAt: new Date().toISOString().split('T')[0],
      lastActivity: 'Just now',
      requiredModules: org.requiredModules || ['Overview', 'Operations', 'Audit'],
      enabledFeatures: org.enabledFeatures || ['Real-Time Sync', 'Dynamic Modules'],
    };

    setPlatformOrgs((prev) => [newOrg, ...prev]);

    addAuditLog({
      what: `QLINK CEO Created Organization: ${newOrg.name}`,
      where: 'QLINK CEO Command Center',
      orgName: newOrg.name,
      dashName: 'Organization Management',
      recordId: id,
      details: `Type: ${newOrg.type}, Region: ${newOrg.region}`,
    });

    addNotification({
      organizationName: 'QLINK Headquarters',
      category: 'System',
      title: `New Organization Provisioned: ${newOrg.name}`,
      message: `Organization ${newOrg.name} (${newOrg.type}) has been configured with full platform clearance.`,
    });
  };

  const updateOrgStatus = (orgId: string, status: PlatformOrganization['status']) => {
    setPlatformOrgs((prev) => prev.map((o) => (o.id === orgId ? { ...o, status } : o)));
    addAuditLog({
      what: `QLINK CEO Changed Org Status to ${status}`,
      where: 'QLINK CEO Command Center',
      orgName: 'Platform Governance',
      dashName: 'Organizations',
      recordId: orgId,
      details: `Status set to ${status}`,
    });
  };

  const createOrganizationCeo = (orgId: string, name: string, email: string, phone: string) => {
    setPlatformOrgs((prev) => prev.map((o) => (o.id === orgId ? { ...o, ceoName: name, ceoEmail: email } : o)));
    addAuditLog({
      what: `Assigned Organization CEO: ${name}`,
      where: 'QLINK CEO Command Center',
      orgName: 'Organization CEOs',
      dashName: 'CEO Management',
      recordId: orgId,
      details: `Email: ${email}, Phone: ${phone}`,
    });
  };

  const createCustomDashboard = (dash: Partial<DashboardInstance>) => {
    const id = `dash_${Date.now()}`;
    const newDash: DashboardInstance = {
      id,
      name: dash.name || 'Custom Operational Dashboard',
      organizationId: dash.organizationId || platformOrgs[0]?.id || 'org_gov_mandera',
      organizationName: dash.organizationName || platformOrgs[0]?.name || 'Mandera County Government',
      category: dash.category || 'Government',
      description: dash.description || 'Custom tailored workspace.',
      status: 'Active',
      usersCount: 1,
      modules: dash.modules || ['Executive Overview', 'Reports', 'Audit'],
      permissions: dash.permissions || ['Full Control'],
      createdAt: new Date().toISOString().split('T')[0],
      lastActivity: 'Just now',
    };
    setPlatformDashboards((prev) => [newDash, ...prev]);
  };

  const updateUserStatus = (userId: string, status: GlobalUserRecord['status']) => {
    setGlobalUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, status } : u)));
  };

  const resetUserAccess = (userId: string) => {
    addNotification({
      organizationName: 'QLINK Security Center',
      category: 'Security',
      title: 'Credentials Reset Dispatched',
      message: `Temporary password and multi-factor authorization link dispatched to user ${userId}.`,
    });
  };

  const restoreRecoverableItem = (recId: string) => {
    const item = recoverableItems.find((r) => r.id === recId);
    if (!item) return;

    setRecoverableItems((prev) => prev.filter((r) => r.id !== recId));

    addAuditLog({
      what: `RESTORED RECOVERABLE DATA: ${item.title}`,
      where: 'QLINK Data Recovery Center',
      orgName: item.organizationName,
      dashName: item.dashboardName,
      recordId: item.originalId,
      details: `Restored deleted ${item.entityType} back to live database.`,
    });

    addNotification({
      organizationName: 'QLINK Data Vault',
      category: 'System',
      title: `Data Restored: ${item.title}`,
      message: `Item ${item.originalId} restored with full historical schema integrity.`,
    });

    try {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
    } catch {
      // Ignore
    }
  };

  const softDeleteItem = (
    entityType: RecoverableItem['entityType'],
    originalId: string,
    title: string,
    orgName: string,
    dashName: string,
    rawData: any
  ) => {
    const recId = `rec_${Date.now()}`;
    const item: RecoverableItem = {
      id: recId,
      originalId,
      entityType,
      title,
      organizationName: orgName,
      dashboardName: dashName,
      deletedBy: currentUser.name,
      deletedAt: new Date().toLocaleString(),
      retentionDaysLeft: 30,
      isArchived: false,
      previousState: rawData,
    };
    setRecoverableItems((prev) => [item, ...prev]);
  };

  const resolveSecurityAlert = (alertId: string) => {
    setSecurityAlerts((prev) => prev.map((a) => (a.id === alertId ? { ...a, resolved: true } : a)));
  };

  const togglePlatformFeature = (featureKey: string) => {
    setActiveFeatures((prev) => ({ ...prev, [featureKey]: !prev[featureKey] }));
  };

  const sendBroadcastChat = (message: string) => {
    const newMsg: QlinkChatMessage = {
      id: `msg_${Date.now()}`,
      senderName: currentUser.name,
      senderRole: currentUser.role.toUpperCase(),
      senderOrg: currentUser.organizationName || 'QLINK HQ',
      senderAvatar: currentUser.avatar,
      message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isAnnouncement: currentUser.role === 'qlink_ceo',
    };
    setChatMessages((prev) => [...prev, newMsg]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <QLINKContext.Provider
      value={{
        currentUser,
        allUsers,
        setCurrentUser,
        switchRole,
        loginWithGoogle,
        updateUserProfile,

        customerTab,
        setCustomerTab,
        selectedGovService,
        setSelectedGovService,
        selectedGovBranch,
        setSelectedGovBranch,
        selectedBank,
        setSelectedBank,
        selectedBankBranch,
        setSelectedBankBranch,
        selectedHealthFacility,
        setSelectedHealthFacility,
        selectedDoctor,
        setSelectedDoctor,
        activeOrgTab,
        setActiveOrgTab,
        activeQlinkCeoTab,
        setActiveQlinkCeoTab,
        globalSearchQuery,
        setGlobalSearchQuery,
        notificationDrawerOpen,
        setNotificationDrawerOpen,
        splashVisible,
        setSplashVisible,

        govServices,
        govBranches,
        govQuestionnaires,
        govApplications,
        submitGovApplication,
        updateApplicationStatus,
        resubmitGovApplication,
        saveQuestionnaire,
        createGovService,
        toggleGovServiceStatus,
        createGovBranch,
        bulkUpdateGovApplications,

        banks,
        bankBranches,
        bankCounters,
        bankStaffWorkload,
        bankTickets,
        bankAppointments,
        joinBankQueue,
        leaveBankQueue,
        callNextBankCustomer,
        completeBankCustomer,
        updateCounterStatus,
        bookBankAppointment,
        updateBankAppointmentStatus,

        healthcareFacilities,
        healthcareDoctors,
        healthAppointments,
        patientProfiles,
        labOrders,
        radiologyOrders,
        medicines,
        prescriptions,
        patientBills,
        wardBeds,
        emergencyCases,
        nurseTasks,
        vitalSigns,
        bookHealthAppointment,
        updateHealthAppointmentStatus,
        orderLabTest,
        updateLabOrderStatus,
        orderRadiology,
        updateRadiologyStatus,
        createPrescription,
        dispensePrescription,
        addMedicine,
        updateMedicineStock,
        applyBillDiscount,
        payBill,
        admitPatientToBed,
        transferOrDischargeBed,
        reportEmergency,
        updateEmergencyStatus,
        addNurseTask,
        updateNurseTaskStatus,
        recordPatientVitals,
        registerWalkInPatient,

        platformOrgs,
        platformDashboards,
        globalUsers,
        recoverableItems,
        auditRecords,
        systemHealthMetrics,
        securityAlerts,
        notifications,
        chatMessages,
        activeFeatures,
        createPlatformOrganization,
        updateOrgStatus,
        createOrganizationCeo,
        createCustomDashboard,
        updateUserStatus,
        resetUserAccess,
        restoreRecoverableItem,
        softDeleteItem,
        resolveSecurityAlert,
        togglePlatformFeature,
        sendBroadcastChat,
        addNotification,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        addAuditLog,
      }}
    >
      {children}
    </QLINKContext.Provider>
  );
};

export const useQLINK = () => {
  const context = useContext(QLINKContext);
  if (!context) {
    throw new Error('useQLINK must be used within a QLINKProvider');
  }
  return context;
};
