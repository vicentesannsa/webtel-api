import z from 'zod';

const UsuarioUSMSchema = z.object({
    email: z.string().email('Debe ser un correo electrónico válido'),
    firstName: z.string().max(45),
    lastName_p: z.string().max(45),
    lastName_m: z.string().max(45),
    password: z.string().max(60),
    rol: z.string().max(45),
    sede: z.enum(['San Joaquín', 'Valparaíso']),
    username: z.string().max(100)
});

export function validateUsuarioUSM(data) {
    return UsuarioUSMSchema.safeParse(data);
}

export function validatePartialUsuarioUSM(data) {
    return UsuarioUSMSchema.partial().safeParse(data);
}
