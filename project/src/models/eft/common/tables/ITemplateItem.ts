export interface ITemplateItem 
{
    _id: string
    _name: string
    _parent: string
    _type: string
    _props: Props
    _proto: string
}

export interface Props 
{
    AllowSpawnOnLocations?: any[]
    ChangePriceCoef?: number
    FixedPrice?: boolean
    SendToClient?: boolean
    Name?: string
    ShortName?: string
    Description?: string
    Weight?: number
    BackgroundColor?: string
    Width?: number
    Height?: number
    StackMaxSize?: number
    Rarity?: string
    SpawnChance?: number
    CreditsPrice?: number
    ItemSound?: string
    Prefab?: Prefab
    UsePrefab?: Prefab
    StackObjectsCount?: number
    NotShownInSlot?: boolean
    ExaminedByDefault?: boolean
    ExamineTime?: number
    IsUndiscardable?: boolean
    IsUnsaleable?: boolean
    IsUnbuyable?: boolean
    IsUngivable?: boolean
    IsUnremovable?: boolean
    IsLockedafterEquip?: boolean
    IsSpecialSlotOnly?: boolean
    QuestItem?: boolean
    QuestStashMaxCount?: number
    LootExperience?: number
    ExamineExperience?: number
    HideEntrails?: boolean
    InsuranceDisabled?: boolean
    RepairCost?: number
    RepairSpeed?: number
    ExtraSizeLeft?: number
    ExtraSizeRight?: number
    ExtraSizeUp?: number
    ExtraSizeDown?: number
    ExtraSizeForceAdd?: boolean
    MergesWithChildren?: boolean
    CanSellOnRagfair?: boolean
    CanRequireOnRagfair?: boolean
    ConflictingItems?: string[]
    Unlootable?: boolean
    UnlootableFromSlot?: string
    UnlootableFromSide?: string[]
    AnimationVariantsNumber?: number
    DiscardingBlock?: boolean
    DropSoundType?: string
    RagFairCommissionModifier?: number
    IsAlwaysAvailableForInsurance?: boolean
    DiscardLimit?: number
    MaxResource?: number
    Resource?: number
    DogTagQualities?: boolean
    Grids?: Grid[]
    Slots?: Slot[]
    CanPutIntoDuringTheRaid?: boolean
    CantRemoveFromSlotsDuringRaid?: string[]
    KeyIds?: string[]
    TagColor?: number
    TagName?: string
    Durability?: number
    Accuracy?: number
    Recoil?: number
    Loudness?: number
    EffectiveDistance?: number
    Ergonomics?: number
    Velocity?: number
    RaidModdable?: boolean
    ToolModdable?: boolean
    BlocksFolding?: boolean
    BlocksCollapsible?: boolean
    IsAnimated?: boolean
    HasShoulderContact?: boolean
    SightingRange?: number
    DoubleActionAccuracyPenaltyMult?: number
    ModesCount?: any
    DurabilityBurnModificator?: number
    HeatFactor?: number
    CoolFactor?: number
    muzzleModType?: string
    CustomAimPlane?: string
    sightModType?: string
    aimingSensitivity?: number
    SightModesCount?: number
    OpticCalibrationDistances?: number[]
    ScopesCount?: number
    AimSensitivity?: number|number[][]
    Zooms?: number[][]
    CalibrationDistances?: number[][]
    Intensity?: number
    Mask?: string
    MaskSize?: number
    NoiseIntensity?: number
    NoiseScale?: number
    Color?: IColor
    DiffuseIntensity?: number
    HasHinge?: boolean
    RampPalette?: string
    DepthFade?: number
    RoughnessCoef?: number
    SpecularCoef?: number
    MainTexColorCoef?: number
    MinimumTemperatureValue?: number
    RampShift?: number
    HeatMin?: number
    ColdMax?: number
    IsNoisy?: boolean
    IsFpsStuck?: boolean
    IsGlitch?: boolean
    IsMotionBlurred?: boolean
    IsPixelated?: boolean
    PixelationBlockCount?: number
    ShiftsAimCamera?: number
    magAnimationIndex?: number
    Cartridges?: Slot[]
    CanFast?: boolean
    CanHit?: boolean
    CanAdmin?: boolean
    LoadUnloadModifier?: number
    CheckTimeModifier?: number
    CheckOverride?: number
    ReloadMagType?: string
    VisibleAmmoRangesString?: string
    MalfunctionChance?: number
    IsShoulderContact?: boolean
    Foldable?: boolean
    Retractable?: boolean
    SizeReduceRight?: number
    CenterOfImpact?: number
    ShotgunDispersion?: number
    IsSilencer?: boolean
    DeviationCurve?: number
    DeviationMax?: number
    SearchSound?: string
    BlocksArmorVest?: boolean
    speedPenaltyPercent?: number
    GridLayoutName?: string
    SpawnFilter?: any[]
    containType?: any[]
    sizeWidth?: number
    sizeHeight?: number
    isSecured?: boolean
    spawnTypes?: string
    lootFilter?: any[]
    spawnRarity?: string
    minCountSpawn?: number
    maxCountSpawn?: number
    openedByKeyID?: any[]
    RigLayoutName?: string
    MaxDurability?: number
    armorZone?: string[]
    armorClass?: string | number
    mousePenalty?: number
    weaponErgonomicPenalty?: number
    BluntThroughput?: number
    ArmorMaterial?: string
    ArmorType?: string
    weapClass?: string
    weapUseType?: string
    ammoCaliber?: string
    OperatingResource?: number
    RepairComplexity?: number
    durabSpawnMin?: number
    durabSpawnMax?: number
    isFastReload?: boolean
    RecoilForceUp?: number
    RecoilForceBack?: number
    Convergence?: number
    RecoilAngle?: number
    weapFireType?: string[]
    RecolDispersion?: number
    SingleFireRate?: number
    CanQueueSecondShot?: boolean
    bFirerate?: number
    bEffDist?: number
    bHearDist?: number
    isChamberLoad?: boolean
    chamberAmmoCount?: number
    isBoltCatch?: boolean
    defMagType?: string
    defAmmo?: string
    AdjustCollimatorsToTrajectory?: boolean
    shotgunDispersion?: number
    Chambers?: Slot[]
    CameraRecoil?: number
    CameraSnap?: number
    ReloadMode?: string
    AimPlane?: number
    TacticalReloadStiffnes?: Xyz
    TacticalReloadFixation?: number
    RecoilCenter?: Xyz
    RotationCenter?: Xyz
    RotationCenterNoStock?: Xyz
    FoldedSlot?: string
    CompactHandling?: boolean
    MinRepairDegradation?: number
    MaxRepairDegradation?: number
    IronSightRange?: number
    IsFlareGun?: boolean
    IsGrenadeLauncher?: boolean
    IsOneoff?: boolean
    MustBoltBeOpennedForExternalReload?: boolean
    MustBoltBeOpennedForInternalReload?: boolean
    NoFiremodeOnBoltcatch?: boolean
    BoltAction?: boolean
    HipAccuracyRestorationDelay?: number
    HipAccuracyRestorationSpeed?: number
    HipInnaccuracyGain?: number
    ManualBoltCatch?: boolean
    BurstShotsCount?: number
    BaseMalfunctionChance?: number
    AllowJam?: boolean
    AllowFeed?: boolean
    AllowMisfire?: boolean
    AllowSlide?: boolean
    DurabilityBurnRatio?: number
    HeatFactorGun?: number
    CoolFactorGun?: number
    CoolFactorGunMods?: number
    HeatFactorByShot?: number
    AllowOverheat?: boolean
    DoubleActionAccuracyPenalty?: number
    RecoilPosZMult?: number
    MinRepairKitDegradation?: number
    MaxRepairKitDegradation?: number
    BlocksEarpiece?: boolean
    BlocksEyewear?: boolean
    BlocksHeadwear?: boolean
    BlocksFaceCover?: boolean
    Indestructibility?: number
    headSegments?: string[]
    FaceShieldComponent?: boolean
    FaceShieldMask?: string
    MaterialType?: string
    RicochetParams?: Xyz
    DeafStrength?: string
    BlindnessProtection?: number
    Distortion?: number
    CompressorTreshold?: number
    CompressorAttack?: number
    CompressorRelease?: number
    CompressorGain?: number
    CutoffFreq?: number
    Resonance?: number
    RolloffMultiplier?: number
    CompressorVolume?: number
    AmbientVolume?: number
    DryVolume?: number
    HighFrequenciesGain?: number
    foodUseTime?: number
    foodEffectType?: string
    StimulatorBuffs?: string
    // eslint-disable-next-line @typescript-eslint/naming-convention
    effects_health?: IHealthEffect[] | Record<string, Record<string, number>>
    // eslint-disable-next-line @typescript-eslint/naming-convention
    effects_damage?: Record<string, IEffectDamageProps>
    MaximumNumberOfUsage?: number
    knifeHitDelay?: number
    knifeHitSlashRate?: number
    knifeHitStabRate?: number
    knifeHitRadius?: number
    knifeHitSlashDam?: number
    knifeHitStabDam?: number
    knifeDurab?: number
    PrimaryDistance?: number
    SecondryDistance?: number
    SlashPenetration?: number
    StabPenetration?: number
    PrimaryConsumption?: number
    SecondryConsumption?: number
    DeflectionConsumption?: number
    AppliedTrunkRotation?: Xyz
    AppliedHeadRotation?: Xyz
    DisplayOnModel?: boolean
    AdditionalAnimationLayer?: number
    StaminaBurnRate?: number
    ColliderScaleMultiplier?: Xyz
    ConfigPathStr?: string
    MaxMarkersCount?: number
    scaleMin?: number
    scaleMax?: number
    medUseTime?: number
    medEffectType?: string
    MaxHpResource?: number
    hpResourceRate?: number
    apResource?: number
    krResource?: number
    MaxOpticZoom?: number
    MaxRepairResource?: number
    TargetItemFilter?: string[]
    RepairQuality?: number
    RepairType?: string
    StackMinRandom?: number
    StackMaxRandom?: number
    ammoType?: string
    InitialSpeed?: number
    BallisticCoeficient?: number
    BulletMassGram?: number
    BulletDiameterMilimeters?: number
    Damage?: number
    ammoAccr?: number
    ammoRec?: number
    ammoDist?: number
    buckshotBullets?: number
    PenetrationPower?: number
    PenetrationPowerDiviation?: number
    ammoHear?: number
    ammoSfx?: string
    MisfireChance?: number
    MinFragmentsCount?: number
    MaxFragmentsCount?: number
    ammoShiftChance?: number
    casingName?: string
    casingEjectPower?: number
    casingMass?: number
    casingSounds?: string
    ProjectileCount?: number
    PenetrationChance?: number
    RicochetChance?: number
    FragmentationChance?: number
    Deterioration?: number
    SpeedRetardation?: number
    Tracer?: boolean
    TracerColor?: string
    TracerDistance?: number
    ArmorDamage?: number
    Caliber?: string
    StaminaBurnPerDamage?: number
    HeavyBleedingDelta?: number
    LightBleedingDelta?: number
    ShowBullet?: boolean
    HasGrenaderComponent?: boolean
    FuzeArmTimeSec?: number
    ExplosionStrength?: number
    MinExplosionDistance?: number
    MaxExplosionDistance?: number
    FragmentsCount?: number
    FragmentType?: string
    ShowHitEffectOnExplode?: boolean
    ExplosionType?: string
    AmmoLifeTimeSec?: number
    Contusion?: Xyz
    ArmorDistanceDistanceDamage?: Xyz
    Blindness?: Xyz
    IsLightAndSoundShot?: boolean
    LightAndSoundShotAngle?: number
    LightAndSoundShotSelfContusionTime?: number
    LightAndSoundShotSelfContusionStrength?: number
    MalfMisfireChance?: number
    MalfFeedChance?: number
    StackSlots?: StackSlot[]
    type?: string
    eqMin?: number
    eqMax?: number
    rate?: number
    ThrowType?: string
    ExplDelay?: number
    Strength?: number
    ContusionDistance?: number
    throwDamMax?: number
    explDelay?: number
    EmitTime?: number
    CanBeHiddenDuringThrow?: boolean
    MinTimeToContactExplode?: number
    ExplosionEffectType?: string
    LinkedWeapon?: string
    UseAmmoWithoutShell?: boolean
    RandomLootSettings?: IRandomLootSettings
}

export interface IHealthEffect
{
    type: string
    value: number
}

export interface Prefab 
{
    path: string
    rcid: string
}

export interface Grid 
{
    _name: string
    _id: string
    _parent: string
    _props: GridProps
    _proto: string
}

export interface GridProps 
{
    filters: GridFilter[]
    cellsH: number
    cellsV: number
    minCount: number
    maxCount: number
    maxWeight: number
    isSortingTable: boolean
}

export interface GridFilter 
{
    Filter: string[]
    ExcludedFilter: string[]
}

export interface Slot 
{
    _name: string
    _id: string
    _parent: string
    _props: SlotProps
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _max_count?: number
    _required?: boolean
    _mergeSlotWithChildren?: boolean
    _proto: string
}

export interface SlotProps 
{
    filters: SlotFilter[]
}

export interface SlotFilter 
{
    Shift?: number
    Filter: string[]
    AnimationIndex?: number
}

export interface Xyz 
{
    x: number
    y: number
    z: number
}

export interface StackSlot
{
    _name?: string
    _id: string
    _parent: string
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _max_count: number
    _props: StackSlotProps
    _proto: string
    upd: any
}

export interface StackSlotProps 
{
    filters: SlotFilter[]
}

export interface IRandomLootSettings
{
    allowToSpawnIdenticalItems: boolean
    allowToSpawnQuestItems: boolean
    countByRarity: any[]
    excluded: IRandomLootExcluded
    filters: any[]
    findInRaid: boolean
    maxCount: number
    minCount: number
}

export interface IRandomLootExcluded
{
    categoryTemplates: any[]
    rarity: string[]
    templates: any[]
}

export interface EffectsHealth 
{
    Energy: EffectsHealthProps
    Hydration: EffectsHealthProps
}

export interface EffectsHealthProps 
{
    value: number
}

export interface EffectsDamage 
{
    Pain: IEffectDamageProps
    LightBleeding: IEffectDamageProps
    HeavyBleeding: IEffectDamageProps
    Contusion: IEffectDamageProps
    RadExposure: IEffectDamageProps
    Fracture: IEffectDamageProps
    DestroyedPart: IEffectDamageProps
}

export interface IEffectDamageProps 
{
    delay: number
    duration: number
    fadeOut: number
    cost?: number
    healthPenaltyMin?: number
    healthPenaltyMax?: number
}

export interface IColor 
{
    r: number
    g: number
    b: number
    a: number
}