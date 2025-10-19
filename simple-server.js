const express = require('express');
const { createServer: createViteServer } = require('vite');

async function startServer() {
  const app = express();
  
  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
    configFile: './vite.config.ts'
  });

  // Use vite's connect instance as middleware
  app.use(vite.middlewares);

  const port = 5000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
