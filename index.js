import express from 'express';
import { swaggerUi, specs } from './swagger/swagger';
import studentsRoutes from './routes/students';
import sequelize from './config/sequelize'; 

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/students', studentsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

sequelize.sync({ force: true }).then(() => {
  console.log('Database & tables created!');
});
