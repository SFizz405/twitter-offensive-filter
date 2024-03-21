chrome.runtime.onMessageExternal.addListener(
    async (request, sender, sendResponse) => {
        const offensive = await fetch("https://raw.githubusercontent.com/MosasoM/inappropriate-words-ja/master/Offensive.txt").then(res => res.text());
        const sexual = await fetch("https://raw.githubusercontent.com/MosasoM/inappropriate-words-ja/master/Sexual.txt").then(res => res.text());
        const sexual_bopo = await fetch("https://raw.githubusercontent.com/MosasoM/inappropriate-words-ja/master/Sexual_with_bopo.txt").then(res => res.text());
        const sexual_mask = await fetch("https://raw.githubusercontent.com/MosasoM/inappropriate-words-ja/master/Sexual_with_mask.txt").then(res => res.text());
        sendResponse({ banned_words: offensive + sexual + sexual_bopo + sexual_mask });
    }
);