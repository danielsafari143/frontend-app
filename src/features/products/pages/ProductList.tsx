import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Search,
  Filter,
  Plus,
  Package,
  Tag,
  DollarSign,
  Edit2,
  Trash2,
  Eye,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Image as ImageIcon,
} from 'lucide-react';
import DeleteProductConfirmation from '../components/DeleteProductConfirmation';
import { toast } from 'react-hot-toast';
import ProductDetails from '../components/ProductDetails';

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

export default function ProductList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'product' | 'service' | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Sample data for demonstration
  const products: Product[] = [
    {
      id: 'PRD001',
      name: 'Consultation Comptable',
      description: 'Service de consultation comptable professionnelle',
      price: 150,
      category: 'Services Comptables',
      stock: 0,
      status: 'active',
      type: 'service',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
    },
    {
      id: 'PRD002',
      name: 'Logiciel de Comptabilité Pro',
      description: 'Logiciel complet de gestion comptable',
      price: 299.99,
      category: 'Logiciels',
      stock: 50,
      status: 'active',
      type: 'product',
      image: 'https://example.com/software.jpg',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-15',
    },
  ];

  const toggleItem = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const handleDelete = (item: Product) => {
    setProductToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // TODO: Implement delete logic
    console.log('Deleting item:', productToDelete);
    toast.success(`${productToDelete?.type === 'product' ? 'Produit' : 'Service'} supprimé avec succès`);
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle2 className="w-4 h-4" />;
      case 'inactive': return <XCircle className="w-4 h-4" />;
      case 'out_of_stock': return <AlertCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailsModalOpen(true);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery?.toLowerCase() || '') ||
      product.description.toLowerCase().includes(searchQuery?.toLowerCase() || '');
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesType = !selectedType || product.type === selectedType;
    const matchesStatus = !selectedStatus || product.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesType && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Package className="w-7 h-7 text-blue-600" />
                    Produits et Services
                  </h1>
                  <p className="text-gray-500">Gérez vos produits et services</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate('/products/new')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Nouveau
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl border shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={selectedType || ''}
              onChange={(e) => setSelectedType(e.target.value as 'product' | 'service' | null)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tous les types</option>
              <option value="product">Produits</option>
              <option value="service">Services</option>
            </select>
            <select
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Toutes les catégories</option>
              <option value="Services Comptables">Services Comptables</option>
              <option value="Logiciels">Logiciels</option>
              <option value="Formation">Formation</option>
            </select>
            <select
              value={selectedStatus || ''}
              onChange={(e) => setSelectedStatus(e.target.value || null)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tous les statuts</option>
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
              <option value="out_of_stock">Rupture de stock</option>
            </select>
          </div>
        </div>

        {/* Items List */}
        <div className="space-y-4">
          {filteredProducts.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border shadow-sm overflow-hidden">
              {/* Item Card Header */}
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      {item.type === 'product' ? (
                        <Package className="w-6 h-6 text-blue-600" />
                      ) : (
                        <Tag className="w-6 h-6 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="capitalize">{item.type}</span>
                        <span className="mx-2">•</span>
                        <span>{item.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full ${getStatusColor(item.status)}`}>
                      {getStatusIcon(item.status)}
                      {item.status === 'active' ? 'Actif' :
                       item.status === 'inactive' ? 'Inactif' : 'Rupture de stock'}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewDetails(item)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Voir les détails"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => navigate(`/products/${item.id}/edit`)}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        {expandedItems.has(item.id) ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedItems.has(item.id) && (
                <div className="border-t bg-gray-50">
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Description */}
                      <div className="bg-white rounded-lg p-4 border">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">
                          Description
                        </h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>

                      {/* Price and Stock */}
                      <div className="bg-white rounded-lg p-4 border">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">
                          Prix et Stock
                        </h4>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600 flex items-center gap-2">
                            <DollarSign className="w-4 h-4" /> {item.price.toFixed(2)} €
                          </p>
                          {item.type === 'product' && (
                            <p className="text-sm text-gray-600">
                              Stock: {item.stock} unités
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="bg-white rounded-lg p-4 border">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">
                          Informations supplémentaires
                        </h4>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">
                            Créé le: {new Date(item.createdAt).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-600">
                            Mis à jour le: {new Date(item.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          isOpen={isDetailsModalOpen}
          onClose={() => {
            setIsDetailsModalOpen(false);
            setSelectedProduct(null);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <DeleteProductConfirmation
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setProductToDelete(null);
          }}
          onConfirm={confirmDelete}
          productName={productToDelete.name}
          productType={productToDelete.type}
        />
      )}
    </div>
  );
} 