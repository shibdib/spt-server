import http, { IncomingMessage } from "node:http";
import { inject, injectAll, injectable } from "tsyringe";
import { WebSocket, Server } from "ws";
import { HttpServerHelper } from "@spt-aki/helpers/HttpServerHelper";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { LocalisationService } from "@spt-aki/services/LocalisationService";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { RandomUtil } from "@spt-aki/utils/RandomUtil";
import { IWebSocketConnectionHandler } from "./ws/IWebSocketConnectionHandler";

@injectable()
export class WebSocketServer
{
    protected webSocketServer: Server;

    constructor(
        @inject("WinstonLogger") protected logger: ILogger,
        @inject("RandomUtil") protected randomUtil: RandomUtil,
        @inject("JsonUtil") protected jsonUtil: JsonUtil,
        @inject("LocalisationService") protected localisationService: LocalisationService,
        @inject("HttpServerHelper") protected httpServerHelper: HttpServerHelper,
        @injectAll("WebSocketConnectionHandler") protected webSocketConnectionHandlers: IWebSocketConnectionHandler[],
    )
    {
    }

    public getWebSocketServer(): Server
    {
        return this.webSocketServer;
    }

    public setupWebSocket(httpServer: http.Server): void
    {
        this.webSocketServer = new Server({ server: httpServer });

        this.webSocketServer.addListener("listening", () =>
        {
            this.logger.success(
                this.localisationService.getText("websocket-started", this.httpServerHelper.getWebsocketUrl()),
            );
            this.logger.success(
                `${this.localisationService.getText("server_running")}, ${this.getRandomisedMessage()}!`,
            );
        });

        this.webSocketServer.addListener("connection", this.wsOnConnection.bind(this));
    }

    protected getRandomisedMessage(): string
    {
        if (this.randomUtil.getInt(1, 1000) > 999)
        {
            return this.localisationService.getRandomTextThatMatchesPartialKey("server_start_meme_");
        }

        return globalThis.G_RELEASE_CONFIGURATION
            ? `${this.localisationService.getText("server_start_success")}!`
            : this.localisationService.getText("server_start_success");
    }

    protected wsOnConnection(ws: WebSocket, req: IncomingMessage): void
    {
        const socketHandlers = this.webSocketConnectionHandlers.filter((wsh) => req.url.includes(wsh.getHookUrl()));
        if ((socketHandlers?.length ?? 0) === 0)
        {
            const message = `Socket connection received for url ${req.url}, but there is not websocket handler configured for it`;
            this.logger.warning(message);
            ws.send(this.jsonUtil.serialize({ error: message }));
            ws.close();
            return;
        }
        socketHandlers.forEach((wsh) =>
        {
            wsh.onConnection(ws, req);
            this.logger.info(`WebSocketHandler "${wsh.getSocketId()}" connected`);
        });
    }
}
