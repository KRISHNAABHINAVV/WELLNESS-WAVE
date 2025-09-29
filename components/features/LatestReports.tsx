import React from 'react';
import jsPDF from 'jspdf';
import { useData } from '../../context/DataContext';
import { useTranslation } from '../../hooks/useTranslation';
import { WaterQualityReport, DiseaseCaseReport } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { FileDownIcon, WaterDropIcon } from '../ui/Icons';

// Union type for easier handling
type Report = (WaterQualityReport & { type: 'water' }) | (DiseaseCaseReport & { type: 'disease' });

const LatestReports: React.FC = () => {
    const { waterReports, diseaseReports } = useData();
    const { t } = useTranslation();

    const generatePdf = (report: Report) => {
        const doc = new jsPDF();
        
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.text('Wellness Wave - Official Report', 10, 20);

        doc.setLineWidth(0.5);
        doc.line(10, 22, 200, 22);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);

        let yPosition = 35;

        doc.text(`Report ID: ${report.id}`, 10, yPosition);
        yPosition += 7;
        doc.text(`Date: ${new Date(report.timestamp).toLocaleString()}`, 10, yPosition);
        yPosition += 7;
        doc.text(`Location: ${report.location}`, 10, yPosition);
        yPosition += 7;
        doc.text(`Reported By: ${report.reportedBy}`, 10, yPosition);
        yPosition += 14;

        if (report.type === 'water') {
            doc.setFont('helvetica', 'bold');
            doc.text('Type: Water Quality Report', 10, yPosition);
            yPosition += 7;
            doc.line(10, yPosition-2, 70, yPosition-2);
            doc.setFont('helvetica', 'normal');
            doc.text(`pH Level: ${report.ph}`, 10, yPosition);
            yPosition += 7;
            doc.text(`Turbidity (NTU): ${report.turbidity}`, 10, yPosition);
            yPosition += 7;
            doc.text(`Bacteria (CFU/100mL): ${report.bacteria}`, 10, yPosition);
            yPosition += 7;
            doc.text(`Risk Level: ${report.riskLevel.toUpperCase()}`, 10, yPosition);
        } else {
            doc.setFont('helvetica', 'bold');
            doc.text('Type: Disease Case Report', 10, yPosition);
            yPosition += 7;
            doc.line(10, yPosition-2, 70, yPosition-2);
            doc.setFont('helvetica', 'normal');

            doc.text(`Disease: ${report.disease}`, 10, yPosition);
            yPosition += 7;
            doc.text(`Case Count: ${report.caseCount}`, 10, yPosition);
        }

        yPosition += 20;
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text('--- End of Report ---', 10, yPosition);
        
        doc.save(`report_${report.id}.pdf`);
    };

    const combinedReports: Report[] = [
        ...waterReports.map(r => ({ ...r, type: 'water' as const })),
        ...diseaseReports.map(r => ({ ...r, type: 'disease' as const }))
    ];

    const sortedReports = combinedReports.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return (
        <Card title={t('latest_reports_title')} icon={<WaterDropIcon className="w-6 h-6" />}>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {sortedReports.slice(0, 10).map(report => (
                    <div key={report.id} className="bg-base-200 p-3 rounded-lg flex justify-between items-center">
                        <div>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${report.type === 'water' ? 'bg-blue-200 text-blue-800' : 'bg-red-200 text-red-800'}`}>
                                {report.type === 'water' ? t('report_type_water') : t('report_type_disease')}
                            </span>
                            <p className="font-semibold text-base-content mt-1">{report.location}</p>
                            <p className="text-sm text-gray-500">
                                {new Date(report.timestamp).toLocaleString()} by {report.reportedBy}
                            </p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => generatePdf(report)} aria-label={`Download report for ${report.location}`}>
                            <FileDownIcon className="w-5 h-5 mr-1" />
                            {t('download_pdf')}
                        </Button>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default LatestReports;