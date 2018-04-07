import Eris from "eris";
import handler from "./handler";
import fs from "fs";
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

        for (const file of fs.readdirSync(path.resolve(__dirname, dir || "cmds"))) {
            require(path.resolve(__dirname, dir || "cmds", file));
        }

        this.bot.on("messageCreate", handler.onMessage);
    }

    connect() {
        return this.bot.connect();
    }
}
