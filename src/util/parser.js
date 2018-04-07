export default {
    tokenize(str) {
        const tokens = [];
        let escaping = false;
        let quoteChar = "";
        let quoting = false;
        let intermediate = "";

        for (const char of str) {
            if (escaping) {
                intermediate += char;
                escaping = false;
            } else if (char === "\\" && !(quoting && quoteChar === "'")) {
                escaping = true;
            } else if (quoting && char === quoteChar) {
                quoting = false;
            } else if (!quoting && (char === "'" || char === "\"")) {
                quoting = true;
                quoteChar = char;
            } else if (!quoting && char === " ") {
                if (intermediate) {
                    tokens.push(intermediate);
                    intermediate = "";
                }
            } else {
                intermediate += char;
            }
        }

        // if (quoting) {}
        
        if (intermediate) {
            tokens.push(intermediate);
        }

        return tokens;
    },
    splitOnFirst(str, delimiter) {
        let first = "";
        let second = "";
        let isSecond = false;

        for (const char of str) {
            if (!isSecond && char === delimiter) {
                isSecond = true;
                continue;
            }

            if (isSecond) {
                second += char;
            } else {
                first += char;
            }
        }

        return [first, second];
    },
    parsePosix(tokens) {
        if (typeof tokens === "string") {
            tokens = this.tokenize(tokens);
        }

        const unmatched = [];
        const argMap = {};
        let nextKey = null;

        for (const token of tokens) {
            if (token.startsWith("-")) {
                if (nextKey) {
                    argMap[nextKey] = true;
                    nextKey = null;
                }

                const cut = token.startsWith("--") ? 2 : 1;
                const kv = token.substring(cut);

                const [k, v] = this.splitOnFirst(kv, "=");

                if (!k) {
                    // TODO throw an error
                    continue;
                }

                if (cut > 1) {
                    if (!v) {
                        nextKey = k;
                    } else {
                        argMap[k] = v;
                    }
                } else {
                    const lastK = k.charAt(k.length);

                    if (!v) {
                        nextKey = lastK;
                    } else {
                        argMap[lastK] = v;
                    }

                    const head = k.substring(0, k.length - 1);
                
                    for (const sk of head) {
                        argMap[sk] = true;
                    }
                }
            } else if (nextKey != null) {
                argMap[nextKey] = token;
                nextKey = null;
            } else {
                unmatched.push(token);
            }
        }

        return { unmatched, argMap };
    }
};
