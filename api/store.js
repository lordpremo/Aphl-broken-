// KUMBUKA: Hii ni in-memory store – ikirestart function, data hupotea.
// Kwa production unaweza baadaye kubadili kwenda DB (Supabase, KV, n.k.)

const map = new Map();

function saveUrl(id, url) {
  map.set(id, url);
}

function getUrl(id) {
  return map.get(id) || null;
}

function generateId() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

module.exports = { saveUrl, getUrl, generateId };
