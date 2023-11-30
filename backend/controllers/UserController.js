const executeQuery = require("../dao/db").executeQuery; // Adjust the path as necessary

const getUsers = (req, res) => {
  // Logic to handle the request
  res.send("List of users");
};

const createUser = (req, res) => {
  // Logic to create a user
  res.send("User created");
};

const getCredits = async (req, res) => {
  try {
    const spotifyId = req.user.spotify_id;
    const result = await executeQuery(
      "SELECT credits FROM users WHERE spotify_id = $1",
      [spotifyId]
    );
    res.send(result.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUsers,
  createUser,
  getCredits,
};
