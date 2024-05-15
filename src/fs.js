import FS from "fs"; 
import PATH from "path"; 

export class FileSystem {
    #process;
    #hash;
    #compressTransform;
    #decompressTransform;

    #fs = FS;
    #path = PATH;


    constructor(ps, hash, cts, dts) {
        this.#process = ps;
        this.#hash = hash;
        this.#compressTransform = cts;
        this.#decompressTransform = dts;
    }

    moveUpDir() {
        // TO-DO it should not go up then home directory
        this.#process.changeWorkingDirectory("..");
    }

    goToDirectory(path) {
        const jointPath = this.#path.join(this.#process.currentDirectory(), path);

        this.#process.changeWorkingDirectory(jointPath);
    }

    listAll() {
        const list = this.#fs.readdirSync("./", { withFileTypes: true }).map((elem) => ({
            name: elem.name,
            type: elem.isFile() ? "file" : "directory"
        }))

        console.table(list);
    }

    printFileContent(path) {
        const jointPath = this.#path.join(this.#process.currentDirectory(), path)
        const rs = this.#fs.createReadStream(jointPath, { encoding: "utf-8" });
        let data = "";

        rs.on("data", (chunk) => {
            data += chunk.toString();
        });

        rs.once("end", () => this.#process.print(
            this.#process.print(data)
        ));
    }

    createFile(pathToFile) {
        this.#fs.writeFileSync(pathToFile, "")   
    }

    renameFile(pathToOldFile, newName) {
        const dirname = this.#path.dirname(pathToOldFile);
        const newPath = this.#path.join(dirname, newName);

        this.#fs.renameSync(pathToOldFile, newPath);
    }

    copyFile(filePath, pathToCopy) {
        const filename = this.#path.basename(filePath);
        const newPath = this.#path.join(pathToCopy, filename);
        this.#fs.cpSync(filePath, newPath);
    }

    moveFile(filePath, destinationDir) {
        const fileName = this.#path.basename(filePath);
        const newPath = this.#path.join(destinationDir, fileName);

        this.#fs.renameSync(filePath, newPath);
    }

    removeFile(filePath) {
        this.#fs.unlinkSync(filePath);  
    }

    hashFile(filePath) {
        const buffer = this.#fs.readFileSync(filePath)

        this.#hash.createHash("sha256");
        this.#hash.appendHash(buffer);
        this.#process.print(
            this.#hash.digestHash("hex")
        );
    }

    compressFile(filePath, destination) {
        const rs = this.#fs.createReadStream(filePath)
        const filename = this.#path.basename(filePath) + ".br"
        const newPath = this.#path.join(destination, filename);
        const ws = this.#fs.createWriteStream(newPath)

        rs.pipe(this.#compressTransform).pipe(ws)
    }

    decompressFile(filePath, destination) {
        const readStream = this.#fs.createReadStream(filePath)
        const extName = this.#path.extname(filePath);
        const filename = this.#path.basename(filePath).replace(extName, "")
        const newPath = this.#path.join(destination, filename);
        const writeStream = this.#fs.createWriteStream(newPath)

        readStream.pipe(this.#decompressTransform).pipe(writeStream)
    }
}