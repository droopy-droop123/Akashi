export default {
    loaded: new Map(),
    unloaded: new Map(),
    command(name, description = null) {
        return (clazz, func, descriptor) => {
            const n = (name || func).toLowerCase();

            if (!this.loaded.has(n)) {
                this.loaded.set(n, {
                    func: descriptor.value,
                    subcommands: new Map(),
                    description
                });
            } else {
                console.warn("Command exists:", n);
            }
        };
    },
    unload(name) {
        if (this.loaded.has(name)) {
            const cmd = this.loaded.get(name);

            this.loaded.delete(name);
            this.unloaded.set(name, cmd);
            return true;
        } else {
            return false;
        }
    },
    load(name) {
        if (this.unloaded.has(name)) {
            const cmd = this.unloaded.get(name);

            this.unloaded.delete(name);
            this.loaded.set(name, cmd);
            return true;
        } else {
            return false;
        }
    },
    subcommand(root, name, description = null) {
        return (clazz, func, descriptor) => {
            if (this.loaded.has(root)) {
                const n = (name || func).toLowerCase();
                const cmd = this.loaded.get(root);

                cmd.subcommands.set(n, {
                    func: descriptor.value,
                    description
                });
            } else {
                console.warn("Command doesn't exist:", root);
            }
        };
    }
};
