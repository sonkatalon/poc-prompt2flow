import { z } from "zod";

export const locators = z.array(
  z.object({
    type: z.enum(["css", "xpath"]),
    value: z.string(),
  })
);
