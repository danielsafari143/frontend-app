import React, { useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Printer, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface QuotationItem {
  id: string;
  productId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  taxRate: number;
  total: number;
}

interface Quotation {
  id: string;
  quoteNumber: string;
  customerId: string;
  customerName: string;
  customerAddress: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  validUntil: string;
  items: QuotationItem[];
  currency: string;
  notes: string;
  terms: string[];
  subtotal: number;
  totalDiscount: number;
  totalTax: number;
  total: number;
  charges: { description: string; amount: number }[];
}

// Mock data
const mockQuotation: Quotation = {
  id: 'Q2024-001',
  quoteNumber: 'Q2024-001',
  customerId: 'C001',
  customerName: 'Entreprise ABC SARL',
  customerAddress: '123 Avenue du Commerce\n75001 Paris, France',
  customerEmail: 'contact@entreprise-abc.com',
  customerPhone: '+243 123 456 789',
  date: new Date().toLocaleDateString('fr-FR'),
  validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
  items: [
    {
      id: '1',
      productId: 'P001',
      description: 'Ordinateur Portable Pro',
      quantity: 2,
      unitPrice: 1200,
      discount: 5,
      taxRate: 16,
      total: 2392.32,
    },
    {
      id: '2',
      productId: 'P002',
      description: 'Écran 27" 4K',
      quantity: 3,
      unitPrice: 450,
      discount: 0,
      taxRate: 16,
      total: 1566,
    },
    {
      id: '3',
      productId: 'P003',
      description: 'Clavier Mécanique',
      quantity: 2,
      unitPrice: 120,
      discount: 10,
      taxRate: 16,
      total: 224.64,
    },
  ],
  currency: 'USD',
  notes: 'Livraison incluse dans un délai de 5 jours ouvrables.\nInstallation et configuration disponibles sur demande.',
  terms: [
    'Paiement à 30 jours',
    'Garantie 12 mois sur tous les produits',
    'Prix hors taxes',
    'Validité du devis: 30 jours',
    'Les prix sont susceptibles de changer sans préavis',
  ],
  subtotal: 3750,
  totalDiscount: 132,
  totalTax: 578.88,
  total: 4196.88,
  charges: [
    { description: 'Frais de livraison', amount: 50 },
    { description: 'Installation', amount: 100 },
  ],
};

export default function PrintQuotation() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    if (!contentRef.current) return;

    try {
      // Show loading state
      const downloadButton = document.querySelector('[data-download-button]');
      if (downloadButton) {
        downloadButton.setAttribute('disabled', 'true');
        downloadButton.innerHTML = 'Génération du PDF...';
      }

      // Create canvas from the content with better quality settings
      const canvas = await html2canvas(contentRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 794, // A4 width in pixels at 96 DPI
        windowHeight: 1123, // A4 height in pixels at 96 DPI
        onclone: (clonedDoc) => {
          // Apply print styles to the cloned document
          const style = clonedDoc.createElement('style');
          style.innerHTML = `
            body {
              font-family: Arial, sans-serif;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            table {
              page-break-inside: avoid;
            }
            tr {
              page-break-inside: avoid;
            }
            thead {
              display: table-header-group;
            }
            tfoot {
              display: table-footer-group;
            }
          `;
          clonedDoc.head.appendChild(style);
        }
      });

      // Calculate dimensions for A4
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Add the image to the PDF with proper margins
      const margin = 20; // 20mm margin on each side
      const contentWidth = imgWidth - (margin * 2);
      const contentHeight = (contentWidth * canvas.height) / canvas.width;
      
      pdf.addImage(
        canvas.toDataURL('image/png', 1.0),
        'PNG',
        margin,
        margin,
        contentWidth,
        contentHeight
      );

      // Save the PDF
      pdf.save(`devis-${mockQuotation.quoteNumber}.pdf`);

      // Reset button state
      if (downloadButton) {
        downloadButton.removeAttribute('disabled');
        downloadButton.innerHTML = '<svg class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Télécharger';
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Une erreur est survenue lors de la génération du PDF.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Print Controls - Hidden when printing */}
      <div className="no-print max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/quotations')}
            className="inline-flex items-center justify-center p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <Printer className="h-5 w-5 mr-2" />
              Imprimer
            </button>
            <button
              onClick={handleDownload}
              data-download-button
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="h-5 w-5 mr-2" />
              Télécharger
            </button>
          </div>
        </div>
      </div>

      {/* Quotation Content */}
      <div ref={contentRef} className="max-w-[210mm] mx-auto bg-white shadow-sm print-only">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-start">
              <div className="space-y-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Devis #{mockQuotation.quoteNumber}
                  </h1>
                  <p className="mt-2 text-sm text-gray-500">
                    Créé le {new Date(mockQuotation.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold">Votre Entreprise</h2>
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">COMPTA PRO SARL</p>
                    <p>123 Avenue de l'Innovation</p>
                    <p>75001 Paris, France</p>
                    <p className="mt-1">Tél: +33 1 23 45 67 89</p>
                    <p>Email: contact@comptapro.fr</p>
                    <p>SIRET: 123 456 789 00012</p>
                    <p>TVA: FR 12 345678901</p>
                  </div>
                </div>
              </div>
              <div className="text-right text-sm text-gray-600">
                <p className="font-medium">Validité du devis</p>
                <p>30 jours à compter de la date d'émission</p>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Informations Client</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Nom du client</p>
                <p className="text-sm text-gray-900">{mockQuotation.customerName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Devise</p>
                <p className="text-sm text-gray-900">{mockQuotation.currency}</p>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Articles</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantité
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Prix unitaire
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Remise
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      TVA
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockQuotation.items.map((item) => (
                    <tr key={item.id} className="hover:bg-white">
                      <td className="px-4 py-3 text-sm text-gray-900 whitespace-normal">
                        {item.description}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right whitespace-nowrap">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right whitespace-nowrap">
                        {item.unitPrice.toFixed(2)} {mockQuotation.currency}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right whitespace-nowrap">
                        {item.discount}%
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right whitespace-nowrap">
                        {item.taxRate}%
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right whitespace-nowrap">
                        {item.total.toFixed(2)} {mockQuotation.currency}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="mb-8">
            <div className="flex justify-end">
              <div className="w-80 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sous-total</span>
                  <span className="font-medium">
                    {mockQuotation.subtotal.toFixed(2)} {mockQuotation.currency}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Remises</span>
                  <span className="font-medium text-red-600">
                    -{mockQuotation.totalDiscount.toFixed(2)} {mockQuotation.currency}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">TVA</span>
                  <span className="font-medium">
                    {mockQuotation.totalTax.toFixed(2)} {mockQuotation.currency}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Frais divers</span>
                  <span className="font-medium">
                    {mockQuotation.charges.reduce((sum, charge) => sum + charge.amount, 0).toFixed(2)}{' '}
                    {mockQuotation.currency}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="text-base font-semibold text-gray-900">Total</span>
                    <span className="text-base font-bold text-blue-600">
                      {mockQuotation.total.toFixed(2)} {mockQuotation.currency}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notes and Terms */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Notes</h3>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{mockQuotation.notes}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Conditions</h3>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                  {mockQuotation.terms.map((term, index) => (
                    <li key={index}>{term}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>
        {`
          @media print {
            @page {
              size: A4;
              margin: 20mm;
            }
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
              font-family: 'Arial', sans-serif;
              background: white;
              margin: 0;
              padding: 0;
            }
            .no-print {
              display: none !important;
            }
            .print-only {
              display: block !important;
              width: 100% !important;
              max-width: none !important;
              margin: 0 !important;
              padding: 0 !important;
              box-shadow: none !important;
            }
            .print-only > div {
              padding: 0 !important;
            }
            .print\\:text-base {
              font-size: 12pt;
            }
            .print\\:text-lg {
              font-size: 14pt;
            }
            .print\\:text-3xl {
              font-size: 24pt;
            }
            table {
              page-break-inside: avoid;
              width: 100% !important;
              table-layout: fixed;
            }
            th, td {
              padding: 8px 4px !important;
              word-wrap: break-word;
              overflow-wrap: break-word;
            }
            tr {
              page-break-inside: avoid;
            }
            thead {
              display: table-header-group;
            }
            tfoot {
              display: table-footer-group;
            }
            .print\\:whitespace-normal {
              white-space: normal !important;
            }
            .print\\:whitespace-nowrap {
              white-space: nowrap !important;
            }
          }
        `}
      </style>
    </div>
  );
} 