import Eris from "eris";
import handler from "./handler";
import glob from "glob";
import path from "path";

export default class Akashi {
    static config = null;
    static bot = null;

    constructor({ token, prefixes, dir }) {
        this.config = {
            token,
            prefixes
        };

        Akashi.config = this.config;

        this.bot = new Eris(token, {
            disableEvents: {
                TYPING_START: true
            }
        });

        Akashi.bot = this.bot;

        for (const file of glob.sync(path.resolve(__dirname, dir || "cmds", "**/*.js"))) {
            require(file);
        }

        this.bot.on("messageCreate", handler.onMessage);
    }

    connect() {
        return this.bot.connect();
    }
}
