import { inject, injectable } from "tsyringe";
import { MatchController } from "@spt/controllers/MatchController";
import { IEmptyRequestData } from "@spt/models/eft/common/IEmptyRequestData";
import { IGetBodyResponseData } from "@spt/models/eft/httpResponse/IGetBodyResponseData";
import { INullResponseData } from "@spt/models/eft/httpResponse/INullResponseData";
import { IEndLocalRaidRequestData } from "@spt/models/eft/match/IEndLocalRaidRequestData";
import { IGetRaidConfigurationRequestData } from "@spt/models/eft/match/IGetRaidConfigurationRequestData";
import { IGroupCharacter } from "@spt/models/eft/match/IGroupCharacter";
import { IMatchGroupCurrentResponse } from "@spt/models/eft/match/IMatchGroupCurrentResponse";
import { IMatchGroupInviteSendRequest } from "@spt/models/eft/match/IMatchGroupInviteSendRequest";
import { IMatchGroupPlayerRemoveRequest } from "@spt/models/eft/match/IMatchGroupPlayerRemoveRequest";
import { IMatchGroupStartGameRequest } from "@spt/models/eft/match/IMatchGroupStartGameRequest";
import { IMatchGroupStatusRequest } from "@spt/models/eft/match/IMatchGroupStatusRequest";
import { IMatchGroupStatusResponse } from "@spt/models/eft/match/IMatchGroupStatusResponse";
import { IMatchGroupTransferRequest } from "@spt/models/eft/match/IMatchGroupTransferRequest";
import { IProfileStatusResponse } from "@spt/models/eft/match/IProfileStatusResponse";
import { IPutMetricsRequestData } from "@spt/models/eft/match/IPutMetricsRequestData";
import { IRequestIdRequest } from "@spt/models/eft/match/IRequestIdRequest";
import { IStartLocalRaidRequestData } from "@spt/models/eft/match/IStartLocalRaidRequestData";
import { IStartLocalRaidResponseData } from "@spt/models/eft/match/IStartLocalRaidResponseData";
import { IUpdatePingRequestData } from "@spt/models/eft/match/IUpdatePingRequestData";
import { DatabaseService } from "@spt/services/DatabaseService";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { JsonUtil } from "@spt/utils/JsonUtil";

@injectable()
export class MatchCallbacks
{
    constructor(
        @inject("HttpResponseUtil") protected httpResponse: HttpResponseUtil,
        @inject("JsonUtil") protected jsonUtil: JsonUtil,
        @inject("MatchController") protected matchController: MatchController,
        @inject("DatabaseService") protected databaseService: DatabaseService,
    )
    {}

    /** Handle client/match/updatePing */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public updatePing(url: string, info: IUpdatePingRequestData, sessionID: string): INullResponseData
    {
        return this.httpResponse.nullResponse();
    }

    // Handle client/match/exit
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public exitMatch(url: string, info: IEmptyRequestData, sessionID: string): INullResponseData
    {
        return this.httpResponse.nullResponse();
    }

    /** Handle client/match/group/exit_from_menu */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public exitToMenu(url: string, info: IEmptyRequestData, sessionID: string): INullResponseData
    {
        return this.httpResponse.nullResponse();
    }

    public groupCurrent(
        url: string,
        info: IEmptyRequestData,
        sessionID: string,
    ): IGetBodyResponseData<IMatchGroupCurrentResponse>
    {
        return this.httpResponse.getBody({ squad: [] });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public startGroupSearch(url: string, info: IEmptyRequestData, sessionID: string): INullResponseData
    {
        return this.httpResponse.nullResponse();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public stopGroupSearch(url: string, info: IEmptyRequestData, sessionID: string): INullResponseData
    {
        return this.httpResponse.nullResponse();
    }

    /** Handle client/match/group/invite/send */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public sendGroupInvite(
        url: string,
        info: IMatchGroupInviteSendRequest,
        sessionID: string,
    ): IGetBodyResponseData<string>
    {
        return this.httpResponse.getBody("2427943f23698ay9f2863735");
    }

    /** Handle client/match/group/invite/accept */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public acceptGroupInvite(
        url: string,
        info: IRequestIdRequest,
        sessionId: string,
    ): IGetBodyResponseData<IGroupCharacter[]>
    {
        const result = [];
        // eslint-disable-next-line strict-null-checks/all
        result.push({});

        return this.httpResponse.getBody(result);
    }

    /** Handle client/match/group/invite/decline */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public declineGroupInvite(url: string, info: IRequestIdRequest, sessionId: string): IGetBodyResponseData<boolean>
    {
        return this.httpResponse.getBody(true);
    }

    /** Handle client/match/group/invite/cancel */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public cancelGroupInvite(url: string, info: IRequestIdRequest, sessionID: string): IGetBodyResponseData<boolean>
    {
        return this.httpResponse.getBody(true);
    }

    /** Handle client/match/group/transfer */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public transferGroup(
        url: string,
        info: IMatchGroupTransferRequest,
        sessionId: string,
    ): IGetBodyResponseData<boolean>
    {
        return this.httpResponse.getBody(true);
    }

    /** Handle client/match/group/invite/cancel-all */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public cancelAllGroupInvite(
        url: string,
        info: IEmptyRequestData,
        sessionId: string,
    ): IGetBodyResponseData<boolean>
    {
        return this.httpResponse.getBody(true);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public putMetrics(url: string, request: IPutMetricsRequestData, sessionId: string): INullResponseData
    {
        return this.httpResponse.nullResponse();
    }

    // Handle client/match/available
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public serverAvailable(url: string, info: IEmptyRequestData, sessionId: string): IGetBodyResponseData<boolean>
    {
        const output = this.matchController.getEnabled();

        return this.httpResponse.getBody(output);
    }

    /** Handle match/group/start_game */
    public joinMatch(
        url: string,
        info: IMatchGroupStartGameRequest,
        sessionID: string,
    ): IGetBodyResponseData<IProfileStatusResponse>
    {
        return this.httpResponse.getBody(this.matchController.joinMatch(info, sessionID));
    }

    /** Handle client/getMetricsConfig */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public getMetrics(url: string, info: any, sessionID: string): IGetBodyResponseData<string>
    {
        return this.httpResponse.getBody(this.jsonUtil.serialize(this.databaseService.getMatch().metrics));
    }

    /**
     * Called periodically while in a group
     * Handle client/match/group/status
     * @returns
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public getGroupStatus(
        url: string,
        info: IMatchGroupStatusRequest,
        sessionID: string,
    ): IGetBodyResponseData<IMatchGroupStatusResponse>
    {
        return this.httpResponse.getBody(this.matchController.getGroupStatus(info));
    }

    /** Handle client/match/group/delete */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public deleteGroup(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<boolean>
    {
        this.matchController.deleteGroup(info);
        return this.httpResponse.getBody(true);
    }

    // Handle client/match/group/leave
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public leaveGroup(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<boolean>
    {
        return this.httpResponse.getBody(true);
    }

    /** Handle client/match/group/player/remove */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public removePlayerFromGroup(
        url: string,
        info: IMatchGroupPlayerRemoveRequest,
        sessionID: string,
    ): IGetBodyResponseData<boolean>
    {
        return this.httpResponse.getBody(true);
    }

    /** Handle client/match/local/start */
    public startLocalRaid(
        url: string,
        info: IStartLocalRaidRequestData,
        sessionID: string,
    ): IGetBodyResponseData<IStartLocalRaidResponseData>
    {
        return this.httpResponse.getBody(this.matchController.startLocalRaid(sessionID, info));
    }

    /** Handle client/match/local/end */
    public endLocalRaid(
        url: string,
        info: IEndLocalRaidRequestData,
        sessionID: string,
    ): INullResponseData
    {
        this.matchController.endLocalRaid(sessionID, info);
        return this.httpResponse.nullResponse();
    }

    /** Handle client/raid/configuration */
    public getRaidConfiguration(
        url: string,
        info: IGetRaidConfigurationRequestData,
        sessionID: string,
    ): INullResponseData
    {
        this.matchController.configureOfflineRaid(info, sessionID);
        return this.httpResponse.nullResponse();
    }

    /** Handle client/raid/configuration-by-profile */
    public getConfigurationByProfile(
        url: string,
        info: IGetRaidConfigurationRequestData,
        sessionID: string,
    ): INullResponseData
    {
        return this.httpResponse.nullResponse();
    }

    /** Handle client/match/group/raid/ready */
    public raidReady(url: string, info: IEmptyRequestData, sessionId: string): IGetBodyResponseData<boolean>
    {
        return this.httpResponse.getBody(true);
    }

    /** Handle client/match/group/raid/not-ready */
    public notRaidReady(url: string, info: IEmptyRequestData, sessionId: string): IGetBodyResponseData<boolean>
    {
        return this.httpResponse.getBody(true);
    }
}
