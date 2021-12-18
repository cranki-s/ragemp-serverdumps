{
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

require('./modules/modules');

},{"./modules/modules":178}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _apps = require("./apps");

var _apps2 = _interopRequireDefault(_apps);

var _component = require("../components/component");

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class App extends _component2.default {
    constructor(name, ...events) {
        super(name, ...events);
        _apps2.default.apps.set(name, this);
    }
}

exports.default = App;

},{"../components/component":94,"./apps":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _browser = require("../browser/browser");

var _browser2 = _interopRequireDefault(_browser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// let showCursor = () => mp.game.invoke("0xAAE7CE1D63167423")

class Apps {
    constructor() {
        this.apps = new Map();
        this.componentVisibleApp = new Map();
        this.SmartphoneApp = "";

        mp.events.add("openApp", (component, name, args) => {
            if (!this.apps.has(name)) return;
            let app = this.apps.get(name);
            app.args = args;
            this.show(component, name, args);
        });

        mp.events.add("openComputer", () => {
            this.show("Computer", "ComputerMainScreen");
        });

        mp.events.add("closeComputer", () => {
            this.show("Computer", null);
        });

        mp.events.add("openIpad", () => {
            this.show("Ipad", "IpadMainScreen");
        });

        mp.events.add("closeIpad", () => {
            this.show("Ipad", null);
        });

        mp.events.add("hatNudeln", state => {
            if (state) {
                this.show("Smartphone", "PhoneMainScreen");
            } else {
                this.show("Smartphone", null);
            }
        });
    }

    show(component = "Smartphone", name, args) {
        if (name == null) {
            this.componentVisibleApp[component] = name;
            if (component == "Smartphone") {
                _browser2.default.execute(component, `invisible()`);

                // Make sure messenger app context menu is closed!
                _browser2.default.execute('MessengerOverviewApp', `hideActionSheet()`);
            } else {
                _browser2.default.execute(component, `show(null)`);
            }
            // mp.events.remove("render", showCursor)
            mp.gui.cursor.visible = false;
        } else if (name == "CallManageApp") {
            this.SmartphoneApp = "PhoneScreen";
            mp.gui.cursor.visible = false;
            // mp.events.add("render", showCursor)
            if (args && args.length > 0) {
                _browser2.default.execute(component, `show("${name}", '${args}')`);
            } else {
                _browser2.default.execute(component, `show("${name}")`);
            }

            // Make sure messenger app context menu is closed!
            _browser2.default.execute('MessengerOverviewApp', `hideActionSheet()`);
        } else {
            this.componentVisibleApp[component] = name;
            if (component == "Smartphone") {
                if (this.SmartphoneApp == "") {
                    this.SmartphoneApp = "MainScreen";
                    mp.gui.cursor.visible = true;
                } else if (this.SmartphoneApp == "MainScreen") {
                    mp.gui.cursor.visible = true;
                } else if (this.SmartphoneApp == "PhoneScreen") {
                    mp.gui.cursor.visible = false;
                }
            } else {
                mp.gui.cursor.visible = true;
            }
            // mp.events.add("render", showCursor)
            if (args && args.length > 0) {
                _browser2.default.execute(component, `show("${name}", '${args}')`);
            } else {
                _browser2.default.execute(component, `show("${name}")`);
            }
        }
    }
}

exports.default = new Apps();

},{"../browser/browser":93}],4:[function(require,module,exports){
"use strict";

require("./gps/gpsApp");

require("./contacts/contactsList");

require("./contacts/contactsEdit");

require("./contacts/contactsAdd");

require("./contacts/contactsOverview");

require("./banking/bankingAppOverview");

require("./banking/bankingAppTransfer");

require("./news/newsApp");

require("./news/newsListApp");

require("./news/newsAddApp");

require("./taxi/taxiApp");

require("./taxi/TaxiListApp");

require("./taxi/TaxiServiceListApp");

require("./taxi/TaxiContact");

require("./team/team-edit");

require("./team/team-list");

require("./business/businessApp");

require("./business/businessEdit");

require("./business/businessList");

require("./business/businessInvite");

require("./callManage");

require("./telefon/telefon");

require("./telefon/telefonInput");

require("./telefon/telefonSettings");

require("./telefon/telefonCalls");

require("./home");

require("./police/PoliceAktenSearchApp");

require("./police/PoliceEditPersonApp");

require("./police/PoliceEditWantedsApp");

require("./police/PoliceListAktenApp");

require("./police/PoliceListProgressApp");

require("./servicelist/ServiceAcceptedApp");

require("./servicelist/serviceListApp");

require("./servicelist/serviceOwnApp");

require("./servicelist/serviceEvaluationApp");

require("./messenger/messengerApp");

require("./messenger/messengerListApp");

require("./messenger/messengerMessageApp");

require("./messenger/messengerOverviewApp");

require("./settings/settingsApp");

require("./settings/settingsEditWallpaperApp");

require("./settings/settingsEditRingtonesApp");

require("./hitman/hitmanApp");

require("./hitman/hitmanContractsApp");

require("./hitman/hitmanContractListApp");

require("./hitman/hitmanLocateApp");

require("./hitman/hitmanLocatePersonApp");

require("./darknet/DarknetApp");

require("./darknet/DarknetAgencySupportApp");

require("./darknet/DarknetBountyApp");

require("./darknet/DarknetClearWantedsApp");

require("./profile");

require("./lifeinvader");

require("./desktop");

require("./funk");

require("./ipadDesktop");

require("./ipadMainScreen");

require("./laptopDesktop");

require("./laptopMainScreen");

require("./marketplace/marketplaceApp");

require("./service/serviceRequestApp");

require("./service/serviceSendRequestApp");

require("./vehicleoverview/vehicleOverviewApp");

require("./plate/plateOverviewApp");

require("./claw/clawOverviewApp");

require("./vehicletax/vehicleTaxApp");

require("./vehicleimpound/vehicleImpoundApp");

require("./support/ticket/ServiceOverviewApp");

require("./support/ticket/SupportAcceptedTickets");

require("./support/ticket/SupportOpenTickets");

require("./support/ticket/SupportTicketOverview");

require("./support/ticket/SupportKonversation");

require("./support/vehicles/SupportVehicleApp");

require("./support/vehicles/SupportVehicleList");

require("./support/vehicles/SupportVehicleProfile");

require("./kfzrent/KFZRentApp");

require("./fraktion/FraktionListApp");

require("./fraktion/FraktionEditApp");

require("./fraktion/FraktionRightsOverviewApp");

require("./house/HouseList");

require("./house/HouseEdit");

require("./house/HouseVehicleList");

require("./email/EmailApp");

require("./export/ExportApp");

require("./streifen/StreifenApp");

require("./businessdetail/BusinessDetail");

},{"./banking/bankingAppOverview":5,"./banking/bankingAppTransfer":6,"./business/businessApp":7,"./business/businessEdit":8,"./business/businessInvite":9,"./business/businessList":10,"./businessdetail/BusinessDetail":11,"./callManage":12,"./claw/clawOverviewApp":13,"./contacts/contactsAdd":14,"./contacts/contactsEdit":15,"./contacts/contactsList":16,"./contacts/contactsOverview":17,"./darknet/DarknetAgencySupportApp":18,"./darknet/DarknetApp":19,"./darknet/DarknetBountyApp":20,"./darknet/DarknetClearWantedsApp":21,"./desktop":22,"./email/EmailApp":23,"./export/ExportApp":24,"./fraktion/FraktionEditApp":25,"./fraktion/FraktionListApp":26,"./fraktion/FraktionRightsOverviewApp":27,"./funk":28,"./gps/gpsApp":29,"./hitman/hitmanApp":30,"./hitman/hitmanContractListApp":31,"./hitman/hitmanContractsApp":32,"./hitman/hitmanLocateApp":33,"./hitman/hitmanLocatePersonApp":34,"./home":35,"./house/HouseEdit":36,"./house/HouseList":37,"./house/HouseVehicleList":38,"./ipadDesktop":39,"./ipadMainScreen":40,"./kfzrent/KFZRentApp":41,"./laptopDesktop":42,"./laptopMainScreen":43,"./lifeinvader":44,"./marketplace/marketplaceApp":45,"./messenger/messengerApp":46,"./messenger/messengerListApp":47,"./messenger/messengerMessageApp":48,"./messenger/messengerOverviewApp":49,"./news/newsAddApp":50,"./news/newsApp":51,"./news/newsListApp":52,"./plate/plateOverviewApp":54,"./police/PoliceAktenSearchApp":55,"./police/PoliceEditPersonApp":56,"./police/PoliceEditWantedsApp":57,"./police/PoliceListAktenApp":58,"./police/PoliceListProgressApp":59,"./profile":60,"./service/serviceRequestApp":61,"./service/serviceSendRequestApp":62,"./servicelist/ServiceAcceptedApp":63,"./servicelist/serviceEvaluationApp":64,"./servicelist/serviceListApp":65,"./servicelist/serviceOwnApp":66,"./settings/settingsApp":67,"./settings/settingsEditRingtonesApp":68,"./settings/settingsEditWallpaperApp":69,"./streifen/StreifenApp":70,"./support/ticket/ServiceOverviewApp":71,"./support/ticket/SupportAcceptedTickets":72,"./support/ticket/SupportKonversation":73,"./support/ticket/SupportOpenTickets":74,"./support/ticket/SupportTicketOverview":75,"./support/vehicles/SupportVehicleApp":76,"./support/vehicles/SupportVehicleList":77,"./support/vehicles/SupportVehicleProfile":78,"./taxi/TaxiContact":79,"./taxi/TaxiListApp":80,"./taxi/TaxiServiceListApp":81,"./taxi/taxiApp":82,"./team/team-edit":83,"./team/team-list":84,"./telefon/telefon":85,"./telefon/telefonCalls":86,"./telefon/telefonInput":87,"./telefon/telefonSettings":88,"./vehicleimpound/vehicleImpoundApp":89,"./vehicleoverview/vehicleOverviewApp":90,"./vehicletax/vehicleTaxApp":91}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BankingAppOverview extends _app2.default {
    constructor() {
        super("BankingAppOverview");

        this.forwardableEvents.add("responseBankingAppOverview");
    }
}

exports.default = new BankingAppOverview();

},{"../../app/app":2}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BankingAppTransfer extends _app2.default {
    constructor() {
        super("BankingAppTransfer");

        this.forwardableEvents.add("responseBankingCap");
    }
}

exports.default = new BankingAppTransfer();

},{"../../app/app":2}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BusinessApp extends _app2.default {
    constructor() {
        super("BusinessApp");

        this.forwardableEvents.add("responseBusinessMembers");
        this.forwardableEvents.add("responseBusinessMOTD");
    }
}

exports.default = new BusinessApp();

},{"../../app/app":2}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BusinessEdit extends _app2.default {
    constructor() {
        super("BusinessEditApp");
    }
}

exports.default = new BusinessEdit();

},{"../../app/app":2}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BusinessInviteApp extends _app2.default {
    constructor() {
        super("BusinessInviteApp");
    }
}

exports.default = new BusinessInviteApp();

},{"../../app/app":2}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BusinessList extends _app2.default {
    constructor() {
        super("BusinessListApp");
    }
}

exports.default = new BusinessList();

},{"../../app/app":2}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BusinessDetail extends _app2.default {
    constructor() {
        super("BusinessDetailApp");
        this.forwardableEvents.add("responseBusinessDetailLinks");
        this.forwardableEvents.add("responseBusinessDetail");
    }

    onEvent(name, ...args) {
        if (name == "businessNotify") {
            mp.game.graphics.notify("Bitte warten Sie kurz.");
        }
    }
}

exports.default = new BusinessDetail();

},{"../../app/app":2}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../app/app");

var _app2 = _interopRequireDefault(_app);

var _apps = require("../app/apps");

var _apps2 = _interopRequireDefault(_apps);

var _windows = require("../windows/windows");

var _windows2 = _interopRequireDefault(_windows);

var _player = require("../player/player");

var _player2 = _interopRequireDefault(_player);

var _browser = require("../browser/browser");

var _browser2 = _interopRequireDefault(_browser);

var _home = require("./home");

var _home2 = _interopRequireDefault(_home);

var _telefon = require("./telefon/telefon");

var _telefon2 = _interopRequireDefault(_telefon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CallManageApp extends _app2.default {
    constructor() {
        super("CallManageApp");
        this.forwardableEvents.add("acceptCall");

        mp.events.add("cancelCall", () => {
            this.callOnBrowser(`cancelCall("[]")`);
            _home2.default.declineCall();
            _browser2.default.execute("Smartphone", `change()`);
            _apps2.default.SmartphoneApp = "MainScreen";
        });
    }

    declineCall() {
        this.callOnBrowser(`declineCallSmartphone()`);
    }

    micmute() {
        this.callOnBrowser(`changeMicMute()`);
    }

    acceptedCall() {
        this.callOnBrowser(`acceptCallSmartphone()`);
    }

    setPhoneCallData(data) {
        this.callOnBrowser(`setCallData('${data}', '${_player2.default.activeRingtone}', '${_player2.default.phonelautlos}')`);
        if (_windows2.default.visibleWindow != null) mp.gui.cursor.visible = true;
    }

    onEvent(name, ...args) {
        if (name == "addCallToHistory") {
            _player2.default.historys.addCallToHistory(args[0].contact, args[0].number, args[0].time, args[0].accepted, args[0].method);
            _telefon2.default.declineCall();
        }
    }
}

exports.default = new CallManageApp();

},{"../app/app":2,"../app/apps":3,"../browser/browser":93,"../player/player":186,"../windows/windows":204,"./home":35,"./telefon/telefon":85}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class VehicleClawUebersichtApp extends _app2.default {
    constructor() {
        super("VehicleClawUebersichtApp");
        this.forwardableEvents.add("responseVehicleClawOverview");
    }
}

exports.default = new VehicleClawUebersichtApp();

},{"../../app/app":2}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

var _contactsList = require("./contactsList");

var _contactsList2 = _interopRequireDefault(_contactsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ContactsAdd extends _app2.default {
    constructor() {
        super("ContactsAdd");
    }

    onEvent(name, ...args) {
        if (name == "addContact") {
            _player2.default.contacts.addContact(args[0].number, args[0].name);
            _contactsList2.default.updateList();
        }
    }
}

exports.default = new ContactsAdd();

},{"../../app/app":2,"../../player/player":186,"./contactsList":16}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

var _contactsList = require("./contactsList");

var _contactsList2 = _interopRequireDefault(_contactsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ContactsEdit extends _app2.default {
    constructor() {
        super("ContactsEdit");
    }

    onEvent(name, ...args) {
        if (name == "updateContact" && args[0]) {
            _player2.default.contacts.updateContact(args[0].storeNumber, args[0].editNumber, args[0].editName);
            _contactsList2.default.updateList();
        } else if (name == "removeContact" && args[0]) {
            _player2.default.contacts.removeContact(args[0].number);
            _contactsList2.default.updateList();
        }
    }
}

exports.default = new ContactsEdit();

},{"../../app/app":2,"../../player/player":186,"./contactsList":16}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ContactsApp extends _app2.default {
    constructor() {
        super("ContactsApp");
    }

    onReady() {
        if (_player2.default.contacts.contacts == null) {
            _player2.default.contacts.request(() => {
                this.updateList();
            });
        } else {
            this.updateList();
        }
    }

    updateList() {
        this.callOnBrowser(`setContactListData('${_player2.default.contacts.toJson()}')`);
    }
}

exports.default = new ContactsApp();

},{"../../app/app":2,"../../player/player":186}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

var _contactsList = require("./contactsList");

var _contactsList2 = _interopRequireDefault(_contactsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ContactsOverview extends _app2.default {
    constructor() {
        super("ContactsOverview");
    }

    onEvent(name, ...args) {
        if (name == "getLocation") {
            const playerPos = mp.players.local.position;
            let x = Math.round(playerPos.x);
            let y = Math.round(playerPos.y);
            this.callOnBrowser(`setGPSdata('${x}','${y}')`);
        } else if (name == "updateContact" && args[0]) {
            _player2.default.contacts.updateContact(args[0].storeNumber, args[0].editNumber, args[0].editName);
            _contactsList2.default.updateList();
        } else if (name == "removeContact" && args[0]) {
            _player2.default.contacts.removeContact(args[0].number);
            _contactsList2.default.updateList();
        }
    }
}

exports.default = new ContactsOverview();

},{"../../app/app":2,"../../player/player":186,"./contactsList":16}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DarknetAgencySupportApp extends _app2.default {
    constructor() {
        super("DarknetAgencySupportApp");
    }
}
exports.default = new DarknetAgencySupportApp();

},{"../../app/app":2}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DarknetApp extends _app2.default {
    constructor() {
        super("DarknetApp");
    }
}

exports.default = new DarknetApp();

},{"../../app/app":2}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DarknetBountyApp extends _app2.default {
    constructor() {
        super("DarknetBountyApp");
    }
}
exports.default = new DarknetBountyApp();

},{"../../app/app":2}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DarknetClearWantedsApp extends _app2.default {
    constructor() {
        super("DarknetClearWantedsApp");
    }
}
exports.default = new DarknetClearWantedsApp();

},{"../../app/app":2}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DesktopApp extends _app2.default {
    constructor() {
        super("DesktopApp");
        this.forwardableEvents.add("responseComputerApps");
    }
}

exports.default = new DesktopApp();

},{"../app/app":2}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class EmailApp extends _app2.default {
    constructor() {
        super("EmailApp");
        this.forwardableEvents.add("responseEmails");
    }
}

exports.default = new EmailApp();

},{"../../app/app":2}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ExportApp extends _app2.default {
    constructor() {
        super("ExportApp");
        this.forwardableEvents.add("responseExports");
    }
}

exports.default = new ExportApp();

},{"../../app/app":2}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FraktionEditApp extends _app2.default {
    constructor() {
        super("FraktionEditApp");
    }
}

exports.default = new FraktionEditApp();

},{"../../app/app":2}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FraktionListApp extends _app2.default {
    constructor() {
        super("FraktionListApp");
        this.forwardableEvents.add("responseMembers");
    }
}

exports.default = new FraktionListApp();

},{"../../app/app":2}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FraktionRightsOverviewApp extends _app2.default {
    constructor() {
        super("FraktionRightsOverviewApp");
    }
}

exports.default = new FraktionRightsOverviewApp();

},{"../../app/app":2}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require('../app/app');

var _app2 = _interopRequireDefault(_app);

var _playerPanel = require('../interfaces/hud/player-panel');

var _playerPanel2 = _interopRequireDefault(_playerPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FunkApp extends _app2.default {
    constructor() {
        super('FunkApp');

        this.forwardableEvents.add('responseVoiceSettings');

        mp.events.add('setVoiceRadioActive', voiceRadio => {
            _playerPanel2.default.setVoiceRadioActive(voiceRadio);
        });

        mp.events.add('voiceRadioActive', voiceRadioActive => {
            _playerPanel2.default.setVoiceRadioActiveType(voiceRadioActive);
        });
    }

    onEvent(name, ...args) {
        if (name === 'setVoiceRadioActive') {
            _playerPanel2.default.setVoiceRadioActive(args[0]);
        } else if (name === 'setVoiceRadioActiveType') {
            _playerPanel2.default.setVoiceRadioActiveType(args[0]);
        }
    }
}

exports.default = new FunkApp();

},{"../app/app":2,"../interfaces/hud/player-panel":141}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GpsApp extends _app2.default {
    constructor() {
        super("GpsApp");
        this.forwardableEvents.add("gpsLocationsResponse");
    }

    onEvent(name, ...args) {
        if (name == "setGpsCoordinates") {
            mp.game.ui.setNewWaypoint(args[0].x, args[0].y);
        }
    }
}

exports.default = new GpsApp();

},{"../../app/app":2}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HitmanApp extends _app2.default {
    constructor() {
        super("HitmanApp");
    }
}

exports.default = new HitmanApp();

},{"../../app/app":2}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HitmanContractListApp extends _app2.default {
    constructor() {
        super("HitmanContractListApp");
        this.forwardableEvents.add("responseHitmanContracts");
    }
}

exports.default = new HitmanContractListApp();

},{"../../app/app":2}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HitmanContractsApp extends _app2.default {
    constructor() {
        super("HitmanContractsApp");
    }
}

exports.default = new HitmanContractsApp();

},{"../../app/app":2}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HitmanLocateApp extends _app2.default {
    constructor() {
        super("HitmanLocateApp");
        this.forwardableEvents.add("responseHitmanLocatedPpl");
    }
}

exports.default = new HitmanLocateApp();

},{"../../app/app":2}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HitmanLocatePersonApp extends _app2.default {
    constructor() {
        super("HitmanLocatePersonApp");
    }
    onEvent(name, ...args) {
        if (name == "setGpsCoordinates") {
            mp.game.ui.setNewWaypoint(args[0].x, args[0].y);
        }
    }
}

exports.default = new HitmanLocatePersonApp();

},{"../../app/app":2}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../app/app");

var _app2 = _interopRequireDefault(_app);

var _smartphone = require("../interfaces/hud/smartphone");

var _smartphone2 = _interopRequireDefault(_smartphone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HomeApp extends _app2.default {
    constructor() {
        super("HomeApp");
        this.forwardableEvents.add("responseApps");
        this.forwardableEvents.add("responsePhoneWallpaper");
    }

    declineCall() {
        this.callOnBrowser(`declineCall()`);
    }

    mutemode() {
        this.callOnBrowser(`changemute()`);
    }

    flymode() {
        this.callOnBrowser(`changefly()`);
    }

    anrufablehnen() {
        this.callOnBrowser(`changeanrufablehnen()`);
    }

    getHomeScreenCall() {
        this.callOnBrowser(`getHomeScreenCall()`);
    }

    onEvent(name, ...args) {
        if (name == "showCallScreen") {
            _smartphone2.default.showCallScreen();
        }
    }
}

exports.default = new HomeApp();

},{"../app/app":2,"../interfaces/hud/smartphone":145}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HouseEdit extends _app2.default {
    constructor() {
        super("HouseEdit");
        this.forwardableEvents.add("responseHouseData");
    }
}

exports.default = new HouseEdit();

},{"../../app/app":2}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HouseList extends _app2.default {
    constructor() {
        super("HouseList");
        this.forwardableEvents.add("responseTenants");
    }
}

exports.default = new HouseList();

},{"../../app/app":2}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HouseVehicleList extends _app2.default {
    constructor() {
        super("HouseVehicleList");
        this.forwardableEvents.add("responseHouseVehicles");
    }
}

exports.default = new HouseVehicleList();

},{"../../app/app":2}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ipadDesktop extends _app2.default {
    constructor() {
        super("IpadDesktopApp");
        this.forwardableEvents.add("responseIpadApps");
    }
}

exports.default = new ipadDesktop();

},{"../app/app":2}],40:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class IpadMainScreen extends _app2.default {
    constructor() {
        super("IpadMainScreen");
    }
}

exports.default = new IpadMainScreen();

},{"../app/app":2}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class KFZRentApp extends _app2.default {
    constructor() {
        super("KFZRentApp");
        this.forwardableEvents.add("responsekfzrent");
    }
}

exports.default = new KFZRentApp();

},{"../../app/app":2}],42:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class laptopDesktop extends _app2.default {
    constructor() {
        super("LaptopDesktopApp");
        this.forwardableEvents.add("responseLaptopApps");
    }
}

exports.default = new laptopDesktop();

},{"../app/app":2}],43:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LaptopMainScreen extends _app2.default {
    constructor() {
        super("LaptopMainScreen");
    }
}

exports.default = new LaptopMainScreen();

},{"../app/app":2}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LifeInvaderApp extends _app2.default {
    constructor() {
        super("LifeInvaderApp");
        this.forwardableEvents.add("updateLifeInvaderAds");
    }
}

exports.default = new LifeInvaderApp();

},{"../app/app":2}],45:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

var _browser = require("../../browser/browser");

var _browser2 = _interopRequireDefault(_browser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MarketplaceApp extends _app2.default {
    constructor() {
        super("MarketplaceApp");
        this.forwardableEvents.add("responseMarketPlaceCategories");
        this.forwardableEvents.add("responseMyOffers");
        this.forwardableEvents.add("responseMarketPlaceOffers");
    }
}
exports.default = new MarketplaceApp();

},{"../../app/app":2,"../../browser/browser":93}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MessengerApp extends _app2.default {
    constructor() {
        super("MessengerApp");
    }
}

exports.default = new MessengerApp();

},{"../../app/app":2}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

var _phone = require("../phone");

var _phone2 = _interopRequireDefault(_phone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MessengerListApp extends _app2.default {
    constructor() {
        super("MessengerListApp");
        this.forwardableEvents.add("responseKonversations");
    }

    onEvent(name, ...args) {
        if (name == "getHomeScreen") {
            _phone2.default.getHomeScreen();
        }
    }
}
exports.default = new MessengerListApp();

},{"../../app/app":2,"../phone":53}],48:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MessengerApp extends _app2.default {
    constructor() {
        super("MessengerMessageApp");
    }

    onEvent(name, ...args) {
        if (name == "getLocation") {
            const playerPos = mp.players.local.position;
            let x = Math.round(playerPos.x);
            let y = Math.round(playerPos.y);
            this.callOnBrowser(`setGPSdata('${x}','${y}')`);
        }
    }
}

exports.default = new MessengerApp();

},{"../../app/app":2}],49:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require('../../app/app');

var _app2 = _interopRequireDefault(_app);

var _player = require('../../player/player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MessengerOverviewApp extends _app2.default {
    constructor() {
        super('MessengerOverviewApp');

        this.forwardableEvents.add('updateChat');
    }

    onReady() {
        this.callOnBrowser(`setOwnNumber('${_player2.default.phone}')`);
    }

    onEvent(name, ...args) {
        if (name === 'setGpsCoordinates') {
            mp.game.ui.setNewWaypoint(args[0].x, args[0].y);
        } else if (name === 'getLocation') {
            const playerPos = mp.players.local.position;

            let x = Math.round(playerPos.x),
                y = Math.round(playerPos.y);

            this.callOnBrowser(`setGpsData('${x}','${y}')`);
        }
    }
}

exports.default = new MessengerOverviewApp();

},{"../../app/app":2,"../../player/player":186}],50:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class NewsAddApp extends _app2.default {
    constructor() {
        super("NewsAddApp");
    }

    onReady() {
        this.callOnBrowser(`onReady('${_player2.default.firstName}', '${_player2.default.lastName}', '${_player2.default.phone}', '${_player2.default.teamRank}')`);
    }

    onEvent(name, ...args) {
        if (name == "getLocation") {
            const playerPos = mp.players.local.position;
            let x = Math.round(playerPos.x);
            let y = Math.round(playerPos.y);
            this.callOnBrowser(`setGPSdata('${x}','${y}')`);
        }
    }
}

exports.default = new NewsAddApp();

},{"../../app/app":2,"../../player/player":186}],51:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class NewsApp extends _app2.default {
    constructor() {
        super("NewsApp");
    }

    onReady() {
        this.setPlayerTeam();
    }

    setPlayerTeam() {
        this.callOnBrowser(`playerTeam=${_player2.default.team}`);
    }
}

exports.default = new NewsApp();

},{"../../app/app":2,"../../player/player":186}],52:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class NewsListApp extends _app2.default {
    constructor() {
        super("NewsListApp");
        this.forwardableEvents.add("updateNews");
    }
    onReady() {
        this.callOnBrowser(`onReady('${_player2.default.team}','${_player2.default.firstName}', '${_player2.default.lastName}', '${_player2.default.teamRank}')`);
    }

    onEvent(name, ...args) {
        if (name == "setGpsCoordinates") {
            mp.game.ui.setNewWaypoint(args[0].x, args[0].y);
        }
    }
}

exports.default = new NewsListApp();

},{"../../app/app":2,"../../player/player":186}],53:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PhoneMainScreen extends _app2.default {
    constructor() {
        super("PhoneMainScreen");
    }

    getHomeScreen() {
        this.callOnBrowser(`getHomeScreen()`);
    }

    getHomeScreenCall() {
        this.callOnBrowser(`getHomeScreenCall()`);
    }
}

exports.default = new PhoneMainScreen();

},{"../app/app":2}],54:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PlateOverviewApp extends _app2.default {
    constructor() {
        super("KennzeichenUebersichtApp");
        this.forwardableEvents.add("responsePlateOverview");
    }
}

exports.default = new PlateOverviewApp();

},{"../../app/app":2}],55:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PoliceAktenSearchApp extends _app2.default {
    constructor() {
        super("PoliceAktenSearchApp");
        this.forwardableEvents.add("responsePlayerResults");
    }
}

exports.default = new PoliceAktenSearchApp();

},{"../../app/app":2}],56:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PoliceEditPersonApp extends _app2.default {
    constructor() {
        super("PoliceEditPersonApp");
        this.forwardableEvents.add("responsePersonData");
        this.forwardableEvents.add("responseOpenCrimes");
        this.forwardableEvents.add("responseJailTime");
        this.forwardableEvents.add("responseJailCosts");
        this.forwardableEvents.add("responseAkte");
        this.forwardableEvents.add("responseAktenList");
        this.forwardableEvents.add("responseLicenses");
    }
}

exports.default = new PoliceEditPersonApp();

},{"../../app/app":2}],57:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PoliceEditWantedsApp extends _app2.default {
    constructor() {
        super("PoliceEditWantedsApp");
        this.forwardableEvents.add("responseCategories");
        this.forwardableEvents.add("responseOpenCrimes");
        this.forwardableEvents.add("responseCategoryReasons");
    }
}

exports.default = new PoliceEditWantedsApp();

},{"../../app/app":2}],58:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PoliceListAktenApp extends _app2.default {
    constructor() {
        super("PoliceListAktenApp");
        this.forwardableEvents.add("responseAktenList");
    }
}

exports.default = new PoliceListAktenApp();

},{"../../app/app":2}],59:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PoliceListProgressApp extends _app2.default {
    constructor() {
        super("PoliceListProgressApp");
        this.forwardableEvents.add("responseCrimeProgress");
    }
}

exports.default = new PoliceListProgressApp();

},{"../../app/app":2}],60:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../app/app");

var _app2 = _interopRequireDefault(_app);

var _player = require("../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProfileApp extends _app2.default {
    constructor() {
        super("ProfileApp");
        this.forwardableEvents.add("responseSpecialProfilData");
    }

    onReady() {
        this.updateProfile();
    }

    updateProfile() {
        this.callOnBrowser(`setProfileData('${JSON.stringify({ Vorname: _player2.default.firstName, Nachname: _player2.default.lastName, Level: _player2.default.level, ID: _player2.default.playerId, Business: _player2.default.business, GwdNote: this.getGwd(), ZivildienstNote: this.getZWD(), Haus: this.getHouse(), Team: this.getTeam(), Handy: _player2.default.phone, Beruf: this.getJob(), Skill: _player2.default.jobsSkill, Krankenversicherung: _player2.default.insurance })}')`);
    }

    getHouse() {
        let house = _player2.default.house;

        if (house == 0) {
            return "Kein Haus";
        } else {
            return house;
        }
    }

    getGwd() {
        let gwd = _player2.default.gwdNote;

        if (gwd == 0) {
            return "Nicht vorhanden";
        } else {
            return gwd;
        }
    }

    getZWD() {
        let zwd = _player2.default.zwdNote;

        if (zwd == 0) {
            return "Nicht vorhanden";
        } else {
            return zwd;
        }
    }

    getJob() {
        let job = _player2.default.job;

        switch (job) {
            case 1:
                return "Waffendealer";
                break;
            case 2:
                return "Fälscher";
                break;
            case 3:
                return "Kredithai";
                break;
            case 4:
                return "Pilot";
                break;
            case 5:
                return "Farmer";
                break;
            case 6:
                return "Fischer";
                break;
            case 7:
                return "Lifeguard";
                break;
            case 8:
                return "Mechaniker";
                break;
            case 9:
                return "Busfahrer";
                break;
            case 10:
                return "Stripper";
                break;
            case 11:
                return "Makler";
                break;
            case 12:
                return "Trucker";
                break;
            case 13:
                return "Gärtner";
                break;
            case 14:
                return "Anwalt";
                break;
        }
    }

    getTeam() {
        let team = _player2.default.team;

        switch (team) {
            case 0:
                return "Zivilisten";
                break;
            case 1:
                return "Los Santos Police Department";
                break;
            case 2:
                return "Front Yard Ballas";
                break;
            case 3:
                return "Department of Motor Vehicles";
                break;
            case 4:
                return "Weazel News";
                break;
            case 5:
                return "Federal Investigation Bureau";
                break;
            case 6:
                return "The Lost";
                break;
            case 7:
                return "Los Santos Medic Center";
                break;
            case 8:
                return "Irish Mob";
                break;
            case 9:
                return "La Cosa Nostra";
                break;
            case 10:
                return "Yakuza";
                break;
            case 11:
                return "High Rollin Hustlers";
                break;
            case 12:
                return "Grove Familie";
                break;
            case 13:
                return "U.S. Army";
                break;
            case 14:
                return "Regierung";
                break;
            case 15:
                return "Angels of Death MC";
                break;
            case 16:
                return "Department of Public Order and Safety";
                break;
            case 17:
                return "Triaden";
                break;
            case 18:
                return "Los Santos Vagos";
                break;
            case 19:
                return "The Marabunta Grande";
                break;
            case 20:
                return "North Nation Miliz"; // Rofl
                break;
            case 21:
                return "SWAT";
                break;
            case 22:
                return "Bratwa";
                break;
            case 23:
                return "Los Santos Sheriff Department";
                break;
            case 24:
                return "Hounds of Hell MC";
                break;
            case 25:
                return "Grapeseed Rednecks";
                break;
            case 26:
                return "Los Santos Customs";
                break;
            case 27:
                return "International Contract Agency";
                break;
            case 28:
                return "Los Santos Metal Corporation";
                break;
            case 29:
                return "East LS Mining Corporation";
                break;
            case 30:
                return "Vanilla Unicorn";
                break;
            case 42:
                return "Outlaws MC";
                break;
            case 43:
                return "Bruderschaft";
                break;
            case 44:
                return "Madrazo Cartel";
                break;
            case 45:
                return "Bosozoku-Kai";
                break;
            case 48:
                return "Midnight Club";
                break;
        }
    }
}

exports.default = new ProfileApp();

},{"../app/app":2,"../player/player":186}],61:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ServiceRequestApp extends _app2.default {
    constructor() {
        super("ServiceRequestApp");
    }
}

exports.default = new ServiceRequestApp();

},{"../../app/app":2}],62:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ServiceSendRequestApp extends _app2.default {
    constructor() {
        super("ServiceSendRequestApp");
    }
}

exports.default = new ServiceSendRequestApp();

},{"../../app/app":2}],63:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ServiceAcceptedApp extends _app2.default {
    constructor() {
        super("ServiceAcceptedApp");
        this.forwardableEvents.add("responseTeamServiceList");
    }

    onEvent(name, ...args) {
        if (name == "setGpsCoordinatesAccepted") {
            mp.game.ui.setNewWaypoint(args[0].x, args[0].y);
        }
    }
}

exports.default = new ServiceAcceptedApp();

},{"../../app/app":2}],64:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ServiceEvaluationApp extends _app2.default {
    constructor() {
        super("ServiceEvaluationApp");
        this.forwardableEvents.add("responseEvaluationService");
    }
}

exports.default = new ServiceEvaluationApp();

},{"../../app/app":2}],65:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ServiceListApp extends _app2.default {
    constructor() {
        super("ServiceListApp");
        this.forwardableEvents.add("responseOpenServiceList");
    }

    onEvent(name, ...args) {
        if (name == "setGpsCoordinatesAccepted") {
            mp.game.ui.setNewWaypoint(args[0].x, args[0].y);
        }
    }
}

exports.default = new ServiceListApp();

},{"../../app/app":2}],66:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ServiceOwnApp extends _app2.default {
    constructor() {
        super("ServiceOwnApp");
        this.forwardableEvents.add("responseOwnServiceList");
    }

    onEvent(name, ...args) {
        if (name == "setGpsCoordinates") {
            mp.game.ui.setNewWaypoint(args[0].x, args[0].y);
        }
    }
}

exports.default = new ServiceOwnApp();

},{"../../app/app":2}],67:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

var _home = require("../home");

var _home2 = _interopRequireDefault(_home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SettingsApp extends _app2.default {
    constructor() {
        super("SettingsApp");
        this.forwardableEvents.add("responsePhoneSettings");
    }

    onEvent(name, ...args) {
        if (name == "lautlosStatus") {
            _player2.default.phonelautlos = args[0].status;
            _home2.default.mutemode();
        } else if (name == "flyStatus") {
            _home2.default.flymode();
        } else if (name == "anrufAblehnen") {
            _home2.default.anrufablehnen();
        }
    }
}

exports.default = new SettingsApp();

},{"../../app/app":2,"../../player/player":186,"../home":35}],68:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SettingsEditRingtonesApp extends _app2.default {
    constructor() {
        super("SettingsEditRingtonesApp");
        this.forwardableEvents.add("responseRingtoneList");
    }
}
exports.default = new SettingsEditRingtonesApp();

},{"../../app/app":2}],69:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

var _smartphone = require("../../interfaces/hud/smartphone");

var _smartphone2 = _interopRequireDefault(_smartphone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SettingsEditWallpaperApp extends _app2.default {
    constructor() {
        super("SettingsEditWallpaperApp");
        this.forwardableEvents.add("responseWallpaperList");
    }

    onEvent(name, ...args) {
        if (name == "saveWallpaper") {
            _smartphone2.default.refreshSmartphone();
        }
    }
}
exports.default = new SettingsEditWallpaperApp();

},{"../../app/app":2,"../../interfaces/hud/smartphone":145}],70:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class StreifenApp extends _app2.default {
    constructor() {
        super("StreifenApp");
        this.forwardableEvents.add("responseStreifenData");
        this.forwardableEvents.add("responseStreifenInfo");
    }
}

exports.default = new StreifenApp();

},{"../../app/app":2}],71:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SupportOverviewApp extends _app2.default {
    constructor() {
        super("SupportOverviewApp");
    }
}

exports.default = new SupportOverviewApp();

},{"../../../app/app":2}],72:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SupportAcceptedTickets extends _app2.default {
    constructor() {
        super("SupportAcceptedTickets");
        this.forwardableEvents.add("responseAcceptedTicketList");
    }
}

exports.default = new SupportAcceptedTickets();

},{"../../../app/app":2}],73:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SupportKonversation extends _app2.default {
    constructor() {
        super("SupportKonversation");
        this.forwardableEvents.add("responseSupportKonversation");
        this.forwardableEvents.add("updateSupportKonversation");
    }
}

exports.default = new SupportKonversation();

},{"../../../app/app":2}],74:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SupportOpenTickets extends _app2.default {
    constructor() {
        super("SupportOpenTickets");
        this.forwardableEvents.add("responseOpenTicketList");
    }
}

exports.default = new SupportOpenTickets();

},{"../../../app/app":2}],75:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SupportTicketOverview extends _app2.default {
    constructor() {
        super("SupportTicketOverview");
    }
}

exports.default = new SupportTicketOverview();

},{"../../../app/app":2}],76:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SupportVehicleApp extends _app2.default {
    constructor() {
        super("SupportVehicleApp");
    }
}

exports.default = new SupportVehicleApp();

},{"../../../app/app":2}],77:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SupportVehicleList extends _app2.default {
    constructor() {
        super("SupportVehicleList");
        this.forwardableEvents.add("responseVehicleList");
    }
}

exports.default = new SupportVehicleList();

},{"../../../app/app":2}],78:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SupportVehicleProfile extends _app2.default {
    constructor() {
        super("SupportVehicleProfile");
        this.forwardableEvents.add("responseVehicleData");
    }
}

exports.default = new SupportVehicleProfile();

},{"../../../app/app":2}],79:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TaxiContact extends _app2.default {
    constructor() {
        super("TaxiContact");
    }
}

exports.default = new TaxiContact();

},{"../../app/app":2}],80:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TaxiListApp extends _app2.default {
    constructor() {
        super("TaxiListApp");
        this.forwardableEvents.add("responseTaxiList");
    }
}

exports.default = new TaxiListApp();

},{"../../app/app":2}],81:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
        value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TaxiServiceListApp extends _app2.default {
        constructor() {
                super("TaxiServiceListApp");
                this.forwardableEvents.add("responseServiceList");
        }
}

exports.default = new TaxiServiceListApp();

},{"../../app/app":2}],82:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TaxiApp extends _app2.default {
    constructor() {
        super("TaxiApp");
    }
}

exports.default = new TaxiApp();

},{"../../app/app":2}],83:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TeamEdit extends _app2.default {
    constructor() {
        super("TeamEditApp");
    }
}

exports.default = new TeamEdit();

},{"../../app/app":2}],84:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TeamList extends _app2.default {
    constructor() {
        super("TeamListApp");
        this.forwardableEvents.add("responseTeamMembers");
    }

    onReady() {
        mp.events.callRemote("requestTeamMembers", _player2.default.remoteHashKey);
    }
}

exports.default = new TeamList();

},{"../../app/app":2,"../../player/player":186}],85:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Telefon extends _app2.default {
    constructor() {
        super("Telefon");
    }

    declineCall() {
        if (_player2.default.historys.historys != null) {
            this.callOnBrowser(`responsePhoneCalls('${_player2.default.historys.toJson()}')`);
        }
    }

    onReady() {
        if (_player2.default.historys.historys != null) {
            this.callOnBrowser(`responsePhoneCalls('${_player2.default.historys.toJson()}')`);
        }
    }
}

exports.default = new Telefon();

},{"../../app/app":2,"../../player/player":186}],86:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TelefonCalls extends _app2.default {
    constructor() {
        super("TelefonCalls");
    }
}

exports.default = new TelefonCalls();

},{"../../app/app":2,"../../player/player":186}],87:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TelefonInput extends _app2.default {
    constructor() {
        super("TelefonInput");
    }
}

exports.default = new TelefonInput();

},{"../../app/app":2}],88:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TelefonSettings extends _app2.default {
    constructor() {
        super("TelefonSettings");
        this.forwardableEvents.add("responsePhoneData");
    }
}

exports.default = new TelefonSettings();

},{"../../app/app":2}],89:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class VehicleImpoundApp extends _app2.default {
    constructor() {
        super("VehicleImpoundApp");
        this.forwardableEvents.add("responseVehicleImpound");
    }
}

exports.default = new VehicleImpoundApp();

},{"../../app/app":2}],90:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class VehicleOverviewApp extends _app2.default {
    constructor() {
        super("FahrzeugUebersichtApp");
        this.forwardableEvents.add("responseVehicleOverview");
    }

    onEvent(name, ...args) {
        if (name == "setGpsCoordinates") {
            mp.game.ui.setNewWaypoint(args[0].x, args[0].y);
        }
    }
}

exports.default = new VehicleOverviewApp();

},{"../../app/app":2}],91:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("../../app/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class VehicleTaxApp extends _app2.default {
    constructor() {
        super("VehicleTaxApp");
        this.forwardableEvents.add("responseVehicleTax");
    }
}

exports.default = new VehicleTaxApp();

},{"../../app/app":2}],92:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _player2 = require("../player/player");

var _player3 = _interopRequireDefault(_player2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Attachments {
    constructor() {

        this.attachmentsSyncEntities = [];
        this.steamAttachmentsRange = 30;

        this.wasRagdoll = {};
        this.collided = {};
        this.isOpeningDoor = false;
        this.isInWater = false;
        this.controlsToDisable = [12, 13, 14, 15, 16, 17, 24, 25, 37, 45, 47, 58, 69, 70, 92, 114, 140, 141, 142, 143, 257, 263, 264, 331];
        this.controlsLength = this.controlsToDisable.length;

        var attachmentHandler = this;

        // custom attachmentssyncrange
        setInterval(function () {
            if (_player3.default != null && _player3.default.attachmentsync) {
                if (attachmentHandler.attachmentsSyncEntities != null) {
                    mp.players.forEachInStreamRange((streamedPlayer, id) => {
                        let streamedEntityPos = streamedPlayer.position;
                        let distance = _player3.default.getDistance(streamedEntityPos);
                        if (distance < attachmentHandler.steamAttachmentsRange) {
                            if (!attachmentHandler.attachmentsSyncEntities.includes(streamedPlayer.handle)) {

                                attachmentHandler.attachmentsSyncEntities.push(streamedPlayer.handle);
                                mp.events.callRemoteUnreliable("requestAttachmentsPlayer", streamedPlayer, _player3.default.remoteHashKey);
                            }
                        } else if (attachmentHandler.attachmentsSyncEntities.includes(streamedPlayer.handle)) {
                            let index = attachmentHandler.attachmentsSyncEntities.indexOf(streamedPlayer.handle);

                            if (index > -1) {
                                attachmentHandler.removeAllAttachments(streamedPlayer);
                                attachmentHandler.attachmentsSyncEntities.splice(index, 1);
                            }
                        }
                    });
                }
            }
        }, 1500);

        mp.events.add('entityStreamOut', entity => {
            if (entity.__attachmentObjects) {
                this.removeAllAttachments(entity);
            }

            // Remove from customSync 
            if (entity) {
                let index = this.attachmentsSyncEntities.indexOf(entity);

                if (index > -1) {
                    this.attachmentsSyncEntities.splice(index, 1);
                }
            }
        });

        const render = async () => {
            while (true) {
                if (_player3.default == null) {
                    await mp.game.waitAsync(50);
                    continue;
                }

                if (_player3.default.isCarrying) for (let i = 0; i < this.controlsLength; i++) mp.game.controls.disableControlAction(2, this.controlsToDisable[i], true);

                mp.players.forEachInStreamRange(async (player, id) => {
                    if (this.attachmentsSyncEntities.indexOf(player.handle) > -1) {
                        if (player.hasCollidedWithAnything()) {
                            this.collided[player.remoteId] = true;
                        } else {
                            if (this.collided[player.remoteId]) {
                                await this.checkAnimations(mp.players.atRemoteId(player.remoteId));
                                this.collided[player.remoteId] = false;
                            }
                        }

                        if (player.isRagdoll()) {
                            this.wasRagdoll[player.remoteId] = true;
                        } else {
                            if (this.wasRagdoll[player.remoteId]) {
                                let that = this;
                                setTimeout(async function () {
                                    await that.checkAnimations(mp.players.atRemoteId(player.remoteId));
                                }, 2000);
                                this.wasRagdoll[player.remoteId] = false;
                            }
                        }
                    }
                });

                await mp.game.waitAsync(150);
            }
        };

        render();

        mp.events.add('setAttachments', async (entity, data) => {
            if (entity !== undefined && entity != null && entity.handle != null && data !== undefined && (this.attachmentsSyncEntities.includes(entity.handle) || entity == mp.players.local)) {
                await this.setAttachments(entity, data);
            }
        });

        mp.events.add('removeAllAttachments', entity => {
            if (entity !== undefined && entity != null && entity.handle != null && this.attachmentsSyncEntities.includes(entity.handle) || entity == mp.players.local) {
                this.removeAllAttachments(entity);
            }
        });

        mp.events.add('resyncAttachments', async entity => {
            if (entity !== undefined && entity != null && entity.handle != null && this.attachmentsSyncEntities.includes(entity.handle) || entity == mp.players.local) {
                await this.resyncAttachments(entity);
            }
        });
    }

    async setAttachments(entity, data) {
        if (data !== undefined) {
            let newAttachments = data.length > 0 ? JSON.parse(data) : [];

            if (entity.handle !== 0) {
                let oldAttachments = entity.__attachments;

                if (!oldAttachments) {
                    oldAttachments = [];
                    entity.__attachmentObjects = {};
                }
                if (oldAttachments != [] && newAttachments != []) {
                    for (let oldattachment of oldAttachments) {
                        // in den alten attachments ist was, was in den neuen nicht ist -> remove
                        if (newAttachments.findIndex(a => a.Id === oldattachment.Id) === -1) {
                            this.removeAttachment(entity, oldattachment);
                        }
                    }
                }

                if (newAttachments != [] && oldAttachments != []) {
                    for (let newattachment of newAttachments) {
                        // in den neuen attachments ist was, was in den alten nicht ist -> add
                        if (oldAttachments.findIndex(a => a.Id === newattachment.Id) === -1) {
                            await this.addAttachment(entity, newattachment);
                        }
                    }
                }

                entity.__attachments = newAttachments;
            }
        }
    }

    async resyncAttachments(entity) {

        if (entity.handle !== 0 && entity.__attachments.length > 0) {

            // remove all
            for (let oldattachment of entity.__attachments) {
                this.removeAttachment(entity, oldattachment);
            }
            // add again
            for (let newattachment of entity.__attachments) {
                await this.addAttachment(entity, newattachment);
            }
        }
    }

    removeAllAttachments(entity) {
        if (entity.handle !== 0 && entity.__attachments.length > 0) {
            // remove all
            for (let oldattachment of entity.__attachments) {
                this.removeAttachment(entity, oldattachment);
            }
        }
    }

    async checkAnimations(entity) {
        try {
            if (entity.__animationData === undefined || entity.__animationData == null) {
                return;
            }

            if (entity.__animationData.Active == true && !entity.vehicle) {
                mp.game.streaming.requestAnimDict(entity.__animationData.AnimationDict);
                while (!mp.game.streaming.hasAnimDictLoaded(entity.__animationData.AnimationDict)) {
                    await mp.game.waitAsync(5);
                }

                entity.taskPlayAnim(entity.__animationData.AnimationDict, entity.__animationData.AnimationName, entity.__animationData.AnimationSpeed, 1.0, -1, entity.__animationData.AnimationFlags, 1.0, false, false, false);
            }

            if (entity.__attachmentObjects !== undefined && entity.__attachmentObjects != null) {
                Object.keys(entity.__attachmentObjects).forEach(attachment => {

                    if (attachment.needsAnimation) {
                        if (!mp.game.invoke('0x1F0B79228E461EC9 ', entity.handle, attachment.animationDict, attachment.animationName, 1)) {
                            entity.taskPlayAnim(attachment.animationDict, attachment.animationName, 8, -4, -1, attachment.animationFlag, 0, false, false, false);
                        }
                        if (!mp.game.invoke('0x1F0B79228E461EC9 ', mp.players.local.handle, attachment.animationDict, attachment.animationName, 3)) {
                            entity.taskPlayAnim(attachment.animationDict, attachment.animationName, 8, -4, -1, attachment.animationFlag, 0, false, false, false);
                        }
                    }
                });
            }
        } catch (e) {
            // mp.game.graphics.notify("Exception - Animations: Falls bestehen bleibt, bitte reloggen!")
        }
    }

    async addAttachment(entity, attachment) {

        if (!entity.__attachmentObjects.hasOwnProperty(attachment.id)) {

            let object = mp.objects.new(attachment.model, entity.position, {
                dimension: entity.dimension
            });

            let count = 0;

            while ((object == null || object.handle === 0) && count < 30) {
                await mp.game.waitAsync(100);
                count++;
            }

            if (object == null || object.handle === 0) return;

            object.attachTo(entity.handle, entity.getBoneIndex(attachment.bone), attachment.offset.x, attachment.offset.y, attachment.offset.z, attachment.rotation.x, attachment.rotation.y, attachment.rotation.z, false, false, false, false, 2, true);

            entity.__attachmentObjects[attachment.id] = object;

            if (attachment.needsAnimation) {
                mp.game.streaming.requestAnimDict(attachment.animationDict);

                while (!mp.game.streaming.hasAnimDictLoaded(attachment.animationDict)) {
                    await mp.game.waitAsync(5);
                }

                entity.taskPlayAnim(attachment.animationDict, attachment.animationName, 8, -4, -1, attachment.animationFlag, 0, false, false, false);
            }

            if (attachment.isCarrying) {
                if (mp.players.local.id === entity.id) {
                    _player3.default.isCarrying = true;
                    mp.players.local.weapon = mp.game.joaat('weapon_unarmed');
                }
            }
        }
    }

    removeAttachment(entity, attachment) {
        if (entity.__attachmentObjects.hasOwnProperty(attachment.id)) {

            let obj = entity.__attachmentObjects[attachment.id];
            delete entity.__attachmentObjects[attachment.id];

            if (mp.objects.exists(obj)) {
                obj.destroy();

                if (attachment.needsAnimation) {
                    entity.stopAnimTask(attachment.animationDict, attachment.animationName, 3);
                }

                if (_player3.default.isCarrying && attachment.isCarrying) {
                    if (mp.players.local.id === entity.id) {
                        _player3.default.isCarrying = false;

                        Object.keys(entity.__attachmentObjects).forEach(attachment => {
                            if (attachment.isCarrying) _player3.default.isCarrying = true;
                        });
                    }
                }
            }
        }
    }

    async initAttachments(entity) {
        for (let attachment of entity.__attachments) {
            await this.addAttachment(entity, attachment);
        }
    }

    removeAllAttachments(entity) {
        if (entity.__attachments !== undefined) {
            if (entity.__attachments && entity.__attachments != []) {
                for (let attachment of entity.__attachments) {
                    if (entity.__attachments.findIndex(a => a.Id === attachment.id) === -1) {
                        this.removeAttachment(entity, attachment);
                    }
                }
                entity.__attachments = [];
                entity.__attachmentObjects = {};
            }
        }
    }
}

exports.default = new Attachments();

},{"../player/player":186}],93:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
class Browser {
    constructor() {
        let _this = this;

        this.ui = null;
        this.voice = null;

        mp.events.add('guiReady', function () {
            _this.createBrowsers.call(_this);
        });
    }

    /**
     * Create browser for ui and voice if not existing.
     */
    createBrowsers() {
        if (!this.ui) {
            this.ui = mp.browsers.new('package://gvmp/index.html');
        }

        if (!this.voice) {
            this.voice = mp.browsers.new('');
        }
    }

    /**
     * Calls JavaScript code inside the browser.
     *
     * Call is made as `components.COMPONENT.EXECUTE`
     *
     * @param component Component to call.
     * @param execute JavaScript code to call.
     */
    execute(component, execute) {
        if (!this.ui) return;

        this.ui.execute(`components.${component}.${execute}`);
    }
}

exports.default = new Browser();

},{}],94:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _components = require('./components');

var _components2 = _interopRequireDefault(_components);

var _browser = require('../browser/browser');

var _browser2 = _interopRequireDefault(_browser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MAX_STRING_SIZE = 10024;
const timer = ms => new Promise(res => setTimeout(res, ms));

class Component {
    constructor(name) {
        this.name = name;
        this.forwardableEvents = new Set();
        this.isReady = false;

        _components2.default.components.set(name, this);
    }

    /**
     * Component events listener.
     *
     * @param name
     * @param args
     */
    onEvent(name, ...args) {}
    //


    /**
     * Component is ready listener.
     */
    onReady() {
        this.isReady = true;
    }

    /**
     * Handle incoming event calls made by the browser.
     *
     * @param name
     * @param args
     */
    handleIncomingBrowserEventCall(name, args = null) {
        this.onEvent(name, args);
    }

    /**
     * Handle incoming event calls made by the server.
     *
     * If the event is registered as forwardable event,
     * the call will be forwarded to the ui browser.
     *
     * Fowardable events with big data will automatically be split and sent
     * as chunks to the browser.
     *
     * @param name
     * @param args
     */
    handleIncomingServerEventCall(name, ...args) {
        // If the event is not forwardable, we call the onEvent listener on this component.
        if (!this.forwardableEvents.has(name)) {
            this.onEvent(name, args);

            return;
        }

        // For forwardable events the JavaScript code to execute will be prepared and sent to the ui browser.
        let eventArgsString = args.map(a => {
            return a.length === 0 ? `' '` : `'${a}'`;
        }).join(',');

        if (eventArgsString.length <= MAX_STRING_SIZE) {
            this.callOnBrowser(`${name}(${eventArgsString})`);

            return;
        }

        // String is too big to send it directly to the browser. This is why we split the string in chunks.
        let id = this.makeId(32),
            chunkBucket = this.chunkString(JSON.stringify(args), MAX_STRING_SIZE),
            _this = this;

        chunkBucket.forEach(async (chunkData, chunkIndex) => {
            /*
                It is absolutely necessary to replace single backslashes with double backslashes.
                Otherwise they will be stripped off by browser.execute()!
                  In case a string ends with backslash, we add $$_$$_ at the end of the chunk.
                This will be striped off again on browser side.
                  Receiver is located at: gvmp/browser/src/components/BaseComponent.vue
            */
            chunkData = chunkData.replace(/\\/g, '\\\\');

            _this.callOnBrowser(`responseBigData('${id}', '${name}', '${chunkData}$$_$$_', ${chunkIndex}, ${chunkBucket.length})`);

            // Give the browser some time to breath...
            await timer(250);
        });
    }

    /**
     * Calls JavaScript code inside the ui browser.
     *
     * Component name will be added.
     * Call is made as `components.COMPONENT_NAME.EXECUTE`
     *
     * @param {string} execute
     */
    callOnBrowser(execute) {
        _browser2.default.execute(this.name, execute);
    }

    /**
     * Create a length long alphanumeric string.
     *
     * @param {number} length
     *
     * @return {string}
     */
    makeId(length) {
        let result = '',
            characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
            charactersLength = characters.length;

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    /**
     * Chunk a string by length.
     *
     * @param {string} str
     * @param {number} size
     *
     * @return {string[]}
     */
    chunkString(str, size) {
        const numChunks = Math.ceil(str.length / size);
        const chunks = new Array(numChunks);

        for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
            chunks[i] = str.substr(o, size);
        }

        return chunks;
    }
}

exports.default = Component;

},{"../browser/browser":93,"./components":95}],95:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _player = require('../player/player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Components {
    constructor() {
        let _this = this;

        this.components = new Map();

        mp.events.add('componentReady', function (componentName) {
            _this.onReady.call(_this, componentName);
        });

        mp.events.add('componentServerEvent', function (componentName, eventName, ...eventArgs) {
            _this.onIncomingServerEventCall.call(_this, componentName, eventName, ...eventArgs);
        });

        mp.events.add('componentEvent', function (componentName, eventName, eventArgsJson) {
            _this.onIncomingBrowserEventCall.call(_this, componentName, eventName, eventArgsJson);
        });

        mp.events.add('componentTriggerServerEvent', function (eventName, ...eventArgs) {
            _this.triggerServerEvent.call(_this, eventName, ...eventArgs);
        });

        mp.events.add('componentLog', function (...args) {
            mp.console.logInfo(JSON.stringify(args));
        });

        mp.events.add('componentLogSingle', function (arg) {
            mp.console.logInfo(arg);
        });
    }

    /**
     *
     *
     * @param componentName
     * @param eventName
     * @param eventArgs
     */
    onIncomingServerEventCall(componentName, eventName, ...eventArgs) {
        if (!this.components.has(componentName)) return;

        this.components.get(componentName).handleIncomingServerEventCall(eventName, ...eventArgs);
    }

    /**
     *
     *
     * @param componentName
     */
    onReady(componentName) {
        if (!this.components.has(componentName)) return;

        this.components.get(componentName).onReady();
    }

    /**
     * Call eventName on componentName.
     *
     * @param componentName
     * @param eventName
     * @param eventArgsJson Just one JSON string. // Don't ask, I dont know...
     */
    onIncomingBrowserEventCall(componentName, eventName, eventArgsJson) {
        if (!this.components.has(componentName)) return;

        if (typeof eventArgsJson === 'undefined' || eventArgsJson === null) {
            this.components.get(componentName).handleIncomingBrowserEventCall(eventName);

            return;
        }

        this.components.get(componentName).handleIncomingBrowserEventCall(eventName, JSON.parse(eventArgsJson));
    }

    /**
     * Call eventName on server.
     *
     * @param eventName
     * @param eventArgs
     */
    triggerServerEvent(eventName, ...eventArgs) {
        if (typeof eventArgs === 'undefined') {
            eventArgs = [];
        }

        eventArgs.push(_player2.default.remoteHashKey);

        mp.events.callRemote(eventName, ...eventArgs);
    }
}

exports.default = new Components();

},{"../player/player":186}],96:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
class Doors {
    constructor() {
        mp.events.add('setStateOfClosestDoorOfType', (type, x, y, z, locked, heading, p6) => {
            mp.game.object.setStateOfClosestDoorOfType(type, x, y, z, locked, heading, p6);
        });
    }
}

exports.default = new Doors();

},{}],97:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require('../../windows/window');

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AdminWindow extends _window2.default {
    constructor() {
        super('AdminMenu');

        this.setCurserVisible(true);
        this.setChatVisible(false);

        this.forwardableEvents.add('responseAdminMenu');
        this.forwardableEvents.add('responseCloseAdminMenu');
    }
}

exports.default = new AdminWindow();

},{"../../windows/window":203}],98:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require('../../windows/window');

var _window2 = _interopRequireDefault(_window);

var _nMenu = require('../hud/n-menu');

var _nMenu2 = _interopRequireDefault(_nMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AnimationWheelFavoritesList extends _window2.default {
    constructor() {
        super('AnimationWheelFavoritesList');

        this.setCurserVisible(true);

        this.setChatVisible(false);
    }

    onEvent(name, ...args) {
        if (name === 'getAnimationShortcuts') {
            this.callOnBrowser(`setDataItemsAnimation('${JSON.stringify(_nMenu2.default.getItems())}')`);
        }
    }
}

exports.default = new AnimationWheelFavoritesList();

},{"../../windows/window":203,"../hud/n-menu":138}],99:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BankWindow extends _window2.default {
    constructor() {
        super("Bank");
        this.setCurserVisible(true);
        this.setChatVisible(false);

        this.forwardableEvents.add("responseFinishPayment");
    }
}

exports.default = new BankWindow();

},{"../../windows/window":203}],100:[function(require,module,exports){
"use strict";

require("./bank-window");

},{"./bank-window":99}],101:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BannWindow extends _window2.default {
    constructor() {
        super("Bann");
    }
}

exports.default = new BannWindow();

},{"../../windows/window":203}],102:[function(require,module,exports){
"use strict";

require("./bann-window");

},{"./bann-window":101}],103:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require('../../windows/window');

var _window2 = _interopRequireDefault(_window);

var _bodyCamera = require('../../utils/bodyCamera');

var _bodyCamera2 = _interopRequireDefault(_bodyCamera);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BarberWindow extends _window2.default {
    constructor() {
        super('Barber');

        this.setCurserVisible(true);
        this.setChatVisible(false);
    }

    onEvent(name, ...args) {
        switch (name) {
            case 'setHairVariant':
                mp.players.local.setComponentVariation(2, args[0], 0, 0);
                return;
            case 'setHairColor':
                mp.players.local.setHairColor(args[0].color1, args[0].color2);
                return;
            case 'setBeard':
                mp.players.local.setHeadOverlay(1, args[0].variation, args[0].opacity, args[0].color, 0);
                return;
            case 'setChestHair':
                mp.players.local.setHeadOverlay(10, args[0].variation, args[0].opacity, args[0].color, 0);
                return;
            case 'moveCam':
                this.moveCam(args[0].offset);

                break;
        }
    }

    /**
     * Moves the cam around the player by a given heading offset.
     * It respects focused slots.
     *
     * @param heading Heading offset
     */
    moveCam(heading) {
        _bodyCamera2.default.rotateBodyCameraWithParams(heading, 2, 1, 0.5);
    }

    /**
     * Event if the window is loaded.
     */
    onReady() {
        this.toInitialZoom(true);
    }

    /**
     * Event if the window has been closed.
     */
    onClose() {
        _bodyCamera2.default.resetBodyCamera();
    }

    /**
     * Initial position if the player pressed E.
     *
     * @param create If true, a new cam will be created.
     */
    toInitialZoom(create = false) {
        let player = mp.players.local;

        if (create) {
            _bodyCamera2.default.createBodyCamera(player.position);
        }

        _bodyCamera2.default.flyBodyCameraWithParams(0, 2, 1, 0.5);
    }
}

exports.default = new BarberWindow();

},{"../../utils/bodyCamera":194,"../../windows/window":203}],104:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BusLinienWindow extends _window2.default {
    constructor() {
        super("BusLinienWindow");
        this.setCurserVisible(true);
        this.setChatVisible(false);
    }

    onReady() {
        mp.game.graphics.transitionToBlurred(250);
    }

    onClose() {
        mp.game.graphics.transitionFromBlurred(250);
    }
}

exports.default = new BusLinienWindow();

},{"../../windows/window":203}],105:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CannabisLaborWindow extends _window2.default {
    constructor() {
        super("CannabisLabor");
        this.setCurserVisible(true);
        this.setChatVisible(false);
    }
}

exports.default = new CannabisLaborWindow();

},{"../../windows/window":203}],106:[function(require,module,exports){
"use strict";

require("./cannabislab-window");

},{"./cannabislab-window":105}],107:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CarshopWindow extends _window2.default {
    constructor() {
        super("Carshop");
        this.forwardableEvents.add("responseVehicleList");
        this.setCurserVisible(true);
        this.setChatVisible(false);
    }
}

exports.default = new CarshopWindow();

},{"../../windows/window":203}],108:[function(require,module,exports){
"use strict";

require("./carshop-window");

},{"./carshop-window":107}],109:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SlotMachine extends _window2.default {
    constructor() {
        super("SlotMachine");
        this.forwardableEvents.add("rollSlot");
        this.forwardableEvents.add("responseSlotInfo");
        this.forwardableEvents.add("responseRisiko");
        this.setCurserVisible(true);
        this.setChatVisible(false);
    }
}

exports.default = new SlotMachine();

},{"../../windows/window":203}],110:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require('../../windows/window');

var _window2 = _interopRequireDefault(_window);

var _bodyCamera = require('../../utils/bodyCamera');

var _bodyCamera2 = _interopRequireDefault(_bodyCamera);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CharacterCreator extends _window2.default {
    constructor() {
        super('CharacterCreator');

        this.setCurserVisible(true);
        this.setChatVisible(false);
    }

    onEvent(name, ...args) {
        switch (name) {
            case 'changeCharacterPart':
                let part = args[0],
                    arg = [];

                if (part.method !== 'setFaceFeature') {
                    part.settings.forEach(setting => {
                        if (String(setting.value) === 'true') {
                            arg.push(true);

                            return;
                        }

                        if (String(setting.value) === 'false') {
                            arg.push(false);

                            return;
                        }

                        arg.push(parseFloat(setting.value));
                    });

                    mp.players.local[part.method](...arg);

                    return;
                }

                // Only float values for setFaceFeature
                for (let i = 0; i < 20; i++) {
                    mp.players.local[part.method](i, parseFloat(part.settings[i].value));
                }

                break;
            case 'changeGender':
                mp.players.local.model = args[0];

                break;
            case 'moveCam':
                this.moveCam(args[0].offset);

                break;
        }
    }

    onReady() {
        this.toInitialZoom(true);
    }

    onClose() {
        _bodyCamera2.default.resetBodyCamera();
    }

    /**
     * Moves the cam around the player by a given heading offset.
     * It respects focused slots.
     *
     * @param heading Heading offset
     */
    moveCam(heading) {
        _bodyCamera2.default.rotateBodyCameraWithParams(heading, 3, 0);
    }

    /**
     * Initial position if the player pressed E.
     *
     * @param create If true, a new cam will be created.
     */
    toInitialZoom(create = false) {
        let player = mp.players.local;

        if (create) {
            _bodyCamera2.default.createBodyCamera(player.position);
        }

        _bodyCamera2.default.flyBodyCameraWithParams(0, 3, 0);
    }
}

exports.default = new CharacterCreator();

},{"../../utils/bodyCamera":194,"../../windows/window":203}],111:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ChatWindow extends _window2.default {
    constructor() {
        super("Chat");
        this.setCurserVisible(true);
        this.lastCommands = [];
    }

    onEvent(name, ...args) {
        if (name == "setChatFlag") {
            _player2.default.setPlayerChatFlag(args[0]);
        } else if (name === "pushCommand") {
            this.lastCommands.unshift(args[0].message);
        }
    }

    onReady() {
        this.callOnBrowser(`responseLastCommands("${this.lastCommands}")`);
    }
}

exports.default = new ChatWindow();

},{"../../player/player":186,"../../windows/window":203}],112:[function(require,module,exports){
"use strict";

require("./chat-window");

},{"./chat-window":111}],113:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require('../../windows/window');

var _window2 = _interopRequireDefault(_window);

var _bodyCamera = require('../../utils/bodyCamera');

var _bodyCamera2 = _interopRequireDefault(_bodyCamera);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ClothingShop extends _window2.default {
    constructor() {
        super('ClothingShop');

        this.setCurserVisible(true);
        this.setChatVisible(false);

        this.forwardableEvents.add('responseClothingShopCategories');
        this.forwardableEvents.add('responseClothingShopClothes');
    }

    onEvent(name, ...args) {
        switch (name) {
            case 'moveCam':
                this.moveCam(args[0].offset, args[0].slot, args[0].isX, args[0].isY);

                break;
            case 'zoomToSlot':
                this.zoomToSlot(args[0].slot, args[0].isY);

                break;
            case 'zoomOut':
                this.toInitialZoom();

                break;
        }
    }

    /**
     * Calculates important movement data for given params.
     *
     * @param slot Which slot should be in focus?
     * @param isY  If true, right side will be in focus
     *
     * @returns {{distance: number, heading: number, camPos: {z: *}, pointPos: {z: *}}}
     */
    getMovementData(slot, isY) {
        let player = mp.players.local,
            data = {
            heading: player.getHeading(),
            distance: 1,
            camPos: {
                z: player.position.z
            },
            pointPos: {
                z: player.position.z
            }
        };

        switch (slot) {
            case '1':
                // Mask
                data.camPos.z += 0.5;
                data.pointPos.z += 0.5;

                break;
            case '3':
                // Body
                data.distance = 3;

                break;
            case '4':
                // Legs
                data.camPos.z -= 0.6;
                data.pointPos.z -= 0.6;

                break;
            case '5':
                // Backpack
                data.heading += 180;
                data.camPos.z += 0.5;
                data.pointPos.z += 0.2;

                break;
            case '6':
                // Shoes
                data.camPos.z -= 0.6;
                data.pointPos.z -= 0.8;

                break;
            case '7': // Accessories
            case '8': // Undershirts
            case '11':
                // Tops
                data.camPos.z += 0.5;
                data.pointPos.z += 0.2;

                break;
            case 'p-0':
                // Hat
                data.heading += 180;
                data.distance = 2;

                data.camPos.z += 1;
                data.pointPos.z += 0.5;

                break;
            case 'p-1':
                // Glasses
                data.camPos.z += 0.5;
                data.pointPos.z += 0.5;

                break;
            case 'p-2':
                // Ears
                data.heading = isY ? data.heading + 90 : data.heading - 90;

                data.camPos.z += 0.5;
                data.pointPos.z += 0.5;

                break;
            case 'p-6': // Watch
            case 'p-7':
                // Wrist
                data.heading = isY ? data.heading + 90 : data.heading - 90;

                data.camPos.z += 0.3;
                data.pointPos.z -= 0.1;

                break;
        }

        return data;
    }

    /**
     * Moves the Camera to a given slot.
     *
     * @param slot Which slot should be in focus?
     * @param isY If true, right side will be used.
     */
    zoomToSlot(slot, isY) {
        let player = mp.players.local,
            data = this.getMovementData(slot, isY),
            offset = this.offsetPosition(player.position.x, player.position.y, data.heading, data.distance),
            targetPositionFly = new mp.Vector3(offset.x, offset.y, data.camPos.z),
            targetPositionPoint = new mp.Vector3(player.position.x, player.position.y, data.pointPos.z);

        _bodyCamera2.default.flyBodyCameraTo(targetPositionFly);
        _bodyCamera2.default.pointBodyCameraAt(targetPositionPoint);
    }

    /**
     * Moves the cam around the player by a given heading offset.
     * It respects focused slots.
     *
     * @param heading Heading offset
     * @param slot Slot in focus
     * @param isX Is slot in focus?
     * @param isY Is slots right side in focus?
     */
    moveCam(heading, slot, isX, isY) {
        let player = mp.players.local,
            data,
            offset,
            targetPositionFly,
            targetPositionPoint;

        if ((isX || isY) && slot !== null) {
            data = this.getMovementData(slot, isY);
            offset = this.offsetPosition(player.position.x, player.position.y, data.heading + heading, data.distance);

            targetPositionFly = new mp.Vector3(offset.x, offset.y, data.camPos.z);
            targetPositionPoint = new mp.Vector3(player.position.x, player.position.y, data.pointPos.z);

            _bodyCamera2.default.flyBodyCameraTo(targetPositionFly);
            _bodyCamera2.default.pointBodyCameraAt(targetPositionPoint);

            return;
        }

        offset = this.offsetPosition(player.position.x, player.position.y, player.getHeading() + heading, 3);

        targetPositionFly = new mp.Vector3(offset.x, offset.y, player.position.z);
        targetPositionPoint = player.position;

        _bodyCamera2.default.flyBodyCameraTo(targetPositionFly);
        _bodyCamera2.default.pointBodyCameraAt(targetPositionPoint);
    }

    /**
     * Event if the window is loaded.
     */
    onReady() {
        this.toInitialZoom(true);
    }

    /**
     * Initial position if the player pressed E.
     *
     * @param create If true, a new cam will be created.
     */
    toInitialZoom(create = false) {
        let player = mp.players.local,
            offset = this.offsetPosition(player.position.x, player.position.y, player.getHeading(), 3),
            targetPositionFly,
            targetPositionPoint;

        if (create) {
            _bodyCamera2.default.createBodyCamera(new mp.Vector3(offset.x, offset.y, player.position.z));
            _bodyCamera2.default.pointBodyCameraAt(player.position);
        }

        targetPositionFly = new mp.Vector3(offset.x, offset.y, player.position.z);
        targetPositionPoint = player.position;

        _bodyCamera2.default.flyBodyCameraTo(targetPositionFly);
        _bodyCamera2.default.pointBodyCameraAt(targetPositionPoint);
    }

    /**
     * Event if the window has been closed.
     */
    onClose() {
        _bodyCamera2.default.resetBodyCamera();
    }

    /**
     * Get offset with rotation.
     *
     * @param x
     * @param y
     * @param rot
     * @param distance
     * @returns {{x: number, y: number}}
     */
    offsetPosition(x, y, rot, distance) {
        return {
            x: x + Math.sin(-rot * Math.PI / 180) * distance,
            y: y + Math.cos(-rot * Math.PI / 180) * distance
        };
    }
}

exports.default = new ClothingShop();

},{"../../utils/bodyCamera":194,"../../windows/window":203}],114:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ConfirmWindow extends _window2.default {
    constructor() {
        super("Confirmation");
        this.setCurserVisible(true);
        this.setChatVisible(false);
    }
}

exports.default = new ConfirmWindow();

},{"../../windows/window":203}],115:[function(require,module,exports){
"use strict";

require("./confirm-window");

},{"./confirm-window":114}],116:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DeathWindow extends _window2.default {
    constructor() {
        super("Death");
        this.setCurserVisible(false);
        this.forwardableEvents.add("closeDeathScreen");
    }
}

exports.default = new DeathWindow();

},{"../../windows/window":203}],117:[function(require,module,exports){
"use strict";

require("./death-window");

},{"./death-window":116}],118:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class EjectWindow extends _window2.default {
    constructor() {
        super("EjectWindow");
        this.setCurserVisible(true);
        this.setChatVisible(false);
    }

    onReady() {
        mp.game.graphics.transitionToBlurred(250);
    }

    onClose() {
        mp.game.graphics.transitionFromBlurred(250);
    }
}

exports.default = new EjectWindow();

},{"../../windows/window":203}],119:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FlyerWindow extends _window2.default {
    constructor() {
        super("Flyer");
        this.setCurserVisible(true);
        this.setChatVisible(false);
    }
}

exports.default = new FlyerWindow();

},{"../../windows/window":203}],120:[function(require,module,exports){
"use strict";

require("./flyer-window");

},{"./flyer-window":119}],121:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FriskWindow extends _window2.default {
    constructor() {
        super("Frisk");
        this.forwardableEvents.add("closeFriskWindow");
        this.setCurserVisible(true);
        this.setChatVisible(false);
    }
}

exports.default = new FriskWindow();

},{"../../windows/window":203}],122:[function(require,module,exports){
"use strict";

require("./frisk-window");

},{"./frisk-window":121}],123:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GarageWindow extends _window2.default {
    constructor() {
        super("Garage");
        this.forwardableEvents.add("responseVehicleList");
        this.setCurserVisible(true);
        this.setChatVisible(false);
    }
}

exports.default = new GarageWindow();

},{"../../windows/window":203}],124:[function(require,module,exports){
"use strict";

require("./garage-window");

},{"./garage-window":123}],125:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GiveMoneyWindow extends _window2.default {
    constructor() {
        super("GiveMoney");
        this.setCurserVisible(true);
        this.setChatVisible(false);
    }
}

exports.default = new GiveMoneyWindow();

},{"../../windows/window":203}],126:[function(require,module,exports){
"use strict";

require("./giveMoney-window");

},{"./giveMoney-window":125}],127:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HeroinLaborWindow extends _window2.default {
    constructor() {
        super("HeroinLabor");
        this.setCurserVisible(true);
        this.setChatVisible(false);
    }
}

exports.default = new HeroinLaborWindow();

},{"../../windows/window":203}],128:[function(require,module,exports){
"use strict";

require("./heroinlab-window");

},{"./heroinlab-window":127}],129:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AntiAFK extends _component2.default {
    constructor() {
        super("AntiAFK");
        this.power = false;
        this.timeLeft = 60;
    }

    setVisible() {
        this.callOnBrowser(`power=${true}`);
        this.callOnBrowser(`timeLeft=${60}`);
        mp.gui.cursor.visible = true;
        mp.game.graphics.transitionToBlurred(250);
        mp.game.ui.displayHud(false);
        mp.game.ui.displayRadar(false);
    }

    onEvent(name, ...args) {
        if (name == "disableAntiAFK") {
            mp.gui.cursor.visible = false;
            mp.game.graphics.transitionFromBlurred(250);
            mp.game.ui.displayHud(true);
            mp.game.ui.displayRadar(true);
        }
    }
}

exports.default = new AntiAFK();

},{"../../components/component":94}],130:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Bus extends _component2.default {
    constructor() {
        super("Bus");

        mp.events.add("showBusHud", (linie, verbleibendehaltestellen, nexthaltestelle, doorcountdown, busstopped) => {
            this.callOnBrowser(`showBusHud('${linie}', '${verbleibendehaltestellen}', '${nexthaltestelle}','${doorcountdown}','${busstopped}')`);
        });

        mp.events.add("closeBusHud", () => {
            this.callOnBrowser(`closeBusHud()`);
        });
    }
}

exports.default = new Bus();

},{"../../components/component":94}],131:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Fishing extends _component2.default {
    constructor() {
        super("Fishing");

        mp.events.add('showfishing', fishingstate => {
            this.callOnBrowser(`showfishing(${fishingstate})`);
        });
        mp.events.add('setAngelState', angelstate => {
            this.callOnBrowser(`setAngelState(${angelstate})`);
        });
        mp.events.add('setFishState', fishstate => {
            this.callOnBrowser(`setFishState(${fishstate})`);
        });
    }
}

exports.default = new Fishing();

},{"../../components/component":94}],132:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Gangwar extends _component2.default {
    constructor() {
        super("Gangwar");

        mp.events.add("initializeGangwar", (attackerTeam, defenderTeam, attackerId, defenderId, gangwarTime) => {
            this.callOnBrowser(`initializeGangwar('${attackerTeam}', '${defenderTeam}', '${attackerId}', '${defenderId}', '${gangwarTime}')`);
        });

        mp.events.add("updateGangwarScore", (attackerScore, defenderScore) => {
            this.callOnBrowser(`updateScore('${attackerScore}','${defenderScore}')`);
        });

        mp.events.add("finishGangwar", () => {
            this.callOnBrowser(`finishGangwar()`);
        });
    }
}

exports.default = new Gangwar();

},{"../../components/component":94}],133:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GlobalNotification extends _component2.default {
    constructor() {
        super("GlobalNotification");

        mp.events.add("sendGlobalNotification", (message, duration, color, icon) => {
            this.callOnBrowser(`setGlobalNotification('${message}', '${duration}', '${color}', '${icon}')`);
        });
    }
}

exports.default = new GlobalNotification();

},{"../../components/component":94}],134:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HelpPanel extends _component2.default {
    constructor() {
        super("HelpPanel");
    }

    onReady() {
        if (_player2.default.level <= 3) {
            this.callOnBrowser(`showHelpPanel=true`);
        } else {
            this.callOnBrowser(`showHelpPanel=false`);
        }
    }
}

exports.default = new HelpPanel();

},{"../../components/component":94,"../../player/player":186}],135:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Hud extends _component2.default {
    constructor() {
        super("Hud");
        this.windows = [];
        mp.nametags.enabled = false;
    }

    setVisible(visible) {
        this.callOnBrowser(`visible=${visible ? "true" : "false"}`);
    }

    addWindow(window, data) {
        this.windows.push({ name: window, data: data });
        this.callOnBrowser(`addWindow("${window}", '${data}')`);
    }

    removeWindow(window, dataFunction = null) {
        mp.gui.chat.push(JSON.stringify(this.windows));

        if (dataFunction == null) {
            this.callOnBrowser(`removeWindow("${window}")`);
        } else {
            this.callOnBrowser(`removeWindow("${window}", ${dataFunction.toString()})`);
        }

        for (var i = this.windows.length - 1; i >= 0; i--) {
            if (this.windows[i].name == window) {
                if (dataFunction != null && !dataFunction(this.windows[i].data)) {
                    continue;
                }
                this.windows.splice(i, 1);
                return;
            }
        }
    }
}

exports.default = new Hud();

},{"../../components/component":94}],136:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Infocard extends _component2.default {
    constructor() {
        super("Infocard");

        mp.events.add("sendInfocard", (content, color, imgSrc, duration, data) => {
            this.callOnBrowser(`pushInfocard('${content}', '${color}', '${imgSrc}', '${duration}', '${data}')`);
        });
    }
}

exports.default = new Infocard();

},{"../../components/component":94}],137:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require('../../components/component');

var _component2 = _interopRequireDefault(_component);

var _playerPanel = require('../hud/player-panel');

var _playerPanel2 = _interopRequireDefault(_playerPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @Deprecated
class Menu extends _component2.default {
    constructor() {
        super('NativeMenu');

        this.forwardableEvents.add('createMenu');
        this.forwardableEvents.add('addItem');
        this.forwardableEvents.add('show');
        this.forwardableEvents.add('hide');
        this.forwardableEvents.add('showNativeMenu');

        this.visible = false;
    }

    onEvent(name, ...args) {
        if (name === 'show') {
            this.visible = true;

            _playerPanel2.default.executeDisplay(true);
        } else if (name === 'hide') {
            this.visible = false;

            _playerPanel2.default.executeDisplay(false);
        } else if (name === 'activateCursor') {
            mp.gui.cursor.visible = true;
        } else if (name === 'deactivateCursor') {
            mp.gui.cursor.visible = false;
        }
    }
}

exports.default = new Menu();

},{"../../components/component":94,"../hud/player-panel":141}],138:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require('../../components/component');

var _component2 = _interopRequireDefault(_component);

var _player = require('../../player/player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class NMenu extends _component2.default {
    constructor() {
        super('NMenu');
        this.visible = false;
    }

    setItems(items) {
        if (items == null) {
            return;
        }

        this.visible = items.length > 0;
        this.callOnBrowser(`setDataItems('${JSON.stringify(items)}')`);

        mp.gui.cursor.visible = this.visible;
    }

    getItems() {
        if (_player2.default.isInAnyVehicle(true)) {
            return;
        }

        return _player2.default.animations;
    }

    onEvent(name, ...args) {
        if (name === 'select') {
            if (_player2.default.isInAnyVehicle(true)) {
                return;
            }

            mp.events.callRemote('REQUEST_ANIMATION_USE', args[0], _player2.default.remoteHashKey);
        }
    }
}

exports.default = new NMenu();

},{"../../components/component":94,"../../player/player":186}],139:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Nutrition extends _component2.default {
    constructor() {
        super("Nutrition");
        mp.events.add("responseNutrition", data => {
            this.callOnBrowser(`responseNutrition('${data}')`);
        });
    }
}

exports.default = new Nutrition();

},{"../../components/component":94}],140:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Paintball extends _component2.default {
    constructor() {
        super("Paintball");
        mp.events.add("initializePaintball", () => {
            this.callOnBrowser(`initializePaintball()`);
        });

        mp.events.add("updatePaintballScore", (kills, deaths, ks) => {
            this.callOnBrowser(`updatePaintballScore('${kills}', '${deaths}', '${ks}')`);
        });

        mp.events.add("finishPaintball", () => {
            this.callOnBrowser(`finishPaintball()`);
        });

        mp.events.add("spawnProtection", (ms, alpha = 180, notify = true) => {
            if (ms > 0) {
                mp.players.local.setInvincible(true);
                _player2.default.invincible = true;
                mp.players.local.setAlpha(alpha);
                notify ? mp.game.graphics.notify('SpawnProtection: ~g~' + ms / 1000 + " Sekunden") : "";
                var spawnprotect = setInterval(function () {
                    mp.players.local.setInvincible(false);
                    _player2.default.invincible = false;
                    notify ? mp.game.graphics.notify('SpawnProtection: ~r~aus') : "";
                    mp.players.local.setAlpha(255);
                    clearInterval(spawnprotect);
                }, ms);
            }
        });
    }
}

exports.default = new Paintball();

},{"../../components/component":94,"../../player/player":186}],141:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PlayerPanel extends _component2.default {
    constructor() {
        super("PlayerPanel");

        this.displayState = false;
        this.forwardableEvents.add("responsePlaySMSSound");

        mp.events.add('setVoiceType', voiceRange => {
            this.callOnBrowser(`voiceRange=${voiceRange}`);
        });
    }

    onReady() {
        this.callOnBrowser(`money=${_player2.default.money}`);
        this.callOnBrowser(`wanteds=${_player2.default.wanteds}`);
    }

    setMoney(money) {
        this.callOnBrowser(`money=${money}`);
    }

    displayChange() {
        this.displayState = !this.displayState;
        this.callOnBrowser(`state=${this.displayState}`);
    }

    setAirRadio(type) {
        this.callOnBrowser(`airRadioActiveType=${type}`);
    }

    setAirRadioState(state) {
        this.callOnBrowser(`airRadioActive=${state}`);
    }

    setBlackmoney(money) {
        this.callOnBrowser(`blackmoney=${money}`);
    }

    setWanteds(wanteds) {
        this.callOnBrowser(`wanteds=${wanteds}`);
    }

    setVoiceRadio(voiceRadio) {
        this.callOnBrowser(`voiceRadio=${voiceRadio}`);
    }

    setVoiceRadioActive(voiceRadioActive) {
        this.callOnBrowser(`voiceRadioActive=${voiceRadioActive}`);
    }

    playPPTSound() {
        this.callOnBrowser(`playPushToTalkSound()`);
    }

    setVoiceRadioActiveType(type) {
        this.callOnBrowser(`voiceRadioActiveType=${type}`);
    }

    setAduty(aduty) {
        this.callOnBrowser(`aduty=${aduty}`);
    }

    executeDisplay(state) {
        this.callOnBrowser(`state=${state}`);
    }

    setTalking(state) {
        this.callOnBrowser(`talking=${state}`);
    }

    setNutritionEating(state) {
        this.callOnBrowser(`nutritionEating=${state}`);
    }

    setNutritionDrinking(state) {
        this.callOnBrowser(`nutritionDrinking=${state}`);
    }
}

exports.default = new PlayerPanel();

},{"../../components/component":94,"../../player/player":186}],142:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require('../../components/component');

var _component2 = _interopRequireDefault(_component);

var _player = require('../../player/player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PlayerInfo extends _component2.default {
    constructor() {
        super('PlayerInfo');
    }

    onReady() {
        this.callOnBrowser(`setPlayerId(${_player2.default.playerId})`);
        this.callOnBrowser(`setVoiceHash("${_player2.default.voiceHash}")`);
    }

    setPlayerId(playerId) {
        this.callOnBrowser(`setPlayerId(${playerId})`);
    }

    setVoiceHash(voiceHash) {
        this.callOnBrowser(`setvoiceHash(${voiceHash})`);
    }
}

exports.default = new PlayerInfo();

},{"../../components/component":94,"../../player/player":186}],143:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PlayerNotification extends _component2.default {
    constructor() {
        super("PlayerNotification");

        mp.events.add("sendPlayerNotification", (message, duration, color, title, bgcolor) => {
            if (_player2.default.phonelautlos == false) {
                mp.game.audio.playSoundFrontend(1, "ATM_WINDOW", "HUD_FRONTEND_DEFAULT_SOUNDSET", true);
            }
            this.callOnBrowser(`pushPlayerNotification('${message}', '${duration}', '${_player2.default.phonelautlos}', '${color}', '${title}', '${bgcolor}')`);
        });
    }
}

exports.default = new PlayerNotification();

},{"../../components/component":94,"../../player/player":186}],144:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Progressbar extends _component2.default {
    constructor() {
        super("Progressbar");

        mp.events.add("sendProgressbar", duration => {
            this.callOnBrowser(`setProgressbar('${duration}')`);
            _player2.default.progressbar = true;
        });
    }

    onEvent(name, ...args) {
        if (name == "StopProgressbar") {
            _player2.default.progressbar = false;
        }
    }
}

exports.default = new Progressbar();

},{"../../components/component":94,"../../player/player":186}],145:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

var _apps = require("../../app/apps");

var _apps2 = _interopRequireDefault(_apps);

var _callManage = require("../../apps/callManage");

var _callManage2 = _interopRequireDefault(_callManage);

var _home = require("../../apps/home");

var _home2 = _interopRequireDefault(_home);

var _phone = require("../../apps/phone");

var _phone2 = _interopRequireDefault(_phone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Smartphone extends _component2.default {
    constructor() {
        super("Smartphone");
    }

    showCallScreen() {
        this.callOnBrowser(`showCallScreen()`);
        _apps2.default.SmartphoneApp = "PhoneScreen";
        mp.gui.cursor.visible = false;
    }

    refreshSmartphone() {
        this.callOnBrowser(`refreshSmartphone()`);
    }

    onEvent(name, ...args) {
        if (name == "activateCursor") {
            mp.gui.cursor.visible = true;
        } else if (name == "cleanSmartphone") {
            _apps2.default.componentVisibleApp["Smartphone"] = null;
        } else if (name == "callDeclined") {
            _callManage2.default.declineCall();
            _home2.default.declineCall();
        } else if (name == "callAccepted") {
            _callManage2.default.acceptedCall();
        } else if (name == "micmute") {
            _callManage2.default.micmute();
        } else if (name == "getHomeScreen") {
            _phone2.default.getHomeScreen();
        } else if (name == "getHomeScreenCall") {
            _apps2.default.SmartphoneApp = "MainScreen";
            _home2.default.getHomeScreenCall();
            _phone2.default.getHomeScreenCall();
            mp.gui.cursor.visible = true;
        }
    }
}

exports.default = new Smartphone();

},{"../../app/apps":3,"../../apps/callManage":12,"../../apps/home":35,"../../apps/phone":53,"../../components/component":94}],146:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class VehiclePanel extends _component2.default {
    constructor() {
        super("VehiclePanel");

        this.count = 0;
        this.currentDistance = 0.0;
        this.currentFuelDistance = 0.0;
        this.currentInterval = null;
        this.speed = 0;
        this.engine = false;
        this.lock = false;
        this.tachoActive = false;
        this.isDriver = false;
        this.driverInterval = null;
        this.svehicle = null;

        mp.events.add("updateVehicleData", (newFuel, newDistance, newHealth, locked, engine) => {
            this.callOnBrowser(`fuel=${newFuel}`);
            this.callOnBrowser(`mileage=${newDistance}`);
            this.callOnBrowser(`health=${newHealth}`);
            this.callOnBrowser(`lock=${locked}`);
            this.callOnBrowser(`engine=${engine}`);
        });

        mp.events.add("initialVehicleData", (fuel, maxFuel, health, maxHealth, maxSpeed, locked, mileage, engine) => {
            this.callOnBrowser(`fuel=${fuel}`);
            this.callOnBrowser(`maxfuel=${maxFuel}`);
            this.callOnBrowser(`health=${health}`);
            this.callOnBrowser(`maxhealth=${maxHealth}`);
            this.callOnBrowser(`maxspeed=${maxSpeed}`);
            this.callOnBrowser(`lock=${locked}`);
            this.callOnBrowser(`mileage=${mileage}`);
            this.callOnBrowser(`engine=${engine}`);
        });

        mp.events.add("setNormalSpeed", (vehicle, speed) => {

            if (vehicle == null) return;
            speed = speed / 3.6;
            if (speed > 0) {
                vehicle.setMaxSpeed(speed);
            } else {
                vehicle.setMaxSpeed(mp.game.vehicle.getVehicleModelMaxSpeed(vehicle.model) * 1.609);
            }
            this.showTempomat(false);
            this.svehicle = null;
        });

        mp.events.add("playerEnterVehicle", (vehicle, seat) => {
            this.playerEnteredVehicle();
        });

        mp.events.add("playerLeaveVehicle", (vehicle, seat) => {
            this.showTacho(false);

            if (this.currentInterval != null) {
                clearInterval(this.currentInterval);
                this.currentInterval = null;
            }
            if (this.driverInterval != null) {
                clearInterval(this.driverInterval);
                this.isDriver = false;
                this.driverInterval = null;
            }
        });
    }

    playerEnteredVehicle() {
        this.count = 0;
        this.currentDistance = 0.0;
        this.currentFuelDistance = 0.0;

        if (this.currentInterval != null) {
            clearInterval(this.currentInterval);
        }

        if (mp.players.local.__animationData !== undefined && mp.players.local.__animationData != null) {
            if (mp.players.local.__animationData.Active == true) {
                mp.players.local.__animationData.Active = false;
                mp.players.local.stopAnim(mp.players.local.__animationData.AnimationName, mp.players.local.__animationData.AnimationDict, mp.players.local.__animationData.AnimationSpeed);
            }
        }

        this.driverInterval = setInterval(() => {
            let Player = mp.players.local;
            let Vehicle = mp.players.local.vehicle;
            if (_player2.default.isInAnyVehicle(false) && Vehicle !== null && Vehicle.getPedInSeat(-1) == Player.handle) {
                this.isDriver = true;
            } else {
                this.isDriver = false;
            }
        }, 400);

        this.currentInterval = setInterval(() => {
            let vehicle = mp.players.local.vehicle;
            if (vehicle != null) {

                let engineStatus = vehicle.getVariable("engineStatus");
                let lockedStatus = vehicle.getVariable("lockedStatus");

                if (!this.tachoActive) {
                    this.showTacho(true);
                }
                let speed = vehicle.getSpeed();
                speed = speed * 3.6;

                if (this.speed != speed) {
                    var noDistance = false;

                    if (speed == 0) {
                        speed = 0;
                        noDistance = true;
                    }

                    let currentSpeed = speed;
                    currentSpeed /= 60.0;
                    currentSpeed /= 60.0;
                    currentSpeed /= 4.0;

                    this.currentFuelDistance += currentSpeed * (speed / 50.0);

                    let newSpeed = vehicle.getSpeed();

                    if (!noDistance) {
                        this.currentDistance += newSpeed;
                    }
                    this.setSpeed(Math.round(speed));
                    this.count++;
                }

                this.setEngine(engineStatus);
                this.setLocked(lockedStatus);

                if (this.count >= 100) {
                    this.currentDistance = this.currentDistance / 1000;
                    this.currentDistance = this.currentDistance / 100 * 2;
                    this.sendAndReset(vehicle);
                    this.count = 0;
                }
            } else {
                if (this.tachoActive) {
                    this.showTacho(false);
                }
            }
        }, 33);
    }

    sendAndReset(veh) {
        if (this.currentDistance > 0.001 && veh != null) {
            mp.events.callRemote("updateVehicleDistance", veh, Number(this.currentDistance.toFixed(3)), Number(this.currentFuelDistance.toFixed(3)), _player2.default.remoteHashKey);

            this.currentDistance = 0;
            this.currentFuelDistance = 0;
        }
    }

    showTacho(activeTacho) {
        this.tachoActive = activeTacho;
        this.callOnBrowser(`activeTacho=${activeTacho ? "true" : "false"}`);
    }

    setEngine(engine) {
        this.engine = engine;
        this.callOnBrowser(`engine=${engine}`);
    }
    setLocked(lock) {
        this.lock = lock;
        this.callOnBrowser(`lock=${lock}`);
    }

    showTempomat(tempo) {
        this.callOnBrowser(`tempomat=${tempo ? "true" : "false"}`);
    }

    requestNormalSpeed(vehicle) {
        mp.events.callRemote("requestNormalSpeed", vehicle, _player2.default.remoteHashKey);
    }

    tempomat() {
        var lvehicle = mp.players.local.vehicle;
        if (lvehicle == null) return;
        if (mp.players.local.handle == lvehicle.getPedInSeat(-1)) {
            if (this.svehicle == lvehicle) {
                this.requestNormalSpeed(lvehicle);
            } else {
                if (lvehicle.getSpeed() > 5) {
                    this.svehicle = lvehicle;
                    lvehicle.setMaxSpeed(lvehicle.getSpeed());
                    this.showTempomat(true);
                }
            }
        }
    }

    setSpeed(speed) {
        this.speed = speed;
        this.callOnBrowser(`speed=${Math.round(speed * 1.20)}`);
        //this.execute(`maxspeed=300`)
        //this.execute(`responseVehicleSpeed(${speed})`)
    }
}

exports.default = new VehiclePanel();

},{"../../components/component":94,"../../player/player":186}],147:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

var _vehicleModule = require("../../vehicle/vehicle-module");

var _vehicleModule2 = _interopRequireDefault(_vehicleModule);

var _flatbed = require("../../vehicle/flatbed");

var _flatbed2 = _interopRequireDefault(_flatbed);

var _peds = require("../../peds/peds");

var _peds2 = _interopRequireDefault(_peds);

var _raycast = require("../../raycast/raycast");

var _raycast2 = _interopRequireDefault(_raycast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class XMenu extends _component2.default {
    constructor() {
        super("XMenu");
        this.visible = false;
    }

    setItems(items) {
        if (items == null) {
            return;
        }

        this.visible = items.length > 0;
        this.callOnBrowser(`setDataItems('${JSON.stringify(items)}')`);
        if (this.visible) {
            mp.gui.cursor.visible = true;
        } else {
            mp.gui.cursor.visible = false;
        }
    }

    // Get menu items
    getItems() {
        if (_player2.default.isInAnyVehicle(false)) {
            return _vehicleModule2.default.getVehicleItems();
        } else {
            let obj = _raycast2.default.createRaycast();

            if (obj != null) {
                let distance = _player2.default.getDistance(obj.position);

                if (obj.entity.isAVehicle()) {
                    if (!distance || distance < 0 || distance > 3) {
                        return;
                    }

                    return _vehicleModule2.default.getVehicleItems();
                } else if (obj.entity.isAPed()) {

                    if (!distance || distance < 0 || distance > 2) {
                        return;
                    }

                    return _peds2.default.getPlayerMenuItems();
                }
            }

            return null;
        }
    }

    switchDpos;

    // Call server function
    onEvent(name, ...args) {
        if (name == "select") {
            // In vehicle
            if (_player2.default.isInAnyVehicle(false)) {
                if (args[0].id == "donothing") {
                    return;
                } else if (args[0].arg == "dposclient") {
                    _flatbed2.default.xmenuswitch(args[0].itemId);
                    return;
                } else if (args[0].arg == "" || args[0].arg == undefined || args[0].arg.length <= 0) {
                    mp.events.callRemote(args[0].itemId, _player2.default.remoteHashKey);
                    return;
                } else if (args[0].itemId == "LOCAL_ACTION") {
                    if (args[0].arg == "RadioOff") mp.game.audio.setRadioToStationName("OFF");
                    return;
                } else mp.events.callRemote(args[0].itemId, args[0].arg, _player2.default.remoteHashKey);
            }
            // Not in vehicle
            else {
                    let obj = _raycast2.default.createRaycast();
                    if (obj == null) return;

                    if (args[0].id == "donothing") {
                        return;
                    } else if (args[0].arg == "" || args[0].arg == undefined || args[0].arg.length <= 0) {
                        mp.events.callRemote(args[0].itemId, obj.entity, _player2.default.remoteHashKey);
                    } else mp.events.callRemote(args[0].itemId, obj.entity, args[0].arg, _player2.default.remoteHashKey);
                }
        }
    }
}

exports.default = new XMenu();

},{"../../components/component":94,"../../peds/peds":180,"../../player/player":186,"../../raycast/raycast":193,"../../vehicle/flatbed":198,"../../vehicle/vehicle-module":200}],148:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class IdCard extends _component2.default {
    constructor() {
        super("IdCard");

        mp.events.add("showPerso", (firstname, lastname, birthday, address, level, id, casino, govLevel) => {
            if (_player2.default.cduty && casino >= 1) {
                if (casino == 1) {
                    this.callOnBrowser(`updatePerso('${firstname}', '${lastname}', '${birthday}', '${address}', '${level}', '${id}', '1', '')`);
                } else if (casino == 2) {
                    this.callOnBrowser(`updatePerso('${firstname}', '${lastname}', '${birthday}', '${address}', '${level}', '${id}', '2', '')`);
                } else if (casino == 3) {
                    this.callOnBrowser(`updatePerso('${firstname}', '${lastname}', '${birthday}', '${address}', '${level}', '${id}', '3', '')`);
                } else if (casino == 4) {
                    this.callOnBrowser(`updatePerso('${firstname}', '${lastname}', '${birthday}', '${address}', '${level}', '${id}', '4', '')`);
                }
            } else {
                this.callOnBrowser(`updatePerso('${firstname}', '${lastname}', '${birthday}', '${address}', '${level}', '${id}', '0', '${govLevel}')`);
            }
        });
        mp.events.add("showDienstausweis", (behoerde, dienstnummer, casino, fistname, lastname, cduty, govLevel) => {
            if (_player2.default.cduty && casino >= 1) {
                if (casino == 1) {
                    if (cduty == 1) {
                        this.callOnBrowser(`updateDutyCard('${behoerde}', '${dienstnummer}', '1', '${fistname}', '${lastname}', '1', '')`);
                    } else {
                        this.callOnBrowser(`updateDutyCard('${behoerde}', '${dienstnummer}', '1', '${fistname}', '${lastname}', '0', '')`);
                    }
                } else if (casino == 2) {
                    if (cduty == 1) {
                        this.callOnBrowser(`updateDutyCard('${behoerde}', '${dienstnummer}', '2', '${fistname}', '${lastname}', '1', '')`);
                    } else {
                        this.callOnBrowser(`updateDutyCard('${behoerde}', '${dienstnummer}', '2', '${fistname}', '${lastname}', '0', '')`);
                    }
                } else if (casino == 3) {
                    if (cduty == 1) {
                        this.callOnBrowser(`updateDutyCard('${behoerde}', '${dienstnummer}', '3', '${fistname}', '${lastname}', '1', '')`);
                    } else {
                        this.callOnBrowser(`updateDutyCard('${behoerde}', '${dienstnummer}', '3', '${fistname}', '${lastname}', '0', '')`);
                    }
                } else if (casino == 4) {
                    if (cduty == 1) {
                        this.callOnBrowser(`updateDutyCard('${behoerde}', '${dienstnummer}', '4', '${fistname}', '${lastname}', '1', '')`);
                    } else {
                        this.callOnBrowser(`updateDutyCard('${behoerde}', '${dienstnummer}', '4', '${fistname}', '${lastname}', '0', '')`);
                    }
                }
            } else {
                if (cduty == 1) {
                    this.callOnBrowser(`updateDutyCard('${behoerde}', '${dienstnummer}', '0', '${fistname}', '${lastname}', '1', '${govLevel}')`);
                } else {
                    this.callOnBrowser(`updateDutyCard('${behoerde}', '${dienstnummer}', '0', '${fistname}', '${lastname}', '0', '${govLevel}')`);
                }
            }
        });
    }
}

exports.default = new IdCard();

},{"../../components/component":94,"../../player/player":186}],149:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class InputWindow extends _window2.default {
    constructor() {
        super("TextInputBox");
        this.setCurserVisible(true);
        this.setChatVisible(false);
    }

    onEvent(name, ...args) {
        if (name == "setblur") {
            mp.game.graphics.transitionToBlurred(250);
        }
    }

    onReady() {
        this.callOnBrowser(`setProfile('${_player2.default.phone}','${_player2.default.money}')`);
    }

    onClose() {
        mp.game.graphics.transitionFromBlurred(250);
    }
}

exports.default = new InputWindow();

},{"../../player/player":186,"../../windows/window":203}],150:[function(require,module,exports){
"use strict";

require("./input-window");

},{"./input-window":149}],151:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class InsuranceWindow extends _window2.default {
    constructor() {
        super("Insurance");
        this.setCurserVisible(true);
        this.setChatVisible(false);
    }

    onReady() {
        mp.game.graphics.transitionToBlurred(250);
    }

    onClose() {
        mp.game.graphics.transitionFromBlurred(250);
    }
}

exports.default = new InsuranceWindow();

},{"../../windows/window":203}],152:[function(require,module,exports){
'use strict';

require('./login/login');

require('./register/register');

require('./bann/bann');

require('./kick/kick');

require('./hud/hud');

require('./hud/menu');

require('./hud/x-menu');

require('./hud/n-menu');

require('./hud/vehicle-panel');

require('./hud/help-panel');

require('./hud/player-panel');

require('./hud/globalnotification');

require('./hud/playernotification');

require('./hud/progressbar');

require('./inventory/inventory');

require('./workstation/workstation');

require('./vehiclerent/vehiclerent');

require('./buslinien/buslinien');

require('./petbuy/petbuy');

require('./ejectwindow/ejectwindow');

require('./bank/bank');

require('./methlab/methlab');

require('./heroinlab/heroinlab');

require('./cannabislab/cannabislab');

require('./flyer/flyer');

require('./garage/garage');

require('./id-card/id-card');

require('./licenses/licenses');

require('./shop/shop');

require('./insurance/insurance');

require('./chat/chat');

require('./giveMoney/giveMoney');

require('./confirm/confirm');

require('./input/input');

require('./character-creator/character-creator');

require('./keys/keys');

require('./death/death');

require('./frisk/frisk');

require('./tattoo/tattoo');

require('./carshop/carshop');

require('./hud/gangwar');

require('./hud/fishing');

require('./hud/paintball');

require('./hud/infocard');

require('./hud/smartphone');

require('./barber/barber');

require('./casino/slotmachine');

require('./hud/nutrition');

require('./clothing-shop/clothing-shop');

require('./tattoo-license/tattoo-license');

require('./wardrobe/wardrobe');

require('./animation/animation-wheel-favorites-list-window');

require('./rims/rims');

require('./tuning/tuning');

require('./adminmenu/adminmenu');

require('./hud/bus');

require('./jobs/jobs');

require('./paymentMethods/paymentMethods-window');

},{"./adminmenu/adminmenu":97,"./animation/animation-wheel-favorites-list-window":98,"./bank/bank":100,"./bann/bann":102,"./barber/barber":103,"./buslinien/buslinien":104,"./cannabislab/cannabislab":106,"./carshop/carshop":108,"./casino/slotmachine":109,"./character-creator/character-creator":110,"./chat/chat":112,"./clothing-shop/clothing-shop":113,"./confirm/confirm":115,"./death/death":117,"./ejectwindow/ejectwindow":118,"./flyer/flyer":120,"./frisk/frisk":122,"./garage/garage":124,"./giveMoney/giveMoney":126,"./heroinlab/heroinlab":128,"./hud/bus":130,"./hud/fishing":131,"./hud/gangwar":132,"./hud/globalnotification":133,"./hud/help-panel":134,"./hud/hud":135,"./hud/infocard":136,"./hud/menu":137,"./hud/n-menu":138,"./hud/nutrition":139,"./hud/paintball":140,"./hud/player-panel":141,"./hud/playernotification":143,"./hud/progressbar":144,"./hud/smartphone":145,"./hud/vehicle-panel":146,"./hud/x-menu":147,"./id-card/id-card":148,"./input/input":150,"./insurance/insurance":151,"./inventory/inventory":154,"./jobs/jobs":155,"./keys/keys":156,"./kick/kick":158,"./licenses/licenses":159,"./login/login":161,"./methlab/methlab":163,"./paymentMethods/paymentMethods-window":164,"./petbuy/petbuy":165,"./register/register":167,"./rims/rims":168,"./shop/shop":169,"./tattoo-license/tattoo-license":170,"./tattoo/tattoo":172,"./tuning/tuning":173,"./vehiclerent/vehiclerent":174,"./wardrobe/wardrobe":175,"./workstation/workstation":176}],153:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class InventoryWindow extends _window2.default {
    constructor() {
        super("Inventory");
        /*this.forwardableEvents.add("setInventoryItems")*/
        this.setCurserVisible(true);

        this.forwardableEvents.add('responseInventoryClothes');
    }
}

exports.default = new InventoryWindow();

},{"../../windows/window":203}],154:[function(require,module,exports){
"use strict";

require("./inventory-window");

},{"./inventory-window":153}],155:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require('../../windows/window');

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Jobs extends _window2.default {
    constructor() {
        super('JobWindow');

        this.setCurserVisible(true);
        this.setChatVisible(false);
    }
}

exports.default = new Jobs();

},{"../../windows/window":203}],156:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Keys extends _window2.default {
    constructor() {
        super("Keys");
        this.setCurserVisible(true);
        this.setChatVisible(false);
    }
}

exports.default = new Keys();

},{"../../windows/window":203}],157:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class KickWindow extends _window2.default {
    constructor() {
        super("Kick");
    }
}

exports.default = new KickWindow();

},{"../../windows/window":203}],158:[function(require,module,exports){
"use strict";

require("./kick-window");

},{"./kick-window":157}],159:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = require("../../components/component");

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Licenses extends _component2.default {
    constructor() {
        super("Licenses");

        mp.events.add("showLicense", (name, firstaid, gunlicense, driverlicense, trucklicense, motorcyclelicense, boatlicense, flyinglicensea, flyinglicenseb, taxilicense, passengertransportlicense, lawyerlicense, registryofficelicense, gwd, zwd) => {
            this.callOnBrowser(`showLic('${name}', '${firstaid}', '${gunlicense}', '${driverlicense}', '${trucklicense}', '${motorcyclelicense}', '${boatlicense}', '${flyinglicensea}', '${flyinglicenseb}', '${taxilicense}', '${passengertransportlicense}', '${lawyerlicense}', '${registryofficelicense}', '${gwd}', '${zwd}')`);
        });
    }
}

exports.default = new Licenses();

},{"../../components/component":94}],160:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

var _player = require("../../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LoginWindow extends _window2.default {
    constructor() {
        super("Login");
        this.forwardableEvents.add("status");
        this.setCurserVisible(true);
        this.setHudVisible(false);
        this.setChatVisible(false);
    }

    onEvent(name, ...args) {
        switch (name) {
            case "rank":
                _player2.default.rank = args[0];
                return;
        }
    }

    onReady() {
        mp.game.graphics.transitionToBlurred(250);
        mp.game.ui.displayHud(false);
        mp.game.ui.displayRadar(false);
    }

    onClose() {
        mp.game.graphics.transitionFromBlurred(250);
        mp.game.ui.displayHud(true);
        mp.game.ui.displayRadar(true);
    }
}

exports.default = new LoginWindow();

},{"../../player/player":186,"../../windows/window":203}],161:[function(require,module,exports){
"use strict";

require("./login-window");

},{"./login-window":160}],162:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MethLaborWindow extends _window2.default {
    constructor() {
        super("MethLabor");
        this.setCurserVisible(true);
        this.setChatVisible(false);
    }
}

exports.default = new MethLaborWindow();

},{"../../windows/window":203}],163:[function(require,module,exports){
"use strict";

require("./methlab-window");

},{"./methlab-window":162}],164:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require('../../windows/window');

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PaymentMethodsWindow extends _window2.default {
    constructor() {
        super('PaymentMethods');

        this.setCurserVisible(true);
    }
}

exports.default = new PaymentMethodsWindow();

},{"../../windows/window":203}],165:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PetBuyWindow extends _window2.default {
    constructor() {
        super("PetBuy");
        this.setCurserVisible(true);
        this.setChatVisible(false);
    }

    onReady() {
        mp.game.graphics.transitionToBlurred(250);
    }

    onClose() {
        mp.game.graphics.transitionFromBlurred(250);
    }
}

exports.default = new PetBuyWindow();

},{"../../windows/window":203}],166:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RegisterWindow extends _window2.default {
    constructor() {
        super("Register");
    }
}

exports.default = new RegisterWindow();

},{"../../windows/window":203}],167:[function(require,module,exports){
"use strict";

require("./register-window");

},{"./register-window":166}],168:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require('../../windows/window');

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RimsWindow extends _window2.default {
    constructor() {
        super('Rims');

        this.setCurserVisible(true);
        this.setChatVisible(false);

        this.forwardableEvents.add('responseTuningRims');
        this.forwardableEvents.add('responseTuningCategoryRims');
    }
}

exports.default = new RimsWindow();

},{"../../windows/window":203}],169:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ShopWindow extends _window2.default {
    constructor() {
        super("Shop");
        this.setCurserVisible(true);
        this.setChatVisible(false);
    }

    onReady() {
        mp.game.graphics.transitionToBlurred(250);
    }

    onClose() {
        mp.game.graphics.transitionFromBlurred(250);
    }
}

exports.default = new ShopWindow();

},{"../../windows/window":203}],170:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require('../../windows/window');

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TattooLicenseShopWindow extends _window2.default {
    constructor() {
        super('TattooLicenseShop');

        this.setCurserVisible(true);
        this.setChatVisible(false);

        this.forwardableEvents.add('responseLicenseShopZoneLicenses');
    }
}

exports.default = new TattooLicenseShopWindow();

},{"../../windows/window":203}],171:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require('../../windows/window');

var _window2 = _interopRequireDefault(_window);

var _bodyCamera = require('../../utils/bodyCamera');

var _bodyCamera2 = _interopRequireDefault(_bodyCamera);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TattooWindow extends _window2.default {
    constructor() {
        super('TattooShop');

        this.setCurserVisible(true);
        this.setChatVisible(false);

        this.forwardableEvents.add('responseTattooShopCategory');
    }

    onEvent(name, ...args) {
        switch (name) {
            case 'resetTattoos':
                this.resetTattoos();

                break;
            case 'rotate':
                this.setHeading(args[0]);

                break;
            case 'zoneSelected':
                this.zoneSelected(args[0]);

                break;
        }
    }

    /**
     * Event if the window is loaded.
     */
    onReady() {
        let player = mp.players.local,
            offset = this.offsetPosition(player.position.x, player.position.y, player.getHeading(), 3);

        _bodyCamera2.default.createBodyCamera(new mp.Vector3(offset.x, offset.y, player.position.z));
        _bodyCamera2.default.pointBodyCameraAt(player.position);
    }

    /**
     * Event if the window has been closed.
     */
    onClose() {
        _bodyCamera2.default.resetBodyCamera();
    }

    /**
     * Move the camera to a specific region according to zoneId.
     *
     * @param zoneId
     */
    zoneSelected(zoneId) {
        let player = mp.players.local,
            targetPositionFly,
            targetPositionPoint,
            offset;

        switch (zoneId) {
            case 0:
                // TORSO
                offset = this.offsetPosition(player.position.x, player.position.y, player.getHeading(), 1);

                targetPositionFly = new mp.Vector3(offset.x, offset.y, player.position.z + 0.5);
                targetPositionPoint = new mp.Vector3(player.position.x, player.position.y, player.position.z + 0.2);

                break;
            case 1:
                // HEAD
                offset = this.offsetPosition(player.position.x, player.position.y, player.getHeading(), 1);

                targetPositionFly = new mp.Vector3(offset.x, offset.y, player.position.z + 0.5);
                targetPositionPoint = new mp.Vector3(player.position.x, player.position.y, player.position.z + 0.5);

                break;
            case 2:
                // LEFT ARM
                offset = this.offsetPosition(player.position.x, player.position.y, player.getHeading() + 90, 1);

                targetPositionFly = new mp.Vector3(offset.x, offset.y, player.position.z + 0.5);
                targetPositionPoint = player.position;

                break;
            case 3:
                // RIGHT ARM
                offset = this.offsetPosition(player.position.x, player.position.y, player.getHeading() - 90, 1);

                targetPositionFly = new mp.Vector3(offset.x, offset.y, player.position.z + 0.5);
                targetPositionPoint = player.position;

                break;
            case 4:
                // LEFT LEG
                offset = this.offsetPosition(player.position.x, player.position.y, player.getHeading() + 90, 1);

                targetPositionFly = new mp.Vector3(offset.x, offset.y, player.position.z - 0.6);
                targetPositionPoint = new mp.Vector3(player.position.x, player.position.y, player.position.z - 0.6);

                break;
            case 5:
                // RIGHT LEG
                offset = this.offsetPosition(player.position.x, player.position.y, player.getHeading() - 90, 1);

                targetPositionFly = new mp.Vector3(offset.x, offset.y, player.position.z - 0.6);
                targetPositionPoint = new mp.Vector3(player.position.x, player.position.y, player.position.z - 0.6);

                break;
            // case 6: Not used.
            // case 7: Not used.
            case 8:
                // BACK
                offset = this.offsetPosition(player.position.x, player.position.y, player.getHeading() + 180, 1);

                targetPositionFly = new mp.Vector3(offset.x, offset.y, player.position.z + 0.5);
                targetPositionPoint = new mp.Vector3(player.position.x, player.position.y, player.position.z + 0.2);

                break;
            case 9:
                // HAIR
                offset = this.offsetPosition(player.position.x, player.position.y, player.getHeading() + 90, 1);

                targetPositionFly = new mp.Vector3(offset.x, offset.y, player.position.z + 0.5);
                targetPositionPoint = new mp.Vector3(player.position.x, player.position.y, player.position.z + 0.5);

                break;
            default:
                offset = this.offsetPosition(player.position.x, player.position.y, player.getHeading(), 3);

                targetPositionFly = new mp.Vector3(offset.x, offset.y, player.position.z);
                targetPositionPoint = player.position;
                break;
        }

        _bodyCamera2.default.flyBodyCameraTo(targetPositionFly);
        _bodyCamera2.default.pointBodyCameraAt(targetPositionPoint);
    }

    /**
     * Reset player tattoos.
     */
    resetTattoos() {
        mp.players.local.clearDecorations();
    }

    /**
     * Set player heading.
     *
     * @param heading
     */
    setHeading(heading) {
        mp.players.local.setHeading(parseInt(heading));
    }

    /**
     * Get offset with rotation.
     *
     * @param x
     * @param y
     * @param rot
     * @param distance
     * @returns {{x: number, y: number}}
     */
    offsetPosition(x, y, rot, distance) {
        return {
            x: x + Math.sin(-rot * Math.PI / 180) * distance,
            y: y + Math.cos(-rot * Math.PI / 180) * distance
        };
    }
}

exports.default = new TattooWindow();

},{"../../utils/bodyCamera":194,"../../windows/window":203}],172:[function(require,module,exports){
"use strict";

require("./tattoo-window");

},{"./tattoo-window":171}],173:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require('../../windows/window');

var _window2 = _interopRequireDefault(_window);

var _peds = require('../../peds/peds');

var _peds2 = _interopRequireDefault(_peds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TuningWindow extends _window2.default {
    constructor() {
        super('Tuning');

        this.setCurserVisible(true);
        this.setChatVisible(false);
        this.forwardableEvents.add('responseTuningModlist');
    }

    onEvent(name, ...args) {
        if (name === 'cursor') {
            this.setCurserVisible(args[0][0]);
        }
        if (name === 'getMaxIndex') {

            _peds2.default.disableAllControls(false);
            _peds2.default.disabledAll = false;

            var pushi = JSON.parse(args[0][0]);
            var veh = mp.vehicles.atRemoteId(args[0][1]);
            pushi.forEach(x => {
                x.oldval = x.index;
                x.maxindex = veh != null ? veh.getNumMods(x.id) : 100;
            });
            this.callOnBrowser(`responseListMods('${JSON.stringify(pushi)}')`);
        }
    }
}

exports.default = new TuningWindow();

},{"../../peds/peds":180,"../../windows/window":203}],174:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class VehicleRentWindow extends _window2.default {
    constructor() {
        super("VehicleRent");
        this.setCurserVisible(true);
        this.setChatVisible(false);
    }

    onReady() {
        mp.game.graphics.transitionToBlurred(250);
    }

    onClose() {
        mp.game.graphics.transitionFromBlurred(250);
    }
}

exports.default = new VehicleRentWindow();

},{"../../windows/window":203}],175:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require('../../windows/window');

var _window2 = _interopRequireDefault(_window);

var _bodyCamera = require('../../utils/bodyCamera');

var _bodyCamera2 = _interopRequireDefault(_bodyCamera);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class WardrobeWindow extends _window2.default {
    constructor() {
        super('Wardrobe');

        this.setCurserVisible(true);
        this.setChatVisible(false);

        this.forwardableEvents.add('responseWardrobeCategories');
        this.forwardableEvents.add('responseWardrobeClothes');
    }

    onEvent(name, ...args) {
        switch (name) {
            case 'moveCam':
                this.moveCam(args[0].offset, args[0].slot, args[0].isX, args[0].isY);

                break;
            case 'zoomToSlot':
                this.zoomToSlot(args[0].slot, args[0].isY);

                break;
            case 'zoomOut':
                this.toInitialZoom();

                break;
        }
    }

    /**
     * Calculates important movement data for given params.
     *
     * @param slot Which slot should be in focus?
     * @param isY  If true, right side will be in focus
     *
     * @returns {{distance: number, heading: number, camPos: {z: *}, pointPos: {z: *}}}
     */
    getMovementData(slot, isY) {
        let player = mp.players.local,
            data = {
            heading: player.getHeading(),
            distance: 1,
            camPos: {
                z: player.position.z
            },
            pointPos: {
                z: player.position.z
            }
        };

        switch (slot) {
            case '1':
                // Mask
                data.camPos.z += 0.5;
                data.pointPos.z += 0.5;

                break;
            case '3':
                // Body
                data.distance = 3;

                break;
            case '4':
                // Legs
                data.camPos.z -= 0.6;
                data.pointPos.z -= 0.6;

                break;
            case '5':
                // Backpack
                data.heading += 180;
                data.camPos.z += 0.5;
                data.pointPos.z += 0.2;

                break;
            case '6':
                // Shoes
                data.camPos.z -= 0.6;
                data.pointPos.z -= 0.8;

                break;
            case '7': // Accessories
            case '8': // Undershirts
            case '11':
                // Tops
                data.camPos.z += 0.5;
                data.pointPos.z += 0.2;

                break;
            case 'p-0':
                // Hat
                data.heading += 180;
                data.distance = 2;

                data.camPos.z += 1;
                data.pointPos.z += 0.5;

                break;
            case 'p-1':
                // Glasses
                data.camPos.z += 0.5;
                data.pointPos.z += 0.5;

                break;
            case 'p-2':
                // Ears
                data.heading = isY ? data.heading + 90 : data.heading - 90;

                data.camPos.z += 0.5;
                data.pointPos.z += 0.5;

                break;
            case 'p-6': // Watch
            case 'p-7':
                // Wrist
                data.heading = isY ? data.heading + 90 : data.heading - 90;

                data.camPos.z += 0.3;
                data.pointPos.z -= 0.1;

                break;
        }

        return data;
    }

    /**
     * Moves the Camera to a given slot.
     *
     * @param slot Which slot should be in focus?
     * @param isY If true, right side will be used.
     */
    zoomToSlot(slot, isY) {
        let data = this.getMovementData(slot, isY);

        _bodyCamera2.default.flyBodyCameraWithFixedParams(data.heading, data.distance, data.camPos.z, data.pointPos.z);
    }

    /**
     * Moves the cam around the player by a given heading offset.
     * It respects focused slots.
     *
     * @param heading Heading offset
     * @param slot Slot in focus
     * @param isX Is slot in focus?
     * @param isY Is slots right side in focus?
     */
    moveCam(heading, slot, isX, isY) {
        if ((isX || isY) && slot !== null) {
            let data = this.getMovementData(slot, isY);

            _bodyCamera2.default.rotateBodyCameraWithFixedParams(heading, data.distance, data.camPos.z, data.pointPos.z);

            return;
        }

        _bodyCamera2.default.rotateBodyCameraWithParams(heading, 3, 0);
    }

    /**
     * Event if the window is loaded.
     */
    onReady() {
        this.toInitialZoom(true);
    }

    /**
     * Initial position if the player pressed E.
     *
     * @param create If true, a new cam will be created.
     */
    toInitialZoom(create = false) {
        let player = mp.players.local;

        if (create) {
            _bodyCamera2.default.createBodyCamera(player.position);
        }

        _bodyCamera2.default.flyBodyCameraWithParams(0, 3, 0);
    }

    /**
     * Event if the window has been closed.
     */
    onClose() {
        _bodyCamera2.default.resetBodyCamera();
    }
}

exports.default = new WardrobeWindow();

},{"../../utils/bodyCamera":194,"../../windows/window":203}],176:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _window = require("../../windows/window");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class WorkstationWindow extends _window2.default {
    constructor() {
        super("Workstation");
        this.setCurserVisible(true);
        this.setChatVisible(false);
    }

    onReady() {
        mp.game.graphics.transitionToBlurred(250);
    }

    onClose() {
        mp.game.graphics.transitionFromBlurred(250);
    }
}

exports.default = new WorkstationWindow();

},{"../../windows/window":203}],177:[function(require,module,exports){
"use strict";

var _apps = require("../app/apps");

var _apps2 = _interopRequireDefault(_apps);

var _player = require("../player/player");

var _player2 = _interopRequireDefault(_player);

var _windows = require("../windows/windows");

var _windows2 = _interopRequireDefault(_windows);

var _xMenu = require("../interfaces/hud/x-menu");

var _xMenu2 = _interopRequireDefault(_xMenu);

var _VehicleEnter = require("../vehicle/VehicleEnter");

var _VehicleEnter2 = _interopRequireDefault(_VehicleEnter);

var _playerPanel = require("../interfaces/hud/player-panel");

var _playerPanel2 = _interopRequireDefault(_playerPanel);

var _nMenu = require("../interfaces/hud/n-menu");

var _nMenu2 = _interopRequireDefault(_nMenu);

var _antiafk = require("../interfaces/hud/antiafk");

var _antiafk2 = _interopRequireDefault(_antiafk);

var _menu = require("../interfaces/hud/menu");

var _menu2 = _interopRequireDefault(_menu);

var _vehiclePanel = require("../interfaces/hud/vehicle-panel");

var _vehiclePanel2 = _interopRequireDefault(_vehiclePanel);

var _raycast = require("../raycast/raycast");

var _raycast2 = _interopRequireDefault(_raycast);

var _rappel = require("../vehicle/rappel");

var _rappel2 = _interopRequireDefault(_rappel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

mp.events.add("VisibleWindowBug", () => {
    _windows2.default.visibleWindow = null;
    if (_player2.default.chatFlag) _player2.default.setPlayerChatFlag(false);
}); //Keycodes: https://msdn.microsoft.com/en-us/library/windows/desktop/dd375731

let airArrowDown = false;

// Push to talk
let arrowDown = false;

let switchSeatTimer = 0;

// Key Events
mp.keys.bind(0x45, false, () => {
    if (_windows2.default.visibleWindow != null || _apps2.default.componentVisibleApp["Smartphone"] || _apps2.default.componentVisibleApp["Computer"] || _apps2.default.componentVisibleApp["Ipad"] || _player2.default.chatFlag || _player2.default.injured) return;
    //if (new Date(player.lastInteractE.getTime() + 2500) > new Date()) return

    const vehicleEnter = new _VehicleEnter2.default();

    let garbagevehicle = vehicleEnter.getClosestGarbageVehicleInRange(10);

    if (garbagevehicle !== null) {
        if (vehicleEnter.calcDist(mp.players.local.position, garbagevehicle.getWorldPositionOfBone(garbagevehicle.getBoneIndexByName('seat_dside_r1'))) < 2 || vehicleEnter.calcDist(mp.players.local.position, garbagevehicle.getWorldPositionOfBone(garbagevehicle.getBoneIndexByName('seat_pside_r1'))) < 2) {
            mp.events.callRemote("Pressed_E_Garbage_Vehicle", garbagevehicle, _player2.default.remoteHashKey);
        }
    }
    let forPressVehicle = vehicleEnter.getClosestSingleVehicleInRange(10);

    if (forPressVehicle !== null) {
        if (vehicleEnter.calcDist(mp.players.local.position, forPressVehicle.getWorldPositionOfBone(forPressVehicle.getBoneIndexByName('door_dside_r'))) < 2 || vehicleEnter.calcDist(mp.players.local.position, forPressVehicle.getWorldPositionOfBone(forPressVehicle.getBoneIndexByName('door_pside_r'))) < 2) {
            mp.events.callRemote("Pressed_E_Vehicle_Trunk", forPressVehicle, _player2.default.remoteHashKey);
        } else if (vehicleEnter.calcDist(mp.players.local.position, forPressVehicle.getWorldPositionOfBone(forPressVehicle.getBoneIndexByName('exhaust'))) < 2 || vehicleEnter.calcDist(mp.players.local.position, forPressVehicle.getWorldPositionOfBone(forPressVehicle.getBoneIndexByName('exhaust_2'))) < 2) {
            mp.events.callRemote("Pressed_E_Vehicle_Trunk", forPressVehicle, _player2.default.remoteHashKey);
        }
    }

    mp.events.callRemoteUnreliable("Pressed_E", _player2.default.remoteHashKey);
    mp.gui.chat.push("Pressed_E");
    //player.lastInteractE = new Date()
    checkInterval();
});

// Pressed L
mp.keys.bind(0x4c, false, () => {
    if (_windows2.default.visibleWindow != null || _player2.default.chatFlag || _apps2.default.componentVisibleApp["Smartphone"] || _apps2.default.componentVisibleApp["Computer"] || _apps2.default.componentVisibleApp["Ipad"] || _player2.default.injured || _player2.default.tied || _player2.default.cuffed) return;
    mp.events.callRemoteUnreliable("Pressed_L", _player2.default.remoteHashKey);
    mp.gui.chat.push("Pressed_L");
    checkInterval();
});

// F2 handy
mp.keys.bind(0x71, false, () => {
    if (_player2.default.chatFlag || _windows2.default.visibleWindow != null || _apps2.default.componentVisibleApp["Ipad"] || _player2.default.injured || _player2.default.tied || _player2.default.cuffed || _player2.default.isInAir() || !_player2.default.allowHandy || _player2.default.isCarrying || _player2.default.HasRagdall) return;

    //Bug beim Einsteigen und Handy zücken
    const vehHandle = mp.players.local.getVehicleIsTryingToEnter();
    if (vehHandle) {
        return;
    }

    if (_apps2.default.componentVisibleApp["Smartphone"] != null) {
        mp.events.callRemoteUnreliable("Keks", false, _player2.default.remoteHashKey);
    } else {
        mp.events.callRemoteUnreliable("Keks", true, _player2.default.remoteHashKey);
    }
    if (arrowDown) {
        arrowDown = false;
        _playerPanel2.default.setVoiceRadioActiveType(1);
        mp.events.callRemote("changeSettings", 1, _player2.default.remoteHashKey);
        clearAFK();
    }
    if (airArrowDown) {
        airArrowDown = false;
        mp.events.callRemote("changeAirFunk", 1, _player2.default.remoteHashKey);
        clearAFK();
    }
    checkInterval();
});

// F3 Computer
mp.keys.bind(0x72, false, () => {
    if (_player2.default.chatFlag || _windows2.default.visibleWindow != null || _apps2.default.componentVisibleApp["Ipad"] || _player2.default.injured || _player2.default.tied || _player2.default.cuffed || _player2.default.isInAir() || _player2.default.isCarrying || _player2.default.HasRagdall) return;

    //Bug beim Einsteigen und Laptop zücken
    const vehHandle = mp.players.local.getVehicleIsTryingToEnter();
    if (vehHandle) {
        return;
    }

    if (_apps2.default.componentVisibleApp["Computer"] === "ComputerMainScreen") {
        mp.events.callRemoteUnreliable("closeComputer", 1, _player2.default.remoteHashKey);
    } else {
        mp.events.callRemoteUnreliable("computerCheck", 1, _player2.default.remoteHashKey);
    }
    if (arrowDown) {
        arrowDown = false;
        _playerPanel2.default.setVoiceRadioActiveType(1);
        mp.events.callRemote("changeSettings", 1, _player2.default.remoteHashKey);
        clearAFK();
    }
    if (airArrowDown) {
        airArrowDown = false;
        mp.events.callRemote("changeAirFunk", 1, _player2.default.remoteHashKey);
        clearAFK();
    }
    checkInterval();
});

// F5 Animations Menü
mp.keys.bind(0x74, false, () => {
    if (_player2.default.chatFlag || _windows2.default.visibleWindow != null || _player2.default.injured || _player2.default.tied || _player2.default.cuffed || _player2.default.isCarrying || _player2.default.HasRagdall) return;

    mp.events.callRemoteUnreliable("openAnimationMenu", _player2.default.remoteHashKey);
    checkInterval();

    if (arrowDown) {
        arrowDown = false;
        _playerPanel2.default.setVoiceRadioActiveType(1);
        mp.events.callRemote("changeSettings", 1, _player2.default.remoteHashKey);
        clearAFK();
    }
    if (airArrowDown) {
        airArrowDown = false;
        mp.events.callRemote("changeAirFunk", 1, _player2.default.remoteHashKey);
        clearAFK();
    }
});
// F6
mp.keys.bind(0x75, false, () => {
    mp.events.callRemote("showNutrition", _player2.default.remoteHashKey);
    _playerPanel2.default.displayChange();
});

// F9 Ipad
mp.keys.bind(0x78, false, () => {
    if (_player2.default.chatFlag || _windows2.default.visibleWindow != null || !_player2.default.allowHandy) return;

    if (_apps2.default.componentVisibleApp["Ipad"] === "IpadMainScreen") {
        mp.events.callRemote("closeComputer", 2, _player2.default.remoteHashKey);
    } else {
        mp.events.callRemote("computerCheck", 2, _player2.default.remoteHashKey);
    }
    if (arrowDown) {
        arrowDown = false;
        _playerPanel2.default.setVoiceRadioActiveType(1);
        mp.events.callRemote("changeSettings", 1, _player2.default.remoteHashKey);
        clearAFK();
    }
    if (airArrowDown) {
        airArrowDown = false;
        mp.events.callRemote("changeAirFunk", 1, _player2.default.remoteHashKey);
        clearAFK();
    }
    checkInterval();
});

// F12 0x7B
mp.keys.bind(0x7B, false, () => {
    if (_player2.default.chatFlag) return;

    if (_windows2.default.visibleWindow == "AdminMenu") {
        mp.events.callRemoteUnreliable("closeAdminMenu", _player2.default.remoteHashKey);
    } else {
        mp.events.callRemoteUnreliable("openAdminMenu", _player2.default.remoteHashKey);
    }

    checkInterval();
});

// F7 Screenshot
mp.keys.bind(0x76, false, () => {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth();
    var year = today.getFullYear();
    var seconds = today.getSeconds();
    var minutes = today.getMinutes();
    var hours = today.getHours();
    var currentDay = 'gvmp-' + day + '-' + month + '-' + year + '-' + hours + '-' + minutes + '-' + seconds;
    mp.gui.takeScreenshot(currentDay + '.png', 1, 100, 0);
    mp.game.graphics.notify("Screenshot erstellt.");
    checkInterval();
});

// I Inventory show
mp.keys.bind(0x49, false, () => {
    if (_windows2.default.visibleWindow != null || _apps2.default.componentVisibleApp["Smartphone"] || _player2.default.chatFlag || _player2.default.injured || _player2.default.tied || _player2.default.cuffed || _apps2.default.componentVisibleApp["Computer"] || _apps2.default.componentVisibleApp["Ipad"]) return;
    mp.events.callRemoteUnreliable("requestInventory", _player2.default.remoteHashKey);
    checkInterval();

    if (arrowDown) {
        arrowDown = false;
        _playerPanel2.default.setVoiceRadioActiveType(1);
        mp.events.callRemote("changeSettings", 1, _player2.default.remoteHashKey);
        clearAFK();
    }
    if (airArrowDown) {
        airArrowDown = false;
        mp.events.callRemote("changeAirFunk", 1, _player2.default.remoteHashKey);
        clearAFK();
    }
});

// Y Key
mp.keys.bind(0x59, false, () => {
    if (_windows2.default.visibleWindow != null || _apps2.default.componentVisibleApp["Smartphone"] || _player2.default.chatFlag || _player2.default.injured || _apps2.default.componentVisibleApp["Computer"] || _apps2.default.componentVisibleApp["Ipad"]) return;
    mp.events.callRemote("changeVoiceRange", _player2.default.remoteHashKey);
    checkInterval();
});

// T Key
mp.keys.bind(0x54, false, () => {
    if (_windows2.default.visibleWindow != null || _apps2.default.componentVisibleApp["Smartphone"] || _player2.default.chatFlag || _apps2.default.componentVisibleApp["Computer"] || _apps2.default.componentVisibleApp["Ipad"]) return;
    _windows2.default.show('Chat');
    mp.gui.cursor.visible = true;
    checkInterval();

    if (arrowDown) {
        arrowDown = false;
        _playerPanel2.default.setVoiceRadioActiveType(1);
        mp.events.callRemote("changeSettings", 1, _player2.default.remoteHashKey);
        clearAFK();
    }
    if (airArrowDown) {
        airArrowDown = false;
        mp.events.callRemote("changeAirFunk", 1, _player2.default.remoteHashKey);
        clearAFK();
    }
});

// X-Menu
let xDown = false;

mp.keys.bind(0x58, true, () => {
    if (_player2.default.chatFlag || _apps2.default.componentVisibleApp["Smartphone"] || _player2.default.injured || _apps2.default.componentVisibleApp["Ipad"] || _apps2.default.componentVisibleApp["Computer"] || _windows2.default.visibleWindow != null) return;
    if (!xDown) {
        xDown = true;
        let xMenuItems = _xMenu2.default.getItems();
        _xMenu2.default.setItems(xMenuItems);
    }
    checkInterval();

    if (arrowDown) {
        arrowDown = false;
        _playerPanel2.default.setVoiceRadioActiveType(1);
        mp.events.callRemote("changeSettings", 1, _player2.default.remoteHashKey);
        clearAFK();
    }
    if (airArrowDown) {
        airArrowDown = false;
        mp.events.callRemote("changeAirFunk", 1, _player2.default.remoteHashKey);
        clearAFK();
    }
});

mp.keys.bind(0x58, false, () => {
    if (_player2.default.chatFlag || _apps2.default.componentVisibleApp["Smartphone"] || _player2.default.injured || _apps2.default.componentVisibleApp["Ipad"] || _apps2.default.componentVisibleApp["Computer"] || _windows2.default.visibleWindow != null) return;
    _xMenu2.default.setItems([]);
    xDown = false;
    clearAFK();
});

// Pfeil Rechts/Links
mp.keys.bind(0x27, false, () => {
    if (_windows2.default.visibleWindow != null || _apps2.default.componentVisibleApp["Smartphone"] || _player2.default.chatFlag || _apps2.default.componentVisibleApp["Computer"] || _apps2.default.componentVisibleApp["Ipad"]) return;
    mp.events.callRemote("nextInteractionAnim", 1, _player2.default.remoteHashKey);
});
mp.keys.bind(0x25, false, () => {
    if (_windows2.default.visibleWindow != null || _apps2.default.componentVisibleApp["Smartphone"] || _player2.default.chatFlag || _apps2.default.componentVisibleApp["Computer"] || _apps2.default.componentVisibleApp["Ipad"]) return;
    mp.events.callRemote("prevInteractionAnim", 1, _player2.default.remoteHashKey);
});

// Push to Talk
mp.keys.bind(0x28, true, () => {
    if (_windows2.default.visibleWindow != null || _menu2.default.visible == true || _apps2.default.componentVisibleApp["Smartphone"] || _player2.default.injured || _apps2.default.componentVisibleApp["Ipad"] || _apps2.default.componentVisibleApp["Computer"] || _player2.default.state !== 1) return;
    if (!arrowDown) {
        arrowDown = true;
        setTimeout(function () {
            _playerPanel2.default.playPPTSound();
        }, 1000);
        _playerPanel2.default.setVoiceRadioActive(true);
        _playerPanel2.default.setVoiceRadioActiveType(2);
        mp.events.callRemote("changeSettings", 2, _player2.default.remoteHashKey);
    }
    checkInterval();
});

mp.keys.bind(0x28, false, () => {
    if (_windows2.default.visibleWindow != null || _menu2.default.visible == true || _apps2.default.componentVisibleApp["Smartphone"] || _player2.default.injured || _apps2.default.componentVisibleApp["Ipad"] || _apps2.default.componentVisibleApp["Computer"] || !arrowDown) return;
    arrowDown = false;
    _playerPanel2.default.setVoiceRadioActiveType(1);
    mp.events.callRemote("changeSettings", 1, _player2.default.remoteHashKey);
    clearAFK();
});

// Push to Talk AIR
mp.keys.bind(0x26, true, () => {
    if (_windows2.default.visibleWindow != null || _menu2.default.visible == true || _apps2.default.componentVisibleApp["Smartphone"] || _player2.default.injured || _apps2.default.componentVisibleApp["Ipad"] || _apps2.default.componentVisibleApp["Computer"]) return;
    if (!airArrowDown) {
        airArrowDown = true;
        mp.events.callRemote("changeAirFunk", 2, _player2.default.remoteHashKey);
    }
    checkInterval();
});

mp.keys.bind(0x26, false, () => {
    if (_windows2.default.visibleWindow != null || _menu2.default.visible == true || _apps2.default.componentVisibleApp["Smartphone"] || _player2.default.injured || _apps2.default.componentVisibleApp["Ipad"] || _apps2.default.componentVisibleApp["Computer"] || !airArrowDown) return;
    airArrowDown = false;
    mp.events.callRemote("changeAirFunk", 1, _player2.default.remoteHashKey);
    clearAFK();
});

// Object editor

// 6 (RIGHT)
mp.keys.bind(0x66, true, () => {
    if (_player2.default.buildingmode === true) {

        _player2.default.buildingobject.obj.destroy();

        _player2.default.buildingobject.pos.x += _player2.default.buildingspeed;
        _player2.default.buildingobject.obj = mp.objects.new(_player2.default.buildingobject.hash, _player2.default.buildingobject.pos, {
            rotation: _player2.default.buildingobject.rot,
            alpha: 255,
            dimension: mp.players.local.dimension
        });
    }
});

// 4 (LINKS)
mp.keys.bind(0x64, true, () => {
    if (_player2.default.buildingmode === true) {

        _player2.default.buildingobject.obj.destroy();

        _player2.default.buildingobject.pos.x -= _player2.default.buildingspeed;

        _player2.default.buildingobject.obj = mp.objects.new(_player2.default.buildingobject.hash, _player2.default.buildingobject.pos, {
            rotation: _player2.default.buildingobject.rot,
            alpha: 255,
            dimension: mp.players.local.dimension
        });
    }
});

// 8 (VOR)
mp.keys.bind(0x68, true, () => {
    if (_player2.default.buildingmode === true) {

        _player2.default.buildingobject.obj.destroy();

        _player2.default.buildingobject.pos.y += _player2.default.buildingspeed;

        _player2.default.buildingobject.obj = mp.objects.new(_player2.default.buildingobject.hash, _player2.default.buildingobject.pos, {
            rotation: _player2.default.buildingobject.rot,
            alpha: 255,
            dimension: mp.players.local.dimension
        });
    }
});

// 2 (ZURÜCK)
mp.keys.bind(0x62, true, () => {
    if (_player2.default.buildingmode === true) {

        _player2.default.buildingobject.obj.destroy();

        _player2.default.buildingobject.pos.y -= _player2.default.buildingspeed;

        _player2.default.buildingobject.obj = mp.objects.new(_player2.default.buildingobject.hash, _player2.default.buildingobject.pos, {
            rotation: _player2.default.buildingobject.rot,
            alpha: 255,
            dimension: mp.players.local.dimension
        });
    }
});

// 7 (DREHEN+)
mp.keys.bind(0x67, true, () => {
    if (_player2.default.buildingmode === true) {

        _player2.default.buildingobject.obj.destroy();

        _player2.default.buildingobject.rot.z += _player2.default.buildingspeed * 5;

        _player2.default.buildingobject.obj = mp.objects.new(_player2.default.buildingobject.hash, _player2.default.buildingobject.pos, {
            rotation: _player2.default.buildingobject.rot,
            alpha: 255,
            dimension: mp.players.local.dimension
        });
    }
});

// 9 (DREHEN-)
mp.keys.bind(0x69, true, () => {
    if (_player2.default.buildingmode === true) {

        _player2.default.buildingobject.obj.destroy();

        _player2.default.buildingobject.rot.z -= _player2.default.buildingspeed * 5;

        _player2.default.buildingobject.obj = mp.objects.new(_player2.default.buildingobject.hash, _player2.default.buildingobject.pos, {
            rotation: _player2.default.buildingobject.rot,
            alpha: 255,
            dimension: mp.players.local.dimension
        });
    }
});

// 1 (hoch)
mp.keys.bind(0x61, true, () => {
    if (_player2.default.buildingmode === true) {

        _player2.default.buildingobject.obj.destroy();

        _player2.default.buildingobject.pos.z += _player2.default.buildingspeed;

        _player2.default.buildingobject.obj = mp.objects.new(_player2.default.buildingobject.hash, _player2.default.buildingobject.pos, {
            rotation: _player2.default.buildingobject.rot,
            alpha: 255,
            dimension: mp.players.local.dimension
        });
    }
});

// 3 (runter)
mp.keys.bind(0x63, true, () => {
    if (_player2.default.buildingmode === true) {

        _player2.default.buildingobject.obj.destroy();

        _player2.default.buildingobject.pos.z -= _player2.default.buildingspeed;

        _player2.default.buildingobject.obj = mp.objects.new(_player2.default.buildingobject.hash, _player2.default.buildingobject.pos, {
            rotation: _player2.default.buildingobject.rot,
            alpha: 255,
            dimension: mp.players.local.dimension
        });
    }
});

// 0 Bestätigen
mp.keys.bind(0x60, true, () => {
    if (_player2.default.buildingmode === true) {

        _player2.default.buildingobject.obj.destroy();

        mp.events.callRemote("objed_saveobject", _player2.default.buildingobject.hash, _player2.default.buildingobject.pos.x, _player2.default.buildingobject.pos.y, _player2.default.buildingobject.pos.z, _player2.default.buildingobject.rot.x, _player2.default.buildingobject.rot.y, _player2.default.buildingobject.rot.z, _player2.default.remoteHashKey);
    }
});

// 0 close
mp.keys.bind(0x2E, true, () => {
    if (_player2.default.buildingmode === true) {

        _player2.default.buildingobject.obj.destroy();

        mp.events.callRemote("objed_close", _player2.default.remoteHashKey);
    }
});

// - speed 
mp.keys.bind(0x6D, true, () => {
    if (_player2.default.buildingmode === true) {
        _player2.default.buildingspeed -= 0.1;
        mp.game.graphics.notify("Building Speed verringert. (Aktuell " + _player2.default.buildingspeed + ")");
    }
});

// + speed 
mp.keys.bind(0x6B, true, () => {
    if (_player2.default.buildingmode === true) {
        _player2.default.buildingspeed += 0.1;
        mp.game.graphics.notify("Building Speed erhöht. (Aktuell " + _player2.default.buildingspeed + ")");
    }
});

// Pressed K
mp.keys.bind(0x4b, false, () => {
    if (_windows2.default.visibleWindow != null || _player2.default.chatFlag || _apps2.default.componentVisibleApp["Smartphone"] || _apps2.default.componentVisibleApp["Computer"] || _apps2.default.componentVisibleApp["Ipad"] || _player2.default.injured || _player2.default.tied || _player2.default.cuffed) return;
    mp.events.callRemote("Pressed_K", _player2.default.remoteHashKey);
    mp.gui.chat.push("Pressed_K");
    checkInterval();
});

// U
mp.keys.bind(0x55, false, () => {
    if (mp.players.local.vehicle == null || _windows2.default.visibleWindow != null || _player2.default.chatFlag || _apps2.default.componentVisibleApp["Smartphone"] || _apps2.default.componentVisibleApp["Computer"] || _apps2.default.componentVisibleApp["Ipad"] || _player2.default.injured || _player2.default.tied || _player2.default.cuffed) return;
    _vehiclePanel2.default.tempomat();
});

//G key
mp.keys.bind(0x47, true, () => {
    if (_windows2.default.visibleWindow != null || _apps2.default.componentVisibleApp["Smartphone"] || _apps2.default.componentVisibleApp["Computer"] || _player2.default.injured || _player2.default.cuffed || _player2.default.chatFlag || _windows2.default.visibleWindow != null) return;

    const vehicleEnter = new _VehicleEnter2.default();

    if (mp.players.local.isInAnyVehicle(false) && mp.players.local.vehicle) {
        //For further USE SWITCH SEATS need to push Seat to server
        /*
        if (switchSeatTimer == 0 || (Date.now() - switchSeatTimer) >= 3000)
        for (let seat = -1; seat < 10; seat++) {
            if (mp.players.local.vehicle.getPedInSeat(seat) === mp.players.local.handle) {
                if (seat % 2 == 0) {
                    if (mp.players.local.vehicle.isSeatFree(seat - 1)) {
                        mp.players.local.taskShuffleToNextVehicleSeat(mp.players.local.vehicle.handle);
                        switchSeatTimer = Date.now();
                    }
                } else {
                    mp.players.local.taskShuffleToNextVehicleSeat(mp.players.local.vehicle.handle);
                    switchSeatTimer = Date.now();
                }
                break;
            }
        }
        */

    } else {

        const vehicleList = vehicleEnter.getClosestVehiclesInRange(10);

        if (vehicleList.length <= 0) {
            return;
        }

        let lowestDistanceToSeat = 100;
        let closest = null;
        let closestSeat = -1;

        for (var i = 0; i < vehicleList.length; i++) {
            const seatData = vehicleEnter.getClosestVehicleSeat(vehicleList[i]);

            if (seatData["distance"] == null) {
                continue;
            }
            if (seatData["seat"] == null || seatData["seat"] === -1) {
                continue;
            }

            if (seatData["distance"] < lowestDistanceToSeat) {
                closest = vehicleList[i];
                closestSeat = seatData["seat"];
                lowestDistanceToSeat = seatData['distance'];
            }
        }

        if (closest == null || closestSeat == -1 || lowestDistanceToSeat > 4) return;

        vehicleEnter.enter(closest, closestSeat);
    }
    checkInterval();
});

//F
mp.keys.bind(0x46, true, () => {
    checkInterval();
});

// H handsup
mp.keys.bind(0x48, false, () => {
    if (_apps2.default.componentVisibleApp["Smartphone"] || _player2.default.injured || _player2.default.cuffed || _player2.default.chatFlag || _apps2.default.componentVisibleApp["Ipad"] || _apps2.default.componentVisibleApp["Computer"] || _windows2.default.visibleWindow != null || _player2.default.isInAir() || _player2.default.isCarrying || _player2.default.HasRagdall) return;
    mp.events.callRemoteUnreliable("Pressed_H", _player2.default.remoteHashKey);
    checkInterval();
});

// J salute
mp.keys.bind(0x4A, false, () => {
    if (_apps2.default.componentVisibleApp["Smartphone"] || _player2.default.injured || _player2.default.cuffed || _player2.default.chatFlag || _apps2.default.componentVisibleApp["Ipad"] || _apps2.default.componentVisibleApp["Computer"] || _windows2.default.visibleWindow != null || _player2.default.isInAir() || _player2.default.isCarrying || _player2.default.HasRagdall) return;
    if (mp.players.local.vehicle != null && mp.players.local.isInAnyVehicle(false) && mp.players.local.vehicle.isSirenOn()) {
        mp.events.callRemoteUnreliable("Silent_Sirene", mp.players.local.vehicle, _player2.default.remoteHashKey);
    } else {
        mp.events.callRemoteUnreliable("Pressed_J", _player2.default.remoteHashKey);
    }

    checkInterval();
});

//B key
let fingerDown = false;

mp.keys.bind(0x42, true, () => {
    if (_windows2.default.visibleWindow != null || _player2.default.chatFlag || _apps2.default.componentVisibleApp["Smartphone"] || _player2.default.injured || _apps2.default.componentVisibleApp["Ipad"] || _apps2.default.componentVisibleApp["Computer"] || _windows2.default.visibleWindow != null || _player2.default.injured || _player2.default.tied || _player2.default.cuffed || _player2.default.isInAir() || _player2.default.isCarrying) return;

    if (!_player2.default.isInAnyVehicle() && mp.players.local.weapon !== mp.game.joaat('weapon_unarmed')) {
        let obj = _raycast2.default.createRaycast();
        if (obj != null) {
            if (obj != null && obj.entity.isAPed()) {
                mp.events.callRemoteUnreliable("Pessed_B_Aiming", obj.entity, _player2.default.remoteHashKey);
            }
        }
    } else if (!fingerDown) {
        fingerDown = true;
        fingerPointing.start();
    }
    checkInterval();
});

mp.keys.bind(0x42, false, () => {
    if (_windows2.default.visibleWindow != null || _player2.default.chatFlag || _apps2.default.componentVisibleApp["Smartphone"] || _player2.default.injured || _apps2.default.componentVisibleApp["Ipad"] || _apps2.default.componentVisibleApp["Computer"] || _windows2.default.visibleWindow != null || _player2.default.injured || _player2.default.tied || _player2.default.cuffed || _player2.default.isInAir() || _player2.default.isCarrying) return;
    fingerDown = false;
    fingerPointing.stop();
    clearAFK();
});

// F6 - Voice Settings
mp.keys.bind(0x75, false, () => {
    if (_player2.default.chatFlag || _windows2.default.visibleWindow != null) return;
    _player2.default.openVoiceSettings = true;
    mp.events.callRemote("openVoiceSettings", _player2.default.remoteHashKey);
});

mp.keys.bind(0x2D, false, () => {
    if (!checkShortCut(2000)) return;
    mp.events.callRemoteUnreliable("aains", _player2.default.remoteHashKey);
    _player2.default.shortCutBeingUsed = Date.now();
});

// Num 0
mp.keys.bind(0x60, false, () => {
    if (_player2.default.chatFlag || _windows2.default.visibleWindow != null || _player2.default.injured || _player2.default.tied || _player2.default.cuffed) return;
    mp.events.callRemoteUnreliable("Pressed_Num_0", _player2.default.remoteHashKey);
    checkInterval();
});

// Num 1
mp.keys.bind(0x61, false, () => {
    if (_player2.default.chatFlag || _windows2.default.visibleWindow != null || _player2.default.injured || _player2.default.tied || _player2.default.cuffed) return;
    mp.events.callRemoteUnreliable("Pressed_Num_1", _player2.default.remoteHashKey);
    checkInterval();
});

// Num 2
mp.keys.bind(0x62, false, () => {
    if (_player2.default.chatFlag || _windows2.default.visibleWindow != null || _player2.default.injured || _player2.default.tied || _player2.default.cuffed) return;
    mp.events.callRemoteUnreliable("Pressed_Num_2", _player2.default.remoteHashKey);
    checkInterval();
});

// Num 3
mp.keys.bind(0x63, false, () => {
    if (_player2.default.chatFlag || _windows2.default.visibleWindow != null || _player2.default.injured || _player2.default.tied || _player2.default.cuffed) return;
    mp.events.callRemoteUnreliable("Pressed_Num_3", _player2.default.remoteHashKey);
    checkInterval();
});

// Num 4
mp.keys.bind(0x64, false, () => {
    if (_player2.default.chatFlag || _windows2.default.visibleWindow != null || _player2.default.injured || _player2.default.tied || _player2.default.cuffed) return;
    mp.events.callRemoteUnreliable("Pressed_Num_4", _player2.default.remoteHashKey);
    checkInterval();
});

// Num 6
mp.keys.bind(0x66, false, () => {
    if (_player2.default.chatFlag || _windows2.default.visibleWindow != null || _player2.default.injured || _player2.default.tied || _player2.default.cuffed) return;
    mp.events.callRemoteUnreliable("Pressed_Num_6", _player2.default.remoteHashKey);
    checkInterval();
});

// Num 7
mp.keys.bind(0x67, false, () => {
    if (_player2.default.chatFlag || _windows2.default.visibleWindow != null || _player2.default.injured || _player2.default.tied || _player2.default.cuffed) return;
    mp.events.callRemoteUnreliable("Pressed_Num_7", _player2.default.remoteHashKey);
    checkInterval();
});

// Num 8
mp.keys.bind(0x68, false, () => {
    if (_player2.default.chatFlag || _windows2.default.visibleWindow != null || _player2.default.injured || _player2.default.tied || _player2.default.cuffed) return;
    mp.events.callRemoteUnreliable("Pressed_Num_8", _player2.default.remoteHashKey);
    checkInterval();
});

// Num 9
mp.keys.bind(0x69, false, () => {
    if (_player2.default.chatFlag || _windows2.default.visibleWindow != null || _player2.default.injured || _player2.default.tied || _player2.default.cuffed) return;
    mp.events.callRemoteUnreliable("Pressed_Num_9", _player2.default.remoteHashKey);
    checkInterval();
});

//M key
mp.keys.bind(0x4D, false, () => {
    if (_windows2.default.visibleWindow != null || _apps2.default.componentVisibleApp["Smartphone"] || _apps2.default.componentVisibleApp["Computer"] || _apps2.default.componentVisibleApp["Ipad"] || _player2.default.chatFlag || _player2.default.injured || _player2.default.tied || _player2.default.cuffed) return;
    mp.events.callRemoteUnreliable("Pressed_M", _player2.default.remoteHashKey);
    mp.gui.chat.push("Pressed_M");
    checkInterval();
});

let nDown = false;

// N Menu
mp.keys.bind(0x4E, true, () => {
    if (_windows2.default.visibleWindow != null || _player2.default.chatFlag || _apps2.default.componentVisibleApp["Smartphone"] || _player2.default.injured || _apps2.default.componentVisibleApp["Ipad"] || _apps2.default.componentVisibleApp["Computer"] || _windows2.default.visibleWindow != null || _player2.default.injured || _player2.default.tied || _player2.default.cuffed || _player2.default.isInAir() || _player2.default.isCarrying || _player2.default.HasRagdall) return;
    if (!nDown) {
        nDown = true;
        const nMenuItems = _nMenu2.default.getItems();
        _nMenu2.default.setItems(nMenuItems);
        checkInterval();
    }
});

mp.keys.bind(0x4E, false, () => {
    if (_windows2.default.visibleWindow != null || _player2.default.chatFlag || _apps2.default.componentVisibleApp["Smartphone"] || _player2.default.injured || _apps2.default.componentVisibleApp["Ipad"] || _apps2.default.componentVisibleApp["Computer"] || _player2.default.injured || _player2.default.tied || _player2.default.cuffed || _player2.default.isInAir()) return;
    _nMenu2.default.setItems([]);
    nDown = false;
    clearAFK();
});

// F8
let cursorVisible = false;

mp.keys.bind(0x77, false, () => {
    cursorVisible = !cursorVisible;
    mp.gui.cursor.visible = cursorVisible;
    clearAFK();
});

// W
mp.keys.bind(0x57, true, () => {
    checkInterval();
});

mp.keys.bind(0x57, false, () => {
    clearAFK();
});

// A
mp.keys.bind(0x41, true, () => {
    checkInterval();
});

mp.keys.bind(0x41, false, () => {
    clearAFK();
});

// S
mp.keys.bind(0x53, true, () => {
    checkInterval();
});

mp.keys.bind(0x53, false, () => {
    clearAFK();
});

// D
mp.keys.bind(0x44, true, () => {
    checkInterval();
});

mp.keys.bind(0x44, false, () => {
    clearAFK();
});

// LeftMouse
mp.keys.bind(0x01, true, () => {
    checkInterval();
});

mp.keys.bind(0x01, false, () => {
    clearAFK();
});

// SpaceBar
mp.keys.bind(0x20, true, () => {
    checkInterval();
});

mp.keys.bind(0x20, false, () => {
    clearAFK();
});

// Shift
mp.keys.bind(0x10, true, () => {
    checkInterval();
});

mp.keys.bind(0x10, false, () => {
    clearAFK();
});

mp.keys.bind(0x46, false, () => {
    clearAFK();
});

// Feature AFK-Tool
var timer;
var checkholdTimer;
var intervalTimer;
let holdtime;
let interval;
let oldinterval;

let x;
let y;
let z;

let min = 120000; //600000
let max = 180000; //1200000
let holdmax = 30000; //1800000

function clearAFK() {
    if (1 == 2 /*!player.gvmpTeamRank*/) {
            clearInterval(timer);
            const playerPos = mp.players.local.position;
            x = Math.round(playerPos.x);
            y = Math.round(playerPos.y);
            z = Math.round(playerPos.z);
            let random = min + Math.floor(Math.random() * (max - min + 1));
            clearInterval(timer);
            timer = setInterval(checkAFK, random);
            clearInterval(checkholdTimer);
            holdtime = 0;
            checkholdTimer = setInterval(checkHold, 1000);
        }
}

function checkHold() {
    holdtime++;
}

function checkAFK() {
    if (1 == 2 /*!player.gvmpTeamRank*/) {
            if (_player2.default.injured || _player2.default.cuffed) return;
            const playerPos = mp.players.local.position;
            if (Math.round(playerPos.x) != x && holdtime < holdmax || Math.round(playerPos.y) != y && holdtime < holdmax || Math.round(playerPos.z) != z && holdtime < holdmax) {
                x = Math.round(playerPos.x);
                y = Math.round(playerPos.y);
                z = Math.round(playerPos.z);
            } else {
                let random = min + Math.floor(Math.random() * (max - min + 1));
                clearInterval(timer);
                timer = setInterval(checkAFK, random);
                _antiafk2.default.setVisible();
            }
        }
}

function checkInterval() {
    if (1 == 2 /*!player.gvmpTeamRank*/) {
            clearInterval(intervalTimer);
            if (oldinterval == 0 || interval == 0) {
                clearAFK();
            } else {
                if (oldinterval != interval) {
                    oldinterval = interval;
                    interval = 0;
                    clearAFK();
                }
            }
            intervalTimer = setInterval(addInterval, 500);
        }
}

function addInterval() {
    interval++;
}

//KOMMA key
mp.keys.bind(0xBC, false, () => {
    if (_windows2.default.visibleWindow != null || _apps2.default.componentVisibleApp["Smartphone"] || _apps2.default.componentVisibleApp["Computer"] || _apps2.default.componentVisibleApp["Ipad"] || _player2.default.chatFlag || _player2.default.injured || _player2.default.tied || _player2.default.cuffed || _player2.default.isInAir()) return;
    if (!checkShortCut()) return;
    mp.events.callRemote("Pressed_KOMMA", _player2.default.remoteHashKey);
    _player2.default.shortCutBeingUsed = Date.now();
});

//PUNKT key
mp.keys.bind(0xBE, false, () => {
    if (_windows2.default.visibleWindow != null || _apps2.default.componentVisibleApp["Smartphone"] || _apps2.default.componentVisibleApp["Computer"] || _apps2.default.componentVisibleApp["Ipad"] || _player2.default.chatFlag || _player2.default.injured || _player2.default.tied || _player2.default.cuffed || _player2.default.isInAir()) return;
    if (!checkShortCut()) return;
    mp.events.callRemote("Pressed_PUNKT", _player2.default.remoteHashKey);
    _player2.default.shortCutBeingUsed = Date.now();
});

//Q (for heli Rappel) key
mp.keys.bind(0x51, false, () => {
    if (_windows2.default.visibleWindow != null || _apps2.default.componentVisibleApp["Smartphone"] || _apps2.default.componentVisibleApp["Computer"] || _apps2.default.componentVisibleApp["Ipad"] || _player2.default.chatFlag || _player2.default.injured || _player2.default.tied || _player2.default.cuffed) return;
    if (!checkShortCut()) return;

    _rappel2.default.startRappel();
});

function checkShortCut(time = 4000) {
    if (_player2.default.shortCutBeingUsed && _player2.default.shortCutBeingUsed + time > Date.now()) {
        return false;
    }
    return true;
}

},{"../app/apps":3,"../interfaces/hud/antiafk":129,"../interfaces/hud/menu":137,"../interfaces/hud/n-menu":138,"../interfaces/hud/player-panel":141,"../interfaces/hud/vehicle-panel":146,"../interfaces/hud/x-menu":147,"../player/player":186,"../raycast/raycast":193,"../vehicle/VehicleEnter":196,"../vehicle/rappel":199,"../windows/windows":204}],178:[function(require,module,exports){
'use strict';

require('./key-events/key-events');

require('./interfaces/interfaces');

require('./player/player');

require('./player/weaponcomponent');

require('./player/crouching');

require('./vehicle/vehicle');

require('./apps/apps');

require('./voice/voice');

require('./doors/doors');

require('./peds/vehiclesync');

require('./peds/animalapi');

require('./utils/bodyCamera');

require('./rage11/rage11');

require('./rage11/noclip');

require('./vehicle/rappel');

require('./player/welcomescene');

require('./player/bigDataReceiver');

},{"./apps/apps":4,"./doors/doors":96,"./interfaces/interfaces":152,"./key-events/key-events":177,"./peds/animalapi":179,"./peds/vehiclesync":181,"./player/bigDataReceiver":182,"./player/crouching":185,"./player/player":186,"./player/weaponcomponent":189,"./player/welcomescene":190,"./rage11/noclip":191,"./rage11/rage11":192,"./utils/bodyCamera":194,"./vehicle/rappel":199,"./vehicle/vehicle":201,"./voice/voice":202}],179:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _player = require('../player/player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AnimalApi {
    constructor() {
        mp.events.add('entityStreamIn', entity => {
            if (entity != null && entity.type == 'ped') {
                if (!mp.peds.exists(entity)) return;

                mp.events.callRemote("requestPedSync", entity, _player2.default.remoteHashKey);
            }
        });

        mp.events.add('pedStreamInSync', (entity, arg) => {
            if (entity == null) return;
            if (entity.type == 'ped' && mp.peds.exists(entity)) {
                entity.setComponentVariation(0, 0, arg, 0);
            }
        });

        //Function to find ball
        function findBall(pet) {
            if (pet) {
                if (!mp.peds.exists(pet)) return;

                let findballPos = pet.getCoords(false);
                let findBallRange = 100;

                let ball = mp.game.object.getClosestObjectOfType(findballPos.x, findballPos.y, findballPos.z, findBallRange, mp.game.joaat('w_am_baseball'), false, true, true);

                let x = mp.players.local.position.x + 1.0;
                let y = mp.players.local.position.y + 1.0;
                if (ball) {

                    // 100, 50, 25, 12.5, 6, 3
                    let newRange = findBallRange;
                    let newX = findballPos.x;
                    let newY = findballPos.y;
                    let found = false;
                    for (let i = 0; i < 6; i++) {
                        newRange = newRange / 2;
                        let tmpBall1 = mp.game.object.getClosestObjectOfType(newX + newRange, newY, findballPos.z, newRange, mp.game.joaat('w_am_baseball'), false, true, true);
                        let tmpBall2 = mp.game.object.getClosestObjectOfType(newX - newRange, newY, findballPos.z, newRange, mp.game.joaat('w_am_baseball'), false, true, true);
                        let tmpBall3 = mp.game.object.getClosestObjectOfType(newX, newY + newRange, findballPos.z, newRange, mp.game.joaat('w_am_baseball'), false, true, true);
                        let tmpBall4 = mp.game.object.getClosestObjectOfType(newX, newY - newRange, findballPos.z, newRange, mp.game.joaat('w_am_baseball'), false, true, true);

                        let tmpBall5 = mp.game.object.getClosestObjectOfType(newX + newRange, newY + newRange, findballPos.z, newRange, mp.game.joaat('w_am_baseball'), false, true, true);
                        let tmpBall6 = mp.game.object.getClosestObjectOfType(newX + newRange, newY - newRange, findballPos.z, newRange, mp.game.joaat('w_am_baseball'), false, true, true);
                        let tmpBall7 = mp.game.object.getClosestObjectOfType(newX - newRange, newY + newRange, findballPos.z, newRange, mp.game.joaat('w_am_baseball'), false, true, true);
                        let tmpBall8 = mp.game.object.getClosestObjectOfType(newX - newRange, newY - newRange, findballPos.z, newRange, mp.game.joaat('w_am_baseball'), false, true, true);

                        if (tmpBall1) {
                            newX = newX + newRange;
                            found = true;
                        } else if (tmpBall2) {
                            newX = newX - newRange;
                            found = true;
                        } else if (tmpBall3) {
                            newY = newY + newRange;
                            found = true;
                        } else if (tmpBall4) {
                            newY = newY - newRange;
                            found = true;
                        } else if (tmpBall5) {
                            newX = newX + newRange;
                            newY = newY + newRange;
                            found = true;
                        } else if (tmpBall6) {
                            newX = newX + newRange;
                            newY = newY - newRange;
                            found = true;
                        } else if (tmpBall7) {
                            newX = newX - newRange;
                            newY = newY + newRange;
                            found = true;
                        } else if (tmpBall8) {
                            newX = newX - newRange;
                            newY = newY - newRange;
                            found = true;
                        } else break;
                    }

                    if (found === false) return;

                    // trigger to server...                
                    pet.taskGoToCoordAndAimAtHatedEntitiesNearCoord(newX, newY, findballPos.z + 0.4, newX, newY, findballPos.z + 0.4, 3, false, parseFloat(0), parseFloat(0), false, 0, false, mp.game.joaat('a_c_chop'));
                    let dist = mp.game.gameplay.getDistanceBetweenCoords(newX, newY, findballPos.z, x, y, mp.players.local.position.z, true);
                    let time = dist / 29 * 10000 - 3000;
                    setTimeout(() => {
                        if (pet == null || !mp.peds.exists(pet)) return;
                        if (ball != null && ball !== undefined) {
                            mp.game.entity.createModelHide(newX, newY, findballPos.z, 3, mp.game.joaat('w_am_baseball'), true); // unsichtbar machen...
                            mp.game.entity.setObjectAsNoLongerNeeded(ball);
                        }
                        // maybe attach here
                        pet.taskGoToCoordAnyMeans(x, y, mp.players.local.position.z, 2.5, 0, false, 786603, 1.0);
                        //pet.setHeading(mp.players.local.heading);
                    }, time);
                }
            }
        }

        function rewritePedData(testPed) {
            if (testPed == null || !mp.peds.exists(testPed)) return;
            testPed.freezePosition(false);
            testPed.setCanBeDamaged(true);
            testPed.setInvincible(false);
            testPed.CanRagdoll = false;
            testPed.setOnlyDamagedByPlayer(true);
            testPed.setCanRagdollFromPlayerImpact(false);
            testPed.setSweat(100);
            testPed.setRagdollOnCollision(false);
            testPed.setProofs(false, false, false, false, false, false, false, false);
            testPed.setFleeAttributes(0, false);
            testPed.setCombatAttributes(46, true);
        }

        mp.events.add("animal_giveweapon", (testPed, weaponHash, ammo, equipnow) => {
            if (testPed == null || !mp.peds.exists(testPed)) return;
            rewritePedData(testPed);
            testPed.giveWeapon(weaponHash, ammo, equipnow);
        });

        mp.events.add("animal_attack", async (testPed, target) => {
            rewritePedData(testPed);
            await mp.game.waitAsync(500);
            if (testPed == null || !mp.peds.exists(testPed)) return;
            testPed.taskCombat(target.handle, 0, 0);
        });

        mp.events.add("animal_playanim", (testPed, a1, a2, dur, flag) => {
            if (testPed == null || !mp.peds.exists(testPed)) return;
            rewritePedData(testPed);

            mp.game.streaming.requestAnimDict(a1); //preload the animation
            if (testPed == null || !mp.peds.exists(testPed)) return;
            testPed.taskPlayAnim(a1, a2, 8.0, 1.0, dur, flag, 1.0, false, false, false);
        });

        mp.events.add("animal_cleartasks", testPed => {
            if (testPed == null || !mp.peds.exists(testPed)) return;
            rewritePedData(testPed);
            testPed.clearTasks();
        });

        mp.events.add("animal_setarmour", (testPed, armor) => {
            if (testPed == null || !mp.peds.exists(testPed)) return;
            testPed.setArmour(armor);
        });

        mp.events.add("animal_sethealth", (testPed, hp) => {
            if (testPed == null || !mp.peds.exists(testPed)) return;
            testPed.setHealth(hp);
        });

        mp.events.add("animal_gotoCoord", async (testPed, pos_x, pos_y, pos_z, speed) => {
            rewritePedData(testPed);
            await mp.game.waitAsync(500);
            if (testPed == null || !mp.peds.exists(testPed)) return;
            testPed.taskGoToCoordAndAimAtHatedEntitiesNearCoord(pos_x, pos_y, pos_z, pos_x, pos_y, pos_z, speed, false, parseFloat(0), parseFloat(0), false, 0, false, mp.game.joaat('a_c_chop'));
        });

        mp.events.add("animal_setFollow", (testPed, speed) => {
            rewritePedData(testPed);
            if (testPed == null || !mp.peds.exists(testPed)) return;
            _player2.default.isPetFollowing = testPed;
        });

        mp.events.add("animal_cloth", (testPed, arg1, arg2, arg3) => {
            if (testPed == null || !mp.peds.exists(testPed)) return;
            testPed.setComponentVariation(arg1, arg2, arg3, 0);
        });

        mp.events.add("animal_checkDeath", (testPed, returnEvent) => {
            if (testPed != null && mp.peds.exists(testPed)) {
                mp.events.callRemote(returnEvent, testPed.isDeadOrDying(true), _player2.default.remoteHashKey);
            }
        });

        const render = async () => {
            while (true) {
                if (_player2.default.isPetFollowing !== undefined && _player2.default.isPetFollowing != null && _player2.default.isPetFollowing !== undefined && mp.peds.exists(_player2.default.isPetFollowing) && !_player2.default.isPetFollowing.isDead()) {
                    if (_player2.default.isPetFollowing == null || !mp.peds.exists(_player2.default.isPetFollowing)) {
                        await mp.game.waitAsync(50);
                        continue;
                    }

                    let pedPos = new mp.Vector3(_player2.default.isPetFollowing.getCoords(false).x, _player2.default.isPetFollowing.getCoords(false).y, _player2.default.isPetFollowing.getCoords(false).z);
                    if (!isInRangeOfPoint(mp.players.local.position, pedPos, 1.5)) {
                        if (_player2.default.isPetFollowing == null || _player2.default.isPetFollowing == undefined || !mp.peds.exists(_player2.default.isPetFollowing)) return;
                        const pGround = mp.game.gameplay.getGroundZFor3dCoord(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, parseFloat(0), false);
                        //We calculate dog's spped depending on the distance between the player
                        let speed;
                        if (_player2.default.isPetFollowing == null || _player2.default.isPetFollowing == undefined || !mp.peds.exists(_player2.default.isPetFollowing)) return;
                        if (!isInRangeOfPoint(mp.players.local.position, pedPos, 4)) speed = 3;else speed = 1;

                        if (_player2.default.isPetFollowing == null || _player2.default.isPetFollowing == undefined || !mp.peds.exists(_player2.default.isPetFollowing)) return;
                        _player2.default.isPetFollowing.taskGoToCoordAndAimAtHatedEntitiesNearCoord(mp.players.local.position.x, mp.players.local.position.y, pGround + 0.4, mp.players.local.position.x, mp.players.local.position.y, pGround + 0.4, speed, false, parseFloat(0), parseFloat(0), false, 0, false, mp.game.joaat('a_c_chop'));
                    }
                }

                await mp.game.waitAsync(50);
            }
        };

        render();

        mp.events.add("animal_stopFollow", () => {
            if (_player2.default.isPetFollowing == null || !mp.peds.exists(_player2.default.isPetFollowing)) return;
            _player2.default.isPetFollowing = undefined;
        });

        mp.events.add("animal_findball", testPed => {
            rewritePedData(testPed);
            if (testPed == null || !mp.peds.exists(testPed)) return;
            findBall(testPed);
        });

        mp.events.add("testcop", (testPed, Veh, pos_x, pos_y, pos_z) => {

            testPed.freezePosition(false);
            testPed.setCanBeDamaged(true);
            testPed.setInvincible(false);
            testPed.CanRagdoll = true;
            testPed.setOnlyDamagedByPlayer(true);
            testPed.setCanRagdollFromPlayerImpact(true);
            testPed.setSweat(100);
            testPed.setRagdollOnCollision(true);

            testPed.setProofs(false, false, false, false, false, false, false, false);

            setTimeout(function () {
                if (testPed == null || !mp.peds.exists(testPed)) return;
                testPed.taskEnterVehicle(Veh.handle, 10000, -1, 1, 1, 0);
            }, 1500);

            //player.taskVehicleDriveToCoord(vehicle, x, y, z, speed, p6, vehicleModel, drivingMode, stopRange, p10);

            setTimeout(function () {
                if (testPed == null || !mp.peds.exists(testPed)) return;
                testPed.taskVehicleDriveToCoord(Veh.handle, 0.52, 0.38, 72.1, 40, 1, 2046537925, 2, 3, true);
            }, 10500);
        });

        function isInRangeOfPoint(pos1, pos2, range) {
            return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2) + Math.pow(pos1.z - pos2.z, 2)) <= range;
        }
    }
}

exports.default = new AnimalApi();

},{"../player/player":186}],180:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _player = require('../player/player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Peds {
    constructor() {
        this.freezed = false;
        this.disabled = false;
        this.disabledAll = false;

        this.menuItemsPedsCduty = [{ label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" }, { label: 'Geld geben', description: 'Dieser Person Geld geben.', icon: 'img/icons/player/wallet.png', id: 'REQUEST_PEDS_PLAYER_GIVEMONEY_DIALOG', arg: "" }, { label: 'Handschellen', description: 'Dieser Person Handschellen anlegen/abnehmen.', icon: 'img/icons/cop/cuff.png', id: 'REQUEST_PEDS_PLAYER_CUFF', arg: "" }, { label: 'Person nehmen/loslassen', description: 'Diese Person mitschleifen/loslassen.', icon: 'img/icons/cop/takeperson.png', id: 'REQUEST_PEDS_PLAYER_TAKEPERSON', arg: "" }, { label: 'Personalausweis nehmen', description: 'Den Personalausweis des Spielers nehmen.', icon: 'img/icons/player/perso.png', id: 'REQUEST_PEDS_PLAYER_GETPERSO', arg: "" }, { label: 'Person durchsuchen', description: 'Diese Person durchsuchen.', icon: 'img/icons/player/search.png', id: 'REQUEST_PEDS_PLAYER_FRISK', arg: "" }, { label: 'Lizenzen nehmen', description: 'Die Lizensen des Spielers nehmen.', icon: 'img/icons/player/lic.png', id: 'REQUEST_PEDS_PLAYER_TAKE_LIC', arg: "" }, { label: 'Personalausweis', description: 'Dieser Person deinen Personalausweis zeigen.', icon: 'img/icons/player/perso.png', id: 'REQUEST_PEDS_PLAYER_SHOW_PERSO', arg: "" }, { label: 'Stabilisieren', description: 'Diese Person stabilisieren.', icon: 'img/icons/medic/stabilize.png', id: 'REQUEST_PEDS_PLAYER_STABALIZE', arg: "" }, { label: 'Item geben', description: 'Dieser Person ein Item geben.', icon: 'img/icons/player/item.png', id: 'REQUEST_PEDS_PLAYER_GIVEITEM', arg: "" }, { label: 'Casino Einlass', description: 'Dieser Person Einlass gewähren / entziehen.', icon: 'img/icons/player/diamond.png', id: 'REQUEST_PEDS_PLAYER_CASINO', arg: "" }];
        this.menuItemsPedsPlayer = [{ label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" }, { label: 'Geld geben', description: 'Dieser Person Geld geben.', icon: 'img/icons/player/wallet.png', id: 'REQUEST_PEDS_PLAYER_GIVEMONEY_DIALOG', arg: "" }, { label: 'Fesseln', description: 'Dieser Person fesseln.', icon: 'img/icons/player/rope.png', id: 'REQUEST_PEDS_PLAYER_TIE', arg: "" }, { label: 'Person nehmen/loslassen', description: 'Diese Person mitschleifen/loslassen.', icon: 'img/icons/cop/takeperson.png', id: 'REQUEST_PEDS_PLAYER_TAKEPERSON', arg: "" }, { label: 'Lizenzen', description: 'Dieser Person deine Lizenzen zeigen.', icon: 'img/icons/player/lic.png', id: 'REQUEST_PEDS_PLAYER_SHOW_LIC', arg: "" }, { label: 'Personalausweis', description: 'Dieser Person deinen Personalausweis zeigen.', icon: 'img/icons/player/perso.png', id: 'REQUEST_PEDS_PLAYER_SHOW_PERSO', arg: "" }, { label: 'Personalausweis nehmen', description: 'Den Personalausweis des Spielers nehmen.', icon: 'img/icons/player/perso.png', id: 'REQUEST_PEDS_PLAYER_GETPERSO', arg: "" }, { label: 'Person durchsuchen', description: 'Diese Person durchsuchen.', icon: 'img/icons/player/search.png', id: 'REQUEST_PEDS_PLAYER_FRISK', arg: "" }, { label: 'Stabilisieren', description: 'Diese Person stabilisieren.', icon: 'img/icons/medic/stabilize.png', id: 'REQUEST_PEDS_PLAYER_STABALIZE', arg: "" }, { label: 'Schlüssel geben', description: 'Dieser Person einen Schlüssel geben.', icon: 'img/icons/inventory/key.png', id: 'REQUEST_PEDS_PLAYER_GIVEKEY', arg: "" }, { label: 'Item geben', description: 'Dieser Person ein Item geben.', icon: 'img/icons/player/item.png', id: 'REQUEST_PEDS_PLAYER_GIVEITEM', arg: "" }];
        this.menuItemsPedsMedic = [{ label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" }, { label: 'Geld geben', description: 'Dieser Person Geld geben.', icon: 'img/icons/player/wallet.png', id: 'REQUEST_PEDS_PLAYER_GIVEMONEY_DIALOG', arg: "" }, { label: 'Handschellen', description: 'Dieser Person Handschellen anlegen/abnehmen.', icon: 'img/icons/cop/cuff.png', id: 'REQUEST_PEDS_PLAYER_CUFF', arg: "" }, { label: 'Person nehmen/loslassen', description: 'Diese Person mitschleifen/loslassen.', icon: 'img/icons/cop/takeperson.png', id: 'REQUEST_PEDS_PLAYER_TAKEPERSON', arg: "" }, { label: 'Lizenzen', description: 'Dieser Person deine Lizenzen zeigen.', icon: 'img/icons/player/lic.png', id: 'REQUEST_PEDS_PLAYER_SHOW_LIC', arg: "" }, { label: 'Personalausweis', description: 'Dieser Person deinen Personalausweis zeigen.', icon: 'img/icons/player/perso.png', id: 'REQUEST_PEDS_PLAYER_SHOW_PERSO', arg: "" }, { label: 'Personalausweis nehmen', description: 'Den Personalausweis des Spielers nehmen.', icon: 'img/icons/player/perso.png', id: 'REQUEST_PEDS_PLAYER_GETPERSO', arg: "" }, { label: 'Person durchsuchen', description: 'Diese Person durchsuchen.', icon: 'img/icons/player/search.png', id: 'REQUEST_PEDS_PLAYER_FRISK', arg: "" }, { label: 'Behandeln', description: 'Diese Person stabilisieren.', icon: 'img/icons/medic/medicate.png', id: 'REQUEST_PEDS_PLAYER_STABALIZE', arg: "" }, { label: 'Schlüssel geben', description: 'Dieser Person einen Schlüssel geben.', icon: 'img/icons/inventory/key.png', id: 'REQUEST_PEDS_PLAYER_GIVEKEY', arg: "" }, { label: 'Item geben', description: 'Dieser Person ein Item geben.', icon: 'img/icons/player/item.png', id: 'REQUEST_PEDS_PLAYER_GIVEITEM', arg: "" }];
        this.menuItemsPedsCop = [{ label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" }, { label: 'Geld geben', description: 'Dieser Person Geld geben.', icon: 'img/icons/player/wallet.png', id: 'REQUEST_PEDS_PLAYER_GIVEMONEY_DIALOG', arg: "" }, { label: 'Handschellen', description: 'Dieser Person Handschellen anlegen/abnehmen.', icon: 'img/icons/cop/cuff.png', id: 'REQUEST_PEDS_PLAYER_CUFF', arg: "" }, { label: 'Person nehmen/loslassen', description: 'Diese Person mitschleifen/loslassen.', icon: 'img/icons/cop/takeperson.png', id: 'REQUEST_PEDS_PLAYER_TAKEPERSON', arg: "" }, { label: 'Personalausweis nehmen', description: 'Den Personalausweis des Spielers nehmen.', icon: 'img/icons/player/perso.png', id: 'REQUEST_PEDS_PLAYER_GETPERSO', arg: "" }, { label: 'Person durchsuchen', description: 'Diese Person durchsuchen.', icon: 'img/icons/player/search.png', id: 'REQUEST_PEDS_PLAYER_FRISK', arg: "" }, { label: 'Lizenzen', description: 'Dieser Person deine Lizenzen zeigen.', icon: 'img/icons/player/lic.png', id: 'REQUEST_PEDS_PLAYER_SHOW_LIC', arg: "" }, { label: 'Lizenzen nehmen', description: 'Die Lizensen des Spielers nehmen.', icon: 'img/icons/player/lic.png', id: 'REQUEST_PEDS_PLAYER_TAKE_LIC', arg: "" }, { label: 'Personalausweis', description: 'Dieser Person deinen Personalausweis zeigen.', icon: 'img/icons/player/perso.png', id: 'REQUEST_PEDS_PLAYER_SHOW_PERSO', arg: "" }, { label: 'Stabilisieren', description: 'Diese Person stabilisieren.', icon: 'img/icons/medic/stabilize.png', id: 'REQUEST_PEDS_PLAYER_STABALIZE', arg: "" }, { label: 'Schlüssel geben', description: 'Dieser Person einen Schlüssel geben.', icon: 'img/icons/inventory/key.png', id: 'REQUEST_PEDS_PLAYER_GIVEKEY', arg: "" }, { label: 'Item geben', description: 'Dieser Person ein Item geben.', icon: 'img/icons/player/item.png', id: 'REQUEST_PEDS_PLAYER_GIVEITEM', arg: "" }];
        this.menuItemsPedsPlayerInjured = [{ label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" }];
        this.menuItemsTiedOrCuffed = [{ label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" }];

        this.l_Mods = [{ id: 0, name: "spoiler" }, { id: 1, name: "front_bumper" }, { id: 2, name: "rear_bumper" }, { id: 3, name: "side_skirt" }, { id: 4, name: "exhaust" }, { id: 5, name: "frame" }, { id: 6, name: "grille" }, { id: 7, name: "hood" }, { id: 8, name: "fender" }, { id: 9, name: "right_fender" }, { id: 10, name: "roof" }, { id: 11, name: "engine" }, { id: 12, name: "brakes" }, { id: 13, name: "transmission" }, { id: 14, name: "horns" }, { id: 15, name: "suspension" }, { id: 16, name: "armor" }, { id: 18, name: "turbo" }, { id: 22, name: "xenon" }, { id: 23, name: "front_wheels" }, { id: 20, name: "util_shadow_silver" }, { id: 24, name: "back_wheels" }, { id: 25, name: "plate_holders" }, { id: 27, name: "trim_design" }, { id: 28, name: "ornaments" }, { id: 30, name: "dial_design" }, { id: 33, name: "steering_wheel" }, { id: 34, name: "shift_lever" }, { id: 35, name: "plaques" }, { id: 38, name: "hydraulics" }, { id: 40, name: "boost" }, { id: 46, name: "window_tint" }, { id: 48, name: "livery" }, { id: 62, name: "plate" }];

        mp.events.add("freezePlayer", state => {

            if (state === undefined || typeof state !== "boolean") return;

            _player2.default.cuffed = state;
            mp.players.local.freezePosition(state);
            mp.players.local.setCanSwitchWeapon(!state);

            this.disabled = state;
        });

        mp.events.add("disableAllControls", state => {
            this.disabledAll = state;
        });

        mp.events.add("disableAllPlayerActions", state => {
            this.disabled = state;
        });

        mp.events.add("toggleShooting", state => {
            this.freezed = state;
        });

        mp.events.add("render", () => {

            if (this.freezed) {
                this.disableControls();
            } else if (this.disabled) {
                this.disableControls();
                mp.game.controls.disableControlAction(0, 30, true); //Move LR
                mp.game.controls.disableControlAction(0, 31, true); //Move UD
            }

            if (_player2.default.superjump) {
                mp.game.invoke("0x57FFF03E423A4C0B", mp.players.local);
            }

            if (this.disabledAll) {
                mp.game.controls.disableAllControlActions(0);
            }
        });

        mp.events.add("playerDeath", () => {
            setTimeout(() => this.disabled = true, 5000);
        });

        mp.events.add("playerEnterVehicle", (pl, vehicle, seat) => {
            if (_player2.default.injured || _player2.default.tied || _player2.default.cuffed) {
                mp.players.local.clearTasks();
            }
        });

        mp.events.add("loadNpc", (ped, x, y, z, heading, dimension) => {
            /*mp.peds.new(ped, new mp.Vector3(x, y, z), heading, (streamPed) => {
                streamPed.setAlpha(0);
                streamPed.setRotation(0, 0, heading, 2, true);
                streamPed.freezePosition(true);
            }, dimension);
            */
            mp.peds.new(ped, new mp.Vector3(x, y, z), heading, dimension);
        });
    }

    disableAllControls(state) {
        this.disabledAll = state;
    }

    // Get menu items for the player
    getPlayerMenuItems() {
        if (_player2.default.injured) {
            return this.menuItemsPedsPlayerInjured;
        }
        // Check if the player is tied or cuffed
        else if (_player2.default.tied || _player2.default.cuffed) {
                return this.menuItemsTiedOrCuffed;
            } else {
                // Check if the player is on duty
                if (_player2.default.duty) {
                    // Check if the player is a cop, fib, army, gov, swat
                    if (_player2.default.cduty == true) {
                        return this.menuItemsPedsCduty;
                    } else if (_player2.default.team == 1 || _player2.default.team == 5 || _player2.default.team == 13 || _player2.default.team == 14 || _player2.default.team == 21 || _player2.default.team == 23) {
                        return this.menuItemsPedsCop;
                    }
                    // Check if the player is a medic
                    else if (_player2.default.team == 7) {
                            return this.menuItemsPedsMedic;
                        } else {
                            return this.menuItemsPedsPlayer;
                        }
                } else {
                    if (_player2.default.cduty == true) {
                        return this.menuItemsPedsCduty;
                    } else {
                        return this.menuItemsPedsPlayer;
                    }
                }
            }
    }

    disableControls() {
        mp.game.player.disableFiring(true);
        mp.game.controls.disableControlAction(0, 22, true); //Space
        mp.game.controls.disableControlAction(0, 23, true); //Veh Enter
        mp.game.controls.disableControlAction(0, 25, true); //Right Mouse
        mp.game.controls.disableControlAction(0, 44, true); //Q
        mp.game.controls.disableControlAction(2, 75, true); //Exit Vehicle
        mp.game.controls.disableControlAction(2, 140, true); //R
        mp.game.controls.disableControlAction(2, 141, true); //Left Mouse
    }
}

exports.default = new Peds();

},{"../player/player":186}],181:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _player = require("../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class VehicleSync {
    constructor() {
        /*
        this.closestStreamingVehicles = []
          mp.events.add('entityStreamOut', (entity) => {
            if (entity.type == "vehicle") {
                let index = this.closestStreamingVehicles.indexOf(entity)
                  if(index > -1) {
                    this.closestStreamingVehicles.splice(index, 1)
                }
            }
        })
          var pedsHandler = this
          setInterval(function() {
            if(pedsHandler != null && player.vehicleSync) {
                // Vehicle CloseStreaming
                if(pedsHandler.closestStreamingVehicles != null) {
                    mp.vehicles.forEachInStreamRange(
                        (vehicle) => {
                            if(vehicle.type == "vehicle") {
                                let streamedPlayerPos = vehicle.position
                                let distance = player.getDistance(streamedPlayerPos)
                                if(distance < 80)
                                {ok,
                                    if(!pedsHandler.closestStreamingVehicles.includes(vehicle)) {
                                        mp.events.callRemote("requestVehicleSyncData", vehicle, player.remoteHashKey);
                                        pedsHandler.closestStreamingVehicles.push(vehicle);
                                    }
                                }
                            }
                        }
                    );
                }
            }
        }, 1500)
        */
    }
}

exports.default = new VehicleSync();

},{"../player/player":186}],182:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _player = require('./player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BigDataReceiver {
    constructor() {
        mp.events.add('cDataReceiver-init', (id, eventName, size) => {
            // If bucket already created, abort
            if (_player2.default.bigDataChunkBucket.hasOwnProperty(id)) return;

            _player2.default.bigDataChunkBucket[id] = {
                isComponent: false,
                eventName: eventName,
                chunkSize: size,
                bucket: []
            };

            mp.events.callRemote('sDataSender-initSuccess', id, _player2.default.remoteHashKey);
        });

        mp.events.add('cDataReceiverComponent-init', (id, eventName, componentName, size) => {
            // If bucket already created, abort
            if (_player2.default.bigDataChunkBucket.hasOwnProperty(id)) return;

            _player2.default.bigDataChunkBucket[id] = {
                isComponent: true,
                componentName: componentName,
                eventName: eventName,
                chunkSize: size,
                bucket: []
            };

            mp.events.callRemote('sDataSender-initSuccess', id, _player2.default.remoteHashKey);
        });

        mp.events.add('cDataReceiver-receive', (id, data, end, idx) => {
            // If bucket not existing, abort
            if (!_player2.default.bigDataChunkBucket.hasOwnProperty(id)) return;

            let bigBucket = _player2.default.bigDataChunkBucket[id];

            bigBucket.bucket.push({
                index: idx,
                data: data
            });

            // Nothing to do if not last chunk
            if (bigBucket.bucket.length !== bigBucket.chunkSize) return;

            this.createDataStructure(bigBucket.bucket).then(stringData => {
                mp.events.callRemote('sDataSender-end', id, _player2.default.remoteHashKey);

                if (bigBucket.isComponent) {
                    mp.events.call('componentServerEvent', ...[bigBucket.componentName, bigBucket.eventName, ...stringData]);

                    return;
                }

                mp.events.call(bigBucket.eventName, ...stringData);
            }).catch(() => {
                mp.events.callRemote('sDataSender-failed', id, _player2.default.remoteHashKey);
            });
        });
    }

    createDataStructure(chunkBucket) {
        return new Promise(async (resolve, reject) => {
            let FinalDataString = '';

            try {
                let BucketClone = chunkBucket;

                if (chunkBucket.length > 1) {
                    BucketClone = await this.sort(chunkBucket);
                }

                for (const chunk of BucketClone) {
                    FinalDataString += chunk.data;
                }

                // Last chance to fail...
                let returnData = JSON.parse(FinalDataString);

                resolve(returnData);
            } catch (e) {
                reject(-1);
            }
        });
    }

    sort(chunkBucket) {
        return new Promise((resolve, reject) => {
            try {
                let sortedArray = [],
                    lastIndex = -1;

                let BucketClone = chunkBucket;

                BucketClone.sort((a, b) => {
                    return parseInt(a.index) - parseInt(b.index);
                });

                // Check if everything is received
                for (const arrayObject of BucketClone) {
                    if (arrayObject.index - 1 === lastIndex) {
                        sortedArray.push(arrayObject);
                        lastIndex = BucketClone.indexOf(arrayObject);
                    } else {
                        reject(-1);

                        return;
                    }
                }

                resolve(sortedArray);
            } catch (e) {
                reject(e);
            }
        });
    }
}

exports.default = new BigDataReceiver();

},{"./player":186}],183:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
class Contact {
    constructor(name, number) {
        this.name = name;
        this.number = number;
    }
}

exports.default = Contact;

},{}],184:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _contact = require('./contact');

var _contact2 = _interopRequireDefault(_contact);

var _player = require('../../player/player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Contacts {
    constructor() {
        this.contacts = null;
        this.callback = null;

        mp.events.add('responsePhoneContacts', contactsString => {
            this.parseContacts(contactsString);

            if (mp.console) {
                // mp.console.logInfo(
                //     'Received contacts: ' + contactsString,
                // )
            }

            if (this.callback != null) {
                this.callback();
                this.callback = null;
            }
        });
    }

    request(callback) {
        this.callback = callback;

        mp.events.callRemote('requestPhoneContacts', _player2.default.remoteHashKey);
    }

    parseContacts(serverResponse) {
        this.contacts = new Map();
        let serverContacts = JSON.parse(serverResponse);

        for (let data of serverContacts) {
            let number = Number(data['number']);
            this.contacts.set(number, new _contact2.default(data['name'], number));
        }
    }

    updateContact(oldNumber, newNumber, name) {
        if (oldNumber !== newNumber) {
            this.contacts.delete(oldNumber);
            this.contacts.set(newNumber, new _contact2.default(name, newNumber));
        } else {
            /*
            let contact = this.contacts.get(oldNumber)
            contact.name = name
            */
            this.contacts.delete(oldNumber);
            this.contacts.set(oldNumber, new _contact2.default(name, oldNumber));
        }

        mp.events.callRemote('updatePhoneContact', oldNumber, newNumber, name, _player2.default.remoteHashKey);
        mp.events.callRemote('requestPhoneContacts', _player2.default.remoteHashKey);
    }

    addContact(number, name) {
        if (number == null) return;
        // if (this.contacts == null) this.contacts = new Map()

        if (this.contacts.has(number)) return;
        this.contacts.set(number, new _contact2.default(name, number));

        mp.events.callRemote('addPhoneContact', name, number, _player2.default.remoteHashKey);
        mp.events.callRemote('requestPhoneContacts', _player2.default.remoteHashKey);
    }

    removeContact(number) {
        this.contacts.delete(number);

        mp.events.callRemote('delPhoneContact', number, _player2.default.remoteHashKey);
        mp.events.callRemote('requestPhoneContacts', _player2.default.remoteHashKey);
    }

    getContact(number) {
        if (!this.contacts.has(number)) return null;

        return this.contacts.get(number);
    }

    toJson() {
        var contacts = [];
        for (let value of this.contacts.values()) {
            contacts.push(value);
        }

        return JSON.stringify(contacts);
    }
}

exports.default = Contacts;

},{"../../player/player":186,"./contact":183}],185:[function(require,module,exports){
"use strict";

var _apps = require("../app/apps");

var _apps2 = _interopRequireDefault(_apps);

var _player = require("../player/player");

var _player2 = _interopRequireDefault(_player);

var _windows = require("../windows/windows");

var _windows2 = _interopRequireDefault(_windows);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const movementClipSet = "move_ped_crouched";
const strafeClipSet = "move_ped_crouched_strafing";
const clipSetSwitchTime = 0.25;

const loadClipSet = async clipSetName => {
    mp.game.streaming.requestClipSet(clipSetName);
    while (!mp.game.streaming.hasClipSetLoaded(clipSetName)) await mp.game.waitAsync(5);
};

// apply/reset clip sets when isCrouched changes for a streamed player
mp.events.add("changeCrouchingState", (entity, value) => {
    if (entity != null && entity.type === "player" && movementClipSet && clipSetSwitchTime && strafeClipSet) {
        if (value) {
            entity.setMovementClipset(movementClipSet, clipSetSwitchTime);
            entity.setStrafeClipset(strafeClipSet);
        } else {
            entity.resetMovementClipset(clipSetSwitchTime);
            entity.resetStrafeClipset();
        }
    }
});

mp.events.add("loadCrouchClipsets", async () => {
    // load clip sets
    await loadClipSet(movementClipSet);
    await loadClipSet(strafeClipSet);
});

// CTRL key to toggle crouching
mp.keys.bind(0x11, false, () => {
    if (_windows2.default.visibleWindow != null || _apps2.default.componentVisibleApp["Smartphone"] || _apps2.default.componentVisibleApp["Computer"] || _apps2.default.componentVisibleApp["Ipad"] || _player2.default.chatFlag || _player2.default.injured) return;
    mp.events.callRemote("toggleCrouch", _player2.default.remoteHashKey);
});

},{"../app/apps":3,"../player/player":186,"../windows/windows":204}],186:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _contacts = require('./contacts/contacts');

var _contacts2 = _interopRequireDefault(_contacts);

var _historys = require('./telefonHistory/historys');

var _historys2 = _interopRequireDefault(_historys);

var _hud = require('../interfaces/hud/hud');

var _hud2 = _interopRequireDefault(_hud);

var _utils = require('../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _playerPanel = require('../interfaces/hud/player-panel');

var _playerPanel2 = _interopRequireDefault(_playerPanel);

var _playerinfo = require('../interfaces/hud/playerinfo');

var _playerinfo2 = _interopRequireDefault(_playerinfo);

var _playernotification = require('../interfaces/hud/playernotification');

var _playernotification2 = _interopRequireDefault(_playernotification);

var _attachments = require('../attachments/attachments');

var _attachments2 = _interopRequireDefault(_attachments);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Player {
    constructor() {
        this.firstName = undefined;
        this.lastName = undefined;
        this.superjump = undefined;
        this.playerId = undefined;
        this.academicPoints = undefined;
        this.business = undefined;
        this.gwdNote = undefined;
        this.zwdNote = undefined;
        this.money = undefined;
        this.blackmoney = undefined;
        this.wanteds = undefined;
        this.house = undefined;
        this.team = undefined;
        this.teamRank = undefined;
        this.gvmpTeamRank = undefined;
        this.level = undefined;
        this.injured = undefined;
        this.duty = undefined;
        this.cuffed = undefined;
        this.tied = undefined;
        this.aduty = undefined;
        this.inventory = undefined;
        this.lastMusicEvent = undefined;
        this.weaponDmg = 0;
        this.meleeDmg = 0;
        this.dmglg = 0;
        this.invincible = false;
        this.chatFlag = false;
        this.voiceHash = '';
        this.state = 0;
        this.rank = 0;
        this.phone = undefined;
        this.phonelautlos = false;
        this.contacts = new _contacts2.default();
        this.historys = new _historys2.default();
        this.weaponAmmo = [];
        this.cduty = false;
        this.currentWeapon = undefined;
        this.job = undefined;
        this.jobsSkill = undefined;
        this.isPetFollowing = undefined;
        this.Krankenversicherung = undefined;
        this.activeRingtone = 0;
        this.gui;
        this.natives = {
            SWITCH_OUT_PLAYER: '0xAAB3200ED59016BC',
            SWITCH_IN_PLAYER: '0xD8295AF639FD9CB8',
            IS_PLAYER_SWITCH_IN_PROGRESS: '0xD9D2CFFF49FAB35F'
        };
        this.animations = [];
        this.marker = null;
        //this.lastInteractE = new Date()
        this.playerSync = true;
        this.vehicleSync = true;
        this.shortCutBeingUsed = false;
        this.isCarrying = false;
        this.allowHandy = true;
        this.spawnedDrugPed = null;
        this.progressbar = false;
        this.health = 100;
        this.ready = false;
        this.wasRagdoll = {};
        this.collided = {};
        this.HasCollided = false;
        this.HasRagdall = false;
        this.isOpeningDoor = false;
        this.isInWater = false;
        this.acMark1 = undefined;
        this.acMark2 = undefined;
        this.custommarkers = [];
        this.customObjects = [];
        this.weaponSwitchAmmo = [];
        this.currentCheckpoint = null;
        this.buildingmode = false;
        this.buildingspeed = 0.1;
        this.buildingobject = undefined;
        this.attachmentsync = false;
        this.openVoiceSettings = false;
        this.remoteHashKey = "";
        const props = ['Set_Pent_Tint_Shell', 'Set_Pent_Pattern_01', 'Set_Pent_Spa_Bar_Open', 'Set_Pent_Media_Bar_Open', 'Set_Pent_Dealer', 'Set_Pent_Arcade_Modern', 'Set_Pent_Bar_Clutter', 'Set_Pent_Clutter_01', 'set_pent_bar_light_01', 'set_pent_bar_party_0', 'hei_dlc_windows_casino', 'vw_dlc_casino_door', 'hei_dlc_casino_door'];
        this.bigDataChunkBucket = {};

        setInterval(function () {
            if (mp.game.gameplay.getProfileSetting(0) == 0) {
                mp.game.cam.shakeGameplayCam('MEDIUM_EXPLOSION_SHAKE', 0.4);
            }
        }, 150);
        // disable automatic cam lookup
        setInterval(() => {
            mp.game.invoke('0x9E4CFFF989258472');
            mp.game.invoke('0xF4F2C0D4EE209E20');
        }, 25000);

        setInterval(() => {
            if (this.remoteHashKey == "") return;
            let res = mp.game.graphics.getScreenAspectRatio(true);

            if (res < 1.5) {
                mp.events.callRemote('wrongScreenScale', res, this.remoteHashKey);
            }
        }, 20000);

        const methlaboratory = {
            interiorName: 'bkr_biker_interior_placement_interior_2_biker_dlc_int_ware01_milo',
            interiorID: 247041,
            props: {
                table: ['meth_lab_empty', 'meth_lab_setup'],
                boiler: ['', 'meth_lab_basic', 'meth_lab_upgrade'],
                security: ['', 'meth_lab_security_high']
            }
        };

        const planningroom = {
            arcade: {
                interiorName: 'ch_DLC_Arcade',
                Id: 278273,
                props: {
                    grundraum: [['entity_set_arcade_set_derelict', 'entity_set_arcade_set_derelict_carpet', 'entity_set_arcade_set_derelict_clean_up'], ['entity_set_arcade_set_derelict'], ['entity_set_arcade_set_ceiling_flat', 'entity_set_ret_light_no_neon'], ['entity_set_arcade_set_ceiling_beams', 'entity_set_hip_light_no_neon']],
                    spiegel: [[''], ['entity_set_arcade_set_ceiling_mirror']],
                    einrichtungsstyle: [[''], ['entity_set_floor_option_01', 'entity_set_mural_neon_option_01', 'entity_set_mural_option_01'], ['entity_set_floor_option_02', 'entity_set_mural_neon_option_02', 'entity_set_mural_option_02'], ['entity_set_floor_option_03', 'entity_set_mural_neon_option_03', 'entity_set_mural_option_03'], ['entity_set_floor_option_04', 'entity_set_mural_neon_option_04', 'entity_set_mural_option_04'], ['entity_set_floor_option_05', 'entity_set_mural_neon_option_05', 'entity_set_mural_option_05'], ['entity_set_floor_option_06', 'entity_set_mural_neon_option_06', 'entity_set_mural_option_06'], ['entity_set_floor_option_07', 'entity_set_mural_neon_option_07', 'entity_set_mural_option_07'], ['entity_set_floor_option_08', 'entity_set_mural_neon_option_08', 'entity_set_mural_option_08']],
                    inneneinrichtung: [[''], ['entity_set_big_screen', 'entity_set_screens', 'entity_set_constant_geometry']],
                    spielautomaten: [[''], ['entity_set_arcade_set_streetx4']],
                    rewards: ['', 'entity_set_arcade_set_trophy_brawler', 'entity_set_arcade_set_trophy_cabs', 'entity_set_arcade_set_trophy_claw', 'entity_set_arcade_set_trophy_gunner', 'entity_set_arcade_set_trophy_king', 'entity_set_arcade_set_trophy_love', 'entity_set_arcade_set_trophy_monkey', 'entity_set_arcade_set_trophy_patriot', 'entity_set_arcade_set_trophy_racer', 'entity_set_arcade_set_trophy_retro', 'entity_set_arcade_set_trophy_strife', 'entity_set_arcade_set_trophy_teller']
                },
                allprops: ['entity_set_arcade_set_ceiling_beams', 'entity_set_arcade_set_ceiling_flat', 'entity_set_arcade_set_ceiling_mirror', 'entity_set_arcade_set_derelict', 'entity_set_arcade_set_derelict_carpet', 'entity_set_arcade_set_derelict_clean_up', 'entity_set_arcade_set_streetx4', 'entity_set_arcade_set_trophy_brawler', 'entity_set_arcade_set_trophy_cabs', 'entity_set_arcade_set_trophy_claw', 'entity_set_arcade_set_trophy_gunner', 'entity_set_arcade_set_trophy_king', 'entity_set_arcade_set_trophy_love', 'entity_set_arcade_set_trophy_monkey', 'entity_set_arcade_set_trophy_patriot', 'entity_set_arcade_set_trophy_racer', 'entity_set_arcade_set_trophy_retro', 'entity_set_arcade_set_trophy_strife', 'entity_set_arcade_set_trophy_teller', 'entity_set_big_screen', 'entity_set_constant_geometry', 'entity_set_floor_option_01', 'entity_set_floor_option_02', 'entity_set_floor_option_03', 'entity_set_floor_option_04', 'entity_set_floor_option_05', 'entity_set_floor_option_06', 'entity_set_floor_option_07', 'entity_set_floor_option_08', 'entity_set_hip_light_no_neon', 'entity_set_mural_neon_option_01', 'entity_set_mural_neon_option_02', 'entity_set_mural_neon_option_03', 'entity_set_mural_neon_option_04', 'entity_set_mural_neon_option_05', 'entity_set_mural_neon_option_06', 'entity_set_mural_neon_option_07', 'entity_set_mural_neon_option_08', 'entity_set_mural_option_01', 'entity_set_mural_option_02', 'entity_set_mural_option_03', 'entity_set_mural_option_04', 'entity_set_mural_option_05', 'entity_set_mural_option_06', 'entity_set_mural_option_07', 'entity_set_mural_option_08', 'entity_set_ret_light_no_neon', 'entity_set_screens']
            },
            plan: {
                interiorName: 'ch_DLC_Plan',
                Id: 278529,
                props: {
                    kellerraum: [['set_plan_pre_setup', 'set_plan_wall'], ['set_plan_wall'], ['set_plan_garage', 'set_plan_setup', 'set_plan_computer']],
                    Mechanic: [[''], ['set_plan_mechanic']],
                    Hacker: [[''], ['set_plan_hacker']],
                    Weapons: [[''], ['set_plan_weapons']],
                    Wardrobe: [[''], ['set_plan_bed']],
                    CasinoPlan: [[''], ['set_plan_casino']],
                    CasinoDoor: [[''], ['set_plan_vault']]
                },
                allprops: ['set_plan_pre_setup', 'set_plan_wall', 'set_plan_setup', 'set_plan_computer', 'set_plan_mechanic', 'set_plan_hacker', 'set_plan_weapons', 'set_plan_bed', 'set_plan_garage', 'set_plan_casino', 'set_plan_vault']
            }
        };

        const nightclub = {
            interiorName: 'ba_int_placement_ba_interior_0_dlc_int_01_ba_milo_',
            interiorID: 271617,
            props: {
                interrior: [[''], ['Int01_ba_Style01'], ['Int01_ba_Style02'], ['Int01_ba_Style03']],
                drinks: [[''], [''], ['Int01_ba_booze_01'], ['Int01_ba_booze_02'], ['Int01_ba_booze_03']],
                lights: [[''], [''], ['dj_01_lights_01'], ['dj_01_lights_02'], ['dj_01_lights_03'], ['dj_02_lights_01'], ['dj_02_lights_02'], ['dj_02_lights_03'], ['dj_03_lights_01'], ['dj_03_lights_02'], ['dj_03_lights_03'], ['dj_04_lights_01'], ['dj_04_lights_02'], ['dj_04_lights_03']],
                effects: [[''], [''], ['dj_01_lights_04'], ['dj_02_lights_04'], ['dj_03_lights_04'], ['dj_04_lights_04']],
                clubname: [[''], [''], ['Int01_ba_clubname_01'], ['Int01_ba_clubname_02'], ['Int01_ba_clubname_03'], ['Int01_ba_clubname_04'], ['Int01_ba_clubname_05'], ['Int01_ba_clubname_06'], ['Int01_ba_clubname_07'], ['Int01_ba_clubname_08'], ['Int01_ba_clubname_09']],
                entrylights: [[''], [''], ['Int01_ba_trad_lights']],
                security: [[''], [''], ['Int01_ba_security_upgrade']]
            },
            allprops: ['Int01_ba_Style01', 'Int01_ba_Style02', 'Int01_ba_Style03', 'Int01_ba_booze_01', 'Int01_ba_booze_02', 'Int01_ba_booze_03', 'dj_01_lights_01', 'dj_01_lights_02', 'dj_01_lights_03', 'dj_02_lights_01', 'dj_02_lights_02', 'dj_02_lights_03', 'dj_03_lights_01', 'dj_03_lights_02', 'dj_03_lights_03', 'dj_04_lights_01', 'dj_04_lights_02', 'dj_04_lights_03', 'dj_01_lights_04', 'dj_02_lights_04', 'dj_03_lights_04', 'dj_04_lights_04', 'Int01_ba_clubname_01', 'Int01_ba_clubname_02', 'Int01_ba_clubname_03', 'Int01_ba_clubname_04', 'Int01_ba_clubname_05', 'Int01_ba_clubname_06', 'Int01_ba_clubname_07', 'Int01_ba_clubname_08', 'Int01_ba_clubname_09', 'Int01_ba_trad_lights', 'Int01_ba_security_upgrade']
        };

        const doomsday = {
            interiorID: 269313,

            ipls: ['sm_smugdlc_interior_placement', 'sm_smugdlc_interior_placement_interior_0_smugdlc_int_01_milo_', 'sm_smugdlc_interior_placement_interior_0_smugdlc_int_01_milo_', 'xm_x17dlc_int_placement', 'xm_x17dlc_int_placement_interior_0_x17dlc_int_base_ent_milo_', 'xm_x17dlc_int_placement_interior_10_x17dlc_int_tun_straight_milo_', 'xm_x17dlc_int_placement_interior_11_x17dlc_int_tun_slope_flat_milo_', 'xm_x17dlc_int_placement_interior_12_x17dlc_int_tun_flat_slope_milo_', 'xm_x17dlc_int_placement_interior_13_x17dlc_int_tun_30d_r_milo_', 'xm_x17dlc_int_placement_interior_14_x17dlc_int_tun_30d_l_milo_', 'xm_x17dlc_int_placement_interior_15_x17dlc_int_tun_straight_milo_', 'xm_x17dlc_int_placement_interior_16_x17dlc_int_tun_straight_milo_', 'xm_x17dlc_int_placement_interior_17_x17dlc_int_tun_slope_flat_milo_', 'xm_x17dlc_int_placement_interior_18_x17dlc_int_tun_slope_flat_milo_', 'xm_x17dlc_int_placement_interior_19_x17dlc_int_tun_flat_slope_milo_', 'xm_x17dlc_int_placement_interior_1_x17dlc_int_base_loop_milo_', 'xm_x17dlc_int_placement_interior_20_x17dlc_int_tun_flat_slope_milo_', 'xm_x17dlc_int_placement_interior_21_x17dlc_int_tun_30d_r_milo_', 'xm_x17dlc_int_placement_interior_22_x17dlc_int_tun_30d_r_milo_', 'xm_x17dlc_int_placement_interior_23_x17dlc_int_tun_30d_r_milo_', 'xm_x17dlc_int_placement_interior_24_x17dlc_int_tun_30d_r_milo_', 'xm_x17dlc_int_placement_interior_25_x17dlc_int_tun_30d_l_milo_', 'xm_x17dlc_int_placement_interior_26_x17dlc_int_tun_30d_l_milo_', 'xm_x17dlc_int_placement_interior_27_x17dlc_int_tun_30d_l_milo_', 'xm_x17dlc_int_placement_interior_28_x17dlc_int_tun_30d_l_milo_', 'xm_x17dlc_int_placement_interior_29_x17dlc_int_tun_30d_l_milo_', 'xm_x17dlc_int_placement_interior_2_x17dlc_int_bse_tun_milo_', 'xm_x17dlc_int_placement_interior_30_v_apart_midspaz_milo_', 'xm_x17dlc_int_placement_interior_31_v_studio_lo_milo_', 'xm_x17dlc_int_placement_interior_32_v_garagem_milo_', 'xm_x17dlc_int_placement_interior_33_x17dlc_int_02_milo_', 'xm_x17dlc_int_placement_interior_34_x17dlc_int_lab_milo_', 'xm_x17dlc_int_placement_interior_35_x17dlc_int_tun_entry_milo_', 'xm_x17dlc_int_placement_interior_3_x17dlc_int_base_milo_', 'xm_x17dlc_int_placement_interior_4_x17dlc_int_facility_milo_', 'xm_x17dlc_int_placement_interior_5_x17dlc_int_facility2_milo_', 'xm_x17dlc_int_placement_interior_6_x17dlc_int_silo_01_milo_', 'xm_x17dlc_int_placement_interior_7_x17dlc_int_silo_02_milo_', 'xm_x17dlc_int_placement_interior_8_x17dlc_int_sub_milo_', 'xm_x17dlc_int_placement_interior_9_x17dlc_int_01_milo_', 'xm_x17dlc_int_placement_strm_0', 'xm_prop_x17_tem_control_01', 'xm_prop_x17_l_door_glass_01', 'xm_prop_x17_l_door_frame_01', 'xm_prop_x17_l_glass_01', 'xm_prop_x17_l_glass_02', 'xm_prop_x17_l_glass_03', 'xm_prop_x17_l_frame_01', 'xm_prop_x17_l_frame_02', 'xm_prop_x17_l_frame_03', 'xm_bunkerentrance_door', 'xm_hatch_01_cutscene', 'xm_hatch_02_cutscene', 'xm_hatch_03_cutscene', 'xm_hatch_04_cutscene', 'xm_hatch_06_cutscene', 'xm_hatch_07_cutscene', 'xm_hatch_08_cutscene', 'xm_hatch_09_cutscene', 'xm_hatch_10_cutscene', 'xm_hatch_closed', 'xm_hatches_terrain', 'xm_hatches_terrain_lod', 'xm_mpchristmasadditions', 'xm_siloentranceclosed_x17'],

            // Commented are switchable props.
            props: ['set_int_02_shell', 'set_int_02_lounge1',
            // 'set_int_02_lounge2',
            // 'set_int_02_lounge3',
            // 'set_int_02_no_sleep',
            'set_int_02_sleep',
            // 'set_int_02_sleep2',
            // 'set_int_02_sleep3',
            // 'set_int_02_no_security',
            'set_int_02_security',
            // 'set_int_02_no_cannon',
            'set_int_02_cannon', 'set_int_02_decal_01',
            // 'set_int_02_decal_02',
            // 'set_int_02_decal_03',
            // 'set_int_02_decal_04',
            // 'set_int_02_decal_05',
            // 'set_int_02_decal_06',
            // 'set_int_02_decal_07',
            // 'set_int_02_decal_08',
            // 'set_int_02_decal_09',
            'set_int_02_trophy1',
            // 'set_int_02_trophy_iaa',
            // 'set_int_02_trophy_sub',
            'Set_Int_02_Parts_Panther1',
            // 'Set_Int_02_Parts_Panther2',
            // 'Set_Int_02_Parts_Panther3',
            'Set_Int_02_Parts_Riot1',
            // 'Set_Int_02_Parts_Riot2',
            // 'Set_Int_02_Parts_Riot3',
            'Set_Int_02_Parts_Cheno1',
            // 'Set_Int_02_Parts_Cheno2',
            // 'Set_Int_02_Parts_Cheno3',
            'Set_Int_02_Parts_Thruster1',
            // 'Set_Int_02_Parts_Thruster2',
            // 'Set_Int_02_Parts_Thruster3',
            'Set_Int_02_Parts_Avenger1',
            // 'Set_Int_02_Parts_Avenger2',
            // 'Set_Int_02_Parts_Avenger3',
            'set_int_02_clutter1', 'set_int_02_clutter2', 'set_int_02_clutter3', 'set_int_02_clutter4', 'set_int_02_clutter5', 'set_int_02_crewemblem', 'set_int_02_paramedic_complete', 'set_int_02_forcedentry_complete', 'set_int_02_aqualungs_complete', 'set_int_02_daylightrob_complete', 'set_int_02_burglary_complete', 'set_int_02_flightrecord_complete', 'Set_Int_02_outfit_serverfarm']
        };
        mp.events.add("setRemoteHashKey", key => {
            this.remoteHashKey = key;
        });
        mp.events.add('loadDoomsDayBunker', () => {
            doomsday.props.forEach(p => {
                mp.game.interior.enableInteriorProp(doomsday.interiorID, p);
                mp.game.invoke('0xC1F1920BAF281317', doomsday.interiorID, p, 1);
            });

            doomsday.ipls.forEach(ipl => {
                mp.game.streaming.requestIpl(ipl);
            });

            mp.game.interior.refreshInterior(doomsday.interiorID);
        });

        mp.events.add('unloadDoomsDayBunker', () => {
            doomsday.props.forEach(p => {
                mp.game.interior.disableInteriorProp(doomsday.interiorID, p);
            });
        });

        mp.events.add('unloadNightclubInterrior', () => {
            nightclub.allprops.forEach(prop => {
                mp.game.interior.disableInteriorProp(nightclub.interiorID, prop);
            });

            mp.game.interior.refreshInterior(nightclub.interiorID);
        });

        mp.events.add('loadNightclubInterrior', (style, drinks, lights, effects, clubName, entryLight, security) => {
            mp.game.streaming.requestIpl(nightclub.interiorName);

            nightclub.allprops.forEach(prop => {
                mp.game.interior.disableInteriorProp(nightclub.interiorID, prop);
            });

            mp.game.interior.enableInteriorProp(nightclub.interiorID, nightclub.props.interrior[parseInt(style)][0]);
            mp.game.interior.enableInteriorProp(nightclub.interiorID, nightclub.props.drinks[parseInt(drinks)][0]);
            mp.game.interior.enableInteriorProp(nightclub.interiorID, nightclub.props.lights[parseInt(lights)][0]);
            mp.game.interior.enableInteriorProp(nightclub.interiorID, nightclub.props.effects[parseInt(effects)][0]);
            mp.game.interior.enableInteriorProp(nightclub.interiorID, nightclub.props.clubname[parseInt(clubName)][0]);
            mp.game.interior.enableInteriorProp(nightclub.interiorID, nightclub.props.entrylights[parseInt(entryLight)][0]);
            mp.game.interior.enableInteriorProp(nightclub.interiorID, nightclub.props.security[parseInt(security)][0]);

            mp.game.interior.refreshInterior(nightclub.interiorID);
        });

        const blackmoneyCleanInterior = {
            interiorName: 'bkr_biker_interior_placement_interior_6_biker_dlc_int_ware05_milo',
            interiorID: 247809,
            props: ['counterfeit_setup', 'counterfeit_upgrade_equip', 'counterfeit_security', 'money_cutter', 'counterfeit_cashpile100a', 'counterfeit_cashpile100b', 'counterfeit_cashpile100c', 'counterfeit_cashpile100d']
        };

        const guenther = {
            interiorName: 'imp_sm_13_cargarage_a',
            interiorID: 255489,
            props: {
                room: ['garage_decor_04', 'numbering_style03_n1', 'lighting_option08']
            }
        };

        const lsc_hangar = {
            interiorName: 'sm_smugdlc_interior_placement_interior_0_smugdlc_int_01_milo_',
            interiorID: 260353,
            props: ['set_tint_shell', 'set_floor_1', 'set_floor_decal_3', 'set_modarea', 'set_office_modern', 'set_bedroom_modern', 'set_bedroom_tint', 'set_lightning_hangar_c', 'set_lightning_wall_tint01']

            //IPLs hei_dlc_casino_door, hei_dlc_windows_casino

        };mp.game.streaming.requestIpl('hei_dlc_casino_door');
        mp.game.streaming.requestIpl('hei_dlc_windows_casino');

        const intId = mp.game.interior.getInteriorAtCoords(976.636, 70.295, 115.164);
        props.forEach(p => {
            mp.game.interior.enableInteriorProp(intId, p);
            mp.game.invoke('0xC1F1920BAF281317', intId, p, 1);
        });
        mp.game.interior.refreshInterior(intId);

        mp.game.streaming.requestIpl(guenther.interiorName);
        mp.game.interior.refreshInterior(guenther.interiorID);

        mp.events.add('OnPlayerReady', player => {
            mp.gui.chat.show(false);
            mp.gui.chat.activate(false);
        });

        mp.events.add('updateAduty', aduty => {
            this.aduty = aduty;
            this.invincible = aduty;
            _playerPanel2.default.setAduty(aduty);
        });

        mp.events.add('setActiveRingtone', id => {
            this.activeRingtone = id;
        });

        mp.events.add('nagelband', () => {
            if (this.isInAnyVehicle(true)) {
                let vehicle = mp.players.local.vehicle;

                if (vehicle != null) {
                    vehicle.setTyreBurst(0, false, 1000);
                    vehicle.setTyreBurst(1, false, 1000);
                    vehicle.setTyreBurst(4, false, 1000);
                    vehicle.setTyreBurst(5, false, 1000);
                }
            }
        });

        mp.events.add('createObject', object => {

            this.buildingmode = true;

            this.buildingobject = [];
            this.buildingobject.hash = object;
            this.buildingobject.pos = mp.players.local.position;
            this.buildingobject.rot = new mp.Vector3(0, 0, mp.players.local.heading);
            this.buildingobject.obj = mp.objects.new(object, this.buildingobject.pos, {
                rotation: this.buildingobject.rot,
                alpha: 255,
                dimension: mp.players.local.dimension
            });
            mp.game.graphics.notify("object created.");
        });

        mp.events.add('closeObjectEditor', object => {
            this.buildingmode = false;

            this.buildingobject = [];
        });

        mp.events.add('responsePushToTalkSound', bool => {
            _playerPanel2.default.responsePPTSound(bool);
        });

        mp.events.add('isPlayerSwimming', () => {
            if (mp.players.local.isSwimmingUnderWater() || mp.players.local.isSwimming()) {
                mp.events.callRemote('swimmingOrDivingResponse', true, this.remoteHashKey);
            } else {
                mp.events.callRemote('swimmingOrDivingResponse', false, this.remoteHashKey);
            }
        });

        mp.events.add('updateWanteds', wanteds => {
            this.wanteds = wanteds;
            _playerPanel2.default.setWanteds(wanteds);
        });

        mp.events.add('updateMoney', money => {
            this.money = money;
            _playerPanel2.default.setMoney(money);
        });

        mp.events.add('updateAirRadio', state => {
            _playerPanel2.default.setAirRadio(state);
        });

        mp.events.add('setAirRadio', state => {
            _playerPanel2.default.setAirRadioState(state);
        });

        mp.events.add('setNutrition', (eating, drinking) => {
            _playerPanel2.default.setNutritionEating(eating);
            _playerPanel2.default.setNutritionDrinking(drinking);
        });

        mp.events.add('setNutritionEating', state => {
            _playerPanel2.default.setNutritionEating(state);
        });

        mp.events.add('setNutritionDrinking', state => {
            _playerPanel2.default.setNutritionDrinking(state);
        });

        mp.events.add('updateBlackMoney', money => {
            this.blackmoney = money;
            _playerPanel2.default.setBlackmoney(money);
        });

        mp.events.add('updateTeamId', teamId => {
            this.team = teamId;
        });

        mp.events.add('updateTeamRank', teamRank => {
            this.teamRank = teamRank;
        });

        mp.events.add('loadisland', status => {
            mp.game.invoke("0x9A9D1BA639675CF1", "HeistIsland", status);
            mp.game.invoke("0x5E1460624D194A38", status);
        });

        mp.events.add('updateGvmpTeamRank', gvmpTeamRank => {
            this.gvmpTeamRank = gvmpTeamRank;
        });

        mp.events.add('updateInjured', injured => {
            this.injured = injured;
        });

        mp.events.add('updateDuty', duty => {
            this.duty = duty;
        });

        mp.events.add('setcustommarks', (key, shtrange, data) => {

            if (this.custommarkers[key] == null) {
                this.custommarkers[key] = [];
            }

            if (this.custommarkers[key].length > 0) {
                this.custommarkers[key].forEach(customMarker => {
                    customMarker.mark.destroy();
                });
            }
            this.custommarkers[key] = JSON.parse(data);

            if (this.custommarkers[key].length > 0) {
                this.custommarkers[key].forEach(customMarker => {
                    customMarker.mark = mp.blips.new(customMarker.id, customMarker.pos, {
                        name: customMarker.name,
                        color: customMarker.color,
                        shortRange: shtrange
                    });
                });
            }
        });

        mp.events.add('clearcustommarks', key => {

            if (this.custommarkers[key] == null) {
                this.custommarkers[key] = [];
                return;
            }
            if (this.custommarkers[key].length > 0) {
                this.custommarkers[key].forEach(customMarker => {
                    customMarker.mark.destroy();
                });
            }
            this.custommarkers[key] = [];
        });

        mp.events.add('setCheckpoint', (x, y, z) => {

            if (this.currentCheckpoint != null) {
                this.currentCheckpoint.destroy();
                this.currentCheckpoint = null;
            }

            this.currentCheckpoint = mp.markers.new(1, new mp.Vector3(x, y, z - 1.0), 1.2, {
                direction: new mp.Vector3(0, 0, 0),
                rotation: new mp.Vector3(0, 0, 0),
                color: [255, 0, 0, 255],
                visible: true,
                dimension: 0
            });
        });

        mp.events.add('clearCheckpoint', () => {

            if (this.currentCheckpoint != null) {
                this.currentCheckpoint.destroy();
                this.currentCheckpoint = null;
                return;
            }
        });

        mp.events.add('createCustomObjects', (key, data) => {

            if (this.customObjects[key] == null) {
                this.customObjects[key] = [];
            }

            if (this.customObjects[key].length > 0) {
                this.customObjects[key].forEach(customObj => {
                    customObj.destroy();
                });
            }
            let objectsData = JSON.parse(data);
            let objects = [];

            if (objectsData !== undefined && objectsData.length > 0) {
                objectsData.forEach(objData => {
                    objects.push(mp.objects.new(objData.objectid, objData.pos, {
                        rotation: objData.rot,
                        alpha: 255,
                        dimension: 0
                    }));
                });

                this.customObjects[key] = objects;
            }
        });

        mp.events.add('removeCustomObjects', key => {

            if (this.customObjects[key] == null) {
                this.customObjects[key] = [];
                return;
            }
            if (this.customObjects[key].length > 0) {
                this.customObjects[key].forEach(customObj => {
                    customObj.destroy();
                });
            }
            this.customObjects[key] = [];
        });

        mp.events.add('removeAcMark', () => {
            if (this.acMark1 !== undefined) {
                this.acMark1.destroy();
                this.acMark1 = undefined;
            }
            if (this.acMark2 !== undefined) {
                this.acMark2.destroy();
                this.acMark2 = undefined;
            }
        });

        mp.events.add('setAcMark', (pos1, pos2) => {
            this.acMark1 = mp.blips.new(682, pos1, {
                name: "AC1",
                color: 2,
                shortRange: false
            });
            this.acMark2 = mp.blips.new(682, pos2, {
                name: "AC2",
                color: 1,
                shortRange: false
            });
        });

        mp.events.add('updateCuffed', cuffed => {
            this.cuffed = cuffed;
        });

        mp.events.add('updateTied', tied => {
            this.tied = tied;
        });

        mp.events.add('updateVoiceState', state => {
            this.state = state;
        });

        mp.events.add('setCurrentWeapon', id => {
            this.currentWeapon = id;
        });

        mp.events.add('emptyWeaponAmmo', id => {
            this.currentWeapon = 0;
            this.weaponAmmo = [];
            for (var x in this.weaponAmmo) {
                let ammo = this.weaponAmmo[x].ammo;
            }
        });

        mp.events.add('setPlayerGpsMarker', (x, y) => {
            mp.game.ui.setNewWaypoint(x, y);
        });

        mp.events.add('getWeaponAmmo', () => {
            mp.events.callRemote('getWeaponAmmoAnswer', JSON.stringify(this.weaponAmmo), this.remoteHashKey);
        });

        mp.events.add('fillWeaponAmmo', (id, ammo) => {
            this.weaponAmmo.push({
                id: id,
                ammo: ammo
            });
        });

        mp.events.add('updateWeaponAmmo', (id, ammo) => {
            for (var x in this.weaponAmmo) {
                if (this.weaponAmmo[x].id != id) {
                    continue;
                }

                this.weaponAmmo[x].ammo = ammo;
            }
        });

        mp.events.add('playerWeaponShot', (targetPosition, targetEntity) => {

            for (var x in this.weaponAmmo) {
                if (this.weaponAmmo[x].id != this.currentWeapon) {
                    continue;
                }
                this.weaponAmmo[x].ammo = this.weaponAmmo[x].ammo - 1;
            }
        });

        mp.events.add('onPlayerLoaded', (firstName, lastName, playerId, academicPoints, business, gwdNote, money, wanteds, house, team, teamRank, level, injured, duty, tied, cuffed, voiceHash, state, phone, job, jobsSkill, animations, gvmpTeamRank, weaponDmg, playerSync, vehicleSync, blackmoney, ringtone, insurance1, zwdNote, meleeDmg, dmglg) => {
            this.firstName = firstName;
            this.lastName = lastName;
            this.playerId = playerId;
            this.academicPoints = academicPoints;
            this.business = business;
            this.gwdNote = gwdNote;
            this.zwdNote = zwdNote;
            this.money = money;
            this.wanteds = wanteds;
            this.superjump = false;
            this.house = house;
            this.team = team;
            this.teamRank = teamRank;
            this.level = level;
            this.injured = injured;
            this.duty = duty;
            this.tied = tied;
            this.cuffed = cuffed;
            this.voiceHash = voiceHash;
            this.state = state;
            this.phone = phone;
            this.job = job;
            this.jobsSkill = jobsSkill;
            this.insurance = insurance1;
            this.animations = JSON.parse(animations);
            this.gvmpTeamRank = gvmpTeamRank;
            this.playerSync = playerSync;
            this.vehicleSync = vehicleSync;
            this.blackmoney = blackmoney;
            this.attachmentsync = true;
            this.activeRingtone = ringtone;
            this.weaponDmg = weaponDmg;
            this.meleeDmg = meleeDmg;
            this.dmglg = dmglg;

            _hud2.default.setVisible(true);
            _playerPanel2.default.setMoney(money);
            _playerPanel2.default.setBlackmoney(blackmoney);
            _playerPanel2.default.setWanteds(wanteds);
            _playerinfo2.default.setPlayerId(playerId);
            _playerinfo2.default.setVoiceHash(voiceHash);

            mp.game.controls.useDefaultVehicleEntering = false;

            mp.game.player.setWeaponDamageModifier(this.weaponDmg);
            mp.game.player.setMeleeWeaponDamageModifier(this.meleeDmg);

            this.ready = true;
            render();
        });

        mp.events.add('loadClientIpl', ipl => {
            mp.game.streaming.requestIpl(ipl);
        });

        mp.events.add('setVoiceHash', voiceHash => {
            this.voiceHash = voiceHash;
        });

        mp.events.add('unloadClientIpl', ipl => {
            mp.game.streaming.removeIpl(ipl);
        });

        mp.events.add('updateWeather', weatherString => {
            mp.game.gameplay.setWeatherTypeNowPersist(weatherString);
        });

        mp.events.add('setWeatherTransition', (weatherString, transitionTime) => {
            mp.game.gameplay.setWeatherTypeOverTime(weatherString, transitionTime);
        });

        const render = async () => {
            while (true) {
                if (this.ready === false) {
                    await mp.game.waitAsync(50);
                    continue;
                }

                if (mp.game.invoke('0x26AF0E8E30BD2A2C', mp.players.local.handle, true)) {
                    this.isOpeningDoor = true;
                } else {
                    if (this.isOpeningDoor) {
                        this.isOpeningDoor = false;
                        await this.checkAnimations(mp.players.local);
                    }
                }

                if (mp.players.local.isInWater() && this.isInWater === false) {
                    this.isInWater = true;
                    mp.events.callRemote('UpdatePlayerWaterState', true, this.remoteHashKey);
                } else {
                    if (mp.players.local.isInWater() === false && this.isInWater === true) {
                        this.isInWater = false;
                        mp.events.callRemote('UpdatePlayerWaterState', true, this.remoteHashKey);
                    }
                }

                if (mp.players.local.hasCollidedWithAnything()) {
                    this.HasCollided = true;
                } else {
                    if (this.HasCollided === true) {
                        this.HasCollided = false;
                        await this.checkAnimations(mp.players.local);
                    }
                }

                if (mp.players.local.isRagdoll()) {
                    this.HasRagdall = true;
                } else {
                    if (this.HasRagdall === true) {
                        this.HasRagdall = false;
                        let that = this;
                        setTimeout(async function () {
                            await that.checkAnimations(mp.players.local);
                        }, 2000);
                    }
                }

                await mp.game.waitAsync(50);
            }
        };

        mp.events.add('setPlayerDamageMultiplier', weaponDmg => {
            this.weaponDmg = weaponDmg;
            mp.game.player.setWeaponDamageModifier(weaponDmg);
        });

        mp.events.add('setPlayerMeleeDamageMultiplier', weaponDmg => {
            this.meleeDmg = weaponDmg;
            mp.game.player.setMeleeWeaponDamageModifier(this.meleeDmg);
        });

        mp.events.add('setDmgLg', state => {
            this.dmglg = state;
        });

        mp.events.add('setNMenuItems', data => {
            this.animations = JSON.parse(data);
        });

        mp.events.add('onPlayerContactsLoaded', contacts => {
            this.contacts.parseContacts(contacts);
        });

        mp.events.add('setPlayerAduty', state => {
            mp.players.local.setInvincible(state);
            mp.nametags.enabled = state;
            _playerPanel2.default.setAduty(state);
            this.invincible = state;
        });

        mp.events.add('loadMethInterior', (table, boiler, security) => {
            mp.game.streaming.requestIpl(methlaboratory.interiorName);
            methlaboratory.props.table.forEach(prop => {
                mp.game.interior.disableInteriorProp(methlaboratory.interiorID, prop);
            });
            methlaboratory.props.boiler.forEach(prop => {
                mp.game.interior.disableInteriorProp(methlaboratory.interiorID, prop);
            });
            methlaboratory.props.security.forEach(prop => {
                mp.game.interior.disableInteriorProp(methlaboratory.interiorID, prop);
            });
            mp.game.interior.enableInteriorProp(methlaboratory.interiorID, methlaboratory.props.table[table]);
            mp.game.interior.enableInteriorProp(methlaboratory.interiorID, methlaboratory.props.boiler[boiler]);
            mp.game.interior.enableInteriorProp(methlaboratory.interiorID, methlaboratory.props.security[security]);
            mp.game.interior.refreshInterior(methlaboratory.interiorID);
        });

        mp.events.add('carmod', (vehicle, slot, tuning) => {
            if (vehicle == null) {
                return;
            }
            vehicle.setMod(parseInt(slot), parseInt(tuning));
        });

        mp.events.add('livery', (vehicle, liveryindex) => {
            mp.game.invoke("0x60BF608F1B8CD1B6", vehicle.handle, liveryindex);
        });

        mp.events.add('unloadMethInterior', () => {
            methlaboratory.props.table.forEach(prop => {
                mp.game.interior.disableInteriorProp(methlaboratory.interiorID, prop);
            });
            methlaboratory.props.boiler.forEach(prop => {
                mp.game.interior.disableInteriorProp(methlaboratory.interiorID, prop);
            });
            methlaboratory.props.security.forEach(prop => {
                mp.game.interior.disableInteriorProp(methlaboratory.interiorID, prop);
            });
            mp.game.streaming.requestIpl(methlaboratory.interiorName);
            mp.game.interior.refreshInterior(methlaboratory.interiorID);
        });

        mp.events.add('loadblackmoneyInterior', () => {
            mp.game.streaming.requestIpl(blackmoneyCleanInterior.interiorName);
            blackmoneyCleanInterior.props.forEach(prop => {
                mp.game.interior.enableInteriorProp(blackmoneyCleanInterior.interiorID, prop);
            });
            mp.game.interior.refreshInterior(blackmoneyCleanInterior.interiorID);
        });

        mp.events.add('unloadblackmoneyInterior', () => {
            blackmoneyCleanInterior.props.forEach(prop => {
                mp.game.interior.disableInteriorProp(blackmoneyCleanInterior.interiorID, prop);
            });
            mp.game.interior.refreshInterior(blackmoneyCleanInterior.interiorID);
        });

        mp.events.add('loadguenther', () => {
            mp.game.streaming.requestIpl(guenther.interiorName);
            guenther.props.room.forEach(prop => {
                mp.game.interior.enableInteriorProp(guenther.interiorID, prop);
            });
            mp.game.interior.refreshInterior(guenther.interiorID);
        });

        mp.events.add('unloadguenther', () => {
            mp.game.streaming.requestIpl(guenther.interiorName);
            guenther.props.room.forEach(prop => {
                mp.game.interior.disableInteriorProp(guenther.interiorID, prop);
            });
            mp.game.interior.refreshInterior(guenther.interiorID);
        });

        mp.events.add('loadlschangar', () => {
            mp.game.streaming.requestIpl(lsc_hangar.interiorName);
            lsc_hangar.props.forEach(prop => {
                mp.game.interior.enableInteriorProp(lsc_hangar.interiorID, prop);
                mp.game.invoke('0xC1F1920BAF281317', lsc_hangar.interiorID, prop, 2);
            });
            mp.game.interior.refreshInterior(lsc_hangar.interiorID);
        });

        mp.events.add('unloadlschangar', () => {
            lsc_hangar.props.forEach(prop => {
                mp.game.interior.disableInteriorProp(lsc_hangar.interiorID, prop);
            });
            mp.game.streaming.requestIpl(lsc_hangar.interiorName);
            mp.game.interior.refreshInterior(lsc_hangar.interiorID);
        });

        mp.events.add("updatesuperjump", sj => {
            this.superjump = sj;
        });

        mp.events.add('loadplanningroom', (grundraum, spiegel, einrichtungsstyle, inneneinrichtung, spielautomaten, rewards, keller, mechanic, hacker, weapons, wardrobe, casinoplan, casinodoor) => {
            // Request both ipls
            mp.game.streaming.requestIpl(planningroom.arcade.interiorName);
            mp.game.streaming.requestIpl(planningroom.plan.interiorName);

            // Dissable all props
            planningroom.arcade.allprops.forEach(prop => {
                mp.game.interior.disableInteriorProp(planningroom.arcade.Id, prop);
            });
            planningroom.plan.allprops.forEach(prop => {
                mp.game.interior.disableInteriorProp(planningroom.plan.Id, prop);
            });

            // Load propertys arcade
            planningroom.arcade.props.grundraum[parseInt(grundraum)].forEach(prop => {
                mp.game.interior.enableInteriorProp(planningroom.arcade.Id, prop);
            });
            planningroom.arcade.props.spiegel[parseInt(spiegel)].forEach(prop => {
                mp.game.interior.enableInteriorProp(planningroom.arcade.Id, prop);
            });
            planningroom.arcade.props.einrichtungsstyle[parseInt(einrichtungsstyle)].forEach(prop => {
                mp.game.interior.enableInteriorProp(planningroom.arcade.Id, prop);
            });
            planningroom.arcade.props.inneneinrichtung[parseInt(inneneinrichtung)].forEach(prop => {
                mp.game.interior.enableInteriorProp(planningroom.arcade.Id, prop);
            });
            planningroom.arcade.props.spielautomaten[parseInt(spielautomaten)].forEach(prop => {
                mp.game.interior.enableInteriorProp(planningroom.arcade.Id, prop);
            });
            var rewardIds = JSON.parse(rewards);
            rewardIds.forEach(prop => {
                mp.game.interior.enableInteriorProp(planningroom.arcade.Id, planningroom.arcade.props.rewards[parseInt(prop)]);
            });

            // Load propertys plan
            planningroom.plan.props.kellerraum[parseInt(keller)].forEach(prop => {
                mp.game.interior.enableInteriorProp(planningroom.plan.Id, prop);
            });

            planningroom.plan.props.Mechanic[parseInt(mechanic)].forEach(prop => {
                mp.game.interior.enableInteriorProp(planningroom.plan.Id, prop);
            });

            planningroom.plan.props.Hacker[parseInt(hacker)].forEach(prop => {
                mp.game.interior.enableInteriorProp(planningroom.plan.Id, prop);
            });

            planningroom.plan.props.Weapons[parseInt(weapons)].forEach(prop => {
                mp.game.interior.enableInteriorProp(planningroom.plan.Id, prop);
            });

            planningroom.plan.props.Wardrobe[parseInt(wardrobe)].forEach(prop => {
                mp.game.interior.enableInteriorProp(planningroom.plan.Id, prop);
            });

            planningroom.plan.props.CasinoPlan[parseInt(casinoplan)].forEach(prop => {
                mp.game.interior.enableInteriorProp(planningroom.plan.Id, prop);
            });

            planningroom.plan.props.CasinoDoor[parseInt(casinodoor)].forEach(prop => {
                mp.game.interior.enableInteriorProp(planningroom.plan.Id, prop);
            });

            // Reload
            mp.game.interior.refreshInterior(planningroom.arcade.Id);
            mp.game.interior.refreshInterior(planningroom.plan.Id);
        });

        mp.events.add('attachmeto', target => {
            mp.players.local.attachTo(target.handle, target.getBoneIndex(28422), 0, 0, 0, 0, 0, 0, false, false, false, false, 2, true);
        });

        mp.events.add('unloadplanningroom', () => {
            planningroom.arcade.allprops.forEach(prop => {
                mp.game.interior.disableInteriorProp(planningroom.arcade.Id, prop);
            });
            mp.game.streaming.requestIpl(planningroom.arcade.interiorName);
            mp.game.interior.refreshInterior(planningroom.arcade.Id);
        });

        mp.events.add('destroydrugped', () => {
            if (this.spawnedDrugPed != null) {
                this.spawnedDrugPed.destroy();
                this.spawnedDrugPed = null;
            }
        });

        mp.events.add('loadprop', (propname, color, x, y, z) => {
            var myInteriorId = mp.game.interior.getInteriorAtCoords(parseFloat(x), parseFloat(y), parseFloat(z));
            mp.game.interior.enableInteriorProp(parseInt(myInteriorId), String(propname));
            mp.game.invoke('0xC1F1920BAF281317', parseInt(myInteriorId), String(propname), parseInt(color));
            mp.game.interior.refreshInterior(parseInt(myInteriorId));
        });

        mp.events.add('removeprop', (propname, x, y, z) => {
            var myInteriorId = mp.game.interior.getInteriorAtCoords(parseFloat(x), parseFloat(y), parseFloat(z));
            mp.game.interior.disableInteriorProp(parseInt(myInteriorId), String(propname));
            mp.game.interior.refreshInterior(parseInt(myInteriorId));
        });

        var checkpoints = [];

        mp.events.add('loadcheckpoint', () => {
            for (let i = 0; i < 10; i++) {
                let checkpoint = mp.checkpoints.new(1, new mp.Vector3(20 * i, 20 * i, 100), 10, {
                    direction: new mp.Vector3(0, 0, 75),
                    color: [255, 255, 255, 255],
                    visible: true,
                    dimension: 0
                });
                checkpoint.destination = new mp.Vector3(20 * (i + 1), 20 * (i + 1), 100);
                checkpoints.push(checkpoint);
            }
        });

        mp.events.add('unloadcheckpoint', () => {
            checkpoints.forEach(element => {
                element.destroy();
            });
        });

        var raceMarker;

        mp.events.add('startRace', (x, y, z, dim) => {
            mp.game.ui.setNewWaypoint(x, y);
            raceMarker = mp.markers.new(4, new mp.Vector3(x, y, z), 5.0, {
                direction: new mp.Vector3(0, 0, 0),
                rotation: new mp.Vector3(0, 0, 0),
                color: [0, 255, 0, 255],
                visible: true,
                dimension: dim
            });
        });

        mp.events.add('endRace', () => {
            if (raceMarker != null) raceMarker.destroy();
        });

        var setMarkMarker;

        mp.events.add('setmark', (x, y, z, dim) => {
            if (setMarkMarker != null) {
                setMarkMarker.destroy();
                setMarkMarker = null;
            }
            setMarkMarker = mp.markers.new(0, new mp.Vector3(x, y, z), 1.0, {
                direction: new mp.Vector3(0, 0, 0),
                rotation: new mp.Vector3(0, 0, 0),
                color: [255, 0, 0, 255],
                visible: true,
                dimension: dim
            });
        });

        //Explosion
        mp.events.add('boom', (x, y, z, exploType) => {
            mp.game.invoke('0xE3AD2BDBAEE269AC', x, y, z, parseInt(exploType), 1, 1, 0, 1065353216, 0);
        });

        //Vehicle Explosion
        mp.events.add('boom2', () => {
            if (!mp.players.local.vehicle) return;
            mp.game.invoke('0xBA71116ADF5B514C', mp.players.local.vehicle.handle, true, true);
        });

        mp.events.add('setPlayerCduty', state => {
            this.cduty = state;
        });

        mp.events.add('setPlayerNametags', state => {
            mp.nametags.enabled = state;
        });

        mp.events.add('setPlayerVehicleMultiplier', value => {
            if (!mp.players.local.vehicle) return;
            mp.players.local.vehicle.setEnginePowerMultiplier(value);
            mp.players.local.vehicle.setInvincible(false);
        });

        mp.events.add('createPlayerMarker', destroyLocation => {
            this.marker = mp.markers.new(22, destroyLocation, 2, {
                color: [255, 255, 255, 100],
                visible: true
            });
        });

        mp.events.add('destroyPlayerMarker', () => {
            this.marker.destroy();
            this.marker = null;
        });

        mp.events.add('setSpawnProtection', state => {
            mp.players.local.setInvincible(state);
            this.invincible = state;
        });

        mp.events.add('setInvincible', state => {
            mp.players.local.setInvincible(state);
            this.invincible = state;
        });

        mp.events.add('setBlackout', state => {
            for (let i = 0; i <= 16; i++) {
                mp.game.graphics.setLightsState(i, state);
            }
        });

        mp.events.add('enableInteriorProp', (id, name) => {
            mp.game.interior.enableInteriorProp(id, name);
        });

        mp.events.add('startsoundplay', (soundName, soundSetName) => {
            mp.game.audio.playSoundFrontend(-1, soundName, soundSetName, true);
        });

        mp.events.add('startmusicevent', async soundName => {
            mp.events.call("stopmusicevent");
            mp.game.audio.prepareMusicEvent(soundName);
            await mp.game.waitAsync(1000);
            mp.game.audio.triggerMusicEvent(soundName);
            this.lastMusicEvent = soundName;
        });

        mp.events.add('stopmusicevent', () => {
            if (this.lastMusicEvent !== undefined) {
                mp.game.audio.cancelMusicEvent(this.lastMusicEvent);
                this.lastMusicEvent = undefined;
            }
        });

        mp.events.add('startScreenEffect', (effectName, duration, looped) => {
            mp.game.graphics.startScreenEffect(effectName, duration, looped);
            if (effectName == 'DefaultFlash') {
                mp.game.graphics.transitionToBlurred(250);
            }
        });

        mp.events.add('stopScreenEffect', effectName => {
            mp.game.graphics.stopScreenEffect(effectName);
            if (effectName == 'DefaultFlash') {
                mp.game.graphics.transitionFromBlurred(250);
            }
        });

        mp.events.add('refreshinterior', id => {
            mp.game.interior.refreshInterior(id);
        });

        mp.events.add('setTM', state => {
            mp.game.graphics.setSeethrough(state);
        });

        mp.events.add('setNS', state => {
            mp.game.graphics.setNightvision(state);
        });

        mp.events.add('getInteriorId', () => {
            _playernotification2.default.callOnBrowser(`pushPlayerNotification('${mp.game.interior.getInteriorAtCoords(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z)}', '5000')`);
        });

        mp.events.add('disableInteriorProp', (id, name) => {
            mp.game.interior.disableInteriorProp(id, name);
        });

        mp.events.add('entityStreamIn', entity => {
            if (entity != null && entity.type == "player") {
                if (!mp.players.exists(entity)) return;

                mp.events.callRemote("requestPlayerSyncData", entity, this.remoteHashKey);
            }
        });

        mp.events.add('responsePlayerSyncData', async (player, isDrunk, animationData, crouchState, props, clothes) => {
            try {
                props = JSON.parse(props);
                if (props !== null) {
                    for (const i in props) {
                        player.setPropIndex(parseInt(i), parseInt(props[i][0]), parseInt(props[i][1]), false);
                    }
                }

                await this.setPlayerDrunk(player, isDrunk);

                clothes = JSON.parse(clothes);
                if (clothes !== null) {
                    for (const i in clothes) {
                        player.setComponentVariation(parseInt(i), parseInt(clothes[i][0]), parseInt(clothes[i][1]), 0);
                    }
                }

                animationData = JSON.parse(animationData);
                player.__animationData = animationData;
                if (player.__animationData.Active == true) {
                    await this.checkAnimations(player);
                    player.setHeading(player.__animationData.Heading);
                }

                if (crouchState) {
                    player.setMovementClipset("move_ped_crouched", 0.25);
                    player.setStrafeClipset("move_ped_crouched_strafing");
                }
            } catch (e) {
                // Ignore
            }
        });

        mp.events.add('SetOwnAnimData', animationData => {
            try {
                animationData = JSON.parse(animationData);
                mp.players.local.__animationData = animationData;
            } catch (e) {
                // Ignore
            }
        });

        mp.events.add('SetAnimDataNear', (player, animationData) => {
            try {
                animationData = JSON.parse(animationData);
                player.__animationData = animationData;
            } catch (e) {
                // Ignore
            }
        });

        mp.events.add('setPlayerDrunk', async (player, state) => {
            await this.setPlayerDrunk(player, state);
        });

        mp.events.add('setCloth', (player, slot, drawable, texture) => {
            if (player == null) return;
            player.setComponentVariation(slot, drawable, texture, 0);
        });

        mp.events.add('moveSkyCamera', (player, moveTo, switchType, showGui) => {
            switch (moveTo) {
                case 'up':
                    if (showGui == false) {
                        mp.gui.chat.show(showGui);
                        this.gui = 'false';
                    }

                    mp.game.invoke(this.natives.SWITCH_OUT_PLAYER, player.handle, 0, parseInt(switchType));

                    break;
                case 'down':
                    if (this.gui == 'false') {
                        this.checkCamInAir();
                    }

                    mp.game.invoke(this.natives.SWITCH_IN_PLAYER, player.handle);
                    break;
                default:
                    break;
            }
        });

        mp.events.add('setSyncDataState', (playerSync, vehicleSync) => {
            this.playerSync = playerSync;
            this.vehicleSync = vehicleSync;
        });

        mp.discord.update('German V Roleplay', 'GVMP.de');
    }

    async checkAnimations(entity) {
        try {
            if (entity.__animationData != undefined && entity.__animationData != null) {
                if (entity.__animationData.Active == true && !entity.vehicle) {
                    mp.game.streaming.requestAnimDict(entity.__animationData.AnimationDict);
                    while (!mp.game.streaming.hasAnimDictLoaded(entity.__animationData.AnimationDict)) {
                        await mp.game.waitAsync(5);
                    }

                    entity.taskPlayAnim(entity.__animationData.AnimationDict, entity.__animationData.AnimationName, entity.__animationData.AnimationSpeed, 1.0, -1, entity.__animationData.AnimationFlags, 1.0, false, false, false);
                } else {}
            } else {}
        } catch (e) {
            mp.game.graphics.notify("Exception - Animations: Falls bestehen bleibt, bitte reloggen!");
        }
    }

    checkCamInAir() {
        if (mp.game.invoke(this.natives.IS_PLAYER_SWITCH_IN_PROGRESS)) {
            setTimeout(() => {
                this.checkCamInAir();
            }, 400);
        }
    }

    async setPlayerDrunk(player, state) {
        if (state) {
            mp.game.streaming.requestAnimSet('move_m@drunk@verydrunk');

            while (!mp.game.streaming.hasAnimSetLoaded('move_m@drunk@verydrunk')) {
                await mp.game.waitAsync(5);
            }

            player.setMovementClipset('move_m@drunk@verydrunk', 1);
        } else {
            player.resetMovementClipset(0);
        }
    }

    setPlayerChatFlag(flag) {
        this.chatFlag = flag;
    }

    getPlayer() {
        return mp.players.local;
    }

    calculateVectorDistance(position) {
        return _utils2.default.calculateVectorDistance(this.getPlayer().position, position);
    }

    getDistance(position) {
        return _utils2.default.getDistance(this.getPlayer().position, position, true);
    }

    isInAnyVehicle() {
        return this.getPlayer().isInAnyVehicle(true);
    }

    isInAir() {
        return this.getPlayer().isInAir();
    }
}

exports.default = new Player();

},{"../attachments/attachments":92,"../interfaces/hud/hud":135,"../interfaces/hud/player-panel":141,"../interfaces/hud/playerinfo":142,"../interfaces/hud/playernotification":143,"../utils/utils":195,"./contacts/contacts":184,"./telefonHistory/historys":188}],187:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
class History {
    constructor(contact, number, time, accepted, method) {
        this.contact = contact;
        this.number = number;
        this.time = time;
        this.accepted = accepted;
        this.method = method;
    }
}

exports.default = History;

},{}],188:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _history = require("./history");

var _history2 = _interopRequireDefault(_history);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Historys {
    constructor() {
        this.historys = new Map();
    }

    addCallToHistory(contact, number, time, accepted, method) {
        this.historys.set(time, new _history2.default(contact, number, time, accepted, method));
    }

    toJson() {
        var historys = [];
        for (let value of this.historys.values()) {
            historys.push(value);
        }
        return JSON.stringify(historys);
    }
}

exports.default = Historys;

},{"./history":187}],189:[function(require,module,exports){
"use strict";

const Natives = {
    GIVE_WEAPON_COMPONENT_TO_PED: "0xD966D51AA5B28BB9",
    REMOVE_WEAPON_COMPONENT_FROM_PED: "0x1E8BE90C74FB4C09",
    SET_CURRENT_PED_WEAPON: "0xADF692B254977C0C",
    GIVE_WEAPON_TO_PED: "0xBF0FD6E56C964FCB"
};

function addComponentToPlayer(player, weaponHash, componentHash) {
    if (!player) return;

    if (!player.hasOwnProperty("__weaponComponentData")) player.__weaponComponentData = {};
    if (!player.__weaponComponentData.hasOwnProperty(weaponHash)) player.__weaponComponentData[weaponHash] = new Set();

    player.__weaponComponentData[weaponHash].add(componentHash);
    mp.game.invoke(Natives.GIVE_WEAPON_COMPONENT_TO_PED, player.handle, weaponHash >> 0, componentHash >> 0);
}

function removeComponentFromPlayer(player, weaponHash, componentHash) {
    if (!player) return;

    if (!player.hasOwnProperty("__weaponComponentData")) player.__weaponComponentData = {};
    if (!player.__weaponComponentData.hasOwnProperty(weaponHash)) player.__weaponComponentData[weaponHash] = new Set();

    player.__weaponComponentData[weaponHash].delete(componentHash);
    mp.game.invoke(Natives.REMOVE_WEAPON_COMPONENT_FROM_PED, player.handle, weaponHash >> 0, componentHash >> 0);
}

mp.events.add("updatePlayerWeaponComponent", (player, weaponHash, componentHash, removeComponent) => {
    if (removeComponent) {
        removeComponentFromPlayer(player, weaponHash, componentHash);
    } else {
        addComponentToPlayer(player, weaponHash, componentHash);
    }
});

mp.events.add("resetPlayerWeaponComponents", (player, weaponHash) => {
    if (!player) return;

    if (!player.hasOwnProperty("__weaponComponentData")) return;
    if (!player.__weaponComponentData.hasOwnProperty(weaponHash)) return;

    for (let component of player.__weaponComponentData[weaponHash]) {
        if (!component) continue;
        mp.game.invoke(Natives.REMOVE_WEAPON_COMPONENT_FROM_PED, player.handle, weaponHash >> 0, component >> 0);
    }
    player.__weaponComponentData[weaponHash].clear();
});

mp.events.add("nukePlayerWeaponComponents", player => {
    if (!player || !player.hasOwnProperty("__weaponComponentData")) return;

    for (let weapon in player.__weaponComponentData) {
        for (let component of player.__weaponComponentData[weapon]) {
            if (!component) continue;
            mp.game.invoke(Natives.REMOVE_WEAPON_COMPONENT_FROM_PED, player.handle, weapon >> 0, component >> 0);
        }
    }

    player.__weaponComponentData = {};
});

mp.events.add("entityStreamIn", entity => {
    if (entity != null && entity.type === "player") {
        if (!mp.players.exists(entity)) return;

        let data = entity.getVariable("currentWeaponComponents");

        if (data) {
            let [weaponHash, components] = data.split(".");
            let componentsArray = components && components.length > 0 ? components.split('|') : [];

            // don't touch this or you will have a bad time
            mp.game.invoke(Natives.GIVE_WEAPON_TO_PED, entity.handle, weaponHash >> 0, -1, false, true);
            for (let component of componentsArray) addComponentToPlayer(entity, weaponHash, component);
            mp.game.invoke(Natives.SET_CURRENT_PED_WEAPON, entity.handle, weaponHash >> 0, true);
        }
    }
});

mp.events.add("entityStreamOut", entity => {
    if (entity.type === "player" && entity.hasOwnProperty("__weaponComponentData")) entity.__weaponComponentData = {};
});

mp.events.addDataHandler("currentWeaponComponents", (entity, value) => {
    if (entity.type === "player" && entity.handle !== 0) {
        if (!entity.hasOwnProperty("__weaponComponentData")) entity.__weaponComponentData = {};

        let [weaponHash, components] = value.split(".");

        if (!entity.__weaponComponentData.hasOwnProperty(weaponHash)) entity.__weaponComponentData[weaponHash] = new Set();

        let currentComponents = entity.__weaponComponentData[weaponHash];
        let newComponents = components && components.length > 0 ? components.split('|') : [];

        for (let component of currentComponents) {
            if (!component) continue;
            if (!newComponents.includes(component)) removeComponentFromPlayer(entity, weaponHash, component);
        }

        for (let component of newComponents) addComponentToPlayer(entity, weaponHash, component);
        mp.game.invoke(Natives.SET_CURRENT_PED_WEAPON, entity.handle, weaponHash >> 0, true);

        entity.__weaponComponentData[weaponHash] = new Set(newComponents);
    }
});

},{}],190:[function(require,module,exports){
"use strict";

var _player = require("../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const player = mp.players.local;
let jet = false;
let pedplayer = false;
let cutsceneEnded = false;
let CharacterName = false;
let CharacterGender = 0;

mp.events.add("doneCutscene", () => {
    mp.game.audio.triggerMusicEvent("FM_INTRO_DRIVE_END");
    mp.game.invoke("0xD220BDD222AC4A1E");
    mp.gui.cursor.show(false, false);
    player.setAlpha(255);

    // NOTICE
    mp.game.invoke("0xEA1C610A04DB6BBB", pedplayer, false, false);
    // Hide Ped (Deleting Ped crashes Game)

    setTimeout(() => {
        mp.game.cam.doScreenFadeOut(100);
    }, 100);

    setTimeout(() => {
        mp.game.cam.doScreenFadeIn(100);
    }, 2000);

    player.setInvincible(false);
    mp.events.callRemote("cutsceneEnded", _player2.default.remoteHashKey);
});

mp.events.add("startWelcomeCutscene", async (gender = 0, name = null) => {
    if (name !== null) {
        CharacterName = name;
    }
    if (gender !== 0) {
        CharacterGender = gender;
    }

    player.setInvincible(true);

    mp.game.cam.doScreenFadeOut(0);
    //create hud ready for them to spawn
    mp.gui.cursor.show(false, false);
    mp.game.audio.setAudioFlag("DisableFlightMusic", true);
    player.clearTasksImmediately();
    player.position = new mp.Vector3(-1117.778, -1557.625, 3.3819);
    player.setInvincible(true);

    mp.game.audio.prepareMusicEvent("FM_INTRO_START");
    //Clone Current Ped
    const pedplayer = mp.game.invoke("0xEF29A16337FACADB", player.handle, 0, false, false);

    //Make Player Invisible
    player.setAlpha(0);
    mp.game.cam.renderScriptCams(false, false, 0, false, false);

    mp.game.cutscene.requestCutscene("mp_intro_concat", 1);

    while (!mp.game.cutscene.hasThisCutsceneLoaded("mp_intro_concat")) {
        await mp.game.waitAsync(5);
    }

    //Render Jet
    const hash = mp.game.joaat("p_cs_mp_jet_01_s");
    jet = mp.game.object.createObject(hash, -1200, -1490, 142.385, false, true, false);

    mp.game.invoke("0x3910051CCECDB00C", jet, false);
    mp.game.invoke("0xEA1C610A04DB6BBB", jet, true, false);

    // Attach Jet to Cutscene
    mp.game.cutscene.registerEntityForCutscene(jet, "MP_Plane", 0, 0, 0);

    if (CharacterGender == 0) {
        // Remove Female NPC from Cutscene
        mp.game.cutscene.registerEntityForCutscene(0, "MP_Female_Character", 3, mp.game.joaat("mp_f_freemode_01"), 0);
        mp.game.cutscene.registerEntityForCutscene(pedplayer, "MP_Male_Character", 0, 0, 0);
    } else {
        // Remove Male NPC from Cutscene
        mp.game.cutscene.registerEntityForCutscene(0, "MP_Male_Character", 3, mp.game.joaat("mp_m_freemode_01"), 0);
        mp.game.cutscene.registerEntityForCutscene(pedplayer, "MP_Female_Character", 0, 0, 0);
    }
    mp.game.invoke("0xEA1C610A04DB6BBB", pedplayer, true, false);

    for (let i = 1; i < 8; i++) {
        mp.game.cutscene.registerEntityForCutscene(0, "MP_Plane_Passenger_" + i, 3, mp.game.joaat("mp_m_freemode_01"), 0);
        mp.game.invoke("0x4C61C75BEE8184C2", "MP_Plane_Passenger_" + i, 0, 0);
    }

    mp.game.invoke("0xE532F5D78798DAAB", hash);
    setTimeout(() => {
        mp.game.cutscene.startCutscene(4);
        mp.game.invoke("0xBEB2D9A1D9A8F55A", 9, 9, 9, 9);
        mp.game.cam.doScreenFadeIn(500);
        mp.game.audio.triggerMusicEvent("FM_INTRO_START");
    }, 500);
});

mp.events.add("render", () => {
    const time = mp.game.invoke("0xE625BEABBAFFDAB9");
    if (time !== 0 && cutsceneEnded == false) {
        if (time > 26000) {
            cutsceneEnded = true;
            mp.events.call("doneCutscene");
        }
    }
});

},{"../player/player":186}],191:[function(require,module,exports){
'use strict';

var _player = require('../player/player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getNormalizedVector = function (vector) {
    var mag = Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
    vector.x = vector.x / mag;
    vector.y = vector.y / mag;
    vector.z = vector.z / mag;
    return vector;
};
var getCrossProduct = function (v1, v2) {
    var vector = new mp.Vector3(0, 0, 0);
    vector.x = v1.y * v2.z - v1.z * v2.y;
    vector.y = v1.z * v2.x - v1.x * v2.z;
    vector.z = v1.x * v2.y - v1.y * v2.x;
    return vector;
};

var bindASCIIKeys = {
    Q: 69,
    E: 81,
    LCtrl: 17,
    Shift: 16
};

var isNoClip = false;
var noClipCamera;
var shiftModifier = false;
var controlModifier = false;
var localPlayer = mp.players.local;

mp.events.add('toggleNoClip', state => {
    isNoClip = state;
    mp.game.ui.displayRadar(!isNoClip);
    if (isNoClip) {
        startNoClip();
    } else {
        stopNoClip();
    }
});

mp.events.add('gotocam', pos => {
    if (noClipCamera) {
        pos = JSON.parse(pos);
        noClipCamera.setCoord(pos.x, pos.y, pos.z);
    }
});

function startNoClip() {
    var camPos = new mp.Vector3(localPlayer.position.x, localPlayer.position.y, localPlayer.position.z);
    var camRot = mp.game.cam.getGameplayCamRot(2);
    noClipCamera = mp.cameras.new('default', camPos, camRot, 45);
    noClipCamera.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);
    localPlayer.freezePosition(true);
    localPlayer.setInvincible(true);
    localPlayer.setVisible(false, false);
    localPlayer.setCollision(false, false);
    mp.nametags.enabled = true;
}
function stopNoClip() {
    if (noClipCamera) {
        localPlayer.position = noClipCamera.getCoord();
        localPlayer.setHeading(noClipCamera.getRot(2).z);
        noClipCamera.destroy(true);
        noClipCamera = null;
    }

    var groundz = mp.game.gameplay.getGroundZFor3dCoord(localPlayer.position.x, localPlayer.position.y, localPlayer.position.z, parseFloat(0), false);
    localPlayer.position = new mp.Vector3(localPlayer.position.x, localPlayer.position.y, groundz);

    mp.game.cam.renderScriptCams(false, false, 0, true, false);
    localPlayer.freezePosition(false);
    localPlayer.setInvincible(false);
    localPlayer.setVisible(true, false);
    localPlayer.setCollision(true, false);
    mp.nametags.enabled = false;
}

mp.events.add('render', () => {
    if (!noClipCamera || mp.gui.cursor.visible) {
        return;
    }
    controlModifier = mp.keys.isDown(bindASCIIKeys.LCtrl);
    shiftModifier = mp.keys.isDown(bindASCIIKeys.Shift);
    var rot = noClipCamera.getRot(2);
    var fastMult = 1;
    var slowMult = 1;
    if (shiftModifier) {
        fastMult = 3;
    } else if (controlModifier) {
        slowMult = 0.5;
    }
    var rightAxisX = mp.game.controls.getDisabledControlNormal(0, 220);
    var rightAxisY = mp.game.controls.getDisabledControlNormal(0, 221);
    var leftAxisX = mp.game.controls.getDisabledControlNormal(0, 218);
    var leftAxisY = mp.game.controls.getDisabledControlNormal(0, 219);
    var pos = noClipCamera.getCoord();
    var rr = noClipCamera.getDirection();
    var vector = new mp.Vector3(0, 0, 0);
    vector.x = rr.x * leftAxisY * fastMult * slowMult;
    vector.y = rr.y * leftAxisY * fastMult * slowMult;
    vector.z = rr.z * leftAxisY * fastMult * slowMult;
    var upVector = new mp.Vector3(0, 0, 1);
    var rightVector = getCrossProduct(getNormalizedVector(rr), getNormalizedVector(upVector));
    rightVector.x *= leftAxisX * 0.5;
    rightVector.y *= leftAxisX * 0.5;
    rightVector.z *= leftAxisX * 0.5;
    var upMovement = 0.0;
    if (mp.keys.isDown(bindASCIIKeys.Q)) {
        upMovement = 0.5;
    }
    var downMovement = 0.0;
    if (mp.keys.isDown(bindASCIIKeys.E)) {
        downMovement = 0.5;
    }
    mp.players.local.position = new mp.Vector3(pos.x + vector.x + 1, pos.y + vector.y + 1, pos.z + vector.z + 1);
    mp.players.local.heading = rr.z;
    noClipCamera.setCoord(pos.x - vector.x + rightVector.x, pos.y - vector.y + rightVector.y, pos.z - vector.z + rightVector.z + upMovement - downMovement);
    noClipCamera.setRot(rot.x + rightAxisY * -5.0, 0.0, rot.z + rightAxisX * -5.0, 2);
});

},{"../player/player":186}],192:[function(require,module,exports){
"use strict";

var _peds = require("../peds/peds");

var _peds2 = _interopRequireDefault(_peds);

var _player = require("../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//FadeOutDeath cuz of new Handling
mp.game.gameplay.setFadeOutAfterDeath(false);

//Prevent
mp.events.add('projectile', () => {
    return true;
});

mp.events.add('explosion', () => {
    return true;
});

mp.events.add("playerSpawn", client => {
    mp.game.gameplay.setFadeOutAfterDeath(false);

    //Helmet DMG reduce does not work..
    //mp.players.local.setConfigFlag(149,false);
    //mp.players.local.setConfigFlag(438, false);

    mp.game.player.setWeaponDamageModifier(_player2.default.weaponDmg);
    mp.game.player.setMeleeWeaponDamageModifier(_player2.default.meleeDmg);
});

mp.players.local.setSuffersCriticalHits(true);
//Disable sneaking
mp.players.local.setStealthMovement(false, '0');

mp.events.add('toggleHeadshot', state => {
    mp.players.local.setSuffersCriticalHits(state);
});

mp.events.add('triggerRagdoll', () => {
    mp.players.local.setToRagdoll(100, 100, 2, false, false, false);
});

mp.events.add('render', () => {
    //HIDE STREET NAME BOTTOM RIGHT
    mp.game.ui.hideHudComponentThisFrame(9);
    mp.game.ui.hideHudComponentThisFrame(7);

    //DISABLE STEALTH KILL
    if (mp.players.local.isPerformingStealthKill()) {
        mp.players.local.clearTasksImmediately();
    }

    // meele combat
    if (mp.game.invoke('0x475768A975D5AD17', mp.players.local.handle, 6)) {
        // Is Ped Armed
        mp.game.controls.disableControlAction(0, 140, true); // INPUT_MELEE_ATTACK_LIGHT
        mp.game.controls.disableControlAction(0, 141, true); // INPUT_MELEE_ATTACK_HEAVY
        mp.game.controls.disableControlAction(0, 142, true); // INPUT_MELEE_ATTACK_ALTERNATE
    }

    // generell disablings
    //mp.game.controls.disableControlAction(0, 44, true); // Cover

    // Combat running
    /*
    if (mp.players.local.isUsingActionMode()) {
        mp.players.local.setUsingActionMode(false, -1, "DEFAULT_ACTION");
    }
    */

    // Hide Ammo
    mp.game.ui.displayAmmoThisFrame(false);

    // Slowmo Camera Abuses
    mp.game.controls.disableControlAction(0, 7, true); // INPUT_CINEMATIC_SLOWMO
    mp.game.controls.disableControlAction(0, 334, true); // INPUT_VEH_SLOWMO_UD
    mp.game.controls.disableControlAction(0, 335, true); // INPUT_VEH_SLOWMO_UP_ONLY
    mp.game.controls.disableControlAction(0, 336, true); // INPUT_VEH_SLOWMO_DOWN_ONLY

    // disable while freezed
    if (_player2.default.cuffed || _peds2.default.freezed) {
        // disabling veh attacks
        mp.game.controls.disableControlAction(0, 69, true); //
        mp.game.controls.disableControlAction(0, 70, true); //
        mp.game.controls.disableControlAction(0, 24, true); //
        mp.game.controls.disableControlAction(0, 92, true); //
        mp.game.controls.disableControlAction(0, 106, true); //
        mp.game.controls.disableControlAction(0, 257, true); //
        mp.game.controls.disableControlAction(0, 346, true); //
        mp.game.controls.disableControlAction(0, 25, true); //
        mp.game.controls.disableControlAction(0, 68, true); //
        mp.game.controls.disableControlAction(0, 70, true); //
        mp.game.controls.disableControlAction(0, 91, true); //
    }
});

mp.events.add('outgoingDamage', (sourceEntity, targetEntity, sourcePlayer, weapon, boneIndex, damage) => {

    if (targetEntity.type === 'player' && sourceEntity.type === 'player' && _player2.default.dmglg) {
        mp.events.callRemoteUnreliable("aads", targetEntity, Math.floor(sourceEntity.position.subtract(targetEntity.position).length()), boneIndex === 20 ? Math.floor(damage / 18) : damage, boneIndex, weapon.toString());
    }
});

mp.events.add('incomingDamage', (sourceEntity, sourcePlayer, targetEntity, weapon, boneIndex, damage) => {

    if (targetEntity.type === 'player' && boneIndex === 20 && !_player2.default.invincible) {
        if (damage <= 5) {
            damage = 306;
        }
        mp.players.local.applyDamageTo(Math.floor(damage / 18), true);
        return true;
    }
});

},{"../peds/peds":180,"../player/player":186}],193:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
class Raycast {
    constructor() {
        this.camera = mp.cameras.new("gameplay");
    }

    getCameraHitCoord() {
        let position = this.camera.getCoord();
        let direction = this.camera.getDirection();
        let farAway = new mp.Vector3(direction.x * 12 + position.x, direction.y * 12 + position.y, direction.z * 12 + position.z);
        let hitData = mp.raycasting.testPointToPoint(position, farAway, mp.players.local);

        if (hitData != undefined) {
            return hitData;
        }
        return null;
    }

    createRaycast() {
        let obj = this.getCameraHitCoord();
        if (obj == null) {
            mp.gui.chat.push("no obj found");
        } else {
            if (obj.entity == null || obj.entity == undefined) return null;
            if (obj.entity.handle == null || obj.entity.handle == undefined) return null;

            let entityCheck = mp.game.entity.isAnEntity(obj.entity.handle);
            if (entityCheck) {
                return obj;
            }

            return null;
        }
        return null;
    }
}

exports.default = new Raycast();

},{}],194:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
class BodyCameraSingleton {
    constructor() {}
    //


    /**
     * Create a new camera at given position.
     *
     * @param {{x: number, y: number, z: number}} position
     */
    createBodyCamera(position) {
        if (this.camera) return;

        this.camera = mp.cameras.new('default', position, new mp.Vector3(0, 0, 0), 40); // name, position, rotation, fov (field of view)
        this.camera.setActive(true);
        mp.game.cam.renderScriptCams(true, false, 500, true, false);
    }

    /**
     * Set the camera to a given position.
     *
     * @param {{x: number, y: number, z: number}} position
     */
    setBodyCameraPosition(position) {
        if (!this.camera) return;

        this.camera.setCoord(position.x, position.y, position.z);
    }

    /**
     * Make the camera fly to a specific position.
     *
     * @param position
     */
    flyBodyCameraTo(position) {
        if (!this.camera) return;

        // Set "default" camera to not active this will enable the in game camera.
        this.camera.setActive(false);
        this.resetRenderScriptCams();

        // Create new camera at "default" camera position.
        let interpCamera = mp.cameras.new('inter', this.camera.getCoord(), this.camera.getRot(2), this.camera.getFov()); // name, position, rotation, fov (field of view)

        // Set "default" camera to new position.
        this.camera.setCoord(position.x, position.y, position.z);
        this.camera.stopPointing();

        // Translate between newly created camera and "default" camera.
        this.camera.setActiveWithInterp(interpCamera.handle, 500, 0, 0);
        mp.game.cam.renderScriptCams(true, false, 500, true, false);

        // CleanUp
        interpCamera.destroy();
        interpCamera = null;
    }

    flyBodyCameraWithFixedParams(heading, distance, cameraPosZ, PointPosZ) {
        let playerPosition = mp.players.local.position,
            newPosition = this.offsetPosition(playerPosition.x, playerPosition.y, heading, distance);

        this.flyBodyCameraTo(new mp.Vector3(newPosition.x, newPosition.y, cameraPosZ));

        this.pointBodyCameraAt(new mp.Vector3(playerPosition.x, playerPosition.y, PointPosZ));
    }

    flyBodyCameraWithParams(rotation, distance, heightCamera, heightPointAt) {
        let playerPosition = mp.players.local.position,
            playerRotation = mp.players.local.getHeading(),
            newPosition = this.offsetPosition(playerPosition.x, playerPosition.y, playerRotation + rotation, distance);

        this.flyBodyCameraTo(new mp.Vector3(newPosition.x, newPosition.y, playerPosition.z + heightCamera));

        this.pointBodyCameraAt(new mp.Vector3(playerPosition.x, playerPosition.y, playerPosition.z + (heightPointAt || heightCamera)));
    }

    rotateBodyCameraWithParams(rotation, distance, heightCamera, heightPointAt) {
        let playerPosition = mp.players.local.position,
            playerRotation = mp.players.local.getHeading(),
            newPosition = this.offsetPosition(playerPosition.x, playerPosition.y, playerRotation + rotation, distance);

        this.setBodyCameraPosition(new mp.Vector3(newPosition.x, newPosition.y, playerPosition.z + heightCamera));

        this.pointBodyCameraAt(new mp.Vector3(playerPosition.x, playerPosition.y, playerPosition.z + (heightPointAt || heightCamera)));
    }

    rotateBodyCameraWithFixedParams(heading, distance, cameraPosZ, PointPosZ) {
        let playerPosition = mp.players.local.position,
            newPosition = this.offsetPosition(playerPosition.x, playerPosition.y, heading, distance);

        this.setBodyCameraPosition(new mp.Vector3(newPosition.x, newPosition.y, cameraPosZ));

        this.pointBodyCameraAt(new mp.Vector3(playerPosition.x, playerPosition.y, PointPosZ));
    }

    /**
     * Make the camera point to a specific coordinate.
     *
     * @param position
     */
    pointBodyCameraAt(position) {
        if (this.camera == null) return;
        this.camera.pointAtCoord(position.x, position.y, position.z);
    }

    /**
     * Destroy the camera and reset everything to normal.
     *
     */
    resetBodyCamera() {
        if (!this.camera) return;

        this.camera.setActive(false);
        this.camera.destroy();
        this.resetRenderScriptCams();

        this.camera = null;
    }

    resetRenderScriptCams() {
        mp.game.cam.renderScriptCams(false, false, 3000, true, true);
    }

    /**
     * Calculates from a given position and a given "rotation" the position that is "distance" away.
     *
     * @param x
     * @param y
     * @param rotation
     * @param distance
     *
     * @returns {{x: number, y: number}}
     */
    offsetPosition(x, y, rotation, distance) {
        return {
            x: x + Math.sin(-rotation * Math.PI / 180) * distance,
            y: y + Math.cos(-rotation * Math.PI / 180) * distance
        };
    }
}

exports.default = new BodyCameraSingleton();

},{}],195:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
class Utils {
    getDistance(pos1, pos2, useZ) {
        return mp.game.gameplay.getDistanceBetweenCoords(pos1.x, pos1.y, pos1.z, pos2.x, pos2.y, pos2.z, useZ);
    }

    calculateVectorDistance(pos1, pos2) {
        let x = pos1.x - pos2.x;
        let y = pos1.y - pos2.y;
        let z = pos1.z - pos2.z;
        return new mp.Vector3(x < 0 ? x * -1 : x, y < 0 ? y * -1 : y, z < 0 ? z * -1 : z);
    }

    pointCameraAtFace() {
        const camera = mp.cameras.new("camera", mp.players.local.getOffsetFromInWorldCoords(0, 1, 0.7), 0, 40);
        const head = mp.players.local.getBoneCoords(31086, 0, 0, 0);
        camera.pointAtCoord(head.x, head.y, head.z);
        mp.game.cam.renderScriptCams(true, false, 0, true, false);
    }

    pointCameraAtBody() {
        const camera = mp.cameras.new("camera", mp.players.local.getOffsetFromInWorldCoords(0, 3, 1), 0, 40);
        const pos = mp.players.local.position;
        if (camera == null) return;
        camera.pointAtCoord(pos.x, pos.y, pos.z);
        mp.game.cam.renderScriptCams(true, false, 0, true, false);
    }

    disableCamera() {
        mp.game.cam.renderScriptCams(false, false, 0, false, false);
    }
    calcDist(v1, v2) {
        v1.x, v1.y, v1.z, v2.x, v2.y, v2.z;
    }

    async loadAnimation(animation) {
        mp.game.streaming.requestAnimDict(animation);

        while (!mp.game.streaming.hasAnimDictLoaded(animation)) {
            await mp.game.waitAsync(5);
        }
    }
}

exports.default = new Utils();

},{}],196:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
//pside = rechts
//dside = links
/*
door_pside_f,   //Door right, front  
door_dside_r,   //Door left, back  
door_pside_r,   //Door right, back  */

class VehicleEnter {

    calcDist(v1, v2) {
        return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2) + Math.pow(v1.z - v2.z, 2));
    }

    getClosestVehicleSeat(vehicle) {

        let enableBoneDebugging = false;

        let returnData = [];

        const driverSeatId = -1; // CHANGE THIS AS THE DRIVER INDEX CHANGES
        const playerPos = mp.players.local.position;

        if (mp.game.vehicle.isThisModelABike(vehicle.model)) {
            if (vehicle.isSeatFree(0)) {
                this.teleport = false;
                returnData['seat'] = 0;
                returnData['distance'] = this.calcDist(playerPos, vehicle.position);
                return returnData;
            } else {
                returnData['seat'] = -1;
                returnData['distance'] = 100;
                return returnData;
            }
        }

        // Seat Bones (connected to the... leg bone)
        // const seatFrontDriver = vehicle.getBoneIndexByName('seat_dside_f');
        const seatRear = vehicle.getBoneIndexByName('seat_r');
        const seatFrontPassenger = vehicle.getBoneIndexByName('seat_pside_f');
        const seatRearDriver = vehicle.getBoneIndexByName('seat_dside_r');
        const seatRearDriver1 = vehicle.getBoneIndexByName('seat_dside_r1');
        const seatRearDriver2 = vehicle.getBoneIndexByName('seat_dside_r2');
        const seatRearDriver3 = vehicle.getBoneIndexByName('seat_dside_r3');
        const seatRearDriver4 = vehicle.getBoneIndexByName('seat_dside_r4');
        const seatRearDriver5 = vehicle.getBoneIndexByName('seat_dside_r5');
        const seatRearDriver6 = vehicle.getBoneIndexByName('seat_dside_r6');
        const seatRearDriver7 = vehicle.getBoneIndexByName('seat_dside_r7');
        const seatRearPassenger = vehicle.getBoneIndexByName('seat_pside_r');
        const seatRearPassenger1 = vehicle.getBoneIndexByName('seat_pside_r1');
        const seatRearPassenger2 = vehicle.getBoneIndexByName('seat_pside_r2');
        const seatRearPassenger3 = vehicle.getBoneIndexByName('seat_pside_r3');
        const seatRearPassenger4 = vehicle.getBoneIndexByName('seat_pside_r4');
        const seatRearPassenger5 = vehicle.getBoneIndexByName('seat_pside_r5');
        const seatRearPassenger6 = vehicle.getBoneIndexByName('seat_pside_r6');
        const seatRearPassenger7 = vehicle.getBoneIndexByName('seat_pside_r7');

        // Positions in world
        // const seatFrontDriverPosition = seatFrontDriver === -1 ? null : vehicle.getWorldPositionOfBone(seatFrontDriver);
        const seatRearPosition = seatRear === -1 ? null : vehicle.getWorldPositionOfBone(seatRear);
        const seatFrontPassengerPosition = seatFrontPassenger === -1 ? null : vehicle.getWorldPositionOfBone(seatFrontPassenger);
        const seatRearDriverPosition = seatRearDriver === -1 ? null : vehicle.getWorldPositionOfBone(seatRearDriver);
        const seatRearDriver1Position = seatRearDriver1 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearDriver1);
        const seatRearDriver2Position = seatRearDriver2 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearDriver2);
        const seatRearDriver3Position = seatRearDriver3 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearDriver3);
        const seatRearDriver4Position = seatRearDriver4 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearDriver4);
        const seatRearDriver5Position = seatRearDriver5 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearDriver5);
        const seatRearDriver6Position = seatRearDriver6 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearDriver6);
        const seatRearDriver7Position = seatRearDriver7 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearDriver7);
        const seatRearPassengerPosition = seatRearPassenger === -1 ? null : vehicle.getWorldPositionOfBone(seatRearPassenger);
        const seatRearPassenger1Position = seatRearPassenger1 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearPassenger1);
        const seatRearPassenger2Position = seatRearPassenger2 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearPassenger2);
        const seatRearPassenger3Position = seatRearPassenger3 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearPassenger3);
        const seatRearPassenger4Position = seatRearPassenger4 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearPassenger4);
        const seatRearPassenger5Position = seatRearPassenger5 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearPassenger5);
        const seatRearPassenger6Position = seatRearPassenger6 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearPassenger6);
        const seatRearPassenger7Position = seatRearPassenger7 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearPassenger7);

        // Get closest seat
        let closestFreeSeatNumber = -1;
        let seatIndex = driverSeatId;
        let closestSeatDistance = Number.MAX_SAFE_INTEGER;
        let calculatedDistance = null;

        // Inline Rear
        calculatedDistance = seatRearPosition === null ? null : this.calcDist(playerPos, seatRearPosition);
        seatIndex = seatRear === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if (enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_r");
            }
        }

        // Side by Side vehicles
        calculatedDistance = seatFrontPassengerPosition === null ? null : this.calcDist(playerPos, seatFrontPassengerPosition);
        seatIndex = seatFrontPassenger === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if (enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_pside_f");
            }
        }

        calculatedDistance = seatRearDriverPosition === null ? null : this.calcDist(playerPos, seatRearDriverPosition);
        seatIndex = seatRearDriver === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if (enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_dside_r");
            }
        }

        calculatedDistance = seatRearPassengerPosition === null ? null : this.calcDist(playerPos, seatRearPassengerPosition);
        seatIndex = seatRearPassenger === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if (enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_pside_r");
            }
        }

        // Force inner seats before outer grab holds if shift not pressed
        calculatedDistance = seatRearDriver1Position === null ? null : this.calcDist(playerPos, seatRearDriver1Position);
        seatIndex = seatRearDriver1 === -1 ? seatIndex : seatIndex + 1; // 3
        if (!vehicle.isSeatFree(seatIndex - 2) || mp.keys.isDown(16)) {
            if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
                closestSeatDistance = calculatedDistance;
                closestFreeSeatNumber = seatIndex;
                if (enableBoneDebugging) {
                    mp.game.graphics.notify("boneidx: seat_dside_r1");
                }
            }
        }

        // Force inner seats before outer grab holds if shift not pressed
        calculatedDistance = seatRearPassenger1Position === null ? null : this.calcDist(playerPos, seatRearPassenger1Position);
        seatIndex = seatRearPassenger1 === -1 ? seatIndex : seatIndex + 1; // 4
        if (!vehicle.isSeatFree(seatIndex - 2) || mp.keys.isDown(16)) {
            if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
                closestSeatDistance = calculatedDistance;
                closestFreeSeatNumber = seatIndex;
                if (enableBoneDebugging) {
                    mp.game.graphics.notify("boneidx: seat_pside_r1");
                }
            }
        }

        // Force inner seats before outer grab holds if shift not pressed
        calculatedDistance = seatRearDriver2Position === null ? null : this.calcDist(playerPos, seatRearDriver2Position);
        seatIndex = seatRearDriver2 === -1 ? seatIndex : seatIndex + 1; // 5
        if (!vehicle.isSeatFree(seatIndex - 4) || mp.keys.isDown(16)) {
            if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
                closestSeatDistance = calculatedDistance;
                closestFreeSeatNumber = seatIndex;
                if (enableBoneDebugging) {
                    mp.game.graphics.notify("boneidx: seat_dside_r2");
                }
            }
        }

        // Force inner seats before outer grab holds if shift not pressed
        calculatedDistance = seatRearPassenger2Position === null ? null : this.calcDist(playerPos, seatRearPassenger2Position);
        seatIndex = seatRearPassenger2 === -1 ? seatIndex : seatIndex + 1; // 6
        if (!vehicle.isSeatFree(seatIndex - 4) || mp.keys.isDown(16)) {
            if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
                closestSeatDistance = calculatedDistance;
                closestFreeSeatNumber = seatIndex;
                if (enableBoneDebugging) {
                    mp.game.graphics.notify("boneidx: seat_pside_r2");
                }
            }
        }

        calculatedDistance = seatRearDriver3Position === null ? null : this.calcDist(playerPos, seatRearDriver3Position);
        seatIndex = seatRearDriver3 === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if (enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_dside_r3");
            }
        }

        calculatedDistance = seatRearPassenger3Position === null ? null : this.calcDist(playerPos, seatRearPassenger3Position);
        seatIndex = seatRearPassenger3 === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if (enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_pside_r3");
            }
        }

        calculatedDistance = seatRearDriver4Position === null ? null : this.calcDist(playerPos, seatRearDriver4Position);
        seatIndex = seatRearDriver4 === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if (enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_dside_r4");
            }
        }

        calculatedDistance = seatRearPassenger4Position === null ? null : this.calcDist(playerPos, seatRearPassenger4Position);
        seatIndex = seatRearPassenger4 === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if (enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_pside_r4");
            }
        }

        calculatedDistance = seatRearDriver5Position === null ? null : this.calcDist(playerPos, seatRearDriver5Position);
        seatIndex = seatRearDriver5 === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if (enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_dside_r5");
            }
        }

        calculatedDistance = seatRearPassenger5Position === null ? null : this.calcDist(playerPos, seatRearPassenger5Position);
        seatIndex = seatRearPassenger5 === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if (enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_pside_r5");
            }
        }

        calculatedDistance = seatRearDriver6Position === null ? null : this.calcDist(playerPos, seatRearDriver6Position);
        seatIndex = seatRearDriver6 === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if (enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_dside_r6");
            }
        }

        calculatedDistance = seatRearPassenger6Position === null ? null : this.calcDist(playerPos, seatRearPassenger6Position);
        seatIndex = seatRearPassenger6 === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if (enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_pside_r6");
            }
        }

        calculatedDistance = seatRearDriver7Position === null ? null : this.calcDist(playerPos, seatRearDriver7Position);
        seatIndex = seatRearDriver7 === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if (enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_dside_r7");
            }
        }

        calculatedDistance = seatRearPassenger7Position === null ? null : this.calcDist(playerPos, seatRearPassenger7Position);
        seatIndex = seatRearPassenger7 === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if (enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_pside_r7");
            }
        }

        if (closestFreeSeatNumber === -1) {
            returnData['seat'] = -1;
            returnData['distance'] = 100;
            return returnData;
        }

        const lastAnimatableSeatOverrides = {
            [mp.game.joaat('journey')]: driverSeatId + 1,
            [mp.game.joaat('journey2')]: driverSeatId + 1
        };

        let lastAnimatableSeatIndex = driverSeatId + 3;
        if (lastAnimatableSeatOverrides[vehicle.model] !== undefined) {
            lastAnimatableSeatIndex = lastAnimatableSeatOverrides[vehicle.model];
        }

        if (closestFreeSeatNumber <= lastAnimatableSeatIndex) {
            // Normal Enter
            returnData['seat'] = closestFreeSeatNumber;
            returnData['distance'] = closestSeatDistance;
            return returnData;
        } else {
            // Warp Enter
            this.teleport = true;
            returnData['seat'] = closestFreeSeatNumber;
            returnData['distance'] = closestSeatDistance;
            return returnData;
        }
    }

    getClosestVehicle() {
        let closest = null;
        let closestDistance = 5;

        mp.vehicles.forEachInStreamRange(vehicle => {

            this.model = vehicle.getModel();

            this.distance = 5;

            const dist = this.getDistanceToEntity(vehicle, false);

            if (dist > this.distance) {
                return;
            }

            if (closest == null) {
                closest = vehicle;
            }

            if (dist < this.getDistanceToEntity(closest, false)) {
                closest = vehicle;
            }
        });

        return closest;
    }

    getClosestVehiclesInRange(range) {
        let closestVehicles = [];

        mp.vehicles.forEachInStreamRange(vehicle => {
            if (this.getDistanceToEntity(vehicle, false) < range) {
                closestVehicles.push(vehicle);
            }
        });

        return closestVehicles;
    }

    getClosestGarbageVehicleInRange(range) {

        let closestVehicle = null;

        mp.vehicles.forEachInStreamRange(vehicle => {

            if (this.getDistanceToEntity(vehicle, false) < range) {
                if (closestVehicle == null) {
                    closestVehicle = vehicle;
                }
                if ((vehicle.model == 0x72435A19 || vehicle.model == 0xB527915C) && this.getDistanceToEntity(vehicle, false) < this.getDistanceToEntity(closestVehicle, false)) {
                    closestVehicle = vehicle;
                }
            }
        });

        return closestVehicle;
    }

    getClosestSingleVehicleInRange(range) {

        let closestVehicle = null;

        mp.vehicles.forEachInStreamRange(vehicle => {

            if (this.getDistanceToEntity(vehicle, false) < range) {
                if (closestVehicle == null) {
                    closestVehicle = vehicle;
                }
                if (this.getDistanceToEntity(vehicle, false) < this.getDistanceToEntity(closestVehicle, false)) {
                    closestVehicle = vehicle;
                }
            }
        });

        return closestVehicle;
    }

    enter(vehicle, seat) {
        if (this.teleport) {
            if (vehicle.getVariable('lockedStatus')) return;
            mp.players.local.setIntoVehicle(vehicle.handle, seat);
            return;
        }
        mp.players.local.taskEnterVehicle(vehicle.handle, -1, seat, 2, 0, 0);
    }

    getVehicleTeleportLimitSeat() {
        // mp.game.graphics.notify('model 2: ' +  this.model);

        switch (this.model) {
            // Einsteigen ab 3 Sitz (Fahrer, Beifahrer, TP...)
            case 0x3412ae2d: // ka
            case 0xfcfcb68b: //Cargobob
            case 0x60a7ea10: //Cargobob
            case 0x53174eef: //Cargobob
            case 0x78bc1a3c: //Cargobob
            case 0x250b0c5e: // Luxor
            case 0xb79c1bf5: // Shamal
            case 0x9c429b6a: // Velum
            case 0x9d80f93: // Miljet
            case 0xb2cf7250: // Nimbus
            case 0x761e2ad3: // Titan
            case 0xf8d48e7a:
                // journey
                return 1;
            // Einsteigen ab 2 Sitz (Fahrer, TP..)
            case 0xc1ce1183: // Marquis
            case 0xd577c962: // Bus
            case 0x4c80eb0e: // Airbus
            case 0x84718d34: // Coach
            case 0x885f3671: // Pbus
            case 0x73b1c3cb: // Tourbus
            case 0xbe819c63: // Rental
            case 0x56590fe9: // Tropic2
            case 0x1149422f: // Tropic
            case 0x362cac6d: // Toro2
            case 0x3fd5aa2f: // Toro
            case 0xef2295c9: // Suntrap
            case 0xb527915c:
            case 0x72435a19:
                // Trash
                return 0;
            // Einsteigen ab 5 Sitz (Fahrer, Beifarher, hL, hR, TP...)
            case 0x8b13f083: // Stretch
            case 0xe6e967f8:
                // Patriot 2
                return 3;
            default:
                return 99;
        }
    }

    getDistanceToEntity(entity, useZ) {
        const pos1 = mp.players.local.position;
        const pos2 = entity.position;
        return mp.game.gameplay.getDistanceBetweenCoords(pos1.x, pos1.y, pos1.z, pos2.x, pos2.y, pos2.z, useZ);
    }

    getDistance(pos2) {
        const pos1 = mp.players.local.position;
        return mp.game.gameplay.getDistanceBetweenCoords(pos1.x, pos1.y, pos1.z, pos2.x, pos2.y, pos2.z, false);
    }
}

exports.default = VehicleEnter;

},{}],197:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
class BoatModule {
    constructor() {
        setInterval(function () {
            mp.vehicles.forEachInStreamRange(vehicle => {
                if (mp.game.vehicle.isThisModelABoat(vehicle.model) || mp.game.vehicle.isThisModelAnEmergencyBoat(vehicle.model)) {
                    if (vehicle.isInWater()) {
                        vehicle.position.z = mp.game.water.getWaterHeight(vehicle.position.x, vehicle.position.z, vehicle.position.y, vehicle.position.z);
                    }
                }
            });
        }, 100);
    }
}

exports.default = new BoatModule();

},{}],198:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _player = require("../player/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let player = mp.players.local;

class Flatbed {
    constructor() {}

    xmenuswitch(cmd) {

        let flatbed = player.vehicle;

        if (cmd == "REQUEST_VEHICLE_FlATBED_LOAD_TOGGLE") {
            if (isDrivingFlatbed() && !flatbed.bed.moving && flatbed.bed.rope == null) {
                if (flatbed.bed.state == 0) {
                    mp.events.callRemote('fbSetState', flatbed, 1, _player2.default.remoteHashKey);
                    extendBed(flatbed);
                } else if (flatbed.bed.state == 1) {
                    mp.events.callRemote('fbSetState', flatbed, 0, _player2.default.remoteHashKey);
                    retractBed(flatbed);
                }
            }
        }

        if (cmd == "REQUEST_VEHICLE_FlATBED_ROPE_TOGGLE") {

            if (isDrivingTowTruck()) {
                let pos = flatbed.getWorldPositionOfBone(flatbed.getBoneIndexByName('bumper_r'));
                let targetVeh = mp.game.vehicle.getClosestVehicle(pos.x, pos.y, pos.z, 7, 0, 70);
                targetVeh = mp.vehicles.atHandle(targetVeh);
                if (targetVeh != undefined) {
                    if (flatbed.isAttachedToTowTruck(targetVeh.handle)) {
                        flatbed.detachFromTowTruck(targetVeh.handle);
                    } else {
                        if (targetVeh.isSeatFree(-1)) {
                            player.setAlpha(0);
                            player.setIntoVehicle(targetVeh.handle, -1);
                            setTimeout(function () {
                                player.setAlpha(255);
                                player.setIntoVehicle(flatbed.handle, -1);
                            }, 100);
                            targetVeh.setEngineOn(false, false, false);
                            flatbed.attachToTowTruck(targetVeh.handle, false, 0, 0, 0);
                        }
                    }
                }

                return;
            }

            if (isDrivingFlatbed() && !flatbed.bed.moving && flatbed.bed.state == 1 && flatbed.bed.rope == null && !flatbed.attachedVehicle) {
                let targetVeh = getTargetVehicle(flatbed);
                if (targetVeh) {
                    /* ROPE
                    //if (targetVeh.getNumberOfPassengers() > 0 || targetVeh.isSeatFree(-1)) return; // Keine Insassen
                      mp.events.callRemote('fbAttachRope', flatbed, targetVeh, true, pl.remoteHashKey)
                    attachRope(flatbed, targetVeh)
                    setTimeout(async () => {
                        mp.events.callRemote('fbWindRope', flatbed, pl.remoteHashKey)
                        let windingSuccess = await windRope(flatbed)
                        if (windingSuccess) {
                            if (attachToBed(flatbed, targetVeh)) {
                                mp.events.callRemote('fbAttachVehicle', flatbed, targetVeh, true, pl.remoteHashKey)
                                startSyncIntervalForVeh(targetVeh)
                            }
                          }
                        mp.events.callRemote('fbAttachRope', flatbed, targetVeh, false, pl.remoteHashKey)
                    }, 1000);
                    */

                    if (attachToBed(flatbed, targetVeh)) {
                        mp.players.forEachInStreamRange((toplayer, id) => {
                            if (toplayer.handle != player.handle) {
                                mp.events.callRemote('fbAttachVehicle', toplayer, flatbed, targetVeh, true, _player2.default.remoteHashKey);
                            }
                        });
                        startSyncIntervalForVeh(targetVeh);
                    }

                    // mp.events.callRemote('fbAttachRope', flatbed, targetVeh, false, pl.remoteHashKey)
                }
            } else if (isDrivingFlatbed() && flatbed.attachedVehicle && !flatbed.bed.moving && flatbed.bed.state == 1) {

                mp.players.forEachInStreamRange((toplayer, id) => {
                    if (toplayer.handle != player.handle) {
                        mp.events.callRemote('fbAttachVehicle', toplayer, flatbed, flatbed, false, _player2.default.remoteHashKey);
                    }
                });

                attachToBed(flatbed, false);

                clearInterval(syncInterval);
                syncInterval = null;
            }
        }
    }
}

function createBed(veh) {
    return new Promise((resolve, reject) => {
        let bedRot = veh.getRotation(2);
        let tempPos = veh.position;
        tempPos.z += 15;
        veh.bed = mp.objects.new(mp.game.joaat('imp_prop_flatbed_ramp'), tempPos, { rotation: { x: 14 - bedRot.x, y: bedRot.y, z: bedRot.z + 180 }, dimension: player.dimension });
        veh.bed.streamingRange = 500;
        veh.bed.state = 0;
        setTimeout(() => {
            veh.bed.attachTo(veh.handle, veh.getBoneIndexByName('chassis_dummy'), 0, -3, -0.48, 14, 0, 180, true, false, false, false, 0, true);
            resolve();
        }, 100);
    });
}

let syncInterval;
function startSyncIntervalForVeh(veh) {
    if (syncInterval != null) return;

    syncInterval = setInterval(() => {
        if (isDrivingFlatbed() && player.vehicle.getVariable('fbAttachVehicle') == veh.remoteId) {
            mp.events.callRemote('fbSyncPosition', veh, JSON.stringify(veh.position), JSON.stringify(veh.getRotation(2)), _player2.default.remoteHashKey);
        } else {
            clearInterval(syncInterval);
            syncInterval = null;
        }
    }, 1000);
}

function extendBed(flatbed) {
    let y = -3,
        z = -0.48,
        rotX = 14;
    let toY = -8.6,
        toZ = -1.24,
        toRotX = 0;
    flatbed.bed.moving = true;

    // audio
    let sound = mp.game.invoke('0x430386FE9BF80B45'); // getSoundId
    mp.game.audio.playSoundFromEntity(sound, "OPENING", flatbed.bed.handle, "DOOR_GARAGE", false, 0);

    let render = new mp.Event('render', () => {
        if (!flatbed.bed) {
            return render.destroy();
        }

        if (y > toY) {
            y = parseFloat((y - 0.05).toFixed(2));

            // after y finish transition
        }
        if (y <= toY) {
            if (z > toZ) {
                z = parseFloat((z - 0.04).toFixed(2));
            }

            if (rotX > toRotX) {
                rotX = parseFloat((rotX - 0.8).toFixed(2));
            }
        }
        flatbed.bed.attachTo(flatbed.handle, flatbed.getBoneIndexByName('chassis_dummy'), 0, y, z, rotX, 0, 180, true, false, true, false, 0, true);
        if (y <= toY && z <= toZ && rotX <= toRotX) {
            flatbed.bed.moving = false;
            flatbed.bed.state = 1;
            render.destroy();
            mp.game.audio.stopSound(sound);
        }
    });
}

function retractBed(flatbed) {
    let y = -8.6,
        z = -1.24,
        rotX = 0;
    let toY = -3,
        toZ = -0.48,
        toRotX = 14;
    flatbed.bed.moving = true;

    // audio
    let sound = mp.game.invoke('0x430386FE9BF80B45'); // getSoundId
    mp.game.audio.playSoundFromEntity(sound, "CLOSING", flatbed.bed.handle, "DOOR_GARAGE", false, 0);

    let render = new mp.Event('render', () => {
        if (!flatbed.bed) {
            return render.destroy();
        }

        if (z < toZ) {
            z = parseFloat((z + 0.04).toFixed(2));
        }

        if (rotX < toRotX) {
            rotX = parseFloat((rotX + 0.8).toFixed(2));
        }

        // after z and rotX finish transition
        if (z >= toZ && rotX >= toRotX) {
            if (y < toY) {
                y = parseFloat((y + 0.05).toFixed(2));
            }
        }

        flatbed.bed.attachTo(flatbed.handle, flatbed.getBoneIndexByName('chassis_dummy'), 0, y, z, rotX, 0, 180, true, false, true, false, 0, true);
        if (y >= toY && z >= toZ && rotX >= toRotX) {
            flatbed.bed.moving = false;
            flatbed.bed.state = 0;
            render.destroy();
            mp.game.audio.stopSound(sound);
        }
    });
}

mp.events.add({
    async entityStreamIn(e) {
        if (e != null && e.type == 'vehicle' && mp.vehicles.exists(e) && e.model == mp.game.joaat('flatbed')) {
            await createBed(e);
            if (e.getVariable('fbState') === 1) extendBed(e);

            /*
            if (typeof e.getVariable('fbAttachRope') == 'number') {
                let vehID = e.getVariable('fbAttachRope')
                let veh = mp.vehicles.atRemoteId(vehID)
                if (veh)
                    attachRope(e, veh)
            }*/

            if (typeof e.getVariable('fbAttachVehicle') == 'number') {
                let veh = mp.vehicles.atRemoteId(e.getVariable('fbAttachVehicle'));
                if (veh) setTimeout(() => {
                    attachToBed(e, veh);
                }, 1000);
            }
        }
    },

    entityStreamOut(e) {
        if (e != null && e.type == 'vehicle' && mp.vehicles.exists(e) && e.model == mp.game.joaat('flatbed')) {
            if (e.bed) {
                if (e.bed.sound != null) mp.game.audio.stopSound(e.bed.sound);

                if (e.bed.rope != null) {
                    mp.game.rope.deleteRope(e.bed.rope);
                    mp.game.rope.deleteChildRope(e.bed.rope);
                }
                e.bed.destroy();
                delete e.bed;

                if (e.attachedVehicle) delete e.attachedVehicle;
            }
        }
    },

    playerEnterVehicle(v, seat) {
        if (v == null || !mp.vehicles.exists(v) || v.model != mp.game.joaat('flatbed')) return;

        if (seat === -1 && typeof v.getVariable('fbAttachVehicle') == 'number') startSyncIntervalForVeh(mp.vehicles.atRemoteId(v.getVariable('fbAttachVehicle')));
    },

    playerLeaveVehicle(v) {
        if (!v || v == null || !mp.vehicles.exists(v)) return; // vehicle destroyed
        if (v.model != mp.game.joaat('flatbed')) return;
    },

    sAttachRope(fb, veh) {
        if (fb == null || !mp.vehicles.exists(fb)) return;
        if (veh == null || !mp.vehicles.exists(veh)) return;
        attachRope(fb, veh);
    },
    sAttachToBed(fb, veh) {
        if (fb == null || !mp.vehicles.exists(fb)) return;
        if (veh != false && !mp.vehicles.exists(veh)) return;
        attachToBed(fb, veh);
    }
});

// sync code
mp.events.addDataHandler('fbState', (fb, state) => {
    if (fb == null || !mp.vehicles.exists(fb) || fb.handle == 0 || fb == player.vehicle && player.seat == -1) return;

    if (state == 1) extendBed(fb);else retractBed(fb);
});

function getTargetVehicle(flatbed) {
    let from = flatbed.bed.getOffsetFromInWorldCoords(0, 2, 1);
    let to = flatbed.bed.getOffsetFromInWorldCoords(0, 4, 0.7);
    let raycast = mp.raycasting.testPointToPoint(from, to, null, 2);
    let targetVeh = raycast && raycast.entity && raycast.entity.type == 'vehicle' ? raycast.entity : null;
    return targetVeh;
}

function isDrivingTowTruck() {
    return player.vehicle && (player.vehicle.model == mp.game.joaat('towtruck') || player.vehicle.model == mp.game.joaat('towtruck2')) && player.vehicle.getPedInSeat(-1) == player.handle;
}

function isDrivingFlatbed() {
    return player.vehicle && player.vehicle.model == mp.game.joaat('flatbed') && player.vehicle.getPedInSeat(-1) == player.handle;
}

function isVehicleFacingFlatbed(veh, fb) {
    let direction = veh.getForwardVector();
    direction = new mp.Vector3(direction.x, direction.y, direction.z);
    let fbPos = new mp.Vector3(fb.position.x, fb.position.y, fb.position.z);
    let vehPos = new mp.Vector3(veh.position.x, veh.position.y, veh.position.z);

    function angle(from, to) {
        let dot = from.unit().dot(to.unit());
        return Math.acos(dot) * (180 / Math.PI);
    }

    return angle(direction, fbPos.subtract(vehPos)) < 90;
}

function getVehicleHook(veh, forward) {
    if (forward) {
        if (veh.getBoneIndexByName('neon_f') > -1) {
            return veh.getWorldPositionOfBone(veh.getBoneIndexByName('neon_f'));
        } else if (veh.getBoneIndexByName('bumper_f') > -1) {
            return veh.getWorldPositionOfBone(veh.getBoneIndexByName('bumper_f'));
        } else if (veh.getBoneIndexByName('engine') > -1) {
            return veh.getWorldPositionOfBone(veh.getBoneIndexByName('engine'));
        } else {
            let pos = veh.position;
            let forwardVec = veh.getForwardVector();
            return new mp.Vector3(pos.x + forwardVec.x, pos.y + forwardVec.y, pos.z + forwardVec.z);
        }
    } else {
        if (veh.getBoneIndexByName('neon_b') > -1) {
            return veh.getWorldPositionOfBone(veh.getBoneIndexByName('neon_b'));
        } else if (veh.getBoneIndexByName('bumper_r') > -1) {
            return veh.getWorldPositionOfBone(veh.getBoneIndexByName('bumper_r'));
        } else if (veh.getBoneIndexByName('trunk') > -1) {
            return veh.getWorldPositionOfBone(veh.getBoneIndexByName('trunk'));
        } else {
            let pos = veh.position;
            let forwardVec = veh.getForwardVector();
            return new mp.Vector3(pos.x + forwardVec.x, pos.y + forwardVec.y, pos.z + forwardVec.z);
        }
    }
}

function playSound(flatbed, sound) {
    let id = -1;
    if (sound != 'OPENED') id = mp.game.invoke('0x430386FE9BF80B45'); // getSoundId
    mp.game.audio.playSoundFromEntity(id, sound, flatbed.bed.handle, "DOOR_GARAGE", false, 0);
    if (id > -1) flatbed.bed.sound = id;
    return id;
}

function attachRope(flatbed, targetVeh) {
    if (!flatbed.handle || !mp.vehicles.exists(flatbed)) return;

    if (targetVeh === false) {
        if (flatbed.bed.rope == null) return;
        mp.game.rope.detachRopeFromEntity(flatbed.bed.rope, flatbed.attachedVehicle.handle);
        mp.game.rope.deleteRope(flatbed.bed.rope);
        mp.game.rope.deleteChildRope(flatbed.bed.rope);
        delete flatbed.bed.rope;

        return;
    }

    if (!mp.vehicles.exists(targetVeh) || !targetVeh.handle) return;
    let anchorPos = flatbed.getOffsetFromInWorldCoords(0, -5.9, 0.6);
    anchorPos = new mp.Vector3(anchorPos.x, anchorPos.y, anchorPos.z);

    let isForward = isVehicleFacingFlatbed(targetVeh, flatbed);
    let hookPos = getVehicleHook(targetVeh, isForward);
    hookPos = new mp.Vector3(hookPos.x, hookPos.y, hookPos.z);
    let dist = anchorPos.subtract(hookPos).length();

    mp.game.invoke('0x9B9039DBF2D258C1'); // loadRopeTextures
    let rope = mp.game.invoke('0xE832D760399EB220', anchorPos.x, anchorPos.y, anchorPos.z, 0, 0, 0, dist, 6, dist, 0.1, 0.5, false, false, true, 1.0, false, 0); // addRope
    flatbed.bed.rope = rope;
    mp.game.rope.attachEntitiesToRope(rope, flatbed.handle, targetVeh.handle, anchorPos.x, anchorPos.y, anchorPos.z, hookPos.x, hookPos.y, hookPos.z, dist, false, false, 0, 0);
    mp.game.invoke('0x710311ADF0E20730', rope); // activatePhysics
    return rope;
}

function windRope(flatbed) {
    return new Promise((resolve, reject) => {
        if (!flatbed.handle || !mp.vehicles.exists(flatbed)) return;

        let rope = flatbed.bed.rope;
        mp.game.rope.startRopeWinding(rope);
        let sound = playSound(flatbed, 'CLOSING');

        let startTime = Date.now();
        let interval = setInterval(() => {
            if (!flatbed.handle) return clearInterval(interval);

            // if rope winding takes more than 15 seconds, its stuck
            if (Date.now() - startTime >= 15000) {
                clearInterval(interval);
                mp.game.rope.stopRopeWinding(rope);
                mp.game.audio.stopSound(sound);
                delete flatbed.bed.sound;
                attachRope(flatbed, false); // delete rope
                return resolve(false);
            }

            if (flatbed.bed.rope == null) {
                clearInterval(interval);
                mp.game.audio.stopSound(sound);
                delete flatbed.bed.sound;
                return;
            }

            if (mp.game.rope.getRopeLength(flatbed.bed.rope) <= 1) {
                clearInterval(interval);
                mp.game.rope.stopRopeWinding(rope);
                mp.game.audio.stopSound(sound);
                delete flatbed.bed.sound;

                setTimeout(() => {
                    attachRope(flatbed, false);
                }, 800);

                resolve(true);
            }
        }, 500);
    });
}

function attachToBed(flatbed, targetVeh) {
    if (!flatbed.handle || targetVeh !== false && !targetVeh.handle) return;

    if (targetVeh === false && flatbed.attachedVehicle != null && mp.vehicles.exists(flatbed.attachedVehicle)) {

        flatbed.attachedVehicle.setInvincible(false);
        flatbed.attachedVehicle.detach(true, false);
        flatbed.attachedVehicle.setNoCollision(flatbed.handle, true);

        delete flatbed.attachedVehicle;
    } else {
        if (!mp.vehicles.exists(targetVeh)) return;
        flatbed.freezePosition(true);
        let pos = targetVeh.position;
        let height = targetVeh.getHeight(pos.x, pos.y, pos.z, true, false);
        if (height <= 0.924 || targetVeh.model == mp.game.joaat('taxi')) height += 1;else height += 0.4;
        let rotX = 14,
            rotZ = 180;

        if (!isVehicleFacingFlatbed(targetVeh, flatbed)) {
            rotX *= -1;
            rotZ = 0;
        }

        targetVeh.attachTo(flatbed.bed.handle, 0, 0, 0, height, rotX, 0, rotZ, true, false, false, false, 0, true);
        var attached = Boolean(targetVeh.isAttached());
        if (attached) {
            flatbed.attachedVehicle = targetVeh;
            flatbed.attachedVehicle.setInvincible(true);
        }
        setTimeout(() => {
            flatbed.freezePosition(false);
        }, 1000);
    }
    playSound(flatbed, 'OPENED');
    if (attached) return attached;
}

function waitFor(e) {
    return new Promise((resolve, reject) => {
        let time = Date.now();
        let interval = setInterval(() => {
            if (e.handle) {
                clearInterval(interval);
                resolve(e);
            }

            if (Date.now() - time >= 5000) {
                clearInterval(interval);
                resolve(null);
            }
        }, 100);
    });
}

exports.default = new Flatbed();

},{"../player/player":186}],199:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
class Rappel {
    constructor() {

        this.localPlayer = mp.players.local;
        this.maxSpeed = 15.0;
        this.minHeight = 15.0;
        this.maxHeight = 45.0;
        this.maxAngle = 15.0;
    }
    startRappel() {
        const vehicle = this.localPlayer.vehicle;
        if (!vehicle) {
            return;
        }

        if (!mp.game.invoke("0x4E417C547182C84D", vehicle.handle)) {
            // hat kein Seil
            return;
        }

        if (vehicle.getSpeed() > this.maxSpeed) {
            // zu schnell
            return;
        }

        if (vehicle.getPedInSeat(-1) === this.localPlayer.handle || vehicle.getPedInSeat(0) === this.localPlayer.handle) {
            return;
        }

        const taskStatus = this.localPlayer.getScriptTaskStatus(-275944640);
        if (taskStatus === 0 || taskStatus === 1) {
            return;
        }

        const curHeight = vehicle.getHeightAboveGround();
        if (curHeight < this.minHeight || curHeight > this.maxHeight) {
            return;
        }

        if (!vehicle.isUpright(this.maxAngle) || vehicle.isUpsidedown()) {
            return;
        }

        this.localPlayer.clearTasks();
        this.localPlayer.taskRappelFromHeli(10.0);
    }
}

exports.default = new Rappel();

},{}],200:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _player = require('../player/player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class VehicleModule {
    constructor() {
        this.lastSireneStateCheck = null;

        this.doorstate = false;

        // Menu items for basic players outside the car
        this.menuItemsOutOfCar = [{ label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" }, { label: 'Schlüssel', description: 'Fahrzeug auf/abschließen', icon: 'img/icons/vehicle/key.png', id: 'REQUEST_VEHICLE_TOGGLE_LOCK_OUTSIDE', arg: "" }, { label: 'Kofferraum', description: 'Öffnet/Schließt den Kofferraum', icon: 'img/icons/vehicle/trunk.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR_OUTSIDE', arg: "5" }, { label: 'Tankstelle', description: 'Betanken Sie das Fahrzeug', icon: 'img/icons/vehicle/gasstation.png', id: 'REQUEST_VEHICLE_FILL_FUEL', arg: "" }, { label: 'Information', description: 'Informationen zum Fahrzeug', icon: 'img/icons/vehicle/information.png', id: 'REQUEST_VEHICLE_INFORMATION', arg: "" }, { label: 'Reparieren', description: 'Reparieren Sie das Fahrzeug', icon: 'img/icons/vehicle/repair.png', id: 'REQUEST_VEHICLE_REPAIR', arg: "" }];
        this.menuItemsOutOfCarCops = [{ label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" }, { label: 'Schlüssel', description: 'Fahrzeug auf/abschließen', icon: 'img/icons/vehicle/key.png', id: 'REQUEST_VEHICLE_TOGGLE_LOCK_OUTSIDE', arg: "" }, { label: 'Kofferraum', description: 'Öffnet/Schließt den Kofferraum', icon: 'img/icons/vehicle/trunk.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR_OUTSIDE', arg: "5" }, { label: 'Durchsuchen', description: 'Fahrzeug Durchsuchen', icon: 'img/icons/player/search.png', id: 'REQUEST_VEHICLE_FRISK', arg: "" }, { label: 'Tankstelle', description: 'Betanken Sie das Fahrzeug', icon: 'img/icons/vehicle/gasstation.png', id: 'REQUEST_VEHICLE_FILL_FUEL', arg: "" }, { label: 'Information', description: 'Informationen zum Fahrzeug', icon: 'img/icons/vehicle/information.png', id: 'REQUEST_VEHICLE_INFORMATION', arg: "" }, { label: 'Reparieren', description: 'Reparieren Sie das Fahrzeug', icon: 'img/icons/vehicle/repair.png', id: 'REQUEST_VEHICLE_REPAIR', arg: "" }];
        // Menu items for dpos outside of the car
        this.menuItemsOutOfCarDpos = [{ label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" }, { label: 'Schlüssel', description: 'Fahrzeug auf/abschließen', icon: 'img/icons/vehicle/key.png', id: 'REQUEST_VEHICLE_TOGGLE_LOCK_OUTSIDE', arg: "" }, { label: 'Kofferraum', description: 'Öffnet/Schließt den Kofferraum', icon: 'img/icons/vehicle/trunk.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR_OUTSIDE', arg: "5" }, { label: 'Tankstelle', description: 'Betanken Sie das Fahrzeug', icon: 'img/icons/vehicle/gasstation.png', id: 'REQUEST_VEHICLE_FILL_FUEL', arg: "" }, { label: 'Information', description: 'Informationen zum Fahrzeug', icon: 'img/icons/vehicle/information.png', id: 'REQUEST_VEHICLE_INFORMATION', arg: "" }, { label: 'Reparieren', description: 'Reparieren Sie das Fahrzeug', icon: 'img/icons/vehicle/repair.png', id: 'REQUEST_VEHICLE_REPAIR', arg: "" }];
        // Menu items for basic players inside a car
        this.menuItemsInCar = [{ label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" }, { label: 'Schlüssel', description: 'Fahrzeug auf/abschließen', icon: 'img/icons/vehicle/key.png', id: 'REQUEST_VEHICLE_TOGGLE_LOCK', arg: "" }, { label: 'Rauswerfen', description: 'Wirft jemanden aus dem Fahrzeug', icon: 'img/icons/vehicle/eject.png', id: 'REQUEST_VEHICLE_EJECT', arg: "" }, { label: 'Kofferraum', description: 'Öffnet/Schließt den Kofferraum', icon: 'img/icons/vehicle/trunk.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR', arg: "5" }, { label: 'Radio', description: 'Schaltet das Radio ab', icon: 'img/icons/vehicle/radio.png', id: 'LOCAL_ACTION', arg: "RadioOff" }, { label: 'Motor', description: 'Startet/Stopt den Motor', icon: 'img/icons/vehicle/engine.png', id: 'REQUEST_VEHICLE_TOGGLE_ENGINE', arg: "" }];
        this.menuItemsInCarCops = [{ label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" }, { label: 'Schlüssel', description: 'Fahrzeug auf/abschließen', icon: 'img/icons/vehicle/key.png', id: 'REQUEST_VEHICLE_TOGGLE_LOCK', arg: "" }, { label: 'Rauswerfen', description: 'Wirft jemanden aus dem Fahrzeug', icon: 'img/icons/vehicle/eject.png', id: 'REQUEST_VEHICLE_EJECT', arg: "" }, { label: 'Kofferraum', description: 'Öffnet/Schließt den Kofferraum', icon: 'img/icons/vehicle/trunk.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR', arg: "5" }, { label: 'Radio', description: 'Schaltet das Radio ab', icon: 'img/icons/vehicle/radio.png', id: 'LOCAL_ACTION', arg: "RadioOff" }, { label: 'Motor', description: 'Startet/Stopt den Motor', icon: 'img/icons/vehicle/engine.png', id: 'REQUEST_VEHICLE_TOGGLE_ENGINE', arg: "" }];
        // Menu items for dpos inside a car
        this.menuItemsInCarDpos = [{ label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" }, { label: 'Schlüssel', description: 'Fahrzeug auf/abschließen', icon: 'img/icons/vehicle/key.png', id: 'REQUEST_VEHICLE_TOGGLE_LOCK', arg: "" }, { label: 'Rauswerfen', description: 'Wirft jemanden aus dem Fahrzeug', icon: 'img/icons/vehicle/eject.png', id: 'REQUEST_VEHICLE_EJECT', arg: "" }, { label: 'Kofferraum', description: 'Öffnet/Schließt den Kofferraum', icon: 'img/icons/vehicle/trunk.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR', arg: "5" }, { label: 'Motor', description: 'Startet/Stopt den Motor', icon: 'img/icons/vehicle/engine.png', id: 'REQUEST_VEHICLE_TOGGLE_ENGINE', arg: "" }, { label: 'Radio', description: 'Schaltet das Radio ab', icon: 'img/icons/vehicle/radio.png', id: 'LOCAL_ACTION', arg: "RadioOff" }];
        // FLATBED MENU
        this.menuItemsInCarDposFlatbed = [{ label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" }, { label: 'Schlüssel', description: 'Fahrzeug auf/abschließen', icon: 'img/icons/vehicle/key.png', id: 'REQUEST_VEHICLE_TOGGLE_LOCK', arg: "" }, { label: 'Rauswerfen', description: 'Wirft jemanden aus dem Fahrzeug', icon: 'img/icons/vehicle/eject.png', id: 'REQUEST_VEHICLE_EJECT', arg: "" }, { label: 'Kofferraum', description: 'Öffnet/Schließt den Kofferraum', icon: 'img/icons/vehicle/trunk.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR', arg: "5" }, { label: 'Motor', description: 'Startet/Stopt den Motor', icon: 'img/icons/vehicle/engine.png', id: 'REQUEST_VEHICLE_TOGGLE_ENGINE', arg: "" }, { label: 'Radio', description: 'Schaltet das Radio ab', icon: 'img/icons/vehicle/radio.png', id: 'LOCAL_ACTION', arg: "RadioOff" }, { label: 'Hoch/Runter', description: 'Rampe hoch/runter', icon: 'img/icons/vehicle/UpAndDown.png', id: 'REQUEST_VEHICLE_FlATBED_LOAD_TOGGLE', arg: "dposclient" }, { label: 'An/Ab', description: 'Seil an/ab', icon: 'img/icons/vehicle/rope.png', id: 'REQUEST_VEHICLE_FlATBED_ROPE_TOGGLE', arg: "dposclient" }];
        let smokeR = -1;
        let smokeG = -1;
        let smokeB = -1;

        /*
        mp.events.add("syncTuning", (vehicle, slot, tuning) => {
            if (vehicle == null) {
                return;
            }
            let obj = vehicle.getExtraColours(1, 1);
              if (parseInt(slot) == 23) {
                if (mp.game.invoke("0x772960298DA26FDB", vehicle.handle, 23) == tuning) {
                    return;
                }
            }
              if (parseInt(slot) == 14 || parseInt(slot) == 16 || parseInt(slot) == 18) {
                vehicle.setMod(parseInt(slot), tuning);
            }
            else if (parseInt(slot) == 22) {
                if (tuning == -1) {
                    vehicle.toggleMod(22, false);
                    mp.game.invoke("0xE41033B25D003A07", vehicle.handle, 255);
                }
                else {
                    vehicle.toggleMod(22, true);
                }
            }
            else if (parseInt(slot) == 46) {
                mp.game.invoke("0x57C51E6BAD752696", vehicle.handle, tuning)
            }
            else if (parseInt(slot) == 80) {
                mp.game.invoke("0xE41033B25D003A07", vehicle.handle, tuning);
            }
            else if (parseInt(slot) == 81) {
                vehicle.setNumberPlateTextIndex(parseInt(tuning));
            }
            else if (parseInt(slot) == 95) {
                smokeR = tuning
            }
            else if (parseInt(slot) == 96) {
                smokeG = tuning
            }
            else if (parseInt(slot) == 97) {
                smokeB = tuning
            }
            else if (parseInt(slot) == 98) {
                vehicle.setExtraColours(tuning, obj.wheelColor);
            }
            else if (parseInt(slot) == 99) {
                vehicle.setExtraColours(obj.pearlescentColor, tuning);
            }
            else if (parseInt(slot) == 1337) {
                    vehicle.setWheelType(tuning);
            }
            else {
                //vehicle.setMod(slot, tuning);
                mp.game.invoke("0x6AF0636DDEDCB6DD", vehicle.handle, parseInt(slot), tuning, false)
            }
            if (smokeR != -1 && smokeG != -1 && smokeB != -1) {
                vehicle.toggleMod(20, true)
                if (smokeR == 1 && smokeG == 1 && smokeB == 1) {
                    smokeR = 1
                    smokeG = 1
                    smokeB = 1
                }
                vehicle.setTyreSmokeColor(smokeR, smokeG, smokeB)
                smokeR = -1
                smokeG = -1
                smokeB = -1
            }
        });
        */

        mp.events.add("syncVehicleDoor", (vehicle, door, state) => {
            if (vehicle == null) {
                return;
            }

            if (state == true) {
                vehicle.setDoorOpen(door, false, false);
            } else {
                vehicle.setDoorShut(door, false);
            }
        });

        mp.events.add("syncVehicleDoors", (vehicle, doors, state) => {
            if (vehicle == null) {
                return;
            }

            if (state == true) {
                doors.forEach(door => {
                    vehicle.setDoorOpen(door, false, false);
                });
            } else {
                doors.forEach(door => {
                    vehicle.setDoorShut(door, false);
                });
            }
        });

        mp.events.add('shuffleseat', (shuffleplayer, seatindex) => {
            if (shuffleplayer.isInAnyVehicle(false)) {
                if (shuffleplayer == null || shuffleplayer.vehicle == null || !shuffleplayer.vehicle.isSeatFree(seatindex)) return;
                shuffleplayer.taskShuffleToNextVehicleSeat(shuffleplayer.vehicle.handle);
            }
        });

        setInterval(() => {
            if (mp.players.local.vehicle != null && mp.players.local.isInAnyVehicle(false) && (mp.players.local.vehicle.isSirenOn() != this.lastSireneStateCheck || this.lastSireneStateCheck == null)) {
                this.lastSireneStateCheck = mp.players.local.vehicle.isSirenOn();
                mp.events.callRemote("syncSireneStatus", mp.players.local.vehicle, mp.players.local.vehicle.isSirenOn(), mp.players.local.vehicle.isSirenSoundOn(), _player2.default.remoteHashKey);
            }
        }, 500);

        mp.events.add('refreshSireneState', async (vehicle, state, sound) => {
            if (vehicle == null || !mp.vehicles.exists(vehicle)) return;
            await mp.game.waitAsync(100);
            if (vehicle == null || !mp.vehicles.exists(vehicle)) return;
            vehicle.setSiren(state);
            vehicle.setSirenSound(sound);
        });

        mp.events.add('entityStreamIn', async entity => {
            if (entity != null && entity.type == "vehicle") {
                if (!mp.vehicles.exists(entity)) return;

                entity.setInvincible(false);
                await mp.game.waitAsync(100);
                if (entity != null && mp.vehicles.exists(entity) && entity.type == "vehicle") {
                    mp.events.callRemote("requestSireneStatus", entity, _player2.default.remoteHashKey);
                }
            }
        });

        /*
        mp.events.add("responseVehicleSyncData", (vehicle, tuning, doorStates, liveryindex) => {
            if (vehicle == null) return
            
            let obj = vehicle.getExtraColours(1,1);
            let pearlColor = obj.pearlescentColor;
            let wheelColor = obj.wheelColor;
            let tireSmokeR = -1;
            let tireSmokeG = -1;
            let tireSmokeB = -1;
            const mods = JSON.parse(tuning);
            for (const mod in mods) {
                  if(parseInt(mod) == 14 || parseInt(mod) == 16 || parseInt(mod) == 18)
                {
                    vehicle.setMod(parseInt(mod), mods[mod]);
                }
                else if(parseInt(mod) == 22)
                {
                    if(mods[mod] == -1)
                    {
                        vehicle.toggleMod(22, false);
                        mp.game.invoke("0xE41033B25D003A07", vehicle.handle, 255);
                    }
                    else
                    {
                        vehicle.toggleMod(22, true);
                    }
                }
                else if(parseInt(mod) == 46)
                {
                    mp.game.invoke("0x57C51E6BAD752696", vehicle.handle, mods[mod])
                }
                else if(parseInt(mod) == 80)
                {
                    mp.game.invoke("0xE41033B25D003A07", vehicle.handle, mods[mod]);
                }
                else if(parseInt(mod) == 81)
                {
                    vehicle.setNumberPlateTextIndex(mods[mod]);
                }
                else if(parseInt(mod) == 95)
                {
                    tireSmokeR = mods[mod];
                }
                else if(parseInt(mod) == 96)
                {
                    tireSmokeG = mods[mod];
                }
                else if(parseInt(mod) == 97)
                {
                    tireSmokeB = mods[mod];
                }
                else if(parseInt(mod) == 98)
                {
                    pearlColor = mods[mod];
                }
                else if(parseInt(mod) == 99)
                {
                    wheelColor = mods[mod];
                }
                else if (parseInt(mod) == 1337) {
                        vehicle.setWheelType(mods[mod]);
                }
                else
                {
                //vehicle.setMod(parseInt(mod), mods[mod]);
                mp.game.invoke("0x6AF0636DDEDCB6DD", vehicle.handle, parseInt(mod), mods[mod], false)
                }
            }
            vehicle.setExtraColours(pearlColor, wheelColor);
            if(tireSmokeR != -1 || tireSmokeG != -1 || tireSmokeB != -1)
            {
                vehicle.toggleMod(20, true)
                if(smokeR == 1 && smokeG == 1 && smokeB == 1)
                {
                    smokeR = 1
                    smokeG = 1
                    smokeB = 1
                }
                vehicle.setTyreSmokeColor(tireSmokeR, tireSmokeG, tireSmokeB)
            }
            
            const doors = JSON.parse(doorStates);
            for (const door in doors) {
                
                if (doors[door] == true) {
                    vehicle.setDoorOpen(parseInt(door), false, false);
                }
            }
              if(liveryindex > 0) {
                mp.game.invoke("0x60BF608F1B8CD1B6", vehicle.handle, liveryindex);
            }
          });*/
    }

    getVehicleItems() {
        if (_player2.default.isInAnyVehicle(false)) {
            if (_player2.default.team == 16 && _player2.default.duty) {
                return this.menuItemsInCarDposFlatbed;
            } else if (_player2.default.team == 1 && _player2.default.duty) {
                return this.menuItemsInCarCops;
            } else if (_player2.default.team == 13 && _player2.default.duty) {
                return this.menuItemsInCarCops;
            } else if (_player2.default.team == 5 && _player2.default.duty) {
                return this.menuItemsInCarCops;
            } else {
                return this.menuItemsInCar;
            }
        } else {
            if (_player2.default.team == 16 && _player2.default.duty) {
                return this.menuItemsOutOfCarDpos;
            } else if (_player2.default.team == 1 && _player2.default.duty) {
                return this.menuItemsOutOfCarCops;
            } else if (_player2.default.team == 13 && _player2.default.duty) {
                return this.menuItemsOutOfCarCops;
            } else if (_player2.default.team == 5 && _player2.default.duty) {
                return this.menuItemsOutOfCarCops;
            } else {
                return this.menuItemsOutOfCar;
            }
        }
    }
}

exports.default = new VehicleModule();

},{"../player/player":186}],201:[function(require,module,exports){
'use strict';

require('./vehicle-module');

require('./flatbed');

require('./boat-module');

},{"./boat-module":197,"./flatbed":198,"./vehicle-module":200}],202:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _browser = require("../browser/browser");

var _browser2 = _interopRequireDefault(_browser);

var _player = require("../player/player");

var _player2 = _interopRequireDefault(_player);

var _apps = require("../app/apps");

var _apps2 = _interopRequireDefault(_apps);

var _callManage = require("../apps/callManage");

var _callManage2 = _interopRequireDefault(_callManage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Voice {
    constructor() {
        this.radioChatPlayers = '';
        this.radioAirFunkPlayers = '';
        this.serverId = 1;
        this.voiceChannel = '';
        this.voicePassword = '';
        this.streamingRangePlayer = [];
        this.phonePartner = '';

        mp.events.add('setPhoneCallData', data => {
            if (_browser2.default.voice == null) return;
            _apps2.default.show("Smartphone", "CallManageApp");
            _callManage2.default.setPhoneCallData(data);
        });

        mp.events.add('ConnectTeamspeak', () => {
            if (_browser2.default.voice == null) return;
            _browser2.default.voice.reload(false);
        });

        mp.events.add('setVoiceData', (serverId, voiceChannel, voicePassword) => {
            this.serverId = serverId;
            this.voiceChannel = voiceChannel;
            this.voicePassword = voicePassword;
        });

        mp.events.add('setRadioChatPlayers', radioChatPlayers => {
            this.radioChatPlayers = radioChatPlayers;
        });

        mp.events.add('setAirFunkPlayers', funkPlayers => {
            this.radioAirFunkPlayers = funkPlayers;
        });

        mp.events.add('setCallingPlayer', phonePartner => {
            this.phonePartner = phonePartner;
        });

        mp.events.add('entityStreamIn', entity => {
            if (entity != null && entity.type == "player" && mp.players.exists(entity) && entity.getVariable("voiceHash")) {
                this.streamingRangePlayer.push(entity);
            }
        });

        mp.events.add('entityStreamOut', entity => {
            if (entity.type == "player" && mp.players.exists(entity) && entity.getVariable("voiceHash")) {
                let index = this.streamingRangePlayer.indexOf(entity);

                if (index > -1) {
                    this.streamingRangePlayer.splice(index, 1);
                }
            }
        });

        var voice = this;

        setInterval(function () {
            let hash = _player2.default.voiceHash;
            if (hash !== "" && _browser2.default) {
                let user = _player2.default.getPlayer();
                let playerRotation = mp.game.cam.getGameplayCamRot(0);
                let rotation = Math.PI / 180 * (playerRotation.z * -1);
                let voicePlayers = [];

                if (voice.phonePartner && voice.phonePartner !== "") {
                    voicePlayers.push(voice.phonePartner + "~3~0~0~2");
                }

                if (voice.streamingRangePlayer != null) {
                    for (var i = 0; i < voice.streamingRangePlayer.length; i++) {

                        let streamedPlayer = voice.streamingRangePlayer[i];
                        if (streamedPlayer == null || !mp.players.exists(streamedPlayer) || streamedPlayer.type !== "player" || !streamedPlayer.getVariable("voiceHash")) continue;

                        if (streamedPlayer.getVariable("isDead")) continue;
                        if (!streamedPlayer.getVariable("voiceRange")) continue;

                        let streamedPlayerPos = streamedPlayer.position;
                        let distance = _player2.default.getDistance(streamedPlayerPos);

                        let voiceRange = streamedPlayer.getVariable("voiceRange");
                        let streamedPlayerHash = streamedPlayer.getVariable("voiceHash");

                        let volumeModifier = 4;

                        if (voiceRange && voiceRange > 0 && distance < voiceRange) {
                            let subPos = _player2.default.calculateVectorDistance(streamedPlayerPos);

                            let x = subPos.x * Math.cos(rotation) - subPos.y * Math.sin(rotation);
                            let y = subPos.x * Math.sin(rotation) + subPos.y * Math.cos(rotation);

                            x = x * 10 / voiceRange;
                            y = y * 10 / voiceRange;

                            let percent = voiceRange / 100 * distance;
                            volumeModifier = volumeModifier - percent;

                            if (voiceRange === 15) {
                                volumeModifier = volumeModifier * 1.3;
                            } else if (voiceRange === 5) {
                                volumeModifier = volumeModifier * 0.9;
                            } else if (voiceRange === 40) {
                                volumeModifier = volumeModifier * 1.8;
                            }

                            let str = `${streamedPlayerHash}~${Math.round(x * 1000) / 1000}~${Math.round(y * 1000) / 1000}~0~${user.isInAnyVehicle(false) ? Math.round(volumeModifier * 1000) / 1000 / 1.5 : Math.round(volumeModifier * 1000) / 1000}`;

                            voicePlayers.push(str);
                        }
                    }
                }

                let voiceAirFunk = "";
                if (voice.radioAirFunkPlayers.length > 0) {
                    voiceAirFunk = `${voice.radioAirFunkPlayers};`;
                }

                if (_player2.default.state == 0) {
                    _browser2.default.voice.url = `http://localhost:15338/player/${voice.voiceChannel}/${voice.voicePassword}/${hash}/${voiceAirFunk}${voicePlayers.join(";")}/`;
                } else {

                    _browser2.default.voice.url = `http://localhost:15338/player/${voice.voiceChannel}/${voice.voicePassword}/${hash}/${voice.radioChatPlayers};${voiceAirFunk}${voicePlayers.join(";")}/`;
                }
                _browser2.default.voice.execute(`document.body.style.display = "none";`);
            }
        }, 1575);
    }
}

exports.default = new Voice();

},{"../app/apps":3,"../apps/callManage":12,"../browser/browser":93,"../player/player":186}],203:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _windows = require("./windows");

var _windows2 = _interopRequireDefault(_windows);

var _component = require("../components/component");

var _component2 = _interopRequireDefault(_component);

var _peds = require("../peds/peds");

var _peds2 = _interopRequireDefault(_peds);

var _browser = require("../browser/browser");

var _browser2 = _interopRequireDefault(_browser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Window lifecycle
    onCreate()
        ↓
    onShow()
        ↓
    onDismiss()
        ↓
    onDestroy()
*/
class Window extends _component2.default {
    constructor(name, ...events) {
        super(name, ...events);
        // Register window in windows
        _windows2.default.windows.set(name, this);

        // Default values
        this.cursorVisible = false;
        this.hudVisible = true;
        //this.chatVisible = true
    }

    setCurserVisible(visible) {
        this.cursorVisible = visible;
    }

    setHudVisible(visible) {
        this.hudVisible = visible;
    }

    setChatVisible(visible) {
        this.chatVisible = visible;
    }

    show(args) {
        console.log(`window opening; ${this.name} with ${args} args.`);
        this.args = args;
        mp.gui.cursor.visible = this.cursorVisible;
        mp.game.ui.displayHud(this.hudVisible);
        //mp.gui.chat.show(this.chatVisible)
        _peds2.default.disableAllControls(true);
        this.onShow();

        _windows2.default.show(this.name, args);
    }

    isVisible() {
        return _windows2.default.visibleWindow === this.name;
    }

    onShow() {}

    close(clientClose = false) {
        if (!clientClose) {
            _browser2.default.execute("Windows", `show("")`);
        }
        if (this.cursorVisible) {
            mp.gui.cursor.visible = false;
        }
        if (!this.hudVisible) {
            mp.game.ui.displayHud(true);
        }
        /*
        if (!this.chatVisible) {
            mp.gui.chat.show(true)
        }
        */
        _peds2.default.disableAllControls(false);
        this.onClose();

        _windows2.default.close(this.name);
    }

    onClose() {}
}

exports.default = Window;

},{"../browser/browser":93,"../components/component":94,"../peds/peds":180,"./windows":204}],204:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _browser = require("../browser/browser");

var _browser2 = _interopRequireDefault(_browser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Windows {
    constructor() {
        this.windows = new Map();
        this.visibleWindow = null;
        mp.events.add("openWindow", (name, args) => {
            console.log(`window opening; ${name} with ${args} args.`);
            // Check if an window with this name is registered
            if (!this.windows.has(name)) return;
            let window = this.windows.get(name);
            window.show(args);
            //this.show(name, args)
        });
        mp.events.add("onWindowClosed", name => {
            console.log(`window closed from client; ${name}`);
            if (!this.windows.has(name)) return;
            let window = this.windows.get(name);
            window.close(true);
        });
        mp.events.add("closeWindow", name => {
            console.log(`window closed from server; ${name}`);
            if (!this.windows.has(name)) return;
            let window = this.windows.get(name);
            window.close();
        });
    }

    show(name, args) {
        this.visibleWindow = name;
        if (args && args.length > 0) {
            _browser2.default.execute("Windows", `show("${name}", '${args}')`);
        } else {
            _browser2.default.execute("Windows", `show("${name}")`);
        }
    }

    close(name) {
        if (this.visibleWindow === name) {
            this.visibleWindow = null;
        }
    }
}

exports.default = new Windows();

},{"../browser/browser":93}]},{},[1]);

}