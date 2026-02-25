const { getUrl } = require("./store");

module.exports = (req, res) => {
  const { id } = req.query || {};
  if (!id) {
    res.status(400).json({ error: "Missing id" });
    return;
  }

  const url = getUrl(id);
  if (!url) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  res.status(200).json({ id, url });
};
