import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import app from '../api/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;

// Serve Vite build static files in local production mode
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`macOS Portfolio API & Web server running on http://localhost:${PORT}`);
  });
}

export default app;
