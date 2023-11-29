import type { ShellPrevious } from '~/src/types/shell';

type CommandMap = Map<string, typeof Command>;

type ShellContext = {
    history: string[],
    previous: ShellPrevious[],
}

export class Command {
    shouldPush = true;
    input: string[] | null = null;

    constructor() {
        if (this.constructor === Command) { 
            throw new Error(`Cannot construct Command base class.`);
        }
    }

    execute(_ctx: ShellContext): string | null {
        throw new Error(`${this.constructor["name"]} execute function is not implemented!`);
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
        execute(ctx: ShellContext): string | null {
            ctx.previous.splice(0, ctx.previous.length)
            return null;
        }
    }],
    ["help", class HelpCommand extends Command {
    }],
    ["echo", class EchoCommand extends CommandWithInput {
        execute(_ctx: ShellContext): string | null {
            return this.input?.join(" ") ?? null;
        }
    }],
]);
