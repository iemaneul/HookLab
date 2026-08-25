import { z } from 'zod';
export const credentialsSchema = z.object({ name: z.string().trim().min(2).max(80).optional(), email: z.string().email(), password: z.string().min(8).max(72) });
export const endpointSchema = z.object({ name: z.string().trim().min(2).max(80), slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), environment: z.enum(['development', 'staging', 'production']).default('development') });
export const replaySchema = z.object({ destinationUrl: z.string().url(), method: z.enum(['GET','POST','PUT','PATCH','DELETE']).default('POST'), headers: z.record(z.string()).default({}), body: z.unknown().optional() });
