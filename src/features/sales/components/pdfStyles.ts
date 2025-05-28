// pdfStyles.ts
export const commonPrintStyles = `
  @page {
    size: A4;
    margin: 20mm;
  }
  body {
    font-family: 'Arial', sans-serif;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    background: white;
    margin: 0;
    padding: 0;
  }

  /* === ELEMENTS À MASQUER === */
  button, [role="button"], .no-print, [data-download-button], [data-print-button], [data-send-button], .inline-flex, .flex.items-center.gap-2 {
    display: none !important;
  }

  /* === TYPOGRAPHIE === */
  .text-2xl { font-size: 24pt !important; }
  .text-lg  { font-size: 14pt !important; }
  .text-base{ font-size: 12pt !important; }
  .text-sm  { font-size: 10pt !important; }
  .text-xs  { font-size: 8pt  !important; }

  /* === TABLEAUX === */
  table {
    page-break-inside: avoid;
    width: 100% !important;
    table-layout: fixed;
    border-collapse: collapse;
  }
  th, td {
    padding: 8px 4px !important;
    word-wrap: break-word;
  }
  thead { display: table-header-group; }
  tfoot { display: table-footer-group; }
  tr { page-break-inside: avoid; }

  th:nth-child(1), td:nth-child(1) { width: 35%; }
  th:nth-child(2), td:nth-child(2) { width: 10%; }
  th:nth-child(3), td:nth-child(3) { width: 15%; }
  th:nth-child(4), td:nth-child(4) { width: 10%; }
  th:nth-child(5), td:nth-child(5) { width: 10%; }
  th:nth-child(6), td:nth-child(6) { width: 20%; }

  /* === ESPACEMENTS === */
  .space-y-4 > * + * { margin-top: 1rem !important; }
  .space-y-6 > * + * { margin-top: 1.5rem !important; }
  .space-y-8 > * + * { margin-top: 2rem !important; }
  .mb-8  { margin-bottom: 2rem !important; }
  .mt-2  { margin-top: 0.5rem !important; }
  .p-8   { padding: 2rem !important; }

  /* === COULEURS ET TEXTES === */
  .bg-white      { background-color: white !important; }
  .bg-gray-50    { background-color: #F9FAFB !important; }
  .text-gray-900 { color: #111827 !important; }
  .text-blue-600 { color: #2563EB !important; }
  .font-bold     { font-weight: 700 !important; }

  /* === LAYOUT === */
  .flex          { display: flex !important; }
  .justify-between { justify-content: space-between !important; }
  .grid          { display: grid !important; gap: 1rem !important; }
  .grid-cols-2   { grid-template-columns: repeat(2, 1fr) !important; }

  /* === BORDURES === */
  .border-t { border-top-width: 1px !important; }
  .border-gray-200 { border-color: #E5E7EB !important; }
  .rounded, .rounded-lg { border-radius: 0 !important; }
  .shadow, .shadow-sm { box-shadow: none !important; }
`;
