const { executeQuery } = require("../dao/db");

module.exports.CreateCard = async (req, res) => {
  try {
    const question = req?.body?.question;
    const deck_id = req?.body?.deck_id;
    const query = "insert into card (deck_id, question) values ($1, $2)";
    const result = await executeQuery(query, [deck_id, question]);
    res.send(result);
  } catch (error) {
    console.error("Error in getting playlists:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.getAllDecks = async (req, res) => {
  try {
    const result = await executeQuery(
      "SELECT d.*, card_count FROM deck d JOIN ( SELECT deck_id, COUNT(*) as card_count FROM card GROUP BY deck_id ) c ON d.id = c.deck_id;"
    );
    res.send(result);
  } catch (error) {
    console.error("Error in getting playlists:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.getAllCardsForDeck = async (req, res) => {
  try {
    const deck_id = req.query.deck_id;
    const result = await executeQuery(
      "select question from card where deck_id = $1",
      [deck_id]
    );
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports.createDeck = async (req, res) => {
  try {
    const deckName = req.body.deckName;
    const result = await executeQuery("insert into Deck (title) values ($1)", [
      deckName,
    ]);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
