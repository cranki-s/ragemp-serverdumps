let chat =
{
	size: 0,
	history_limit: 25,
	container: null,
	input: null,
	enabled: false,
	active: true,
	historyMsgs: [],
	currentIndex: 0
};

const MAX_MSG_HISTORY = 12;

function enableChatInput(enable)
{
	if(chat.active == false
		&& enable == true)
		return;
	
    if (enable != (chat.input != null))
	{
        mp.invoke("focus", enable);

        if (enable)
		{
            chat.input = $("#chat").append('<div><input id="chat_msg" type="text" /></div>').children(":last");
			chat.input.children("input").focus();
        } 
		else
		{
            chat.input.fadeOut('fast', function()
			{
                chat.input.remove();
                chat.input = null;
            });
        }
    }
}

var chatAPI =
{
	push: (text) =>
	{
		let colorPositions = [];
		let colors = [];
		let chatElement = "<li>";

		for (let i = 0; i<text.length; i++) {
			let colorCheck = `${text[i]}${text[i+ 1]}${text[i + 2]}`;
			
			if (colorCheck === "!{#") {
				colorPositions.push(i);
			}
		}

		colorPositions.forEach(el => {
			let sub = text.slice(el, -1);
			colors.push(sub.slice(3, 9));
		});

		colorPositions.forEach((el, i) => {
			let sub = text.slice(colorPositions[i] + 10, colorPositions[i + 1]);
			chatElement += `<span style='color: ${colors[i]}'>${sub}</span>`;
		});

		chatElement += "</li>";

		if (chatElement === "<li></li>") {
			chat.container.prepend("<li>" + text + "</li>");
		} else {
			chat.container.prepend(chatElement);
		}

		chat.size++;

		if (chat.size >= chat.history_limit)
		{
			chat.container.children(":last").remove();
		}
	},
	
	clear: () =>
	{
		chat.container.html("");
	},
	
	activate: (toggle) =>
	{
		if (toggle == false
			&& (chat.input != null))
			enableChatInput(false);
			
		chat.active = toggle;
	},
	
	show: (toggle) =>
	{
		if(toggle)
			$("#chat").show();
		else
			$("#chat").hide();
		
		chat.active = toggle;
	}
};

mp.events.add("chat:push", chatAPI.push)
mp.events.add("chat:clear", chatAPI.clear)
mp.events.add("chat:activate", chatAPI.activate)
mp.events.add("chat:show", chatAPI.show)


$(document).ready(function()
{
	chat.container = $("#chat ul#chat_messages");
	
    $(".ui_element").show();
    chatAPI.push("Multiplayer started");

    $("body").keyup(function(event)
	{
        if (event.which == 84 && chat.input == null
			&& chat.active == true)
		{
			chat.currentIndex = 0;
            enableChatInput(true);
			event.preventDefault();
        } else if (event.which == 38) {
			if (chat.historyMsgs.length === 0)
				return;

			const previousMessages = chat.historyMsgs;

			if (previousMessages.length === chat.currentIndex)
				return;


			chat.input.children("input").val(previousMessages[chat.currentIndex]);
			
			setTimeout(() => {
				chat.input.children("input").setSelectionRange(previousMessages[chat.currentIndex].length, previousMessages[chat.currentIndex].length);
            }, 1);

            chat.currentIndex = chat.currentIndex + 1;

			
		} else if (event.which == 40) {
			if (chat.historyMsgs.length === 0)
				return;

			const previousMessages = chat.historyMsgs;

			if (chat.currentIndex === -1) {
				chat.input.children("input").val("")
				return;
			}

			chat.currentIndex = chat.currentIndex - 1;
			chat.input.children("input").val(previousMessages[chat.currentIndex]);

			setTimeout(() => {
				chat.input.children("input").setSelectionRange(previousMessages[chat.currentIndex].length, previousMessages[chat.currentIndex].length);
			}, 1);
		}
		else if (event.which == 13 && chat.input != null)
		{
			var value = chat.input.children("input").val();

            if (value.length > 0) 
			{
				if (chat.historyMsgs.length >= MAX_MSG_HISTORY) {
					chat.historyMsgs.pop();
				}

				chat.historyMsgs.unshift(value);
				chat.currentIndex = 0;

                if (value[0] == "/")
				{
                    value = value.substr(1);

                    if (value.length > 0)
                        mp.invoke("command", value);
                }
				else
				{
                    mp.invoke("chatMessage", value);
                }
            }

            enableChatInput(false);
        }
    });
});