export class Commander {
    #fileSystem;
    #operatingSystem;
    #process;

    constructor(fs, os, ps) {
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
                        console.table(this.#operatingSystem.processingCores());
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
            case "ls":
                this.#fileSystem.listAll()
                break;
            case "up":
                this.#fileSystem.moveUpDir()
                break;
            case "cd":
                this.#fileSystem.goToDirectory(parts[1])
                break;
            case "cat":
                this.#fileSystem.printFileContent(parts[1])
                break;
            case "add":
                this.#fileSystem.createFile(parts[1])
                break;
            case "rn":
                this.#fileSystem.renameFile(parts[1], parts[2])
                break;
            case "cp":
                this.#fileSystem.copyFile(parts[1], parts[2])
                break;
            case "mv":
                this.#fileSystem.moveFile(parts[1], parts[2])
                break;
            case "rm":
                this.#fileSystem.removeFile(parts[1])
                break;
            case "hash":
                this.#fileSystem.hashFile(parts[1])
                break;
            case "compress":
                this.#fileSystem.compressFile(parts[1], parts[2])
                break;
            case "decompress":
                this.#fileSystem.decompressFile(parts[1], parts[2])
                break;
        }
    }

}
