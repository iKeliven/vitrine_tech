/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticação da plataforma
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login de usuário
 *     tags:
 *       - Auth
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *
 *       401:
 *         description: Senha inválida
 *
 *       404:
 *         description: Usuário não encontrado
 */