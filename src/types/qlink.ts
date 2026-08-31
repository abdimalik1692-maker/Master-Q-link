/**
 * QLINK ECOSYSTEM - MASTER TYPE DEFINITIONS
 * Unified Citizen, Organization, and CEO Platform Architecture
 */

export type UserRole =
  | 'customer'
  | 'gov_ceo'
  | 'gov_admin'
  | 'bank_ceo'
  | 'bank_manager'
  | 'bank_officer'
  | 'health_ceo'
  | 'doctor'
  | 'nurse'
  | 'lab_tech'
  | 'radiologist'
  | 'pharmacist'
  | 'billing_cashier'
  | 'emergency_staff'
  | 'receptionist'
  | 'qlink_ceo';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: UserRole;
  organizationId?: string;
  organizationName?: string;
  branchId?: string;
  branchName?: string;
  department?: string;
  city: string;
  country: string;
  googleLinked: boolean;
  permissions: string[];
  status: 'Active' | 'Suspended' | 'Locked';
  lastLogin: string;
}

// -------------------------------------------------------------
// GOVERNMENT TYPES
// -------------------------------------------------------------
export interface GovService {
  id: string;
  name: string;
  organizationId: string;
  organizationName: string;
  category: string;
  description: string;
  requirements: string[];
  requiredDocuments: string[];
  operatingHours: string;
  status: 'Open' | 'Paused' | 'Closed';
  branchesCount: number;
  totalApplications: number;
  pendingCount: number;
  acceptedCount: number;
  declinedCount: number;
  servedCount: number;
  activeQueueCount: number;
  avgWaitMinutes: number;
}

export interface GovBranch {
  id: string;
  serviceId: string;
  serviceName: string;
  name: string;
  county: string;
  address: string;
  status: 'Open' | 'Busy' | 'Closed';
  applicationsCount: number;
  acceptedCount: number;
  pendingCount: number;
  declinedCount: number;
  servedCount: number;
  currentQueue: number;
  avgWaitMinutes: number;
  capacityUtilization: number; // e.g. 85%
  servingNowNumber?: string;
  nextCustomerNumber?: string;
}

export type QuestionFieldType =
  | 'short_text'
  | 'long_text'
  | 'number'
  | 'date'
  | 'time'
  | 'email'
  | 'phone'
  | 'yes_no'
  | 'multiple_choice'
  | 'dropdown'
  | 'checkbox'
  | 'address'
  | 'document_upload'
  | 'image_upload'
  | 'multiple_documents';

export interface QuestionItem {
  id: string;
  label: string;
  type: QuestionFieldType;
  required: boolean;
  placeholder?: string;
  options?: string[];
  helpText?: string;
  conditionalOnField?: string;
  conditionalValue?: string;
}

export interface GovQuestionnaire {
  id: string;
  serviceId: string;
  serviceName: string;
  title: string;
  description: string;
  version: number;
  status: 'Published' | 'Draft' | 'Archived';
  questions: QuestionItem[];
  createdAt: string;
  updatedAt: string;
}

export type ApplicationStatus =
  | 'All'
  | 'New'
  | 'Submitted'
  | 'Pending Review'
  | 'Under Review'
  | 'Accepted'
  | 'Pending'
  | 'Declined'
  | 'Scheduled'
  | 'Checked In'
  | 'Waiting'
  | 'Serving'
  | 'Served'
  | 'Completed'
  | 'Not Served'
  | 'Resubmitted'
  | 'No-Show'
  | 'Cancelled';

export interface ApplicationTimelineEvent {
  status: ApplicationStatus;
  time: string;
  author: string;
  note?: string;
}

export interface GovApplication {
  id: string; // e.g. "QL-ID-2026-00184"
  serviceId: string;
  serviceName: string;
  branchId: string;
  branchName: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: ApplicationStatus;
  formData: Record<string, any>;
  documents: Array<{
    id: string;
    name: string;
    fileUrl: string;
    type: string;
    size?: string;
    verified?: boolean;
  }>;
  submittedAt: string;
  updatedAt: string;
  decisionReason?: string;
  scheduledDate?: string;
  scheduledTime?: string;
  queueTicketNumber?: string;
  timeline: ApplicationTimelineEvent[];
}

// -------------------------------------------------------------
// BANKING TYPES
// -------------------------------------------------------------
export interface BankOrganization {
  id: string;
  name: string;
  logo: string;
  verified: boolean;
  branchesCount: number;
  totalCustomersToday: number;
  services: string[];
  announcements: string[];
  contact: string;
  activeQueues: number;
  averageWait: number;
}

export interface BankBranch {
  id: string;
  bankId: string;
  bankName: string;
  name: string;
  address: string;
  hours: string;
  isOpen: boolean;
  currentQueueCount: number;
  avgWaitMinutes: number;
  capacityUtilization: number;
  customersToday: number;
  applicationsCount: number;
  appointmentsCount: number;
  walkInsCount: number;
  servedCount: number;
  notServedCount: number;
  noShowCount: number;
  activeCountersCount: number;
  busyCountersCount: number;
  idleCountersCount: number;
  services: Array<{
    id: string;
    name: string;
    waitingCount: number;
    servingCount: number;
    avgMinutes: number;
    isOpen: boolean;
  }>;
}

export interface BankCounter {
  id: string;
  counterNumber: number;
  serviceName: string;
  staffName: string;
  status: 'Busy' | 'Available' | 'Offline';
  currentCustomerTicket?: string;
  avgTimePerCustomer: string;
}

export interface BankStaffWorkload {
  id: string;
  name: string;
  role: string;
  branchId: string;
  served: number;
  avgTime: string;
  currentWorkload: string;
  status: 'Busy' | 'Available' | 'Offline';
}

export interface BankQueueTicket {
  id: string;
  ticketNumber: string; // e.g. "A024"
  bankId: string;
  bankName: string;
  branchId: string;
  branchName: string;
  serviceName: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  peopleAhead: number;
  estimatedWaitMinutes: number;
  currentServingTicket: string;
  status: 'Waiting' | 'Serving' | 'Completed' | 'Cancelled' | 'No-Show';
  counterNumber?: number;
  issuedAt: string;
}

export interface BankAppointment {
  id: string; // e.g. "BK-APT-9041"
  bankId: string;
  bankName: string;
  branchId: string;
  branchName: string;
  serviceName: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  date: string;
  time: string;
  notes?: string;
  status: 'Requested' | 'Confirmed' | 'Completed' | 'Cancelled' | 'Rescheduled';
  createdAt: string;
}

// -------------------------------------------------------------
// HEALTHCARE TYPES
// -------------------------------------------------------------
export interface HealthcareFacility {
  id: string;
  name: string;
  logo: string;
  verified: boolean;
  location: string;
  gps: { lat: number; lng: number };
  openingHours: string;
  isOpen: boolean;
  departments: string[];
  doctorsOnDuty: number;
  activeEmergencyUnits: number;
  availableBeds: number;
  totalBeds: number;
  contactPhone: string;
}

export interface HealthcareDoctor {
  id: string;
  facilityId: string;
  facilityName: string;
  departmentId: string;
  departmentName: string;
  name: string;
  specialty: string;
  onDuty: boolean;
  rating: number;
  availableSlots: string[];
  avatar: string;
  roomNumber: string;
  patientsWaiting: number;
  consultationsCompleted: number;
  consultationFee?: number;
}

export interface HealthAppointment {
  id: string; // e.g. "MED-APT-8921"
  facilityId: string;
  facilityName: string;
  departmentName: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  patientAge?: number;
  patientGender?: string;
  date: string;
  time: string;
  reason: string;
  status: 'Requested' | 'Accepted' | 'Declined' | 'Confirmed' | 'Checked In' | 'Waiting' | 'Consulting' | 'Completed' | 'Cancelled';
  queueTicketNumber?: string;
  triagePriority: 'Normal' | 'Urgent' | 'Emergency';
  createdAt: string;
}

export interface PatientClinicalProfile {
  patientId: string;
  fullName: string;
  nationalId: string;
  phone: string;
  age: number;
  gender: string;
  bloodGroup: string;
  allergies: string[];
  chronicConditions: string[];
  emergencyContact: string;
  visitHistory: Array<{
    date: string;
    doctorName: string;
    department: string;
    diagnosis: string;
    prescriptionSummary: string;
    notes: string;
  }>;
}

export interface ConsultationEncounter {
  id: string;
  appointmentId?: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  departmentName: string;
  subjective: string; // Chief complaint & symptoms
  objective: string; // Physical exam & vitals
  assessment: string; // Diagnosis
  plan: string; // Treatment plan
  vitalSigns: {
    bloodPressure?: string;
    heartRate?: number;
    tempCelsius?: number;
    respiratoryRate?: number;
    oxygenSaturation?: number;
    weightKg?: number;
  };
  labOrderIds: string[];
  radiologyOrderIds: string[];
  prescriptionIds: string[];
  followUpDate?: string;
  timestamp: string;
}

export interface LabOrder {
  id: string; // "LAB-904"
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  departmentName: string;
  testName: string;
  priority: 'Routine' | 'Urgent' | 'STAT';
  status: 'Ordered' | 'Sample Collected' | 'Processing' | 'Result Ready' | 'Verified';
  sampleType: string;
  result?: string;
  referenceRange?: string;
  technicianNotes?: string;
  cost: number;
  orderedAt: string;
  completedAt?: string;
}

export interface RadiologyOrder {
  id: string; // "RAD-401"
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  departmentName: string;
  modality: 'X-Ray' | 'CT-Scan' | 'MRI' | 'Ultrasound';
  examination: string;
  priority: 'Routine' | 'Urgent' | 'STAT';
  status: 'Ordered' | 'Scheduled' | 'Patient Arrived' | 'Imaging Done' | 'Report Verified';
  findings?: string;
  impression?: string;
  cost: number;
  orderedAt: string;
  completedAt?: string;
}

export interface MedicineItem {
  id: string;
  name: string;
  genericName: string;
  brand: string;
  strength: string;
  form: string; // Tablet, Syrup, Injection, Cream
  quantity: number;
  unit: string;
  batch: string;
  expiry: string;
  price: number;
  isAvailable: boolean;
  minStockAlert: number;
}

export interface Prescription {
  id: string; // "RX-771"
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  items: Array<{
    medicineId: string;
    medicineName: string;
    strength: string;
    form: string;
    dose: string;
    frequency: string;
    duration: string;
    quantity: number;
    instructions: string;
    price: number;
  }>;
  status: 'Prescribed' | 'Processing' | 'Dispensed' | 'Completed';
  totalPrice: number;
  prescribedAt: string;
  dispensedAt?: string;
}

export interface BillItem {
  id: string;
  service: string;
  category: 'Consultation' | 'Laboratory' | 'Radiology' | 'Pharmacy' | 'Ward' | 'Emergency' | 'Procedure';
  quantity: number;
  price: number;
  coverage: number; // Insurance coverage amount
  discount: number; // Discount amount
  patientCost: number;
}

export interface PatientBill {
  id: string; // "BILL-908"
  patientId: string;
  patientName: string;
  facilityName: string;
  items: BillItem[];
  subtotal: number;
  discountAmount: number;
  discountPercentage: number;
  discountReason?: string;
  insuranceCovered: number;
  totalPayable: number;
  amountPaid: number;
  status: 'Pending' | 'Partially Paid' | 'Paid';
  paymentMethod?: 'Cash' | 'Mobile Money (M-Pesa)' | 'Credit Card' | 'Insurance';
  receiptNumber?: string;
  createdAt: string;
  paidAt?: string;
}

export interface WardBed {
  id: string;
  wardName: string;
  department: string;
  bedNumber: string;
  status: 'Available' | 'Occupied' | 'Cleaning' | 'Reserved';
  currentPatientId?: string;
  currentPatientName?: string;
  admittedAt?: string;
  attendingDoctor?: string;
  admissionReason?: string;
}

export interface EmergencyCase {
  id: string; // "QL-EM-48291"
  emergencyType:
    | 'Accident'
    | 'Severe bleeding'
    | 'Unconscious person'
    | 'Breathing difficulty'
    | 'Pregnancy/maternity emergency'
    | 'Child emergency'
    | 'Serious injury'
    | 'Suspected poisoning'
    | 'Fire/burn injury'
    | 'Other emergency'
    | 'Medical'
    | 'Road Accident'
    | 'Fire'
    | 'Crime/Assault'
    | 'Maternity/OBGYN'
    | 'Other'
    | string;
  locationAddress?: string;
  locationName?: string;
  gps?: { lat: number; lng: number };
  landmark?: string;
  description?: string;
  severity?: string;
  peopleAffected?: '1' | '2' | '3-5' | '5+' | 'Unknown' | string;
  condition?: string;
  patientCondition?: string;
  casualtiesCount?: number;
  reporterName?: string;
  reporterPhone?: string;
  callerName?: string;
  callerPhone?: string;
  assignedAmbulanceUnit?: string;
  mediaUrl?: string;
  status:
    | 'Reported'
    | 'Dispatched'
    | 'En Route'
    | 'On Scene'
    | 'In Transit'
    | 'Acknowledged'
    | 'Preparing'
    | 'Patient Arriving'
    | 'Arrived'
    | 'Emergency Care'
    | 'Admitted'
    | 'Transferred'
    | 'Discharged'
    | 'Closed';
  timeline?: Array<{
    status: string;
    time: string;
    note: string;
    author?: string;
  }>;
  assignedFacilityName?: string;
  reportedAt?: string;
  origin?: 'App-Reported' | 'Hospital-Originated Emergency';
}

export interface NurseTask {
  id: string;
  patientId: string;
  patientName: string;
  wardBed: string;
  taskDescription: string;
  priority: 'Routine' | 'High' | 'Stat';
  status: 'Pending' | 'In Progress' | 'Completed';
  assignedNurse: string;
  scheduledTime: string;
  completedAt?: string;
}

export interface VitalSignRecord {
  id: string;
  patientId: string;
  patientName: string;
  wardBed: string;
  recordedByNurse: string;
  bpSystolic: number;
  bpDiastolic: number;
  pulseRate: number;
  tempCelsius: number;
  respRate: number;
  spo2: number;
  recordedAt: string;
}

// -------------------------------------------------------------
// QLINK CEO COMMAND CENTER TYPES
// -------------------------------------------------------------
export interface PlatformOrganization {
  id: string;
  name: string;
  type: 'Government' | 'Banking' | 'Healthcare';
  country: string;
  region: string;
  contact: string;
  email: string;
  logo: string;
  description: string;
  status: 'Active' | 'Inactive' | 'Suspended' | 'Archived';
  ceoName: string;
  ceoEmail: string;
  usersCount: number;
  dashboardsCount: number;
  branchesCount: number;
  servicesCount: number;
  createdAt: string;
  lastActivity: string;
  requiredModules: string[];
  enabledFeatures: string[];
}

export interface DashboardInstance {
  id: string;
  name: string;
  organizationId: string;
  organizationName: string;
  category: 'Government' | 'Banking' | 'Healthcare' | 'Custom';
  description: string;
  status: 'Active' | 'Inactive' | 'Draft' | 'Archived' | 'Suspended';
  usersCount: number;
  modules: string[];
  permissions: string[];
  createdAt: string;
  lastActivity: string;
}

export interface GlobalUserRecord {
  id: string;
  name: string;
  account: string; // email
  phone: string;
  organizationId: string;
  organizationName: string;
  dashboardName: string;
  role: string;
  branchName: string;
  status: 'Active' | 'Suspended' | 'Locked';
  lastLogin: string;
  permissions: string;
}

export interface RecoverableItem {
  id: string;
  originalId: string;
  entityType: 'Application' | 'User' | 'Organization' | 'Queue' | 'Appointment' | 'Questionnaire' | 'Billing' | 'Emergency';
  title: string;
  organizationName: string;
  dashboardName: string;
  deletedBy: string;
  deletedAt: string;
  retentionDaysLeft: number;
  isArchived: boolean;
  previousState: any;
}

export interface GlobalAuditRecord {
  id: string;
  who: string;
  role: string;
  what: string;
  when: string;
  where: string;
  organizationName: string;
  dashboardName: string;
  recordId: string;
  details: string;
  diffSummary?: string;
}

export interface SystemHealthMetric {
  id: string;
  name: string;
  category: 'Database' | 'Authentication' | 'Storage' | 'Notifications' | 'WhatsApp API' | 'Email Engine' | 'Cloud Run API' | 'Real-time Sync';
  status: 'Operational' | 'Warning' | 'Degraded' | 'Offline';
  latencyMs: number;
  uptimePercent: number;
  errorRate: string;
  lastChecked: string;
  message: string;
}

export interface SecurityAlert {
  id: string;
  type: 'Failed Login' | 'Suspicious IP' | 'Account Lockout' | 'Unauthorized Access' | 'Support Impersonation' | 'Permission Elevation';
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  user: string;
  ip: string;
  time: string;
  resolved: boolean;
  notes?: string;
}

export interface NotificationItem {
  id: string;
  targetUserId?: string;
  targetRole?: string;
  organizationName: string;
  category: 'Government' | 'Banking' | 'Healthcare' | 'Emergency' | 'Appointments' | 'Queues' | 'Billing' | 'Security' | 'System';
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionUrl?: string;
  relatedId?: string;
}

export interface QlinkChatMessage {
  id: string;
  senderName: string;
  senderRole: string;
  senderOrg: string;
  senderAvatar: string;
  message: string;
  timestamp: string;
  isAnnouncement?: boolean;
}

// Convenient type aliases
export type EmergencyReport = EmergencyCase;
export type GovQuestion = QuestionItem;
export type GovQuestionType = QuestionFieldType;
export type GovApplicationStatus = ApplicationStatus;

