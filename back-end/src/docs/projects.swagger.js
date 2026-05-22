/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Projetos dos usuários
 */

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Criar projeto
 *     tags:
 *       - Projects
 *
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *
 *               description:
 *                 type: string
 *
 *               type:
 *                 type: string
 *
 *               techs:
 *                 type: string
 *
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *
 *     responses:
 *       201:
 *         description: Projeto criado
 */

/**
 * @swagger
 * /projects/me:
 *   get:
 *     summary: Listar meus projetos
 *     tags:
 *       - Projects
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Projetos retornados
 */