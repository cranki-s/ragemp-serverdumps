{
require("./ServerUI/Menu.js");


function logTextToType(type){
    switch(type){
        case "records": return 3;
        case "admin": return 1;
        case "sessions": return 2;
        default: return -1;  
    }
}
function logTypeToText(type){
    switch(type){
        case 3: return "records";
        case 1: return "admin";
        case 2: return "sessions";
        default: return "null";  
    }
}

mp.events.add("RequestLogsFromServer", (type, username) => {
    ServerUI.execute('gm.$refs.mainMenu.$refs.logsTab.isLoading = true;');
    mp.events.callRemote("ReqLogFromSrv", username, type);
});
mp.events.add("Menu_SetLogsTabLoading", (toggle) => {
    ServerUI.execute(`gm.$refs.mainMenu.$refs.logsTab.isLoading = ${toggle};`);
});
mp.events.add("ReturnLogsToClient", (type, jsonLogs) => {

    jsonLogs = jsonLogs.replaceAll("{", "[");
    jsonLogs = jsonLogs.replaceAll("}", "]");

    for(let i = 1 ; i < 20 ; i++){
        let strcheck = `"Item${i}":`;
        if(jsonLogs.includes(strcheck)){
            jsonLogs = jsonLogs.replaceAll(strcheck, "");
        }
        else break;
    }

    switch(type){
        case 1:{ // admin
            ServerUI.execute(`gm.$refs.mainMenu.$refs.logsTab.rows = ["Timestamp", "Description"];`);
            ServerUI.execute(`gm.$refs.mainMenu.$refs.logsTab.cols = ${jsonLogs}`);
            break;
        }
        case 2:{ // session
            ServerUI.execute(`gm.$refs.mainMenu.$refs.logsTab.rows = ["Join Time", "Leave Time", "Duration", "IP", "HWID"];`);
            ServerUI.execute(`gm.$refs.mainMenu.$refs.logsTab.cols = ${jsonLogs}`);
            break;
        }
        case 3:{ // admin records
            ServerUI.execute(`gm.$refs.mainMenu.$refs.logsTab.rows = ["Timestamp", "Admin", "Duration", "Reason"];`);
            ServerUI.execute(`gm.$refs.mainMenu.$refs.logsTab.cols = ${jsonLogs}`);
            break;
        }
    }
    ServerUI.execute('gm.$refs.mainMenu.$refs.logsTab.isLoading = false;');

});
}