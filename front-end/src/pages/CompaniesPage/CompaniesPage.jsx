import { useState, useEffect } from 'react';
import PageLayout from '../../layouts/PageLayout';
import CompanyCard from '../../componentes/Cards/CompanyCard';
import { FiSearch } from 'react-icons/fi';

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    const mockData = [
      {
        id: 1,
        name: 'Google Brasil',
        category: 'Tecnologia',
        description: 'Patrocinando talentos',
        website: 'https://google.com.br',
        verified: true,
      },
      {
        id: 2,
        name: 'Adobe',
        category: 'Design',
        description: 'Apoiando criativos',
        website: 'https://adobe.com',
        verified: true,
      }
    ];

    setCompanies(mockData);
  };

  return (
    <PageLayout
      title="Empresas apoiadoras"
      subtitle="Empresas que apoiam alunos"
      placeholder="Buscar empresa..."
      data={companies}
      renderItem={(company) => (
        <CompanyCard {...company} />
      )}
    />
  );
}
