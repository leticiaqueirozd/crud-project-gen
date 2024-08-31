import express from 'express';
import { Sequelize } from 'sequelize';
import studentRoutes from './routes/students.js';

const sequelize = new Sequelize({
  username: process.env.DB_USERNAME || 'defaultUsername',
  password: process.env.DB_PASSWORD || 'defaultPassword',
  database: process.env.DB_NAME || 'defaultDatabase',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
});

const app = express();
app.use(express.json());

app.use('/students', studentRoutes);

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CRUD API',
      version: '1.0.0',
      description: 'Documentação da API CRUD para o banco de dados de alunos',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento',
      },
    ],
  },
  apis: ['./routes/*.js'], 
};

const specs = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

// Sincronizar o banco de dados
sequelize.sync({ force: true }).then(() => {
  console.log('Database & tables created!');
});
