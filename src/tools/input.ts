import { z } from "zod";
import { Tool } from "../models/tool";
import { locators } from "./common/locators";

const inputParams = z.object({
  target: z.object({
    locators,
  }),
  value: z.string(),
});

export const input: Tool<z.infer<typeof inputParams>> = {
  description: "Enter text into an element",
  handler: async (input) => {
    console.log(JSON.stringify({ input }, null, 2));
    return "Success";
  },
  name: "input",
  parametersSchema: inputParams,
};
