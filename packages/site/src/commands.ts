import type { ShellPrevious } from '~/src/types/shell';

type ShellContext = {
    history: string[],
    previous: ShellPrevious[],
}

interface Command {
    do: (ctx: ShellContext, input: string[]) => string | null
}

export default <Map<string, Command>> new Map([
    ["clear", {
        do: (ctx: ShellContext, input: string[]): string | null => {
            ctx.previous.splice(0, ctx.previous.length)
            return null;
        }
    }],
    ["echo", {
        do: (ctx: ShellContext, input: string[]): string | null => {
            return input.join(" ");
        }
    }]
])
