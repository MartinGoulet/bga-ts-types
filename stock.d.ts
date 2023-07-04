declare namespace ebg {
    export interface stockitem {
        type: string;
        id: string;
    }

    export class stock {
        //////////////////////////////////
        // Creation

        /**
         * Create a new stock component.
         * @param page the container page. Usually: "this"
         * @param container_div the container "div" element (an empty div element in your template, with an id).
         * @param item_width width in pixels for the stock component.
         * @param item_height height in pixels for the stock component.
         */
        create(
            page: ebg.core.gamegui,
            container_div: string,
            item_width: number,
            item_height: number
        ): void;
        /**
         * @param type: id of the type to add. You can choose any positive integer. All item types must have distinct IDs.
         * @param weight: weight of items of this type. Weight value is used to sort items of the stock during the display. Note that you can specify the same weight for all items; in this case, they are not sorted and their order might change randomly at any time.
         * @param image: URL of item image. Most of the time, you will use a CSS sprite for stock items, so you have to specify CSS sprite image here.
         * @param image_position if "image" specify the URL of a CSS sprite, you must specify the position of the item image in this CSS sprite. For example, if you have a CSS sprite with 3 cubes with a size of 20x20 pixels each (so your CSS image has for example a size of 20x60 or 60x20), you specify "0" for the first cube image, 1 for the second, 2 for the third.
         * @note For image : g_gamethemeurl+'img/yourimage.png'
         */
        addItemType(
            type: number | string,
            weight: number,
            image: string,
            image_position: number
        ): void;
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
        addToStock(type: number | string, from?: string): void;
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
        addToStockWithId(
            type: number | string,
            id: number | string,
            from?: string
        ): void;
        /**
         * Remove an item of the specific type from the stock.
         * @param type ID of the item type to use (as specified in "addItemType")
         * @param to If "to" contains the ID of an HTML element, the item removed from the Stock slides to this HTML element before it disappears
         * @param noupdate  If set to "true" it will prevent the Stock display from changing. This is useful when multiple (but not all) items are removed at the same time, to avoid ghost items appearing briefly. If you pass noupdate you have to call updateDisplay() after all items are removed.
         */
        removeFromStock(
            type: number | string,
            to?: string,
            noupdate?: boolean
        ): void;
        /**
         * Remove an item with a specific ID from the stock.
         * @param type ID of the item
         * @param to If "to" contains the ID of an HTML element, the item removed from the Stock slides to this HTML element before it disappears
         * @param noupdate  If set to "true" it will prevent the Stock display from changing. This is useful when multiple (but not all) items are removed at the same time, to avoid ghost items appearing briefly. If you pass noupdate you have to call updateDisplay() after all items are removed.
         */
        removeFromStockById(id: number | string): void;
        /**
         * Remove all items from the stock
         */
        removeAll(): void;
        /**
         * Remove all items from the stock
         * @param to If "to" contains the ID of an HTML element, the item removed from the stock slides to this HTML element before it disappears.
         */
        removeAllTo(to?: string): void;

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
        getPresentTypeList(): { [type: number]: number };
        /**
         * Return the total number of items in the stock right now.
         */
        count(): number;
        /**
         * Get all items
         */
        getAllItems(): ebg.stockitem[];
        /**
         * Get the div id using the stock item id (to manipulate element properties directly).
         */
        getItemDivId(id: string): string;
        /**
         * Get the Stock item with the id in parameter
         */
        getItemById(id: string): stockitem;

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
        setSelectionMode(mode: BgaStockSelectionMode): void;
        /**
         * Specify a selection highlighting type
         *
         * @note
         * 'border': there will be a red border around selected items (this is the default). The attribute 'apparenceBorderWidth' can be used to manage the width of the border (in pixels).
         * 'disappear': the selected item will fade out and disappear. This is useful when the selection has the effect of destroying the item.
         * 'class': there will be an extra stockitem_selected css class added to the element when it is selected (and removed when unselected). The name of the class can be changed by using the selectionClass attribute. You can also override the default class in the css file for your game but beware of the !important keyword.
         */
        setSelectionAppearance(type: BgaStockSelectionAppearance): void;
        /**
         * Return a boolean indicating whether the specified item id has been selected.
         * @param id Id of the item in the stock
         */
        isSelected(id: number | string): void;
        /**
         * Select the specified item
         * @param id Id of the item in the stock
         */
        selectItem(id: number | string): void;
        /**
         * Unselect the specified item
         * @param id Id of the item in the stock
         */
        unselectItem(id: number | string): void;
        /**
         * Unselect all items of the stock
         */
        unselectAll(): void;
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
        onChangeSelection(control_name: string, item_id: string): void;
        /**
         * Return the list of selected items
         */
        getSelectedItems(): stockitem[];
        /**
         * Return the list of unselected items
         */
        getUnselectedItems(): ebg.stockitem[];

        //////////////////////////////////
        // Layout

        /**
         * If you moved an item from the stock control manually (ex: after a drag'n'drop) and want to reset their positions to their original ones, you can call this method.
         * @note it is the same as updateDisplay() without arugment
         */
        resetItemsPosition(): void;
        /**
         * Update the display completely
         * @param from if is defined: moves new items from this location
         */
        updateDisplay(from: string): void;
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
        changeItemsWeight(newWeight: {
            [type: number]: [weight: number];
        }): void;
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
        setOverlap(horizontal_percent: number, vertical_percent: number): void;
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
        onItemCreate(
            card_div: HTMLElement,
            card_type_id: number,
            card_id: string
        ): void;
        /**
         * Function handler called when div is removed
         *
         * @example
         * this.myStock.onItemDelete = (card_div, card_type_id, card_id) => {
         *      console.log("card deleted from myStock: "+card_id);
         * };
         */
        onItemDelete(
            card_div: HTMLElement,
            card_type_id: number,
            card_id: string
        ): void;

        //////////////////////////////////
        // Other (non documented)

        /**
         * Change the mode like setSelectionMode but without applying the change.
         * @note
         * Useful to block the selection change without changing selection mode.
         */
        selectable: number;
    }
}
