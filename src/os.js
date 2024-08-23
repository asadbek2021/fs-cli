import OS from "os";

export class OperatingSystem {
    #os = OS;

    constructor() {}

    homeDirectory() {
        return this.#os.homedir();
    }
    
    processingCores() {
        const cores = this.#os.cpus();

        return cores.map((core) => ({
            model: core.model,
            speed: core.speed
        }));
    }

    username() {
        return this.#os.userInfo({ encoding: "utf-8" }).username;
    }

    architecture() {
        return this.#os.arch();
    }

    endOfLineCharacter() {
        return this.#os.EOL;
    }
}