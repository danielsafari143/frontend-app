import React, { useState } from 'react';
import { ArrowDownRight, ArrowUpRight, ChevronDown, ChevronUp, Printer, X } from 'lucide-react';

interface CashFlowReportData {
  ref: string;
  libelle: string;
  note?: string;
  exerciceN?: number | string;
  exerciceNMinus1?: number | string;
  isSectionHeader?: boolean;
  isSubtotal?: boolean;
  isTotal?: boolean;
  details?: string;
}

export default function OhadaCashFlowReport() {
  const [selectedRow, setSelectedRow] = useState<CashFlowReportData | null>(null);

  const handlePrint = () => {
    window.print();
  };

  const openDetails = (row: CashFlowReportData) => {
    setSelectedRow(row);
  };

  const closeDetails = () => {
    setSelectedRow(null);
  };

  // Mock data based on the provided OHADA table image
  const reportData: CashFlowReportData[] = [
    {
      ref: 'ZA',
      libelle: 'Trésorerie nette au 1er janvier',
      note: 'A',
      exerciceN: 74584157,
      exerciceNMinus1: 33595404,
    },
    {
      ref: '',
      libelle: 'Flux de trésorerie provenant des activités opérationnelles',
      isSectionHeader: true,
    },
    {
      ref: 'FA',
      libelle: 'Capacité d\'Autofinancement Globale (CAFG)',
      note: '',
      exerciceN: 241773904,
      exerciceNMinus1: 150177096,
    },
    {
      ref: 'FB',
      libelle: 'Variations de l\'actif circulant HAO',
      note: '',
      exerciceN: -2000000,
      exerciceNMinus1: 0,
    },
    {
      ref: 'FC',
      libelle: 'Variation des stocks',
      note: '',
      exerciceN: -2691705,
      exerciceNMinus1: 945953,
    },
    {
      ref: 'FD',
      libelle: 'Variation des créances et emplois assimilés',
      note: '',
      exerciceN: -45792222,
      exerciceNMinus1: -25371738,
    },
    {
      ref: 'FE',
      libelle: 'Variation du passif circulant',
      note: '',
      exerciceN: -21054994,
      exerciceNMinus1: -27602541,
    },
    {
      ref: '',
      libelle: 'Variation du BFG lié aux opérations opérationnelles',
      note: '',
      exerciceN: '71 538 921',
      exerciceNMinus1: '52 028 326',
      isSubtotal: true,
    },
    {
      ref: 'ZB',
      libelle: 'Flux de trésorerie provenant des activités opérationnelles (somme FA à FE)',
      note: 'B',
      exerciceN: 170234983,
      exerciceNMinus1: 98148770,
      isTotal: true,
    },
    {
      ref: '',
      libelle: 'Flux de trésorerie provenant des activités d\'investissements',
      isSectionHeader: true,
    },
    {
      ref: 'FF',
      libelle: 'Décaissements liés aux acquisitions d\'immobilisations incorporelles',
      note: '',
      exerciceN: -2000000,
      exerciceNMinus1: 0,
    },
    {
      ref: 'FG',
      libelle: 'Décaissements liés aux acquisitions d\'immobilisations corporelles',
      note: '',
      exerciceN: -327218000,
      exerciceNMinus1: -17971503,
    },
    {
      ref: 'FH',
      libelle: 'Décaissements liés aux acquisitions d\'immobilisations financières',
      note: '',
      exerciceN: -601175,
      exerciceNMinus1: -958379,
    },
    {
      ref: 'FI',
      libelle: '+ Encaissements liés aux cessions d\'immobilisations incorporelles et corporelles',
      note: '',
      exerciceN: 367119,
      exerciceNMinus1: 590000,
    },
    {
      ref: 'FJ',
      libelle: '+ Encaissements liés aux cessions d\'immobilisations financières',
      note: '',
      exerciceN: 730043,
      exerciceNMinus1: 1179865,
    },
    {
      ref: 'ZC',
      libelle: 'Flux de trésorerie provenant des opérations d\'investissement (somme FE à FJ)',
      note: 'C',
      exerciceN: -328722013,
      exerciceNMinus1: -17160017,
      isTotal: true,
    },
    {
      ref: '',
      libelle: 'Flux de trésorerie provenant du financement par les capitaux propres',
      isSectionHeader: true,
    },
    {
      ref: 'FK',
      libelle: '+ Augmentations de capital par apports nouveaux',
      note: '',
      exerciceN: 200000000,
      exerciceNMinus1: 0,
    },
    {
      ref: 'FL',
      libelle: '+ Subventions d\'investissement',
      note: '',
      exerciceN: 2000000,
      exerciceNMinus1: 0,
    },
    {
      ref: 'FN',
      libelle: '- Distribution de dividendes',
      note: '',
      exerciceN: -90000000,
      exerciceNMinus1: -40000000,
    },
    {
      ref: 'ZD',
      libelle: 'Flux de trésorerie provenant des capitaux propres (somme FK à FN)',
      note: 'D',
      exerciceN: 112000000,
      exerciceNMinus1: -40000000,
      isTotal: true,
    },
    {
      ref: '',
      libelle: 'Trésorerie provenant du financement par les capitaux étrangers',
      isSectionHeader: true,
    },
    {
      ref: 'FO',
      libelle: '+ Emprunts',
      note: '',
      exerciceN: 100000000,
      exerciceNMinus1: 0,
    },
    {
      ref: 'FQ',
      libelle: '- Remboursements des emprunts et autres dettes financières',
      note: '',
      exerciceN: -5000000,
      exerciceNMinus1: 0,
    },
    {
      ref: 'ZE',
      libelle: 'Flux de Trésorerie provenant des capitaux étrangers (somme FO à FQ)',
      note: 'E',
      exerciceN: 95000000,
      exerciceNMinus1: 0,
      isTotal: true,
    },
    {
      ref: 'ZF',
      libelle: 'Flux de trésorerie provenant des activités de financement (D+E)',
      note: 'F',
      exerciceN: 207000000,
      exerciceNMinus1: -40000000,
      isTotal: true,
    },
    {
      ref: 'ZF',
      libelle: 'VARIATION DE LA TRÉSORERIE NETTE DE LA PÉRIODE (B+C+F)',
      note: 'G',
      exerciceN: 48512970,
      exerciceNMinus1: 40988753,
      isTotal: true,
    },
    {
      ref: 'ZH',
      libelle: 'Trésorerie nette au 31 Décembre (G+A)',
      note: 'H',
      exerciceN: 123097127,
      exerciceNMinus1: 74584157,
      isTotal: true,
    },
    {
      ref: '',
      libelle: 'Contrôle : Trésorerie actif N - Trésorerie passif N',
      note: '',
      exerciceN: '',
      exerciceNMinus1: '',
      isTotal: true,
    },
  ];

  const formatCurrency = (amount: number | string | undefined) => {
    if (amount === undefined || amount === '') return '';
    if (typeof amount === 'string') return amount;
    return amount.toLocaleString('fr-FR');
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="flex-1 overflow-hidden p-4">
        <div className="h-full flex flex-col bg-white rounded-xl shadow-sm border">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Tableau de Flux de Trésorerie (OHADA)</h2>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Printer size={18} />
              <span>Imprimer</span>
            </button>
          </div>
          
          <div className="flex-1 overflow-auto">
            <div className="min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">REF</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LIBELLES</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">Note</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-48">EXERCICE N</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-48">EXERCICE N-1</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-16">Détails</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {reportData.map((row, index) => (
                      <tr
                        key={index}
                        className={`${
                          row.isSectionHeader ? 'bg-gray-100 font-semibold' :
                          row.isSubtotal ? 'bg-blue-50 text-blue-800' :
                          row.isTotal ? 'bg-gray-200 font-bold' :
                          'hover:bg-gray-50'
                        }`}
                      >
                        <td className={`px-4 py-3 whitespace-nowrap text-sm ${row.isTotal ? 'text-gray-900' : 'text-gray-500'}`}>
                          {row.ref}
                        </td>
                        <td className={`px-4 py-3 text-sm ${row.isTotal ? 'text-gray-900' : 'text-gray-900'} ${row.isSectionHeader ? 'col-span-4' : ''}`}>
                          {row.isSectionHeader ? row.libelle : (
                            <span className={`${row.libelle.startsWith('+') ? 'text-green-600' : row.libelle.startsWith('-') ? 'text-red-600' : ''}`}>
                              {row.libelle}
                            </span>
                          )}
                        </td>
                        {!row.isSectionHeader && (
                          <>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {row.note}
                            </td>
                            <td className={`px-4 py-3 whitespace-nowrap text-sm text-right ${row.isTotal ? 'font-bold text-gray-900' : (typeof row.exerciceN === 'number' && row.exerciceN < 0 ? 'text-red-600' : 'text-gray-900')}`}>
                              {formatCurrency(row.exerciceN)}
                            </td>
                            <td className={`px-4 py-3 whitespace-nowrap text-sm text-right ${row.isTotal ? 'font-bold text-gray-900' : (typeof row.exerciceNMinus1 === 'number' && row.exerciceNMinus1 < 0 ? 'text-red-600' : 'text-gray-900')}`}>
                              {formatCurrency(row.exerciceNMinus1)}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                              {!row.isSectionHeader && !row.isTotal && (
                                <button
                                  onClick={() => openDetails(row)}
                                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                  <ChevronDown size={18} className="text-gray-500" />
                                </button>
                              )}
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedRow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full mx-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Détails de la ligne</h3>
                <button
                  onClick={closeDetails}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Référence</p>
                    <p className="mt-1 text-sm text-gray-900">{selectedRow.ref}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Note</p>
                    <p className="mt-1 text-sm text-gray-900">{selectedRow.note || 'Non spécifiée'}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Libellé</p>
                  <p className="mt-1 text-sm text-gray-900">{selectedRow.libelle}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Exercice N</p>
                    <p className={`mt-1 text-sm ${typeof selectedRow.exerciceN === 'number' && selectedRow.exerciceN < 0 ? 'text-red-600' : 'text-gray-900'}`}>
                      {formatCurrency(selectedRow.exerciceN)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Exercice N-1</p>
                    <p className={`mt-1 text-sm ${typeof selectedRow.exerciceNMinus1 === 'number' && selectedRow.exerciceNMinus1 < 0 ? 'text-red-600' : 'text-gray-900'}`}>
                      {formatCurrency(selectedRow.exerciceNMinus1)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeDetails}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .h-screen, .h-screen * {
              visibility: visible;
            }
            .h-screen {
              position: absolute;
              left: 0;
              top: 0;
            }
            button {
              display: none !important;
            }
          }
        `}
      </style>
    </div>
  );
} 