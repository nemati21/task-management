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
  const now = new Date(new Date() - new Date().getTimezoneOffset() * 60000).toISOString();
  let tasks = null;
  let count = 0;

  try {
    tasks = await db.collection('tasks').find({ userId, createdts: { $lte: now } }, { projection: { _id: 0 } });
    count = await tasks.count();
    tasks = await tasks.toArray();
    console.log(count);
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
