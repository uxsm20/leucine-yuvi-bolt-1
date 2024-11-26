import { useState } from 'react';
import CompanyCard from '../components/CompanyCard';
import CreateCompanyModal from '../components/CreateCompanyModal';
import { PlusIcon } from '@heroicons/react/24/outline';

interface Application {
  name: string;
  status: 'Identified' | 'Live' | 'Development' | 'Testing' | 'Planning' | 'Review' | 'Paused' | 'Archived';
}

interface Company {
  id: number;
  name: string;
  description: string;
  applications: Application[];
  users: number;
}

const initialCompanies: Company[] = [
  {
    id: 1,
    name: "Pfizer",
    description: "Global pharmaceutical company focused on innovative medicines",
    applications: [
      { name: "Clinical Trial Management System", status: "Development" },
      { name: "Drug Safety Monitoring Platform", status: "Testing" },
      { name: "Research Data Analytics Suite", status: "Identified" },
      { name: "Patient Registry Platform", status: "Live" }
    ],
    users: 128
  },
  {
    id: 2,
    name: "Novartis",
    description: "Leading healthcare solutions provider",
    applications: [
      { name: "Patient Engagement Portal", status: "Review" },
      { name: "Supply Chain Optimization Tool", status: "Planning" },
      { name: "Quality Management System", status: "Live" },
      { name: "Clinical Data Platform", status: "Development" }
    ],
    users: 95
  },
  {
    id: 3,
    name: "Roche",
    description: "Pioneer in pharmaceuticals and diagnostics",
    applications: [
      { name: "Laboratory Information System", status: "Development" },
      { name: "Regulatory Compliance Platform", status: "Identified" },
      { name: "Clinical Data Management System", status: "Testing" },
      { name: "Healthcare Analytics Suite", status: "Planning" }
    ],
    users: 156
  }
];

const CompaniesPage = () => {
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateCompany = ({ name, description }: { name: string; description: string }) => {
    const newCompany: Company = {
      id: companies.length + 1,
      name,
      description,
      applications: [],
      users: 0
    };
    setCompanies([...companies, newCompany]);
    setIsModalOpen(false);
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Companies</h1>
            <p className="text-gray-400 mt-1">Manage your organizations and their applications</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Create Company
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      </div>

      <CreateCompanyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateCompany}
      />
    </div>
  );
};

export default CompaniesPage;