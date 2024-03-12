import { generateSchema } from "@anatine/zod-openapi";
import OpenAI from "openai";
import { ChatCompletionFunctionRunnerParams } from "openai/resources/beta/chat/completions";
import { RunnableToolFunctionWithParse } from "openai/lib/RunnableFunction";
import { click } from "./tools/click";
import { navigate } from "./tools/navigate";
import { input } from "./tools/input";

export type Message = OpenAI.Chat.Completions.ChatCompletionMessageParam;

type RunFunctionsInput = ChatCompletionFunctionRunnerParams<any>;
type CreateChatCompletionInput = Omit<RunFunctionsInput, "functions">;

const apiKey = process.env.OPENAI_API_KEY ?? "";
let openai = new OpenAI({ apiKey });

export async function createChatCompletion(
  body: CreateChatCompletionInput
): Promise<string> {
  const runner = openai.beta.chat.completions.runTools({
    ...body,
    tools: [click, input, navigate].map((tool) => {
      return {
        type: "function",
        function: {
          name: tool.name,
          description: tool.description,
          parameters: generateSchema(tool.parametersSchema),
          parse: (input) => tool.parametersSchema.parse(JSON.parse(input)),
          function: (args) => tool.handler(args),
        },
      } satisfies RunnableToolFunctionWithParse<any>;
    }),
  });

  const finalContent = await runner.finalContent();
  return finalContent ?? "";
}
