const getUsers = (req, res) => {
  // Logic to handle the request
  res.send("List of users");
};

const createUser = (req, res) => {
  // Logic to create a user
  res.send("User created");
};

module.exports = {
  getUsers,
  createUser,
};
