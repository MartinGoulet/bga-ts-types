declare namespace ebg {
    /**
     * Control that allow to set/get numeric value from inner html of div/span, and provides animation on from/to value.
     */
    export class counter {
        /**
         * Associate counter with existing target dom element
         * @param target Id of the Html element
         */
        create(target: string | HTMLElement): void;
        /**
         * Return current value
         */
        getValue(): number;
        /**
         * Increment value by "by" and animate from previous value
         * @param by Value to increment
         */
        incValue(by: number): void;
        /**
         * Set value no animation
         * @remark No animation
         */
        setValue(value: number): void;
        /**
         * Set value with animatino
         * @remark With animation
         */
        toValue(value: number): void;
        /**
         * Display - instead.
         * @remark It just changes display value once, it does not actually disables it, i.e. if you set it again, it will be shown again
         */
        disable(): void;
    }
}