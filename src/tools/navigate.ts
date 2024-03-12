import { z } from "zod";
import { Tool } from "../models/tool";

const navigateParams = z.object({
  value: z.string(),
});

export const navigate: Tool<z.infer<typeof navigateParams>> = {
  description: "Navigate to an URL",
  handler: async (navigate) => {
    console.log(JSON.stringify({ navigate }, null, 2));
    return "Success";
  },
  name: "navigate",
  parametersSchema: navigateParams,
};
