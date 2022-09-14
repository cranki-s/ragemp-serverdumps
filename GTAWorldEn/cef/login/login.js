function OnClickSubmit() {
	var user = document.getElementById("email").value;
    var pass = document.getElementById("password").value;

    if( jQuery( '#rememberme' ).is( ':checked' ) )
    {
        let username = jQuery( '#email' ).val();
        if( !username )
        {
            username = false;
        }
        mp.trigger( 'account_set_remember_username', username );
    }
    else
    {
        mp.trigger( 'account_set_remember_username', false );
    }

    mp.trigger("onSubmit", user, pass);
    if (browser != null) {
		browser.destroy(); 

        browser = null;
    }
	//mp.gui.chat.push("called events");
}

function OnClickSubmitPin() {

    var pin = document.getElementById("pincode").value;


    mp.trigger("onSubmitPin", pin);
    if (browser != null) {
		browser.destroy(); 

        browser = null;
    }
	//mp.gui.chat.push("called events");
}

jQuery( document ).ready( function()
{
    var input = document.getElementById("password");

    input.addEventListener("keyup", function(event) {
        event.preventDefault();

        if (event.keyCode === 13) {
            document.getElementById("confirmButton").click();
        }
    });

});


function Register() {
    mp.trigger("onClickRegister");
}

function setUsername( username = '' )
{
    jQuery( '#email' ).val( username );
    jQuery( '#password' ).focus();
}

function uncheckRememberMe()
{
    jQuery( '#rememberme' ).removeAttr( 'checked' );
}
