import z from 'zod';

const ComentarioSchema = z.object({
    id_usuario: z.number().int().min(0, { message: "El id_usuario debe ser un número positivo." }).max(9999999999, { message: "El id_usuario no puede tener más de 10 dígitos." }),
    titulo: z.string().max(100),
    username: z.string().max(100),
    comentario: z.string().max(150),
    id_padre: z.union([z.number().int().min(0).max(99999999999), z.null()]),
});

export function validateComentario(data) {
    return ComentarioSchema.safeParse(data);
}
