import { useState, useEffect } from 'react';

import PageLayout from '../../layouts/PageLayout';
import CompanyCard from '../../componentes/Cards/CompanyCard';
import Loading from '../../componentes/Loading/Loading;
import api from '../../services/api';

export default function CompaniesPage() {

  const [companies, setCompanies] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await api.get("/companies");

      setCompanies(response.data);

    } catch (error) {

      console.error(
        "Erro ao buscar empresas:",
        error
      );

      setError(
        error.response?.data?.error ||
        "Erro ao carregar empresas"
      );

      setCompanies([]);

    } finally {

      setLoading(false);
    }
  };

  if (loading) {
    return (
   
        <Loading />
      
    );
  }

  if (error) {
    return (
      <div>
        {error}
      </div>
    );
  }

  return (
    <PageLayout
      title="Empresas apoiadoras"

      heroTitle="Empresas que apoiam talentos"

      heroDescription="
        Conheça empresas parceiras que investem
        em inovação, aprendizado e desenvolvimento
        de novos profissionais da tecnologia.
      "

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