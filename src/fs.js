import FS from "fs"; 
import PATH from "path"; 

export class FileSystem {
    #process
    #fs = FS
    #path = PATH


    constructor(ps) {
        this.#process = ps;
    }

    moveUpDir() {
        this.#process.changeWorkingDirectory("../");
    }

    goToDirectory(path) {
        const jointPath = this.#path.join(this.#process.currentDirectory(), path);

        this.#process.changeWorkingDirectory(jointPath);
    }

    listAll() {
        return this.#fs.readdirSync("./", { withFileTypes: true }).map((elem) => ({
            name: elem.name,
            type: elem.isFile() ? "file" : "directory"
        }))
    }

    printFileContent(path) {
        console.table(this.listAll())
        const jointPath = this.#path.join(this.#process.currentDirectory(), path)
        const rs = this.#fs.createReadStream(jointPath, { encoding: "utf-8" });
        let data = "";

        rs.on("data", (chunk) => {
            data += chunk.toString()
        })

        rs.once("end", () => this.#process.print(
            this.#process.print(data)
        ))
    }
}