{
﻿var GBM_browser;

var dontHideMouse = false;

mp.events.add( 'cef_generic_button_menu_click', ( title, id ) =>
{
    destroyBrowser();

    if( !dontHideMouse )
    {
        mp.gui.cursor.visible = false;
    }

    mp.events.callRemote( 'get_menu_button_input', id, title );
});
mp.events.add( 'cef_generic_button_menu_close', () =>
{
    destroyBrowser();
    mp.gui.cursor.visible = false;
});

mp.events.add( 'open_menu_ui', ( title, buttons, closeButton = false ) =>
{
    if( typeof buttons !== 'object' ) buttons = JSON.parse( buttons );
    destroyBrowser();

    // if cursor is already visible before showing menu,
    // then we do not want to hide it when they are finished
    dontHideMouse = mp.gui.cursor.visible;
    mp.gui.cursor.visible = true;

    GBM_browser = mp.browsers.new( 'package://gtalife/CEF/GenericButtonMenu/index.html' );
    GBM_browser.execute( 'setTitle( "'+title+'", '+closeButton+' );' );
cef_opened = true;
    for( let i = 0; i < buttons.length; i++ )
    {
        GBM_browser.execute( 'addButton( '+i+', "'+buttons[i].text+'", "'+((typeof buttons[i].class === 'string') ? buttons[i].class : 'default')+'" );' );
    }

});

function destroyBrowser()
{
    cef_opened = false;
    if( GBM_browser )
    {
        GBM_browser.destroy();
        GBM_browser = null;
    }
}
}