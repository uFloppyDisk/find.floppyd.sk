import type { CommandMap } from '../types/command.d.ts';
import {
  NullCommand,
  Command,
  CommandWithInput,
} from '../src/classes/command.ts';

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

