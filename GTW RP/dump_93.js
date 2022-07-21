{
var GIM_browser;

var dontHideMouse = false;

mp.events.add( 'cef_generic_input_menu_submit', ( title, value ) =>
{
    destroyBrowser();

    if( !dontHideMouse )
    {
        mp.gui.cursor.visible = false;
    }

    mp.events.callRemote( 'get_menu_input_value', title, value );
});
mp.events.add( 'cef_generic_input_menu_close', () =>
{
    destroyBrowser();
    mp.gui.cursor.visible = false;
});

mp.events.add( 'open_menu_ui_geninput', ( title, placeholder, description = '', buttonText = 'Submit', closeButton = false ) =>
{
    if( typeof buttons !== 'object' ) buttons = JSON.parse( buttons );
    destroyBrowser();

    // if cursor is already visible before showing menu,
    // then we do not want to hide it when they are finished
    dontHideMouse = mp.gui.cursor.visible;
    mp.gui.cursor.visible = true;

    GIM_browser = mp.browsers.new( 'package://gtalife/CEF/GenericInputMenu/index.html' );
    GIM_browser.execute( 'setTitle( "'+title+'", "'+placeholder+'", "'+description+'", "'+buttonText+'", '+closeButton+' );' );
   cef_opened = true;
});

function destroyBrowser()
{
cef_opened = false;
    if( GIM_browser )
    {
        GIM_browser.destroy();
        GIM_browser = null;
        
    }
}
}