import Student from '../models/students.model.js';

const create = async (student) => {
  const _student = new Student(student);
  await _student.save();
  return _student;
};

const get = async () => {
  const _students = await Student.find({});
  return { students: [..._students] };
};

const getById = async (id) => {
  return await Student.findById(id);
};

const update = async (id, student) => {
  return await Student.findByIdAndUpdate({ _id: id }, student, { new: true });
};

const remove = async (id) => {
  return await Student.findByIdAndRemove({ _id: id });
};

export default {
  get,
  getById,
  create,
  update,
  remove,
};
