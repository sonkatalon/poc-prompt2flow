import { z } from "zod";
import { Tool } from "../models/tool";
import { locators } from "./common/locators";

const clickParams = z.object({
  target: z.object({
    locators,
  }),
});

export const click: Tool<z.infer<typeof clickParams>> = {
  description: "Click on an element",
  handler: async (click) => {
    console.log(JSON.stringify({ click }, null, 2));
    return "Success";
  },
  name: "click",
  parametersSchema: clickParams,
};
