import type { ShellPrevious } from '~/src/types/shell';

type ShellContext = {
    history: string[],
    previous: ShellPrevious[],
}

export class Command {
    push = true;
    input: string[] | null = null;

    constructor(input: string[]);
    constructor() {
        if (this.constructor === Command) { 
            throw new Error(`Cannot construct Command base class.`);
        }
    }

    execute(_ctx: ShellContext): string | null {
        throw new Error(`${this.constructor["name"]} execute function is not implemented!`);
    }
}

export default <Map<string, typeof Command>> new Map([
    ["clear", class ClearCommand extends Command {
        constructor() {
            super([]);
            this.push = false;
        }
        execute(ctx: ShellContext): string | null {
            ctx.previous.splice(0, ctx.previous.length)
            return null;
        }
    }],
    ["echo", class EchoCommand extends Command {
        constructor(input: string[]) {
            super(input);
            this.input = input;
        };
        execute(_ctx: ShellContext): string | null {
            return this.input?.join(" ") ?? null;
        }
    }],
])
