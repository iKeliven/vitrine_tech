import prisma from "../services/prisma.js";
import courseFallback from "../data/courseFallback.js";

export const getCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      where: {
        active: true
      },
      include: {
        modules: {
          include: {
            subjects: true
          },
          orderBy: {
            order: "asc"
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    res.json(courses);
  } catch (error) {
    console.error("Erro ao buscar cursos:", error);
    res.json(courseFallback);
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await prisma.course.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        modules: {
          include: {
            subjects: true
          },
          orderBy: {
            order: "asc"
          }
        }
      }
    });

    if (!course) {
      return res.status(404).json({
        error: "Curso não encontrado"
      });
    }

    res.json(course);
  } catch (error) {
    console.error("Erro ao buscar curso:", error);

    const course = courseFallback.find(
      (item) => item.id === Number(req.params.id)
    );

    if (!course) {
      return res.status(404).json({
        error: "Curso não encontrado"
      });
    }

    res.json(course);
  }
};

export const createCourse = async (req, res) => {
  try {
    const {
      title,
      modality,
      category,
      shortDescription,
      description,
      targetAudience,
      requirements,
      documents,
      duration,
      level,
      image,
      officialUrl,
      modules
    } = req.body;

    const course = await prisma.course.create({
      data: {
        title,
        modality,
        category,
        shortDescription,
        description,
        targetAudience,
        requirements,
        documents,
        duration,
        level,
        image,
        officialUrl,

        modules: {
          create: modules?.map((module, index) => ({
            title: module.title,
            order: index + 1,
            subjects: {
              create: module.subjects?.map((subject) => ({
                title: subject.title,
                workload: subject.workload,
                semester: subject.semester
              }))
            }
          }))
        }
      },
      include: {
        modules: {
          include: {
            subjects: true
          }
        }
      }
    });

    res.status(201).json(course);
  } catch (error) {
    console.error("Erro ao criar curso:", error);

    res.status(500).json({
      error: "Erro ao criar curso"
    });
  }
};
