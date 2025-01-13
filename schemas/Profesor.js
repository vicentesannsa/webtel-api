import z from 'zod';

const ProfesorSchema = z.object({
    email: z.string().email('Debe ser un correo electrónico válido'),
    firstName: z.string().max(45),
    lastName_p: z.string().max(45),
    lastName_m: z.string().max(45),
    password: z.string().max(60),
    username: z.string().max(100),
    admin: z.number().int().min(0).max(1).optional(),
});

export function validateProfesor(data) {
    return ProfesorSchema.safeParse(data);
}

export function validatePartialProfesor(data) {
    return ProfesorSchema.partial().safeParse(data);
}
