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
                            return ["full_text", "name", "text"].includes(key) ? "たいすけ" : value;
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