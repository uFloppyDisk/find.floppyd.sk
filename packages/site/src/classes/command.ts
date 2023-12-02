import type { CommandInterface } from "../types/command.d.ts";
import type { ShellContext } from "../types/shell.d.ts";

export class Command implements CommandInterface {
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
        throw new Error(
            `${this.keyword ?? this.constructor["name"]} 
            execute function is not implemented!`
        );
    }
}

export class CommandWithoutPush extends Command {
    shouldPush = false;
}

export class CommandWithInput extends Command {
    constructor(input: string[]) {
        super();
        this.input = input;
    }
}
