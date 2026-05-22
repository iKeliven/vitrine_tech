import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function useCompanyAuth() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login(email, password) {

    try {

      setLoading(true);
      setError("");

      const response = await api.post("/company-auth/login", {
        email,
        password
      });

      localStorage.setItem(
        "companyToken",
        response.data.token
      );

      localStorage.setItem(
        "companyData",
        JSON.stringify(response.data.company)
      );

      navigate("/dashboard-empresa");

    } catch (err) {

      setError(
        err.response?.data?.erro ||
        "Erro ao fazer login"
      );

    } finally {
      setLoading(false);
    }
  }

  return {
    login,
    loading,
    error
  };
}