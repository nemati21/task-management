const { db } = require('../../database');

const create = async (id, firstname, lastname, username, password, role, dailyTaskCount) => {
  await db.collection('users').insertOne({
    id,
    firstname,
    lastname,
    username,
    password,
    role,
    dailyTaskCount,
    createdts: new Date(new Date() - new Date().getTimezoneOffset() * 60000).toISOString(),
    updatedts: new Date(new Date() - new Date().getTimezoneOffset() * 60000).toISOString(),
  });

  return true;
};

const find = async (id, username) => {
  let user;

  try {
    if (id) {
      user = await db.collection('users').findOne({ id }, { projection: { _id: 0 } });
    } else if (username) {
      user = await db.collection('users').findOne({ username }, { projection: { _id: 0 } });
    }
  } catch (err) {
    user = null;
  }

  return user;
};

const query = async () => {
  let users = null;

  try {
    users = await db.collection('users').find({}).toArray();
  } catch (err) {
    users = null;
  }

  return users;
};

const remove = async (user) => {
  await db.collection('users').deleteOne({ id: user.id });
  return true;
};

module.exports = {
  create,
  find,
  query,
  remove,
};
