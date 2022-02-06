{
﻿
var soundBrowser;

mp.events.add({
    'sound:play': (name) => {
        if (soundBrowser == null) {
            soundBrowser = mp.browsers.new('package://gtalife/Sound/index.html')
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