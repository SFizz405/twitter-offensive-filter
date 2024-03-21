chrome.runtime.sendMessage("klnfgbcambpdgbgefgkcmlggeolhlelc", {}, (resObj) => {
    banned_words = resObj.banned_words.match(/[^\n]+/g);
    accepted_words = ["So", "SO"];

    (function (xhr) {
        const open = xhr.open;

        xhr.open = function (method, url, async) {
            const send = this.send;

            this.send = function (data) {
                const rsc = this.onreadystatechange;

                if (rsc) {
                    this.onreadystatechange = function () {
                        if (this.readyState === 4 && /^https:\/\/twitter\.com\/i\/api\/graphql\//.test(this.responseURL)) {
                            const response = JSON.parse(this.response, (key, value) => {
                                const isText = ["full_text", "name", "text", "description", "screen_name"].includes(key);

                                if (isText && (typeof value === "string" || value instanceof String) && value) {
                                    const hasBanned = banned_words.some(word => !accepted_words.includes(word) && value.includes(word));
                                    return hasBanned ? "🤬 - 不適切な言葉を含んでいたため、ブロックされました" : value;
                                }

                                return value;
                            });

                            Object.defineProperty(this, "response", { value: JSON.stringify(response) });
                            Object.defineProperty(this, "responseText", { value: JSON.stringify(response) });
                        };
                        return rsc.apply(this, arguments);
                    }
                }
                return send.apply(this, arguments);
            };
            return open.apply(this, arguments);
        };
    })(XMLHttpRequest.prototype);
});