import express from 'express';
import { Sequelize } from 'sequelize';
import studentRoutes from './routes/students.js';

// Configuração do Sequelize
const sequelize = new Sequelize({
  username: process.env.DB_USERNAME || 'defaultUsername',
  password: process.env.DB_PASSWORD || 'defaultPassword',
  database: process.env.DB_NAME || 'defaultDatabase',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
});

const app = express();
app.use(express.json());

// Usar as rotas
app.use('/students', studentRoutes);

// Configuração do Swagger
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
  apis: ['./routes/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Sincronizar o banco de dados e iniciar o servidor
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    
    await sequelize.sync({ force: true });
    console.log('Database & tables created!');
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
  }
};

startServer();
