import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

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
import AboutSection from '../../componentes/AboutSection/AboutSection';
import CTA from '../../componentes/CTA/CTA';

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const benefits = [
    {
      label: "Acompanhe todos os seus projetos patrocinados em tempo real",
      icon: <FiBarChart2 />
    },
    {
      label: "Navegue entre os melhores projetos e alunos da comunidade",
      icon: <FiUsers />
    },
    {
      label: "Controle suas ofertas, aprovações e comunicação com alunos",
      icon: <FiBriefcase />
    },
    {
      label: "Tenha insights sobre ROI e impacto de seus investimentos",
      icon: <FiTrendingUp />
    }
  ];


  function handleLogin() {
    navigate("/cadastro-empresa");
  }

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
    <>
      <PageLayout
        title="Empresas apoiadoras"
        heroTitle="Painel da Empresa"
        heroDescription="Gerencie seus patrocínios e invista em talentos"
        subtitle="Empresas que apoiam alunos"
        placeholder="Buscar empresa..."
        data={companies}
        infoTitle="Painel da Empresa"
        infoDescription="Gerencie seus patrocínios e invista em talentos"
        features={benefits}
        stats={companyStats}
        renderItem={(company) => (
          <CompanyCard
            key={company.id}
            {...company}
          />

        )}
      />
      <AboutSection
        title="Por que usar o"
        highlight="VitrineTech?"
        list={benefits}
      />

      <CTA
        title="Faça parte da VitrineTech"
        buttonText="Começar agora"
        onClick={handleLogin}
      />
    </>
  );
}
