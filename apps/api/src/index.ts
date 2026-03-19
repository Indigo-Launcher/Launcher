import Fastify, { FastifyInstance } from "fastify";
import { readdirSync } from "fs";
import * as fs from "node:fs";
import path = require("node:path");

/**
 * Attaches a set of directories and handlers to the {@link Fastify} app.
 *
 * @param app {FastifyInstance} the {@link Fastify} app
 * @param routesPath {string} the filesystem path to the routes directory
 */
const attachRoutes = async (app: FastifyInstance, routesPath: string) => {
    const routes = readdirSync(routesPath, {encoding: "utf8"});

    // Loop through all files / folders
    for (const route of routes) {
        const fullPath = path.join(routesPath, route);
        const stat = fs.lstatSync(fullPath);
        if (stat.isDirectory()) {
            // If the file is a directory recurse
            await attachRoutes(app, fullPath);
            continue;
        }

        if (!route.endsWith(".ts") && !route.endsWith(".js")) {
            // silently ignore file
            app.log.warn(`Route '${route}' not found.'`);
            return;
        }

        // Parse file
        const { default: handlerClazz } = require(fullPath);
        const methods = Object.getOwnPropertyNames(handlerClazz.prototype).slice(1);
        const handler = new handlerClazz();
        for (const method of methods) {
            console.log(fullPath.replace(process.cwd() + '/routes', "").replace(".ts", ""))
            app.route({
                method: method,
                url: fullPath.replace(process.cwd() + '/routes', "").replace(".ts", ""),
                handler: async (request, reply) => {
                    return (await handler[method]).apply();
                },
            })
        }
    }
}


const bootstrap = async () => {
    const app = Fastify({
        logger: true,
    });

    app.use

    await attachRoutes(app, process.cwd() + "/routes")

    await app.listen({
        port: 3000,
    })
}
bootstrap();