import { inject, injectable } from "tsyringe";
import { ApplicationContext } from "@spt/context/ApplicationContext";
import { ContextVariableType } from "@spt/context/ContextVariableType";
import { LocationLootGenerator } from "@spt/generators/LocationLootGenerator";
import { LootGenerator } from "@spt/generators/LootGenerator";
import { PlayerScavGenerator } from "@spt/generators/PlayerScavGenerator";
import { HealthHelper } from "@spt/helpers/HealthHelper";
import { InRaidHelper } from "@spt/helpers/InRaidHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { TraderHelper } from "@spt/helpers/TraderHelper";
import { ILocationBase } from "@spt/models/eft/common/ILocationBase";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { Common } from "@spt/models/eft/common/tables/IBotBase";
import { Item } from "@spt/models/eft/common/tables/IItem";
import { IEndLocalRaidRequestData, IEndRaidResult } from "@spt/models/eft/match/IEndLocalRaidRequestData";
import { IStartLocalRaidRequestData } from "@spt/models/eft/match/IStartLocalRaidRequestData";
import { IStartLocalRaidResponseData } from "@spt/models/eft/match/IStartLocalRaidResponseData";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { MessageType } from "@spt/models/enums/MessageType";
import { Traders } from "@spt/models/enums/Traders";
import { IHideoutConfig } from "@spt/models/spt/config/IHideoutConfig";
import { IInRaidConfig } from "@spt/models/spt/config/IInRaidConfig";
import { ILocationConfig } from "@spt/models/spt/config/ILocationConfig";
import { IMatchConfig } from "@spt/models/spt/config/IMatchConfig";
import { IRagfairConfig } from "@spt/models/spt/config/IRagfairConfig";
import { ITraderConfig } from "@spt/models/spt/config/ITraderConfig";
import { IRaidChanges } from "@spt/models/spt/location/IRaidChanges";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { SaveServer } from "@spt/servers/SaveServer";
import { BotGenerationCacheService } from "@spt/services/BotGenerationCacheService";
import { BotLootCacheService } from "@spt/services/BotLootCacheService";
import { DatabaseService } from "@spt/services/DatabaseService";
import { InsuranceService } from "@spt/services/InsuranceService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { MailSendService } from "@spt/services/MailSendService";
import { MatchBotDetailsCacheService } from "@spt/services/MatchBotDetailsCacheService";
import { PmcChatResponseService } from "@spt/services/PmcChatResponseService";
import { RaidTimeAdjustmentService } from "@spt/services/RaidTimeAdjustmentService";
import { ICloner } from "@spt/utils/cloners/ICloner";
import { RandomUtil } from "@spt/utils/RandomUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";

@injectable()
export class LocationLifecycleService
{
    protected matchConfig: IMatchConfig;
    protected inRaidConfig: IInRaidConfig;
    protected traderConfig: ITraderConfig;
    protected ragfairConfig: IRagfairConfig;
    protected hideoutConfig: IHideoutConfig;
    protected locationConfig: ILocationConfig;

    constructor(
        @inject("PrimaryLogger") protected logger: ILogger,
        @inject("SaveServer") protected saveServer: SaveServer,
        @inject("TimeUtil") protected timeUtil: TimeUtil,
        @inject("RandomUtil") protected randomUtil: RandomUtil,
        @inject("ProfileHelper") protected profileHelper: ProfileHelper,
        @inject("DatabaseService") protected databaseService: DatabaseService,
        @inject("InRaidHelper") protected inRaidHelper: InRaidHelper,
        @inject("HealthHelper") protected healthHelper: HealthHelper,
        @inject("MatchBotDetailsCacheService") protected matchBotDetailsCacheService: MatchBotDetailsCacheService,
        @inject("PmcChatResponseService") protected pmcChatResponseService: PmcChatResponseService,
        @inject("PlayerScavGenerator") protected playerScavGenerator: PlayerScavGenerator,
        @inject("TraderHelper") protected traderHelper: TraderHelper,
        @inject("LocalisationService") protected localisationService: LocalisationService,
        @inject("InsuranceService") protected insuranceService: InsuranceService,
        @inject("BotLootCacheService") protected botLootCacheService: BotLootCacheService,
        @inject("ConfigServer") protected configServer: ConfigServer,
        @inject("BotGenerationCacheService") protected botGenerationCacheService: BotGenerationCacheService,
        @inject("MailSendService") protected mailSendService: MailSendService,
        @inject("RaidTimeAdjustmentService") protected raidTimeAdjustmentService: RaidTimeAdjustmentService,
        @inject("LootGenerator") protected lootGenerator: LootGenerator,
        @inject("ApplicationContext") protected applicationContext: ApplicationContext,
        @inject("LocationLootGenerator") protected locationLootGenerator: LocationLootGenerator,
        @inject("PrimaryCloner") protected cloner: ICloner,
    )
    {
        this.traderConfig = this.configServer.getConfig(ConfigTypes.TRADER);
        this.ragfairConfig = this.configServer.getConfig(ConfigTypes.RAGFAIR);
        this.hideoutConfig = this.configServer.getConfig(ConfigTypes.HIDEOUT);
        this.locationConfig = this.configServer.getConfig(ConfigTypes.LOCATION);
    }

    public startLocalRaid(sessionId: string, request: IStartLocalRaidRequestData): IStartLocalRaidResponseData
    {
        const playerProfile = this.profileHelper.getPmcProfile(sessionId);

        const result: IStartLocalRaidResponseData = {
            serverId: `${request.location}.${request.playerSide}.${this.timeUtil.getTimestamp()}`, // TODO - does this need to be more verbose - investigate client?
            serverSettings: this.databaseService.getLocationServices(), // TODO - is this per map or global?
            profile: { insuredItems: playerProfile.InsuredItems },
            locationLoot: this.generateLocationAndLoot(request.location),
        };

        // Clear bot cache ready for a fresh raid
        this.botGenerationCacheService.clearStoredBots();

        return result;
    }

    /**
     * Generate a maps base location and loot
     * @param name Map name
     * @returns ILocationBase
     */
    protected generateLocationAndLoot(name: string): ILocationBase
    {
        const location = this.databaseService.getLocation(name);
        const locationBaseClone = this.cloner.clone(location.base);

        // Update datetime property to now
        locationBaseClone.UnixDateTime = this.timeUtil.getTimestamp();

        // Don't generate loot for hideout
        if (name === "hideout")
        {
            return locationBaseClone;
        }

        // Check for a loot multipler adjustment in app context and apply if one is found
        let locationConfigClone: ILocationConfig;
        const raidAdjustments = this.applicationContext
            .getLatestValue(ContextVariableType.RAID_ADJUSTMENTS)
            ?.getValue<IRaidChanges>();
        if (raidAdjustments)
        {
            locationConfigClone = this.cloner.clone(this.locationConfig); // Clone values so they can be used to reset originals later
            this.raidTimeAdjustmentService.makeAdjustmentsToMap(raidAdjustments, locationBaseClone);
        }

        const staticAmmoDist = this.cloner.clone(location.staticAmmo);

        // Create containers and add loot to them
        const staticLoot = this.locationLootGenerator.generateStaticContainers(locationBaseClone, staticAmmoDist);
        locationBaseClone.Loot.push(...staticLoot);

        // Add dynamic loot to output loot
        const dynamicLootDistClone = this.cloner.clone(location.looseLoot);
        const dynamicSpawnPoints = this.locationLootGenerator.generateDynamicLoot(
            dynamicLootDistClone,
            staticAmmoDist,
            name,
        );

        for (const spawnPoint of dynamicSpawnPoints)
        {
            locationBaseClone.Loot.push(spawnPoint);
        }

        // Done generating, log results
        this.logger.success(
            this.localisationService.getText("location-dynamic_items_spawned_success", dynamicSpawnPoints.length),
        );
        this.logger.success(this.localisationService.getText("location-generated_success", name));

        // Reset loot multipliers back to original values
        if (raidAdjustments)
        {
            this.logger.debug("Resetting loot multipliers back to their original values");
            this.locationConfig.staticLootMultiplier = locationConfigClone.staticLootMultiplier;
            this.locationConfig.looseLootMultiplier = locationConfigClone.looseLootMultiplier;

            this.applicationContext.clearValues(ContextVariableType.RAID_ADJUSTMENTS);
        }

        return locationBaseClone;
    }

    public endLocalRaid(sessionId: string, request: IEndLocalRaidRequestData): void
    {
        // Clear bot loot cache
        this.botLootCacheService.clearCache();

        const fullProfile = this.profileHelper.getFullProfile(sessionId);
        const pmcProfile = fullProfile.characters.pmc;
        const scavProfile = fullProfile.characters.scav;
        const postRaidProfile = request.results.profile!;

        // TODO:
        // Update profile
        // Handle insurance
        // Rep gain/loss?
        // Quest status?
        // Counters?
        // Send PMC message to player if necessary
        // Limb health
        // Limb effects
        // Skills
        // Inventory - items not lost on death
        // Stats
        // stats/eft/aggressor - weird values (EFT.IProfileDataContainer.Nickname)

        this.logger.debug(`Raid outcome: ${request.results.result}`);

        // Set flea interval time to out-of-raid value
        this.ragfairConfig.runIntervalSeconds = this.ragfairConfig.runIntervalValues.outOfRaid;
        this.hideoutConfig.runIntervalSeconds = this.hideoutConfig.runIntervalValues.outOfRaid;

        // ServerId has various info stored in it, delimited by a period
        const serverDetails = request.serverId.split(".");

        const locationName = serverDetails[0].toLowerCase();
        const isPmc = serverDetails[1].toLowerCase() === "pmc";
        const mapBase = this.databaseService.getLocation(locationName).base;
        const isDead = this.isPlayerDead(request.results);

        if (!isPmc)
        {
            this.handlePostRaidPlayerScav(sessionId, pmcProfile, scavProfile, isDead);

            return;
        }

        this.handlePostRaidPmc(sessionId, pmcProfile, scavProfile, postRaidProfile, isDead, request);
    }

    protected handlePostRaidPlayerScav(
        sessionId: string,
        pmcProfile: IPmcData,
        scavProfile: IPmcData,
        isDead: boolean,
    ): void
    {
        // Scav died, regen scav loadout and set timer
        if (isDead)
        {
            this.playerScavGenerator.generate(sessionId);
        }

        // Update last played property
        pmcProfile.Info.LastTimePlayedAsSavage = this.timeUtil.getTimestamp();

        // Force a profile save
        this.saveServer.saveProfile(sessionId);
    }

    protected handlePostRaidPmc(
        sessionId: string,
        pmcProfile: IPmcData,
        scavProfile: IPmcData,
        postRaidProfile: IPmcData,
        isDead: boolean,
        request: IEndLocalRaidRequestData,
    ): void
    {
        // Update inventory
        this.inRaidHelper.setInventory(sessionId, pmcProfile, postRaidProfile);

        pmcProfile.Info.Level = postRaidProfile.Info.Level;

        // Add experience points
        pmcProfile.Info.Experience += postRaidProfile.Stats.Eft.TotalSessionExperience;

        // Profile common/mastering skills
        pmcProfile.Skills = postRaidProfile.Skills;

        pmcProfile.Stats.Eft = postRaidProfile.Stats.Eft;

        // Must occur after experience is set and stats copied over
        pmcProfile.Stats.Eft.TotalSessionExperience = 0;

        pmcProfile.Achievements = postRaidProfile.Achievements;

        // Remove skill fatigue values
        this.resetSkillPointsEarnedDuringRaid(pmcProfile.Skills.Common);

        // Straight copy
        pmcProfile.TaskConditionCounters = postRaidProfile.TaskConditionCounters;

        pmcProfile.Encyclopedia = postRaidProfile.Encyclopedia;

        // Must occur after encyclopedia updated
        this.mergePmcAndScavEncyclopedias(pmcProfile, scavProfile);

        // Handle temp, hydration, limb hp/effects
        this.healthHelper.updateProfileHealthPostRaid(pmcProfile, postRaidProfile.Health, sessionId, isDead);

        if (isDead)
        {
            this.pmcChatResponseService.sendKillerResponse(
                sessionId,
                pmcProfile,
                postRaidProfile.Stats.Eft.Aggressor,
            );
            this.matchBotDetailsCacheService.clearCache();

            this.inRaidHelper.deleteInventory(pmcProfile, sessionId);
        }

        const victims = postRaidProfile.Stats.Eft.Victims.filter((victim) =>
            ["pmcbear", "pmcusec"].includes(victim.Role.toLowerCase()),
        );
        if (victims?.length > 0)
        {
            // Player killed PMCs, send some responses to them
            this.pmcChatResponseService.sendVictimResponse(sessionId, victims, pmcProfile);
        }

        // Handle items transferred via BTR to player
        const btrKey = "BTRTransferStash";
        const btrContainerAndItems = request.transferItems[btrKey] ?? [];
        if (btrContainerAndItems.length > 0)
        {
            const itemsToSend = btrContainerAndItems.filter((item) => item._id !== btrKey);
            this.btrItemDelivery(sessionId, Traders.BTR, itemsToSend);
        }

        if (request.lostInsuredItems?.length > 0)
        {
            // TODO - refactor code to work

            // Get array of insured items+child that were lost in raid
            // const gearToStore = this.insuranceService.getGearLostInRaid(
            //     pmcProfile,
            //     postRaidRequest,
            //     preRaidGear,
            //     sessionId,
            //     isDead,
            // );

            // this.insuranceService.storeGearLostInRaidToSendLater(
            //     sessionId,
            //     gearToStore,
            // );
        }
    }

    /**
     * Handle singleplayer/traderServices/itemDelivery
     */
    protected btrItemDelivery(sessionId: string, traderId: string, items: Item[]): void
    {
        const serverProfile = this.saveServer.getProfile(sessionId);
        const pmcData = serverProfile.characters.pmc;

        const dialogueTemplates = this.databaseService.getTrader(traderId).dialogue;
        if (!dialogueTemplates)
        {
            this.logger.error(this.localisationService.getText("inraid-unable_to_deliver_item_no_trader_found", traderId));

            return;
        }
        const messageId = this.randomUtil.getArrayValue(dialogueTemplates.itemsDelivered);
        const messageStoreTime = this.timeUtil.getHoursAsSeconds(this.traderConfig.fence.btrDeliveryExpireHours);

        // Remove any items that were returned by the item delivery, but also insured, from the player's insurance list
        // This is to stop items being duplicated by being returned from both item delivery and insurance
        const deliveredItemIds = items.map((item) => item._id);
        pmcData.InsuredItems = pmcData.InsuredItems
            .filter((insuredItem) => !deliveredItemIds.includes(insuredItem.itemId));

        // Send the items to the player
        this.mailSendService.sendLocalisedNpcMessageToPlayer(
            sessionId,
            this.traderHelper.getTraderById(traderId),
            MessageType.BTR_ITEMS_DELIVERY,
            messageId,
            items,
            messageStoreTime,
        );
    }

    /**
     * Is the player dead after a raid - dead = anything other than "survived" / "runner"
     * @param statusOnExit Exit value from offraidData object
     * @returns true if dead
     */
    protected isPlayerDead(results: IEndRaidResult): boolean
    {
        return ["killed", "missinginaction", "left"].includes(results.result.toLowerCase());
    }

    /**
     * Reset the skill points earned in a raid to 0, ready for next raid
     * @param commonSkills Profile common skills to update
     */
    protected resetSkillPointsEarnedDuringRaid(commonSkills: Common[]): void
    {
        for (const skill of commonSkills)
        {
            skill.PointsEarnedDuringSession = 0.0;
        }
    }

    /**
     * merge two dictionaries together
     * Prioritise pair that has true as a value
     * @param primary main dictionary
     * @param secondary Secondary dictionary
     */
    protected mergePmcAndScavEncyclopedias(primary: IPmcData, secondary: IPmcData): void
    {
        function extend(target: { [key: string]: boolean }, source: Record<string, boolean>)
        {
            for (const key in source)
            {
                if (Object.hasOwn(source, key))
                {
                    target[key] = source[key];
                }
            }
            return target;
        }

        const merged = extend(extend({}, primary.Encyclopedia), secondary.Encyclopedia);
        primary.Encyclopedia = merged;
        secondary.Encyclopedia = merged;
    }
}
