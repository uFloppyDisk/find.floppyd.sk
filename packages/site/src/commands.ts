import type { ShellContext } from './types/shell.d.ts';
import type { CommandMap } from './types/command.d.ts';
import {
    NullCommand,
    Command,
    CommandWithInput,
    CommandWithoutPush
} from './classes/command.ts';

export function getCommand(commands: CommandMap, keyword: string): typeof Command | typeof NullCommand {
    const def = commands.get(keyword);
    if (typeof def == "undefined") { return NullCommand; }

    return def;
}

export function initCommand(def: typeof Command, input: string[]): Command {
    if (def.prototype instanceof CommandWithInput) {
        return new (def as typeof CommandWithInput)(input);
    }

    return new def();
}

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

            const keyword = this.input?.at(1) ?? "";
            const def = getCommand(ctx.commands, keyword);
            if (def === NullCommand) {
                return `${keyword}: command not found`;
            }

            const command = initCommand((def as typeof Command), []);

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
