import mongoose from 'mongoose';

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: [true, 'Disciplina é obrigatória'],
  },
  type: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    validate: {
      validator: (value) => value > 0,
      message: (props) => `${props.value} deve ser maior que zero!`,
    },
    required: [true, 'valor requerido'],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Student = mongoose.model('students', schema);

export default Student;
