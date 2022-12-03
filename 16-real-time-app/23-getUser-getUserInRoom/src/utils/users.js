const users = [
  { id: 1, username: "Ahmed", room: "frinds" },
  { id: 2, username: "Ahmed", room: "frinds" },
  { id: 3, username: "EID", room: "school" },
  { id: 4, username: "Ali", room: "school" },
];
//---------------------------------------------//
// addUser, removeUser, getUser, getUsersInRoom
//---------------------------------------------//

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

/////////////////////////////////////////////
// REMOVEUSER FUNCTION
/////////////////////////////////////////////
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1);
  }
};

/////////////////////////////////////////////
// GETUSER FUNCTION
/////////////////////////////////////////////
const getUser = (id) => {
  const user = users.find((user) => user.id === id);

  return user;
};
/////////////////////////////////////////////
// GETUSERS IN ROOM FUNCTION
/////////////////////////////////////////////
const getUsersInRoom = (room) => {
  const usersInRoom = users.filter((user) => user.room === room);

  return usersInRoom;
};
console.log(getUser(2));
console.log(getUsersInRoom("frinds"));
