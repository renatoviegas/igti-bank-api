const _isEmpty = (value) => {
  return (!value && value !== 0) || value.toString().trim() === '';
}

const text = (field, text) => {
  if (_isEmpty(text)) throw new Error(`${field} is empty`);
  return text.toString().trim();
};

const number = (field, value) => {
  if (_isEmpty(value)) throw new Error(`${field} is empty`);
  if (isNaN(value)) throw new Error(`${field} is not a number`);
};

const numberGreatThan = (field, value, valueCondition) => {
  number(field, value);
  if (valueCondition >= value) throw new Error(`${field} must be greater than to ${valueCondition}`);
};

const numberGreatThanOrEqual = (field, value, valueCondition) => {
  number(field, value);
  if (valueCondition > value) throw new Error(`${field} must be greater than or equal to ${valueCondition}`);
};

export default { text, number, numberGreatThan, numberGreatThanOrEqual };
