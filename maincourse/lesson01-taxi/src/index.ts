import express from 'express';
import { setupApp } from './setup-app';

export const app = express();
setupApp(app);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
