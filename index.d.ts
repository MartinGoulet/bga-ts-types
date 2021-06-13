declare namespace ebg {

    /**
     * Card from the BGA Framework (used with Deck)
     */
    interface card {
        id: string;
        location: string;
        location_arg: string;
        type: string;
        type_arg: number;
    }

    interface stockitem {
        type: string;
        id: string;
    }

    class stock {

        //////////////////////////////////
        // Creation

        /**
         * Create a new stock component.
         * @param page the container page. Usually: "this"
         * @param container_div the container "div" element (an empty div element in your template, with an id).
         * @param item_width width in pixels for the stock component.
         * @param item_height height in pixels for the stock component.
         */
        create(page: ebg.core.gamegui, container_div: string, item_width: number, item_height: number) : void;
        /**
         * @param type: id of the type to add. You can choose any positive integer. All item types must have distinct IDs.
         * @param weight: weight of items of this type. Weight value is used to sort items of the stock during the display. Note that you can specify the same weight for all items; in this case, they are not sorted and their order might change randomly at any time.
         * @param image: URL of item image. Most of the time, you will use a CSS sprite for stock items, so you have to specify CSS sprite image here.
         * @param image_position if "image" specify the URL of a CSS sprite, you must specify the position of the item image in this CSS sprite. For example, if you have a CSS sprite with 3 cubes with a size of 20x20 pixels each (so your CSS image has for example a size of 20x60 or 60x20), you specify "0" for the first cube image, 1 for the second, 2 for the third.
         * @note For image : g_gamethemeurl+'img/yourimage.png'
         */
        addItemType: (type: number | string, weight: number, image: string, image_position: number) => void;
        /**
         * Set number of columns in css sprite (or how many items per row). 
         * @example If you sprite is 4 cards horizonatall and 6 vertically, you have to set it to 4.
         */
        image_items_per_row: number;

        //////////////////////////////////
        // Add/Remove items

        /**
         * @param type ID of the item type to use (as specified in "addItemType")
         * @param from If you specify an HTML item here, the item will appear on this item and will be slid to its position on the stock item.
         * @example
         * this.playerMoney.addToStock( MONEY_TOKEN, 'overall_player_board_'+player_id );
         * 
         * @note
         * Important: for a given stock control, you must use either addToStock or addToStockWithId, but NEVER BOTH OF THEM.
         */
        addToStock: (type: number | string, from?: string) => void;
        /**
         * This is the same method as addToStock, except that it also associates an ID with the newly created item.
         * 
         * @param type ID of the item type to use (as specified in "addItemType")
         * @param id ID of the item
         * @param from If you specify an HTML item here, the item will appear on this item and will be slid to its position on the stock item.
         * @example
         * this.playerMoney.addToStock( MONEY_TOKEN, 'overall_player_board_'+player_id );
         * 
         * @note
         * When you need to know which item(s) have been selected by the user (see getSelectedItems).
         * When you need to remove a specific item from the stock with removeFromStockById.
         * Important: for a given stock control, you must use either addToStock or addToStockWithId, but NEVER BOTH OF THEM.
         */
        addToStockWithId: (type: number | string, id: number | string, from?: string) => void;
        /**
         * Remove an item of the specific type from the stock.
         * @param type ID of the item type to use (as specified in "addItemType")
         * @param to If "to" contains the ID of an HTML element, the item removed from the Stock slides to this HTML element before it disappears
         * @param noupdate  If set to "true" it will prevent the Stock display from changing. This is useful when multiple (but not all) items are removed at the same time, to avoid ghost items appearing briefly. If you pass noupdate you have to call updateDisplay() after all items are removed.
         */
        removeFromStock: (type: number | string, to?: string, noupdate?: boolean) => void;
        /**
         * Remove an item with a specific ID from the stock.
         * @param type ID of the item 
         * @param to If "to" contains the ID of an HTML element, the item removed from the Stock slides to this HTML element before it disappears
         * @param noupdate  If set to "true" it will prevent the Stock display from changing. This is useful when multiple (but not all) items are removed at the same time, to avoid ghost items appearing briefly. If you pass noupdate you have to call updateDisplay() after all items are removed.
         */
        removeFromStockById: (id: number | string) => void;
        /**
         * Remove all items from the stock
         */
        removeAll: () => void;
        /**
         * Remove all items from the stock
         * @param to If "to" contains the ID of an HTML element, the item removed from the stock slides to this HTML element before it disappears.
         */
        removeAllTo: (to?: string) => void;

        //////////////////////////////////
        // Getters

        /**
         * Return an array with all the types of items present in the stock right now
         * @example 
         * this.myStockControl.removeAll();
         * this.myStockControl.addToStock( 65 );
         * this.myStockControl.addToStock( 34 );
         * this.myStockControl.addToStock( 89 );
         * this.myStockControl.addToStock( 65 );
         * 
         * // The following returns: { 34:1,  65:1,  89:1  }
         * var item_types = this.myStockControl.getPresentTypeList();
         */
        getPresentTypeList: () => { [type: number]: number };
        /**
         * Return the total number of items in the stock right now.
         */
        count: () => number;
        /**
         * Get all items
         */
        getAllItems: () => ebg.stockitem[];
        /**
         * Get the div id using the stock item id (to manipulate element properties directly).
         */
        getItemDivId: (id: string) => string;
        /**
         * Get the Stock item with the id in parameter
         */
        getItemById: (id: string) => ebg.stockitem;

        //////////////////////////////////
        // Selection


        /**
         * Specify a selection mode:
         * 
         * @note
         * 0 (None): no item can be selected by the player.
         * 1 (Single): a maximum of one item can be selected by the player at a time.
         * 2 (Multiple) (default): multiple items can be selected by the player at the same time.
         */
        setSelectionMode: (mode: BgaStockSelectionMode) => void;
        /**
         * Specify a selection highlighting type
         * 
         * @note
         * 'border': there will be a red border around selected items (this is the default). The attribute 'apparenceBorderWidth' can be used to manage the width of the border (in pixels).
         * 'disappear': the selected item will fade out and disappear. This is useful when the selection has the effect of destroying the item.
         * 'class': there will be an extra stockitem_selected css class added to the element when it is selected (and removed when unselected). The name of the class can be changed by using the selectionClass attribute. You can also override the default class in the css file for your game but beware of the !important keyword.
         */
        setSelectionAppearance: (type: BgaStockSelectionAppearance) => void;
        /**
         * Return a boolean indicating whether the specified item id has been selected.
         * @param id Id of the item in the stock
         */
        isSelected: (id: number | string) => void;
        /**
         * Select the specified item
         * @param id Id of the item in the stock
         */
        selectItem: (id: number | string) => void;
        /**
         * Unselect the specified item
         * @param id Id of the item in the stock
         */
        unselectItem: (id: number | string) => void;
        /**
         * Unselect all items of the stock
         */
        unselectAll: () => void;
        /**
         * Callback method when the player selects/unselects an item of the stock.
         * @param control_name Name of the Html element (stock)
         * @param item_id: ID of the element in the stock
         * 
         * @example
         * dojo.connect( this.myStockControl, 'onChangeSelection', this, 'onMyMethodToCall' );
         * 
         * onMyMethodToCall: function( control_name, item_id )
         * {
         *      // This method is called when myStockControl selected items changed
         *      var items = this.myStockControl.getSelectedItems();
         * 
         *      // (do something)
         * }
         */
        onChangeSelection: (control_name: string, item_id: string) => void;
        /**
         * Return the list of selected items
         */
        getSelectedItems: () => ebg.stockitem[];
        /**
         * Return the list of unselected items
         */
        getUnselectedItems: () => ebg.stockitem[];

        //////////////////////////////////
        // Layout

        /**
         * If you moved an item from the stock control manually (ex: after a drag'n'drop) and want to reset their positions to their original ones, you can call this method. 
         * @note it is the same as updateDisplay() without arugment
         */
        resetItemsPosition: () => void;
        /**
         * Update the display completely
         * @param from if is defined: moves new items from this location
         */
        updateDisplay: (from: string) => void;
        /**
         * Margin between items of a stock
         * @note By default, there is a margin of 5px between the items of a stock.
         */
        item_margin: number;
        /**
         * Change dynamically the weight of the item types in a stock control
         * @param newWeight Object with new weight by type
         * @example
         * // Item type 1 gets a new weight of 10, 2 a new weight of 20, 3 a new weight of 30.
         * this.myStockControl.changeItemsWeight( { 1: 10, 2: 20, 3: 30 } );
         */
        changeItemsWeight(newWeight: { [type: number]: [weight: number] });
        /**
         * Center the stock items in the middle of the stock container
         */
        centerItems: boolean;
        /**
         * Make items of the stock control "overlap" each other, to save space.
         * @param horizontal_percent Must be between 0 and 100
         * @param vertical_percent Must be between 0 and 100
         * @note
         * By default, horizontal_overlap and vertical_overlap are 0.
         * When horizontal_overlap=20, it means that a stock item will overlap to only show 20% of the width of all the previous items. horizontal_overlap can't be greater than 100.
         * vertical_overlap works differently: one items on two are shifted up.
         */
        setOverlap: (horizontal_percent: number, vertical_percent: number) => void;
        /**
         * Stock does not play well if you attempt to inline-block it with other blocks, to fix that you have to set this flag which will calculate width properly
         * @example
         * mystock.autowidth = true;
         */
        autowidth: boolean;

        //////////////////////////////////
        // Customize apperance

        /**
         * List of class names (separated by space) on stock object, so when div is created these are added, i.e.
         * @example
         * this.playerHand.extraClasses='mycard';
         */
        extraClasses: string;
        /**
         * Using onItemCreate, you can trigger a method each time a new item is added to the Stock, in order to customize it.
         * 
         * @example
         * // During "setup" phase, we associate our method "setupNewCard" with the creation of a new stock item:
         * this.myStockItem.onItemCreate = dojo.hitch( this, 'setupNewCard' );
         * 
         * // And here is our "setupNewCard":
         * setupNewCard: function( card_div, card_type_id, card_id ) 
         * {
         *      this.addTooltip( card_div.id, _("Some nice tooltip for this item"), '' );
         * }
         */
        onItemCreate: (card_div: HTMLElement, card_type_id: number, card_id: string) => void;
        /**
         * Function handler called when div is removed
         * 
         * @example
         * this.myStock.onItemDelete = (card_div, card_type_id, card_id) => { 
         *      console.log("card deleted from myStock: "+card_id); 
         * };
         */
        onItemDelete: (card_div: HTMLElement, card_type_id: number, card_id: string) => void;



        //////////////////////////////////
        // Other (non documented)

        /**
         * Change the mode like setSelectionMode but without applying the change.
         * @note
         * Useful to block the selection change without changing selection mode.
         */
        selectable: number;

    }

    /**
     * Control that allow to set/get numeric value from inner html of div/span, and provides animation on from/to value.
     */
    class counter {
        /**
         * Associate counter with existing target dom element
         * @param target Id of the Html element
         */
        create: (target: string) => void;
        /**
         * Return current value
         */
        getValue: () => number;
        /**
         * Increment value by "by" and animate from previous value
         * @param by Value to increment
         */
        incValue: (by: number) => void;
        /**
         * Set value no animation
         * @remark No animation
         */
        setValue: (value: number) => void;
        /**
         * Set value with animatino
         * @remark With animation
         */
        toValue: (value: number) => void;
        /**
         * Display - instead. 
         * @remark It just changes display value once, it does not actually disables it, i.e. if you set it again, it will be shown again
         */
        disable: () => void;
    }

    namespace core {

        class gamegui implements BgaGameGUI {
            ////////////////////////////////
            // class declaration
            player_id: string;
            isSpectator: boolean;
            isCurrentPlayerActive: () => boolean;
            getActivePlayerId: () => boolean;
            getActivePlayers: () => string[];
            bRealtime: boolean;
            g_archive_mode: boolean;
            instantaneousMode: boolean;
            slideToObject: (mobile_obj: string, target_obj: string, duration?: number, delay?: number) => DojoFxAnimation;
            slideToObjectPos: (mobile_obj: string, target_obj: string, target_x: number, target_y: number, duration?: number, delay?: number) => DojoFxAnimation;
            slideTemporaryObject: (mobile_obj_html: string, mobile_obj_parent: string, from: string, to: string, duration?: number, delay?: number) => DojoFxAnimation;
            slideToObjectAndDestroy: (node: string, to: string, duration?: number, delay?: number) => DojoFxAnimation;
            placeOnObject: (mobile_obj: string, target_obj: string) => void;
            placeOnObjectPos: (mobile_obj: string, target_obj: string, target_x: number, target_y: number) => void;
            attachToNewParent: (mobile_obj: string, target_obj: string) => void;
            prefs: { [pref_id: number]: BgaGamePreference; };
            format_block: (template: string, params: any) => string;
            removeTooltip: (nodeId: string) => void;
            addTooltipHtml: (nodeId: string, html: string, delay?: number) => void;
            addTooltipToClass: (cssClass: any, helpString: string, actionString: string, delay?: number) => void;
            addActionButton: (id: string, label: string, method: string | Function, destination?: string, blinking?: boolean, color?: BgaButtonColor) => void;
            connect: (element: HTMLElement, event: string, handler: string | Function) => any;
            connectClass: (cssClassName: string, event: string, handle: string | Function) => void;
            disconnect: (element: HTMLElement, event: string) => void;
            disconnectAll: () => void;
            restoreServerGameState: () => void;
            checkPossibleActions: (action: string, nomessage: string) => boolean;
            ajaxcall: (url: string, parameters: any, obj_callback: any, callback: Function, callback_error: Function) => void;
            setClientState: (state_name: string, args: any) => void;
            scoreCtrl: { [player_id: string]: ebg.counter; };
            notifqueue: INotificationQueue;
            inherited: (args: any) => any;
        }

    }
}

declare interface BgaGameGUI {
    /////////////////////////////////////////////////
    // General tips

    /**
     * ID of the player on whose browser the code is running
     */
    player_id: string;
    /**
     * Flag set to true if the user at the table is a spectator (not a player).
     * Note: If you want to hide an element from spectators, you should use CSS 'spectatorMode' class.
     */
    isSpectator: boolean;
    /**
     * Contains the initial set of data to init the game, created at game start or by game refresh (F5).
     * You can update it as needed to keep an up-to-date reference of the game on the client side if you need it. (Most of the time this is unnecessary).
     */
    // public gamedatas: BgaGamedatas;
    /**
     * Returns true if the player on whose browser the code is running is currently active (it's his turn to play).
     */
    isCurrentPlayerActive: () => boolean;
    /**
     * Return the ID of the active player, or null if we are not in an "activeplayer" type state.
     */
    getActivePlayerId: () => boolean;
    /**
     * Return an array with the IDs of players who are currently active (or an empty array if there are none).
     */
    getActivePlayers: () => string[];
    /**
     * Return true if the game is in realtime. 
     * Note that having a distinct behavior in realtime and turn-based should be exceptional.
     */
    bRealtime: boolean;
    /**
     * Returns true if the game is in archive mode after the game (the game has ended)
     */
    g_archive_mode: boolean;
    /**
     * Returns true during replay/archive mode if animations should be skipped. Only needed if you are doing custom animations. (The BGA-provided animation functions like this.slideToObject() automatically handle instantaneous mode.)
     * Technically, when you click "replay from move #20", the system replays the game from the very beginning with moves 0 - 19 happening in instantaneous mode and moves 20+ happening in normal mode.
     */
    instantaneousMode: boolean;

    ///////////////////////////////
    // Animations

    /**
     * Sliding element on the game area is the recommended and the most used way to animate your game interface. 
     * Using slides allow players to figure out what is happening on the game, as if they were playing with the real boardgame.
     * @param mobile_obj ID of the object to move. This object must be "relative" or "absolute" positioned.
     * @param target_obj ID of the target object. This object must be "relative" or "absolute" positioned.
     * @param duration Duration in millisecond of the slide. The default is 500 milliseconds.
     * @param delay If you defines a delay, the slide will start only after this delay
     * @note 
     * it is not mandatory that mobile_obj and target_obj have the same size. If their size are different, the system slides the center of mobile_obj to the center of target_obj.
     * @note
     * The method returns an dojo.fx animation, so you can combine it with other animation if you want to. It means that you have to call the "play()" method, otherwise the animation WON'T START.
     * @example
     * this.slideToObject( "some_token", "some_place_on_board" ).play();
     */
    slideToObject: (mobile_obj: string, target_obj: string, duration?: number, delay?: number) => DojoFxAnimation;
    /**
     * This method does exactly the same as "slideToObject", except than you can specify some (x,y) coordinates. 
     * This way, "mobile_obj" will slide to the specified x,y position relatively to "target_obj".
     * @param mobile_obj ID of the object to move. This object must be "relative" or "absolute" positioned.
     * @param target_obj ID of the target object. This object must be "relative" or "absolute" positioned.
     * @param target_x Horizontal position in pixel on target_obj
     * @param target_y Vertical position in pixel on target_obj
     * @param duration Duration in millisecond of the slide. The default is 500 milliseconds.
     * @param delay If you defines a delay, the slide will start only after this delay
     * @note 
     * it is not mandatory that mobile_obj and target_obj have the same size. If their size are different, the system slides the center of mobile_obj to the center of target_obj.
     * @note
     * The method returns an dojo.fx animation, so you can combine it with other animation if you want to. It means that you have to call the "play()" method, otherwise the animation WON'T START.
     * @example
     * this.slideToObjectPos( "some_token", "some_place_on_board", 0, 10 ).play();
     */
    slideToObjectPos: (mobile_obj: string, target_obj: string, target_x: number, target_y: number, duration?: number, delay?: number) => DojoFxAnimation;
    /**
     * This method is useful when you want to slide a temporary HTML object from one place to another. 
     * As this object does not exists before the animation and won't remain after, it could be complex to 
     * create this object (with dojo.place), to place it at its origin (with placeOnObject) to slide it (with slideToObject) 
     * and to make it disappear at the end.
     * @param mobile_obj_html Piece of HTML code that represent the object to slide
     * @param mobile_obj_parent ID of an HTML element of your interface that will be the parent of this temporary HTML object. 
     * @param from ID of the origin of the slide.
     * @param to ID of the target of the slide.
     * @param duration Duration in millisecond of the slide. The default is 500 milliseconds.
     * @param delay If you defines a delay, the slide will start only after this delay
     * 
     * @example
     * this.slideTemporaryObject( '<div class="token_icon"></div>', 'tokens', 'my_origin_div', 'my_target_div' ).play();
     */
    slideTemporaryObject: (mobile_obj_html: string, mobile_obj_parent: string, from: string, to: string, duration?: number, delay?: number) => DojoFxAnimation;

    /**
     * This method is a handy shortcut to slide an existing HTML object to some place then destroy it upon arrival. It can be used for example to move a victory token or a card from the board to the player panel to show that the player earns it, then destroy it when we don't need to keep it visible on the player panel.
     * @param node 
     * @param to 
     * @param duration Duration in millisecond of the slide. The default is 500 milliseconds.
     * @param delay If you defines a delay, the slide will start only after this delay
     * 
     * @note 
     * It works the same as this.slideToObject and takes the same arguments, but it starts the animation.
     * @example
     * this.slideToObjectAndDestroy( "some_token", "some_place_on_board", 1000, 0 );
     */
    slideToObjectAndDestroy: (node: string, to: string, duration?: number, delay?: number) => DojoFxAnimation;

    ///////////////////////////////
    // Moving Elements

    /**
     * It works exactly like "slideToObject", except that the effect is immediate.
     * @example
     * // Place the new token on current player board
     * this.placeOnObject( "my_new_token", "overall_player_board_" + this.player_id );
     * @note
     * This is not really an animation, but placeOnObject is frequently used before starting an animation.
     */
    placeOnObject: (mobile_obj: string, target_obj: string) => void
    /**
     * This method works exactly like placeOnObject, except than you can specify some (x,y) coordinates.
     */
    placeOnObjectPos: (mobile_obj: string, target_obj: string, target_x: number, target_y: number) => void;
    /**
     * With this method, you change the HTML parent of "mobile_obj" element. "target_obj" is the new parent of this element. The beauty of attachToNewParent is that the mobile_obj element DOES NOT MOVE during this process.
     * @note
     * What happens is that the method calculate a relative position of mobile_obj to make sure it does not move after the HTML parent changes.
     */
    attachToNewParent: (mobile_obj: string, target_obj: string) => void


    prefs: { [pref_id: number]: BgaGamePreference };

    format_block: (template: string, params: any) => string;

    removeTooltip: (nodeId: string) => void;
    /**
     * Add an HTML tooltip to the DOM node (for more elaborate content such as presenting a bigger version of a card).
     */
    addTooltipHtml: (nodeId: string, html: string, delay?: number) => void;
    /**
     * Add a simple text tooltip to all the DOM nodes set with this cssClass.
     * @param cssClass 
     * @param helpString Specify to display some information about "what is this game element?"
     * @param actionString Specify to display some information about "what happens when I click on this element?".
     * @param delay 
     * @note
     * All concerned nodes must have IDs to get tooltips.
     * @note
     * helpString and actionString : Usually, _() must be used for the text to be marked for translation.
     */
    addTooltipToClass: ( cssClass, helpString: string, actionString: string, delay?: number ) => void;
    addActionButton: (id: string, label: string, method: string | Function, destination?: string, blinking?: boolean, color?: BgaButtonColor) => void;

    connectClass: (cssClassName: string, event: string, handle: string | Function) => void;
    disconnect: (element: HTMLElement, event: string) => void;
    disconnectAll: () => void;

    restoreServerGameState: () => void;

    checkPossibleActions: (action: string, nomessage: string) => boolean;
    ajaxcall: (url: string, parameters: any, obj_callback: any, callback: Function, callback_error: Function) => void;

    setClientState: (state_name: string, args: any) => void;

    scoreCtrl: { [player_id: string]: ebg.counter };

    notifqueue: INotificationQueue;

    inherited: (args: any) => any;
}

declare interface INotificationQueue {
    setSynchronous: (event: string, duration: number) => void;
}

declare interface INotification<TArgs> {
    args: TArgs;
    log: string;
    move_id: number;
    table_id: string;
    time: number;
    type: string;
    uid: string;
}

declare const g_gamethemeurl: string;

declare interface Card extends ebg.card { }

type BgaButtonColor = "red" | "gray";

type BgaStockSelectionMode = 0 | 1 | 2;
type BgaStockSelectionAppearance = "border" | "disappear" | "class";

declare class BgaGame<TBgaPlayer extends BgaPlayer, TBgaGamedatas extends BgaGamedatas<TBgaPlayer>> {
    /**
     * This method is called when the page is refreshed, and sets up the game interface.
     */
    setup: (gamedatas: TBgaGamedatas) => void;

    onEnteringState: (stateName: string, args: any) => void;
    onLeavingState: (stateName: string) => void;
    onUpdateActionButtons: (stateName: string, args: any) => void;
    setupNotifications: () => void;

    gamedatas: TBgaGamedatas;
}

declare abstract class BgaGamedatas<TPlayer extends BgaPlayer> {
    current_player_id: string;
    decision: { decision_type: string };
    game_result_neutralized: string;
    gamestate: BgaGamestate;
    gamestates: { [gamestateId: number]: BgaGamestate };
    neutralized_player_id: string;
    notifications: { last_packet_id: string, move_nbr: string }
    playerorder: (string | number)[];
    players: { [playerId: string]: TPlayer };
    tablespeed: string;
}

declare interface BgaPlayer {
    beginner: boolean;
    color: string;
    color_back: any | null;
    eliminated: number;
    id: string;
    is_ai: string;
    name: string;
    score: string;
    zombie: number;
}


declare interface BgaGamePreference {
    value: number;
    values: { [value_id: number]: BgaGamePreferenceValue }
}

declare interface BgaGamePreferenceValue {
    cssPref: string;
}

declare interface BgaGamestate {
    name: string;
}

declare const _: (text: string) => string;
declare const __: (lang: string, text: string) => string;
declare const $: (query: string) => any;
declare const dojo: Dojo;

type DojoPlaceAction =
    /**
     * Replace the container element with your new html
     */
    "replace" |
    /**
     * Places the node as a child of the reference node. The node is placed as the first child.
     */
    "first" |
    /**
     * (Default) Places the node as a child of the reference node. The node is placed as the last child.
     */
    "last" |
    /**
     * Places the node right before the reference node.
     */
    "before" |
    /**
     * Places the node right after the reference node.
     */
    "after" |
    /**
     * Replaces all children of the reference node with the node.
     */
    "only";

/**
 * Dojo interface (BGA is not using the latest Dojo toolkit)
 */
interface Dojo {
    /**
     * Modify the CSS property of any HTML element in your interface.
     * @example
     * dojo.style( 'my_element', 'display', 'none' );
     */
    style: (nodeId: string, property: string, value: string) => void;

    addClass: (nodeId: string, className: string) => void;
    removeClass: (nodeId: string, className?: string) => void;
    toggleClass: (nodeId: string, className: string, forceValue: boolean) => void;
    hasClass: (nodeId: string, className: string) => boolean;

    attr: (nodeId: string, property: string, value?: any) => any;

    place: (html: string, nodeId: string, action?: DojoPlaceAction) => void;
    /**
     * Remove all children of the node element
     * @example
     * dojo.empty('my_hand');
     */
    empty: (nodeId: string) => void;
    /**
     * Remove the element
     * @example
     * // this remove all subnode of class green from mynode
     * dojo.query(".green", mynode).forEach(dojo.destroy); 
     */
    destroy: (element: any) => void;
    /**
     * Create element
     * @example
     * // this creates div with class yellow_array and places it in "parent"
     * dojo.create("div", { class: "yellow_arrow" }, parent);
     */
    create: (element_type: string, classes?: any, parent?: any) => void;

    /**
     * Same as dojo.style(), but for all the nodes set with the specified cssClassName
     */
    addStyleToClass: (cssClassName: string, cssProperty: string, propertyValue: any) => void


    /**
     * Used to associate a player event with one of your notification methods.
     * @example
     * dojo.connect( $('my_element'), 'onclick', this, 'onClickOnMyElement' );
     */
    connect: (element: any, event: string, callback_obj: any, callback_method: string | Function) => number;


    query: Function;
    hitch: Function;
    subscribe: Function;
    string: any;
    fx: any;
    marginBox: Function;
    fadeIn: Function;
    trim: Function;
    stopEvent: Function;
    position: Function;
}

interface DojoFxAnimation {
    play: () => void;
}