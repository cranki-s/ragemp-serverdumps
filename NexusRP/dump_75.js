{
global.FarmBrowser = null;
mp.events.add('Farm:CreateBrowser',()=>{
    if(FarmBrowser == null){
        FarmBrowser = mp.browsers.new('http://package/systems/jobs/farm/FRONT/index.html');
        FarmBrowser.name = 'nexusbrowser';
        FarmBrowser.execute(`app.locale='${global.Language}'`);
        global.menuOpen();
    }
});
mp.events.add('Farm:BrowserExecute',(params)=>{
    if(FarmBrowser != null){
        FarmBrowser.execute(`${params}`)
    }
});
mp.events.add('Farm:DestroyBrowser',()=>{
    if(FarmBrowser != null){
        global.menuClose();
        FarmBrowser.destroy();
        FarmBrowser = null;
    }
});
}