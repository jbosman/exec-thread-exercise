// Created to use terminal commands in shell during development
const nsssh = require('./shell');
const { stdInRead, stdOutWrite } = require('../io/std_io');

nsssh.runShell(stdInRead, stdOutWrite);