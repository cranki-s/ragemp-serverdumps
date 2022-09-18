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
    onGetLanguage() {
      const lang = "ua";
      mp.events.remove("Global:Client:GetLanguage", Browser.onGetLanguage);
      Browser.emit("Global:CEF:SetLanguage", lang);
    },
    onBrowserReady() {
      //Browser.readyResolve();
      mp.events.remove(
        "Global:Client:BrowserReady",
        Browser.onBrowserReady
      );
    },
    setRoute(routeName) {
      return new Promise(() => {
        Browser.emit("Global:CEF:SetRoute", routeName);
      });
    },
  };
Object.assign(global.NexusSpa, Browser);
mp.events.add("Global:Client:GetLanguage", Browser.onGetLanguage);
mp.events.add("Global:Client:BrowserReady", Browser.onBrowserReady);
  
}