import Eris from "eris";
import handler from "./handler";

export default class Akashi {
    static config = null;
    static bot = null;

    constructor({ token, prefixes }) {
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

        this.bot.on("messageCreate", handler.onMessage);
    }

    connect() {
        return this.bot.connect();
    }
}
