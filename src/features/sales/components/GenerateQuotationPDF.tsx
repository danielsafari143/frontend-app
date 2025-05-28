import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { commonPrintStyles } from './pdfStyles';

interface GenerateQuotationPDFProps {
  contentRef: React.RefObject<HTMLDivElement | null>;
  quoteNumber: string;
  onStart?: () => void;
  onComplete?: () => void;
  onError?: (error: Error) => void;
}

export const generateQuotationPDF = async ({
  contentRef,
  quoteNumber,
  onStart,
  onComplete,
  onError
}: GenerateQuotationPDFProps) => {
  if (!contentRef.current) return;

  try {
    onStart?.();

    const printContainer = document.createElement('div');
    printContainer.style.width = '794px';
    printContainer.style.padding = '32px';
    printContainer.style.backgroundColor = '#ffffff';
    printContainer.style.position = 'absolute';
    printContainer.style.left = '-9999px';
    printContainer.style.top = '-9999px';

    const content = contentRef.current.cloneNode(true) as HTMLElement;
    printContainer.appendChild(content);
    document.body.appendChild(printContainer);

    const canvas = await html2canvas(printContainer, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 794,
      windowHeight: 1123,
      onclone: (clonedDoc) => {
        const elementsToRemove = clonedDoc.querySelectorAll(
          'button, [role="button"], .no-print, [data-download-button], [data-print-button], [data-send-button], .inline-flex, .flex.items-center.gap-2'
        );
        elementsToRemove.forEach(element => element.remove());

        const style = clonedDoc.createElement('style');
        style.innerHTML = commonPrintStyles;
        clonedDoc.head.appendChild(style);

        const allElements = clonedDoc.getElementsByTagName('*');
        for (let i = 0; i < allElements.length; i++) {
          const element = allElements[i];
          if (
            element.hasAttribute('onclick') ||
            element.hasAttribute('onmouseover') ||
            element.hasAttribute('onmouseout') ||
            element.getAttribute('role') === 'button' ||
            element.classList.contains('inline-flex') ||
            element.classList.contains('flex')
          ) {
            element.remove();
          }
        }
      }
    });

    document.body.removeChild(printContainer);

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pdf = new jsPDF('p', 'mm', 'a4');

    const margin = 20;
    const contentWidth = imgWidth - margin * 2;
    const contentHeight = (contentWidth * canvas.height) / canvas.width;

    pdf.addImage(
      canvas.toDataURL('image/png', 1.0),
      'PNG',
      margin,
      margin,
      contentWidth,
      contentHeight
    );

    pdf.save(`devis-${quoteNumber}.pdf`);
    onComplete?.();
  } catch (error) {
    console.error('Error generating PDF:', error);
    onError?.(error as Error);
  }
};
