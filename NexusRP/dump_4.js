{
global.NexusSpa = mp.browsers.new('http://package/FrontendSide/index.html'); 
const Browser = {
  argsToString(args) {
    return args
      .map((arg) => {
        if (typeof arg === "object") {
          return JSON.stringify(arg);
        } else if (typeof arg === "string") {
          try {
            JSON.parse(arg);
            return arg;
          } catch {
            return `"${arg}"`;
          }
        } else {
          return arg;
        }
      })
      .join(",");
  },
  emit(eventName, ...args) {
    const strArgs = Browser.argsToString(args);
    global.NexusSpa.execute(`window.Environment.call("${eventName}",${strArgs})`);
  },
  isReady() {
    return new Promise((resolve) => {
      Browser.readyResolve = resolve;
    });
  },
  onBrowserReady() {
    //Browser.readyResolve();
    global.NexusSpa.setLanguage('ua')
    mp.events.remove("C:Global:BrowserReady", Browser.onBrowserReady);
  },
  setRoute(routeName) {
    Browser.emit("W:Global:SetRoute", routeName);
  },
  setLanguage(locale) {
    Browser.emit("W:Global:SetLanguage", locale);
  },
  setStore(storePath, palyload) {
    Browser.emit("W:Global:SetStore", storePath, palyload);
  },
};
Object.assign(global.NexusSpa, Browser);
mp.events.add("C:Global:BrowserReady", Browser.onBrowserReady);
}