import Akashi from "./Akashi";
import ext from "./ext";
import parser from "./util/parser";

export default {
    async onMessage(msg) {
        if (msg.author.bot) return;

        const content = msg.content.trim();
        const prefix = Akashi.config.prefixes.find(p => content.startsWith(p));

        if (prefix) {
            const prefixless = content.substring(prefix.length);
            const splitted = prefixless.split(" ");
            const cmd = splitted[0];
            const argsSplitted = splitted.slice(1);
            const args = parser.parsePosix(argsSplitted.join(" "));

            if (ext.loaded.has(cmd)) {
                const c = ext.loaded.get(cmd);

                const ret = c.func(args.argMap, ...(args.unmatched));

                if (ret instanceof Promise) {
                    ret.then(t => msg.channel.createMessage(t).catch(console.error)).catch(console.error);
                } else {
                    msg.channel.createMessage(ret);
                }
            }
        }
    }
};
