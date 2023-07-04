declare namespace ebg {
    /**
     * Card from the BGA Framework (used with Deck)
     */
    export interface card {
        id: string;
        location: string;
        location_arg: string;
        type: string;
        type_arg: string;
    }
}

declare interface Card extends ebg.card {}

type BgaButtonColor = "blue" | "red" | "gray";

type BgaStockSelectionMode = 0 | 1 | 2;
type BgaStockSelectionAppearance = "border" | "disappear" | "class";

declare class BgaGame<
    TBgaPlayer extends BgaPlayer,
    TBgaGamedatas extends BgaGamedatas<TBgaPlayer>
> {
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
    notifications: { last_packet_id: string; move_nbr: string };
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
    values: { [value_id: number]: BgaGamePreferenceValue };
}

declare interface BgaGamePreferenceValue {
    cssPref: string;
}

declare interface BgaGamestate {
    id: string;
    name: string;
    description: string;
    descriptionmyturn: string;
}

declare const _: (text: string) => string;
declare const __: (lang: string, text: string) => string;
declare const $: (query: string) => any;
declare const dojo: Dojo;

type DojoPlaceAction =
    /**
     * Replace the container element with your new html
     */
    | "replace"
    /**
     * Places the node as a child of the reference node. The node is placed as the first child.
     */
    | "first"
    /**
     * (Default) Places the node as a child of the reference node. The node is placed as the last child.
     */
    | "last"
    /**
     * Places the node right before the reference node.
     */
    | "before"
    /**
     * Places the node right after the reference node.
     */
    | "after"
    /**
     * Replaces all children of the reference node with the node.
     */
    | "only";

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
    toggleClass: (
        nodeId: string,
        className: string,
        forceValue: boolean
    ) => void;
    hasClass: (nodeId: string, className: string) => boolean;
    animateProperty: (info: any) => any;

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
    addStyleToClass: (
        cssClassName: string,
        cssProperty: string,
        propertyValue: any
    ) => void;

    /**
     * Used to associate a player event with one of your notification methods.
     * @example
     * dojo.connect( $('my_element'), 'onclick', this, 'onClickOnMyElement' );
     */
    connect: (
        element: any,
        event: string,
        callback_obj: any,
        callback_method?: string | Function
    ) => number;

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
