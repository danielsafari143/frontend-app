import React, { useState } from 'react';
import { 
  FileType, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  Download, 
  Check,
  X,
  Search,
  Filter,
  Upload,
  Copy,
  Share2,
  Settings2
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
  lastModified: string;
  preview: string;
  category: 'standard' | 'custom' | 'premium';
  usageCount: number;
  tags: string[];
}

const initialTemplates: Template[] = [
  {
    id: '1',
    name: 'Standard OHADA',
    description: 'Template standard conforme aux normes OHADA',
    isDefault: true,
    lastModified: '2024-03-20',
    preview: 'standard-ohada.png',
    category: 'standard',
    usageCount: 1250,
    tags: ['OHADA', 'Standard', 'Professionnel']
  },
  {
    id: '2',
    name: 'Minimaliste',
    description: 'Design épuré et professionnel',
    isDefault: false,
    lastModified: '2024-03-19',
    preview: 'minimalist.png',
    category: 'custom',
    usageCount: 850,
    tags: ['Minimaliste', 'Moderne']
  },
  {
    id: '3',
    name: 'Détaillé',
    description: 'Template avec informations détaillées',
    isDefault: false,
    lastModified: '2024-03-18',
    preview: 'detailed.png',
    category: 'premium',
    usageCount: 450,
    tags: ['Détaillé', 'Premium', 'Complet']
  }
];

export default function InvoiceTemplates() {
  const [templates, setTemplates] = useState<Template[]>(initialTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const handleSetDefault = (templateId: string) => {
    setTemplates(templates.map(template => ({
      ...template,
      isDefault: template.id === templateId
    })));
  };

  const handleDelete = (templateId: string) => {
    setTemplates(templates.filter(template => template.id !== templateId));
  };

  const handleDuplicate = (templateId: string) => {
    const templateToDuplicate = templates.find(t => t.id === templateId);
    if (templateToDuplicate) {
      const newTemplate = {
        ...templateToDuplicate,
        id: Date.now().toString(),
        name: `${templateToDuplicate.name} (Copie)`,
        isDefault: false,
        lastModified: new Date().toISOString().split('T')[0]
      };
      setTemplates([...templates, newTemplate]);
    }
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <FileType className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Modèles de factures</h1>
        </div>
        <p className="text-gray-600">
          Gérez vos modèles de factures personnalisés
        </p>
      </div>

      {/* Actions Bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:max-w-md">
            <input
              type="text"
              placeholder="Rechercher un modèle..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            <Filter className="w-5 h-5" />
            Filtres
          </button>
        </div>
        <div className="flex gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            <Upload className="w-5 h-5" />
            Importer
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-5 h-5" />
            Nouveau modèle
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex flex-wrap gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Toutes les catégories</option>
              <option value="standard">Standard</option>
              <option value="custom">Personnalisé</option>
              <option value="premium">Premium</option>
            </select>
          </div>
        </div>
      )}

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Template Preview */}
            <div className="aspect-[3/4] bg-gray-100 relative group">
              <img
                src={`/templates/${template.preview}`}
                alt={template.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => setSelectedTemplate(template)}
                  className="p-2 bg-white rounded-full hover:bg-gray-100"
                >
                  <Eye className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={() => handleDuplicate(template.id)}
                  className="p-2 bg-white rounded-full hover:bg-gray-100"
                >
                  <Copy className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 bg-white rounded-full hover:bg-gray-100"
                >
                  <Edit2 className="w-5 h-5 text-gray-700" />
                </button>
              </div>
              {template.isDefault && (
                <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                  Par défaut
                </div>
              )}
              <div className="absolute bottom-2 left-2 bg-black/75 text-white px-2 py-1 rounded-full text-xs">
                {template.usageCount} utilisations
              </div>
            </div>

            {/* Template Info */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                  <span className="text-xs text-gray-500 capitalize">{template.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(template.id)}
                    className="p-1 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Settings2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">{template.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {template.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Dernière modification: {template.lastModified}</span>
                <button
                  onClick={() => handleSetDefault(template.id)}
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded ${
                    template.isDefault
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {template.isDefault ? (
                    <>
                      <Check className="w-4 h-4" />
                      Par défaut
                    </>
                  ) : (
                    'Définir par défaut'
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full mx-4">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedTemplate.name}
                </h3>
                <p className="text-sm text-gray-500">{selectedTemplate.description}</p>
              </div>
              <button
                onClick={() => setSelectedTemplate(null)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <img
                src={`/templates/${selectedTemplate.preview}`}
                alt={selectedTemplate.name}
                className="w-full h-auto"
              />
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Utilisé {selectedTemplate.usageCount} fois</span>
                <span>•</span>
                <span>Dernière modification: {selectedTemplate.lastModified}</span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Fermer
                </button>
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Download className="w-4 h-4" />
                  Télécharger
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 