'use strict';

import RouteHandler from "../structures/RouteHandler";

class HealthzHandler extends RouteHandler {
    async GET() {
        console.log('test')
    }
}

export default HealthzHandler;