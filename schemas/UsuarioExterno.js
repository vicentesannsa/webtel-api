import z from 'zod';

const UsuarioExternoSchema = z.object({
    email: z.string().email('Debe ser un correo electrónico válido'),
    firstName: z.string().max(45),
    lastName_p: z.string().max(45),
    lastName_m: z.string().max(45),
    password: z.string().max(60),
    username: z.string().max(100),
    school: z.string().max(200),
    region: z.enum([
        'Arica y Parinacota',
        'Tarapacá',
        'Antofagasta',
        'Atacama',
        'Coquimbo',
        'Valparaíso',
        'Metropolitana de Santiago',
        'Libertador General Bernardo O’Higgins',
        'Maule',
        'Ñuble',
        'Biobío',
        'La Araucanía',
        'Los Ríos',
        'Los Lagos',
        'Aysén del General Carlos Ibáñez del Campo',
        'Magallanes y de la Antártica Chilena',
    ]),
    birthdate: z.string().date(),
});

export function validateUsuarioExterno(data) {
    return UsuarioExternoSchema.safeParse(data);
}

export function validatePartialUsuarioExterno(data) {
    return UsuarioExternoSchema.partial().safeParse(data);
}
