import styles from "./CreateProjectPage.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../componentes/Input/Input";
import Button from "../../componentes/Button/Button";
import Title from "../../componentes/Title/Title";

import { FiArrowRight } from "react-icons/fi";

import api from "../../services/api";

export default function CreateProjectPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    techs: "",
    github: "",
    image: null
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setForm((prev) => ({
      ...prev,
      image: file
    }));

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      if (!form.title || !form.description || !form.techs) {
        setError("Preencha título, descrição e tecnologias");
        setLoading(false);
        return;
      }

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.description);

      formData.append(
        "techs",
        JSON.stringify(
          form.techs
            .split(",")
            .map((tech) => tech.trim())
            .filter((tech) => tech !== "")
        )
      );

      if (form.github) {
        formData.append("github", form.github);
      }

      if (form.image) {
        formData.append("images", form.image);
      }

      await api.post("/projects", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      navigate("/profile-page");

    } catch (err) {
      console.error("Erro ao criar projeto:", err);

      setError(
        err.response?.data?.error ||
        "Erro ao publicar projeto"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit}>

        <Title size="md">
          Novo projeto
        </Title>

        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}

        <Input
          label="Título"
          name="title"
          placeholder="Nome do projeto"
          value={form.title}
          onChange={handleChange}
          required
        />

        <Input
          label="Descrição"
          name="description"
          placeholder="Descreva seu projeto"
          value={form.description}
          onChange={handleChange}
          required
        />

        <Input
          label="Tecnologias"
          name="techs"
          placeholder="React, Node.js, PostgreSQL"
          value={form.techs}
          onChange={handleChange}
          required
        />

        <Input
          label="GitHub"
          name="github"
          placeholder="https://github.com/seuusuario/projeto"
          value={form.github}
          onChange={handleChange}
        />

        <div className={styles.upload}>
          <label>
            Imagem do projeto
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
          />

          {preview && (
            <img
              src={preview}
              alt="Preview do projeto"
              className={styles.preview}
            />
          )}
        </div>

        <Button
          type="submit"
          rightIcon={<FiArrowRight />}
          disabled={loading}
        >
          {loading ? "Publicando..." : "Publicar projeto"}
        </Button>

      </form>
    </div>
  );
}