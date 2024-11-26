import { useState } from 'react';
import { CubeIcon } from '@heroicons/react/24/outline';

interface Entity {
  id: string;
  name: string;
  description: string;
  attributes: {
    name: string;
    type: string;
    required: boolean;
  }[];
  relationships: {
    entity: string;
    type: 'one-to-one' | 'one-to-many' | 'many-to-one' | 'many-to-many';
    description: string;
  }[];
}

const initialEntities: Entity[] = [
  {
    id: "e1",
    name: "Company",
    description: "Represents an organization in the system",
    attributes: [
      { name: "name", type: "string", required: true },
      { name: "industry", type: "string", required: true },
      { name: "foundedYear", type: "number", required: false }
    ],
    relationships: [
      { entity: "User", type: "one-to-many", description: "Company has many users" },
      { entity: "Project", type: "one-to-many", description: "Company has many projects" }
    ]
  },
  {
    id: "e2",
    name: "User",
    description: "System user profile",
    attributes: [
      { name: "email", type: "string", required: true },
      { name: "name", type: "string", required: true },
      { name: "role", type: "string", required: true }
    ],
    relationships: [
      { entity: "Company", type: "many-to-one", description: "User belongs to a company" },
      { entity: "Project", type: "many-to-many", description: "User works on many projects" }
    ]
  }
];

export default function OntologyPage() {
  const [entities] = useState<Entity[]>(initialEntities);

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Ontology</h1>
            <p className="text-gray-400">Manage system entities and their relationships</p>
          </div>
          <button className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors">
            <CubeIcon className="h-5 w-5 mr-2" />
            Add Entity
          </button>
        </div>

        <div className="space-y-6">
          {entities.map((entity) => (
            <div key={entity.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white mb-2">{entity.name}</h2>
                <p className="text-gray-400">{entity.description}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-3">Attributes</h3>
                  <div className="space-y-2">
                    {entity.attributes.map((attr) => (
                      <div key={attr.name} className="bg-gray-900 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-white font-medium">{attr.name}</span>
                          <span className="text-xs text-gray-400">{attr.type}</span>
                        </div>
                        {attr.required && (
                          <span className="text-xs text-indigo-400 mt-1">Required</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-3">Relationships</h3>
                  <div className="space-y-2">
                    {entity.relationships.map((rel, index) => (
                      <div key={index} className="bg-gray-900 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-white font-medium">{rel.entity}</span>
                          <span className="text-xs bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded-full">
                            {rel.type}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{rel.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}