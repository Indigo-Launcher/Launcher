'use strict';

/**
 *
 */
export interface HandlerOptions {}

/**
 *
 */
interface Handler<O extends HandlerOptions> {

    /**
     *
     *
     * @param options
     */
    handle(options: HandlerOptions): object;
}

export default Handler;