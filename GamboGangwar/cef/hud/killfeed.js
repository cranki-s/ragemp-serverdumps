function addKillFeed(player, target, weapon) {
    showKillfeed({ player: player, target: target, weapon: weapon });
}

function showKillfeed(kill) {
    var list = $("#killfeed_list");
    var entry = "<div class='killfeed_list_item'><span class='name'>" + kill.player + "</span><img onerror='if(this.src != `../mainmenu/img/weapons/skull.png`) this.src = `../mainmenu/img/weapons/skull.png`;' src='../mainmenu/img/weapons/" + kill.weapon + ".png'/><span class='target'>" + kill.target + "</span></div>";
    var entry_jquery = $(entry);

    if (list.children().length > 2) {
        list.find("div:first").remove();
    }

    list.append(entry_jquery);
    $(entry_jquery).animate({
        top: "0rem",
        opacity: "1",
    }, {
        duration: 500,
        easing: "swing",
        done: function() {
            setTimeout(function() {
                $(entry_jquery).animate({
                    right: "-1rem",
                    opacity: "0",
                }, {
                    duration: 500,
                    easing: "swing",
                    done: function() {
                        entry_jquery.remove();
                    },
                });
            }, 1750);
        },
    });
}