const os = require('os');
const path = require('path');
const fs = require('fs');
const yargRoot = require('yargs');
const debug = require('debug')('memobird-cli');
const Memobird = require('memobird');
const getStdin = require('get-stdin');

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

const runText = async ({ file }, token) => {
  const memobird = new Memobird(token);
  await memobird.init();
  const text = file ? fs.readFileSync(file, 'utf-8') : await getStdin();
  debug({ text });
  await memobird.printText(text);
}

module.exports = yargRoot
  .strict()
  .option('token-file', {
    describe: 'Credential file for memobird',
    default: path.join(os.homedir(), '.memobird-cli'),
    type: 'string',
  })
  .command(['text [<file>]', '$0'], 'Print text', (yargs) => {
    yargs
      .positional('file', {
        describe: 'The file',
        type: 'string',
      });
  }, (argv) => {
    const token = readToken(argv);
    runText(argv, token).catch((e) => {
      debug(e);
      console.error(e);
      process.exit(1);
    });
  })
  .help()
  .parse;
