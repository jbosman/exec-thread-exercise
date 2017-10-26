const nsssh = require('./shell/cmdline.js');
const { stdInRead, stdOutWrite } = require('./io/std_io');

nsssh.runShell(stdInRead, stdOutWrite);