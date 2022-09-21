{

var soundBrowser;

mp.events.add('sound:playPurge', () => {
    if (soundBrowser == null) {
        soundBrowser = mp.browsers.new('package://gvmp/media/index.html')
        soundBrowser.execute(`playSound("Purge")`)
    }
});

mp.events.add('sound:playPURGES', () => {
    if (soundBrowser == null) {
        soundBrowser = mp.browsers.new('package://gvmp/media/index.html')
        soundBrowser.execute(`playSound("PURGES")`)
    }
});

mp.events.add({
    'sound:play': (name) => {
        if (soundBrowser == null) {
            soundBrowser = mp.browsers.new('package://gvmp/media/index.html')
            soundBrowser.execute(`playSound("${name}")`)
        }
    },
    'sound:cancel': () => {
        if (soundBrowser != null) {
            soundBrowser.destroy()
            soundBrowser = null
        }
    }
})
}