import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Package,
  Tag,
  DollarSign,
  Image as ImageIcon,
  Upload,
  X,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  status: 'active' | 'inactive' | 'out_of_stock';
  type: 'product' | 'service';
  image?: string;
}

export default function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
    status: 'active',
    type: 'product',
    image: undefined,
  });

  useEffect(() => {
    // TODO: Fetch product data using the id
    // This is a mock implementation
    const mockProduct = {
      name: 'Logiciel de Comptabilité Pro',
      description: 'Logiciel complet de gestion comptable',
      price: 299.99,
      category: 'Logiciels',
      stock: 50,
      status: 'active' as const,
      type: 'product' as const,
      image: 'https://example.com/software.jpg',
    };
    setFormData(mockProduct);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement product update logic
    console.log('Updating product:', formData);
    toast.success(`${formData.type === 'product' ? 'Produit' : 'Service'} mis à jour avec succès`);
    navigate('/products');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) : value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('L\'image ne doit pas dépasser 5MB');
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, image: imageUrl }));
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image: undefined }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/products')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Package className="w-7 h-7 text-blue-600" />
                  Modifier {formData.type === 'product' ? 'le Produit' : 'le Service'}
                </h1>
                <p className="text-gray-500">
                  Modifier les informations de {formData.type === 'product' ? 'ce produit' : 'ce service'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information Card */}
          <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-600" />
                Informations de base
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                    Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="product">Produit</option>
                    <option value="service">Service</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pricing and Category Card */}
          <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                Prix et catégorie
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Prix (€)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Catégorie
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Sélectionner une catégorie</option>
                    <option value="Services Comptables">Services Comptables</option>
                    <option value="Logiciels">Logiciels</option>
                    <option value="Formation">Formation</option>
                  </select>
                </div>
                {formData.type === 'product' && (
                  <div className="space-y-2">
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                      Stock
                    </label>
                    <input
                      type="number"
                      id="stock"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      required
                      min="0"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    Statut
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Actif</option>
                    <option value="inactive">Inactif</option>
                    {formData.type === 'product' && (
                      <option value="out_of_stock">Rupture de stock</option>
                    )}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Image Upload Card */}
          {formData.type === 'product' && (
            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-blue-600" />
                  Image du produit
                </h2>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4">
                  {formData.image ? (
                    <div className="relative">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-32 h-32 rounded-lg object-cover"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute -top-2 -right-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Choisir une image</span>
                    </label>
                    <p className="mt-1 text-sm text-gray-500">
                      PNG, JPG jusqu'à 5MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/products')}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" /> Enregistrer les modifications
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 