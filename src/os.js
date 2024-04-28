const OS = require("os");

export class OperatingSystem {
    constructor() {}

    homeDirectory() {
        return OS.homedir();
    }
    
    processingCores() {
        return OS.cpus();
    }

    username() {
        return OS.userInfo({encoding: "utf-8"})
    }

    architecture() {
        return OS.arch();
    }

    endOfLineCharacter() {
        return OS.EOL;
    }
}