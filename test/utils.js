/* eslint-disable security/detect-object-injection */
/* eslint-disable no-restricted-syntax */

const prepare = (input, parent = '') => {
  const result = [];
  for (const [key, value] of Object.entries(input)) {
    const label = `${parent}.${key}`;
    if (typeof value === 'object') {
      for (const nestEach of prepare(value, label)) {
        const each = { ...input };
        delete each[key];
        each[key] = nestEach.data;
        result.push({ data: each, label: nestEach.label });
      }
    }
    const each = { ...input };
    delete each[key];
    result.push({ data: each, label });
  }
  return result;
};

module.exports = {
  prepare,
};
