const MAX_BYTES = 5 * 1024 * 1024; // 5 MB per request

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  let received = 0;
  req.on('data', (chunk) => {
    received += chunk.length;
    if (received > MAX_BYTES) {
      res.status(413).end();
      req.destroy();
    }
  });
  req.on('end', () => {
    if (!res.writableEnded) {
      res.status(200).end();
    }
  });
};
