
export enum UserRole {
    USER = 'user',
    ASHA_WORKER = 'asha_worker',
    OFFICIAL = 'official',
}

export interface User {
    id: string;
    name: string;
    role: UserRole;
}

export enum RiskLevel {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
}

export interface WaterQualityReport {
    id: string;
    location: string;
    lat: number;
    lng: number;
    ph: number;
    turbidity: number;
    bacteria: number; // in CFU/100mL
    reportedBy: string;
    timestamp: string;
    riskLevel: RiskLevel;
}

export interface DiseaseCaseReport {
    id: string;
    location: string;
    disease: string;
    caseCount: number;
    reportedBy: string;
    timestamp: string;
}

export enum AlertStatus {
    NEW = 'new',
    VERIFIED = 'verified',
    RESOLVED = 'resolved',
    UNRESOLVED = 'unresolved',
}

export interface Alert {
    id: string;
    title: string;
    description: string;
    location: string;
    riskLevel: RiskLevel;
    timestamp: string;
    status: AlertStatus;
}

// New type for structured AI risk data points
export interface AIRiskDataPoint {
    location: string;
    lat: number;
    lng: number;
    riskLevel: RiskLevel;
}

// New type for the overall AI analysis response
export interface AIRiskAnalysis {
    analysisText: string;
    riskData: AIRiskDataPoint[];
}