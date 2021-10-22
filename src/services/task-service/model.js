const { db } = require('../../database');

const create = async (id, userId, title) => {
  await db.collection('tasks').insertOne({
    id,
    userId,
    title,
    createdts: new Date(new Date() - new Date().getTimezoneOffset() * 60000).toISOString(),
  });

  return true;
};

const find = async (userId) => {
  const now = new Date(new Date() - new Date().getTimezoneOffset() * 60000);
  const from = new Date(new Date().setHours(0, 0, 0, 0) - new Date().getTimezoneOffset() * 60000).toISOString();
  const to = new Date(new Date(now.setDate(now.getDate() + 1)).setHours(0, 0, 0, 0) - new Date().getTimezoneOffset() * 60000).toISOString();
  let tasks = null;
  let count = 0;

  try {
    tasks = await db.collection('tasks').find({ userId, createdts: { $lt: to, $gte: from } }, { projection: { _id: 0 } });
    count = await tasks.count();
    tasks = await tasks.toArray();
  } catch (err) {
    tasks = null;
    count = 0;
  }

  return { count, tasks };
};

module.exports = {
  create,
  find,
};
