const OS = require("os");

export class OperatingSystem {
    #os;

    constructor(os) {
      this.#os = os  
    }

    homeDirectory() {
        return this.#os.homedir();
    }
    
    processingCores() {
        return this.#os.cpus();
    }

    username() {
        return this.#os.userInfo({encoding: "utf-8"})
    }

    architecture() {
        return this.#os.arch();
    }

    endOfLineCharacter() {
        return this.#os.EOL;
    }
}