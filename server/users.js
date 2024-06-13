const { trimString } = require('./helpers');

let users = [];

const addUser = ({ user, room }) => {
  const userName = trimString(user.name);
  const userRoom = trimString(room);

  const isExist = users.find((user) => trimString(user.name) === userName && trimString(user.room) === userRoom);
  !isExist && users.push({ name: userName, room: userRoom });
  const currentUser = isExist || user;
  return {isExist, user: currentUser};

};

module.exports = { addUser };