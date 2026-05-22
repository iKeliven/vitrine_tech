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

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleImage = (e) => {

    setForm({
      ...form,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);
    setError("");

    try {

      const formData = new FormData();

      formData.append("title", form.title);

      formData.append(
        "description",
        form.description
      );

      formData.append(
        "github",
        form.github
      );

      formData.append(
        "techs",
        JSON.stringify(
          form.techs
            .split(",")
            .map((tech) => tech.trim())
        )
      );

      if (form.image) {
        formData.append(
          "image",
          form.image
        );
      }

      await api.post(
        "/projects",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      navigate("/profile-page");

    } catch (err) {

      console.error(
        "Erro ao criar projeto:",
        err
      );

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

      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >

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
          value={form.title}
          onChange={handleChange}
          required
        />

        <Input
          label="Descrição"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <Input
          label="Tecnologias (separadas por vírgula)"
          name="techs"
          placeholder="React, Node.js, PostgreSQL"
          value={form.techs}
          onChange={handleChange}
          required
        />

        <Input
          label="GitHub"
          name="github"
          placeholder="https://github.com/..."
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

        </div>

        <Button
          type="submit"
          rightIcon={<FiArrowRight />}
          disabled={loading}
        >

          {loading
            ? "Publicando..."
            : "Publicar projeto"}

        </Button>

      </form>

    </div>
  );
}