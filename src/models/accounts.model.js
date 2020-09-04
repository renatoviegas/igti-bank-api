import mongoose from 'mongoose';

const schema = mongoose.Schema({
  agencia: {
    type: Number,
    required: [true, 'Agência é requerida'],
  },
  conta: {
    type: Number,
    required: [true, 'Conta é requerida'],
  },
  name: {
    type: String,
    required: [true, 'Nome é requerido'],
  },
  balance: {
    type: Number,
    validate: {
      validator: (value) => value >= 0,
      message: (props) => `Valor deve ser maior ou igual a zero!`,
    },
    required: [true, 'Valor requerido'],
  }
});

const Account = mongoose.model('accounts', schema);

export default Account;
