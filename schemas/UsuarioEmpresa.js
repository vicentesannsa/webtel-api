import z from 'zod';

const UsuarioEmpresaSchema = z.object({
    email: z.string().email('Debe ser un correo electrónico válido'),
    firstName: z.string().max(45),
    lastName_p: z.string().max(45),
    lastName_m: z.string().max(45),
    password: z.string().max(60),
    username: z.string().max(100),
    rut: z.string().max(45),
    study: z.string().max(45),
    country: z.string().max(45),
});

export function validateUsuarioEmpresa(data) {
    return UsuarioEmpresaSchema.safeParse(data);
}

export function validatePartialUsuarioEmpresa(data) {
    return UsuarioEmpresaSchema.partial().safeParse(data);
}
