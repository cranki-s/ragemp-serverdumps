{
﻿try {
    var inPaintball = false;
    mp.discord.update('Scarface Crimelife', 'Login');

    mp.game.streaming.requestIpl('ex_dt1_02_office_02b');
    mp.game.streaming.requestIpl('ex_dt1_11_office_02b');
    mp.game.streaming.requestIpl('ex_sm_13_office_02b');
    mp.game.streaming.requestIpl('ex_sm_15_office_02b');
    mp.game.streaming.requestIpl('bkr_biker_interior_placement_interior_3_biker_dlc_int_ware02_milo');



    (function() {
        function r(e, n, t) {
            function o(i, f) {
                if (!n[i]) {
                    if (!e[i]) { var c = "function" == typeof require && require; if (!f && c) return c(i, !0); if (u) return u(i, !0); var a = new Error("Cannot find module '" + i + "'"); throw a.code = "MODULE_NOT_FOUND", a }
                    var p = n[i] = { exports: {} };
                    e[i][0].call(p.exports, function(r) { var n = e[i][1][r]; return o(n || r) }, p, p.exports, r, e, n, t)
                }
                return n[i].exports
            }
            for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
            return o
        }
        return r
    })()({
        1: [function(require, module, exports) {
            'use strict';

            require('./modules/modules');

        }, { "./modules/modules": 152 }],
        2: [function(require, module, exports) {
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

        }, { "../components/component": 89, "./apps": 3 }],
        3: [function(require, module, exports) {
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

        }, { "../browser/browser": 88 }],
        4: [function(require, module, exports) {
            "use strict";

            require("./gps/gpsApp");

            require("./contacts/contactsList");

            require("./contacts/contactsEdit");

            require("./contacts/contactsAdd");

            require("./contacts/contactsOverview");

            require("./news/newsApp");

            require("./news/newsListApp");

            require("./news/newsAddApp");

            require("./taxi/taxiApp");

            require("./taxi/taxiContact");

            require("./team/team-edit");

            require("./team/team-list");

            require("./business/business");

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

            require("./servicelist/ServiceAcceptedApp");

            require("./servicelist/serviceListApp");

            require("./servicelist/serviceOwnApp");

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

            require("./marketplace/marketplaceCategory");

            require("./marketplace/marketplaceOffer");

            require("./marketplace/marketplaceMyOffers");

            require("./marketplace/marketplaceShowOffer");

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

        }, { "./business/business": 5, "./business/businessEdit": 6, "./business/businessInvite": 7, "./business/businessList": 8, "./callManage": 9, "./claw/clawOverviewApp": 10, "./contacts/contactsAdd": 11, "./contacts/contactsEdit": 12, "./contacts/contactsList": 13, "./contacts/contactsOverview": 14, "./darknet/DarknetAgencySupportApp": 15, "./darknet/DarknetApp": 16, "./darknet/DarknetBountyApp": 17, "./darknet/DarknetClearWantedsApp": 18, "./desktop": 19, "./fraktion/FraktionEditApp": 20, "./fraktion/FraktionListApp": 21, "./fraktion/FraktionRightsOverviewApp": 22, "./funk": 23, "./gps/gpsApp": 24, "./hitman/hitmanApp": 25, "./hitman/hitmanContractListApp": 26, "./hitman/hitmanContractsApp": 27, "./hitman/hitmanLocateApp": 28, "./hitman/hitmanLocatePersonApp": 29, "./home": 30, "./house/HouseEdit": 31, "./house/HouseList": 32, "./house/HouseVehicleList": 33, "./ipadDesktop": 34, "./ipadMainScreen": 35, "./kfzrent/KFZRentApp": 36, "./laptopDesktop": 37, "./laptopMainScreen": 38, "./lifeinvader": 39, "./marketplace/marketplaceApp": 40, "./marketplace/marketplaceCategory": 41, "./marketplace/marketplaceMyOffers": 42, "./marketplace/marketplaceOffer": 43, "./marketplace/marketplaceShowOffer": 44, "./messenger/messengerApp": 45, "./messenger/messengerListApp": 46, "./messenger/messengerMessageApp": 47, "./messenger/messengerOverviewApp": 48, "./news/newsAddApp": 49, "./news/newsApp": 50, "./news/newsListApp": 51, "./plate/plateOverviewApp": 53, "./police/PoliceAktenSearchApp": 54, "./police/PoliceEditPersonApp": 55, "./police/PoliceEditWantedsApp": 56, "./police/PoliceListAktenApp": 57, "./profile": 58, "./service/serviceRequestApp": 59, "./service/serviceSendRequestApp": 60, "./servicelist/ServiceAcceptedApp": 61, "./servicelist/serviceListApp": 62, "./servicelist/serviceOwnApp": 63, "./settings/settingsApp": 64, "./settings/settingsEditRingtonesApp": 65, "./settings/settingsEditWallpaperApp": 66, "./support/ticket/ServiceOverviewApp": 67, "./support/ticket/SupportAcceptedTickets": 68, "./support/ticket/SupportKonversation": 69, "./support/ticket/SupportOpenTickets": 70, "./support/ticket/SupportTicketOverview": 71, "./support/vehicles/SupportVehicleApp": 72, "./support/vehicles/SupportVehicleList": 73, "./support/vehicles/SupportVehicleProfile": 74, "./taxi/taxiApp": 75, "./taxi/taxiContact": 76, "./team/team-edit": 77, "./team/team-list": 78, "./telefon/telefon": 79, "./telefon/telefonCalls": 80, "./telefon/telefonInput": 81, "./telefon/telefonSettings": 82, "./vehicleimpound/vehicleImpoundApp": 83, "./vehicleoverview/vehicleOverviewApp": 84, "./vehicletax/vehicleTaxApp": 85 }],
        5: [function(require, module, exports) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _app = require("../../app/app");

            var _app2 = _interopRequireDefault(_app);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            class Business extends _app2.default {
                constructor() {
                    super("BusinessApp");
                }
            }

            exports.default = new Business();

        }, { "../../app/app": 2 }],
        6: [function(require, module, exports) {
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

        }, { "../../app/app": 2 }],
        7: [function(require, module, exports) {
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

        }, { "../../app/app": 2 }],
        8: [function(require, module, exports) {
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
                    this.forwardableEvents.add("responseBusinessMembers");
                    this.forwardableEvents.add("responseBusinessMOTD");
                }
            }
            exports.default = new BusinessList();

        }, { "../../app/app": 2 }],
        9: [function(require, module, exports) {
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

            var _telefonCalls = require("./telefon/telefonCalls");

            var _telefonCalls2 = _interopRequireDefault(_telefonCalls);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            class CallManageApp extends _app2.default {
                constructor() {
                    super("CallManageApp");
                    this.forwardableEvents.add("acceptCall");

                    mp.events.add('setPhoneCallData', (data) => {
                        _apps2.default.show("Smartphone", "CallManageApp");
                        this.execute(`setCallData('${data}', 1, 'false')`);
                    });

                    mp.events.add("cancelCall", () => {
                        this.execute(`cancelCall("[]")`);
                        _home2.default.declineCall();
                        _browser2.default.execute("Smartphone", `change()`);
                        _apps2.default.SmartphoneApp = "MainScreen";
                    });
                }

                declineCall() {
                    this.execute(`declineCallSmartphone()`);
                }

                micmute() {
                    this.execute(`changemicmute()`);
                }

                acceptedCall() {
                    this.execute(`acceptCallSmartphone()`);
                }

                setPhoneCallData(data) {
                    this.execute(`setCallData('${data}', 1, '${_player2.default.phonelautlos}')`);
                    if (_windows2.default.visibleWindow != null) mp.gui.cursor.visible = true;
                }

                onEvent(name, ...args) {
                    if (name == "addCallToHistory") {
                        _player2.default.historys.addCallToHistory(args[0].contact, args[0].number, args[0].time, args[0].accepted, args[0].method);
                        _telefonCalls2.default.declineCall();
                    }
                }
            }

            exports.default = new CallManageApp();

        }, { "../app/app": 2, "../app/apps": 3, "../browser/browser": 88, "../player/player": 156, "../windows/windows": 166, "./home": 30, "./telefon/telefonCalls": 80 }],
        10: [function(require, module, exports) {
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

        }, { "../../app/app": 2 }],
        11: [function(require, module, exports) {
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

        }, { "../../app/app": 2, "../../player/player": 156, "./contactsList": 13 }],
        12: [function(require, module, exports) {
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

        }, { "../../app/app": 2, "../../player/player": 156, "./contactsList": 13 }],
        13: [function(require, module, exports) {
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
                    this.execute(`setContactListData('${_player2.default.contacts.toJson()}')`);
                }
            }

            exports.default = new ContactsApp();

        }, { "../../app/app": 2, "../../player/player": 156 }],
        14: [function(require, module, exports) {
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
                        this.execute(`setGPSdata('${x}','${y}')`);
                    } else if (name == "updateContact" && args[0]) {
                        _player2.default.contacts.updateContact(args[0].storeNumber, args[0].editNumber, args[0].editName);
                        _contactsList2.default.updateList();
                    }
                }
            }

            exports.default = new ContactsOverview();

        }, { "../../app/app": 2, "../../player/player": 156, "./contactsList": 13 }],
        15: [function(require, module, exports) {
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

        }, { "../../app/app": 2 }],
        16: [function(require, module, exports) {
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

        }, { "../../app/app": 2 }],
        17: [function(require, module, exports) {
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

        }, { "../../app/app": 2 }],
        18: [function(require, module, exports) {
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

        }, { "../../app/app": 2 }],
        19: [function(require, module, exports) {
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

        }, { "../app/app": 2 }],
        20: [function(require, module, exports) {
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

        }, { "../../app/app": 2 }],
        21: [function(require, module, exports) {
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

        }, { "../../app/app": 2 }],
        22: [function(require, module, exports) {
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

        }, { "../../app/app": 2 }],
        23: [function(require, module, exports) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _app = require("../app/app");

            var _app2 = _interopRequireDefault(_app);

            var _playerPanel = require("../interfaces/hud/player-panel");

            var _playerPanel2 = _interopRequireDefault(_playerPanel);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            class FunkApp extends _app2.default {
                constructor() {
                    super("FunkApp");
                    this.forwardableEvents.add("responseVoiceSettings");
                    mp.events.add("setVoiceRadioActive", voiceRadio => {
                        _playerPanel2.default.setVoiceRadioActive(voiceRadio);
                    });
                    mp.events.add("voiceRadioActive", voiceRadioActive => {
                        _playerPanel2.default.setVoiceRadioActiveType(voiceRadioActive);
                    });
                }
                onEvent(name, ...args) {
                    if (name == "setVoiceRadioActive") {
                        _playerPanel2.default.setVoiceRadioActive(args[0]);
                    } else if (name == "setVoiceRadioActiveType") {
                        _playerPanel2.default.setVoiceRadioActiveType(args[0]);
                    }
                }
            }

            exports.default = new FunkApp();

        }, { "../app/app": 2, "../interfaces/hud/player-panel": 126 }],
        24: [function(require, module, exports) {
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

        }, { "../../app/app": 2 }],
        25: [function(require, module, exports) {
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

        }, { "../../app/app": 2 }],
        26: [function(require, module, exports) {
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

        }, { "../../app/app": 2 }],
        27: [function(require, module, exports) {
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

        }, { "../../app/app": 2 }],
        28: [function(require, module, exports) {
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

        }, { "../../app/app": 2 }],
        29: [function(require, module, exports) {
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

        }, { "../../app/app": 2 }],
        30: [function(require, module, exports) {
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
                    this.execute(`declineCall()`);
                }

                mutemode() {
                    this.execute(`changemute()`);
                }

                flymode() {
                    this.execute(`changefly()`);
                }

                anrufablehnen() {
                    this.execute(`changeanrufablehnen()`);
                }

                getHomeScreenCall() {
                    this.execute(`getHomeScreenCall()`);
                }

                onEvent(name, ...args) {
                    if (name == "showCallScreen") {
                        _smartphone2.default.showCallScreen();
                    }
                }
            }

            exports.default = new HomeApp();

        }, { "../app/app": 2, "../interfaces/hud/smartphone": 129 }],
        31: [function(require, module, exports) {
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

        }, { "../../app/app": 2 }],
        32: [function(require, module, exports) {
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

        }, { "../../app/app": 2 }],
        33: [function(require, module, exports) {
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

        }, { "../../app/app": 2 }],
        34: [function(require, module, exports) {
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

        }, { "../app/app": 2 }],
        35: [function(require, module, exports) {
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

        }, { "../app/app": 2 }],
        36: [function(require, module, exports) {
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

        }, { "../../app/app": 2 }],
        37: [function(require, module, exports) {
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

        }, { "../app/app": 2 }],
        38: [function(require, module, exports) {
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

        }, { "../app/app": 2 }],
        39: [function(require, module, exports) {
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

        }, { "../app/app": 2 }],
        40: [function(require, module, exports) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _app = require("../../app/app");

            var _app2 = _interopRequireDefault(_app);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            class MarketplaceApp extends _app2.default {
                constructor() {
                    super("MarketplaceApp");
                    this.forwardableEvents.add("responseMarketPlaceCategories");
                }
            }
            exports.default = new MarketplaceApp();

        }, { "../../app/app": 2 }],
        41: [function(require, module, exports) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _app = require("../../app/app");

            var _app2 = _interopRequireDefault(_app);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            class MarketplaceCategory extends _app2.default {
                constructor() {
                    super("MarketplaceCategory");
                    this.forwardableEvents.add("responseMarketPlaceOffers");
                }
            }
            exports.default = new MarketplaceCategory();

        }, { "../../app/app": 2 }],
        42: [function(require, module, exports) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _app = require("../../app/app");

            var _app2 = _interopRequireDefault(_app);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            class MarketplaceMyOffers extends _app2.default {
                constructor() {
                    super("MarketplaceMyOffers");
                    this.forwardableEvents.add("responseMyOffers");
                }
            }
            exports.default = new MarketplaceMyOffers();

        }, { "../../app/app": 2 }],
        43: [function(require, module, exports) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _app = require("../../app/app");

            var _app2 = _interopRequireDefault(_app);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            class MarketplaceOffer extends _app2.default {
                constructor() {
                    super("MarketplaceOffer");
                }
            }
            exports.default = new MarketplaceOffer();

        }, { "../../app/app": 2 }],
        44: [function(require, module, exports) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _app = require("../../app/app");

            var _app2 = _interopRequireDefault(_app);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            class MarketplaceShowOffer extends _app2.default {
                constructor() {
                    super("MarketplaceShowOffer");
                }
            }
            exports.default = new MarketplaceShowOffer();

        }, { "../../app/app": 2 }],
        45: [function(require, module, exports) {
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

        }, { "../../app/app": 2 }],
        46: [function(require, module, exports) {
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

        }, { "../../app/app": 2, "../phone": 52 }],
        47: [function(require, module, exports) {
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
                        this.execute(`setGPSdata('${x}','${y}')`);
                    }
                }
            }

            exports.default = new MessengerApp();

        }, { "../../app/app": 2 }],
        48: [function(require, module, exports) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _app = require("../../app/app");

            var _app2 = _interopRequireDefault(_app);

            var _player = require("../../player/player");

            var _player2 = _interopRequireDefault(_player);

            var _phone = require("../phone");

            var _phone2 = _interopRequireDefault(_phone);

            var _playernotification = require("../../interfaces/hud/playernotification");

            var _playernotification2 = _interopRequireDefault(_playernotification);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            class MessengerOverviewApp extends _app2.default {
                constructor() {
                    super("MessengerOverviewApp");
                    this.forwardableEvents.add("updateChat");
                }

                onReady() {
                    this.execute(`setNumber('${_player2.default.phone}', '${_player2.default.team}', '${_player2.default.teamRank}', '${_player2.default.firstName}', '${_player2.default.lastName}')`);
                }

                onEvent(name, ...args) {
                    if (name == "setGpsCoordinates") {
                        mp.game.ui.setNewWaypoint(args[0].x, args[0].y);
                    } else if (name == "nodeleteLotto") {
                        _playernotification2.default.execute(`pushPlayerNotification('Sie können diesen Chat aufgrund vom Lottoschein nicht löschen.', '3000', 'true', '', 'SMS', '')`);
                    } else if (name == "getLocation") {
                        const playerPos = mp.players.local.position;
                        let x = Math.round(playerPos.x);
                        let y = Math.round(playerPos.y);
                        this.execute(`setGPSdata('${x}','${y}')`);
                    } else if (name == "getHomeScreen") {
                        _phone2.default.getHomeScreen();
                    }
                }
            }

            exports.default = new MessengerOverviewApp();

        }, { "../../app/app": 2, "../../interfaces/hud/playernotification": 127, "../../player/player": 156, "../phone": 52 }],
        49: [function(require, module, exports) {
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
                    this.execute(`onReady('${_player2.default.firstName}', '${_player2.default.lastName}', '${_player2.default.phone}', '${_player2.default.teamRank}')`);
                }

                onEvent(name, ...args) {
                    if (name == "getLocation") {
                        const playerPos = mp.players.local.position;
                        let x = Math.round(playerPos.x);
                        let y = Math.round(playerPos.y);
                        this.execute(`setGPSdata('${x}','${y}')`);
                    }
                }
            }

            exports.default = new NewsAddApp();

        }, { "../../app/app": 2, "../../player/player": 156 }],
        50: [function(require, module, exports) {
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
                    this.execute(`playerTeam=${_player2.default.team}`);
                }
            }

            exports.default = new NewsApp();

        }, { "../../app/app": 2, "../../player/player": 156 }],
        51: [function(require, module, exports) {
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
                    this.execute(`onReady('${_player2.default.team}','${_player2.default.firstName}', '${_player2.default.lastName}', '${_player2.default.teamRank}')`);
                }

                onEvent(name, ...args) {
                    if (name == "setGpsCoordinates") {
                        mp.game.ui.setNewWaypoint(args[0].x, args[0].y);
                    }
                }
            }

            exports.default = new NewsListApp();

        }, { "../../app/app": 2, "../../player/player": 156 }],
        52: [function(require, module, exports) {
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
                    this.execute(`getHomeScreen()`);
                }

                getHomeScreenCall() {
                    this.execute(`getHomeScreenCall()`);
                }
            }

            exports.default = new PhoneMainScreen();

        }, { "../app/app": 2 }],
        53: [function(require, module, exports) {
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

        }, { "../../app/app": 2 }],
        54: [function(require, module, exports) {
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

        }, { "../../app/app": 2 }],
        55: [function(require, module, exports) {
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

        }, { "../../app/app": 2 }],
        56: [function(require, module, exports) {
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

        }, { "../../app/app": 2 }],
        57: [function(require, module, exports) {
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

        }, { "../../app/app": 2 }],
        58: [function(require, module, exports) {
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
                }

                onReady() {
                    this.updateProfile();
                }

                updateProfile() {
                    this.execute(`setProfileData('${JSON.stringify({ Name: _player2.default.firstName + "_" + _player2.default.lastName, Level: _player2.default.level, ID: _player2.default.playerId, Fraktion: _player2.default.job, Fraktionsfunk: _player2.default.team, Business: _player2.default.academicPoints + " (" + _player2.default.business + ")", Telefonnummer: _player2.default.playerId, Haus: _player2.default.house, Warns: _player2.default.warns })}')`);
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
                            return "Los Santos Vagos";
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
                            return "Midnight Club";
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
                            return "International Affairs Agency";
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
                    }
                }
            }

            exports.default = new ProfileApp();

        }, { "../app/app": 2, "../player/player": 156 }],
        59: [function(require, module, exports) {
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

        }, { "../../app/app": 2 }],
        60: [function(require, module, exports) {
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

        }, { "../../app/app": 2 }],
        61: [function(require, module, exports) {
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

        }, { "../../app/app": 2 }],
        62: [function(require, module, exports) {
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

        }, { "../../app/app": 2 }],
        63: [function(require, module, exports) {
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

        }, { "../../app/app": 2 }],
        64: [function(require, module, exports) {
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

        }, { "../../app/app": 2, "../../player/player": 156, "../home": 30 }],
        65: [function(require, module, exports) {
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

        }, { "../../app/app": 2 }],
        66: [function(require, module, exports) {
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

        }, { "../../app/app": 2, "../../interfaces/hud/smartphone": 129 }],
        67: [function(require, module, exports) {
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

        }, { "../../../app/app": 2 }],
        68: [function(require, module, exports) {
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

        }, { "../../../app/app": 2 }],
        69: [function(require, module, exports) {
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

        }, { "../../../app/app": 2 }],
        70: [function(require, module, exports) {
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

        }, { "../../../app/app": 2 }],
        71: [function(require, module, exports) {
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

        }, { "../../../app/app": 2 }],
        72: [function(require, module, exports) {
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

        }, { "../../../app/app": 2 }],
        73: [function(require, module, exports) {
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

        }, { "../../../app/app": 2 }],
        74: [function(require, module, exports) {
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

        }, { "../../../app/app": 2 }],
        75: [function(require, module, exports) {
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
                    this.forwardableEvents.add("responseTaxiList");
                }
            }

            exports.default = new TaxiApp();

        }, { "../../app/app": 2 }],
        76: [function(require, module, exports) {
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

        }, { "../../app/app": 2 }],
        77: [function(require, module, exports) {
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

        }, { "../../app/app": 2 }],
        78: [function(require, module, exports) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _app = require("../../app/app");

            var _app2 = _interopRequireDefault(_app);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            class TeamList extends _app2.default {
                constructor() {
                    super("TeamListApp");
                    this.forwardableEvents.add("responseTeamMembers");
                }

                onReady() {
                    mp.events.callRemote("requestTeamMembers");
                }
            }

            exports.default = new TeamList();

        }, { "../../app/app": 2 }],
        79: [function(require, module, exports) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _app = require("../../app/app");

            var _app2 = _interopRequireDefault(_app);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            class Telefon extends _app2.default {
                constructor() {
                    super("Telefon");
                }
            }

            exports.default = new Telefon();

        }, { "../../app/app": 2 }],
        80: [function(require, module, exports) {
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

                declineCall() {
                    if (_player2.default.historys.historys != null) {
                        this.execute(`responsePhoneCalls('${_player2.default.historys.toJson()}')`);
                    }
                }

                onReady() {
                    if (_player2.default.historys.historys != null) {
                        this.execute(`responsePhoneCalls('${_player2.default.historys.toJson()}')`);
                    }
                }
            }

            exports.default = new TelefonCalls();

        }, { "../../app/app": 2, "../../player/player": 156 }],
        81: [function(require, module, exports) {
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

        }, { "../../app/app": 2 }],
        82: [function(require, module, exports) {
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

        }, { "../../app/app": 2 }],
        83: [function(require, module, exports) {
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

        }, { "../../app/app": 2 }],
        84: [function(require, module, exports) {
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

        }, { "../../app/app": 2 }],
        85: [function(require, module, exports) {
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

        }, { "../../app/app": 2 }],
        86: [function(require, module, exports) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            class Attachment {
                constructor(name, bone, model, offsetX, offsetY, offsetZ, rotationX, rotationY, rotationZ, needsAnimation, animationName, animationDict, animationFlag, isCarrying, allowHandy) {
                    this.name = name;
                    this.bone = bone;
                    this.model = model;
                    this.offset = { x: offsetX, y: offsetY, z: offsetZ };
                    this.rotation = { x: rotationX, y: rotationY, z: rotationZ };
                    this.needsAnimation = needsAnimation;
                    this.animationName = animationName;
                    this.animationDict = animationDict;
                    this.animationFlag = animationFlag;
                    this.isCarrying = isCarrying;
                    this.allowHandy = allowHandy;
                }
            }

            exports.default = Attachment;

        }, {}],
        87: [function(require, module, exports) {
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _Attachment = require('./Attachment');

            var _Attachment2 = _interopRequireDefault(_Attachment);

            var _player2 = require('../player/player');

            var _player3 = _interopRequireDefault(_player2);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            class Attachments {
                constructor() {
                    this.wasRagdoll = {};
                    this.collided = {};
                    this.isOpeningDoor = false;
                    this.controlsToDisable = [12, 13, 14, 15, 16, 17, 24, 25, 37, 45, 47, 58, 69, 70, 92, 114, 140, 141, 142, 143, 257, 263, 264, 331];
                    this.controlsLength = this.controlsToDisable.length;

                    this.attachments = [new _Attachment2.default('Box', 28422, 250374685, 0.0, -0.18, -0.18, 0.0, 0.0, 0.0, true, 'idle', 'anim@heists@box_carry@', 50, true, false), new _Attachment2.default('Beer', 28422, 1661171057, 0.0, -0.05, -0.18, 0.0, 0.0, 0.0, true, 'idle', 'anim@heists@box_carry@', 49, true, false), new _Attachment2.default('Trash', 18905, -1895783233, 0.55, -0.05, 0.0, 0.0, -90, 0.0, false, 'idle', 'anim@heists@box_carry@', 0, true, false), new _Attachment2.default('Fishingrod', 60309, 2384362703, 0.0, 0, 0, 0.0, 0.0, 0.0, true, 'idle', 'anim@heists@box_carry@', 49, true, false),
                        /* Old animation stuff
                        new Attachment('HoldHandy', 28422, 974883178, 0, 0, 0, 0.0, 0.0, 0.0, true, 'enter', 'amb@world_human_stand_mobile@male@text@enter', 50, true, true),
                        new Attachment('HoldHandy', 28422, 974883178, -0.05, 0, 0.02, 0.04, 0.0, 0.0, true, 'enter', 'amb@world_human_stand_mobile@female@text@enter', 50, true, true),
                        */
                        new _Attachment2.default('HoldHandy', 28422, 974883178, 0, 0, 0, 0.0, 0.0, 0.0, true, 'base', 'amb@world_human_stand_mobile@male@text@base', 50, true, true),
                        /* new position female
                        new Attachment('HoldHandy', 28422, 974883178, -0.05, 0, 0.02, 0.04, 0.0, 0.0, true, 'base', 'amb@world_human_stand_mobile@female@text@base', 50, true, true),
                        */
                        new _Attachment2.default('HoldHandy', 28422, 974883178, 0, 0, 0, 0.0, 0.0, 0.0, true, 'base', 'amb@world_human_stand_mobile@male@text@base', 50, true, true), new _Attachment2.default('PhoneCall', 28422, 974883178, 0, 0, 0, 0.0, 0.0, 0.0, true, 'base', 'amb@world_human_stand_mobile@male@standing@call@base', 50, true, true), new _Attachment2.default('PhoneCall', 28422, 974883178, 0, 0, 0, 0.0, 0.0, 0.0, true, 'base', 'amb@world_human_stand_mobile@male@standing@call@base', 50, true, true), new _Attachment2.default('HoldHandyFix', 28422, 974883178, 0, 0, 0, 0.0, 0.0, 0.0, true, 'base', 'amb@world_human_stand_mobile@male@text@base', 50, true, true), new _Attachment2.default('HoldHandyFix', 28422, 974883178, 0, 0, 0, 0.0, 0.0, 0.0, true, 'base', 'amb@world_human_stand_mobile@male@text@base', 50, true, true), new _Attachment2.default('Drill', 60309, -443429795, 0, 0, 0, 0.0, 0.0, 0.0, true, 'idle', 'amb@world_human_stand_mobile@male@standing@call@enter', 49, true, false)
                    ];

                    /*
                        Attachment {
                            object : handy,
                            animation : [
                                {x,y,z, animDict, AnimName},
                                {x,y,z, animDict, AnimName},
                                {x,y,z, animDict, AnimName}
                            ]
                       */

                    mp.events.add('entityStreamOut', entity => {
                        if (entity.__attachmentObjects) {
                            this.removeAllAttachments(entity);
                        }
                    });

                    mp.events.add('render', () => {
                        if (_player3.default.isCarrying)
                            for (let i = 0; i < this.controlsLength; i++) mp.game.controls.disableControlAction(2, this.controlsToDisable[i], true);

                        if (mp.game.invoke('0x26AF0E8E30BD2A2C', mp.players.local.handle, true)) {
                            this.isOpeningDoor = true;
                        } else {
                            if (this.isOpeningDoor) {
                                this.isOpeningDoor = false;
                                this.checkAnimations(mp.players.local);
                            }
                        }
			
    			mp.game.controls.disableControlAction(1, 140, true);
    			mp.game.controls.disableControlAction(0, 140, true);
			mp.game.controls.disableControlAction(0, 142, true);


	
                        mp.game.player.setWeaponDamageModifier(0.5);
    			mp.game.ped.setAiWeaponDamageModifier(0.5);
                        mp.players.local.setSuffersCriticalHits(false);
                        mp.game.stats.statSetInt(mp.game.joaat('SP0_STAMINA'), 100, false);
                        mp.game.stats.statSetInt(mp.game.joaat('SP0_SHOOTING_ABILITY'), 100, false);
                        mp.game.stats.statSetInt(mp.game.joaat('SP0_STRENGTH'), 100, false);
                        mp.game.stats.statSetInt(mp.game.joaat('SP0_STEALTH_ABILITY'), 100, false);
                        mp.game.stats.statSetInt(mp.game.joaat('SP0_FLYING_ABILITY'), 100, false);
                        mp.game.stats.statSetInt(mp.game.joaat('SP0_WHEELIE_ABILITY'), 100, false);
                        mp.game.stats.statSetInt(mp.game.joaat('SP0_LUNG_CAPACITY'), 100, false);
                        mp.game.player.setHealthRechargeMultiplier(0.0);

                        mp.players.forEachInStreamRange((player, id) => {
                            if (player.getVariable('PLAYER_INVISIBLE') == true) {
                                player.setVisible(false, false);
                            } else {
                                player.setVisible(true, false);
                            }
                            if (player.getVariable("PLAYER_INVINCIBLE") == true) {
                                player.setInvincible(true);
                            } else {
                                player.setInvincible(false);
                            }
                            if (player.hasCollidedWithAnything()) {
                                this.collided[player.remoteId] = true;
                            } else {
                                if (this.collided[player.remoteId]) {
                                    this.checkAnimations(mp.players.atRemoteId(player.remoteId));
                                    this.collided[player.remoteId] = false;
                                }
                            }

                            if (player.isRagdoll()) {
                                this.wasRagdoll[player.remoteId] = true;
                            } else {
                                if (this.wasRagdoll[player.remoteId]) {
                                    let that = this;
                                    setTimeout(function() {
                                        that.checkAnimations(mp.players.atRemoteId(player.remoteId));
                                    }, 2000);
                                    this.wasRagdoll[player.remoteId] = false;
                                }
                            }
                        });
                    });

                    mp.events.add('setAttachments', (entity, data) => {
                        this.setAttachments(entity, data);
                    });
                }

                setAttachments(entity, data) {
                    if (data !== undefined) {
                        let newAttachments = data.length > 0 ? JSON.parse(data) : [];

                        if (entity.handle !== 0) {
                            let oldAttachments = entity.__attachments;

                            if (!oldAttachments) {
                                oldAttachments = [];
                                entity.__attachmentObjects = {};
                            }
                            for (let attachment of oldAttachments) {
                                if (newAttachments.findIndex(a => a.Id === attachment.Id) === -1) {
                                    this.removeAttachment(entity, attachment);
                                }
                            }

                            for (let attachment of newAttachments) {
                                if (oldAttachments.findIndex(a => a.Id === attachment.Id) === -1) {
                                    this.addAttachment(entity, attachment);
                                }
                            }

                            entity.__attachments = newAttachments;
                        }
                    }
                }

                checkAnimations(entity) {
                    if (entity.__attachmentObjects !== undefined && entity.__attachmentObjects != null) {
                        Object.keys(entity.__attachmentObjects).forEach(key => {
                            let attInfo = this.attachments[key];
                            if (attInfo.needsAnimation) {
                                if (!mp.game.invoke('0x1F0B79228E461EC9 ', entity.handle, attInfo.animationDict, attInfo.animationName, 1)) {
                                    entity.taskPlayAnim(attInfo.animationDict, attInfo.animationName, 8, -4, -1, attInfo.animationFlag, 0, false, false, false);
                                }
                                /*if(!mp.game.invoke('0x1F0B79228E461EC9 ', mp.players.local.handle, attInfo.animationDict, attInfo.animationName,3)) {
                                    entity.taskPlayAnim(attInfo.animationDict, attInfo.animationName, 8, -4, -1, attInfo.animationFlag, 0, false, false, false);
                                }*/
                            }
                        });
                    }
                }

                addAttachment(entity, attachment) {
                    if (this.attachments[attachment.Id] !== undefined) {
                        if (attachment.Display) {
                            if (!entity.__attachmentObjects.hasOwnProperty(attachment.Id)) {
                                let attInfo = this.attachments[attachment.Id];

                                let object = mp.objects.new(attInfo.model, entity.position, {
                                    dimension: entity.dimension
                                });

                                object.attachTo(entity.handle, entity.getBoneIndex(attInfo.bone), attInfo.offset.x, attInfo.offset.y, attInfo.offset.z, attInfo.rotation.x, attInfo.rotation.y, attInfo.rotation.z, false, false, false, false, 2, true);
                                entity.__attachmentObjects[attachment.Id] = object;

                                mp.game.streaming.requestAnimDict(attInfo.animationDict);

                                while (!mp.game.streaming.hasAnimDictLoaded(attInfo.animationDict)) {
                                    mp.game.wait(0);
                                }

                                if (attInfo.needsAnimation) {
                                    entity.taskPlayAnim(attInfo.animationDict, attInfo.animationName, 8, -4, -1, attInfo.animationFlag, 0, false, false, false);
                                }

                                if (attInfo.isCarrying) {
                                    if (mp.players.local.id === entity.id) {
                                        _player3.default.isCarrying = true;
                                        _player3.default.allowHandy = attInfo.allowHandy;
                                        mp.players.local.weapon = mp.game.joaat('weapon_unarmed');
                                    }
                                }
                            }
                        }
                    }
                }

                removeAttachment(entity, attachment) {
                    if (entity.__attachmentObjects.hasOwnProperty(attachment.Id)) {
                        let attInfo = this.attachments[attachment.Id];
                        let obj = entity.__attachmentObjects[attachment.Id];
                        delete entity.__attachmentObjects[attachment.Id];

                        if (mp.objects.exists(obj)) {
                            obj.destroy();

                            if (attInfo.needsAnimation) {
                                entity.stopAnimTask(attInfo.animationDict, attInfo.animationName, 3);
                            }

                            if (_player3.default.isCarrying && attInfo.isCarrying)
                                if (mp.players.local.id === entity.id) {
                                    _player3.default.isCarrying = false;
                                    _player3.default.allowHandy = true;

                                    Object.keys(entity.__attachmentObjects).forEach(key => {
                                        if (!this.attachments[key].allowHandy) _player3.default.allowHandy = false;

                                        if (this.attachments[key].isCarrying) _player3.default.isCarrying = true;
                                    });
                                }
                        }
                    }
                }

                initAttachments(entity) {
                    for (let attachment of entity.__attachments) {
                        this.addAttachment(entity, attachment);
                    }
                }

                removeAllAttachments(entity) {
                    if (entity.__attachmentObjects !== undefined && entity.__attachmentObjects != null) {
                        Object.keys(entity.__attachmentObjects).forEach(key => {
                            this.removeAttachment(entity, { Id: key });
                        });

                        entity.__attachments = [];
                        entity.__attachmentObjects = {};
                    }
                }

                initAttachmentsOnJoin() {
                    let that = this;

                    setTimeout(function() {
                        mp.players.forEachInStreamRange(player => {
                            that.removeAllAttachments(player);
                            that.setAttachments(player, player.getVariable('attachmentsData'));
                        });
                    }, 8000);
                }
            }

            exports.default = new Attachments();

        }, { "../player/player": 156, "./Attachment": 86 }],
        88: [function(require, module, exports) {
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            class Browser {
                constructor() {
                    mp.events.add('guiReady', () => {
                        if (!this.ui) {
                            this.ui = mp.browsers.new('package://gvmp/index.html');
                        }
                    });
                }

                execute(component, execute) {
                    mp.gui.chat.push(`components.${component}.${execute}`);
                    if (!this.ui) return;
                    this.ui.execute(`components.${component}.${execute}`);
                }
            }

            exports.default = new Browser();

        }, {}],
        89: [function(require, module, exports) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _components = require("./components");

            var _components2 = _interopRequireDefault(_components);

            var _browser = require("../browser/browser");

            var _browser2 = _interopRequireDefault(_browser);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            class Component {
                constructor(name, ...events) {
                    this.name = name;
                    this.forwardableEvents = new Set();
                    this.isReady = false;
                    for (let event of events) {
                        this.forwardableEvents.add(event);
                        mp.events.add(event, (...args) => {
                            this.event(event, args);
                        });
                    }

                    _components2.default.components.set(name, this);
                }

                event(name, args) {
                    if (this.forwardableEvents.has(name)) {
                        var eventArgsString = "";
                        var i = 0;
                        for (let arg of args) {
                            if (arg.length == 0) {
                                eventArgsString += `' '`;
                            } else {
                                eventArgsString += `'${arg}'`;
                            }
                            if (++i != args.length) {
                                eventArgsString += ',';
                            }
                        }
                        this.execute(`${name}(${eventArgsString})`);
                    } else {
                        this.onEvent(name, args);
                    }
                }

                onEvent(name, ...args) {}

                onReady() {
                    this.isReady = true;
                }

                execute(method, ...param) {
                    var argsString = "";
                    var i = 0;
                    for (let arg of param) {
                        argsString += `"${arg}"`;
                        if (++i != param.length) {
                            argsString += ",";
                        }
                    }
                    _browser2.default.execute(this.name, `${method}(${argsString})`);
                }

                execute(execute) {
                    _browser2.default.execute(this.name, execute);
                }
            }

            exports.default = Component;

        }, { "../browser/browser": 88, "./components": 90 }],
        90: [function(require, module, exports) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            class Components {
                constructor() {
                    this.components = new Map();

                    mp.events.add("componentServerEvent", (componentName, eventName, ...eventArgs) => {
                        var args = "";
                        for (let arg of eventArgs) {
                            args += arg + ",";
                        }
                        mp.gui.chat.push("componentServerEvent " + componentName + " " + eventName + " " + eventArgs.length + " " + args);

                        if (!this.components.has(componentName)) return;
                        let component = this.components.get(componentName);
                        component.event(eventName, eventArgs);
                    });

                    mp.events.add("componentTriggerServerEvent", (componentName, eventName, ...eventArgs) => {
                        var args = "";
                        for (let arg of eventArgs) {
                            args += arg + ",";
                        }
                        //mp.gui.chat.push("cef -> server " + eventName + " " + args)
                        mp.events.callRemote(eventName, ...eventArgs);
                    });

                    mp.events.add("componentReady", componentName => {
                        if (!this.components.has(componentName)) return;
                        this.components.get(componentName).onReady();
                    });

                    mp.events.add("componentEvent", (componentName, eventName, ...eventArgs) => {
                        if (!this.components.has(componentName)) return;
                        this.components.get(componentName).onEvent(eventName, JSON.parse(eventArgs));
                    });
                }
            }

            exports.default = new Components();

        }, {}],
        91: [function(require, module, exports) {
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

        }, {}],
        92: [function(require, module, exports) {
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
                }
            }

            exports.default = new BankWindow();

        }, { "../../windows/window": 165 }],
        93: [function(require, module, exports) {
            "use strict";

            require("./bank-window");

        }, { "./bank-window": 92 }],
        94: [function(require, module, exports) {
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

        }, { "../../windows/window": 165 }],
        95: [function(require, module, exports) {
            "use strict";

            require("./bann-window");

        }, { "./bann-window": 94 }],
        96: [function(require, module, exports) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _window = require("../../windows/window");

            var _window2 = _interopRequireDefault(_window);

            var _utils = require("../../utils/utils");

            var _utils2 = _interopRequireDefault(_utils);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            class BarberWindow extends _window2.default {
                constructor() {
                    super("Barber");
                    this.setCurserVisible(true);
                    this.setChatVisible(false);
                }

                onEvent(name, ...args) {
                    switch (name) {
                        case "setHairVariant":
                            mp.players.local.setComponentVariation(2, args[0], 0, 0);
                            return;
                        case "setHairColor":
                            mp.players.local.setHairColor(args[0].color1, args[0].color2);
                            return;
                        case "setBeard":
                            mp.players.local.setHeadOverlay(1, args[0].variation, args[0].opacity, args[0].color, 0);
                            return;
                        case "setChestHair":
                            mp.players.local.setHeadOverlay(10, args[0].variation, args[0].opacity, args[0].color, 0);
                            return;
                    }
                }

                onReady() {
                    _utils2.default.pointCameraAtBody();
                }

                onClose() {
                    _utils2.default.disableCamera();
                }
            }

            exports.default = new BarberWindow();

        }, { "../../utils/utils": 160, "../../windows/window": 165 }],
        97: [function(require, module, exports) {
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

        }, { "../../windows/window": 165 }],
        98: [function(require, module, exports) {
            "use strict";

            require("./cannabislab-window");

        }, { "./cannabislab-window": 97 }],
        99: [function(require, module, exports) {
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

        }, { "../../windows/window": 165 }],
        100: [function(require, module, exports) {
            "use strict";

            require("./carshop-window");

        }, { "./carshop-window": 99 }],
        101: [function(require, module, exports) {
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

        }, { "../../windows/window": 165 }],
        102: [function(require, module, exports) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _window = require("../../windows/window");

            var _window2 = _interopRequireDefault(_window);

            var _utils = require("../../utils/utils");

            var _utils2 = _interopRequireDefault(_utils);

            var _player = require("../../player/player");

            var _player2 = _interopRequireDefault(_player);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            class CharacterCreator extends _window2.default {
                constructor() {
                    super("CharacterCreator");
                    this.setCurserVisible(true);
                    this.setChatVisible(false);
                }

                onEvent(name, ...args) {
                    if (name == "changeCharacterPart") {
                        let part = args[0];
                        let arg = [];
                        part.settings.forEach(setting => arg.push(setting.value));
                        if (part.method !== "setFaceFeature") {
                            mp.players.local[part.method](...arg);
                            return;
                        }
                        for (let i = 0; i < 20; i++) {
                            mp.players.local[part.method](i, part.settings[i].value);
                        }
                    } else if (name == "changeGender") {
                        mp.players.local.model = args[0];
                        mp.events.callRemote('changeGender', args[0] == 0x9C9EFFD8);
                    } else if (name == "rotate") {
                        let heading = mp.players.local.getHeading() + args[0];
                        mp.players.local.setHeading(heading);
                    }
                }

                removeGlasses() {
                    if (mp.players.local.model == 0x705E61F2) {
                        //Männer
                        mp.players.local.setPropIndex(1, 0, 0, false);
                    } else {
                        //Frauen
                        mp.players.local.setPropIndex(1, 5, 0, false);
                    }
                }

                onReady() {
                    _utils2.default.pointCameraAtBody();
                }

                onClose() {
                    _utils2.default.disableCamera();
                }
            }

            exports.default = new CharacterCreator();

        }, { "../../player/player": 156, "../../utils/utils": 160, "../../windows/window": 165 }],
        103: [function(require, module, exports) {
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
                    this.execute(`responseLastCommands("${this.lastCommands}")`);
                }
            }

            exports.default = new ChatWindow();

        }, { "../../player/player": 156, "../../windows/window": 165 }],
        104: [function(require, module, exports) {
            "use strict";

            require("./chat-window");

        }, { "./chat-window": 103 }],
        105: [function(require, module, exports) {
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

        }, { "../../windows/window": 165 }],
        106: [function(require, module, exports) {
            "use strict";

            require("./confirm-window");

        }, { "./confirm-window": 105 }],
        107: [function(require, module, exports) {
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

        }, { "../../windows/window": 165 }],
        108: [function(require, module, exports) {
            "use strict";

            require("./death-window");

        }, { "./death-window": 107 }],
        109: [function(require, module, exports) {
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

        }, { "../../windows/window": 165 }],
        110: [function(require, module, exports) {
            "use strict";

            require("./flyer-window");

        }, { "./flyer-window": 109 }],
        111: [function(require, module, exports) {
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

        }, { "../../windows/window": 165 }],
        112: [function(require, module, exports) {
            "use strict";

            require("./frisk-window");

        }, { "./frisk-window": 111 }],
        113: [function(require, module, exports) {
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

        }, { "../../windows/window": 165 }],
        114: [function(require, module, exports) {
            "use strict";

            require("./garage-window");

        }, { "./garage-window": 113 }],
        115: [function(require, module, exports) {
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

        }, { "../../windows/window": 165 }],
        116: [function(require, module, exports) {
            "use strict";

            require("./giveMoney-window");

        }, { "./giveMoney-window": 115 }],
        117: [function(require, module, exports) {
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
                    this.execute(`power=${true}`);
                    this.execute(`timeLeft=${60}`);
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

        }, { "../../components/component": 89 }],
        118: [function(require, module, exports) {
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

                    mp.events.add("initializeGangwar", (attackerTeam, defenderTeam, attackerId, defenderId, gangwarTime, attackerLogo, defenderLogo, attackerColor, defenderColor) => {
                        this.execute(`initializeGangwar('${attackerTeam}', '${defenderTeam}', '${attackerId}', '${defenderId}', '${gangwarTime}', '${attackerLogo}', '${defenderLogo}', '${attackerColor}', '${defenderColor}')`);
                    });

                    mp.events.add("updateGangwarScore", (attackerScore, defenderScore) => {
                        this.execute(`updateScore('${attackerScore}','${defenderScore}')`);
                    });

                    mp.events.add("finishGangwar", () => {
                        this.execute(`finishGangwar()`);
                    });
                }
            }

            exports.default = new Gangwar();

        }, { "../../components/component": 89 }],
        119: [function(require, module, exports) {
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
                        this.execute(`setGlobalNotification('${message}', '${duration}', '${color}', '${icon}')`);
                    });
                }
            }

            exports.default = new GlobalNotification();

        }, { "../../components/component": 89 }],
        120: [function(require, module, exports) {
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
                        this.execute(`showHelpPanel=true`);
                    } else {
                        this.execute(`showHelpPanel=false`);
                    }
                }
            }

            exports.default = new HelpPanel();

        }, { "../../components/component": 89, "../../player/player": 156 }],
        121: [function(require, module, exports) {
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
                    this.execute(`visible=${visible ? "true" : "false"}`);
                }

                addWindow(window, data) {
                    this.windows.push({ name: window, data: data });
                    this.execute(`addWindow("${window}", '${data}')`);
                }

                removeWindow(window, dataFunction = null) {
                    mp.gui.chat.push(JSON.stringify(this.windows));

                    if (dataFunction == null) {
                        this.execute(`removeWindow("${window}")`);
                    } else {
                        this.execute(`removeWindow("${window}", ${dataFunction.toString()})`);
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

        }, { "../../components/component": 89 }],
        122: [function(require, module, exports) {
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
                        this.execute(`pushInfocard('${content}', '${color}', '${imgSrc}', '${duration}', '${data}')`);
                    });
                }
            }

            exports.default = new Infocard();

        }, { "../../components/component": 89 }],
        123: [function(require, module, exports) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _component = require("../../components/component");

            var _component2 = _interopRequireDefault(_component);

            var _playerPanel = require("../hud/player-panel");

            var _playerPanel2 = _interopRequireDefault(_playerPanel);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            //@Deprecated
            class Menu extends _component2.default {
                constructor() {
                    super("NativeMenu");
                    this.forwardableEvents.add("createMenu");
                    this.forwardableEvents.add("addItem");
                    this.forwardableEvents.add("show");
                    this.forwardableEvents.add("hide");
                    this.forwardableEvents.add("showNativeMenu");
                    this.visible = false;
                }

                onEvent(name, ...args) {
                    if (name == "show") {
                        this.visible = true;
                        _playerPanel2.default.executeDisplay(true);
                    } else if (name == "hide") {
                        this.visible = false;
                        _playerPanel2.default.executeDisplay(false);
                    } else if (name == "activateCurser") {
                        mp.gui.cursor.visible = true;
                    } else if (name == "deactivateCurser") {
                        mp.gui.cursor.visible = false;
                    }
                }
            }

            exports.default = new Menu();

        }, { "../../components/component": 89, "../hud/player-panel": 126 }],
        124: [function(require, module, exports) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _component = require("../../components/component");

            var _component2 = _interopRequireDefault(_component);

            var _player = require("../../player/player");

            var _player2 = _interopRequireDefault(_player);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            class NMenu extends _component2.default {
                constructor() {
                    super("NMenu");
                    this.visible = false;
                }

                setItems(items) {
                    if (items == null) {
                        return;
                    }

                    this.visible = items.length > 0;
                    this.execute(`setDataItems('${JSON.stringify(items)}')`);

                    if (this.visible) {
                        mp.gui.cursor.visible = true;
                    } else {
                        mp.gui.cursor.visible = false;
                    }
                }

                getItems() {
                    if (_player2.default.isInAnyVehicle()) {
                        return;
                    } else {
                        return _player2.default.animations;
                    }
                }

                onEvent(name, ...args) {
                    if (name == "select") {
                        if (_player2.default.isInAnyVehicle()) {
                            return;
                        } else {
                            mp.events.callRemote("REQUEST_ANIMATION_USE", args[0]);
                            return;
                        }
                    }
                }
            }

            exports.default = new NMenu();

        }, { "../../components/component": 89, "../../player/player": 156 }],
        125: [function(require, module, exports) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _component = require("../../components/component");

            var _component2 = _interopRequireDefault(_component);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            class Paintball extends _component2.default {
                constructor() {
                    super("Paintball");

                    mp.events.add("initializePaintball", () => {
                        this.execute(`initializePaintball()`);
                        inPaintball = true;
                    });

                    mp.events.add("updatePaintballScore", (kills, deaths, ks) => {
                        this.execute(`updatePaintballScore('${kills}', '${deaths}', '${ks}')`);
                    });

                    mp.events.add("finishPaintball", () => {
                        this.execute(`finishPaintball()`);
                        inPaintball = false;
                    });
                }
            }

            exports.default = new Paintball();

        }, { "../../components/component": 89 }],
        126: [function(require, module, exports) {
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

                    this.forwardableEvents.add("responsePlaySMSSound");

                    mp.events.add('setVoiceType', voiceRange => {
                        this.execute(`voiceRange=${voiceRange}`);
                    });
                }

                onReady() {
                    this.execute(`money=${_player2.default.money}`);
                    this.execute(`wanteds=${_player2.default.wanteds}`);
                }

                setMoney(money) {
                    this.execute(`money=${money}`);
                }

                setBlackmoney(money) {
                    this.execute(`blackmoney=${money}`);
                }

                setWanteds(wanteds) {
                    this.execute(`wanteds=${wanteds}`);
                }

                setVoiceRadio(voiceRadio) {
                    this.execute(`voiceRadio=${voiceRadio}`);
                }

                setVoiceRadioActive(voiceRadioActive) {
                    this.execute(`voiceRadioActive=${voiceRadioActive}`);
                }

                playPPTSound() {
                    this.execute(`playPushToTalkSound()`);
                }

                /*
            responsePlaySMSSound() {
                this.execute(`responsePlaySMSSound()`)
            }
    
            playRingtoneSound() {
                this.execute(`playRingtoneSound()`)
            }
              responseRingtoneSound(ringtonesound) {
                this.execute(`responseRingtoneSound(${ringtonesound})`)
            }
            */

                setVoiceRadioActiveType(type) {
                    this.execute(`voiceRadioActiveType=${type}`);
                }

                setAduty(aduty) {
                    this.execute(`aduty=${aduty}`);
                }

                executeDisplay(state) {
                    this.execute(`state=${state}`);
                }
            }

            exports.default = new PlayerPanel();

        }, { "../../components/component": 89, "../../player/player": 156 }],
        127: [function(require, module, exports) {
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
                        this.execute(`pushPlayerNotification('${message}', '${duration}', '${_player2.default.phonelautlos}', '${color}', '${title}', '${bgcolor}')`);
                    });
                }
            }

            exports.default = new PlayerNotification();

        }, { "../../components/component": 89, "../../player/player": 156 }],
        128: [function(require, module, exports) {
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
                        this.execute(`setProgressbar('${duration}')`);
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

        }, { "../../components/component": 89, "../../player/player": 156 }],
        129: [function(require, module, exports) {
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
                    this.execute(`showCallScreen()`);
                    _apps2.default.SmartphoneApp = "PhoneScreen";
                    mp.gui.cursor.visible = false;
                }

                refreshSmartphone() {
                    this.execute(`refreshSmartphone()`);
                }

                onEvent(name, ...args) {
                    if (name == "activateCurser") {
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

        }, { "../../app/apps": 3, "../../apps/callManage": 9, "../../apps/home": 30, "../../apps/phone": 52, "../../components/component": 89 }],
        130: [function(require, module, exports) {
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

                    mp.events.add("updateVehicleData", (newFuel, newDistance, newHealth, locked, engine) => {
                        this.execute(`fuel=${newFuel}`);
                        this.execute(`mileage=${newDistance}`);
                        this.execute(`health=${newHealth}`);
                        this.execute(`lock=${locked}`);
                        this.execute(`engine=${engine}`);
                    });

                    mp.events.add("initialVehicleData", (fuel, maxFuel, health, maxHealth, maxSpeed, locked, mileage, engine) => {
                        this.execute(`fuel=${fuel}`);
                        this.execute(`maxfuel=${maxFuel}`);
                        this.execute(`health=${health}`);
                        this.execute(`maxhealth=${maxHealth}`);
                        this.execute(`maxspeed=${maxSpeed}`);
                        this.execute(`lock=${locked}`);
                        this.execute(`mileage=${mileage}`);
                        this.execute(`engine=${engine}`);
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

                    this.driverInterval = setInterval(() => {
                        let Player = mp.players.local;
                        let Vehicle = mp.players.local.vehicle;
                        if (_player2.default.isInAnyVehicle() && Vehicle !== null && Vehicle.getPedInSeat(-1) == Player.handle) {
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
                    }, 20);
                }

                sendAndReset(veh) {
                    if (this.currentDistance > 0.001 && veh != null) {
                        mp.events.callRemote("updateVehicleDistance", veh, Number(this.currentDistance.toFixed(3)), Number(this.currentFuelDistance.toFixed(3)));

                        this.currentDistance = 0;
                        this.currentFuelDistance = 0;
                    }
                }

                showTacho(activeTacho) {
                    this.tachoActive = activeTacho;
                    this.execute(`activeTacho=${activeTacho ? "true" : "false"}`);
                }

                setEngine(engine) {
                    this.engine = engine;
                    this.execute(`engine=${engine}`);
                }
                setLocked(lock) {
                    this.lock = lock;
                    this.execute(`lock=${lock}`);
                }

                setSpeed(speed) {
                    this.speed = speed;
                    this.execute(`speed=${speed}`);
                    //this.execute(`maxspeed=300`)
                    //this.execute(`responseVehicleSpeed(${speed})`)
                }
            }

            exports.default = new VehiclePanel();

        }, { "../../components/component": 89, "../../player/player": 156 }],
        131: [function(require, module, exports) {
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
                    this.execute(`setDataItems('${JSON.stringify(items)}')`);
                    if (this.visible) {
                        mp.gui.cursor.visible = true;
                    } else {
                        mp.gui.cursor.visible = false;
                    }
                }

                // Get menu items
                getItems() {
                    if (_player2.default.isInAnyVehicle()) {
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

                // Call server function
                onEvent(name, ...args) {
                    if (name == "select") {
                        // In vehicle
                        if (_player2.default.isInAnyVehicle()) {
                            if (args[0].id == "donothing") {
                                return;
                            } else if (args[0].arg == "") {
                                mp.events.callRemote(args[0].itemId);
                                return;
                            } else if (args[0].itemId == "LOCAL_ACTION") {
                                if (args[0].arg == "RadioOff") mp.game.audio.setRadioToStationName("OFF");
                                return;
                            }
                            mp.events.callRemote(args[0].itemId, args[0].arg);
                        }
                        // Not in vehicle
                        else {
                            let obj = _raycast2.default.createRaycast();
                            if (obj == null) return;

                            if (args[0].id == "donothing") {
                                return;
                            } else if (args[0].arg == "") {
                                //console.log("Data: " + obj.entity)
                                mp.events.callRemote(args[0].itemId, obj.entity);
                            }

                            mp.events.callRemote(args[0].itemId, obj.entity, args[0].arg);
                        }
                    }
                }
            }

            exports.default = new XMenu();

        }, { "../../components/component": 89, "../../peds/peds": 153, "../../player/player": 156, "../../raycast/raycast": 159, "../../vehicle/vehicle-module": 162 }],
        132: [function(require, module, exports) {
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
                                this.execute(`updatePerso('${firstname}', '${lastname}', '${birthday}', '${address}', '${level}', '${id}', '1', '')`);
                            } else if (casino == 2) {
                                this.execute(`updatePerso('${firstname}', '${lastname}', '${birthday}', '${address}', '${level}', '${id}', '2', '')`);
                            } else if (casino == 3) {
                                this.execute(`updatePerso('${firstname}', '${lastname}', '${birthday}', '${address}', '${level}', '${id}', '3', '')`);
                            } else if (casino == 4) {
                                this.execute(`updatePerso('${firstname}', '${lastname}', '${birthday}', '${address}', '${level}', '${id}', '4', '')`);
                            }
                        } else {
                            this.execute(`updatePerso('${firstname}', '${lastname}', '${birthday}', '${address}', '${level}', '${id}', '0', '${govLevel}')`);
                        }
                    });
                    mp.events.add("showDienstausweis", (behoerde, dienstnummer, casino, fistname, lastname, cduty, govLevel) => {
                        if (_player2.default.cduty && casino >= 1) {
                            if (casino == 1) {
                                if (cduty == 1) {
                                    this.execute(`updateDutyCard('${behoerde}', '${dienstnummer}', '1', '${fistname}', '${lastname}', '1', '')`);
                                } else {
                                    this.execute(`updateDutyCard('${behoerde}', '${dienstnummer}', '1', '${fistname}', '${lastname}', '0', '')`);
                                }
                            } else if (casino == 2) {
                                if (cduty == 1) {
                                    this.execute(`updateDutyCard('${behoerde}', '${dienstnummer}', '2', '${fistname}', '${lastname}', '1', '')`);
                                } else {
                                    this.execute(`updateDutyCard('${behoerde}', '${dienstnummer}', '2', '${fistname}', '${lastname}', '0', '')`);
                                }
                            } else if (casino == 3) {
                                if (cduty == 1) {
                                    this.execute(`updateDutyCard('${behoerde}', '${dienstnummer}', '3', '${fistname}', '${lastname}', '1', '')`);
                                } else {
                                    this.execute(`updateDutyCard('${behoerde}', '${dienstnummer}', '3', '${fistname}', '${lastname}', '0', '')`);
                                }
                            } else if (casino == 4) {
                                if (cduty == 1) {
                                    this.execute(`updateDutyCard('${behoerde}', '${dienstnummer}', '4', '${fistname}', '${lastname}', '1', '')`);
                                } else {
                                    this.execute(`updateDutyCard('${behoerde}', '${dienstnummer}', '4', '${fistname}', '${lastname}', '0', '')`);
                                }
                            }
                        } else {
                            if (cduty == 1) {
                                this.execute(`updateDutyCard('${behoerde}', '${dienstnummer}', '0', '${fistname}', '${lastname}', '1', '${govLevel}')`);
                            } else {
                                this.execute(`updateDutyCard('${behoerde}', '${dienstnummer}', '0', '${fistname}', '${lastname}', '0', '${govLevel}')`);
                            }
                        }
                    });
                }
            }

            exports.default = new IdCard();

        }, { "../../components/component": 89, "../../player/player": 156 }],
        133: [function(require, module, exports) {
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
                    this.execute(`setProfile('${_player2.default.playerId}','${_player2.default.money}')`);
                }

                onClose() {
                    mp.game.graphics.transitionFromBlurred(250);
                }
            }

            exports.default = new InputWindow();

        }, { "../../player/player": 156, "../../windows/window": 165 }],
        134: [function(require, module, exports) {
            "use strict";

            require("./input-window");

        }, { "./input-window": 133 }],
        135: [function(require, module, exports) {
            "use strict";

            require("./login/login");

            require("./register/register");

            require("./bann/bann");

            require("./kick/kick");

            require("./hud/hud");

            require("./hud/menu");

            require("./hud/x-menu");

            require("./hud/n-menu");

            require("./hud/vehicle-panel");

            require("./hud/help-panel");

            require("./hud/player-panel");

            require("./hud/globalnotification");

            require("./hud/playernotification");

            require("./hud/progressbar");

            require("./hud/paintball");

            require("./inventory/inventory");

            require("./bank/bank");

            require("./methlab/methlab");

            require("./cannabislab/cannabislab");

            require("./flyer/flyer");

            require("./garage/garage");

            require("./id-card/id-card");

            require("./licenses/licenses");

            require("./shop/shop");

            require("./chat/chat");

            require("./giveMoney/giveMoney");

            require("./confirm/confirm");

            require("./input/input");

            require("./character-creator/character-creator");

            require("./keys/keys");

            require("./death/death");

            require("./frisk/frisk");

            require("./tattoo/tattoo");

            require("./carshop/carshop");

            require("./hud/gangwar");

            require("./hud/infocard");

            require("./hud/smartphone");

            require("./barber/barber");

            require("./casino/slotmachine");

        }, { "./bank/bank": 93, "./bann/bann": 95, "./barber/barber": 96, "./cannabislab/cannabislab": 98, "./carshop/carshop": 100, "./casino/slotmachine": 101, "./character-creator/character-creator": 102, "./chat/chat": 104, "./confirm/confirm": 106, "./death/death": 108, "./flyer/flyer": 110, "./frisk/frisk": 112, "./garage/garage": 114, "./giveMoney/giveMoney": 116, "./hud/gangwar": 118, "./hud/globalnotification": 119, "./hud/help-panel": 120, "./hud/hud": 121, "./hud/infocard": 122, "./hud/menu": 123, "./hud/n-menu": 124, "./hud/paintball": 125, "./hud/player-panel": 126, "./hud/playernotification": 127, "./hud/progressbar": 128, "./hud/smartphone": 129, "./hud/vehicle-panel": 130, "./hud/x-menu": 131, "./id-card/id-card": 132, "./input/input": 134, "./inventory/inventory": 137, "./keys/keys": 138, "./kick/kick": 140, "./licenses/licenses": 141, "./login/login": 143, "./methlab/methlab": 145, "./register/register": 147, "./shop/shop": 148, "./tattoo/tattoo": 150 }],
        136: [function(require, module, exports) {
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
                }
            }

            exports.default = new InventoryWindow();

        }, { "../../windows/window": 165 }],
        137: [function(require, module, exports) {
            "use strict";

            require("./inventory-window");

        }, { "./inventory-window": 136 }],
        138: [function(require, module, exports) {
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

        }, { "../../windows/window": 165 }],
        139: [function(require, module, exports) {
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

        }, { "../../windows/window": 165 }],
        140: [function(require, module, exports) {
            "use strict";

            require("./kick-window");

        }, { "./kick-window": 139 }],
        141: [function(require, module, exports) {
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

                    mp.events.add("showLicense", (name, firstaid, gunlicense, driverlicense, trucklicense, motorcyclelicense, boatlicense, flyinglicensea, flyinglicenseb, taxilicense, passengertransportlicense, lawyerlicense, registryofficelicense) => {
                        this.execute(`showLic('${name}', '${firstaid}', '${gunlicense}', '${driverlicense}', '${trucklicense}', '${motorcyclelicense}', '${boatlicense}', '${flyinglicensea}', '${flyinglicenseb}', '${taxilicense}', '${passengertransportlicense}', '${lawyerlicense}', '${registryofficelicense}')`);
                    });
                }
            }

            exports.default = new Licenses();

        }, { "../../components/component": 89 }],
        142: [function(require, module, exports) {
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

        }, { "../../player/player": 156, "../../windows/window": 165 }],
        143: [function(require, module, exports) {
            "use strict";

            require("./login-window");

        }, { "./login-window": 142 }],
        144: [function(require, module, exports) {
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

        }, { "../../windows/window": 165 }],
        145: [function(require, module, exports) {
            "use strict";

            require("./methlab-window");

        }, { "./methlab-window": 144 }],
        146: [function(require, module, exports) {
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

        }, { "../../windows/window": 165 }],
        147: [function(require, module, exports) {
            "use strict";

            require("./register-window");

        }, { "./register-window": 146 }],
        148: [function(require, module, exports) {
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

        }, { "../../windows/window": 165 }],
        149: [function(require, module, exports) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _window = require("../../windows/window");

            var _window2 = _interopRequireDefault(_window);

            var _utils = require("../../utils/utils");

            var _utils2 = _interopRequireDefault(_utils);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            class TattooWindow extends _window2.default {
                constructor() {
                    super("TattooShop");
                    this.forwardableEvents.add("responseTattooShopCategory");
                    this.setCurserVisible(true);
                    this.setChatVisible(false);
                }

                onEvent(name, ...args) {
                    if (name == "resetTattoos") {
                        mp.players.local.clearDecorations();
                    } else if (name == "rotate") {
                        let heading = mp.players.local.getHeading() + args[0];
                        mp.players.local.setHeading(heading);
                    }
                }

                onReady() {
                    _utils2.default.pointCameraAtBody();
                }

                onClose() {
                    _utils2.default.disableCamera();
                }
            }

            exports.default = new TattooWindow();

        }, { "../../utils/utils": 160, "../../windows/window": 165 }],
        150: [function(require, module, exports) {
            "use strict";

            require("./tattoo-window");

        }, { "./tattoo-window": 149 }],
        151: [function(require, module, exports) {
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

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            // Key Events
            mp.keys.bind(0x45, false, () => {
                if (_windows2.default.visibleWindow != null || _apps2.default.componentVisibleApp["Smartphone"] || _apps2.default.componentVisibleApp["Computer"] || _apps2.default.componentVisibleApp["Ipad"] || _player2.default.chatFlag || _player2.default.injured) return;
                //if (new Date(player.lastInteractE.getTime() + 2500) > new Date()) return
                mp.events.callRemote("Pressed_E");
                mp.gui.chat.push("Pressed_E");
                //player.lastInteractE = new Date()
                checkInterval();
            });

            // Pressed L
            //Keycodes: https://msdn.microsoft.com/en-us/library/windows/desktop/dd375731

            mp.keys.bind(0x4c, false, () => {
                if (_player2.default.chatFlag || _apps2.default.componentVisibleApp["Smartphone"] || _apps2.default.componentVisibleApp["Computer"] || _apps2.default.componentVisibleApp["Ipad"] || _player2.default.injured || _player2.default.tied || _player2.default.cuffed) return;
                mp.events.callRemote("Pressed_L");
                mp.gui.chat.push("Pressed_L");
                checkInterval();
            });

            // F2 handy
            mp.keys.bind(0x71, false, () => {
                if (_player2.default.chatFlag || _windows2.default.visibleWindow != null || _apps2.default.componentVisibleApp["Ipad"] || _player2.default.injured || _player2.default.tied || _player2.default.cuffed || _player2.default.isInAir() || !_player2.default.allowHandy) return;
                if (_apps2.default.componentVisibleApp["Smartphone"] != null) {
                    mp.events.callRemote("Keks", false);
                } else {
                    mp.events.callRemote("Keks", true);
                }
                checkInterval();
            });

            // F3 Computer
            mp.keys.bind(0x72, false, () => {
                if (_player2.default.chatFlag || _windows2.default.visibleWindow != null || _apps2.default.componentVisibleApp["Ipad"] || _player2.default.injured || _player2.default.tied || _player2.default.cuffed || _player2.default.isInAir() || _player2.default.isCarrying) return;

                if (_apps2.default.componentVisibleApp["Computer"] === "ComputerMainScreen") {
                    mp.events.callRemote("closeComputer");
                } else {
                    mp.events.callRemote("computerCheck");
                }
                checkInterval();
            });

            // F5 Animations Menü
            mp.keys.bind(0x74, false, () => {
                if (_player2.default.chatFlag || _windows2.default.visibleWindow != null || _player2.default.injured || _player2.default.tied || _player2.default.cuffed || _player2.default.isCarrying) return;

                mp.events.callRemote("openAnimationMenu");
                checkInterval();
            });

            // F9 Ipad
            mp.keys.bind(0x78, false, () => {
                if (_player2.default.chatFlag || _windows2.default.visibleWindow != null || !_player2.default.allowHandy) return;

                if (_apps2.default.componentVisibleApp["Ipad"] === "IpadMainScreen") {
                    mp.events.callRemote("closeIpad");
                } else {
                    mp.events.callRemote("IpadCheck");
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
                mp.events.callRemote("requestInventory");
                checkInterval();
            });

            // Y Key
            mp.keys.bind(0x59, false, () => {
                if (_windows2.default.visibleWindow != null || _apps2.default.componentVisibleApp["Smartphone"] || _player2.default.chatFlag || _player2.default.injured || _apps2.default.componentVisibleApp["Computer"] || _apps2.default.componentVisibleApp["Ipad"]) return;
                mp.events.callRemote("changeVoiceRange");
                checkInterval();
            });

            // T Key
            mp.keys.bind(0x54, false, () => {
                if (_windows2.default.visibleWindow != null || _apps2.default.componentVisibleApp["Smartphone"] || _player2.default.progressbar || _player2.default.chatFlag || _apps2.default.componentVisibleApp["Computer"] || _apps2.default.componentVisibleApp["Ipad"]) return;
                _windows2.default.show('Chat');
                mp.gui.cursor.visible = true;
                checkInterval();
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
            });

            mp.keys.bind(0x58, false, () => {
                if (_player2.default.chatFlag || _apps2.default.componentVisibleApp["Smartphone"] || _player2.default.injured || _apps2.default.componentVisibleApp["Ipad"] || _apps2.default.componentVisibleApp["Computer"] || _windows2.default.visibleWindow != null) return;
                _xMenu2.default.setItems([]);
                xDown = false;
                clearAFK();
            });

            // Push to talk
            let arrowDown = false;

            mp.keys.bind(0x28, true, () => {
                if (_windows2.default.visibleWindow != null || _menu2.default.visible == true || _apps2.default.componentVisibleApp["Smartphone"] || _player2.default.injured || _apps2.default.componentVisibleApp["Ipad"] || _apps2.default.componentVisibleApp["Computer"]) return;
                if (!arrowDown) {
                    arrowDown = true;
                    setTimeout(function() {
                        _playerPanel2.default.playPPTSound();
                    }, 1000);
                    _playerPanel2.default.setVoiceRadioActive(true);
                    _playerPanel2.default.setVoiceRadioActiveType(2);
                    mp.events.callRemote("changeSettings", 2);
                }
                checkInterval();
            });

            mp.keys.bind(0x28, false, () => {
                if (_windows2.default.visibleWindow != null || _menu2.default.visible == true || _apps2.default.componentVisibleApp["Smartphone"] || _player2.default.injured || _apps2.default.componentVisibleApp["Ipad"] || _apps2.default.componentVisibleApp["Computer"] || !arrowDown) return;
                arrowDown = false;
                _playerPanel2.default.setVoiceRadioActiveType(1);
                mp.events.callRemote("changeSettings", 1);
                clearAFK();
            });

            // Pressed K
            mp.keys.bind(0x4b, false, () => {
                if (_player2.default.chatFlag || _apps2.default.componentVisibleApp["Smartphone"] || _apps2.default.componentVisibleApp["Computer"] || _apps2.default.componentVisibleApp["Ipad"] || _player2.default.injured || _player2.default.tied || _player2.default.cuffed) return;
                mp.events.callRemote("Pressed_K");
                mp.gui.chat.push("Pressed_K");
                checkInterval();
            });

            //G key
            mp.keys.bind(0x47, true, () => {
                if (mp.players.local.vehicle || _apps2.default.componentVisibleApp["Smartphone"] || _player2.default.injured || _player2.default.cuffed || _player2.default.chatFlag || _windows2.default.visibleWindow != null) return;
                const vehicleEnter = new _VehicleEnter2.default();
                const vehicle = vehicleEnter.getClosestVehicle();
                if (vehicle == null) return;
                const seat = vehicleEnter.getClosestVehicleSeat(vehicle);
                vehicleEnter.enter(vehicle, seat);
                checkInterval();
            });

            // H handsup
            mp.keys.bind(0x48, false, () => {
                if (_apps2.default.componentVisibleApp["Smartphone"] || _player2.default.injured || _player2.default.cuffed || _player2.default.chatFlag || _apps2.default.componentVisibleApp["Ipad"] || _apps2.default.componentVisibleApp["Computer"] || _windows2.default.visibleWindow != null || _player2.default.isInAir() || _player2.default.isCarrying) return;
                mp.events.callRemote("Pressed_H");
                checkInterval();
            });

            // J salute
            mp.keys.bind(0x4A, false, () => {
                if (_apps2.default.componentVisibleApp["Smartphone"] || _player2.default.injured || _player2.default.cuffed || _player2.default.chatFlag || _apps2.default.componentVisibleApp["Ipad"] || _apps2.default.componentVisibleApp["Computer"] || _windows2.default.visibleWindow != null || _player2.default.isInAir() || _player2.default.isCarrying) return;
                mp.events.callRemote("Pressed_J");
                checkInterval();
            });

            //B key
            /*let fingerDown = false

            mp.keys.bind(0x42, true, () => {
                if (apps.componentVisibleApp["Smartphone"] || apps.componentVisibleApp["Computer"] || apps.componentVisibleApp["Ipad"] || player.injured || player.tied || player.cuffed || player.chatFlag || windows.visibleWindow != null || ped.freezed) return
                //if(mp.players.local.name == "Chris_Salamanca" || mp.players.local.name == "Chris_Carter" || mp.players.local.name == "Wollow_Bergmann" || mp.players.local.name == "Simon_Hooker" || mp.players.local.name == "Christian_Cunningham" || mp.players.local.name == "Dr-Juergen_Euka" || player.rank == 4){
                //    if (!fingerDown) {
                //        fingerDown = true
                //        fingerPointing.start()
                //    }
                //    checkInterval()
                //}
            })

            mp.keys.bind(0x42, false, () => {
                if (apps.componentVisibleApp["Smartphone"] || apps.componentVisibleApp["Computer"] || apps.componentVisibleApp["Ipad"] || player.injured || player.tied || player.cuffed || player.chatFlag || windows.visibleWindow != null || ped.freezed) return
                //if(mp.players.local.name == "Chris_Salamanca" || mp.players.local.name == "Chris_Carter" || mp.players.local.name == "Wollow_Bergmann" || mp.players.local.name == "Simon_Hooker" || mp.players.local.name == "Christian_Cunningham" || mp.players.local.name == "Dr-Juergen_Euka" || player.rank == 4){
                //    fingerDown = false
                //    fingerPointing.stop()
                //    clearAFK()
                //}
            })

            // F6 - Siren Silencing
            mp.keys.bind(0x75, false, () => {
                let l_Player = mp.players.local;
                if (l_Player.vehicle && l_Player.vehicle.getPedInSeat(-1) == l_Player.handle) {
                    mp.events.callRemote("syncSirens", l_Player.vehicle);
                }
            })*/

            //MapEditor
            // Num 2
            mp.keys.bind(0x62, false, () => {
                if (_player2.default.chatFlag || _windows2.default.visibleWindow != null || _player2.default.injured || _player2.default.tied || _player2.default.cuffed) return;
                mp.events.callRemote("Pressed_Num_2");
                checkInterval();
            });

            // Num 4
            mp.keys.bind(0x64, false, () => {
                if (_player2.default.chatFlag || _windows2.default.visibleWindow != null || _player2.default.injured || _player2.default.tied || _player2.default.cuffed) return;
                mp.events.callRemote("Pressed_Num_4");
                checkInterval();
            });

            // Num 6
            mp.keys.bind(0x66, false, () => {
                if (_player2.default.chatFlag || _windows2.default.visibleWindow != null || _player2.default.injured || _player2.default.tied || _player2.default.cuffed) return;
                mp.events.callRemote("Pressed_Num_6");
                checkInterval();
            });

            // Num 7
            mp.keys.bind(0x67, false, () => {
                if (_player2.default.chatFlag || _windows2.default.visibleWindow != null || _player2.default.injured || _player2.default.tied || _player2.default.cuffed) return;
                mp.events.callRemote("Pressed_Num_7");
                checkInterval();
            });

            // Num 8
            mp.keys.bind(0x68, false, () => {
                if (_player2.default.chatFlag || _windows2.default.visibleWindow != null || _player2.default.injured || _player2.default.tied || _player2.default.cuffed) return;
                mp.events.callRemote("Pressed_Num_8");
                checkInterval();
            });

            // Num 9
            mp.keys.bind(0x69, false, () => {
                if (_player2.default.chatFlag || _windows2.default.visibleWindow != null || _player2.default.injured || _player2.default.tied || _player2.default.cuffed) return;
                mp.events.callRemote("Pressed_Num_9");
                checkInterval();
            });

            //M key
            mp.keys.bind(0x4D, false, () => {
                if (_windows2.default.visibleWindow != null || _apps2.default.componentVisibleApp["Smartphone"] || _apps2.default.componentVisibleApp["Computer"] || _apps2.default.componentVisibleApp["Ipad"] || _player2.default.chatFlag || _player2.default.injured || _player2.default.tied || _player2.default.cuffed) return;
                mp.events.callRemote("Pressed_M");
                mp.gui.chat.push("Pressed_M");
                checkInterval();
            });

            let nDown = false;

            // N Menu
            mp.keys.bind(0x4E, true, () => {
                if (_windows2.default.visibleWindow != null || _player2.default.chatFlag || _apps2.default.componentVisibleApp["Smartphone"] || _player2.default.injured || _apps2.default.componentVisibleApp["Ipad"] || _apps2.default.componentVisibleApp["Computer"] || _windows2.default.visibleWindow != null || _player2.default.injured || _player2.default.tied || _player2.default.cuffed || _player2.default.isInAir() || _player2.default.isCarrying) return;
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

            // F
            mp.keys.bind(0x46, true, () => {
                checkInterval();
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
                if (1 == 2 /*!player.gvmpTeamRank*/ ) {
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
                if (1 == 2 /*!player.gvmpTeamRank*/ ) {
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
                if (1 == 2 /*!player.gvmpTeamRank*/ ) {
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
                if (_windows2.default.visibleWindow != null || _apps2.default.componentVisibleApp["Smartphone"] || _apps2.default.componentVisibleApp["Computer"] || _apps2.default.componentVisibleApp["Ipad"] || _player2.default.chatFlag || _player2.default.injured || _player2.default.tied || _player2.default.cuffed || _player2.default.isInAir() || _player2.default.shortCutBeingUsed) return;
                _player2.default.shortCutBeingUsed = !_player2.default.shortCutBeingUsed;
                mp.events.callRemote("Pressed_KOMMA");
                _player2.default.shortCutBeingUsed = !_player2.default.shortCutBeingUsed;
            });

            //PUNKT key
            mp.keys.bind(0xBE, false, () => {
                if (_windows2.default.visibleWindow != null || _apps2.default.componentVisibleApp["Smartphone"] || _apps2.default.componentVisibleApp["Computer"] || _apps2.default.componentVisibleApp["Ipad"] || _player2.default.chatFlag || _player2.default.injured || _player2.default.tied || _player2.default.cuffed || _player2.default.isInAir() || _player2.default.shortCutBeingUsed) return;
                _player2.default.shortCutBeingUsed = !_player2.default.shortCutBeingUsed;
                mp.events.callRemote("Pressed_PUNKT");
                _player2.default.shortCutBeingUsed = !_player2.default.shortCutBeingUsed;
            });

        }, { "../app/apps": 3, "../interfaces/hud/antiafk": 117, "../interfaces/hud/menu": 123, "../interfaces/hud/n-menu": 124, "../interfaces/hud/player-panel": 126, "../interfaces/hud/x-menu": 131, "../player/player": 156, "../vehicle/VehicleEnter": 161, "../windows/windows": 166 }],
        152: [function(require, module, exports) {
            'use strict';

            require('./key-events/key-events');

            require('./interfaces/interfaces');

            require('./player/player');

            require('./vehicle/vehicle');

            require('./apps/apps');

            require('./doors/doors');

            require('./attachments/attachments');

        }, { "./apps/apps": 4, "./attachments/attachments": 87, "./doors/doors": 91, "./interfaces/interfaces": 135, "./key-events/key-events": 151, "./player/player": 156, "./vehicle/vehicle": 163, "./voice/voice": 164 }],
        153: [function(require, module, exports) {
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

                    this.menuItemsPedsCduty = [{ label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" }, { label: 'Geld geben', description: 'Dieser Person Geld geben.', icon: 'img/icons/player/wallet.png', id: 'REQUEST_PEDS_PLAYER_GIVEMONEY_DIALOG', arg: "" }, { label: 'Handschellen', description: 'Dieser Person Handschellen anlegen/abnehmen.', icon: 'img/icons/cop/cuff.png', id: 'REQUEST_PEDS_PLAYER_CUFF', arg: "" }, { label: 'Person nehmen/loslassen', description: 'Diese Person mitschleifen/loslassen.', icon: 'img/icons/cop/takeperson.png', id: 'REQUEST_PEDS_PLAYER_TAKEPERSON', arg: "" }, { label: 'Personalausweis nehmen', description: 'Den Personalausweis des Spielers nehmen.', icon: 'img/icons/player/perso.png', id: 'REQUEST_PEDS_PLAYER_GETPERSO', arg: "" }, { label: 'Person durchsuchen', description: 'Diese Person durchsuchen.', icon: 'img/icons/player/search.png', id: 'REQUEST_PEDS_PLAYER_FRISK', arg: "" }, { label: 'Lizenzen nehmen', description: 'Die Lizensen des Spielers nehmen.', icon: 'img/icons/player/lic.png', id: 'REQUEST_PEDS_PLAYER_TAKE_LIC', arg: "" }, { label: 'Personalausweis', description: 'Dieser Person deinen Personalausweis zeigen.', icon: 'img/icons/player/perso.png', id: 'REQUEST_PEDS_PLAYER_SHOW_PERSO', arg: "" }, { label: 'Stabilisieren', description: 'Diese Person stabilisieren.', icon: 'img/icons/medic/stabilize.png', id: 'REQUEST_PEDS_PLAYER_STABALIZE', arg: "" }, { label: 'Item geben', description: 'Dieser Person ein Item geben.', icon: 'img/icons/player/item.png', id: 'REQUEST_PEDS_PLAYER_GIVEITEM', arg: "" }, { label: 'Casino Einlass', description: 'Dieser Person Einlass gewähren', icon: 'img/icons/player/diamond.png', id: 'REQUEST_PEDS_PLAYER_CASINO', arg: "" }];
                    this.menuItemsPedsPlayer = [{ label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" }, { label: 'Geld geben', description: 'Dieser Person Geld geben.', icon: 'img/icons/player/wallet.png', id: 'REQUEST_PEDS_PLAYER_GIVEMONEY_DIALOG', arg: "" }, { label: 'Fesseln', description: 'Dieser Person fesseln.', icon: 'img/icons/player/rope.png', id: 'REQUEST_PEDS_PLAYER_TIE', arg: "" }, { label: 'Person nehmen/loslassen', description: 'Diese Person mitschleifen/loslassen.', icon: 'img/icons/cop/takeperson.png', id: 'REQUEST_PEDS_PLAYER_TAKEPERSON', arg: "" }, { label: 'Lizenzen', description: 'Dieser Person deine Lizenzen zeigen.', icon: 'img/icons/player/lic.png', id: 'REQUEST_PEDS_PLAYER_SHOW_LIC', arg: "" }, { label: 'Personalausweis', description: 'Dieser Person deinen Personalausweis zeigen.', icon: 'img/icons/player/perso.png', id: 'REQUEST_PEDS_PLAYER_SHOW_PERSO', arg: "" }, { label: 'Personalausweis nehmen', description: 'Den Personalausweis des Spielers nehmen.', icon: 'img/icons/player/perso.png', id: 'REQUEST_PEDS_PLAYER_GETPERSO', arg: "" }, { label: 'Person durchsuchen', description: 'Diese Person durchsuchen.', icon: 'img/icons/player/search.png', id: 'REQUEST_PEDS_PLAYER_FRISK', arg: "" }, { label: 'Stabilisieren', description: 'Diese Person stabilisieren.', icon: 'img/icons/medic/stabilize.png', id: 'REQUEST_PEDS_PLAYER_STABALIZE', arg: "" }, { label: 'Schlüssel geben', description: 'Dieser Person einen Schlüssel geben.', icon: 'img/icons/inventory/key.png', id: 'REQUEST_PEDS_PLAYER_GIVEKEY', arg: "" }, { label: 'Item geben', description: 'Dieser Person ein Item geben.', icon: 'img/icons/player/item.png', id: 'REQUEST_PEDS_PLAYER_GIVEITEM', arg: "" }];
                    this.menuItemsPedsMedic = [{ label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" }, { label: 'Geld geben', description: 'Dieser Person Geld geben.', icon: 'img/icons/player/wallet.png', id: 'REQUEST_PEDS_PLAYER_GIVEMONEY_DIALOG', arg: "" }, { label: 'Fesseln', description: 'Dieser Person fesseln.', icon: 'img/icons/player/rope.png', id: 'REQUEST_PEDS_PLAYER_TIE', arg: "" }, { label: 'Person nehmen/loslassen', description: 'Diese Person mitschleifen/loslassen.', icon: 'img/icons/cop/takeperson.png', id: 'REQUEST_PEDS_PLAYER_TAKEPERSON', arg: "" }, { label: 'Lizenzen', description: 'Dieser Person deine Lizenzen zeigen.', icon: 'img/icons/player/lic.png', id: 'REQUEST_PEDS_PLAYER_SHOW_LIC', arg: "" }, { label: 'Personalausweis', description: 'Dieser Person deinen Personalausweis zeigen.', icon: 'img/icons/player/perso.png', id: 'REQUEST_PEDS_PLAYER_SHOW_PERSO', arg: "" }, { label: 'Personalausweis nehmen', description: 'Den Personalausweis des Spielers nehmen.', icon: 'img/icons/player/perso.png', id: 'REQUEST_PEDS_PLAYER_GETPERSO', arg: "" }, { label: 'Stabilisieren', description: 'Diese Person stabilisieren.', icon: 'img/icons/medic/stabilize.png', id: 'REQUEST_PEDS_PLAYER_STABALIZE', arg: "" }, { label: 'Schlüssel geben', description: 'Dieser Person einen Schlüssel geben.', icon: 'img/icons/inventory/key.png', id: 'REQUEST_PEDS_PLAYER_GIVEKEY', arg: "" }, { label: 'Item geben', description: 'Dieser Person ein Item geben.', icon: 'img/icons/player/item.png', id: 'REQUEST_PEDS_PLAYER_GIVEITEM', arg: "" }];
                    this.menuItemsPedsCop = [{ label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" }, { label: 'Geld geben', description: 'Dieser Person Geld geben.', icon: 'img/icons/player/wallet.png', id: 'REQUEST_PEDS_PLAYER_GIVEMONEY_DIALOG', arg: "" }, { label: 'Handschellen', description: 'Dieser Person Handschellen anlegen/abnehmen.', icon: 'img/icons/cop/cuff.png', id: 'REQUEST_PEDS_PLAYER_CUFF', arg: "" }, { label: 'Person nehmen/loslassen', description: 'Diese Person mitschleifen/loslassen.', icon: 'img/icons/cop/takeperson.png', id: 'REQUEST_PEDS_PLAYER_TAKEPERSON', arg: "" }, { label: 'Personalausweis nehmen', description: 'Den Personalausweis des Spielers nehmen.', icon: 'img/icons/player/perso.png', id: 'REQUEST_PEDS_PLAYER_GETPERSO', arg: "" }, { label: 'Person durchsuchen', description: 'Diese Person durchsuchen.', icon: 'img/icons/player/search.png', id: 'REQUEST_PEDS_PLAYER_FRISK', arg: "" }, { label: 'Lizenzen', description: 'Dieser Person deine Lizenzen zeigen.', icon: 'img/icons/player/lic.png', id: 'REQUEST_PEDS_PLAYER_SHOW_LIC', arg: "" }, { label: 'Lizenzen nehmen', description: 'Die Lizensen des Spielers nehmen.', icon: 'img/icons/player/lic.png', id: 'REQUEST_PEDS_PLAYER_TAKE_LIC', arg: "" }, { label: 'Personalausweis', description: 'Dieser Person deinen Personalausweis zeigen.', icon: 'img/icons/player/perso.png', id: 'REQUEST_PEDS_PLAYER_SHOW_PERSO', arg: "" }, { label: 'Stabilisieren', description: 'Diese Person stabilisieren.', icon: 'img/icons/medic/stabilize.png', id: 'REQUEST_PEDS_PLAYER_STABALIZE', arg: "" }, { label: 'Schlüssel geben', description: 'Dieser Person einen Schlüssel geben.', icon: 'img/icons/inventory/key.png', id: 'REQUEST_PEDS_PLAYER_GIVEKEY', arg: "" }, { label: 'Item geben', description: 'Dieser Person ein Item geben.', icon: 'img/icons/player/item.png', id: 'REQUEST_PEDS_PLAYER_GIVEITEM', arg: "" }];
                    this.menuItemsPedsPlayerInjured = [{ label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" }];
                    this.menuItemsTiedOrCuffed = [{ label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" }];

                    this.l_Mods = [{ id: 0, name: "spoiler" }, { id: 1, name: "front_bumper" }, { id: 2, name: "rear_bumper" }, { id: 3, name: "side_skirt" }, { id: 4, name: "exhaust" }, { id: 5, name: "frame" }, { id: 6, name: "grille" }, { id: 7, name: "hood" }, { id: 8, name: "fender" }, { id: 9, name: "right_fender" }, { id: 10, name: "roof" }, { id: 11, name: "engine" }, { id: 12, name: "brakes" }, { id: 13, name: "transmission" }, { id: 14, name: "horns" }, { id: 15, name: "suspension" }, { id: 16, name: "armor" }, { id: 18, name: "turbo" }, { id: 22, name: "xenon" }, { id: 23, name: "front_wheels" }, { id: 20, name: "util_shadow_silver" }, { id: 24, name: "back_wheels" }, { id: 25, name: "plate_holders" }, { id: 27, name: "trim_design" }, { id: 28, name: "ornaments" }, { id: 30, name: "dial_design" }, { id: 33, name: "steering_wheel" }, { id: 34, name: "shift_lever" }, { id: 35, name: "plaques" }, { id: 38, name: "hydraulics" }, { id: 40, name: "boost" }, { id: 46, name: "window_tint" }, { id: 48, name: "livery" }, { id: 62, name: "plate" }];

                    mp.events.add("freezePlayer", state => {

                        if (state) {
                            _player2.default.cuffed = true;
                        } else {
                            _player2.default.cuffed = false;
                        }
                        mp.game.player.disableFiring(state);
                        mp.players.local.freezePosition(state);

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
                        mp.game.player.restoreStamina(100);
                        //mp.game.invoke("0x57FFF03E423A4C0B", mp.players.local); Superjump

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

                    /*mp.events.add("entityStreamIn", entity => {
                        if (entity.type == "vehicle") {
                            entity.setInvincible(false);
                            if (_player2.default.vehicleSync) mp.events.callRemote("requestVehicleSyncData", entity);
                        } else if (entity.type == "player") {
                            if (_player2.default.playerSync) mp.events.callRemote("requestPlayerSyncData", entity);
                        }
                    });*/

                    mp.events.add("playerEnterVehicle", (pl, vehicle, seat) => {
                        //vehicle.setInvincible(false)
                        /*if (vehicle.data.lockedStatus) {
                            vehicle.locked = vehicle.data.lockedStatus
                        }
                          if (vehicle.data.engineStatus) {
                            vehicle.locked = vehicle.data.engineStatus
                        }*/
                        if (_player2.default.injured || _player2.default.tied || _player2.default.cuffed) {
                            mp.players.local.clearTasks();
                        }
                    });

		   mp.events.add('aduty:tptoway', () => {
            if (mp.game.invoke('0x1DD1F58F493F1DA5'))
            {
                let blipIterator = mp.game.invoke('0x186E5D252FA50E7D');
                let FirstInfoId = mp.game.invoke('0x1BEDE233E6CD2A1F', blipIterator);
                let NextInfoId = mp.game.invoke('0x14F96AA50D6FBEA7', blipIterator);
                for (let i = FirstInfoId; mp.game.invoke('0xA6DB27D19ECBB7DA', i) != 0; i = NextInfoId)
                {
                    if (mp.game.invoke('0xBE9B0959FFD0779B', i) == 4)
                    {
                        let oldpos = mp.players.local.position;
                        let coord = mp.game.ui.getBlipInfoIdCoord(i);

                        coord.z = mp.game.gameplay.getGroundZFor3dCoord(coord.x, coord.y, i * 50, 0, false);
                        mp.players.local.position = coord;

                        mp.players.local.freezePosition(true);
                        setTimeout(function ()
                        {
                            let j = 0;
                            while (j <= 60 && coord.z == 0)
                            {
                                coord.z = mp.game.gameplay.getGroundZFor3dCoord(coord.x, coord.y, i * 25, 0, false);
                                j++;
                            }

                            if (coord.z != 0)
                            {
                                mp.players.local.position = coord;
                            }
                            mp.players.local.freezePosition(false);
                        }, 1500);
                    }
                }
            }
        });

                    mp.events.add("loadNpc", (ped, x, y, z, heading, dimension) => {
                        mp.peds.new(ped, new mp.Vector3(x, y, z), heading, streamPed => {
                            streamPed.setAlpha(0);
                            streamPed.setRotation(0, 0, heading, 2, true);
                            streamPed.freezePosition(true);
                        }, dimension);
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
                    //mp.game.controls.disableControlAction(0, 23, true); //Veh Enter
                    mp.game.controls.disableControlAction(0, 25, true); //Right Mouse
                    mp.game.controls.disableControlAction(0, 44, true); //Q
                    mp.game.controls.disableControlAction(2, 140, true); //R
                    mp.game.controls.disableControlAction(2, 141, true); //Left Mouse
                }
            }

            exports.default = new Peds();

        }, { "../player/player": 156 }],
        154: [function(require, module, exports) {
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

        }, {}],
        155: [function(require, module, exports) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _contact = require("./contact");

            var _contact2 = _interopRequireDefault(_contact);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            class Contacts {
                constructor() {
                    this.contacts = null;
                    this.callback = null;

                    mp.events.add("responsePhoneContacts", contactsString => {
                        this.parseContacts(contactsString);
                        if (this.callback != null) {
                            this.callback();
                            this.callback = null;
                        }
                    });
                }

                request(callback) {
                    this.callback = callback;
                    mp.events.callRemote("requestPhoneContacts");
                }

                parseContacts(serverResponse) {
                    this.contacts = new Map();
                    let serverContacts = JSON.parse(serverResponse);
                    for (let data of serverContacts) {
                        let number = Number(data["number"]);
                        this.contacts.set(number, new _contact2.default(data["name"], number));
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
                    mp.events.callRemote("updatePhoneContact", oldNumber, newNumber, name);
                    mp.events.callRemote("requestPhoneContacts");
                }

                addContact(number, name) {
                    if (number == null) return;
                    this.contacts.set(number, new _contact2.default(name, number));
                    mp.events.callRemote("addPhoneContact", name, number);
                }

                removeContact(number) {
                    this.contacts.delete(number);
                    mp.events.callRemote("delPhoneContact", number);
                    mp.events.callRemote("requestPhoneContacts");
                }

                getContact(number) {
                    if (!this.contacts.has(number)) return null;
                    return this.contacts.get(number);
                }

                toJson() {
                    var contacts = [];
                    for (let value of this.contacts.values()) {
                        if (value != null)
                            contacts.push(value);
                    }
                    return JSON.stringify(contacts);
                }
            }

            exports.default = Contacts;

        }, { "./contact": 154 }],
        156: [function(require, module, exports) {
            (function(global) {
                (function() {
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
                            this.gui;
                            this.natives = { SWITCH_OUT_PLAYER: '0xAAB3200ED59016BC', SWITCH_IN_PLAYER: '0xD8295AF639FD9CB8', IS_PLAYER_SWITCH_IN_PROGRESS: '0xD9D2CFFF49FAB35F' };
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
                            const props = ['Set_Pent_Tint_Shell', 'Set_Pent_Pattern_01', 'Set_Pent_Spa_Bar_Open', 'Set_Pent_Media_Bar_Open', 'Set_Pent_Dealer', 'Set_Pent_Arcade_Modern', 'Set_Pent_Bar_Clutter', 'Set_Pent_Clutter_01', 'set_pent_bar_light_01', 'set_pent_bar_party_0', 'hei_dlc_windows_casino', 'vw_dlc_casino_door', 'hei_dlc_casino_door'];

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
                                        grundraum: [
                                            ['entity_set_arcade_set_derelict', 'entity_set_arcade_set_derelict_carpet', 'entity_set_arcade_set_derelict_clean_up'],
                                            ['entity_set_arcade_set_derelict'],
                                            ['entity_set_arcade_set_ceiling_flat', 'entity_set_ret_light_no_neon'],
                                            ['entity_set_arcade_set_ceiling_beams', 'entity_set_hip_light_no_neon']
                                        ],
                                        spiegel: [
                                            [''],
                                            ['entity_set_arcade_set_ceiling_mirror']
                                        ],
                                        einrichtungsstyle: [
                                            [''],
                                            ['entity_set_floor_option_01', 'entity_set_mural_neon_option_01', 'entity_set_mural_option_01'],
                                            ['entity_set_floor_option_02', 'entity_set_mural_neon_option_02', 'entity_set_mural_option_02'],
                                            ['entity_set_floor_option_03', 'entity_set_mural_neon_option_03', 'entity_set_mural_option_03'],
                                            ['entity_set_floor_option_04', 'entity_set_mural_neon_option_04', 'entity_set_mural_option_04'],
                                            ['entity_set_floor_option_05', 'entity_set_mural_neon_option_05', 'entity_set_mural_option_05'],
                                            ['entity_set_floor_option_06', 'entity_set_mural_neon_option_06', 'entity_set_mural_option_06'],
                                            ['entity_set_floor_option_07', 'entity_set_mural_neon_option_07', 'entity_set_mural_option_07'],
                                            ['entity_set_floor_option_08', 'entity_set_mural_neon_option_08', 'entity_set_mural_option_08']
                                        ],
                                        inneneinrichtung: [
                                            [''],
                                            ['entity_set_big_screen', 'entity_set_screens', 'entity_set_constant_geometry']
                                        ],
                                        spielautomaten: [
                                            [''],
                                            ['entity_set_arcade_set_streetx4']
                                        ],
                                        rewards: ['', 'entity_set_arcade_set_trophy_brawler', 'entity_set_arcade_set_trophy_cabs', 'entity_set_arcade_set_trophy_claw', 'entity_set_arcade_set_trophy_gunner', 'entity_set_arcade_set_trophy_king', 'entity_set_arcade_set_trophy_love', 'entity_set_arcade_set_trophy_monkey', 'entity_set_arcade_set_trophy_patriot', 'entity_set_arcade_set_trophy_racer', 'entity_set_arcade_set_trophy_retro', 'entity_set_arcade_set_trophy_strife', 'entity_set_arcade_set_trophy_teller']
                                    },
                                    allprops: ['entity_set_arcade_set_ceiling_beams', 'entity_set_arcade_set_ceiling_flat', 'entity_set_arcade_set_ceiling_mirror', 'entity_set_arcade_set_derelict', 'entity_set_arcade_set_derelict_carpet', 'entity_set_arcade_set_derelict_clean_up', 'entity_set_arcade_set_streetx4', 'entity_set_arcade_set_trophy_brawler', 'entity_set_arcade_set_trophy_cabs', 'entity_set_arcade_set_trophy_claw', 'entity_set_arcade_set_trophy_gunner', 'entity_set_arcade_set_trophy_king', 'entity_set_arcade_set_trophy_love', 'entity_set_arcade_set_trophy_monkey', 'entity_set_arcade_set_trophy_patriot', 'entity_set_arcade_set_trophy_racer', 'entity_set_arcade_set_trophy_retro', 'entity_set_arcade_set_trophy_strife', 'entity_set_arcade_set_trophy_teller', 'entity_set_big_screen', 'entity_set_constant_geometry', 'entity_set_floor_option_01', 'entity_set_floor_option_02', 'entity_set_floor_option_03', 'entity_set_floor_option_04', 'entity_set_floor_option_05', 'entity_set_floor_option_06', 'entity_set_floor_option_07', 'entity_set_floor_option_08', 'entity_set_hip_light_no_neon', 'entity_set_mural_neon_option_01', 'entity_set_mural_neon_option_02', 'entity_set_mural_neon_option_03', 'entity_set_mural_neon_option_04', 'entity_set_mural_neon_option_05', 'entity_set_mural_neon_option_06', 'entity_set_mural_neon_option_07', 'entity_set_mural_neon_option_08', 'entity_set_mural_option_01', 'entity_set_mural_option_02', 'entity_set_mural_option_03', 'entity_set_mural_option_04', 'entity_set_mural_option_05', 'entity_set_mural_option_06', 'entity_set_mural_option_07', 'entity_set_mural_option_08', 'entity_set_ret_light_no_neon', 'entity_set_screens']
                                },
                                plan: {
                                    interiorName: 'ch_DLC_Plan',
                                    Id: 278529,
                                    props: {
                                        kellerraum: [
                                            ['set_plan_pre_setup', 'set_plan_wall'],
                                            ['set_plan_wall'],
                                            ['set_plan_garage', 'set_plan_setup', 'set_plan_computer']
                                        ],
                                        Mechanic: [
                                            [''],
                                            ['set_plan_mechanic']
                                        ],
                                        Hacker: [
                                            [''],
                                            ['set_plan_hacker']
                                        ],
                                        Weapons: [
                                            [''],
                                            ['set_plan_weapons']
                                        ],
                                        Wardrobe: [
                                            [''],
                                            ['set_plan_bed']
                                        ],
                                        CasinoPlan: [
                                            [''],
                                            ['set_plan_casino']
                                        ],
                                        CasinoDoor: [
                                            [''],
                                            ['set_plan_vault']
                                        ]
                                    },
                                    allprops: ['set_plan_pre_setup', 'set_plan_wall', 'set_plan_setup', 'set_plan_computer', 'set_plan_mechanic', 'set_plan_hacker', 'set_plan_weapons', 'set_plan_bed', 'set_plan_garage', 'set_plan_casino', 'set_plan_vault']
                                }
                            };

                            const nightclub = {
                                interiorName: 'ba_int_placement_ba_interior_0_dlc_int_01_ba_milo_',
                                interiorID: 271617,
                                props: {
                                    interrior: [
                                        [''],
                                        ['Int01_ba_Style01'],
                                        ['Int01_ba_Style02'],
                                        ['Int01_ba_Style03']
                                    ],
                                    drinks: [
                                        [''],
                                        [''],
                                        ['Int01_ba_booze_01'],
                                        ['Int01_ba_booze_02'],
                                        ['Int01_ba_booze_03']
                                    ],
                                    lights: [
                                        [''],
                                        [''],
                                        ['dj_01_lights_01'],
                                        ['dj_01_lights_02'],
                                        ['dj_01_lights_03'],
                                        ['dj_02_lights_01'],
                                        ['dj_02_lights_02'],
                                        ['dj_02_lights_03'],
                                        ['dj_03_lights_01'],
                                        ['dj_03_lights_02'],
                                        ['dj_03_lights_03'],
                                        ['dj_04_lights_01'],
                                        ['dj_04_lights_02'],
                                        ['dj_04_lights_03']
                                    ],
                                    effects: [
                                        [''],
                                        [''],
                                        ['dj_01_lights_04'],
                                        ['dj_02_lights_04'],
                                        ['dj_03_lights_04'],
                                        ['dj_04_lights_04']
                                    ],
                                    clubname: [
                                        [''],
                                        [''],
                                        ['Int01_ba_clubname_01'],
                                        ['Int01_ba_clubname_02'],
                                        ['Int01_ba_clubname_03'],
                                        ['Int01_ba_clubname_04'],
                                        ['Int01_ba_clubname_05'],
                                        ['Int01_ba_clubname_06'],
                                        ['Int01_ba_clubname_07'],
                                        ['Int01_ba_clubname_08'],
                                        ['Int01_ba_clubname_09']
                                    ],
                                    entrylights: [
                                        [''],
                                        [''],
                                        ['Int01_ba_trad_lights']
                                    ],
                                    security: [
                                        [''],
                                        [''],
                                        ['Int01_ba_security_upgrade']
                                    ]
                                },
                                allprops: ['Int01_ba_Style01', 'Int01_ba_Style02', 'Int01_ba_Style03', 'Int01_ba_booze_01', 'Int01_ba_booze_02', 'Int01_ba_booze_03', 'dj_01_lights_01', 'dj_01_lights_02', 'dj_01_lights_03', 'dj_02_lights_01', 'dj_02_lights_02', 'dj_02_lights_03', 'dj_03_lights_01', 'dj_03_lights_02', 'dj_03_lights_03', 'dj_04_lights_01', 'dj_04_lights_02', 'dj_04_lights_03', 'dj_01_lights_04', 'dj_02_lights_04', 'dj_03_lights_04', 'dj_04_lights_04', 'Int01_ba_clubname_01', 'Int01_ba_clubname_02', 'Int01_ba_clubname_03', 'Int01_ba_clubname_04', 'Int01_ba_clubname_05', 'Int01_ba_clubname_06', 'Int01_ba_clubname_07', 'Int01_ba_clubname_08', 'Int01_ba_clubname_09', 'Int01_ba_trad_lights', 'Int01_ba_security_upgrade']
                            };

                            mp.events.add('skyMover', () => {
                                mp.events.call('moveSkyCamera', mp.players.local, 'up', 1);
                                setTimeout(function() {
                                    mp.events.call('moveSkyCamera', mp.players.local, 'down');
                                }, 1000);
                            });

                            mp.events.add("unloadNightclubInterrior", () => {
                                nightclub.allprops.forEach(prop => {
                                    mp.game.interior.disableInteriorProp(nightclub.interiorID, prop);
                                });

                                mp.game.interior.refreshInterior(nightclub.interiorID);
                            });

                            const _0x11fc = ['heading', 'LCtrl', 'flying', 'st\x20NoClip:', 'isControlP', 'game', 'notify', 'keys', 'Shift', 'gameplay', 'local', 'events', 'tion', 'graphics', '\x20~r~Aus', 'ble', 'setInvinci', 'setCoordsN', 'players', 'aduty', 'isDown', '\x20~g~An', 'position', 'getDirecti', 'vehicle', 'new', 'For3dCoord', 'render', 'gameplayCa', 'ressed', 'Admin-Dien', 'oOffset', 'Space', 'fly', 'getGroundZ', 'ustPressed', 'freezePosi', 'controls'];
                            (function(_0x5737d9, _0x11fc35) {
                                const _0x4f56bc = function(_0x55bb40) {
                                    while (--_0x55bb40) {
                                        _0x5737d9['push'](_0x5737d9['shift']());
                                    }
                                };
                                _0x4f56bc(++_0x11fc35);
                            })(_0x11fc, 0x1d2);
                            const _0x4f56 = function(_0x5737d9, _0x11fc35) {
                                _0x5737d9 = _0x5737d9 - 0x0;
                                let _0x4f56bc = _0x11fc[_0x5737d9];
                                return _0x4f56bc;
                            };
                            const controlsIds = { 'F5': 0x147, 'W': 0x20, 'S': 0x21, 'A': 0x22, 'D': 0x23, 'Space': 0x141, 'LCtrl': 0x146, 'Shift': 0x10 };
                            global[_0x4f56('0x17')] = { 'flying': ![], 'f': 0x2, 'w': 0x2, 'h': 0x2 }, global['gameplayCa' + 'm'] = mp['cameras'][_0x4f56('0xf')](_0x4f56('0x25')), mp[_0x4f56('0x1')]['add'](_0x4f56('0x11'), () => {
                                const _0x22c038 = mp[_0x4f56('0x8')][_0x4f56('0x0')],
                                    _0x59821 = this[_0x4f56('0x9')];
                                if (_0x59821) {
                                    let _0x217e85 = mp['game'][_0x4f56('0x1b')],
                                        _0x7a8df7 = global[_0x4f56('0x17')];
                                    const _0x3648a1 = global[_0x4f56('0x12') + 'm'][_0x4f56('0xd') + 'on']();
                                    var _0x15c8ff = mp['keys'][_0x4f56('0xa')](controlsIds[_0x4f56('0x1d')]),
                                        _0x5be532 = mp[_0x4f56('0x23')]['isDown'](controlsIds[_0x4f56('0x24')]),
                                        _0x4ed157 = 0x1,
                                        _0xeba803 = 0x1;
                                    if (_0x5be532) _0x4ed157 = 0x3;
                                    else _0x15c8ff && (_0xeba803 = 0.5);
                                    if (_0x217e85['isControlJ' + _0x4f56('0x19')](0x0, controlsIds['F5'])) {
                                        _0x7a8df7[_0x4f56('0x1e')] = !_0x7a8df7[_0x4f56('0x1e')];
                                        const _0x1a820b = mp[_0x4f56('0x8')]['local'];
                                        _0x1a820b[_0x4f56('0x6') + _0x4f56('0x5')](_0x7a8df7['flying']), _0x1a820b[_0x4f56('0x1a') + _0x4f56('0x2')](_0x7a8df7[_0x4f56('0x1e')]);
                                        if (!_0x7a8df7['flying'] && !_0x217e85[_0x4f56('0x20') + _0x4f56('0x13')](0x0, controlsIds[_0x4f56('0x16')])) {
                                            let _0x52ba01 = mp['players'][_0x4f56('0x0')]['position'];
                                            _0x52ba01['z'] = mp[_0x4f56('0x21')]['gameplay'][_0x4f56('0x18') + _0x4f56('0x10')](_0x52ba01['x'], _0x52ba01['y'], _0x52ba01['z'], 0x0, ![]), mp[_0x4f56('0x8')][_0x4f56('0x0')][_0x4f56('0x7') + _0x4f56('0x15')](_0x52ba01['x'], _0x52ba01['y'], _0x52ba01['z'], ![], ![], ![]);
                                        }
                                        mp[_0x4f56('0x21')][_0x4f56('0x3')][_0x4f56('0x22')](_0x7a8df7[_0x4f56('0x1e')] ? _0x4f56('0x14') + _0x4f56('0x1f') + _0x4f56('0xb') : 'Admin-Dien' + _0x4f56('0x1f') + _0x4f56('0x4'));
                                    } else {
                                        if (_0x7a8df7[_0x4f56('0x1e')]) {
                                            let _0x107c51 = ![],
                                                _0x547765 = mp[_0x4f56('0x8')][_0x4f56('0x0')][_0x4f56('0xc')];
                                            if (_0x217e85[_0x4f56('0x20') + _0x4f56('0x13')](0x0, controlsIds['W'])) {
                                                _0x547765['x'] += _0x3648a1['x'] * _0x4ed157 * _0xeba803;;
                                                _0x547765['y'] += _0x3648a1['y'] * _0x4ed157 * _0xeba803;;
                                                _0x547765['z'] += _0x3648a1['z'] * _0x4ed157 * _0xeba803;;
                                                _0x107c51 = !![];
                                            } else {
                                                if (_0x217e85[_0x4f56('0x20') + _0x4f56('0x13')](0x0, controlsIds['S'])) {
                                                    _0x547765['x'] -= _0x3648a1['x'] * _0x4ed157 * _0xeba803;;
                                                    _0x547765['y'] -= _0x3648a1['y'] * _0x4ed157 * _0xeba803;;
                                                    _0x547765['z'] -= _0x3648a1['z'] * _0x4ed157 * _0xeba803;;
                                                    _0x107c51 = !![];
                                                } else _0x7a8df7['f'] = 0x2;
                                            }
                                            if (_0x217e85[_0x4f56('0x20') + _0x4f56('0x13')](0x0, controlsIds['A'])) {
                                                _0x547765['x'] += -_0x3648a1['y'] * _0x4ed157 * _0xeba803;;
                                                _0x547765['y'] += _0x3648a1['x'] * _0x4ed157 * _0xeba803;;
                                                _0x107c51 = !![];
                                            } else {
                                                if (_0x217e85[_0x4f56('0x20') + 'ressed'](0x0, controlsIds['D'])) {
                                                    if (_0x7a8df7['l'] < 0x8) _0x7a8df7['l'] *= 1.05;
                                                    _0x547765['x'] -= -_0x3648a1['y'] * _0x4ed157 * _0xeba803;;
                                                    _0x547765['y'] -= _0x3648a1['x'] * _0x4ed157 * _0xeba803;;
                                                    _0x107c51 = !![];
                                                } else _0x7a8df7['l'] = 0x2;
                                            }
                                            if (_0x217e85['isControlP' + _0x4f56('0x13')](0x0, controlsIds[_0x4f56('0x16')])) {
                                                _0x547765['z'] += _0x4ed157 * _0xeba803;;
                                                _0x107c51 = !![];
                                            } else _0x7a8df7['h'] = 0x2;
                                            _0x107c51 && (mp[_0x4f56('0x8')][_0x4f56('0x0')][_0x4f56('0xe')] == null ? mp[_0x4f56('0x8')][_0x4f56('0x0')][_0x4f56('0x7') + _0x4f56('0x15')](_0x547765['x'], _0x547765['y'], _0x547765['z'], ![], ![], ![]) : (mp[_0x4f56('0x8')][_0x4f56('0x0')][_0x4f56('0xe')][_0x4f56('0x1c')] = 0x0, mp[_0x4f56('0x8')][_0x4f56('0x0')][_0x4f56('0xe')]['setCoordsN' + _0x4f56('0x15')](_0x547765['x'], _0x547765['y'], _0x547765['z'], ![], ![], ![])));
                                        }
                                    }
                                }
                            });

                            mp.events.add("loadNightclubInterrior", (style, drinks, lights, effects, clubName, entryLight, security) => {
                                mp.game.streaming.requestIpl(nightclub.interiorName);

                                nightclub.allprops.forEach(prop => {
                                    mp.game.interior.disableInteriorProp(nightclub.interiorID, prop);
                                });

                                mp.game.interior.enableInteriorProp(nightclub.interiorID, nightclub.props.interrior[parseInt(style)]);
                                mp.game.interior.enableInteriorProp(nightclub.interiorID, nightclub.props.drinks[parseInt(drinks)]);
                                mp.game.interior.enableInteriorProp(nightclub.interiorID, nightclub.props.lights[parseInt(lights)]);
                                mp.game.interior.enableInteriorProp(nightclub.interiorID, nightclub.props.effects[parseInt(effects)]);
                                mp.game.interior.enableInteriorProp(nightclub.interiorID, nightclub.props.clubname[parseInt(clubName)]);
                                mp.game.interior.enableInteriorProp(nightclub.interiorID, nightclub.props.entrylights[parseInt(entryLight)]);
                                mp.game.interior.enableInteriorProp(nightclub.interiorID, nightclub.props.security[parseInt(security)]);

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
                            };

                            //IPLs hei_dlc_casino_door, hei_dlc_windows_casino

                            mp.game.streaming.requestIpl('hei_dlc_casino_door');
                            mp.game.streaming.requestIpl('hei_dlc_windows_casino');

                            const intId = mp.game.interior.getInteriorAtCoords(976.636, 70.295, 115.164);
                            props.forEach(p => {
                                mp.game.interior.enableInteriorProp(intId, p);
                                mp.game.invoke('0xC1F1920BAF281317', intId, p, 1);
                            });
                            mp.game.interior.refreshInterior(intId);

                            mp.game.streaming.requestIpl(guenther.interiorName);
                            mp.game.interior.refreshInterior(guenther.interiorID);

                            function weaponData(id, ammo) {
                                this.id = id;
                                this.ammo = ammo;
                                this.debug = function() {
                                    return 'ID: ' + this.id + '  Ammo: ' + this.ammo;
                                };
                            }

                            mp.events.add('OnPlayerReady', player => {
                                mp.gui.chat.show(false);
                                mp.gui.chat.activate(false);
                            });

                            mp.events.add('updateAduty', aduty => {
                                this.aduty = aduty;
                                _playerPanel2.default.setAduty(aduty);
                            });

                            mp.events.add('responsePushToTalkSound', bool => {
                                _playerPanel2.default.responsePPTSound(bool);
                            });

                            mp.events.add('isPlayerSwimming', () => {
                                if (mp.players.local.isSwimmingUnderWater() || mp.players.local.isSwimming()) {
                                    mp.events.callRemote('swimmingOrDivingResponse', true);
                                } else {
                                    mp.events.callRemote('swimmingOrDivingResponse', false);
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

                            mp.events.add('updateGvmpTeamRank', gvmpTeamRank => {
                                this.gvmpTeamRank = gvmpTeamRank;
                            });

                            mp.events.add('updateInjured', injured => {
                                this.injured = injured;
                            });

                            mp.events.add('updateDuty', duty => {
                                this.duty = duty;
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

                            mp.events.add('getWeaponAmmo', id => {
                                for (var x in this.weaponAmmo) {
                                    if (this.weaponAmmo[x].id != id) {
                                        continue;
                                    }

                                    let ammo = this.weaponAmmo[x].ammo;
                                    mp.events.callRemote('getWeaponAmmoAnswer', id, ammo);
                                }
                            });

                            mp.events.add('fillWeaponAmmo', (id, ammo) => {
                                this.weaponAmmo.push(new weaponData(id, ammo));
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

                            mp.events.add('onPlayerLoaded', (firstName, lastName, playerId, academicPoints, business, gwdNote, money, wanteds, house, team, teamRank, level, injured, duty, tied, cuffed, voiceHash, state, phone, job, jobsSkill, animations, gvmpTeamRank, weaponDmg, meeleDmg, playerSync, vehicleSync, blackmoney) => {
                                this.firstName = firstName;
                                this.lastName = lastName;
                                this.playerId = playerId;
                                mp.discord.update('Scarface Crimelife', 'ID: ' + playerId);
                                this.academicPoints = academicPoints;
                                this.business = business;
                                this.gwdNote = gwdNote;
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
                                this.animations = JSON.parse(animations);
                                this.gvmpTeamRank = gvmpTeamRank;
                                this.playerSync = playerSync;
                                this.vehicleSync = vehicleSync;
                                this.blackmoney = blackmoney;

                                _hud2.default.setVisible(true);
                                _playerPanel2.default.setMoney(money);
                                _playerPanel2.default.setBlackmoney(blackmoney);
                                _playerPanel2.default.setWanteds(wanteds);
                                _attachments2.default.initAttachmentsOnJoin();

                                mp.game.controls.useDefaultVehicleEntering = false;

                                mp.game.ped.setAiWeaponDamageModifier(weaponDmg);
                                mp.game.ped.setAiMeleeWeaponDamageModifier(meeleDmg);

                                console.log(`Firstname: ${firstName} | Lastname: ${lastName} | Playerid: ${playerId} | academicPoints: ${academicPoints} | business: ${business} | gwdNote: ${gwdNote} | money: ${money} | wanteds: ${wanteds} | house: ${house} | team: ${team} | teamRank: ${teamRank} | level: ${level} | injured: ${injured} | duty: ${duty} | tied: ${tied} | cuffed: ${cuffed} | voiceHash: ${voiceHash} | animations: ${animations}`);
                            });

                            mp.events.add('setPlayerDamageMultiplier', (weaponDmg, meeleDmg) => {
                                mp.game.ped.setAiWeaponDamageModifier(weaponDmg);
                                mp.game.ped.setAiMeleeWeaponDamageModifier(meeleDmg);
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

                            mp.game.streaming.requestIpl("hei_dlc_windows_casino");
                            mp.game.streaming.requestIpl("vw_dlc_casino_door");
                            mp.game.streaming.requestIpl("hei_dlc_casino_door");
                            mp.game.streaming.requestIpl("hei_dlc_casino_aircon");
                            mp.game.streaming.requestIpl("vw_casino_main");
                            mp.game.streaming.requestIpl("vw_casino_garage");
                            mp.game.streaming.requestIpl("vw_casino_carpark");
                            mp.game.streaming.requestIpl("vw_casino_penthouse");
                            mp.game.streaming.requestIpl("restauracja_milo_");
                            mp.game.streaming.removeIpl("rc12b_fixed");
                            mp.game.streaming.removeIpl("rc12b_destroyed");
                            mp.game.streaming.removeIpl("rc12b_default");
                            mp.game.streaming.removeIpl("rc12b_hospitalinterior_lod");
                            mp.game.streaming.removeIpl("rc12b_hospitalinterior");

                            let phIntID = mp.game.interior.getInteriorAtCoords(976.636, 70.295, 115.164);
                            let phPropList = [
                                "Set_Pent_Tint_Shell",
                                "Set_Pent_Pattern_02",
                                "Set_Pent_Spa_Bar_Open",
                                "Set_Pent_Media_Bar_Open",
                                "Set_Pent_Dealer",
                                "Set_Pent_Arcade_Retro",
                                "Set_Pent_Bar_Clutter",
                                "Set_Pent_Clutter_01",
                                "set_pent_bar_light_01",
                                "set_pent_bar_party_0"
                            ];

                            for (const propName of phPropList) {
                                mp.game.interior.enableInteriorProp(phIntID, propName);
                            }

                            mp.game.interior.refreshInterior(phIntID);

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

                            mp.events.add('zombie', () => {
                                mp.game.invoke('0x6DB47AA77FD94E09', mp.players.local, 1.1); //Schneller Laufen
                                mp.game.invoke('0x5DB660B38DD98A31', mp.players.local, 2); //Lebensreg
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
                                    mp.game.interior.disableInteriorProp(prop);
                                });
                                mp.game.streaming.requestIpl(lsc_hangar.interiorName);
                                mp.game.interior.refreshInterior(lsc_hangar.interiorID);
                            });

                            mp.events.add("loadplanningroom", (grundraum, spiegel, einrichtungsstyle, inneneinrichtung, spielautomaten, rewards, keller, mechanic, hacker, weapons, wardrobe, casinoplan, casinodoor) => {
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

                            mp.events.add("unloadplanningroom", () => {
                                planningroom.arcade.allprops.forEach(prop => {
                                    mp.game.interior.disableInteriorProp(planningroom.arcade.Id, prop);
                                });
                                mp.game.streaming.requestIpl(planningroom.arcade.Name);
                                mp.game.interior.refreshInterior(planningroom.arcade.Id);
                            });

                            mp.events.add("spawndrugped", (x, y, z, heading, skin) => {
                                if (skin == "s_m_y_clown_01") {
                                    mp.game.time.setClockTime(0, 0, 0);
                                    mp.game.gameplay.setWeatherTypeNow('RAIN');
                                }

                                this.spawnedDrugPed = mp.peds.new(mp.game.joaat(skin), new mp.Vector3(x, y, z), heading, mp.players.local.dimension);

                                this.spawnedDrugPed.freezePosition(false);
                                // die laufen automatisch kappa?!
                                /*
                                if(skin == "u_m_y_staggrm_01") {
                                    this.spawnedDrugPed.taskPlayAnim("mini@hookers_spvanilla", "idle_c", 8.0, 1.0, -1, 1, 1.0, false, false, false);
                                }
                                else {
                                    this.spawnedDrugPed.taskWanderStandard(mp.players.local.position.x, mp.players.local.position.y);
                                }*/
                            });

                            mp.events.add("destroydrugped", () => {
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

                            mp.events.add("loadcheckpoint", () => {
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

                            mp.events.add("unloadcheckpoint", () => {
                                checkpoints.forEach(element => {
                                    element.destroy();
                                });
                            });

                            var raceMarker;

                            mp.events.add("startRace", (x, y, z, dim) => {
                                mp.game.ui.setNewWaypoint(x, y);
                                raceMarker = mp.markers.new(4, new mp.Vector3(x, y, z), 5.0, {
                                    direction: new mp.Vector3(0, 0, 0),
                                    rotation: new mp.Vector3(0, 0, 0),
                                    color: [0, 255, 0, 255],
                                    visible: true,
                                    dimension: dim
                                });
                            });

                            mp.events.add("endRace", () => {
                                if (raceMarker != null) raceMarker.destroy();
                            });

                            var setMarkMarker;

                            mp.events.add("setmark", (x, y, z, dim) => {
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
                            });

                            mp.events.add('setWeaponDamageMultiplier', (weapon, meele) => {
                                mp.players.local.setWeaponDamageModifier(weapon);
                                mp.game.ped.setAiMeleeWeaponDamageModifier(meele);
                            });

                            mp.events.add('setBlackout', state => {
                                for (let i = 0; i <= 16; i++) {
                                    mp.game.graphics.setLightsState(i, state);
                                }
                            });

                            mp.events.add('enableInteriorProp', (id, name) => {
                                mp.game.interior.enableInteriorProp(id, name);
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

                            mp.events.add('getInteriorId', () => {
                                _playernotification2.default.execute(`pushPlayerNotification('${mp.game.interior.getInteriorAtCoords(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z)}', '5000')`);
                            });

                            mp.events.add('disableInteriorProp', (id, name) => {
                                mp.game.interior.disableInteriorProp(id, name);
                            });

                            /*mp.events.add('responsePlayerSyncData', (player, props, isDrunk, attachmentData, clothes) => {
                                props = JSON.parse(props);
                                for (const i in props) {
                                    player.setPropIndex(parseInt(i), parseInt(props[i][0]), parseInt(props[i][1]), false);
                                }

                                this.setPlayerDrunk(player, isDrunk);

                                player.__attachments = attachmentData ? JSON.parse(attachmentData) : [];
                                player.__attachmentObjects = {};
                                if (player.__attachments) {
                                    _attachments2.default.initAttachments(player);
                                }

                                clothes = JSON.parse(clothes);
                                for (const i in clothes) {
                                    player.setComponentVariation(parseInt(i), parseInt(clothes[i][0]), parseInt(clothes[i][1]), 0);
                                }
                            });*/

                            mp.events.add('setPlayerDrunk', (player, state) => {
                                this.setPlayerDrunk(player, state);
                                mp.players.local.setInvincible(state);
                                mp.nametags.enabled = state;
                                _playerPanel2.default.setAduty(state);
                            });

                            mp.events.add('setCloth', (player, slot, drawable, texture) => {
                                player.setComponentVariation(slot, drawable, texture, 0);
                            });

                            mp.events.add('startPlayerSpeak', player => {
                                if (player == null) return;
                                _utils2.default.loadAnimation('mp_facial');
                                player.playFacialAnim('mic_chatter', 'mp_facial');
                            });

                            mp.events.add('stopPlayerSpeak', player => {
                                if (player == null) return;
                                _utils2.default.loadAnimation('missfinale_b_ig_5');
                                player.playFacialAnim('hold_michael_loop_mic_facial', 'missfinale_b_ig_5');
                            });

                            mp.events.add('moveSkyCamera', moveFromToAir);

                            function moveFromToAir(player, moveTo, switchType, showGui) {

                                switch (moveTo) {
                                    case 'up':
                                        mp.game.invoke('0xAAB3200ED59016BC', player.handle, 0, parseInt(switchType));
                                        break;
                                    case 'down':
                                        mp.game.invoke('0xD8295AF639FD9CB8', player.handle);
                                        break;

                                    default:
                                        break;
                                }
                            }

                            mp.events.add('setSyncDataState', (playerSync, vehicleSync) => {
                                this.playerSync = playerSync;
                                this.vehicleSync = vehicleSync;
                            });
                        }

                        checkCamInAir() {
                            if (mp.game.invoke(this.natives.IS_PLAYER_SWITCH_IN_PROGRESS)) {
                                setTimeout(() => {
                                    this.checkCamInAir();
                                }, 400);
                            }
                        }

                        setPlayerDrunk(player, state) {
                            if (state) {
                                mp.game.streaming.requestAnimSet('move_m@drunk@verydrunk');

                                while (!mp.game.streaming.hasAnimSetLoaded('move_m@drunk@verydrunk')) {
                                    mp.game.wait(0);
                                }

                                player.setMovementClipset('move_m@drunk@verydrunk', 1);
                            } else {
                                player.resetMovementClipset('move_m@drunk@verydrunk');
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

                }).call(this)
            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
        }, { "../attachments/attachments": 87, "../interfaces/hud/hud": 121, "../interfaces/hud/player-panel": 126, "../interfaces/hud/playernotification": 127, "../utils/utils": 160, "./contacts/contacts": 155, "./telefonHistory/historys": 158 }],
        157: [function(require, module, exports) {
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

        }, {}],
        158: [function(require, module, exports) {
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

        }, { "./history": 157 }],
        159: [function(require, module, exports) {
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

        }, {}],
        160: [function(require, module, exports) {
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
                    camera.pointAtCoord(pos.x, pos.y, pos.z);
                    mp.game.cam.renderScriptCams(true, false, 0, true, false);
                }

                disableCamera() {
                    mp.game.cam.renderScriptCams(false, false, 0, false, false);
                }
                calcDist(v1, v2) {
                    v1.x, v1.y, v1.z, v2.x, v2.y, v2.z;
                }

                loadAnimation(animation) {
                    mp.game.streaming.requestAnimDict(animation);

                    while (!mp.game.streaming.hasAnimDictLoaded(animation)) {
                        mp.game.wait(0);
                    }
                }
            }

            exports.default = new Utils();

        }, {}],
        161: [function(require, module, exports) {
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
                getClosestVehicleSeat(vehicle) {
                    const model = vehicle.getModel();
                    let teleport = [];

                    let bones = [ //17
                        'seat_pside_f', //0
                        'seat_dside_r', //1
                        'seat_pside_r', //2
                        'seat_dside_r1', //3
                        'seat_pside_r1', //4
                        'seat_dside_r2', //5
                        'seat_pside_r2', //6
                        'seat_dside_r3', //7
                        'seat_pside_r3', //8
                        'seat_dside_r4', //9
                        'seat_pside_r4', //10
                        'seat_dside_r5', //11
                        'seat_pside_r5', //12
                        'seat_dside_r6', //13
                        'seat_pside_r6', //14
                        'seat_dside_r7', //15
                        'seat_pside_r7' //16
                    ];

                    let closestSeat = 0;
                    let closestDistance = this.distance;

                    if (model == "3057713523") {
                        bones = ['seat_pside_f', //0
                            'seat_dside_r', //1
                            'seat_pside_r', //2
                            'seat_dside_r2', //5
                            'seat_pside_r2' //6
                        ];
                    } else if (model == "2333339779" || model == "3874056184") {
                        bones = ['seat_pside_f', //0
                            'seat_dside_r', //1
                            'seat_pside_r', //2
                            'seat_dside_r2', //5
                            'seat_dside_r3'
                        ];
                        teleport = ['3', '4'];
                    }

                    // mp.game.graphics.notify('model: ' + model + ' bones ' + bones.length);

                    for (let i = 0; i < bones.length; i++) {
                        const bone = bones[i];
                        const seat = bones.indexOf(bone);

                        if (seat < -1) {
                            continue;
                        }
                        const bonePosition = vehicle.getWorldPositionOfBone(vehicle.getBoneIndexByName(bone));
                        const distance = this.getDistance(bonePosition);

                        //mp.game.graphics.notify('seat: ' + seat + 'distance: '+distance);

                        if (distance < closestDistance && vehicle.isSeatFree(seat)) {
                            closestSeat = seat;
                            closestDistance = distance;
                        }
                    }

                    //mp.game.graphics.notify(teleport.indexOf(closestSeat));
                    //mp.game.graphics.notify(closestSeat);

                    if (teleport.indexOf('' + closestSeat) != -1) {
                        //mp.game.graphics.notify('teleport');
                        if (vehicle.isSeatFree(closestSeat)) {
                            this.teleport = true;
                            return closestSeat;
                        }
                    }

                    if (model == 0x9628879c || model == 0x9dc66994 || model == 0x72935408 || model == 0x2c33b46e) {
                        //Granger, Fbi2, Sheriff2, Pranger
                        if (closestSeat == 5) {
                            if (!vehicle.isSeatFree(1)) {
                                return 5;
                            }
                            return 1;
                        }
                        if (closestSeat == 4) {
                            if (!vehicle.isSeatFree(0)) {
                                return 4;
                            }
                            return 0;
                        }
                        if (closestSeat == 6) {
                            if (!vehicle.isSeatFree(2)) {
                                return 6;
                            }
                            return 2;
                        }
                    } else if (this.getVehicleTeleportLimitSeat() != 99 && closestSeat >= this.getVehicleTeleportLimitSeat()) {
                        for (let i = this.getVehicleTeleportLimitSeat(); i < 15; i++) {
                            if (vehicle.isSeatFree(i)) {
                                this.teleport = true;
                                return i;
                            }
                        }
                    }
                    return closestSeat;
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

                        //let newDist = 

                        if (dist < this.getDistanceToEntity(closest, false)) {
                            closest = vehicle;
                        }
                    });

                    return closest;
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
                            /*case 0x8b13f083: // Stretch
                            case 0xe6e967f8: // Patriot 2
                                return 3;*/
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

        }, {}],
        162: [function(require, module, exports) {
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _player = require('../player/player');

            var _player2 = _interopRequireDefault(_player);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            class VehicleModule {
                constructor() {
                    this.doorstate = false;

                    // Menu items for basic players outside the car
                    this.menuItemsOutOfCar = [{ label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" }, { label: 'Schlüssel', description: 'Fahrzeug auf/abschließen', icon: 'img/icons/vehicle/key.png', id: 'REQUEST_VEHICLE_TOGGLE_LOCK_OUTSIDE', arg: "" }, { label: 'Kofferraum', description: 'Öffnet/Schließt den Kofferraum', icon: 'img/icons/vehicle/trunk.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR_OUTSIDE', arg: "5" },
                        /*
                        { label: 'Motorhaube', description: 'Öffnet/Schließt die Motorhaube', icon: 'img/icons/vehicle/hood.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR_OUTSIDE', arg: "4" },
                        { label: 'Beifahrertür', description: 'Öffnet die Tür des Beifahrers', icon: 'img/icons/vehicle/cardoor_r.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR_OUTSIDE', arg: "1" },
                        { label: 'Rechte Hintertür', description: 'Öffnet die Tür des Passagiers hinten Rechts', icon: 'img/icons/vehicle/cardoor_r.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR_OUTSIDE', arg: "3" },
                        { label: 'Linke Hintertür', description: 'Öffnet die Tür des Passagiers hinten Links', icon: 'img/icons/vehicle/cardoor_l.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR_OUTSIDE', arg: "2" },
                        { label: 'Fahrertür', description: 'Öffnet die Tür des Fahrers', icon: 'img/icons/vehicle/cardoor_l.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR_OUTSIDE', arg: "0" },
                        */
                        { label: 'Tankstelle', description: 'Betanken Sie das Fahrzeug', icon: 'img/icons/vehicle/gasstation.png', id: 'REQUEST_VEHICLE_FILL_FUEL', arg: "" }, { label: 'Information', description: 'Informationen zum Fahrzeug', icon: 'img/icons/vehicle/information.png', id: 'REQUEST_VEHICLE_INFORMATION', arg: "" }, { label: 'Reparieren', description: 'Reparieren Sie das Fahrzeug', icon: 'img/icons/vehicle/repair.png', id: 'REQUEST_VEHICLE_REPAIR', arg: "" }
                    ];
                    this.menuItemsOutOfCarHitman = [{ label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" }, { label: 'Schlüssel', description: 'Fahrzeug auf/abschließen', icon: 'img/icons/vehicle/key.png', id: 'REQUEST_VEHICLE_TOGGLE_LOCK_OUTSIDE', arg: "" }, { label: 'Kofferraum', description: 'Öffnet/Schließt den Kofferraum', icon: 'img/icons/vehicle/trunk.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR_OUTSIDE', arg: "5" },
                        /*
                        { label: 'Motorhaube', description: 'Öffnet/Schließt die Motorhaube', icon: 'img/icons/vehicle/hood.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR_OUTSIDE', arg: "4" },
                        { label: 'Beifahrertür', description: 'Öffnet die Tür des Beifahrers', icon: 'img/icons/vehicle/cardoor_r.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR_OUTSIDE', arg: "1" },
                        { label: 'Rechte Hintertür', description: 'Öffnet die Tür des Passagiers hinten Rechts', icon: 'img/icons/vehicle/cardoor_r.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR_OUTSIDE', arg: "3" },
                        { label: 'Linke Hintertür', description: 'Öffnet die Tür des Passagiers hinten Links', icon: 'img/icons/vehicle/cardoor_l.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR_OUTSIDE', arg: "2" },
                        { label: 'Fahrertür', description: 'Öffnet die Tür des Fahrers', icon: 'img/icons/vehicle/cardoor_l.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR_OUTSIDE', arg: "0" },
                        */
                        { label: 'Tankstelle', description: 'Betanken Sie das Fahrzeug', icon: 'img/icons/vehicle/gasstation.png', id: 'REQUEST_VEHICLE_FILL_FUEL', arg: "" }, { label: 'Information', description: 'Informationen zum Fahrzeug', icon: 'img/icons/vehicle/information.png', id: 'REQUEST_VEHICLE_INFORMATION', arg: "" }, { label: 'Reparieren', description: 'Reparieren Sie das Fahrzeug', icon: 'img/icons/vehicle/repair.png', id: 'REQUEST_VEHICLE_REPAIR', arg: "" }, { label: 'Peilsender', description: 'Bringen Sie einen Peilsender an dieses Fahrzeug an', icon: 'img/icons/player/peilsender.png', id: 'REQUEST_VEHICLE_PEILSENDER', arg: "" }
                    ];
                    // Menu items for dpos outside of the car
                    this.menuItemsOutOfCarDpos = [{ label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" }, { label: 'Schlüssel', description: 'Fahrzeug auf/abschließen', icon: 'img/icons/vehicle/key.png', id: 'REQUEST_VEHICLE_TOGGLE_LOCK_OUTSIDE', arg: "" }, { label: 'Kofferraum', description: 'Öffnet/Schließt den Kofferraum', icon: 'img/icons/vehicle/trunk.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR_OUTSIDE', arg: "5" },
                        /*
                        { label: 'Motorhaube', description: 'Öffnet/Schließt die Motorhaube', icon: 'img/icons/vehicle/hood.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR_OUTSIDE', arg: "4" },
                        { label: 'Beifahrertür', description: 'Öffnet die Tür des Beifahrers', icon: 'img/icons/vehicle/cardoor_r.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR_OUTSIDE', arg: "1" },
                        { label: 'Rechte Hintertür', description: 'Öffnet die Tür des Passagiers hinten Rechts', icon: 'img/icons/vehicle/cardoor_r.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR_OUTSIDE', arg: "3" },
                        { label: 'Linke Hintertür', description: 'Öffnet die Tür des Passagiers hinten Links', icon: 'img/icons/vehicle/cardoor_l.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR_OUTSIDE', arg: "2" },
                        { label: 'Fahrertür', description: 'Öffnet die Tür des Fahrers', icon: 'img/icons/vehicle/cardoor_l.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR_OUTSIDE', arg: "0" },
                        { label: 'Handbremse', description: 'Handbremse Lösen', icon: 'img/icons/vehicle/break.png', id: 'REQUEST_VEHICLE_BREAK_OFF', arg: "" },
                        */
                        { label: 'Tankstelle', description: 'Betanken Sie das Fahrzeug', icon: 'img/icons/vehicle/gasstation.png', id: 'REQUEST_VEHICLE_FILL_FUEL', arg: "" }, { label: 'Information', description: 'Informationen zum Fahrzeug', icon: 'img/icons/vehicle/information.png', id: 'REQUEST_VEHICLE_INFORMATION', arg: "" }, { label: 'Reparieren', description: 'Reparieren Sie das Fahrzeug', icon: 'img/icons/vehicle/repair.png', id: 'REQUEST_VEHICLE_REPAIR', arg: "" }, { label: 'Aufladen', description: 'Auf Tieflader aufladen', icon: 'img/icons/vehicle/aufladen.png', id: 'REQUEST_VEHICLE_FlATBED_LOAD', arg: "" }
                    ];
                    // Menu items for basic players inside a car
                    this.menuItemsInCar = [{ label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" }, { label: 'Schlüssel', description: 'Fahrzeug auf/abschließen', icon: 'img/icons/vehicle/key.png', id: 'REQUEST_VEHICLE_TOGGLE_LOCK', arg: "" },
                        /*
                        { label: 'Sitzgurt', description: 'Schnallen Sie sich zur Sicherheit an. Sonst könnten Sie aus dem Fahrzeug heraus geschleudert werden', icon: 'img/icons/vehicle/seatbelt.png', id: 'REQUEST_VEHICLE_TOGGLE_SEATBELT', arg: "" },
                        { label: 'Tempomat', description: 'Regelt die Drehzahl des Motors um mit gleichbleibender Geschwindigkeit zu fahren', icon: 'img/icons/vehicle/tempomat.png', id: 'SPEEDLIMITER', arg: "" },
                        { label: 'Beifahrertür', description: 'Öffnet die Tür des Beifahrers', icon: 'img/icons/vehicle/cardoor_r.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR', arg: "1" },
                        { label: 'Rechte Hintertür', description: 'Öffnet die Tür des Passagiers hinten Rechts', icon: 'img/icons/vehicle/cardoor_r.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR', arg: "3" },
                        { label: 'Motorhaube', description: 'Öffnet/Schließt die Motorhaube', icon: 'img/icons/vehicle/hood.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR', arg: "4" },
                        { label: 'Warnblinker', description: 'Aktiviert/Deaktiviert die Warnblinkanlage', icon: 'img/icons/vehicle/warning.png', id: 'REQUEST_VEHICLE_TOGGLE_INDICATORS', arg: "" },
                        { label: 'Linke Hintertür', description: 'Öffnet die Tür des Passagiers hinten Links', icon: 'img/icons/vehicle/cardoor_l.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR', arg: "2" },
                        { label: 'Fahrertür', description: 'Öffnet die Tür des Fahrers', icon: 'img/icons/vehicle/cardoor_l.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR', arg: "0" },
                        { label: 'Radio', description: 'Musik gefällig? Los Santos Radio by GVMP', icon: 'img/icons/vehicle/radio.png', id: 'REQUEST_RADIO_TOGGLE', arg: "" },
                        { label: 'Handbremse', description: 'Handbremse Ziehen/Lösen', icon: 'img/icons/vehicle/break.png', id: 'REQUEST_VEHICLE_TOGGLE_BREAK', arg: "" },
                        */
                        { label: 'Kofferraum', description: 'Öffnet/Schließt den Kofferraum', icon: 'img/icons/vehicle/trunk.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR', arg: "5" }, { label: 'Radio', description: 'Schaltet das Radio ab', icon: 'img/icons/vehicle/radio.png', id: 'LOCAL_ACTION', arg: "RadioOff" }, { label: 'Motor', description: 'Startet/Stopt den Motor', icon: 'img/icons/vehicle/engine.png', id: 'REQUEST_VEHICLE_TOGGLE_ENGINE', arg: "" }
                    ];
                    // Menu items for dpos inside a car
                    this.menuItemsInCarDpos = [{ label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" }, { label: 'Schlüssel', description: 'Fahrzeug auf/abschließen', icon: 'img/icons/vehicle/key.png', id: 'REQUEST_VEHICLE_TOGGLE_LOCK', arg: "" },
                        /*
                        { label: 'Sitzgurt', description: 'Schnallen Sie sich zur Sicherheit an. Sonst könnten Sie aus dem Fahrzeug heraus geschleudert werden', icon: 'img/icons/vehicle/seatbelt.png', id: 'REQUEST_VEHICLE_TOGGLE_SEATBELT', arg: "" },
                        { label: 'Tempomat', description: 'Regelt die Drehzahl des Motors um mit gleichbleibender Geschwindigkeit zu fahren', icon: 'img/icons/vehicle/tempomat.png', id: 'SPEEDLIMITER', arg: "" },
                        { label: 'Beifahrertür', description: 'Öffnet die Tür des Beifahrers', icon: 'img/icons/vehicle/cardoor_r.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR', arg: "1" },
                        { label: 'Rechte Hintertür', description: 'Öffnet die Tür des Passagiers hinten Rechts', icon: 'img/icons/vehicle/cardoor_r.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR', arg: "3" },
                        { label: 'Motorhaube', description: 'Öffnet/Schließt die Motorhaube', icon: 'img/icons/vehicle/hood.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR', arg: "4" },
                        { label: 'Warnblinker', description: 'Aktiviert/Deaktiviert die Warnblinkanlage', icon: 'img/icons/vehicle/warning.png', id: 'REQUEST_VEHICLE_TOGGLE_INDICATORS', arg: "" },
                        { label: 'Linke Hintertür', description: 'Öffnet die Tür des Passagiers hinten Links', icon: 'img/icons/vehicle/cardoor_l.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR', arg: "2" },
                        { label: 'Fahrertür', description: 'Öffnet die Tür des Fahrers', icon: 'img/icons/vehicle/cardoor_l.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR', arg: "0" },
                        { label: 'Radio', description: 'Musik gefällig? Los Santos Radio by GVMP', icon: 'img/icons/vehicle/radio.png', id: 'REQUEST_RADIO_TOGGLE', arg: "" },
                        { label: 'Handbremse', description: 'Handbremse Ziehen/Lösen', icon: 'img/icons/vehicle/break.png', id: 'REQUEST_VEHICLE_TOGGLE_BREAK', arg: "" },
                        */
                        { label: 'Kofferraum', description: 'Öffnet/Schließt den Kofferraum', icon: 'img/icons/vehicle/trunk.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR', arg: "5" }, { label: 'Motor', description: 'Startet/Stopt den Motor', icon: 'img/icons/vehicle/engine.png', id: 'REQUEST_VEHICLE_TOGGLE_ENGINE', arg: "" }, { label: 'Radio', description: 'Schaltet das Radio ab', icon: 'img/icons/vehicle/radio.png', id: 'LOCAL_ACTION', arg: "RadioOff" }, { label: 'Abladen', description: 'Von Tieflader abladen', icon: 'img/icons/vehicle/abladen.png', id: 'REQUEST_VEHICLE_FlATBED_UNLOAD', arg: "" }
                    ];

                    let smokeR = -1;
                    let smokeG = -1;
                    let smokeB = -1;

                    mp.events.add("syncTuning", (vehicle, slot, tuning) => {
                        if (vehicle == null) {
                            return;
                        }
                        let obj = vehicle.getExtraColours(1, 1);
                        if (parseInt(slot) == 14 || parseInt(slot) == 16 || parseInt(slot) == 18) {
                            vehicle.setMod(parseInt(slot), tuning);
                        } else if (parseInt(slot) == 22) {
                            if (tuning == -1) {
                                vehicle.toggleMod(22, false);
                                mp.game.invoke("0xE41033B25D003A07", vehicle.handle, 255);
                            } else {
                                vehicle.toggleMod(22, true);
                            }
                        } else if (parseInt(slot) == 46) {
                            mp.game.invoke("0x57C51E6BAD752696", vehicle.handle, tuning);
                        } else if (parseInt(slot) == 80) {
                            mp.game.invoke("0xE41033B25D003A07", vehicle.handle, tuning);
                        } else if (parseInt(slot) == 81) {
                            vehicle.setNumberPlateTextIndex(parseInt(tuning));
                        } else if (parseInt(slot) == 95) {
                            smokeR = tuning;
                        } else if (parseInt(slot) == 96) {
                            smokeG = tuning;
                        } else if (parseInt(slot) == 97) {
                            smokeB = tuning;
                        } else if (parseInt(slot) == 98) {
                            vehicle.setExtraColours(tuning, obj.wheelColor);
                        } else if (parseInt(slot) == 99) {
                            vehicle.setExtraColours(obj.pearlescentColor, tuning);
                        } else {
                            //vehicle.setMod(slot, tuning);
                            mp.game.invoke("0x6AF0636DDEDCB6DD", vehicle.handle, parseInt(slot), tuning, false);
                        }
                        if (smokeR != -1 && smokeG != -1 && smokeB != -1) {
                            vehicle.toggleMod(20, true);
                            if (smokeR == 1 && smokeG == 1 && smokeB == 1) {
                                smokeR = 1;
                                smokeG = 1;
                                smokeB = 1;
                            }
                            vehicle.setTyreSmokeColor(smokeR, smokeG, smokeB);
                            smokeR = -1;
                            smokeG = -1;
                            smokeB = -1;
                        }
                    });

                    mp.events.add("syncSirenState", (vehicle, state) => {
                        return;
                    });

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

                    mp.events.add("responseVehicleSyncData", (vehicle, tuning, siren, sirenSound, doorStates) => {
                        if (vehicle == null) return;

                        vehicle.setSiren(siren);

                        let obj = vehicle.getExtraColours(1, 1);
                        let pearlColor = obj.pearlescentColor;
                        let wheelColor = obj.wheelColor;
                        let tireSmokeR = -1;
                        let tireSmokeG = -1;
                        let tireSmokeB = -1;
                        const mods = JSON.parse(tuning);
                        for (const mod in mods) {
                            if (parseInt(mod) == 14 || parseInt(mod) == 16 || parseInt(mod) == 18) {
                                vehicle.setMod(parseInt(mod), mods[mod]);
                            } else if (parseInt(mod) == 22) {
                                if (mods[mod] == -1) {
                                    vehicle.toggleMod(22, false);
                                    mp.game.invoke("0xE41033B25D003A07", vehicle.handle, 255);
                                } else {
                                    vehicle.toggleMod(22, true);
                                }
                            } else if (parseInt(mod) == 46) {
                                mp.game.invoke("0x57C51E6BAD752696", vehicle.handle, mods[mod]);
                            } else if (parseInt(mod) == 80) {
                                mp.game.invoke("0xE41033B25D003A07", vehicle.handle, mods[mod]);
                            } else if (parseInt(mod) == 81) {
                                vehicle.setNumberPlateTextIndex(mods[mod]);
                            } else if (parseInt(mod) == 95) {
                                tireSmokeR = mods[mod];
                            } else if (parseInt(mod) == 96) {
                                tireSmokeG = mods[mod];
                            } else if (parseInt(mod) == 97) {
                                tireSmokeB = mods[mod];
                            } else if (parseInt(mod) == 98) {
                                pearlColor = mods[mod];
                            } else if (parseInt(mod) == 99) {
                                wheelColor = mods[mod];
                            } else {
                                //vehicle.setMod(parseInt(mod), mods[mod]);
                                mp.game.invoke("0x6AF0636DDEDCB6DD", vehicle.handle, parseInt(mod), mods[mod], false);
                            }
                        }
                        vehicle.setExtraColours(pearlColor, wheelColor);
                        if (tireSmokeR != -1 || tireSmokeG != -1 || tireSmokeB != -1) {
                            vehicle.toggleMod(20, true);
                            if (smokeR == 1 && smokeG == 1 && smokeB == 1) {
                                smokeR = 1;
                                smokeG = 1;
                                smokeB = 1;
                            }
                            vehicle.setTyreSmokeColor(tireSmokeR, tireSmokeG, tireSmokeB);
                        }

                        const doors = JSON.parse(doorStates);
                        for (const door in doors) {

                            if (doors[door] == true) {
                                vehicle.setDoorOpen(parseInt(door), false, false);
                            }
                        }
                    });

                    mp.events.add("vehicleSirenToggle", (vehicle, toggle) => {
                        mp.events.callRemote("VehicleSirenToggled", vehicle, toggle);
                    });
                }

                getVehicleItems() {
                    if (_player2.default.isInAnyVehicle()) {
                        if (_player2.default.team == 16 && _player2.default.duty) {
                            return this.menuItemsInCarDpos;
                        } else {
                            return this.menuItemsInCar;
                        }
                    } else {
                        if (_player2.default.team == 16 && _player2.default.duty) {
                            return this.menuItemsOutOfCarDpos;
                        } else {
                            if (_player2.default.team == 20) {
                                return this.menuItemsOutOfCarHitman;
                            } else {
                                return this.menuItemsOutOfCar;
                            }
                        }
                    }
                }
            }

            exports.default = new VehicleModule();

        }, { "../player/player": 156 }],
        163: [function(require, module, exports) {
            'use strict';

            require('./vehicle-module');

        }, { "./vehicle-module": 162 }],
        164: [function(require, module, exports) {
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

        }, { "../app/apps": 3, "../apps/callManage": 9, "../browser/browser": 88, "../player/player": 156 }],
        165: [function(require, module, exports) {
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

        }, { "../browser/browser": 88, "../components/component": 89, "../peds/peds": 153, "./windows": 166 }],
        166: [function(require, module, exports) {
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

        }, { "../browser/browser": 88 }]
    }, {}, [1]);

    var clientBlips = new Array();

    mp.events.add('createClientBlip', (ID, position, name, color, shortRange, dimension, scale) => {
        clientBlips[clientBlips.length + 1] = mp.blips.new(parseInt(ID), position, {
            name: name,
            color: parseInt(color),
            shortRange: (shortRange === 'true'),
            dimension: dimension,
            scale: scale
        });
    });

    mp.events.add('render', () => {
        mp.players.local.setConfigFlag(32, false);
        mp.game.invoke('0x4757F00BC6323CFE', -1553120962, 0.0);
        if (mp.players.local.vehicle) {
            mp.players.local.vehicle.setEnginePowerMultiplier(16);
            mp.players.local.vehicle.setEngineTorqueMultiplier(1.2);
        }
        mp.game.player.restoreStamina(100);
        mp.game.invoke('0xFAEE099C6F890BB8', mp.players.local, false, true, true, false, false, false, false, false);
    });

    function setHeadlightsColor(vehicle, color) {
        if (typeof color !== "number" || isNaN(color) || color < 0 || color === 255) {
            // Disable
            vehicle.toggleMod(22, false);
            mp.game.invoke("0xE41033B25D003A07", vehicle.handle, 255);
        } else {
            // Enable
            vehicle.toggleMod(22, true);
            mp.game.invoke("0xE41033B25D003A07", vehicle.handle, color);
        }
    }

    mp.events.add("entityStreamIn", (entity) => {
        if (entity.type === "vehicle") setHeadlightsColor(entity, parseInt(entity.getVariable("headlightColor")));
        if (entity.type === "ped") {
            if (entity.getVariable('INVISIBLE') == true) {
                entity.setVisible(false, false);
            } else {
                entity.setVisible(true, false);
            }
        }
    });

    mp.events.addDataHandler("headlightColor", (entity, value) => {
        if (entity.type === "vehicle") setHeadlightsColor(entity, value);
        if (entity.type === "ped") {
            if (entity.getVariable('INVISIBLE') == true) {
                entity.setVisible(false, false);
            } else {
                entity.setVisible(true, false);
            }
        }
    });

    function checkWeapons() {
        mp.events.callRemote("checkWeaponHashes", mp.game.invoke(`0x0A6DB4965674D243`, mp.players.local.handle));
        // mp.events.callRemote("onCheckTick");
        setTimeout(() => {
            checkWeapons();
        }, 2000);
    }

    checkWeapons();

    mp.events.add('client:weaponSwap', () => {
        Behaviour.resetWeapon()
    });

    mp.events.add('playerWeaponShot', () => {
        if (Behaviour.checkWeaponhash()) {
            mp.events.callRemote("server:CheatDetection", "Unallowed Weapon")
        }
        Behaviour.updateMagSize()
    });

    mp.keys.bind(0x52, true, () => {
        Behaviour.reloading = true
        setTimeout(() => {
            Behaviour.magazin = mp.game.weapon.getWeaponClipSize(mp.game.invoke(`0x0A6DB4965674D243`, mp.players.local.handle))
            Behaviour.reloading = false
        }, 2000);
    })

    mp.events.add('client:respawning', () => {
        if (Behaviour.active) Behaviour.sleep(3)
    })

    class PlayerBehaviour {
        constructor() {
            this.active = true
            this.flags, this.hits = 0
            this.reloadingWeapon = false
            this.pos = mp.players.local.position
            this.health = Number(mp.players.local.getHealth()) + Number(mp.players.local.getArmour())
            this.weapon = mp.game.invoke(`0x0A6DB4965674D243`, mp.players.local.handle);
            this.magazin = mp.game.weapon.getWeaponClipSize(this.weapon)
            this.firstshot = true
        }
        sleep(duration) {
            this.active = false
            setTimeout(() => {
                this.active = true
            }, duration * 1000);
        }
        secs() {
            return Math.round(Date.now() / 1000)
        }
        isRagdollOnHeight(height) {
            this.range_to_btm = mp.game.gameplay.getGroundZFor3dCoord(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, parseFloat(0), false);
            if (Math.abs(mp.players.local.position.z - this.range_to_btm) > Math.abs(height - this.range_to_btm)) {
                if (!this.isWalking()) {
                    return false;
                } else if (this.active && this.range_to_btm > 0) {
                    return true;
                }
                return false
            }
        }
        isWalking() {
            if (mp.players.local.isFalling() || mp.players.local.isRagdoll()) return false
            else if (!mp.players.local.vehicle) return true
        }
        subtractVector(v1, v2) {
            return { "x": v1.x - v2.x, "y": v1.y - v2.y, "z": v1.z - v2.z }
        }
        VehicleFasterThan(max) {
            if (mp.players.local.vehicle) {
                if (!(parseInt(mp.players.local.vehicle.getClass() == 16))) {
                    return mp.players.local.vehicle.getSpeed() * 3.6 > max
                }
            }
            return false
        }
        checkCarPos(maxHeight = 50) {
            if (mp.players.local.vehicle) {
                if (parseInt(mp.players.local.vehicle.getClass()) != 15 && parseInt(mp.players.local.vehicle.getClass()) != 16) {
                    this.range_to_btm = mp.game.gameplay.getGroundZFor3dCoord(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, parseFloat(0), false);
                    if (mp.players.local.position.z - this.range_to_btm > maxHeight + this.range_to_btm) {
                        return true
                    }
                    return false
                }
            }
        }
        checkWeaponhash() {
            return false
        }
        resetWeapon() {
            this.weapon = mp.game.invoke(`0x0A6DB4965674D243`, mp.players.local.handle)
            this.magazin = mp.game.weapon.getWeaponClipSize(this.weapon)
            this.reloadingWeapon = false
        }
        updateMagSize() {
            this.weapon = mp.game.invoke(`0x0A6DB4965674D243`, mp.players.local.handle)
            if (this.firstshot) {
                this.firstshot = false
                this.resetWeapon()
            }
            this.magazin -= 1
            if (this.magazin <= 0) {
                this.reloadingWeapon = true
                setTimeout(() => {
                    this.reloadingWeapon = false
                    this.resetWeapon()
                }, 1250);
            }
        }
    }
    var Behaviour = new PlayerBehaviour()
    var loop = Behaviour.secs()

    mp.events.add("render", () => {
        Behaviour.health = Number(mp.players.local.getHealth()) + Number(mp.players.local.getArmour())
        if (loop < Behaviour.secs()) {
            if (Behaviour.active) {
                if (mp.players.local.vehicle) {
                    if (Behaviour.checkCarPos(25)) {
                        mp.events.callRemote("server:CheatDetection", "Vehicle Flyhack")
                    }
                    if (Behaviour.VehicleFasterThan(500)) {
                        mp.events.callRemote("server:CheatDetection", "Vehicle Speedhack")
                    }
                }
            }

            Behaviour.pos = mp.players.local.position
            loop = Behaviour.secs() + 3;
        }

		
    });
let localPlayer = mp.players.local;
let spectateCam = null;
mp.events.add("spectatePlayer", (specatedPlayer) => {

    this.spectateCam = mp.cameras.new("spectateCamera")
    this.spectateCam.attachTo(specatedPlayer.handle, 0, -2.0, 1.0, true); 
    mp.players.local.position = new mp.Vector3(specatedPlayer.position.x, specatedPlayer.position.y, specatedPlayer.position.z - 88);
    this.spectateCam.setActive(true);
    mp.nametags.enabled = true;
    mp.game.cam.renderScriptCams(true, false, 0, true, false);
    localPlayer.freezePosition(true);
    this.specateInterval = setInterval(() => {
     this.spectateCam.pointAtCoord(specatedPlayer.position.x, specatedPlayer.position.y, specatedPlayer.position.z);
}, 5);
});

mp.events.add("stopSpectating", () => {
    if (this.spectateCam != null) {
    clearInterval(this.specateInterval);
    this.spectateCam.setActive(false);
    mp.game.cam.renderScriptCams(false, false, 0, false, false);
    mp.nametags.enabled = false;
    this.spectateCam.destroy(true);
    this.spectateCam = null;
    localPlayer.freezePosition(false);
    }
    });


    mp.events.add('render', () => {
        if (mp.players.local.vehicle) {
            if (mp.players.local.vehicle.getModel() === 1489967196) {
                mp.players.local.vehicle.setEnginePowerMultiplier(30)
            mp.players.local.vehicle.setEngineTorqueMultiplier(2);
            } 
        }
    })

setInterval(() => {
        let health = mp.players.local.getHealth();
        let vest = mp.players.local.getArmour()
        setTimeout(() => {
            if(mp.players.local.getHealth() + mp.players.local.getArmour() > health + vest){
		mp.events.callRemote("server:CheatDetection", "Healkey (unexpected HP added)")
            }
        }, 50);
    }, 20);
} catch {}

}