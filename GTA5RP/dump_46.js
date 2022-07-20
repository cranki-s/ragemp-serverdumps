{
    const mp = global.mp;
    let isAnyDialogOpen = !1;
    mp.events.add("client_dialog_show", function (a, b, c, d) {
        let e = "";
        c = c.replace(/{([a-fA-F0-9]{6}|[a-fA-F0-9]{3})}/g, `<font color="#$1">`).replace(/{SF}/g, `<font color="#6B7CA4">`).replace(/{SC}/g, `<font color="#fff">`).replace(/<t>/g, `&#9;`).replace(/\t/g, "").trim();
        let f = !1,
            g = !1,
            h = !1,
            i = !1,
            j = !1; - 1 !== c.indexOf("{V_BTN}") && (c = c.replace("{V_BTN}", ""), f = !0), -1 !== c.indexOf("{T_LEFT}") && (c = c.replace("{T_LEFT}", ""), g = !0), -1 !== c.indexOf("{W_L}") && (c = c.replace("{W_L}", ""), h = !0), -1 !== c.indexOf("{T_PASS}") && (c = c.replace("{T_PASS}", ""), i = !0), -1 !== c.indexOf("{TIMEOUTBTN}") && (c = c.replace("{TIMEOUTBTN}", ""), j = !0);
        const k = 0 < d.length ? d.split("\n") : "";
        let l = [];
        if ("LIST" !== a && (c = c.replace(/\n/g, `<br>`)), "MSG" === a) e = `<div>`, e += c, e += `</div>`, l = 4 <= k.length ? ["green", "purple", "orange"] : ["green", "purple", ""];
        else if ("INPUT" === a) e = `<div>`, e += c, e += `<br><div class="yk-input-block mt-10 w-100"><input id="dialog-input" ${i?"type=\"password\"":""} class="yk-input"></div>`, e += `</div>`, l = 4 <= k.length ? ["green", "purple", "orange"] : ["green", "purple", ""];
        else if ("LIST" === a) {
            const a = 0 < c.length ? c.split("\n") : "";
            e = `<div id="dialog-list-box">`;
            for (let b = 0; b < a.length; b++) e += `<div class="dialog-list-item dialog-list-item-button" id="${b}">${a[b]}</div>`;
            e += `</div>`, l = ["orange"]
        }
        let m = "";
        for (let e = 0; e < k.length; e++) m += `<button class="dialog-btn yk-btn ${l[e]?l[e]:""} s-18 ${f?"list-mt-10":"list-ml-10"}" tabindex="-1" id="${e}">${k[e]}</button>`;
        b = escape(b), e = escape(e), m = escape(m), global.menuBrowser.execute(`showDialog("${a}", "${b}", "${e}", "${m}", { btnVerticalMode: ${f}, textAlignLeft: ${g}, widthLarge: ${h}, timeoutBtn: ${j} });`), isAnyDialogOpen || global.showCursor(!0, !0), isAnyDialogOpen = !0
    }), mp.events.add("client_dialog_hide", function () {
        global.menuBrowser.execute(`hideDialog();`), global.showCursor(!1, !1), isAnyDialogOpen = !1
    }), mp.events.add("_dialog_clickButton", function (a, b) {
        global.isFullScreenBrowserOpen() || mp.events.callRemote("server_dialog_clickButton", a, b)
    }), mp.events.add("_dialog_clickListItem", function (a) {
        global.isFullScreenBrowserOpen() || mp.events.callRemote("server_dialog_clickListItem", a)
    });
}