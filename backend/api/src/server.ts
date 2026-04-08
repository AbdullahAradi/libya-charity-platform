import { env } from './config/env';
import { prisma } from './lib/prisma';
import { app } from './app';

const start = async () => {
  await prisma.$connect();

  app.listen(env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`API running on http://localhost:${env.port}`);
  });
};

void start();
