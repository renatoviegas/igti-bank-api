import service from '../services/students.services.js';

const _sendException = (err, res) => {
  res.status(400).send({ error: err.message });
};

const get = async (req, res) => {
  try {
    const students = await service.get();
    res.status(200).send(students);
  } catch (err) {
    _sendException(err, res);
  }
};

const getById = async (req, res) => {
  try {
    const _student = await service.getById(req.params.id);

    if (_student) {
      res.status(200).send(_student);
      return;
    }

    res.status(404).send({ message: 'Student not found' });
  } catch (err) {
    _sendException(err, res);
  }
};

const create = async (req, res) => {
  try {
    const student = await service.create(req.body);
    res.status(201).send(student);
  } catch (err) {
    _sendException(err, res);
  }
};

const update = async (req, res) => {
  try {
    const _student = await service.update(req.params.id, req.body);

    if (_student) {
      res.status(202).send(_student);
      return;
    }

    res.status(404).send({ message: 'Student not found' });
  } catch (err) {
    _sendException(err, res);
  }
};

const remove = async (req, res) => {
  try {
    console.log(req.params.id);
    const result = await service.remove(req.params.id);
    console.log(result);
    if (result) {
      res.status(200).send({ message: 'Student deleted successful' });
      return;
    }

    res.status(404).send({ message: 'Student not found' });
  } catch (err) {
    _sendException(err, res);
  }
};

export default {
  get,
  getById,
  create,
  update,
  remove,
};
