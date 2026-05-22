import { useState, useEffect } from 'react';

import PageLayout from '../../layouts/PageLayout';
import CompanyCard from '../../componentes/Cards/CompanyCard';

import api from '../../services/api';

export default function CompaniesPage() {

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {

    try {

      const response = await api.get("/companies");

      setCompanies(response.data);

    } catch (error) {

      console.error(
        "Erro ao buscar empresas:",
        error
      );

      setCompanies([]);
    }
  };

  return (
    <PageLayout
      title="Empresas apoiadoras"
      subtitle="Empresas que apoiam alunos"
      placeholder="Buscar empresa..."
      data={companies}
      renderItem={(company) => (
        <CompanyCard
          key={company.id}
          {...company}
        />
      )}
    />
  );
}