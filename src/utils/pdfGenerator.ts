import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { PayrollRecord, EmployeePayroll } from '../features/hr/pages/Payroll';

export const generatePayrollPDF = (payroll: PayrollRecord) => {
  const doc = new jsPDF();
  
  // Add company logo and header
  doc.setFontSize(20);
  doc.text('Fiche de paie', 105, 20, { align: 'center' });
  
  // Add payroll information
  doc.setFontSize(12);
  doc.text(`Période: ${payroll.month} ${payroll.year}`, 20, 40);
  doc.text(`Statut: ${payroll.status}`, 20, 50);
  doc.text(`Créé le: ${new Date(payroll.createdAt).toLocaleDateString()}`, 20, 60);
  doc.text(`Créé par: ${payroll.createdBy}`, 20, 70);

  // Add employee table
  const tableColumn = ['Employé', 'Salaire de base', 'Heures supp.', 'Primes', 'Déductions', 'Net'];
  const tableRows = payroll.employees.map(emp => [
    emp.name,
    `${emp.baseSalary.toLocaleString()} €`,
    `${emp.overtime.toLocaleString()} €`,
    `${emp.bonuses.toLocaleString()} €`,
    `${emp.deductions.toLocaleString()} €`,
    `${emp.netSalary.toLocaleString()} €`
  ]);

  (doc as any).autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 80,
    theme: 'grid',
    styles: { fontSize: 10 },
    headStyles: { fillColor: [66, 139, 202] }
  });

  // Add total amount
  const finalY = (doc as any).lastAutoTable.finalY || 80;
  doc.setFontSize(12);
  doc.text(`Montant total: ${payroll.totalAmount.toLocaleString()} €`, 20, finalY + 20);

  return doc;
};

export const generatePayslipPDF = (employee: EmployeePayroll, payroll: PayrollRecord) => {
  const doc = new jsPDF();
  
  // Add company logo and header
  doc.setFontSize(20);
  doc.text('Bulletin de paie', 105, 20, { align: 'center' });
  
  // Add employee information
  doc.setFontSize(12);
  doc.text(`Employé: ${employee.name}`, 20, 40);
  doc.text(`Période: ${payroll.month} ${payroll.year}`, 20, 50);
  doc.text(`Date de paiement: ${new Date().toLocaleDateString()}`, 20, 60);

  // Add salary details
  const details = [
    ['Salaire de base', `${employee.baseSalary.toLocaleString()} €`],
    ['Heures supplémentaires', `${employee.overtime.toLocaleString()} €`],
    ['Primes', `${employee.bonuses.toLocaleString()} €`],
    ['Déductions', `${employee.deductions.toLocaleString()} €`],
    ['Salaire net', `${employee.netSalary.toLocaleString()} €`]
  ];

  (doc as any).autoTable({
    body: details,
    startY: 70,
    theme: 'grid',
    styles: { fontSize: 10 },
    columnStyles: {
      0: { cellWidth: 100 },
      1: { cellWidth: 80, halign: 'right' }
    }
  });

  // Add footer
  const finalY = (doc as any).lastAutoTable.finalY || 70;
  doc.setFontSize(10);
  doc.text('Ce document est généré automatiquement et fait office de bulletin de paie.', 20, finalY + 20);
  doc.text('Signature:', 20, finalY + 30);
  
  return doc;
};

export const downloadPDF = (doc: jsPDF, filename: string) => {
  doc.save(filename);
}; 