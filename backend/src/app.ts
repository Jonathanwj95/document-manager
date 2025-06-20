// src/app.ts
import express from 'express';
import cors from 'cors';
import routes from './interfaces/routes';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.get('/', (_req, res) => {
  res.send(`
    <!doctype html>
    <html lang="es">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>🚀 DocManager API</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gray-50 text-gray-800">
      <header class="bg-white shadow">
        <div class="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 class="text-3xl font-bold text-indigo-600">DocManager API</h1>
          <a href="http://localhost:3000" target="_blank"
             class="text-sm bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded">
            👉 Ir al Frontend
          </a>
        </div>
      </header>
      <main class="mt-6 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Frase destacada -->
        <p class="text-center text-lg font-semibold text-gray-700 mb-6">
          Servidor levantado correctamente. Rutas disponibles:
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="p-6 bg-white rounded-lg shadow">
            <h2 class="text-xl font-semibold mb-2">📚 Documentos</h2>
            <ul class="space-y-1 list-disc list-inside text-gray-700">
              <li><code>GET  /api/documents</code> — Listar todos</li>
              <li><code>POST /api/documents</code> — Crear uno nuevo</li>
              <li><code>GET  /api/documents/:id</code> — Detalle por ID</li>
              <li><code>DELETE /api/documents/:id</code> — Borrar por ID</li>
            </ul>
          </div>
          <div class="p-6 bg-white rounded-lg shadow">
            <h2 class="text-xl font-semibold mb-2">🖨️ PDF</h2>
            <ul class="space-y-1 list-disc list-inside text-gray-700">
              <li><code>POST /api/convert</code> — Genera un PDF</li>
            </ul>
          </div>
        </div>

        <section class="mt-10 text-center text-sm text-gray-500">
          <p>© ${new Date().getFullYear()} DocManager • Hecho con TypeScript + Express</p>
        </section>
      </main>
    </body>
    </html>
  `);
});

function listRoutes() {
  console.log('\n📍 RUTAS REGISTRADAS:');
  app._router.stack.forEach((mw: any) => {
    if (mw.route) {
      const m = Object.keys(mw.route.methods).map(x => x.toUpperCase()).join(',');
      console.log(`${m}\t${mw.route.path}`);
    } else if (mw.name === 'router') {
      mw.handle.stack.forEach((h: any) => {
        if (h.route) {
          const m = Object.keys(h.route.methods).map(x => x.toUpperCase()).join(',');
          console.log(`${m}\t/api${h.route.path}`);
        }
      });
    }
  });
  console.log('');
}
listRoutes();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
