const users = [];

//addUser, removeUser, getUser, getUsersInRoom
/////////////////////////////////////////////
// ADDUSER FUNCTION
/////////////////////////////////////////////
const addUser = ({ id, username, room }) => {
  // Clear the data
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // Validate the data
  if (!username || !room) {
    return { error: "Username and Room are required" };
  }

  // Check for existing user
  const existingUser = users.find(
    (user) => user.username === username || user.room === room
  );

  // Validate username
  if (existingUser) {
    return { error: "Username is in use" };
  }

  // Store User
  const user = { id, username, room };
  users.push(user);
  return user;
};

// const newUser = addUser({
//   id: 23,
//   username: "Ahmed",
//   room: "Family",
// });

// console.log(users); // [ { id: 23, username: 'ahmed', room: 'family' } ]

/////////////////////////////////////////////
// REMOVEUSER FUNCTION
/////////////////////////////////////////////
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1);
  }
};
// removeUser(23);
// console.log(users); // []
