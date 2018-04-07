import ext from "../ext";

export default class Generic {
    @ext.command()
    ping() {
        return "Pong!";
    }

    @ext.subcommand("ping")
    pong() {
        return "Ping!";
    }
}
