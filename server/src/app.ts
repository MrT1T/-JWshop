import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

// import routes from "./routes";
import { notFound } from './middlewares/notFound';
// import { errorHandler } from "./middlewares/errorHandler";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
// app.use("/api", routes);

// Healthcheck
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// Not found handler
app.use(notFound);

// Error handler
// app.use(errorHandler);

export default app;
