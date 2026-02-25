// Simple proxy: inapokea URL, inaleta content server-side, inarudisha kama text
module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    let body = "";
    await new Promise((resolve) => {
      req.on("data", (chunk) => (body += chunk));
      req.on("end", resolve);
    });

    let data;
    try {
      data = JSON.parse(body || "{}");
    } catch {
      res.status(400).json({ error: "Invalid JSON" });
      return;
    }

    const url = data.url;
    if (!url) {
      res.status(400).json({ error: "Missing url" });
      return;
    }

    try {
      new URL(url);
    } catch {
      res.status(400).json({ error: "Invalid URL" });
      return;
    }

    // Node 18+ on Vercel ina fetch global
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "BrokenLord-Code-Fetcher/1.0",
        "Accept": "*/*"
      }
    });

    const contentType = response.headers.get("content-type") || "";
    const text = await response.text();

    res.status(200).json({
      ok: true,
      url,
      contentType,
      content: text
    });
  } catch (e) {
    res.status(500).json({ error: "Proxy error", detail: String(e) });
  }
};
