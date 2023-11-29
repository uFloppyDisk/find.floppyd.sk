import type { ShellPrevious } from '~/src/types/shell';

type CommandMap = Map<string, typeof Command>;

type ShellContext = {
    history: string[],
    previous: ShellPrevious[],
    commands: CommandMap,
}

export class Command {
    shouldPush = true;

    keyword: string | undefined;
    description: string | undefined;

    input: string[] | null = null;

    constructor() {
        if (this.constructor === Command) { 
            throw new Error(`Cannot construct Command base class.`);
        }
    }
    
    help(): string {
        if (typeof this.description == "undefined") {
            return "This command does not define any help text.";
        }
        return this.description;
    }

    execute(_ctx: ShellContext): string | null {
        throw new Error(`${this.keyword ?? this.constructor["name"]} execute function is not implemented!`);
    }
}

export class CommandWithInput extends Command {
    constructor(input: string[]) {
        super();
        this.input = input;
    }
}

export default <CommandMap> new Map([
    ["clear", class ClearCommand extends Command {
        shouldPush = false;
        keyword = "clear";
        description = "Clear shell of all previously ran commands and output.";
        execute(ctx: ShellContext): string | null {
            ctx.previous.splice(0, ctx.previous.length)
            return null;
        }
    }],
    ["help", class HelpCommand extends CommandWithInput {
        keyword = "help";
        description = "Display available commands or explain usage of other commands in detail.";
        execute(ctx: ShellContext): string | null {
            if ((this.input?.length ?? 0) > 1) {
                const keyword = this.input?.at(1);
                const commandDef = ctx.commands.get(keyword ?? "");
                if (typeof commandDef == "undefined") { return null; }

                const command = new commandDef();
                return `${keyword}: ${command.help()}`;
            }

            return [...ctx.commands.keys()].sort().join(" ");
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
