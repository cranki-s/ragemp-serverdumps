{
require("./UIMenu/Menu.js");

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
    mp.events.callRemote("ReqLogFromSrv", username, logTextToType(type));
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
            UIMenu.execute(`gm.$refs.logs.rows = ["Timestamp", "Description"];`);
            UIMenu.execute(`gm.$refs.logs.columns = ${jsonLogs}`);
            break;
        }
        case 2:{ // session
            UIMenu.execute(`gm.$refs.logs.rows = ["Join Time", "Leave Time", "Duration", "IP", "HWID"];`);
            UIMenu.execute(`gm.$refs.logs.columns = ${jsonLogs}`);
            break;
        }
        case 3:{ // admin records
            UIMenu.execute(`gm.$refs.logs.rows = ["Timestamp", "Admin", "Duration", "Reason"];`);
            UIMenu.execute(`gm.$refs.logs.columns = ${jsonLogs}`);
            break;
        }
    }

});
}