{
let Darkmode = false

mp.events.add("setDarkMode", (value) => {
    Darkmode = value;
})

mp.events.add("browserCreated", (browser) => {
    if (Darkmode) {
        browser.execute(`
            let path = ""

            for (element of document.getElementsByTagName( "head" )[0].children)
                if (element.href && element.href.indexOf("gtaworld.css") != -1) 
                    path = element.href.replace("gtaworld.css", "gtaworld_dark.css");
                
            let link = document.createElement( "link" );
            link.href = path;
            link.type = "text/css";
            link.rel = "stylesheet";
            link.media = "screen,print";
      
            document.getElementsByTagName( "head" )[0].appendChild( link );
       `)
    }

    browser.execute(`
        for (element of document.getElementsByTagName( "head" )[0].children)
            if (element.href && element.href.indexOf("gtaworld.css") != -1) 
                document.getElementsByTagName("html")[0].style.display = 'block';
    `)
})

}