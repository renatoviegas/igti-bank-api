import Account from '../models/accounts.model.js';

const TARIFA_SAQUE = 1;
const TARIFA_TRANSFERENCIA_AGENCIAS_DISTINTAS = 8;

const get = async () => ({
  accounts: [...(await Account.find())],
});

const getById = async (id) => await Account.findById(id);

const getByAccount = async (numberAccount) =>
  await Account.findOne({ conta: numberAccount });

const getByAgencyAndNumberAccount = async (agency, numberAccount) =>
  await Account.findOne({ agencia: agency, conta: numberAccount });

const create = async (account) => {
  const _account = new Account(account);
  await _account.save();
  return _account;
};

const update = async (id, account) =>
  await Account.findByIdAndUpdate({ _id: id }, account, { new: true });

const remove = async (id) => await Account.findByIdAndRemove({ id });

const _hasBalance = (account, value) => account.balance >= value;

const deposit = async (agency, account, value) => {
  return await Account.findOneAndUpdate(
    { agencia: agency, conta: account },
    { $inc: { balance: value } },
    { new: true }
  );
};

const withdraw = async (account, value, taxation) => {
  if (!account) return false;

  const tax = taxation !== null ? taxation : TARIFA_SAQUE;
  const _valueToWithdraw = value + tax;
  if (!_hasBalance(account, _valueToWithdraw))
    throw new Error('No balance to withdraw this amount');

  account.balance -= _valueToWithdraw;
  console.log(account);
  await account.save();
  return account;
};

const transfer = async (accountFrom, accountTo, value) => {
  const tarifa =
    accountFrom.agencia !== accountTo.agencia
      ? TARIFA_TRANSFERENCIA_AGENCIAS_DISTINTAS
      : 0;
  let result = await withdraw(accountFrom, value, tarifa);
  return result && (await deposit(accountTo.agencia, accountTo.conta, value));
};

const balance = async (agency, account) => {
  return await Account.findOne({ agencia: agency, conta: account });
};

const getCountAccountByAgency = async (agency) => {
  return await Account.countDocuments({ agencia: agency });
};

const getAvgByAgency = async (agencia) => {
  return await Account.aggregate([
    { $match: { agencia } },
    { $group: { _id: null, media: { $avg: '$balance' } } },
  ]);
};

export default {
  get,
  getById,
  getByAccount,
  getByAgencyAndNumberAccount,
  getCountAccountByAgency,
  getAvgByAgency,
  create,
  update,
  remove,
  deposit,
  withdraw,
  balance,
  transfer,
};
