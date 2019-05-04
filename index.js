const os = require('os');
const path = require('path');
const fs = require('fs');
const yargRoot = require('yargs');
const debug = require('debug')('memobird-cli');
const Table = require('cli-table');

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

const runText = async ({ text }, token) => {
  // TODO
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
      console.error(e.message);
      if (e.response) {
        console.error(e.response.data);
      }
      process.exit(1);
    });
  })
  .help()
  .parse;
