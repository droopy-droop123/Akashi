import Eris from "eris";

export default class Akashi {
    static bot = new Eris(process.env.BOT_TOKEN, {
        disableEvents: {
            TYPING_START: true
        }
    });

    constructor() {
        /* do stuff here */
    }

    connect() {
        return Akashi.bot.connect();
    }
}
