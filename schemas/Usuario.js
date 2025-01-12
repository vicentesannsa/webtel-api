import z from 'zod';

const UsuarioSchema = z.object({
    email: z.string().email('Debe ser un correo electrónico válido'),
    password: z.string().max(60)
});

export function validateUsuario(data) {
    return UsuarioSchema.safeParse(data);
}
