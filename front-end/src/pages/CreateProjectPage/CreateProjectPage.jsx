import styles from "./CreateProjectPage.module.css";
import { useState } from "react";
import Input from "../../componentes/Input/Input";
import Button from "../../componentes/Button/Button";
import Title from "../../componentes/Title/Title";
import { FiArrowRight } from "react-icons/fi";

export default function CreateProjectPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    techs: "",
    github: "",
    image: null
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      techs: form.techs.split(",")
    };

    console.log(payload);

    // 👉 aqui depois conecta com API
  };

  return (
    <div className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit}>

        <Title size="md">Novo projeto</Title>

        <Input
          label="Título"
          name="title"
          value={form.title}
          onChange={handleChange}
        />

        <Input
          label="Descrição"
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        <Input
          label="Tecnologias (separadas por vírgula)"
          name="techs"
          value={form.techs}
          onChange={handleChange}
        />

        <Input
          label="GitHub"
          name="github"
          value={form.github}
          onChange={handleChange}
        />

        <input type="file" onChange={handleImage} />

        <Button type="submit" rightIcon={<FiArrowRight />}>
          Publicar projeto
        </Button>

      </form>
    </div>
  );
}