import { useState, useEffect } from 'react';

import {
  FiBarChart2,
  FiUsers,
  FiBriefcase,
  FiTrendingUp
} from 'react-icons/fi';

import PageLayout from '../../layouts/PageLayout';
import CompanyCard from '../../componentes/Cards/CompanyCard';
import Loading from '../../componentes/Loading/Loading';

import api from '../../services/api';

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const companyFeatures = [
    {
      label: "Dashboard Completo",
      description: "Acompanhe todos os seus projetos patrocinados em tempo real",
      icon: <FiBarChart2 />
    },
    {
      label: "Encontre Talentos",
      description: "Navegue entre os melhores projetos e alunos da comunidade",
      icon: <FiUsers />
    },
    {
      label: "Gerencie Patrocínios",
      description: "Controle suas ofertas, aprovações e comunicação com alunos",
      icon: <FiBriefcase />
    },
    {
      label: "Relatórios e Métricas",
      description: "Tenha insights sobre ROI e impacto de seus investimentos",
      icon: <FiTrendingUp />
    }
  ];

  const companyStats = [
    {
      value: "500+",
      label: "Projetos Ativos"
    },
    {
      value: "1000+",
      label: "Alunos Talentosos"
    },
    {
      value: "50+",
      label: "Empresas Parceiras"
    }
  ];

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
      console.error("Erro ao buscar empresas:", error);

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
    return <Loading />;
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
      heroTitle="Painel da Empresa"
      heroDescription="Gerencie seus patrocínios e invista em talentos"
      subtitle="Empresas que apoiam alunos"
      placeholder="Buscar empresa..."
      data={companies}
      infoTitle="Painel da Empresa"
      infoDescription="Gerencie seus patrocínios e invista em talentos"
      features={companyFeatures}
      stats={companyStats}
      renderItem={(company) => (
        <CompanyCard
          key={company.id}
          {...company}
        />
      )}
    />
  );
}