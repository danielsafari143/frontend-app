import React from 'react';
import {
  X,
  AlertTriangle,
  Trash2,
} from 'lucide-react';

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  title: string;
  itemName: string;
  itemType: string;
  customMessage?: string;
}

export default function DeleteConfirmation({
  isOpen,
  onClose,
  onDelete,
  title,
  itemName,
  itemType,
  customMessage,
}: DeleteConfirmationProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3 text-yellow-600">
            <AlertTriangle className="w-6 h-6" />
            <p className="font-medium">Êtes-vous sûr de vouloir supprimer ce {itemType} ?</p>
          </div>
          <p className="text-gray-600">
            {customMessage || `Cette action supprimera définitivement le ${itemType} <span className="font-medium">${itemName}</span> et toutes les données associées.
            Cette action est irréversible.`}
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 p-6 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" /> Supprimer
          </button>
        </div>
      </div>
    </div>
  );
} 