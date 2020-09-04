import service from '../services/accounts.services.js';
import validators from '../Helpers/validators.js';

const _sendException = (err, res) => {
  res.status(400).send({ error: err.message });
};

const get = async (req, res) => {
  try {
    res.status(200).send(await service.get());
  } catch (err) {
    _sendException(err, res);
  }
};

const getById = async (req, res) => {
  try {
    const _account = await service.getById(req.params.id);

    if (_account) {
      res.status(200).send(_account);
      return;
    }

    res.status(404).send({ message: 'Account not found' });
  } catch (err) {
    _sendException(err, res);
  }
};

const create = async (req, res) => {
  try {
    res.status(201).send(await service.create(req.body));
  } catch (err) {
    _sendException(err, res);
  }
};

const update = async (req, res) => {
  try {
    const _account = await service.update(req.params.id, req.body);

    if (_account) {
      res.status(202).send(_account);
      return;
    }

    res.status(404).send({ message: 'Account not found' });
  } catch (err) {
    _sendException(err, res);
  }
};

const balance = async (req, res) => {
  try {
    const { agencia, conta } = req.body;

    validators.number('Agência', agencia);
    validators.number('Conta', conta);

    const _account = await service.balance(agencia, conta);

    if (_account) {
      res.status(202).send({ balance: _account.balance });
      return;
    }

    res.status(404).send({ message: 'Account not found' });
  } catch (err) {
    _sendException(err, res);
  }
};

const deposit = async (req, res) => {
  try {
    const { agencia, conta, valor } = req.body;

    validators.number('Agência', agencia);
    validators.number('Conta', conta);
    validators.numberGreatThan('Valor', valor, 0);

    const _account = await service.deposit(agencia, conta, valor);

    if (_account) {
      res.status(202).send({ newBalance: _account.balance });
      return;
    }

    res.status(404).send({ message: 'Account not found' });
  } catch (err) {
    _sendException(err, res);
  }
};

const withdraw = async (req, res) => {
  try {
    const { agencia, conta, valor } = req.body;

    validators.number('Agência', agencia);
    validators.number('Conta', conta);
    validators.numberGreatThan('Valor', valor, 0);

    let _account = await service.getByAgencyAndAccount(agencia, conta);
    _account = await service.withdraw(_account, valor, null);

    if (_account) {
      res.status(202).send({ newBalance: _account.balance });
      return;
    }

    res.status(404).send({ message: 'Account not found' });
  } catch (err) {
    _sendException(err, res);
  }
};

const transfer = async (req, res) => {
  try {
    const { contaOrigem, contaDestino, valor } = req.body;

    validators.number('Conta Origem', contaOrigem);
    validators.number('Conta Destino', contaDestino);
    validators.numberGreatThan('Valor', valor, 0);

    const from = await service.getByAccount(contaOrigem);
    const to = await service.getByAccount(contaDestino);

    if (!from) res.status(404).send({ message: 'Account origin not found' });
    if (!to) res.status(404).send({ message: 'Account destiny not found' });

    const isOk = await service.transfer(from, to, valor);

    if (isOk) {
      const _accountOrigin = await service.getByAccount(contaOrigem);
      res.status(202).send({ newBalanceAccountFrom: _accountOrigin.balance });
      return;
    }
  } catch (err) {
    _sendException(err, res);
  }
};

const close = async (req, res) => {
  try {
    const { agencia, conta } = req.body;
    console.log('oi');
    validators.number('Agência', agencia);
    validators.number('Conta', conta);

    const isDeleted = await service.remove(agencia, conta);

    if (isDeleted) {
      const activeAccounts = await service.getCountAccountByAgency(agencia);
      res
        .status(200)
        .send({ message: `Active accounts for this agency ${activeAccounts}` });
      return;
    }

    res.status(404).send({ message: 'Account not found' });
  } catch (err) {
    _sendException(err, res);
  }
};

const getCountAccountByAgency = async (req, res) => {
  try {
    const { agencia } = req.body;
    validators.number('Agência', agencia);
    res
      .status(200)
      .send({ count: await service.getCountAccountByAgency(agencia) });
  } catch (err) {
    _sendException(err, res);
  }
};

const getAvgByAgency = async (req, res) => {
  try {
    const { agencia } = req.body;
    validators.number('Agência', agencia);
    res.status(200).send(await service.getAvgByAgency(agencia));
  } catch (err) {
    _sendException(err, res);
  }
};

const getByAccount = async (req, res) => {
  try {
    const { conta } = req.body;
    validators.number('Conta', conta);
    res.status(200).send(await service.getByAccount(conta));
  } catch (err) {
    _sendException(err, res);
  }
};

export default {
  get,
  getById,
  getByAccount,
  getAvgByAgency,
  getCountAccountByAgency,
  create,
  update,
  close,
  deposit,
  withdraw,
  balance,
  transfer,
};
