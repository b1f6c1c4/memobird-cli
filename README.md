# memobird-cli

[![npm](https://img.shields.io/npm/v/memobird-cli.svg?style=flat-square)](https://www.npmjs.com/package/memobird-cli)
[![npm](https://img.shields.io/npm/dt/memobird-cli.svg?style=flat-square)](https://www.npmjs.com/package/memobird-cli)
[![GitHub last commit](https://img.shields.io/github/last-commit/b1f6c1c4/memobird-cli.svg?style=flat-square)](https://github.com/b1f6c1c4/memobird-cli)
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/b1f6c1c4/memobird-cli.svg?style=flat-square)](https://github.com/b1f6c1c4/memobird-cli)
[![license](https://img.shields.io/github/license/b1f6c1c4/memobird-cli.svg?style=flat-square)](https://github.com/b1f6c1c4/memobird-cli/blob/master/LICENSE)

> lpr for memobird

## TL;DR

```sh
$ npm i -g memobird-cli
# Put your credentials here
$ vim ~/.memobird-cli
$ memo -m 'hello world'
$ memo -f /etc/os-release
$ memo
some random text
some more random test
^D
$ memo todo
todo item 1
todo item 2
todo item 3
^D
```

## Installation

```sh
$ npm install --global memobird-cli
```
## Usage

```
memo.js [-m <message> | -f <file>]

Print text message

Commands:
  memo.js todo                             Print todo list from stdin
  memo.js text [-m <message> | -f <file>]  Print text message          [default]

Options:
  --version      Show version number                                   [boolean]
  --token-file   Credential file for memobird
                                       [string] [default: "$HOME/.memobird-cli"]
  --help         Show help                                             [boolean]
  -m, --message  Print this as literal                                  [string]
  -f, --file     Text file to be read from                              [string]
```
