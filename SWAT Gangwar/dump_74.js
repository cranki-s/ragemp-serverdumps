{

var soundBrowser;

mp.events.add({
    'sound:play': (name) => {
        if (soundBrowser == null) {
            soundBrowser = mp.browsers.new('package://cef/Sound/index.html')
            soundBrowser.execute(`playSound("${name}")`)
        }
    },
    'sound:hitmarker': (name) => {
            soundBrowser = mp.browsers.new('package://cef/Sound/index.html')
    },
    'sound:cancel': () => {
        if (soundBrowser != null) {
            soundBrowser.destroy()
            soundBrowser = null
        }
    }
})
}