import express from 'express';
import Student from '../models/student'; 

const router = express.Router();

// Get all students
router.get('/students', async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new student
router.post('/students', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get student by ID
router.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: 'Aluno não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update student by ID
router.put('/students/:id', async (req, res) => {
  try {
    const [updated] = await Student.update(req.body, {
      where: { id: req.params.id },
    });
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

// Delete student by ID
router.delete('/students/:id', async (req, res) => {
  try {
    const deleted = await Student.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Aluno não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
