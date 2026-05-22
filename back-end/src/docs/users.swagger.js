/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Usuários da plataforma
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Cadastro de usuário
 *     tags:
 *       - Users
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *
 *               email:
 *                 type: string
 *
 *               password:
 *                 type: string
 *
 *               course:
 *                 type: string
 *
 *     responses:
 *       201:
 *         description: Usuário criado
 */

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Perfil do usuário autenticado
 *     tags:
 *       - Users
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Perfil retornado
 *
 *       401:
 *         description: Token inválido
 */