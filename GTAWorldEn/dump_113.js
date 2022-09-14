{
function BLACKLISTED_CATEGORY(name, isOnDuty=false){
    if (name == "visual") return true 
    if (name && name.toLowerCase() == "spray" && isOnDuty) return true 
    return false
}

function BLACKLISTED_COMPONENT(name, isOnDuty){
    if (name && name.toLowerCase() == "drum magazine" && isOnDuty) return true 
    if (name && name.toLowerCase() == "box magazine" && isOnDuty) return true 
    if (name && name.toLowerCase() == "drum magazine" && isOnDuty) return true 
    return false
}
}