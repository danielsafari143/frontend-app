import React from "react";
import { Plus, Trash2, Save, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  role: string;
  order: number;
}

export default function NewWorkflow() {
  const navigate = useNavigate();
  const [workflowName, setWorkflowName] = React.useState("");
  const [workflowDescription, setWorkflowDescription] = React.useState("");
  const [steps, setSteps] = React.useState<WorkflowStep[]>([]);
  const [isActive, setIsActive] = React.useState(true);

  const addStep = () => {
    const newStep: WorkflowStep = {
      id: Date.now().toString(),
      name: "",
      description: "",
      role: "",
      order: steps.length + 1
    };
    setSteps([...steps, newStep]);
  };

  const removeStep = (stepId: string) => {
    setSteps(steps.filter(step => step.id !== stepId));
    // Reorder remaining steps
    setSteps(prevSteps => 
      prevSteps
        .filter(step => step.id !== stepId)
        .map((step, index) => ({ ...step, order: index + 1 }))
    );
  };

  const updateStep = (stepId: string, field: keyof WorkflowStep, value: string) => {
    setSteps(steps.map(step => 
      step.id === stepId ? { ...step, [field]: value } : step
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement workflow creation logic
    console.log({
      name: workflowName,
      description: workflowDescription,
      steps,
      isActive
    });
    navigate('/settings/workflows');
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/settings/workflows')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-2xl font-semibold text-gray-900">Nouveau Workflow</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom du Workflow
              </label>
              <input
                type="text"
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ex: Processus d'achat"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={workflowDescription}
                onChange={(e) => setWorkflowDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="Description détaillée du workflow"
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
              <span className="text-sm font-medium text-gray-700">Workflow actif</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Étapes du Workflow</h2>
            <button
              type="button"
              onClick={addStep}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus size={20} />
              <span>Ajouter une étape</span>
            </button>
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={step.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-900">Étape {step.order}</h3>
                  <button
                    type="button"
                    onClick={() => removeStep(step.id)}
                    className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom de l'étape
                    </label>
                    <input
                      type="text"
                      value={step.name}
                      onChange={(e) => updateStep(step.id, 'name', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ex: Création de la commande"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={step.description}
                      onChange={(e) => updateStep(step.id, 'description', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={2}
                      placeholder="Description de l'étape"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rôle responsable
                    </label>
                    <input
                      type="text"
                      value={step.role}
                      onChange={(e) => updateStep(step.id, 'role', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ex: Acheteur"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}

            {steps.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Aucune étape définie. Cliquez sur "Ajouter une étape" pour commencer.
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/settings/workflows')}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Save size={20} />
            <span>Enregistrer le Workflow</span>
          </button>
        </div>
      </form>
    </div>
  );
} 