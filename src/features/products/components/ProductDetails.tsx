import React from 'react';
import { X } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  status: 'active' | 'inactive' | 'out_of_stock';
  type: 'product' | 'service';
  image?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductDetailsProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetails({ product, isOpen, onClose }: ProductDetailsProps) {
  if (!isOpen) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'out_of_stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'inactive':
        return 'Inactif';
      case 'out_of_stock':
        return 'Rupture de stock';
      default:
        return status;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Détails du {product.type === 'product' ? 'produit' : 'service'}
                  </h3>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-4">
                  {product.image && (
                    <div className="mb-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Nom</h4>
                      <p className="mt-1 text-sm text-gray-900">{product.name}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Description</h4>
                      <p className="mt-1 text-sm text-gray-900">{product.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Prix</h4>
                        <p className="mt-1 text-sm text-gray-900">
                          {product.price.toLocaleString('fr-FR')} FCFA
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Catégorie</h4>
                        <p className="mt-1 text-sm text-gray-900">{product.category}</p>
                      </div>
                    </div>

                    {product.type === 'product' && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Stock</h4>
                        <p className="mt-1 text-sm text-gray-900">{product.stock} unités</p>
                      </div>
                    )}

                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Statut</h4>
                      <span className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                        {getStatusText(product.status)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Créé le</h4>
                        <p className="mt-1 text-sm text-gray-900">
                          {new Date(product.createdAt).toLocaleDateString('fr-FR')}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Mis à jour le</h4>
                        <p className="mt-1 text-sm text-gray-900">
                          {new Date(product.updatedAt).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 