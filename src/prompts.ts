import { Message } from "./openai";

export const systemPrompt: Message = {
  role: "system",
  content:
    "You are a professional quality engineer. " +
    "You perform test steps on a web application to verify acceptance criteria. " +
    "You take high quality action using information of the current web page. " +
    "You write stable selector using element's attributes of the current web page. " +
    "The selector must select exactly one element. ",
};

export function generateUserPrompt(
  prompt: string,
  steps: any[],
  html: string
): Message {
  return {
    role: "user",
    content:
      `Add step to ${prompt}.\n\n` +
      `This is the current test steps:\n${JSON.stringify(steps)}\n\n` +
      `This is the current HTML:\n${html}\n\n`,
  };
}
