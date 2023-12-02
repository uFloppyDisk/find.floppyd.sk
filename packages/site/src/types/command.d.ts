import type { ShellContext } from "./shell.d.ts";
import { Command } from "../classes/command.ts";

export type CommandMap = Map<string, typeof Command>

export interface CommandInterface {
    shouldPush: boolean;
    keyword: string | undefined;
    description?: string | undefined;
    input?: string[] | null;

    help(): string;
    execute(ctx: ShellContext): string | null;
}
