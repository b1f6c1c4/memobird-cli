const os = require('os');
const path = require('path');
const fs = require('fs');
const yargRoot = require('yargs');
const debug = require('debug')('memobird-cli');
const Memobird = require('memobird');
const getStdin = require('get-stdin');

// https://github.com/sindresorhus/get-stdin/issues/21
process.stdin.isTTY = false;

const readToken = ({ tokenFile }) => {
  try {
    return JSON.parse(fs.readFileSync(tokenFile, 'utf-8').trim());
  } catch (e) {
    console.error(`Error occured during reading token file ${tokenFile}.`);
    console.error('Please check its existance and permission.');
    process.exit(1);
    return undefined;
  }
}

const runText = async ({ message, file }, token, todo) => {
  const memobird = new Memobird(token);
  await memobird.init();
  let text = message || (file ? fs.readFileSync(file, 'utf-8') : await getStdin());
  debug({ text });
  if (todo)
  {
    text = text.replace(/(^|\n)(.)/g, '$1□ $2');
    debug({ text });
  }
  await memobird.printText(text);
}

module.exports = yargRoot
  .strict()
  .option('token-file', {
    describe: 'Credential file for memobird',
    default: path.join(os.homedir(), '.memobird-cli'),
    type: 'string',
  })
  .command(['todo', '$0'], 'Print todo list from stdin', (yargs) => {
  }, (argv) => {
    const token = readToken(argv);
    runText(argv, token, true).catch((e) => {
      debug(e);
      console.error(e);
      process.exit(1);
    });
  })
  .command(['text [-m <message> | -f <file>]', '$0'], 'Print text message', (yargs) => {
    yargs
      .option('m', {
        alias: 'message',
        describe: 'Print this as literal',
        type: 'string',
      })
      .option('f', {
        alias: 'file',
        describe: 'Text file to be read from',
        type: 'string',
      })
      .conflicts('m', 'f');
  }, (argv) => {
    const token = readToken(argv);
    runText(argv, token, false).catch((e) => {
      debug(e);
      console.error(e);
      process.exit(1);
    });
  })
  .help()
  .parse;
