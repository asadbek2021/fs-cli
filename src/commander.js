export class Commander {
    #messenger;
    #fileSystem;
    #operatingSystem;
    #process;

    constructor(messenger, fs, os, ps) {
        this.#messenger = messenger;
        this.#fileSystem = fs;
        this.#operatingSystem = os;
        this.#process = ps;
    }

    parseCommand(command) {
        const parts = command.replace("\n", "").split(" ");

        switch(parts[0]) {
            case "os":
                switch(parts[1]) {
                    case "--EOL":
                        this.#process.print(this.#operatingSystem.endOfLineCharacter());
                        break;
                    case "--cpus":
                        console.table(this.#operatingSystem.cpus());
                        break;
                    case "--homedir":
                        this.#process.print(this.#operatingSystem.homeDirectory());
                        break;
                    case "--username":
                        this.#process.print(this.#operatingSystem.username());
                        break;
                    case "--architecture":
                        this.#process.print(this.#operatingSystem.architecture());
                        break;
                    default: 
                        throw new Error("Invalid Input! [OS]: Unknow options")
                }
                break;
            case "cat":
                this.#fileSystem.printFileContent(parts[1])
                break;
            case "add":
                // continue
        }
    }

}
