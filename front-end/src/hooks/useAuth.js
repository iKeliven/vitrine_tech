import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function useAuth() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login(email, password) {

    try {

      setLoading(true);
      setError("");

      const response = await api.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem(
        "studentToken",
        response.data.token
      );

      localStorage.setItem(
        "studentData",
        JSON.stringify(response.data.user)
      );

      navigate("/profile-page");

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