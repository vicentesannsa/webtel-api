import z from 'zod';

process.loadEnvFile();

const EnvSchema = z.object({
    DB_HOSTNAME: z.string().default('localhost'),
    DB_USERNAME: z.string().default('root'),
    DB_DATABASE: z.string(),
    DB_PASSWORD: z.string(),
    DB_PORT: z.string().transform(Number),
    SECRET_JWT_KEY: z.string().min(1, 'SECRET es obligatorio'),
    SALT_ROUNDS: z.string().transform(Number),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.string().default('1234').transform(Number),
});

const { success, error, data } = EnvSchema.safeParse(process.env);

if (!success) {
    console.error("Error en las variables de entorno:", error.format());
    process.exit(1);
}

export const {
    DB_HOSTNAME,
    DB_USERNAME,
    DB_DATABASE,
    DB_PASSWORD,
    DB_PORT,
    SECRET_JWT_KEY,
    SALT_ROUNDS,
    NODE_ENV,
    PORT
} = data;
