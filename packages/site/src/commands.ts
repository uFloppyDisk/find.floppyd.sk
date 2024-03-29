import colors from 'tailwindcss/colors';
import { getCommand, initCommand } from '../utils/commandFuncs.ts'

import type { ShellContext } from '../types/shell.d.ts';
import type { CommandMap } from '../types/command.d.ts';
import {
  NullCommand,
  Command,
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
        return `Commands:\n${[...ctx.commands.keys()].sort().join(" ")}`;
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
  ["history", class EchoCommand extends CommandWithInput {
    keyword = "history";
    description = "Show history of shell input during this session.";
    execute(ctx: ShellContext): string | null {
      return ctx.history.slice(0, -1).join("\n");
    }
  }],
  ["colour", class ColourCommand extends CommandWithInput {
    keyword = "colour";
    description = "Change the colour of the terminal.";
    availableColours = Object.keys(colors).splice(5, 22);
    help(): string {
      return `${this.description}\n
        Available colours: ${this.availableColours.join(", ")}
      `;
    };
    execute(ctx: ShellContext): string | null {
      let selected = 'red'; 

      if (!this.input) { return null; }

      do {
        if (this.input.length <= 1) {
          selected = this.availableColours[
            Math.floor(Math.random() * this.availableColours.length)
          ];

          break;
        }

        if (!this.availableColours.includes(this.input[1])) {
          return `
            Colour '${this.input[1]}' does not exist. 
            Type 'help ${this.keyword}' to see a list of available colours.
          `
        }

        selected = this.input[1];
      } while (false);


      const grades = colors[selected];
      for (const grade of Object.keys(grades)) {
        ctx.root?.documentElement.style.setProperty(
          `--color-primary-${grade}`, grades[grade]
        )

      }

      return `Changing colour to '${selected}'`;
    }
  }],
]);
