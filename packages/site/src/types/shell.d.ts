import { CommandMap } from "./command.d.ts";

export type ShellPrevious = {
    command: string;
    output: string | null;
}

export type ShellContext = {
    history: string[],
    previous: ShellPrevious[],
    commands: CommandMap,
}

