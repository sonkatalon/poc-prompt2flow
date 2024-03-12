import { z } from "zod";

export type Tool<T> = {
  description: string;
  handler: (input: T) => Promise<any>;
  name: string;
  parametersSchema: z.ZodType<T>;
};
