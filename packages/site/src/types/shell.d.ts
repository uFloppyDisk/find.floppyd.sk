import { CommandMap } from "./command.d.ts";

export type ShellPrevious = {
  vanity: { userName: string, path: string };
  command: string;
  output: string | null;
}

export type ShellContext = {
  root: Document | null,
  commands: CommandMap,
  history: string[],
  previous: ShellPrevious[],
}

