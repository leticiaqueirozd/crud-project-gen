import express from 'express';
import { Sequelize } from 'sequelize';

// Configurar o Express
const app = express();
app.use(express.json());

// Configurar o Sequelize
const sequelize = new Sequelize({
  username: process.env.DB_USERNAME || 'defaultUsername',
  password: process.env.DB_PASSWORD || 'defaultPassword',
  database: process.env.DB_NAME || 'defaultDatabase',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
});

// Definir o modelo Student
const Student = sequelize.define('Student', {
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  idade: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  primeira_nota: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  segunda_nota: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  nome_professor: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  numero_sala: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Rotas
app.get('/students', async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/students', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/students/:id', async (req, res) => {
  try {
    const [updated] = await Student.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const student = await Student.findByPk(req.params.id);
      res.json(student);
    } else {
      res.status(404).json({ message: 'Aluno não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/students/:id', async (req, res) => {
  try {
    const deleted = await Student.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Aluno não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default app;
