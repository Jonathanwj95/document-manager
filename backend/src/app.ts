// src/app.ts
import express from 'express';
import cors from 'cors'; 
import routes from './interfaces/routes';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api', routes);

// ——— DEBUG: Lista todas las rutas registradas ———
function listRoutes() {
  console.log('\n📍 RUTAS REGISTRADAS:');
  app._router.stack.forEach((middleware: any) => {
    if (middleware.route) {
      const methods = Object.keys(middleware.route.methods)
        .map(m => m.toUpperCase())
        .join(', ');
      console.log(`${methods}\t/api${middleware.route.path}`);
    } else if (middleware.name === 'router') {
      middleware.handle.stack.forEach((handler: any) => {
        const route = handler.route;
        if (route) {
          const methods = Object.keys(route.methods)
            .map(m => m.toUpperCase())
            .join(', ');
          console.log(`${methods}\t/api${route.path}`);
        }
      });
    }
  });
  console.log('');
}
listRoutes();
// ————————————————————————————————

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
