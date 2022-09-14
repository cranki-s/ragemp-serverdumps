var DEBUG = false;
var Advertisements = [];
var Events = [];

if (DEBUG) {
    var mp = {};
    mp.trigger = function (n, ...args) {
        console.log(n + " " + args);
        if (n == "genericNotificationEx")
            UIkit.notification(JSON.parse(args));
    }

    Advertisements = [
        {
            "id": 7,
            "time": "26/APR/2021 11:04",
            "advertisement": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas efficitur ullamcorper lorem consectetur consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget nunc pretium, sodales enim et, placerat orci.",
            "type": 0,
            "name": "test",
            "phone": 12345,
        }, {
            "id": 6,
            "time": "25/APR/2021 11:02",
            "advertisement": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas efficitur ullamcorper lorem consectetur consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget nunc pretium, sodales enim et, placerat orci.",
            "type": 0,
            "phone": 123456789,
        }, {
            "id": 5,
            "time": "25/APR/2021 11:07",
            "advertisement": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas efficitur ullamcorper lorem consectetur consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget nunc pretium, sodales enim et, placerat orci. Moma",
            "type": 0,
            "phone": "0000000000",
        },
        {
            "id": 4,
            "time": "26/APR/2021 10:04",
            "advertisement": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas efficitur ullamcorper lorem consectetur consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget nunc pretium, sodales enim et, placerat orci.",
            "type": 1,
            "location_x": 0,
            "location_y": 0,
        }, {
            "id": 3,
            "time": "25/APR/2021 10:02",
            "advertisement": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas efficitur ullamcorper lorem consectetur consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget nunc pretium, sodales enim et, placerat orci.",
            "type": 2,
        }, {
            "id": 2,
            "time": "25/APR/2021 11:07",
            "advertisement": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas efficitur ullamcorper lorem consectetur consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget nunc pretium, sodales enim et, placerat orci. Test",
            "type": 1,
        }, {
            "id": 1,
            "time": "25/APR/2021 11:07",
            "advertisement": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas efficitur ullamcorper lorem consectetur consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget nunc pretium, sodales enim et, placerat orci. Moma",
            "type": 2,
        },
    ];
    Events = [
        {
            "id": 1,
            "title": "Test Event1 ❤️",
            "start": "2021-05-03 13:23:00",
            "end": "2021-05-03 15:00:00",
            "content": "lalalalala",
            "location": "location here"
        },
        {
            "id": 2,
            "title": "Test Event2",
            "start": "2021-05-03 15:00:00",
            "end": "2021-05-03 15:30:00",
            "content": "lalalalala",
            "location": "location here"
        }, {
            "id": 3,
            "title": "Test Event3",
            "start": "2021-05-09 23:00:00",
            "end": "2021-05-10 01:30:00",
            "content": '<p>saadasd</p><p>s</p><p>s<br>SSSSS<br>@@@@@</p><p><img src="https://i.imgur.com/eHIgzi1.png" style="width: 652.766px;"><br></p>',
            "location": "location here",
        }
    ];

    document.getElementsByTagName("html")[0].style.display = 'block';
}

var calendar = null;
var ToggleNotifications = false;
var Settings = {};
var Admin = false;
var WorldPoints = 0;
var CharacterID = 0;
var MAX_ADVERTISEMENTS_CLIENT = 100;
var advertisementCounter = 0;
var ThreeMinutePopup = false;
var EventReminderPopup = false;
var ThirtyMinutesTimeoutSet = false;
var ThirtyMinutesTimeout = 0; //1800 seconds
var ThreeMinutesPopupNew = 0;

var EventConfirm = false;
var EventDelConfirm = false;
var AdDelConfirm = false;
var LastEventSeen = 0;
var LastAdSeen = 0;
var BusinessBlip = false;

var AdCooldown = 0.5;

jQuery(document).ready(function () {
    setInterval(function () {
        OnSecondUpdate();
    }, 1000);

    jQuery('#closeADs').on('click', function () {
        if ($("#Advertisements").css('opacity') > 0)
            mp.trigger('hideAdvertisements');
    });

    jQuery('#show_blips').on('click', function () {
        LoadBlips();
        UIkit.modal("#modal-blip").show();
    });

    jQuery('#select_blip').on('click', function () {
        var blip = $("input[name='blipradio']:checked").val();
        if (!blip) {
            return mp.trigger('genericNotificationEx', JSON.stringify({
                message: 'You have not yet selected a blip',
                pos: 'bottom-right',
                status: 'danger',
                timeout: Settings.speed
            }));
        } else {
            BusinessBlip = true;
            SetBusinessData($("#newAd_Name").val(), BusinessBlip);
            mp.trigger('advertisements::chooseBlip', blip);
        }
        UIkit.modal("#modal-blip").hide();
    });

    jQuery('input[name="newAd_Type"]').on('click', function () {
        let id = $(this).attr('id');
        if (id == 0) {
            $("input[name='showLocation']").prop("checked", false);
            $("#locationEnabled").fadeTo("fast", 0);
            $("#BlipName").fadeTo("fast", 0);
            $("#BlipID").fadeTo("fast", 0);
            setTimeout(() => {
                $("#businessData").hide();
                $("#locationData").hide();
            }, 200);
        } else if (id == 1) {
            $("#businessData").hide();
            $("#BlipName").fadeTo("fast", 0);
            $("#BlipID").fadeTo("fast", 0);

            $("#locationData").show();
            $("#locationEnabled").fadeTo("fast", 1);
        } else {
            mp.trigger("advertisements::getBusinessData");
        }
    });

    jQuery('#place_ad').on('click', function () {
        if ($("#Advertisements").css('opacity') < 1) return;

        $("#place_ad").prop("disabled", true);
        setTimeout(function () {
            $("#place_ad").prop("disabled", false);
        }, AdCooldown * 1000);

        var type = $("input[name='newAd_Type']:checked").attr('id');
        var text = $("#newAd_Text").val();
        if (type === undefined) {
            return mp.trigger('genericNotificationEx', JSON.stringify({
                message: 'You need to select an advertisement type',
                pos: 'bottom-right',
                status: 'danger',
                timeout: Settings.speed
            }));
        }
        if (text.length == 0) {
            return mp.trigger('genericNotificationEx', JSON.stringify({
                message: 'You need to write an advertisement text',
                pos: 'bottom-right',
                status: 'danger',
                timeout: Settings.speed
            }));
        }
        var name = $("#newAd_Name").val();
        var showLocation = 0;
        if (type == 1) {
            let isWayPointChecked = $("input[name='showLocation']").is(':checked');
            if (isWayPointChecked) showLocation = 1;
        } else if (type == 2) {
            if (name.length == 0 || !BusinessBlip) return mp.trigger('genericNotificationEx', JSON.stringify({
                message: 'You have not yet selected a business blip and/or set a business blip name',
                pos: 'bottom-right',
                status: 'danger',
                timeout: Settings.speed
            }));
            if (name.length > 50) return mp.trigger('genericNotificationEx', JSON.stringify({
                message: 'Your business blip name cannot be longer than 50 characters ',
                pos: 'bottom-right',
                status: 'danger',
                timeout: Settings.speed
            }));
            showLocation = 1;
        }
        mp.trigger('advertisements::placeNewAd', parseInt(type), text, name, showLocation);
    });

    $('#SearchAds').on("keyup", function () {
        var rex = new RegExp($(this).val(), 'i');
        $('.adsList tr ').hide();
        $('.adsList tr ').filter(function (i, v) {
            var $t = $(this).children(":eq(" + "1" + ")");
            return rex.test($t.text());
        }).show();
    });

    $('#SearchCAds').on("keyup", function () {
        var rex = new RegExp($(this).val(), 'i');
        $('.CadsList tr ').hide();
        $('.CadsList tr ').filter(function (i, v) {
            var $t = $(this).children(":eq(" + "1" + ")");
            return rex.test($t.text());
        }).show();
    });

    $('#SearchBAds').on("keyup", function () {
        var rex = new RegExp($(this).val(), 'i');
        $('.BadsList tr ').hide();
        $('.BadsList tr ').filter(function (i, v) {
            var $t = $(this).children(":eq(" + "1" + ")");
            return rex.test($t.text());
        }).show();
    });

    $(document).on('click', '.viewAdvertisement', function () {
        var Data = $(this).parent().parent().children(":eq(" + "1" + ")");
        var Type = $(this).attr("ad-type");
        var id = $(this).attr("ad-id");
        if (Type == 0) $("#modelTitle").html("Advertisement");
        else if (Type == 2) $("#modelTitle").html("Business Advertisement");
        else if (Type == 1) $("#modelTitle").html("Company Advertisement");
        $("#modelText").html(Data.text());
        if (Admin) {
            $("#modelName").html("((" + $(this).attr("ad-person") + "))");
            $("#modelName").show();
            LastAdSeen = id;
            $("#controlAdButtons").show();
        } else {
            $("#modelName").hide();
            $("#controlAdButtons").hide();
        }

        var phone = $(this).attr("ad-phone");
        if (phone !== undefined && phone !== null) {
            $("#modelPhone").html("Phone: " + phone);
            $("#modelPhone").show();
        } else $("#modelPhone").hide();
        UIkit.modal("#modal-view").show();
        return;
    });

    jQuery('#adDelete').on('click', function () {
        if ($("#Advertisements").css('opacity') < 1) return;

        if (!AdDelConfirm) {
            $("#adDelete").effect("pulsate", {times: 3}, 2000);
            $("#deleteAdConfirm").fadeTo("fast", 1);
            $("#adDelete").prop("disabled", true);
            setTimeout(function () {
                if ($('#modal-view').is(":hidden")) return;
                $("#adDelete").prop("disabled", false);
                AdDelConfirm = true
            }, 2100);
        } else {
            mp.trigger('advertisements::DeleteAd', LastAdSeen);
            UIkit.modal("#modal-view").hide();
            mp.trigger('genericNotificationEx', JSON.stringify({
                message: 'The advertisement has been deleted',
                pos: 'bottom-right',
                status: 'success',
                timeout: Settings.speed
            }));
            LastAdSeen = 0;
        }

    });

    $(document).on('click', '.setWaypoint', function () {
        var id = $(this).attr("ad-id");
        var ad = Advertisements.find(obj => {
            return obj.id == id
        });
        mp.trigger("markAdvertisement", ad.location_x, ad.location_y);
    });

    $(document).on('click', '.callNumber', function () {
        var id = $(this).attr("ad-id");
        var ad = Advertisements.find(obj => {
            return obj.id == id
        });
        mp.trigger("callAddOwner", ad.phone);
    });

    /* SETTINGS MENU */
    jQuery('#settings_save').on('click', function () {
        if ($("#Advertisements").css('opacity') < 1) return;

        Settings.seen = $('#setting_seen').is(":checked");
        Settings.chat = $('#setting_chat').is(":checked");
        var setting_off = $('#setting_off').is(":checked");
        Settings.style = $("input[name='setting_style']:checked").attr('id');
        Settings.speed = parseInt($("input[name='setting_speed']:checked").attr('id'));
        var setting_style_3_amount = $("#setting_style_3_amount").val();
        if (setting_style_3_amount > 255) setting_style_3_amount = 255;
        if (setting_style_3_amount < 10) setting_style_3_amount = 10;
        Settings.amount = parseInt(setting_style_3_amount);
        ToggleNotifications = setting_off;
        var setting_eventTime = $('#setting_eventTime').is(":checked");
        var setting_eventTimeEnd = $('#setting_eventTimeEnd').is(":checked");
        UIkit.switcher('#switcher').show(3);
        calendar.setOption('displayEventTime', setting_eventTime);
        calendar.setOption('displayEventEnd', setting_eventTimeEnd);
        UIkit.switcher('#switcher').show(5);
        mp.trigger('genericNotificationEx', JSON.stringify({
            message: 'Your settings have been saved',
            pos: 'bottom-right',
            status: 'success',
            timeout: Settings.speed
        }));
        GenerateAdLists();
        mp.trigger('toggleChatAdvertisements', Settings.chat);
        mp.trigger('saveAdvertisementSettings', JSON.stringify(Settings));
    });

    jQuery('input[name="setting_style"]').on('click', function () {
        if ($(this).attr('id') == 3) {
            $("#setting_style_3_amount_box").show();
            $("#setting_style_3_amount_box").fadeTo("fast", 1);
        } else {
            $("#setting_style_3_amount_box").fadeTo("fast", 0);
            setTimeout(() => {
                $("#setting_style_3_amount_box").hide();
            }, 200);
        }
    });

    $("#setting_style_3_amount").on('change', function () {
        var value = $("#setting_style_3_amount").val();
        if (value < 10) $("#setting_style_3_amount").val(10);
        if (value > 255) $("#setting_style_3_amount").val(255);
    });
    /* END SETTINGS MENU */

    /* CALENDAR / EVENT STUFF */
    UIkit.switcher('#switcher').show(3);
    var scrollTime = moment.utc().format("HH") + ":00:00";
    var calendarEl = document.getElementById('calendar-id');
    calendar = new FullCalendar.Calendar(calendarEl, {
        timeZone: 'UTC',
        initialView: 'timeGridWeek',
        height: 500,
        nowIndicator: true,
        allDaySlot: false,
        scrollTime: scrollTime,
        firstDay: 1,
        eventDisplay: 'block',
        displayEventEnd: false,
        eventDidMount: function (info) {
            var tooltip = new Tooltip(info.el, {
                //title: info.event.title,
                title: "Click to see details",
                placement: 'left',
                trigger: 'hover',
                container: 'body'
            });
        },
        customButtons: {
            newButton: {
                text: 'new',
                click: function () {
                    UIkit.modal("#modal-new").show();
                }
            }
        },
        eventTimeFormat: {
            hour: 'numeric',
            minute: '2-digit',
            meridiem: true,
            //hour12:false
        },
        views: {
            week: {
                titleFormat: 'D MMMM YYYY',
                dayHeaderFormat: 'ddd D/M',

            },
            day: {
                titleFormat: 'D MMMM YYYY',
            },
        },
        headerToolbar: {
            left: 'prev,next,today newButton',
            center: 'title',
            right: 'timeGridWeek,timeGridDay,dayGridMonth'
        },
        eventColor: '#393939',
        events: Events,
        eventClick: function (info) {
            $("#eventTitle").html(info.event.title);
            var event = Events.find(obj => {
                return obj.id == info.event.id
            });
            $("#eventContent").html(event.content);
            var date = moment(event.start).format('DD/MMM/YYYY HH:mm').toUpperCase();
            $("#eventStart").html("<b>Starting at:</b> " + date);
            $("#eventLocation").html("<b>Location:</b> " + event.location);
            if (Admin) {
                $("#eventOwner").html("(( Creator Character ID: " + event.character_id + "))");
                $("#eventOwner").show();
            } else $("#eventOwner").hide();

            if (Admin || CharacterID == event.character_id) {
                LastEventSeen = event.id;
                $("#controlButtons").show();
            } else $("#controlButtons").hide();

            UIkit.modal("#modal-event").show();
        },
    });
    calendar.render();

    $('#newEventStart').datetimepicker({
        icons: {
            time: "far fa-clock",
            date: "far fa-calendar-alt",
        },
        minDate: new Date(moment.utc().format("DD/MMM/YYYY HH:m")),
        format: 'DD/MMM/YYYY HH:mm',
        stepping: 15
    }).on('dp.change', function (e) {
        var data = $("#newEventStart").val();
        var StartDate = new Date(data);
        var days = moment(StartDate).startOf('day').diff(moment(Date.now()).startOf('day'), 'days');
        if (days == 0) { //Same Day
            $("#eventCosts").html("10 World Points");
            $("#eventCostsField").val(10);
        } else if (days <= 7) { //Within a week
            $("#eventCosts").html("20 World Points");
            $("#eventCostsField").val(20);
        } else if (days > 7) { //Everything after
            $("#eventCosts").html("30 World Points");
            $("#eventCostsField").val(30);
        }
        var required = $("#eventCostsField").val();
        if (required > WorldPoints) {
            $("#addEvent").prop("disabled", true);
        } else $("#addEvent").prop("disabled", false);
        $("#newEventStart").removeClass("uk-form-danger");

        var duration = parseInt($("input[name='event_duration']:checked").attr('id'));
        CheckEventOverlap(StartDate, duration);
    });

    jQuery("input[name='event_duration']").on('change', function () {
        var data = $("#newEventStart").val();
        if (data.length > 0) {
            var StartDate = new Date(data);
            var duration = parseInt($("input[name='event_duration']:checked").attr('id'));
            CheckEventOverlap(StartDate, duration);
        }
    });

    $('.summernote').each(function (i, obj) {
        i++;
        $(obj).summernote({
            tabsize: 2,
            height: 290,
            fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Josefin Sans'],
            toolbar: [
                // [groupName, [list of button]]
                ['style', ['style']],
                ['fontname', ['fontname']],
                ['fontsize', ['fontsize']],
                ['font', ['bold', 'underline', 'clear']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['insert', ['picture']],
                //['view', ['fullscreen', 'codeview', 'help']],
            ],
            callbacks: {
                onFocus: function () {
                    PreventChat_Ads();
                },
                onBlur: function () {
                    ActivateChat_Ads();
                },
                onKeydown: function (e) {
                    var t = i == 1 ? $('#newEventContent').summernote('code') : $('#editEventContent').summernote('code');
                    if (t.trim().length >= 3000) {
                        //delete keys, arrow keys, copy, cut, select all
                        if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
                            e.preventDefault();
                    }
                },
                onKeyup: function (e) {
                    var t = i == 1 ? $('#newEventContent').summernote('code') : $('#editEventContent').summernote('code');
                    i == 1 ? $('#maxContentPost').text(3000 - t.trim().length) : $('#maxContentPost_edit').text(3000 - t.trim().length);
                },
                onPaste: function (e) {
                    var t = i == 1 ? $('#newEventContent').summernote('code') : $('#editEventContent').summernote('code');
                    var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                    e.preventDefault();
                    var maxPaste = bufferText.length;
                    if (t.length + bufferText.length > 3000) {
                        maxPaste = 3000 - t.length;
                    }
                    if (maxPaste > 0) {
                        document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
                    }
                    i == 1 ? $('#maxContentPost').text(3000 - t.trim().length) : $('#maxContentPost_edit').text(3000 - t.trim().length);
                }
            },
            disableResizeEditor: true
        });
    });
    //$('#newEventContent').summernote('fontName', 'Josefin Sans');

    jQuery('#addEvent').on('click', function () {
        if ($("#Advertisements").css('opacity') < 1) return;

        var title = $('#newEventTitle').val();
        var date = $('#newEventStart').val();
        var location = $('#newEventLocation').val();
        var error = false;
        $('#newEventTitle').removeClass("uk-form-danger");
        $('#newEventStart').removeClass("uk-form-danger");
        $('#newEventLocation').removeClass("uk-form-danger");
        if (title.length <= 0) {
            $('#newEventTitle').addClass("uk-form-danger");
            error = true;
        }
        if (date.length <= 0) {
            $('#newEventStart').addClass("uk-form-danger");
            error = true;
        }
        if (location.length <= 0) {
            $('#newEventLocation').addClass("uk-form-danger");
            error = true;
        }
        if (error) return;

        if (!EventConfirm) {
            $("#eventCosts").effect("pulsate", {times: 3}, 2000);
            $("#eventConfirm").fadeTo("fast", 1);
            $("#addEvent").prop("disabled", true);
            setTimeout(function () {
                if ($('#modal-new').is(":hidden")) return;
                $("#addEvent").prop("disabled", false);
                EventConfirm = true
            }, 2100);
        } else {
            var text = $('#newEventContent').summernote('code');
            var duration = parseInt($("input[name='event_duration']:checked").attr('id'));
            var cost = parseInt($('#eventCostsField').val());
            mp.trigger('advertisements::NewEvent', title, date, cost, duration, location, text);
            UIkit.modal("#modal-new").hide();
            $('#eventForm').trigger("reset");
            $('#newEventContent').summernote('reset');
            $('#maxContentPost').text(3000);
            WorldPoints = WorldPoints - cost;
            $('#WorldPointsEvent').html(WorldPoints);
            mp.trigger('genericNotificationEx', JSON.stringify({
                message: 'Your event has been added',
                pos: 'bottom-right',
                status: 'success',
                timeout: Settings.speed
            }));
        }

    });

    jQuery('#eventDelete').on('click', function () {
        if ($("#Advertisements").css('opacity') < 1) return;

        if (!EventDelConfirm) {
            $("#eventDelete").effect("pulsate", {times: 3}, 2000);
            $("#deleteConfirm").fadeTo("fast", 1);
            $("#eventDelete").prop("disabled", true);
            setTimeout(function () {
                if ($('#modal-event').is(":hidden")) return;
                $("#eventDelete").prop("disabled", false);
                EventDelConfirm = true
            }, 2100);
        } else {
            mp.trigger('advertisements::DeleteEvent', LastEventSeen);
            UIkit.modal("#modal-event").hide();
            mp.trigger('genericNotificationEx', JSON.stringify({
                message: 'Your event has been deleted',
                pos: 'bottom-right',
                status: 'success',
                timeout: Settings.speed
            }));
            LastEventSeen = 0;
        }
    });

    jQuery('#eventEdit').on('click', function () {
        if ($("#Advertisements").css('opacity') < 1) return;

        UIkit.modal("#modal-event").hide();
        var event = Events.find(obj => {
            return obj.id == LastEventSeen
        });
        $('#editEventContent').summernote('code', event.content);
        $('#editEventTitle').val(event.title);
        $('#editEventLocation').val(event.location);
        var t = $('#editEventContent').summernote('code');
        $('#maxContentPost_edit').text(3000 - t.trim().length)
        UIkit.modal("#modal-edit").show();
    });

    jQuery('#editEvent').on('click', function () {
        if ($("#Advertisements").css('opacity') < 1) return;

        var title = $('#editEventTitle').val();
        var location = $('#editEventLocation').val();
        var error = false;
        $('#editEventTitle').removeClass("uk-form-danger");
        $('#editEventLocation').removeClass("uk-form-danger");
        if (title.length <= 0) {
            $('#editEventTitle').addClass("uk-form-danger");
            error = true;
        }
        if (location.length <= 0) {
            $('#editEventLocation').addClass("uk-form-danger");
            error = true;
        }
        if (error) return;

        var text = $('#editEventContent').summernote('code');
        mp.trigger('advertisements::EditEvent', parseInt(LastEventSeen), title, location, text);
        UIkit.modal("#modal-edit").hide();
        $('#editEventForm').trigger("reset");
        $('#editEventContent').summernote('reset');
        $('#maxContentPost_edit').text(3000);
        mp.trigger('genericNotificationEx', JSON.stringify({
            message: 'Your event has been edited',
            pos: 'bottom-right',
            status: 'success',
            timeout: Settings.speed
        }));
        LastEventSeen = 0;
    });

    jQuery('.event-input').on('change', function () {
        $(this).removeClass("uk-form-danger");
    });

    $('#modal-new').on('hide', function () {
        $("#eventConfirm").fadeTo("fast", 0);
        EventConfirm = false;
    })

    $('#modal-event').on('hide', function () {
        $("#deleteConfirm").fadeTo("fast", 0);
        EventDelConfirm = false;
    })
    calendar.setOption('displayEventTime', Settings.event_time);
    calendar.setOption('displayEventEnd', Settings.event_end);

    mp.trigger('loadEvents');
    /* END CALENDAR / EVENT STUFF */

    if (DEBUG) {
        GenerateAdLists();

        $("#Advertisements").show();
        $("#Advertisements").fadeTo("fast", 1);
        ToggleNotifications = false;
        Admin = true;
        WorldPoints = 1000;
        AdvertisementSettings({});
        calendar.changeView('timeGridWeek');
    }
});

function AddNewAdEx(data) {
    return mp.trigger('genericNotificationEx', JSON.stringify({
        message: data,
        pos: 'bottom-right',
        status: 'secondary',
        timeout: Settings.speed
    }));
}

function ClearAllAdsDebug() {
    Advertisements = [];
    GenerateAdLists();
}

function AddNewAd(data) {
    var str = JSON.stringify(data);
    var AdData = JSON.parse(str);
    AdData.seen = false;
    /*advertisementCounter++;
    AdData.id = advertisementCounter;*/
    AdData.advertisement = htmlEscape(AdData.advertisement);
    Advertisements.push(AdData);
    GenerateAdLists();
    var NotificationStr = "";
    if (Settings.style == 1) // Every 3 minutes
    {
        ThreeMinutesPopupNew++;
    } else if (Settings.style == 2) // Every ad
    {
        NotificationStr = "New Advertisement";
        if (AdData.type == 1)
            NotificationStr = "New Company Advertisement";
        else if (AdData.type == 2)
            NotificationStr = "New Event Advertisement";
    } else if (Settings.style == 3) // Every ad with text
    {
        NotificationStr = AdData.advertisement.substring(0, Settings.amount);
        if (AdData.advertisement.length > Settings.amount) NotificationStr += "...";
    }
    if (!ThirtyMinutesTimeoutSet && Settings.style != 1 && !ToggleNotifications && !Settings.chat)
        return mp.trigger('genericNotificationEx', JSON.stringify({
            message: NotificationStr,
            pos: 'bottom-right',
            status: 'secondary',
            timeout: Settings.speed
        }));
}

function AddNewEvent(data) {
    var str = JSON.stringify(data);
    var EventData = JSON.parse(str);
    Events.push(EventData);
    calendar.addEvent(EventData);
}

function RemoveEvent(id) {
    var event = calendar.getEventById(id);
    event.remove();
    var index = Events.findIndex(x => x.id === id);
    Events.splice(index, 1);
}

function EditEvent(id, data) {
    var event = calendar.getEventById(id);
    event.remove();
    var index = Events.findIndex(x => x.id === id);
    Events.splice(index, 1);

    var str = JSON.stringify(data);
    var EventData = JSON.parse(str);
    Events.push(EventData);
    calendar.addEvent(EventData);
}

function RemoveAdvertisement(id) {
    var ad = Advertisements.find(obj => {
        return obj.id == id
    });
    if (ad !== undefined && ad !== null) {
        var index = Advertisements.findIndex(x => x.id === id);
        Advertisements.splice(index, 1);
        $("#ad_" + id).remove();
    }
}


var TempEvent = '';

function LoadArrayEventPieces(data, piece, maxpiece) {
    var str = JSON.stringify(data);
    if (TempEvent != "") {
        TempEvent = "";
    }
    TempEvent += str;
    if (piece == maxpiece) {
        Events = JSON.parse(TempEvent);
        $.each(Events, function (key, val) {
            if (val == "" || val == null || val === null || val == undefined || val === undefined) {
                return true;
            }
            calendar.addEvent(val);
        });
    }
}

function HideAdvertisements() {
    $("#Advertisements").fadeTo("fast", 0);
    setTimeout(() => {
        $("#Advertisements").hide();
    }, 200);
}

function HideFullAdvertisements() {
    $("#AdvertisementsBody").css("opacity", 0);
}

function ShowFullAdvertisements() {
    $("#AdvertisementsBody").css("opacity", 1);
}

var FirstLoad = false;

function ShowAdvertisements(admin, charid, worldpoints) {
    if (admin == true && Admin != admin) {
        Admin = admin;
        GenerateAdLists();
    }
    WorldPoints = worldpoints;
    CharacterID = charid;
    if (WorldPoints >= 30) {
        $("#addEvent").prop("disabled", false);
        $("#eventAlert").hide();
        $("#eventForm").show();
        $("#eventFooter").show();
        $("#eventFooterEx").hide();
    } else {
        $("#addEvent").prop("disabled", true);
        $("#eventAlert").show();
        $("#eventForm").hide();
        $("#eventFooter").hide();
        $("#eventFooterEx").show();
    }
    $('#WorldPointsEvent').html(WorldPoints);

    $("#Advertisements").show();
    $("#Advertisements").fadeTo("fast", 1);
    if (!FirstLoad) {
        calendar.changeView('timeGridWeek');
        UIkit.switcher('#switcher').show(0);
        $('#newEventContent').summernote('reset');
        FirstLoad = true;
    }
}

function SetBusinessData(name, blip) {

    $("input[name='showLocation']").prop("checked", false);
    $("#locationData").hide();
    $("#locationEnabled").fadeTo("fast", 0);


    if (name != "")
        $("#newAd_Name").val(name);

    if (blip) {
        $("#newAd_Blip").html("SET");
        $("#newAd_Blip").removeClass("uk-button-danger");
        $("#newAd_Blip").addClass("uk-button-success");
        BusinessBlip = true;
    } else {
        $("#newAd_Blip").html("NOT SET");
        $("#newAd_Blip").addClass("uk-button-danger");
        $("#newAd_Blip").removeClass("uk-button-success");
    }
    $("#businessData").show();
    $("#BlipName").fadeTo("fast", 1);
    $("#BlipID").fadeTo("fast", 1);
}

function PlaceAdServerside(placed, text, type) {
    if (placed) {
        mp.trigger('genericNotificationEx', JSON.stringify({
            message: text,
            pos: 'bottom-right',
            status: 'success',
            timeout: Settings.speed
        }));
        $('#placeForm').trigger("reset");
        $("#businessData").hide();
        UIkit.switcher('#switcher').show(type);
    } else {
        mp.trigger('genericNotificationEx', JSON.stringify({
            message: text,
            pos: 'bottom-right',
            status: 'danger',
            timeout: Settings.speed
        }));
    }
}

function GenerateAdLists() {
    Advertisements.sort(timeSorter("datetime"));
    if (Advertisements.length > MAX_ADVERTISEMENTS_CLIENT) {
        Advertisements.pop();
    }
    var outputAds = '';
    var outputCAds = '';
    var outputBAds = '';
    var seenEnabled = Settings.seen ? "new-ad" : "";
    $.each(Advertisements, function (key, val) {
        if (val == "" || val == null) {
            return true;
        }
        var output = '';
        var newAd = val.seen ? "" : seenEnabled;
        output += '<tr id="ad_' + val.id + '" class="' + newAd + '" onmouseover="HoverAd(this);">';
        output += '<td class="timeColumn">' + htmlEscape(val.time) + '</td>';

        if (val.type == 0) {
            output += '<td class="adColumnEx">' + htmlEscape(val.advertisement) + '</td>';
            output += '<td class="phoneColumn"><button class="uk-button uk-button-secondary uk-button-small small-padding callNumber" uk-tooltip="title: Call number; pos: bottom" ad-id="' + val.id + '">' + htmlEscape(val.phone) + '</button></td>';
            if (Admin) {
                output += '<td class="buttonColumn"><button class="uk-button uk-button-primary uk-button-small small-padding viewAdvertisement" uk-tooltip="title: View Advertisement; pos: bottom" ad-id="' + val.id + '" ad-person="' + val.name + '" ad-phone="' + val.phone + '" ad-type="' + val.type + '"><i class="fas fa-eye"></i></button></td>';
            } else {
                output += '<td class="buttonColumn"><button class="uk-button uk-button-primary uk-button-small small-padding viewAdvertisement" uk-tooltip="title: View Advertisement; pos: bottom" ad-id="' + val.id + '" ad-person="hidden" ad-phone="' + val.phone + '" ad-type="' + val.type + '"><i class="fas fa-eye"></i></button></td>';
            }
        } else { // Company & Business
            output += '<td class="adColumnEvent">' + htmlEscape(val.advertisement) + '</td>';

            if (val.location_x != 0 && val.location_y != 0) output += '<td class="buttonColumn"><button class="uk-button uk-button-secondary uk-button-small small-padding setWaypoint" uk-tooltip="title: Set Waypoint; pos: bottom" ad-id="' + val.id + '"><i class="fas fa-map-marker-alt"></i></button></td>';

            if (Admin) output += '<td class="buttonColumn"><button class="uk-button uk-button-primary uk-button-small small-padding viewAdvertisement" uk-tooltip="title: View Advertisement; pos: bottom" ad-id="' + val.id + '" ad-person="' + val.name + '" ad-type="' + val.type + '"><i class="fas fa-eye"></i></button></td>';
            else output += '<td class="buttonColumn"><button class="uk-button uk-button-primary uk-button-small small-padding viewAdvertisement" uk-tooltip="title: View Advertisement; pos: bottom" ad-id="' + val.id + '" ad-person="hidden" ad-type="' + val.type + '"><i class="fas fa-eye"></i></button></td>';
        }

        output += '</tr>';
        if (val.type == 0) {
            outputAds += output;
        } else if (val.type == 1) {
            outputCAds += output;
        } else if (val.type == 2) {
            outputBAds += output;
        }
    });
    $('#adsList').html(outputAds);
    $('#BadsList').html(outputBAds);
    $('#CadsList').html(outputCAds);
    GenerateAdCounter();
}

function GenerateAdCounter() {
    var outputAds = 0;
    var outputCAds = 0;
    var outputBAds = 0;
    $.each(Advertisements, function (key, val) {
        if (val == "" || val == null) {
            return true;
        }
        if (val.seen) return true;
        if (Settings.seen) {
            if (val.type == 0) {
                outputAds++;
            } else if (val.type == 1) {
                outputCAds++;
            } else if (val.type == 2) {
                outputBAds++;
            }
        } else {
            val.seen = true;
        }
    });
    $('#adsCount').html(outputAds);
    $('#BadsCount').html(outputBAds);
    $('#CadsCount').html(outputCAds);
    if (outputAds > 0) $('#adsCount').show(); else $('#adsCount').hide();
    if (outputBAds > 0) $('#BadsCount').show(); else $('#BadsCount').hide();
    if (outputCAds > 0) $('#CadsCount').show(); else $('#CadsCount').hide();
}

function timeSorter(firstKey) {
    return function (a, b) {
        if (a[firstKey] < b[firstKey]) {
            return 1;
        } else if (a[firstKey] > b[firstKey]) {
            return -1;
        } else {
            return 0;
        }
    }
}

function OnSecondUpdate() {
    var date = moment().utc();
    //console.log(date.format("YYYY-MM-DD HH:mm:ss"));
    if (date.seconds() == 0) { //minute updater
        CheckEventStarting(date);
    }
    if (date.minutes() % 15 === 0) {
        if (!EventReminderPopup) {
            //CheckEventBusy(date);
            CheckEventSoon(date);
            EventReminderPopup = true;
        }
    } else EventReminderPopup = false;

    if (date.minutes() % 3 === 0) {
        if (!ThreeMinutePopup) {
            ThreeMinutePopup = true;
            if (Settings.style == 1) {
                var amount = ThreeMinutesPopupNew;
                ThreeMinutesPopupNew = 0;
                if (!ThirtyMinutesTimeoutSet && amount > 0 && !ToggleNotifications && !Settings.chat)
                    return mp.trigger('genericNotificationEx', JSON.stringify({
                        message: amount + " New Advertisements",
                        pos: 'bottom-right',
                        status: 'secondary',
                        timeout: Settings.speed
                    }));
            }
        }
    } else ThreeMinutePopup = false;

    if (ThirtyMinutesTimeoutSet) {
        ThirtyMinutesTimeout++;
        if (ThirtyMinutesTimeout >= 1800) {
            ThirtyMinutesTimeoutSet = false;
            ThirtyMinutesTimeout = 0;
        }
    }
}

function AdNotifyToggle() {
    ToggleNotifications = !ToggleNotifications;
    $('#setting_off').prop('checked', ToggleNotifications);
    if (ToggleNotifications)
        return mp.trigger('genericNotificationEx', JSON.stringify({
            message: 'Notifications have been toggled off',
            pos: 'bottom-right',
            status: 'danger',
            timeout: Settings.speed
        }));

    if (!ToggleNotifications)
        return mp.trigger('genericNotificationEx', JSON.stringify({
            message: 'Notifications have been toggled back on',
            pos: 'bottom-right',
            status: 'success',
            timeout: Settings.speed
        }));
}

function ToggleChatAdvertisements(toggle) {
    Settings.chat = toggle;
    $('#setting_chat').prop('checked', Settings.chat);
}

function AdvertisementSettings(settings) {
    var str = JSON.stringify(settings);
    Settings = JSON.parse(str);

    if (Settings.seen === undefined) Settings.seen = true;
    if (Settings.chat === undefined) Settings.chat = false;
    if (Settings.style === undefined) Settings.style = 3;
    if (Settings.amount === undefined) Settings.amount = 255;
    if (Settings.speed === undefined) Settings.speed = 5000;
    if (Settings.event_time === undefined) Settings.event_time = true;
    if (Settings.event_end === undefined) Settings.event_end = false;
    if (Settings.event_reminder === undefined) Settings.event_reminder = true;

    if (Settings.seen) $('#setting_seen').prop('checked', true);
    if (Settings.chat) $('#setting_chat').prop('checked', true);
    var setting_style = $('input[name="setting_style"]');
    setting_style.filter('[id=' + Settings.style + ']').prop('checked', true);
    $("#setting_style_3_amount").val(Settings.amount);
    if (Settings.style == 3) {
        $("#setting_style_3_amount_box").show();
        $("#setting_style_3_amount_box").fadeTo("fast", 1);
    }
    var setting_speed = $('input[name="setting_speed"]');
    setting_speed.filter('[id=' + Settings.speed + ']').prop('checked', true);

    if (Settings.event_time) $('#setting_eventTime').prop('checked', true);
    if (Settings.event_end) $('#setting_eventTimeEnd').prop('checked', true);
    if (Settings.event_reminder) $('#setting_eventReminders').prop('checked', true);
}


function HoverAd(me) {
    if ($("#Advertisements").css('opacity') < 1) return;

    var id = $(me).attr('id').replace("ad_", "");
    var ad = Advertisements.find(obj => {
        return obj.id == id
    });
    if (ad !== undefined) {
        if (ad.seen != true) {
            ad.seen = true;
            $(me).removeClass("new-ad");
            GenerateAdCounter();
        }
    }
}

function CheckEventOverlap(startDate, duration) {
    const eventStartDay = moment(new Date(startDate)).format("YYYY-MM-DD HH:mm");
    if (duration != 30) duration = duration * 60;
    const eventEndDay = moment(new Date(startDate)).add(duration, 'minutes').format("YYYY-MM-DD HH:mm");
    var TotalOverlapping = 0;
    var OverlappingText = '';
    for (let i = 0; i < Events.length; i++) {
        const eventA = Events[i];

        //new event overlaps others entirely
        if (moment(eventA.start).isBetween(eventStartDay, eventEndDay) || moment(eventA.end).isBetween(eventStartDay, eventEndDay)) {
            //console.log("any of the events in between the new Event start-time and end-time - "+ eventA.title);
            OverlappingText = 'Your <b>event</b> is overlapping some of the other planned events, double check before you proceed.';
            TotalOverlapping++;
            if (moment(eventStartDay).isAfter(eventA.start) && moment(eventStartDay).isBefore(eventA.end)) {
                //console.log("start-time in between any of the events - "+ eventA.title);
                OverlappingText = 'Your <b>start-time</b> is between some of the other planned events, double check before you proceed.';
            }
            if (moment(eventEndDay).isAfter(eventA.start) && moment(eventEndDay).isBefore(eventA.end)) {
                //console.log("end-time in between any of the events - "+ eventA.title);
                OverlappingText = 'Your <b>end-time</b> is between some of the other planned events, double check before you proceed.';
            }
        } else if (moment(eventStartDay).isBetween(eventA.start, eventA.end)) {
            //console.log("start-time / end-time between existing Event - "+ eventA.title);
            TotalOverlapping++;
            if (moment(eventStartDay).isAfter(eventA.start)) {
                OverlappingText = 'Your <b>start-time</b> is between some of the other planned events, double check before you proceed.';
            }
        } else if (moment(eventStartDay).isSame(eventA.start) || moment(eventEndDay).isSame(eventA.end)) {
            //console.log("any of the events in between/on the start-time and end-time");
            OverlappingText = 'Your <b>event</b> is between/on some of the other planned events, double check before you proceed.';
            TotalOverlapping++;
        }

    }
    if (TotalOverlapping > 0) {
        if (TotalOverlapping >= 3) {
            OverlappingText = 'Your <b>event</b> is overlapping more than 3 other planned events, <b>choose another date/time</b>.';
            $("#addEvent").prop("disabled", true);
        }
        $('#eventOverlapping').show();
        $('#overlappingText').html(OverlappingText);
        $('#eventOverlapping').fadeTo('fast', 1);
    } else {
        if (!$('#eventOverlapping').is(":hidden")) {
            $("#eventOverlapping").fadeTo("fast", 0);
            setTimeout(() => {
                $("#eventOverlapping").hide();
            }, 200);
        }
        $("#addEvent").prop("disabled", false);
    }
    return TotalOverlapping;
}

function CheckEventStarting(date) {
    const rightNow = moment(new Date(date.format("YYYY-MM-DD HH:mm:ss"))).format("YYYY-MM-DD HH:mm");
    for (let i = 0; i < Events.length; i++) {
        const event = Events[i];
        if (moment(rightNow).isSame(event.start) && Settings.event_reminder) {
            return mp.trigger('genericNotificationEx', JSON.stringify({
                message: "Event <b>" + event.title + "</b> is now starting",
                pos: 'bottom-right',
                status: 'event',
                timeout: Settings.speed
            }));
        }
    }
}

function CheckEventBusy(date) {
    const rightNow = moment(new Date(date.format("YYYY-MM-DD HH:mm:ss"))).format("YYYY-MM-DD HH:mm");
    for (let i = 0; i < Events.length; i++) {
        const event = Events[i];
        if (moment(rightNow).isBetween(event.start, event.end) && Settings.event_reminder) {
            return mp.trigger('genericNotificationEx', JSON.stringify({
                message: "Event <b>" + event.title + "</b> is still ongoing",
                pos: 'bottom-right',
                status: 'event',
                timeout: Settings.speed
            }));
        }
    }
}

function CheckEventSoon(date) {
    const rightNow = moment(new Date(date.format("YYYY-MM-DD HH:mm:ss"))).format("YYYY-MM-DD HH:mm");
    for (let i = 0; i < Events.length; i++) {
        const event = Events[i];
        if (moment(rightNow).add(30, 'minutes').isSame(event.start)) {
            return mp.trigger('genericNotificationEx', JSON.stringify({
                message: "Event <b>" + event.title + "</b> is starting in 30 minutes",
                pos: 'bottom-right',
                status: 'event',
                timeout: Settings.speed
            }));
        } else if (moment(rightNow).add(15, 'minutes').isSame(event.start)) {
            return mp.trigger('genericNotificationEx', JSON.stringify({
                message: "Event <b>" + event.title + "</b> is starting in 15 minutes",
                pos: 'bottom-right',
                status: 'event',
                timeout: Settings.speed
            }));
        }
    }
}

function htmlEscape(str) {
    return String(str).replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function ActivateChat_Ads() {
    mp.trigger('revokeChatBlock_Ads');
}

function PreventChat_Ads() {
    mp.trigger('triggerChatBlock_Ads');
}

/*
function GetDate(){
	var date = moment().utc();

	var hr = date.hours();
	var min = date.minutes();
	if (min < 10) {
		min = "0" + min;
	}
	if (hr < 10) {
		hr = "0" + hr;
	}

	var time = hr + ':' + min;

	var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEC'];
	var date = [date.date(),
				months[date.month()],
				date.year()].join('/');
	date = [date,
                time].join(' ');

	return date;
}

var TempAds = "";
function LoadAdsPieces(data, piece, maxpiece){
	var str = JSON.stringify(data);
	if(TempAds != ""){
		TempAds = "";
	}
	TempAds += str;
	if(piece == maxpiece)
	{
		Advertisements = JSON.parse(TempAds);
		GenerateAdLists();
	}
}*/

function SetDarkMode(value) {
    if (value) {
        let path = ""
        for (element of document.getElementsByTagName("head")[0].children)
            if (element.href && element.href.indexOf("gtaworld.css") != -1) path = element.href.replace("gtaworld.css", "gtaworld_dark.css")

        var link = document.createElement("link");
        link.href = path;
        link.type = "text/css";
        link.rel = "stylesheet";
        link.media = "screen,print";
        document.getElementsByTagName("head")[0].appendChild(link);
    } else {
        $("link").each(function () {
            if ($(this).attr('href').indexOf("gtaworld_dark.css") >= 0)
                $(this).remove();
        });
    }
}