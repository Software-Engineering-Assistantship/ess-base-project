/* eslint-disable no-unused-vars */
import { z } from 'zod';

const envSchema = z.object({
  SERVER_PORT: z.coerce.number().default(3001),
  NODE_ENV: z.enum(['development', 'production', 'test']),

  DATABASE_URL: z.string(),

  JWT_ACCESS_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),

  S3_ENDPOINT: z.string().optional(),
  S3_BUCKET: z.string().optional(),
  S3_KEY: z.string().optional(),
  S3_SECRET: z.string().optional(),
});

const devEnvSchema = envSchema.extend({
  DATABASE_TYPE: z.string(),
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.coerce.number(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_DB: z.string(),

  DATABASE_TEST_HOST: z.string(),
  DATABASE_TEST_PORT: z.coerce.number(),
  DATABASE_TEST_USER: z.string(),
  DATABASE_TEST_PASSWORD: z.string(),
  DATABASE_TEST_DB: z.string(),
});

const envValidation =
  process.env.NODE_ENV !== 'production'
    ? devEnvSchema.safeParse(process.env)
    : envSchema.safeParse(process.env);

if (!envValidation.success) {
  console.error('Invalid environment variables', envValidation.error.format());

  throw new Error('Invalid environment variables');
}

declare global {
  namespace NodeJS {
    interface ProcessEnv
      extends Record<keyof z.infer<typeof envSchema>, string> {}
  }
}

export default envValidation.data;
