import { DataTypes } from 'sequelize';
import sequelize from '../index.js'; // Importar a instância do Sequelize

const Student = sequelize.define('Student', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  primeira_nota: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  segunda_nota: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  nome_professor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numero_sala: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Student;
