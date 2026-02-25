const { saveUrl, generateId } = require("./store");

module.exports = (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { url } = req.body || {};
    if (!url) {
      res.status(400).json({ error: "Missing url" });
      return;
    }

    // validate URL
    try {
      new URL(url);
    } catch {
      res.status(400).json({ error: "Invalid URL" });
      return;
    }

    const id = generateId();
    saveUrl(id, url);

    const base = `${req.headers["x-forwarded-proto"] || "https"}://${req.headers.host}`;
    const shortUrl = `${base}/file/${id}`;
    const codeUrl = `${base}/file/${id}?view=code`;

    res.status(200).json({ id, shortUrl, codeUrl });
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
};
