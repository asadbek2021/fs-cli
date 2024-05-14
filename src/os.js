import OS from "os";

export class OperatingSystem {
    #os = OS;

    constructor() {}

    homeDirectory() {
        return this.#os.homedir();
    }
    
    processingCores() {
        return this.#os.cpus();
    }

    username() {
        return this.#os.userInfo({ encoding: "utf-8" })
    }

    architecture() {
        return this.#os.arch();
    }

    endOfLineCharacter() {
        return this.#os.EOL;
    }
}