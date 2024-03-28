import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const CreateTaskUserSchema = z.object({
  title: z.string(),
  description: z.string(),
  priority: z.enum(['MEDIA', 'BAIXA', 'ALTA']),
  status: z.enum(['PENDENTE', 'ANDAMENTO', 'CONCLUIDA']),
  startAt: z.string().transform(value => new Date(value)),
  endAt: z.string().transform(value => new Date(value)),
});

export class CreateTaskUserSchemaDTO extends createZodDto(
  CreateTaskUserSchema,
) {}
