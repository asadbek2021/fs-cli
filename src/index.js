import { Messenger } from "./messenger.js";
import { FileSystem } from "./fs.js";
import { OperatingSystem } from "./os.js";
import { Process } from "./process.js";
import { Commander } from "./commander.js";
import { User } from "./user.js";

const newProcess = new Process();
const messenger = new Messenger(
    newProcess, 
    new User(newProcess.argumentValue("username"))
);

const commander = new Commander(
    messenger,
    new FileSystem(
        newProcess
    ),
    new OperatingSystem(),
    newProcess
);

newProcess
    .onExit(() => messenger.finish())
    .listen((data) => {
        commander.parseCommand(data.toString());
        messenger.afterEachMessage();
    });



messenger.greetWithUsername()