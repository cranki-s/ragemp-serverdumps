{
var keyCodes = [
    { "key": "ARROWLEFT", "keyCode": 37 },
    { "key": "ARROWRIGHT", "keyCode": 39 },
    { "key": "0", "keyCode": 48 },
    { "key": "1", "keyCode": 49 },
    { "key": "2", "keyCode": 50 },
    { "key": "3", "keyCode": 51 },
    { "key": "4", "keyCode": 52 },
    { "key": "5", "keyCode": 53 },
    { "key": "6", "keyCode": 54 },
    { "key": "7", "keyCode": 55 },
    { "key": "8", "keyCode": 56 },
    { "key": "9", "keyCode": 57 },
    { "key": "A", "keyCode": 65 },
    { "key": "B", "keyCode": 66 },
    { "key": "C", "keyCode": 67 },
    { "key": "D", "keyCode": 68 },
    { "key": "E", "keyCode": 69 },
    { "key": "F", "keyCode": 70 },
    { "key": "G", "keyCode": 71 },
    { "key": "H", "keyCode": 72 },
    { "key": "I", "keyCode": 73 },
    { "key": "J", "keyCode": 74 },
    { "key": "K", "keyCode": 75 },
    { "key": "L", "keyCode": 76 },
    { "key": "M", "keyCode": 77 },
    { "key": "N", "keyCode": 78 },
    { "key": "O", "keyCode": 79 },
    { "key": "P", "keyCode": 80 },
    { "key": "Q", "keyCode": 81 },
    { "key": "R", "keyCode": 82 },
    { "key": "S", "keyCode": 83 },
    { "key": "T", "keyCode": 84 },
    { "key": "U", "keyCode": 85 },
    { "key": "V", "keyCode": 86 },
    { "key": "W", "keyCode": 87 },
    { "key": "X", "keyCode": 88 },
    { "key": "Y", "keyCode": 89 },
    { "key": "Z", "keyCode": 90 },
    { "key": "NUMPAD0", "keyCode": 96 },
    { "key": "NUMPAD1", "keyCode": 97 },
    { "key": "NUMPAD2", "keyCode": 98 },
    { "key": "NUMPAD3", "keyCode": 99 },
    { "key": "NUMPAD4", "keyCode": 100 },
    { "key": "NUMPAD5", "keyCode": 101 },
    { "key": "NUMPAD6", "keyCode": 102 },
    { "key": "NUMPAD7", "keyCode": 103 },
    { "key": "NUMPAD8", "keyCode": 104 },
    { "key": "NUMPAD9", "keyCode": 105 },
    { "key": "NUMPADMULTIPLY", "keyCode": 106 },
    { "key": "NUMPADADD", "keyCode": 107 },
    { "key": "NUMPADSUBTRACT", "keyCode": 109 },
    { "key": "NUMPADDECIMAL", "keyCode": 110 },
    { "key": "NUMPADDIVIDE", "keyCode": 111 },
    { "key": ";", "keyCode": 186 },
    { "key": "=", "keyCode": 187 },
    { "key": ",", "keyCode": 188 },
    { "key": "-", "keyCode": 189 },
    { "key": ".", "keyCode": 190 },
    { "key": "/", "keyCode": 191 },
    { "key": "[", "keyCode": 219 },
    { "key": "\\", "keyCode": 220 },
    { "key": "]", "keyCode": 221 },
    { "key": "\'", "keyCode": 222 },
];

function isValidHotKey(key)
{
    var item = keyCodes.find(item => {return item.keyCode == key});
    var found = true;
    if(item === undefined || item === null) found = false;
    return found;
}

function GetHotKey(key)
{
    var item = keyCodes.find(item => {return item.keyCode == key});
    if(item === undefined || item === null) return null;
    return item;
}

function GetHotKeyEx(key)
{
    var item = keyCodes.find(item => {return item.key == key});
    if(item === undefined || item === null) return null;
    return item;
}

/*function sorter(firstKey) {
    return function(a, b) {  
        if (a[firstKey] < b[firstKey]) {  
			return -1;  
		} else if (a[firstKey] > b[firstKey]) {  
			return 1;  
		}
    }  
}*/
}