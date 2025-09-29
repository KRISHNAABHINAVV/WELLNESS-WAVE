import { WaterQualityReport, RiskLevel, Alert, AlertStatus, DiseaseCaseReport } from './types';

export const MOCK_WATER_REPORTS: WaterQualityReport[] = [
    { id: '1', location: 'Brahmaputra River, Assam', lat: 26.1, lng: 91.7, ph: 6.7, turbidity: 55, bacteria: 800, reportedBy: 'Asha Worker 1', timestamp: '2024-07-30T10:00:00Z', riskLevel: RiskLevel.HIGH },
    { id: '2', location: 'Loktak Lake, Manipur', lat: 24.5, lng: 93.8, ph: 6.9, turbidity: 70, bacteria: 1200, reportedBy: 'Community Volunteer A', timestamp: '2024-07-30T09:30:00Z', riskLevel: RiskLevel.HIGH },
    { id: '3', location: 'Umiam Lake, Meghalaya', lat: 25.6, lng: 91.9, ph: 6.5, turbidity: 40, bacteria: 250, reportedBy: 'Asha Worker 2', timestamp: '2024-07-29T14:00:00Z', riskLevel: RiskLevel.MEDIUM },
    { id: '4', location: 'Dzukou Valley, Nagaland', lat: 25.6, lng: 94.0, ph: 7.2, turbidity: 15, bacteria: 30, reportedBy: 'Volunteer B', timestamp: '2024-07-29T11:00:00Z', riskLevel: RiskLevel.LOW },
    { id: '5', location: 'Tawang, Arunachal Pradesh', lat: 27.5, lng: 91.8, ph: 7.6, turbidity: 5, bacteria: 10, reportedBy: 'Health Official', timestamp: '2024-07-28T16:00:00Z', riskLevel: RiskLevel.LOW },
    { id: '6', location: 'Agartala, Tripura', lat: 23.8, lng: 91.2, ph: 6.8, turbidity: 65, bacteria: 950, reportedBy: 'Asha Worker 3', timestamp: '2024-07-30T11:00:00Z', riskLevel: RiskLevel.HIGH },
];

export const MOCK_DISEASE_REPORTS: DiseaseCaseReport[] = [
    { id: 'd1', location: 'Brahmaputra River, Assam', disease: 'Diarrhea', caseCount: 45, reportedBy: 'Asha Worker 1', timestamp: '2024-07-30T10:00:00Z' },
    { id: 'd2', location: 'Loktak Lake, Manipur', disease: 'Cholera', caseCount: 18, reportedBy: 'Volunteer A', timestamp: '2024-07-30T09:30:00Z' },
    { id: 'd3', location: 'Umiam Lake, Meghalaya', disease: 'Hepatitis', caseCount: 12, reportedBy: 'Asha Worker 2', timestamp: '2024-07-29T14:00:00Z' },
    { id: 'd4', location: 'Agartala, Tripura', disease: 'Typhoid', caseCount: 25, reportedBy: 'Asha Worker 3', timestamp: '2024-07-30T11:00:00Z' },
];

export const GEO_RISK_DATA: { [countryCode: string]: RiskLevel } = {
    "IND": RiskLevel.HIGH,
    // FIX: Corrected typo `RiskLvel` to `RiskLevel`.
    "EGY": RiskLevel.HIGH,
    "UGA": RiskLevel.HIGH,
    "VNM": RiskLevel.MEDIUM,
    "BRA": RiskLevel.LOW,
    "DEU": RiskLevel.LOW,
    "USA": RiskLevel.LOW,
    "CHN": RiskLevel.MEDIUM,
    "NGA": RiskLevel.HIGH,
    "BGD": RiskLevel.HIGH,
};

export const MOCK_ALERTS: Alert[] = [
    { id: 'a1', title: 'High Cholera Risk Detected', description: 'High bacteria levels and Cholera cases reported near Loktak Lake. Immediate action required.', location: 'Loktak Lake, Manipur', riskLevel: RiskLevel.HIGH, timestamp: '2024-07-30T10:05:00Z', status: AlertStatus.NEW },
    { id: 'a2', title: 'Spike in Diarrheal Cases', description: 'Unusual spike in Diarrhea cases reported along the Brahmaputra River in Assam.', location: 'Brahmaputra River, Assam', riskLevel: RiskLevel.HIGH, timestamp: '2024-07-30T09:40:00Z', status: AlertStatus.VERIFIED },
    { id: 'a3', title: 'Hepatitis Cases Rising', description: 'Increase in Hepatitis cases reported near Umiam Lake. Water sources may be contaminated.', location: 'Umiam Lake, Meghalaya', riskLevel: RiskLevel.MEDIUM, timestamp: '2024-07-29T14:15:00Z', status: AlertStatus.RESOLVED },
];

export const MOCK_COMMUNITY_PHONE_NUMBERS: { [location: string]: number } = {
    'Brahmaputra River, Assam': 150,
    'Loktak Lake, Manipur': 85,
    'Umiam Lake, Meghalaya': 120,
    'Dzukou Valley, Nagaland': 30,
    'Tawang, Arunachal Pradesh': 45,
    'Agartala, Tripura': 210,
};