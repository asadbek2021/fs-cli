import { User } from "./user.js";
import { Hash } from "./hash.js";
import { FileSystem } from "./fs.js";
import { Process } from "./process.js";
import { OperatingSystem } from "./os.js";
import { Messenger } from "./messenger.js";
import { Commander } from "./commander.js";
import { BrotliCompress } from "./brotli-archive.js";
import { CompressTransformStream } from "./streams/compress-transform.js";
import { DecompressTransformStream } from "./streams/decompress-transform.js";

const newProcess = new Process();
const newOS = new OperatingSystem()
const messenger = new Messenger(
    newProcess, 
    new User(
        newProcess.argumentValue("username")
    )
);

const commander = new Commander(
    new FileSystem(
        newProcess,
        new Hash(),
        new CompressTransformStream(
            new BrotliCompress()
        ),
        new DecompressTransformStream(
            new BrotliCompress()
        )
    ),
    newOS,
    newProcess
);


newProcess.changeWorkingDirectory(newOS.homeDirectory());

newProcess
    .onExit(() => messenger.finish())
    .listen((data) => {
        commander.parseCommand(data.toString());
        messenger.afterEachMessage();
    });



messenger.greetWithUsername()
messenger.afterEachMessage();