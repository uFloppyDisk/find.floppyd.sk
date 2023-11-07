'use strict';

const twitchGetStatus = require('..');
const assert = require('assert').strict;

assert.strictEqual(twitchGetStatus(), 'Hello from twitchGetStatus');
console.info('twitchGetStatus tests passed');
