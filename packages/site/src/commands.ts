import type { ShellContext } from './types/shell.d.ts';
import type { CommandMap } from './types/command.d.ts';
import {
    CommandWithInput,
    CommandWithoutPush
} from './classes/command.ts';

export default <CommandMap> new Map([
    ["clear", class ClearCommand extends CommandWithoutPush {
        keyword = "clear";
        description = "Clear shell of all previously ran commands and output.";
        execute(ctx: ShellContext): string | null {
            ctx.previous.splice(0, ctx.previous.length)
            return null;
        }
    }],
    ["help", class HelpCommand extends CommandWithInput {
        keyword = "help";
        description = `Display available commands or 
        explain usage of other commands in detail.`;
        execute(ctx: ShellContext): string | null {
            if ((this.input?.length ?? 0) <= 1) {
                return [...ctx.commands.keys()].sort().join(" ");
            }

            const keyword = this.input?.at(1);

            const commandDef = ctx.commands.get(keyword ?? "");
            if (typeof commandDef == "undefined") { return null; }

            const command = new commandDef();
            return `${keyword}: ${command.help()}`;
        }
    }],
    ["echo", class EchoCommand extends CommandWithInput {
        keyword = "echo";
        description = "Print input to screen.";
        execute(_ctx: ShellContext): string | null {
            return this.input?.join(" ") ?? null;
        }
    }],
]);
