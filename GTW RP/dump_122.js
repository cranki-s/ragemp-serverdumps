{

let soundBrowser = null;

mp.events.add({
    'sound:play': (name, volume = 1.0) => {
        if (soundBrowser != null) return;

        soundBrowser = mp.browsers.new('package://gtalife/Sound/index.html')
        soundBrowser.execute(`playSound("${name}", ${volume})`)
    },
    'sound:cancel': () => {
        if (soundBrowser == null) return;

        soundBrowser.destroy();
        soundBrowser = null;
    }
})
}