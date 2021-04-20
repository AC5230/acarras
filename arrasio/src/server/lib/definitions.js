//DEFINITIONS
const combineStats = function(arr) {
    try {
        // Build a blank array of the appropiate length
        let data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        arr.forEach(function(component) {
            for (let i = 0; i < data.length; i++) {
                data[i] = data[i] * component[i];
            }
        });
        return {
            reload: data[0],
            recoil: data[1],
            shudder: data[2],
            size: data[3],
            health: data[4],
            damage: data[5],
            pen: data[6],
            speed: data[7],
            maxSpeed: data[8],
            range: data[9],
            density: data[10],
            spray: data[11],
            resist: data[12],
        };
    } catch (err) {
        console.log(err);
        console.log(JSON.stringify(arr));
    }
};
const skillSet = (() => {
    let config = require('../../../config.json');
    let skcnv = {
        rld: 0,
        pen: 1,
        str: 2,
        dam: 3,
        spd: 4,
        shi: 5,
        atk: 6,
        hlt: 7,
        rgn: 8,
        mob: 9,
    };
    return args => {
        let skills = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let s in args) {
            if (!args.hasOwnProperty(s)) continue;
            skills[skcnv[s]] = Math.round(config.MAX_SKILL * args[s]);
        }
        return skills;
    };
})();
const g = { // Gun info here 
    trap: [36.1, 1, 0.25, 0.6, 1, 0.75, 1, 5, 1, 1, 1, 15, 3],
    swarm: [18, 0.25, 0.05, 0.4, 1, 0.75, 1, 4, 1, 1, 1, 5, 1],
    drone: [50, 0.25, 0.1, 0.6, 1, 1, 1, 2, 1, 1, 1, 0.1, 1],
    factory: [60, 1, 0.1, 0.7, 1, 0.75, 1, 3, 1, 1, 1, 0.1, 1],
    basic: [18, 1.4, 0.1, 1, 1, 0.75, 1, 4.5, 1, 1, 1, 15, 1],
    huge: [2, 0, 0.25, 3, 1, 0.75, 1, 7, 1, 1, 1, 15, 3],
    osht: [0.1, 0.7, 0.25, 1, 1, 0.75, 1, 2.5, 1, 1, 1, 15, 3],
    candl: [0.1, 9.7, 0.25, 1, 1, 0.75, 1, 0.05, 1, 1, 1, 360, 3],
    highrecoil2: [0.4, 3.4, 0.1, 1, 1, 0.75, 1, 4.5, 1, 1, 1, 15, 1],
    nerfgun: [999999, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    blank: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 10],
    bigger: [1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 10],
    blank2: [1, 1, 1, 1, 1, 1, 1, 0.03, 100, 14, 1, 1, 1],
    spam: [1.1, 1, 1, 1.05, 1, 1.1, 1, 0.9, 0.7, 1, 1, 1, 1.05],
    minion: [1, 1, 2, 1, 0.4, 0.4, 1.2, 1, 1, 0.75, 1, 2, 1],
    single: [1.05, 1, 1, 1, 1, 1, 1, 1.05, 1, 1, 1, 1, 1],
    sniper: [1.35, 1, 0.25, 1, 1, 0.8, 1.1, 1.5, 1.5, 1, 1.5, 0.2, 1.15],
    rifle: [0.8, 0.8, 1.5, 1, 0.8, 0.8, 0.9, 1, 1, 1, 1, 2, 1],
    assass: [1.65, 1, 0.25, 1, 1.15, 1, 1.1, 1.18, 1.18, 1, 3, 1, 1.3],
    ranger: [1.95, 1, 0.25, 1, 1.30, 1, 1.1, 1.18, 1.18, 1, 3, 1, 1.3],
    hunter: [1.5, 0.7, 1, 0.95, 1, 0.9, 1, 1.1, 0.8, 1, 1.2, 1, 1.15],
    hunter2: [1, 1, 1, 0.9, 2, 0.5, 1.5, 1, 1, 1, 1.2, 1, 1.1],
    preda: [1.4, 1, 1, 0.8, 1.5, 0.9, 1.2, 0.9, 0.9, 1, 1, 1, 1],
    snake: [0.4, 1, 4, 1, 1.5, 0.9, 1.2, 0.2, 0.35, 1, 3, 6, 0.5],
    sidewind: [1.5, 2, 1, 1, 1.5, 0.9, 1, 0.15, 0.5, 1, 1, 1, 1],
    snakeskin: [0.6, 1, 2, 1, 0.5, 0.5, 1, 1, 0.2, 0.4, 1, 5, 1],
    mach: [0.5, 0.8, 1.7, 1, 0.7, 0.7, 1, 1, 0.8, 1, 1, 2.5, 1],
    blaster: [1, 1.2, 1.25, 1.1, 1.5, 1, 0.6, 0.8, 0.33, 0.6, 0.5, 1.5, 0.8],
    chain: [1.25, 1.33, 0.8, 1, 0.8, 1, 1.1, 1.25, 1.25, 1.1, 1.25, 0.5, 1.1],
    mini: [1.25, 0.6, 1, 0.8, 0.55, 0.45, 1.25, 1.33, 1, 1, 1.25, 0.5, 1.1],
    stream: [1.1, 0.6, 1, 1, 1, 0.65, 1, 1.24, 1, 1, 1, 1, 1],
    shotgun: [8, 0.4, 1, 1.5, 1, 0.4, 0.8, 1.8, 0.6, 1, 1.2, 1.2, 1],
    flank: [1, 1.2, 1, 1, 1.02, 0.81, 0.9, 1, 0.85, 1, 1.2, 1, 1],
    tri: [1, 0.9, 1, 1, 0.9, 1, 1, 0.8, 0.8, 0.6, 1, 1, 1],
    trifront: [1, 0.2, 1, 1, 1, 1, 1, 1.3, 1.1, 1.5, 1, 1, 1],
    thruster: [1, 1.5, 2, 1, 0.5, 0.5, 0.7, 1, 1, 1, 1, 0.5, 0.7],
    auto: /*pure*/ [1.8, 0.75, 0.5, 0.8, 0.9, 0.6, 1.2, 1.1, 1, 0.8, 1.3, 1, 1.25],
    five: [1.15, 1, 1, 1, 1, 1, 1, 1.05, 1.05, 1.1, 2, 1, 1],
    autosnipe: [1, 1, 1, 1.4, 2, 1, 1, 1, 1, 1, 1, 1, 1],
    rng: [5, 1, 1, 1, 1, 1, 1, 1, 0.01, 2, 1, 360, 0],
    norng: [1, 1, 0.1, 1, 1, 1, 1, 8, 5, 1, 1, 0.01, 0],
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    pound: [2, 1.6, 1, 1, 1, 2, 1, 0.85, 0.8, 1, 1.5, 1, 1.15],
    destroy: [2.2, 1.8, 0.5, 1, 2, 2, 1.2, 0.65, 0.5, 1, 2, 1, 3],
    anni: [0.85, 1.25, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    hive: [1.5, 0.8, 1, 0.8, 0.7, 0.3, 1, 1, 0.6, 1, 1, 1, 1],
    arty: [1.2, 0.7, 1, 0.9, 1, 1, 1, 1.15, 1.1, 1, 1.5, 1, 1],
    mortar: [1.2, 1, 1, 1, 1.1, 1, 1, 0.8, 0.8, 1, 1, 1, 1],
    spreadmain: [0.78125, 0.25, 0.5, 1, 0.5, 1, 1, 1.5 / 0.78, 0.9 / 0.78, 1, 1, 1, 1],
    spread: [1.5, 1, 0.25, 1, 1, 1, 1, 0.7, 0.7, 1, 1, 0.25, 1],
    skim: [1.33, 0.8, 0.8, 0.9, 1.35, 0.8, 2, 0.3, 0.3, 1, 1, 1, 1.1],
    twin: [1, 0.5, 0.9, 1, 0.9, 0.7, 1, 1, 1, 1, 1, 1.2, 1],
    bent: [1.1, 1, 0.8, 1, 0.9, 1, 0.8, 1, 1, 1, 0.8, 0.5, 1],
    triple: [1.2, 0.667, 0.9, 1, 0.85, 0.85, 0.9, 1, 1, 1, 1.1, 0.9, 0.95],
    quint: [1.5, 0.667, 0.9, 1, 1, 1, 0.9, 1, 1, 1, 1.1, 0.9, 0.95],
    dual: [2, 1, 0.8, 1, 1.5, 1, 1, 1.3, 1.1, 1, 1, 1, 1.25],
    double: [1, 1, 1, 1, 1, 0.9, 1, 1, 1, 1, 1, 1, 1],
    hewn: [1.25, 1.5, 1, 1, 0.9, 0.85, 1, 1, 0.9, 1, 1, 1, 1],
    puregunner: [1, 0.25, 1.5, 1.2, 1.35, 0.25, 1.25, 0.8, 0.65, 1, 1.5, 1.5, 1.2],
    machgun: [0.66, 0.8, 2, 1, 1, 0.75, 1, 1.2, 0.8, 1, 1, 2.5, 1],
    gunner: [1.25, 0.25, 1.5, 1.1, 1, 0.35, 1.35, 0.9, 0.8, 1, 1.5, 1.5, 1.2],
    power: [1, 1, 0.6, 1.2, 1, 1, 1.25, 2, 1.7, 1, 2, 0.5, 1.5],
    nail: [0.85, 2.5, 1, 0.8, 1, 0.7, 1, 1, 1, 1, 2, 1, 1],
    fast: [1, 1, 1, 1, 1, 1, 1, 1.2, 1, 1, 1, 1, 1],
    turret: [2, 1, 1, 1, 0.8, 0.6, 0.7, 1, 1, 1, 0.1, 1, 1],
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    battle: [1.5, 1, 1, 1, 1.25, 1.15, 1, 1, 0.85, 1, 1, 1, 1.1],
    bees: [1.3, 1, 1, 1.4, 1, 1.5, 0.5, 3, 1.5, 1, 0.25, 1, 1],
    carrier: [1.5, 1, 1, 1, 1, 0.8, 1, 1.3, 1.2, 1.2, 1, 1, 1],
    hexatrap: [1.3, 1, 1.25, 1, 1, 1, 1, 0.8, 1, 0.5, 1, 1, 1],
    block: [1.1, 2, 0.1, 1.5, 2, 1, 1.25, 1.5, 2.5, 1.25, 1, 1, 1.25],
    construct: [1.3, 1, 1, 0.9, 1, 1, 1, 1, 1.1, 1, 1, 1, 1],
    boomerang: [0.8, 1, 1, 1, 0.5, 0.5, 1, 0.75, 0.75, 1.333, 1, 1, 1],
    machboomer: [0.8, 1, 1, 1, 0.5, 0.5, 1, 0.75, 0.75, 1.333, 1, 2.5, 1],
    over: [1.25, 1, 1, 0.85, 0.7, 0.8, 1, 1, 0.9, 1, 2, 1, 1],
    meta: [1.333, 1, 1, 1, 1, 0.667, 1, 1, 1, 1, 1, 1, 1],
    weak: [2, 1, 1, 1, 0.6, 0.6, 0.8, 0.5, 0.7, 0.25, 0.3, 1, 1],
    master: [3, 1, 1, 0.7, 0.4, 0.7, 1, 1, 1, 0.1, 0.5, 1, 1],
    sunchip: [5, 1, 1, 1.4, 0.5, 0.4, 0.6, 1, 1, 1, 0.8, 1, 1],
    babyfactory: [1.5, 1, 1, 1, 1, 1, 1, 1, 1.35, 1, 1, 1, 1],
    lowpower: [1, 1, 2, 1, 0.5, 0.5, 0.7, 1, 1, 1, 1, 0.5, 0.7],
    halfrecoil: [1, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    morerecoil: [1, 1.15, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    muchmorerecoil: [1, 1.35, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    lotsmorrecoil: [1, 1.8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    tonsmorrecoil: [1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    nanreload: [0.01, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    tantalizingreload: [0.25, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    doublereload: [0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    morereload: [0.75, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    halfreload: [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    lessreload: [1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    lesserreload: [1.75, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    threequartersrof: [1.333, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    morespeed: [1, 1, 1, 1, 1, 1, 1, 1.3, 1.3, 1, 1, 1, 1],
    bitlessspeed: [1, 1, 1, 1, 1, 1, 1, 0.93, 0.93, 1, 1, 1, 1],
    slow: [1, 1, 1, 1, 1, 1, 1, 0.7, 0.7, 1, 1, 1, 1],
    halfspeed: [1, 1, 1, 1, 1, 1, 1, 0.5, 0.5, 1, 1, 1, 1],
    notdense: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.1, 1, 1],
    halfrange: [1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1],
    fake: [1, 1, 1, 0.00001, 0.0001, 1, 1, 0.00001, 2, 0, 1, 1, 1],
    /**REDO*********** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    op: [0.5, 1.3, 1, 1, 4, 4, 4, 3, 2, 1, 5, 2, 1],
    protectorswarm: [5, 0.000001, 1, 1, 100, 1, 1, 1, 1, 0.5, 5, 1, 10],
    faster: [1, 1, 1, 1, 1, 1, 1, 1.1, 1.1, 1, 1, 1, 1],
    bigger: [1, 1, 1, 1.25, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    doublesize: [1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1],
};
const dfltskl = 9;
// NAMES
const statnames = {
    smasher: 1,
    drone: 2,
    necro: 3,
    swarm: 4,
    trap: 5,
    generic: 6,
};
const gunCalcNames = {
    default: 0,
    bullet: 1,
    drone: 2,
    swarm: 3,
    fixedReload: 4,
    thruster: 5,
    sustained: 6,
    necro: 7,
    trap: 8,
};

// ENTITY DEFINITIONS
exports.genericEntity = {
    NAME: '',
    LABEL: 'Unknown Entity',
    TYPE: 'unknown',
    DAMAGE_CLASS: 0, // 0: def, 1: food, 2: tanks, 3: obstacles
    DANGER: 0,
    VALUE: 0,
    SHAPE: 0,
    COLOR: 16,
    INDEPENDENT: false,
    CONTROLLERS: ['doNothing'],
   
    HAS_NO_MASTER: false,
    MOTION_TYPE: 'glide', // motor, swarm, chase
    FACING_TYPE: 'toTarget', // turnWithSpeed, withMotion, looseWithMotion, toTarget, looseToTarget
    DRAW_HEALTH: false,
    DRAW_SELF: true,
    DAMAGE_EFFECTS: true,
    RATEFFECTS: true,
    MOTION_EFFECTS: true,
    INTANGIBLE: false,
    ACCEPTS_SCORE: true,
    GIVE_KILL_MESSAGE: false,
    CAN_GO_OUTSIDE_ROOM: false,
    HITS_OWN_TYPE: 'normal', // hard, repel, never, hardWithBuffer
    DIE_AT_LOW_SPEED: false,
    DIE_AT_RANGE: false,
    CLEAR_ON_MASTER_UPGRADE: false,
    PERSISTS_AFTER_DEATH: false,
    VARIES_IN_SIZE: false,
    HEALTH_WITH_LEVEL: true,
    CAN_BE_ON_LEADERBOARD: true,
    HAS_NO_RECOIL: false,
    AUTO_UPGRADE: 'none',
    BUFF_VS_FOOD: false,
    OBSTACLE: false,
    CRAVES_ATTENTION: false,
    NECRO: false,
    UPGRADES_TIER_1: [],
    UPGRADES_TIER_2: [],
    UPGRADES_TIER_3: [],
    SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    LEVEL: 0,
    SKILL_CAP: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    GUNS: [],
    MAX_CHILDREN: 0,
    BODY: {
        ACCELERATION: 1,
        SPEED: 0,
        HEALTH: 1,
        RESIST: 1,
        SHIELD: 0,
        REGEN: 0,
        DAMAGE: 1,
        PENETRATION: 1,
        RANGE: 0,
        FOV: 1,
        DENSITY: 1,
        STEALTH: 1,
        PUSHABILITY: 1,
        HETERO: 2,
    },
    FOOD: {
        LEVEL: -1,
    },
};
// FOOD
exports.food = {
    TYPE: 'food',
    DAMAGE_CLASS: 1,
    CONTROLLERS: ['moveInCircles'],
    HITS_OWN_TYPE: 'repel',
    MOTION_TYPE: 'drift',
    FACING_TYPE: 'turnWithSpeed',
    VARIES_IN_SIZE: true,
    BODY: {
        STEALTH: 30,
        PUSHABILITY: 1,
    },
    GUNS: [],
    TURRETS: [],
    DAMAGE_EFFECTS: false,
    RATEFFECTS: false,
    HEALTH_WITH_LEVEL: false,
};

const basePolygonDamage = 1;
const basePolygonHealth = 2;

exports.hugePentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 5,
    },
    LABEL: 'Alpha Pentagon',
    VALUE: 15000,
    SHAPE: -5,
    SIZE: 58,
    COLOR: 14,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 80,
        HEALTH: 300 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        SHIELD: 40 * basePolygonHealth,
        REGEN: 0.6,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
//exports.autoAlphaPent = makeHybrid(exports.pentagon);
exports.bigPentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 4,
    },
    LABEL: 'Beta Pentagon',
    VALUE: 2500,
    SHAPE: 5,
    SIZE: 30,
    COLOR: 14,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 30,
        HEALTH: 50 * basePolygonHealth,
        RESIST: Math.pow(1.25, 2),
        SHIELD: 20 * basePolygonHealth,
        REGEN: 0.2,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.pentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 3,
    },
    LABEL: 'Pentagon',
    VALUE: 400,
    SHAPE: 5,
    SIZE: 16,
    COLOR: 14,
    BODY: {
        DAMAGE: 1.5 * basePolygonDamage,
        DENSITY: 8,
        HEALTH: 10 * basePolygonHealth,
        RESIST: 1.25,
        PENETRATION: 1.1,
    },
    DRAW_HEALTH: true,
};
exports.triangle = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 2,
    },
    LABEL: 'Triangle',
    VALUE: 120,
    SHAPE: 3,
    SIZE: 9,
    COLOR: 2,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 6,
        HEALTH: 3 * basePolygonHealth,
        RESIST: 1.15,
        PENETRATION: 1.5,
    },
    DRAW_HEALTH: true,
};
exports.square = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 1,
    },
    LABEL: 'Square',
    VALUE: 30,
    SHAPE: 4,
    SIZE: 10,
    COLOR: 13,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 4,
        HEALTH: basePolygonHealth,
        PENETRATION: 2,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
};
exports.egg = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 0,
    },
    LABEL: 'Egg',
    VALUE: 10,
    SHAPE: 0,
    SIZE: 5,
    COLOR: 6,
    INTANGIBLE: true,
    BODY: {
        DAMAGE: 0,
        DENSITY: 2,
        HEALTH: 0.0011,
        PUSHABILITY: 0,
    },
    DRAW_HEALTH: false,
};
exports.greenpentagon = {
    PARENT: [exports.food],
    LABEL: 'Pentagon',
    VALUE: 30000,
    SHAPE: 5,
    SIZE: 16,
    COLOR: 1,
    BODY: {
        DAMAGE: 3,
        DENSITY: 8,
        HEALTH: 200,
        RESIST: 1.25,
        PENETRATION: 1.1,
    },
    DRAW_HEALTH: true,
};
exports.greentriangle = {
    PARENT: [exports.food],
    LABEL: 'Triangle',
    VALUE: 7000,
    SHAPE: 3,
    SIZE: 9,
    COLOR: 1,
    BODY: {
        DAMAGE: 1,
        DENSITY: 6,
        HEALTH: 60,
        RESIST: 1.15,
        PENETRATION: 1.5,
    },
    DRAW_HEALTH: true,
};
exports.greensquare = {
    PARENT: [exports.food],
    LABEL: 'Square',
    VALUE: 2000,
    SHAPE: 4,
    SIZE: 10,
    COLOR: 1,
    BODY: {
        DAMAGE: 0.5,
        DENSITY: 4,
        HEALTH: 20,
        PENETRATION: 2,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
};
exports.gem = {
    PARENT: [exports.food],
    LABEL: 'Gem',
    VALUE: 2000,
    SHAPE: 6,
    SIZE: 5,
    COLOR: 0,
    BODY: {
        DAMAGE: basePolygonDamage / 4,
        DENSITY: 4,
        HEALTH: 10,
        PENETRATION: 2,
        RESIST: 2,
        PUSHABILITY: 0.25,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
};
exports.obstacle = {
    TYPE: 'wall',
    DAMAGE_CLASS: 1,
    LABEL: 'Rock',
    FACING_TYPE: 'turnWithSpeed',
    SHAPE: -9,
    BODY: {
        PUSHABILITY: 0,
        HEALTH: 10000,
        SHIELD: 10000,
        REGEN: 1000,
        DAMAGE: 1,
        RESIST: 100,
        STEALTH: 1,
    },
    GUNS: [],
    TURRETS: [],
    VALUE: 0,
    SIZE: 60,
    COLOR: 16,
    VARIES_IN_SIZE: true,
    GIVE_KILL_MESSAGE: true,
    ACCEPTS_SCORE: false,
    DIE_AT_RANGE: true,
};
exports.babyObstacle = {
    PARENT: [exports.obstacle],
    SIZE: 25,
    SHAPE: -7,
    LABEL: "Gravel",
};

// WEAPONS
const wepHealthFactor = 0.5;
const wepDamageFactor = 1.5;

exports.bullet = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.gbulletfast = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    PERSISTS_AFTER_DEATH: true,
    SHAPE: 4,
    MOTION_TYPE: 'grow',
    BODY: {
        PENETRATION: 1,
        SPEED: 4,
        RANGE: 50,
        SHAPE: 4,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.sbulletfast = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    PERSISTS_AFTER_DEATH: true,
    SHAPE: 4,
    MOTION_TYPE: 'shrink',
    BODY: {
        PENETRATION: 1,
        SPEED: 4,
        RANGE: 50,
        SHAPE: 4,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.poisonEffect = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    COLOR: 11,
    SIZE: 5,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 10,
        DENSITY: 1.25,
        HEALTH: 1,
        DAMAGE: 0,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.hibullet = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    SHAPE: 0,
    BODY: {
        PENETRATION: 0.7,
        SPEED: 0.01,
        RANGE: 50,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    MOTION_TYPE: 'accel',
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.cbullet = {
    LABEL: 'lol',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    FACING_TYPE: 'turnWithSpeed',
    SHAPE: 2,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.casing = {
    PARENT: [exports.bullet],
    LABEL: 'Shell',
    TYPE: 'swarm',
};

exports.swarm = {
    LABEL: 'Swarm Drone',
    TYPE: 'swarm',
    ACCEPTS_SCORE: false,
    SHAPE: 3,
    MOTION_TYPE: 'swarm',
    FACING_TYPE: 'smoothWithMotion',
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    CRAVES_ATTENTION: true,
    BODY: {
        ACCELERATION: 3,
        PENETRATION: 1.5,
        HEALTH: 0.35 * wepHealthFactor,
        DAMAGE: 1.5 * wepDamageFactor,
        SPEED: 4.5,
        RESIST: 1.6,
        RANGE: 225,
        DENSITY: 12,
        PUSHABILITY: 0.5,
        FOV: 1.5,
    },
    DIE_AT_RANGE: true,
    BUFF_VS_FOOD: true,
};
exports.battleswarm = {
    LABEL: 'Swarm Drone',
    TYPE: 'swarm',
    ACCEPTS_SCORE: false,
    SHAPE: 3,
    MOTION_TYPE: 'swarm',
    FACING_TYPE: 'smoothWithMotion',
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    CRAVES_ATTENTION: true,
    BODY: {
        ACCELERATION: 3,
        PENETRATION: 1.5,
        HEALTH: 0.35 * wepHealthFactor,
        DAMAGE: 1.5 * wepDamageFactor,
        SPEED: 4.5,
        RESIST: 1.6,
        RANGE: 250,
        DENSITY: 12,
        PUSHABILITY: 0.5,
        FOV: 1.5,
    },
    DIE_AT_RANGE: true,
    BUFF_VS_FOOD: true,
};
exports.bee = {
    PARENT: [exports.swarm],
    PERSISTS_AFTER_DEATH: true,
    SHAPE: 4,
    LABEL: 'Drone',
    HITS_OWN_TYPE: 'hardWithBuffer',
};
exports.autoswarm = {
    PARENT: [exports.swarm],
    AI: {
        FARMER: true,
    },
    INDEPENDENT: true,
};

exports.trap = {
    LABEL: 'Thrown Trap',
    TYPE: 'trap',
    ACCEPTS_SCORE: false,
    SHAPE: -3,
    MOTION_TYPE: 'glide', // def
    FACING_TYPE: 'turnWithSpeed',
    HITS_OWN_TYPE: 'push',
    DIE_AT_RANGE: true,
    BODY: {
        HEALTH: 1 * wepHealthFactor,
        DAMAGE: 2 * wepDamageFactor,
        RANGE: 450,
        DENSITY: 2.5,
        RESIST: 2.5,
        SPEED: 0,
    },
};
exports.trap2 = {
    LABEL: 'Thrown Trap',
    TYPE: 'trap',
    ACCEPTS_SCORE: false,
    SHAPE: -3,
    MOTION_TYPE: 'glide', // def
    FACING_TYPE: 'turnWithSpeed',
    HITS_OWN_TYPE: 'push',
    DIE_AT_RANGE: true,
    BODY: {
        HEALTH: 1 * wepHealthFactor,
        DAMAGE: 2 * wepDamageFactor,
        RANGE: 450,
        DENSITY: 2.5,
        RESIST: 2.5,
        SPEED: 0,
    },
};
exports.pentatrap = {
    LABEL: 'Pentabionic Trap',
    TYPE: 'trap',
    ACCEPTS_SCORE: false,
    SHAPE: 5,
    MOTION_TYPE: 'glide', // def
    FACING_TYPE: 'turnWithSpeed',
    HITS_OWN_TYPE: 'push',
    DIE_AT_RANGE: true,
    BODY: {
        HEALTH: 1 * wepHealthFactor,
        DAMAGE: 2 * wepDamageFactor,
        RANGE: 450,
        DENSITY: 2.5,
        RESIST: 2.5,
        SPEED: 0,
    },
};
exports.block = {
    LABEL: 'Set Trap',
    PARENT: [exports.trap],
    SHAPE: -4,
    MOTION_TYPE: 'motor',
    CONTROLLERS: ['goToMasterTarget'],
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
};
exports.boomerang = {
    LABEL: 'Boomerang',
    PARENT: [exports.trap],
    CONTROLLERS: ['boomerang'],
    MOTION_TYPE: 'motor',
    HITS_OWN_TYPE: 'never',
    SHAPE: -5,
    BODY: {
        SPEED: 1.25,
        RANGE: 120,
    },
};
exports.testboomerang = {
    LABEL: 'Boomerang',
    PARENT: [exports.trap],
    MOTION_TYPE: 'motor',
    HITS_OWN_TYPE: 'never',
    SHAPE: -5,
    BODY: {
        SPEED: 1.25,
        RANGE: 120,
    },
    FACING_TYPE: 'turnWithSpeed',
};

exports.drone = {
    LABEL: 'Drone',
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
    SHAPE: 3,
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster'
    ],
    AI: {
        BLIND: true,
    },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.05,
        HEALTH: 0.6 * wepHealthFactor,
        DAMAGE: 1.25 * wepDamageFactor,
        SPEED: 3.8,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.8,
    },
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
};

exports.sunchip = {
    PARENT: [exports.drone],
    SHAPE: 4,
    NECRO: true,
    HITS_OWN_TYPE: 'hard',
    BODY: {
        FOV: 0.5,
    },
    AI: {
        BLIND: true,
        FARMER: true,
    },
    DRAW_HEALTH: false,
};
exports.autosunchip = {
    PARENT: [exports.sunchip],
    AI: {
        BLIND: true,
        FARMER: true,
    },
    INDEPENDENT: true,
};
exports.gunchip = {
    PARENT: [exports.drone],
    SHAPE: -2,
    NECRO: true,
    HITS_OWN_TYPE: 'hard',
    BODY: {
        FOV: 0.5,
    },
    AI: {
        BLIND: true,
        FARMER: true,
    },
    DRAW_HEALTH: false,
};

exports.missile = {
    PARENT: [exports.bullet],
    SHAPE: 0,
    LABEL: 'Missile',
    INDEPENDENT: true,
    VARIES_IN_SIZE: true,
    BODY: {
        RANGE: 120,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [14, 6, 1, 0, -2, 130, 0, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil,

                g.morespeed, g.morespeed
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, {
        POSITION: [14, 6, 1, 0, 2, 230, 0, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil,

                g.morespeed, g.morespeed
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, ],
};
exports.dmissile = {
    PARENT: [exports.missile],
    SHAPE: 0,
    LABEL: 'Duplicator Missile',
    INDEPENDENT: true,
    VARIES_IN_SIZE: true,
    BODY: {
        RANGE: 120,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [14, 6, 1, 0, -2, 130, 0, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil,

                g.morespeed, g.morespeed
            ]),
            TYPE: [exports.missile, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, {
        POSITION: [14, 6, 1, 0, 2, 230, 0, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil,

                g.morespeed, g.morespeed
            ]),
            TYPE: [exports.missile, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, ],
};
exports.dmissile2 = {
    PARENT: [exports.missile],
    SHAPE: 0,
    LABEL: 'Duplicator Missile',
    INDEPENDENT: true,
    VARIES_IN_SIZE: true,
    BODY: {
        RANGE: 120,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [14, 6, 1, 0, -2, 130, 0, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil,

                g.morespeed, g.morespeed
            ]),
            TYPE: [exports.dmissile, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, {
        POSITION: [14, 6, 1, 0, 2, 230, 0, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil,

                g.morespeed, g.morespeed
            ]),
            TYPE: [exports.dmissile, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, ],
};
exports.gmissile = {
    PARENT: [exports.gbulletfast],
    SHAPE: 0,
    LABEL: 'Missile',
    INDEPENDENT: true,
    VARIES_IN_SIZE: true,
    BODY: {
        RANGE: 120,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
       POSITION: [14, 6, 1, 0, -2, 130, 0, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil,

                g.morespeed, g.morespeed
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, {
        POSITION: [14, 6, 1, 0, 2, 230, 0, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil,

                g.morespeed, g.morespeed
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, ],
};
exports.smissile = {
    PARENT: [exports.sbulletfast],
    SHAPE: 0,
    LABEL: 'Missile',
    INDEPENDENT: true,
    VARIES_IN_SIZE: true,
    BODY: {
        RANGE: 120,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [14, 6, 1, 0, -2, 130, 0, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil,

                g.morespeed, g.morespeed
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, {
        POSITION: [14, 6, 1, 0, 2, 230, 0, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil,

                g.morespeed, g.morespeed
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, ],
};
exports.missilefuj = {
    PARENT: [exports.bullet],
    SHAPE: 0,
    LABEL: 'Missile',
    INDEPENDENT: true,
    VARIES_IN_SIZE: true,
    BODY: {
        RANGE: 120,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [14, 6, 1, 0, -2, 130, 0, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil,

                g.morespeed, g.morespeed
            ]),
            TYPE: [exports.missile, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, {
        POSITION: [14, 6, 1, 0, 2, 230, 0, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil,

                g.morespeed, g.morespeed
            ]),
            TYPE: [exports.missile, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, ],
};
exports.missilefuj2 = {
    PARENT: [exports.bullet],
    SHAPE: 0,
    LABEL: 'Missile',
    INDEPENDENT: true,
    VARIES_IN_SIZE: true,
    BODY: {
        RANGE: 120,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [14, 6, 1, 0, -2, 130, 0, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil,

                g.morespeed, g.morespeed
            ]),
            TYPE: [exports.missilefuj, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, {
        POSITION: [14, 6, 1, 0, 2, 230, 0, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil,

                g.morespeed, g.morespeed
            ]),
            TYPE: [exports.missilefuj, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, ],
};
exports.missilex = {
    PARENT: [exports.bullet],
    SHAPE: -8,
    LABEL: 'Missile',
    INDEPENDENT: true,
    VARIES_IN_SIZE: true,
    BODY: {
        RANGE: 120,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [14, 6, 1, 0, -2, 135, 0.5, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.highrecoil2]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, {
        POSITION: [14, 6, 1, 0, 2, -135, 0, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.highrecoil2]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, ],
};
exports.missilea = {
    PARENT: [exports.bullet],
    SHAPE: 0,
    LABEL: 'Missile',
    INDEPENDENT: true,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['goToMasterTarget', 'spin'],
    BODY: {
        RANGE: 280,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [14, 6, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil,

                g.osht
            ]),
            TYPE: [exports.hibullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, ],
};
exports.sunmissile = {
    PARENT: [exports.bullet],
    SHAPE: 0,
    LABEL: 'Missile',
    INDEPENDENT: true,
    VARIES_IN_SIZE: true,
    SIZE: 40,
    BODY: {
        RANGE: 120,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [14, 6, 1, 0, -2, 130, 0, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil,

                g.morespeed, g.morespeed
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, {
        POSITION: [14, 6, 1, 0, 2, 230, 0, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil,

                g.morespeed, g.morespeed
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, ],
};
exports.missilespin1 = {
    PARENT: [exports.bullet],
    SHAPE: 0,
    LABEL: 'Missile',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [14, 6, 1, 0, -2, 130, 5, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil,

                g.morespeed, g.morespeed
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, {
        POSITION: [14, 6, 1, 0, 2, 230, 0, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil,

                g.morespeed, g.morespeed
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, ],
};
exports.missilespin2 = {
    PARENT: [exports.bullet],
    SHAPE: 0,
    LABEL: 'Missile',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [14, 6, 1, 0, -2, 130, 0, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil,

                g.morespeed, g.morespeed
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, {
        POSITION: [14, 6, 1, 0, 2, 230, 5, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil,

                g.morespeed, g.morespeed
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, ],
};
exports.essencemissile = {
    PARENT: [exports.bullet],
    SHAPE: 3,
    LABEL: 'Missile',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [3, 10, 1, 0, 0, 180, 0, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.doublereload, g.lowpower, g.muchmorerecoil, g.rng]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, ],
};
exports.testmissile2 = {
    PARENT: [exports.bullet],
    SHAPE: 0,
    LABEL: 'Missile',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [14, 6, 1, 0, -5, 190, 0, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil,

                g.morespeed, g.morespeed
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, {
        POSITION: [14, 6, 1, 0, 5, -190, 0, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil,

                g.morespeed, g.morespeed
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, {
        POSITION: [14, 6, 1, 0, -5, 230, 0.1, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil,

                g.morespeed, g.morespeed
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, {
        POSITION: [14, 6, 1, 0, 5, -230, 0.1, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil,

                g.morespeed, g.morespeed
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, {
        POSITION: [14, 6, 1, 0, -5, 270, 0.2, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil,

                g.morespeed, g.morespeed
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, {
        POSITION: [14, 6, 1, 0, 5, -270, 0.2, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil,

                g.morespeed, g.morespeed
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, ],
};

exports.testmissile3 = {
    PARENT: [exports.bullet],
    SHAPE: 0,
    LABEL: 'Missile',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [14, 6, 0.5, 0, 0, 180, 0, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil,

                g.morespeed, g.morespeed
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, ],
};

exports.hypermissile = {
    PARENT: [exports.missile],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [14, 6, 1, 0, -2, 150, 0, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil,

                g.morespeed
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, {
        POSITION: [14, 6, 1, 0, 2, 210, 0, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil,

                g.morespeed
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, {
        POSITION: [14, 6, 1, 0, -2, 90, 0.5, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil,

                g.morespeed
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
        },
    }, {
        POSITION: [14, 6, 1, 0, 2, 270, 0.5, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil,

                g.morespeed
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
        },
    }, ],
};
exports.testmissile = {
    PARENT: [exports.bullet],
    SHAPE: 0,
    LABEL: 'Missile',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [14, 9, 1, 0, 0, -200, 0, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.doublereload, g.lowpower,

                g.muchmorerecoil, g.morespeed, g.morespeed
            ]),
            TYPE: [exports.trap, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, {
        POSITION: [14, 9, 1, 0, 0, 200, 0, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.doublereload, g.lowpower,

                g.muchmorerecoil, g.morespeed, g.morespeed
            ]),
            TYPE: [exports.trap, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, {
        POSITION: [14, 6, 1, 0, 0, 205, 0.1, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.doublereload, g.lowpower,

                g.muchmorerecoil, g.morespeed, g.morespeed
            ]),
            TYPE: [exports.trap, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, {
        POSITION: [14, 6, 1, 0, 0, -205, 0.1, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.doublereload, g.lowpower,

                g.muchmorerecoil, g.morespeed, g.morespeed
            ]),
            TYPE: [exports.trap, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, {
        POSITION: [14, 3, 1, 0, 0, 210, 0.2, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.doublereload, g.lowpower,

                g.muchmorerecoil, g.morespeed, g.morespeed
            ]),
            TYPE: [exports.trap, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, {
        POSITION: [14, 3, 1, 0, 0, -210, 0.2, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.doublereload, g.lowpower,

                g.muchmorerecoil, g.morespeed, g.morespeed
            ]),
            TYPE: [exports.trap, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, ],
};
exports.boosterspawn = {
    PARENT: [exports.bullet],
    SHAPE: 0,
    LABEL: 'Missile',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.lowpower, g.muchmorerecoil, g.morespeed,

                g.morespeed
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
        },
    }, {
        POSITION: [13, 8, 1, 0, 0, 135, 0.6, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.lowpower, g.muchmorerecoil, g.morespeed,

                g.morespeed
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, {
        POSITION: [14, 8, 1, 0, 0, 225, 0.6, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.lowpower, g.muchmorerecoil, g.morespeed,

                g.morespeed
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, {
        POSITION: [14, 8, 1, 0, 0, 145, 0.1, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.lowpower, g.muchmorerecoil, g.morespeed,

                g.morespeed
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, {
        POSITION: [14, 8, 1, 0, 0, 215, 0.1, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.lowpower, g.muchmorerecoil, g.morespeed,

                g.morespeed
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, ],
};
exports.snake = {
    PARENT: [exports.bullet],
    LABEL: 'Snake',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [6, 12, 1.4, 8, 0, 180, 0, ],
        PROPERTIES: {
            AUTOFIRE: true,
            STAT_CALCULATOR: gunCalcNames.thruster,
            SHOOT_SETTINGS: combineStats([
                g.basic, g.sniper, g.hunter, g.hunter2, g.snake, g.snakeskin,
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
        },
    }, {
        POSITION: [10, 12, 0.8, 8, 0, 180, 0.5, ],
        PROPERTIES: {
            AUTOFIRE: true,
            NEGATIVE_RECOIL: true,
            STAT_CALCULATOR: gunCalcNames.thruster,
            SHOOT_SETTINGS: combineStats([
                g.basic, g.sniper, g.hunter, g.hunter2, g.snake,
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
        },
    }, ],
};
exports.hive = {
    PARENT: [exports.bullet],
    LABEL: 'Hive',
    BODY: {
        RANGE: 90,
        FOV: 0.5,
    },
    FACING_TYPE: 'turnWithSpeed',
    INDEPENDENT: true,
    CONTROLLERS: ['alwaysFire', 'nearestDifferentMaster', 'targetSelf', ],
    AI: {
        NO_LEAD: true,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [7, 9.5, 0.6, 7, 0, 108, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
            TYPE: exports.bee,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [7, 9.5, 0.6, 7, 0, 180, 0.2, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
            TYPE: exports.bee,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [7, 9.5, 0.6, 7, 0, 252, 0.4, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
            TYPE: exports.bee,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [7, 9.5, 0.6, 7, 0, 324, 0.6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
            TYPE: exports.bee,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [7, 9.5, 0.6, 7, 0, 36, 0.8, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees, g.op]),
            TYPE: exports.bee,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, ],
}

exports.hivet = {
    PARENT: [exports.bullet],
    LABEL: 'Hive',
    BODY: {
        RANGE: 90,
        FOV: 0.1,
    },
    CONTROLLERS: ['nearestDifferentMaster', 'targetSelf'],
    AI: {
        NO_LEAD: true,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [7, 9.5, 0.6, 7, 0, 108, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.swarm, g.hive, g.bees]),
            TYPE: exports.bee,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [7, 9.5, 0.6, 7, 0, 180, 0.2, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.swarm, g.hive, g.bees]),
            TYPE: exports.bee,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [7, 9.5, 0.6, 7, 0, 252, 0.4, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.swarm, g.hive, g.bees]),
            TYPE: exports.bee,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [7, 9.5, 0.6, 7, 0, 324, 0.6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.swarm, g.hive, g.bees]),
            TYPE: exports.bee,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [7, 9.5, 0.6, 7, 0, 36, 0.8, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.swarm, g.hive, g.bees, g.op]),
            TYPE: exports.bee,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, ],
}

// TANK CLASSES
const base = {
    ACCEL: 1.6,
    SPEED: 5.25,
    HEALTH: 20,
    DAMAGE: 3,
    RESIST: 1,
    PENETRATION: 1.05,
    SHIELD: 8,
    REGEN: 0.025,
    FOV: 1,
    DENSITY: 0.5,
};
exports.genericTank = {
    LABEL: 'Unknown Class',
    TYPE: 'tank',
    DAMAGE_CLASS: 2,
    DANGER: 5,
    MOTION_TYPE: 'motor',

    FACING_TYPE: 'toTarget',
    SIZE: 12,
    INVISIBLE: [0, 0],
    MAX_CHILDREN: 0,
    DAMAGE_EFFECTS: false,
    BODY: { // def
        ACCELERATION: base.ACCEL,
        SPEED: base.SPEED,
        HEALTH: base.HEALTH,
        DAMAGE: base.DAMAGE,
        PENETRATION: base.PENETRATION,
        SHIELD: base.SHIELD,
        REGEN: base.REGEN,
        FOV: base.FOV,
        DENSITY: base.DENSITY,
        PUSHABILITY: 0.9,
        HETERO: 3,
    },
    GUNS: [],
    TURRETS: [],
    GIVE_KILL_MESSAGE: true,
    DRAW_HEALTH: true
};
exports.fastdrone = {
    PARENT: [exports.drone],
    LABEL: 'Speed Drone',
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
    SHAPE: 3,
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster'
    ],
    AI: { BLIND: true, },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.05,
        HEALTH: 0.6 * wepHealthFactor,
        DAMAGE: 1.25 * wepDamageFactor,
        SPEED: 3.8,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.8,
    },
    GUNS: [ {  /*** LENGTH    WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [    15,       15,      1.6,    8,      0,     180,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.tonsmorrecoil]),
                TYPE: exports.bullet,
            },
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: false,
    BUFF_VS_FOOD: true,
    },
  ],
};
let gun = {};

exports.autoTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.8
    },
    COLOR: 16,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [22, 10, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.odTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.8
    },
    COLOR: 16,
    SHAPE: 4
    //CONTROLLERS: ['nearestDifferentMaster'],
};
exports.generalt = {
PARENT:[exports.genericTank],
LABEL: 'Turret',
BODY: {
     FOV: 0.8
},
COLOR: 16,
SHAPE: 3,
};

exports.oddrone = makeAuto(exports.drone, 'Auto-Drone', {
    type: exports.heavy3gun,
    size: 15,
});
exports.autotrap = makeAuto(exports.trap, 'Auto-Trap', {
    type: exports.heavy3gun,
    size: 15,
});
exports.odswarm = makeAuto(exports.swarm, 'Auto-Swarm', {
    type: exports.heavy3gun,
    size: 15,
});

exports.miniturret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 1
    },
    COLOR: 16,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [22, 10, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.mini]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [24, 10, 1, 0, 0, 0, 0.3333, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.mini]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [22, 10, 1, 0, 0, 0, 0.66667, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.mini]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.sniperturret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 1.15
    },
    COLOR: 16,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [26, 10, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.sniper]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.machineAutoTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    COLOR: 16,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [14, 11, 1.3, 8, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.mach, g.slow]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.autoSmasherTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    COLOR: 16,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [20, 6, 1, 0, 5, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.fast, g.mach,

                g.pound, g.morereload, g.morereload
            ]),
            TYPE: exports.bullet,
            STAT_CALCULATOR: gunCalcNames.fixedReload,
        },
    }, {
        POSITION: [20, 6, 1, 0, -5, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.fast, g.mach,

                g.pound, g.morereload, g.morereload
            ]),
            TYPE: exports.bullet,
            STAT_CALCULATOR: gunCalcNames.fixedReload,
        },
    }, ],
};
exports.oldAutoSmasherTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    COLOR: 16,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [20, 7, 1, 0, -5.75, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.lotsmorrecoil, g.morereload]),
            TYPE: exports.bullet,
            STAT_CALCULATOR: gunCalcNames.fixedReload,
        },
    }, {
        POSITION: [20, 7, 1, 0, 5.75, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.lotsmorrecoil, g.morereload]),
            TYPE: exports.bullet,
            STAT_CALCULATOR: gunCalcNames.fixedReload,
        },
    }, ],
};

exports.auto3gun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
    COLOR: 16,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [22, 10, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto]),
            TYPE: exports.bullet,
        },
    }],
};
exports.auto5gun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
    COLOR: 16,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [24, 11, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.five]),
            TYPE: exports.bullet,
        },
    }],
};
exports.heavy3gun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 2,
        SPEED: 0.9,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
    COLOR: 16,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [22, 14, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.auto]),
            TYPE: exports.bullet,
        },
    }],
};
exports.masterGun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: ['nearestDifferentMaster'],
    COLOR: 16,
    MAX_CHILDREN: 6,
    AI: {
        NO_LEAD: true,
        SKYNET: true,
        FULL_VIEW: true,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [8, 14, 1.3, 8, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.master]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
        },
    }, ],
};
exports.sniper3gun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 5,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
    COLOR: 16,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [27, 9, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.auto, g.assass, g.autosnipe]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [5, 9, -1.5, 8, 0, 0, 0, ],
    }, ],
};
exports.bansheegun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
    COLOR: 16,
    INDEPENDENT: true,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [26, 10, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.lessreload]),
            TYPE: exports.bullet,
        },
    }],
};
exports.auto4gun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 2,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
    COLOR: 16,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [16, 4, 1, 0, -3.5, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [16, 4, 1, 0, 3.5, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
            TYPE: exports.bullet,
        },
    }],
};
exports.auto4invisgun = {
    PARENT: [exports.genericTank],
    LABEL: '',

    BODY: {
        FOV: 2,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
    COLOR: 16,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [16, 4, 1, 0, -3.5, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [16, 4, 1, 0, 3.5, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
            TYPE: exports.bullet,
        },
    }],
};
exports.bigauto4gun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
    COLOR: 16,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [14, 5, 1, 0, -4.5, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [14, 5, 1, 0, 4.5, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [16, 5, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
            TYPE: exports.bullet,
        },
    }],
};

exports.tritrapgun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [20, 16, 1, 0, 0, 0, 0, ],
    }, {
        POSITION: [2, 16, 1.1, 20, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.auto]),
            TYPE: exports.block,
        },
    }, ],
};
exports.smasherBody = {
    LABEL: '',
    CONTROLLERS: ['spin'],
    COLOR: 9,
    SHAPE: 6,
    INDEPENDENT: true,
};
exports.octoBody = {
    LABEL: '',
    CONTROLLERS: ['spin'],
    COLOR: 9,
    SHAPE: 8,
    INDEPENDENT: true,
};
exports.spikeBody = {
    LABEL: '',
    CONTROLLERS: ['spin'],
    COLOR: 9,
    SHAPE: -4,
    INDEPENDENT: true,
};
exports.spikeBody1 = {
    LABEL: '',
    CONTROLLERS: ['fastspin'],
    COLOR: 9,
    SHAPE: 3,
    INDEPENDENT: true,
};
exports.spikeBody2 = {
    LABEL: '',
    CONTROLLERS: ['reversespin'],
    COLOR: 9,
    SHAPE: 3,
    INDEPENDENT: true,
};
exports.megasmashBody = {
    LABEL: '',
    CONTROLLERS: ['spin'],
    COLOR: 9,
    SHAPE: -6,
    INDEPENDENT: true,
};
exports.baseBody = {
    LABEL: '',
    CONTROLLERS: ['dontTurn'],
    COLOR: 9,
    SHAPE: 8,
    INDEPENDENT: true,
};
exports.dominationBody = {
    LABEL: '',
    CONTROLLERS: ['dontTurn'],
    COLOR: 9,
    SHAPE: 6,
    INDEPENDENT: true,
};
exports.dominationBody2 = {
    LABEL: '',
    CONTROLLERS: ['dontTurn'],
    COLOR: 9,
    SHAPE: 10,
    INDEPENDENT: true,
};
exports.lanceredge = {
    LABEL: '',
    COLOR: 9,
    SHAPE: 3,
    INDEPENDENT: true,
};
exports.baseSwarmTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Protector',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    CONTROLLERS: ['nearestDifferentMaster'],
    AI: {
        NO_LEAD: true,
        LIKES_SHAPES: true,
    },
    INDEPENDENT: true,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [5, 4.5, 0.6, 7, 2, 0, 0.15, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [5, 4.5, 0.6, 7, -2, 0, 0.15, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [5, 4.5, 0.6, 7.5, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
            TYPE: [exports.swarm, {
                INDEPENDENT: true,
                AI: {
                    LIKES_SHAPES: true,
                },
            }, ],
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }],
};
exports.baseGunTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Protector',
    BODY: {
        FOV: 5,
    },
    ACCEPTS_SCORE: false,
    CONTROLLERS: ['nearestDifferentMaster'],
    INDEPENDENT: true,
    COLOR: 16,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [12, 12, 1, 6, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.destroy]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [11, 13, 1, 6, 0, 0, 0.1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.destroy]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [7, 13, -1.3, 6, 0, 0, 0, ],
    }],
};
exports.baseProtector = {
    PARENT: [exports.genericTank],
    LABEL: 'Base',
    SIZE: 64,
    DAMAGE_CLASS: 0,
    ACCEPTS_SCORE: false,
    CAN_BE_ON_LEADERBOARD: false,
    SKILL: skillSet({
        rld: 1,
        dam: 1,
        pen: 1,
        spd: 1,
        str: 1,
    }),
    BODY: { // def
        SPEED: 0,
        HEALTH: 10000,
        DAMAGE: 10,
        PENETRATION: 0.25,
        SHIELD: 1000,
        REGEN: 100,
        FOV: 1,
        PUSHABILITY: 0,
        HETERO: 0,
    },
    //CONTROLLERS: ['nearestDifferentMaster'],
    FACING_TYPE: 'autospin',
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [25, 0, 0, 0, 360, 0],
        TYPE: exports.baseBody,
    }, {
        POSITION: [12, 7, 0, 45, 100, 0],
        TYPE: exports.baseSwarmTurret,
    }, {
        POSITION: [12, 7, 0, 135, 100, 0],
        TYPE: exports.baseSwarmTurret,
    }, {
        POSITION: [12, 7, 0, 225, 100, 0],
        TYPE: exports.baseSwarmTurret,
    }, {
        POSITION: [12, 7, 0, 315, 100, 0],
        TYPE: exports.baseSwarmTurret,
    }, ],
    GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
        POSITION: [4.5, 11.5, -1.3, 6, 0, 45, 0, ],
    }, {
        POSITION: [4.5, 11.5, -1.3, 6, 0, 135, 0, ],
    }, {
        POSITION: [4.5, 11.5, -1.3, 6, 0, 225, 0, ],
    }, {
        POSITION: [4.5, 11.5, -1.3, 6, 0, 315, 0, ],
    }, {
        POSITION: [4.5, 8.5, -1.5, 7, 0, 45, 0, ],
    }, {
        POSITION: [4.5, 8.5, -1.5, 7, 0, 135, 0, ],
    }, {
        POSITION: [4.5, 8.5, -1.5, 7, 0, 225, 0, ],
    }, {
        POSITION: [4.5, 8.5, -1.5, 7, 0, 315, 0, ],
    }, ],
};

exports.minion = {
    PARENT: [exports.genericTank],
    LABEL: 'Minion',
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'
    ],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [17, 9, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minion]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        },
    }, ],
};
exports.smashminion = {
    PARENT: [exports.genericTank],
    LABEL: 'Minion',
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'
    ],
    //CONTROLLERS: ['nearestDifferentMaster'],
    TURRETS: [{
        POSITION: [21.5, 0, 0, 0, 360, 0],
        TYPE: exports.smasherBody
    }],
        };
exports.hewnminion = {
    PARENT: [exports.genericTank],
    LABEL: 'Minion',
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
        LEVEL: 45,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'
    ],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [19, 8, 1, 0, 5.5, 25, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 8, 1, 0, -5.5, -25, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [20, 8, 1, 0, 5.5, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [20, 8, 1, 0, -5.5, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [20, 8, 1, 0, 5.5, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [20, 8, 1, 0, -5.5, 180, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.selfspawner = {
    PARENT: [exports.genericTank],
    LABEL: 'Self Spawner',
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'
    ],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [17, 9, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.factory]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.selfspawner,
        },
    }, ],
};
exports.minion2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Minion',
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'
    ],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [17, 9, 1, 0, 0, -45, 0.2, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minion]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [17, 9, 1, 0, 0, 45, 0.2, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minion]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [17, 9, 1, 0, 0, 22.5, 0.1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minion]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [17, 9, 1, 0, 0, -22.5, 0.1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minion]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [17, 9, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minion]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        },
    }, ],
};
exports.miniontest = {
    PARENT: [exports.genericTank],
    LABEL: 'TESTBED Minion',
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'
    ],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [17, 9, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minion]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.trap,
        },
    }, ],
};
exports.miniontest = makeAuto(exports.miniontest, 'TESTBED minion', {
    type: exports.oldAuto4Turret,
    size: 10,
});
exports.pillboxTurret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [22, 11, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.turret, g.power, g.auto, g.notdense]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.pillboxTurret2 = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [10, 14, -0.5, 9, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
            TYPE: exports.hypermissile,
        },
    }, {
        POSITION: [17, 15, 1, 0, 0, 0, 0, ],
    }, ],
};
exports.pillbox = {
    LABEL: 'Pillbox',
    PARENT: [exports.trap],
    SHAPE: -4,
    MOTION_TYPE: 'motor',
    CONTROLLERS: ['goToMasterTarget', 'nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
        RANGE: 1260,
    },
    DIE_AT_RANGE: true,
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC  LAYER*/
        POSITION: [11, 0, 0, 0, 360, 1],
        TYPE: exports.pillboxTurret,
    }]
};
exports.pillbox2 = {
    LABEL: 'Pilltestbox',
    PARENT: [exports.trap],
    SHAPE: 5,
    MOTION_TYPE: 'motor',
    CONTROLLERS: ['goToMasterTarget', 'nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 4,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true,
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [14, 0, 0, 0, 360, 1],
        TYPE: exports.pillboxTurret2,
    }, ]
};
exports.skimturret = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: base.FOV * 2,
    },
    COLOR: 2,
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
    LABEL: '',
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [10, 14, -0.5, 9, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
            TYPE: exports.hypermissile,
        },
    }, {
        POSITION: [17, 15, 1, 0, 0, 0, 0, ],
    }, ],
};


function makeAuto(type, name = -1, options = {}) {
    let turret = {
        type: exports.autoTurret,
        size: 10,
        independent: true,
    };
    if (options.type != null) {
        turret.type = options.type;
    }
    if (options.size != null) {
        turret.size = options.size;
    }
    if (options.independent != null) {
        turret.independent = options.independent;
    }

    let output = JSON.parse(JSON.stringify(type));
    let autogun = {
        /*********  SIZE               X       Y     ANGLE    ARC */
        POSITION: [turret.size, 0, 0, 180, 360, 1, ],
        TYPE: [turret.type, {
            CONTROLLERS: ['nearestDifferentMaster'],
            INDEPENDENT: turret.independent,
        }],
    };
    if (type.GUNS != null) {
        output.GUNS = type.GUNS;
    }
    if (type.TURRETS == null) {
        output.TURRETS = [autogun];
    } else {
        output.TURRETS = [...type.TURRETS, autogun];
    }
    if (name == -1) {
        output.LABEL = 'Auto-' + type.LABEL;
    } else {
        output.LABEL = name;
    }
    output.DANGER = type.DANGER + 1;
    return output;
}

function makeHybrid(type, name = -1) {
    let output = JSON.parse(JSON.stringify(type));
    let spawner = {
        /********* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [7, 12, 1.2, 8, 0, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.weak]),
            TYPE: [exports.drone, {
                INDEPENDENT: true,
            }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: false,
            MAX_CHILDREN: 3,
        },
    };
    if (type.TURRETS != null) {
        output.TURRETS = type.TURRETS;
    }
    if (type.GUNS == null) {
        output.GUNS = [spawner];
    } else {
        output.GUNS = [...type.GUNS, spawner];
    }
    if (name == -1) {
        output.LABEL = 'Hybrid ' + type.LABEL;
    } else {
        output.LABEL = name;
    }
    return output;
}

exports.basic = {
    PARENT: [exports.genericTank],
    LABEL: 'Basic',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
            LABEL: '', // def
            STAT_CALCULATOR: 0, // def
            WAIT_TO_CYCLE: false, // def
            AUTOFIRE: false, // def
            SYNCS_SKILLS: false, // def         
            MAX_CHILDREN: 0, // def  
            ALT_FIRE: false, // def 
            NEGATIVE_RECOIL: false, // def
        },
    }, ],
};
exports.basicpage2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Basic Page 2',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.wither = {
    PARENT: [exports.genericTank],
    LABEL: 'Wither',
    COLOR: 19,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, 270, 0, ],
    }, {
        POSITION: [18, 8, 1, 0, 0, 90, 0, ],
    }, ],
    TURRETS: [{
        POSITION: [11, 0, -20, 0, 360, 1, ],
        TYPE: [exports.auto3gun, {
            COLOR: 19,
        }],
    }, {
        POSITION: [11, 0, 20, 0, 360, 1, ],
        TYPE: [exports.auto3gun, {
            COLOR: 19,
        }]
    }, ],
};
exports.accelerator = {
    PARENT: [exports.genericTank],
    LABEL: 'accel',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 11, 1.3, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.doublereload]),
            TYPE: exports.hibullet,
            LABEL: '', // def
            STAT_CALCULATOR: 0, // def
            WAIT_TO_CYCLE: false, // def
            AUTOFIRE: false, // def
            SYNCS_SKILLS: false, // def         
            MAX_CHILDREN: 0, // def  
            ALT_FIRE: false, // def 
            NEGATIVE_RECOIL: false, // def
        },
    }, ],
};
exports.sine = {
    PARENT: [exports.genericTank],
    LABEL: 'Destruction',
    //CONTROLLERS: ['nearestDifferentMaster'],
    BODY: {
        SPEED: base.SPEED * 7,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [20, 20, 1, 0, 0, -60, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.norng]),
            TYPE: exports.missile,
        },
    }, {
        POSITION: [20, 20, 1, 0, 0, 60, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.norng]),
            TYPE: exports.missile,
        },
    }, {
        POSITION: [20, 20, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.norng]),
            TYPE: exports.missile,
        },
    }, ],
};
exports.builder3 = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    LABEL: 'Rock Climber',
    STAT_NAMES: statnames.trap,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.15
    },
    GUNS: [{
        POSITION: [18, 12, 1, 0, 0, 0, 0]
    }, {
        POSITION: [2, 12, 1.1, 18, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.morespeed, g.morespeed]),
            TYPE: exports.obstacle
        }
    }]
};
exports.testbedParent = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        SHIELD: 1000,
        DAMAGE: 10,
        DENSITY: 20,
        FOV: 8
    },
    GUNS: [{
        POSITION: [18, 10, -1.4, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.op]),
            TYPE: [exports.bullet, {
                SHAPE: 5
            }]
        }
    }]
};
exports.testbed = {
    PARENT: [exports.testbedParent],
    LABEL: 'Dev Mode',
    RESET_UPGRADES: true,
    SKILL_CAP: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    LEVEL: -1
};
exports.testbedboss = {
    PARENT: [exports.testbedParent],
    LABEL: 'Boss'
};
exports.testbedmisc = {
    PARENT: [exports.testbedParent],
    LABEL: 'Miscellaneous'
};
exports.testbedsentry = {
    PARENT: [exports.testbedParent],
    LABEL: 'Sentry'
};
exports.testbedbossp2 = {
    PARENT: [exports.testbedParent],
    LABEL: 'Boss Page 2'
};
exports.testbedbossp3 = {
    PARENT: [exports.testbedParent],
    LABEL: 'Boss Page 3'
};
exports.testbedmiscp2 = {
    PARENT: [exports.testbedParent],
    LABEL: 'Misc. Page 2'
};
exports.testbedbossp4 = {
    PARENT: [exports.testbedParent],
    LABEL: 'Boss Page 4'
};
exports.testbedm = {
    PARENT: [exports.genericTank],
    LABEL: 'TESTBED',
    TYPE: 'minion',
    BODY: {
        SHIELD: 1000,
        REGEN: 10,
        HEALTH: 100,
        DAMAGE: 10,
        DENSITY: 20,
        FOV: 2
    },
    TURRETS: [],
    GUNS: [{
        POSITION: [18, 10, -1.4, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.op]),
            TYPE: [exports.bullet, {
                SHAPE: 5
            }]
        }
    }],
};
exports.single = {
    PARENT: [exports.genericTank],
    LABEL: 'Single',
    GUNS: [{
        POSITION: [19, 8, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.single]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [5.5, 8, -1.8, 6.5, 0, 0, 0]
    }]
};
exports.magician = {
    PARENT: [exports.genericTank],
    LABEL: 'Magician',
    GUNS: [{
        POSITION: [19, 10, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.single]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [2.25, 8, -1.8, 6.5, 0, 0, 0]
    }, {
        POSITION: [5.5, 8, 1.2, 6.5, 0, 0, 0]
    }]
};
let smshskl = 12;
exports.smash = {
    PARENT: [exports.genericTank],
    LABEL: 'Smasher',
    DANGER: 6,
    BODY: {
        FOV: base.FOV * 1.05,
        DENSITY: base.DENSITY * 2
    },
    TURRETS: [{
        POSITION: [21.5, 0, 0, 0, 360, 0],
        TYPE: exports.smasherBody
    }],
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
    STAT_NAMES: statnames.smasher
};
exports.bonk = {
    PARENT: [exports.genericTank],
    LABEL: 'Bonker',
    DANGER: 6,
    SIZE: 7,
    SHAPE: 0,
    BODY: {
        FOV: base.FOV * 1.05,
        DENSITY: base.DENSITY * 2,
        SPEED: base.SPEED * 3
    },
    TURRETS: [{
        POSITION: [21.5, 0, 0, 0, 360, 0],
        TYPE: exports.smasherBody
    }],
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
    STAT_NAMES: statnames.smasher
};
exports.megasmash = {
    PARENT: [exports.genericTank],
    LABEL: 'Mega-Smasher',
    DANGER: 7,
    BODY: {
        SPEED: base.speed * 1.05,
        FOV: base.FOV * 1.1,
        DENSITY: base.DENSITY * 4,
    },
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl, ],
    STAT_NAMES: statnames.smasher,
    TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [24, 0, 0, 0, 360, 0, ],
        TYPE: exports.megasmashBody,
    }],
};
exports.octosmash = {
    PARENT: [exports.genericTank],
    LABEL: 'Octosmasher',
    DANGER: 7,
    BODY: {
        SPEED: base.speed * 1.05,
        FOV: base.FOV * 1.1,
        DENSITY: base.DENSITY * 4,
    },
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl, ],
    STAT_NAMES: statnames.smasher,
    TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [24, 0, 0, 0, 360, 0, ],
        TYPE: exports.octoBody,
    }],
};
exports.spike = {
    PARENT: [exports.genericTank],
    LABEL: 'Spike',
    DANGER: 7,
    BODY: {
        SPEED: base.speed * 0.9,
        DAMAGE: base.DAMAGE * 1.1,
        FOV: base.FOV * 1.05,
        DENSITY: base.DENSITY * 2,
        HEALTH: base.HEALTH * 40,
    },
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl, ],
    STAT_NAMES: statnames.smasher,
    TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [20.5, 0, 0, 0, 360, 0, ],
        TYPE: exports.spikeBody,
    }, {
        POSITION: [20.5, 0, 0, 120, 360, 0, ],
        TYPE: exports.spikeBody,
    }, {
        POSITION: [20.5, 0, 0, 240, 360, 0, ],
        TYPE: exports.spikeBody,
    }],
};
exports.weirdspike = {
    PARENT: [exports.genericTank],
    LABEL: 'Spike',
    DANGER: 7,
    BODY: {
        DAMAGE: base.DAMAGE * 1.15,
        FOV: base.FOV * 1.05,
        DENSITY: base.DENSITY * 1.5,
    },
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl, ],
    STAT_NAMES: statnames.smasher,
    TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [20.5, 0, 0, 0, 360, 0, ],
        TYPE: exports.spikeBody1,
    }, {
        POSITION: [20.5, 0, 0, 180, 360, 0, ],
        TYPE: exports.spikeBody2,
    }],
};
exports.autosmash = makeAuto(exports.smash, 'Auto-Smasher', {
    type: exports.autoSmasherTurret,
    size: 11,

});
exports.autosmash.SKILL_CAP = [smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl,

    smshskl, smshskl,
];

exports.twin = {
    PARENT: [exports.genericTank],
    LABEL: 'Twin',
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [20, 8, 1, 0, 5.5, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
            TYPE: exports.bullet,
        },
    }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [20, 8, 1, 0, -5.5, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.skimmerspinner = {
    PARENT: [exports.genericTank],
    LABEL: 'haha yes',
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [20, 8, 1, 0, -6, -10, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.twin]),
            TYPE: exports.gmissile,
        },
    }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [20, 8, 1, 0, 6, 10, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.twin]),
            TYPE: exports.gmissile,
        },
    }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [20, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.twin]),
            TYPE: exports.gmissile,
        },
    }, ],
};
exports.gunner = {
    PARENT: [exports.genericTank],
    LABEL: 'Gunner',
    DANGER: 6,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [12, 3.5, 1, 0, 7.25, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [12, 3.5, 1, 0, -7.25, 0, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [16, 3.5, 1, 0, 3.75, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [16, 3.5, 1, 0, -3.75, 0, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.gcruiser = {
    PARENT: [exports.genericTank],
    LABEL: 'Gunner Cruiser',
    DANGER: 6,
    FACING_TYPE: 'locksFacing',
    STAT_NAMES: statnames.swarm,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.2,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [12, 6.5, 0.6, 0, 6.75, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [12, 6.5, 0.6, 0, -6.75, 0, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [16, 6.5, 0.6, 0, 3.50, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [16, 6.5, 0.6, 0, -3.50, 0, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, ],
};
exports.hewnGunner = {
    PARENT: [exports.genericTank],
    LABEL: 'Hewn Gunner',
    DANGER: 7,
    GUNS: [{
        POSITION: [12, 3.5, 1, 0, 7.25, 0, 0.5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.fast]),
            TYPE: exports.bullet,
        }
    }, {
        POSITION: [12, 3.5, 1, 0, -7.25, 0, 0.75],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.fast]),
            TYPE: exports.bullet,
        }
    }, {
        POSITION: [16, 3.5, 1, 0, 3.75, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.fast]),
            TYPE: exports.bullet,
        }
    }, {
        POSITION: [16, 3.5, 1, 0, -3.75, 0, 0.25],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.fast]),
            TYPE: exports.bullet,
        }
    }, {
        POSITION: [14, 3.25, 1, -2, 8, 40, 0.25],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.fast]),
            TYPE: exports.bullet,
        }
    }, {
        POSITION: [14, 3.25, 1, -2, -8, -40, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.fast]),
            TYPE: exports.bullet,
        }
    }]
};
exports.hewnHuntgunner = {
    PARENT: [exports.genericTank],
    LABEL: 'Hewn Hunt Gunner',
    DANGER: 7,
    GUNS: [{
        POSITION: [12, 3.5, 1, 0, 7.25, 0, 0.5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.fast]),
            TYPE: exports.bullet,
        }
    }, {
        POSITION: [12, 3.5, 1, 0, -7.25, 0, 0.75],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.fast]),
            TYPE: exports.bullet,
        }
    }, {
        POSITION: [18, 2.5, 1, 0, 3.75, 0, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [18, 2.5, 1, 0, -3.75, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
            TYPE: exports.bullet,
        }, 
    }, {
        POSITION: [16, 3.5, 1, 0, 3.75, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.fast]),
            TYPE: exports.bullet,
        }
    }, {
        POSITION: [16, 3.5, 1, 0, -3.75, 0, 0.25],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.fast]),
            TYPE: exports.bullet,
        }
    }, {
        POSITION: [14, 3.25, 1, -2, 8, 40, 0.25],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.fast]),
            TYPE: exports.bullet,
        }
    }, {
        POSITION: [14, 3.25, 1, -2, -8, -40, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.fast]),
            TYPE: exports.bullet,
        }
    }]
};
exports.huntGC = {
    PARENT: [exports.genericTank],
    LABEL: 'Hunt G.C.',
    DANGER: 6,
    FACING_TYPE: 'locksFacing',
    STAT_NAMES: statnames.swarm,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.2,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [12, 6.5, 0.6, 0, 6.75, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [12, 6.5, 0.6, 0, -6.75, 0, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [18, 5, 0.6, 0, 3.50, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [18, 5, 0.6, 0, -3.50, 0, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [16, 6.5, 0.6, 0, 3.50, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [16, 6.5, 0.6, 0, -3.50, 0, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, ],
};
exports.hewnGC = {
    PARENT: [exports.genericTank],
    LABEL: 'Hewn G.C.',
    DANGER: 7,
    GUNS: [{
        POSITION: [12, 6.5, 0.6, 0, 6.75, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [12, 6.5, 0.6, 0, -6.75, 0, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [16, 6.5, 0.6, 0, 3.50, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [16, 6.5, 0.6, 0, -3.50, 0, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [16, 6.5, 0.6, -2, 6, 40, 0.25],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
        }
    }, {
        POSITION: [14, 6.5, 0.6, -1, -6, -40, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
        }
    }]
};
exports.huntgunner = {
    PARENT: [exports.genericTank],
    LABEL: 'Hunt Gunner',
    DANGER: 6,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [12, 3.5, 1, 0, 7.25, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [12, 3.5, 1, 0, -7.25, 0, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [18, 2.5, 1, 0, 3.75, 0, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [18, 2.5, 1, 0, -3.75, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [16, 3.5, 1, 0, 3.75, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [16, 3.5, 1, 0, -3.75, 0, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.trapattack = {
    PARENT: [exports.genericTank],
    LABEL: 'Trapattack',
    DANGER: 6,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [12, 3.5, 1, 0, 7.25, 0, 0.5, ],
    }, {
        POSITION: [12, 3.5, 1, 0, -7.25, 0, 0.75, ],
    }, {
        POSITION: [16, 3.5, 1, 0, 3.75, 0, 0, ],
    }, {
        POSITION: [16, 3.5, 1, 0, -3.75, 0, 0.25, ],
    }, {
        POSITION: [2, 3.5, 1.5, 12, 7.25, 0, 0.5, ],
    }, {
        POSITION: [2, 3.5, 1.5, 12, -7.25, 0, 0.75, ],
    }, {
        POSITION: [2, 3.5, 1.5, 16, 3.75, 0, 0, ],
    }, {
        POSITION: [2, 3.5, 1.5, 16, -3.75, 0, 0.25, ],
    }, {
        POSITION: [2, 5.25, -1.5, 14, 6.75, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap]),
            TYPE: exports.autotrap,
        },
    }, {
        POSITION: [2, 5.25, -1.5, 14, -6.75, 0, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap]),
            TYPE: exports.autotrap,
        },
    }, {
        POSITION: [6, 4.25, -1.5, 18, 3.75, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap]),
            TYPE: exports.autotrap,
        },
    }, {
        POSITION: [6, 4.25, -1.5, 18, -3.75, 0, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap]),
            TYPE: exports.autotrap,
        },
    }, ],
};
exports.vulcan = {
    PARENT: [exports.genericTank],
    LABEL: 'Gunner',
    DANGER: 6,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [19, 1, 1, 0, 6.5, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.fast]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 1, 1, 0, 6.1, 0, 1 / 14, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.fast]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 1, 1, 0, 5, 0, 2 / 14, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.fast]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 1, 1, 0, 4, 0, 3 / 14, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.fast]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 1, 1, 0, 3, 0, 4 / 14, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.fast]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 1, 1, 0, 2, 0, 5 / 14, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.fast]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 1, 1, 0, 1, 0, 6 / 14, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.fast]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 1, 1, 0, 0, 0, 7 / 14, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.fast]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 1, 1, 0, -1, 0, 8 / 14, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.fast]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 1, 1, 0, -2, 0, 9 / 14, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.fast]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 1, 1, 0, -3, 0, 10 / 14, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.fast]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 1, 1, 0, -4, 0, 11 / 14, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.fast]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 1, 1, 0, -5, 0, 12 / 14, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.fast]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 1, 1, 0, -6.1, 0, 13 / 14, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.fast]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 1, 1, 0, -6.5, 0, 14 / 14, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.fast]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.gunnerskim2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Gunner',
    DANGER: 6,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [12, 3.5, 1, 0, 7.25, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.halfspeed]),
            TYPE: exports.essencemissile,
        },
    }, {
        POSITION: [12, 3.5, 1, 0, -7.25, 0, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.halfspeed]),
            TYPE: exports.essencemissile,
        },
    }, ],
};
exports.gunnerskim = {
    PARENT: [exports.genericTank],
    LABEL: 'Blaster',
    DANGER: 6,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [16, 9, 1, 0, 8.75, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.morespeed]),
            TYPE: exports.testmissile3,
        },
    }, {
        POSITION: [16, 9, 1, 0, -8.75, 0, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.morespeed]),
            TYPE: exports.testmissile3,
        },
    }, ],
};
exports.machinegunner = {
    PARENT: [exports.genericTank],
    LABEL: 'Machine Gunner',
    DANGER: 6,
    BODY: {
        SPEED: base.SPEED * 0.9,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [14, 3, 4.0, -3, 5, 0, 0.6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [14, 3, 4.0, -3, -5, 0, 0.8, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [14, 3, 4.0, 0, 2.5, 0, 0.4, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [14, 3, 4.0, 0, -2.5, 0, 0.2, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [14, 3, 4.0, 3, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
            TYPE: exports.bullet,
        },
    }, ]
};
exports.autogunner = makeAuto(exports.gunner);
exports.nailgun = {
    PARENT: [exports.genericTank],
    LABEL: 'Nailgun',
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.1,
        SPEED: base.SPEED * 0.9,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [19, 2, 1, 0, -2.5, 0, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 2, 1, 0, 2.5, 0, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [20, 2, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [5.5, 8, -1.8, 6.5, 0, 0, 0, ],
    }, ],
};
exports.fivenailgun = {
    PARENT: [exports.genericTank],
    LABEL: '5-Nailgun',
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.1,
        SPEED: base.SPEED * 0.9,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 2, 1, 0, -5, 0, 0.8, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [18, 2, 1, 0, 5, 0, 0.45, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 2, 1, 0, -2.5, 0, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 2, 1, 0, 2.5, 0, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [20, 2, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [5.5, 13, -1.3, 6.5, 0, 0, 0, ],
    }, ],
};

exports.double = {
    PARENT: [exports.genericTank],
    LABEL: 'Double Twin',
    DANGER: 6,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [20, 8, 1, 0, 5.5, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [20, 8, 1, 0, -5.5, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [20, 8, 1, 0, 5.5, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [20, 8, 1, 0, -5.5, 180, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.doubleguard = {
    PARENT: [exports.genericTank],
    LABEL: 'Double Guard',
    DANGER: 6,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [20, 8, 1, 0, 5.5, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [20, 8, 1, 0, -5.5, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [20, 8, 1, 0, 0, 90, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [20, 8, 1, 0, 5.5, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [20, 8, 1, 0, -5.5, 180, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [20, 8, 1, 0, 0, 270, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
            TYPE: exports.bullet,
        },
    }, ],
};

exports.tripletwin = {
    PARENT: [exports.genericTank],
    LABEL: 'Triple Twin',
    DANGER: 7,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [20, 8, 1, 0, 5.5, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [20, 8, 1, 0, -5.5, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [20, 8, 1, 0, 5.5, 120, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [20, 8, 1, 0, -5.5, 120, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [20, 8, 1, 0, 5.5, 240, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [20, 8, 1, 0, -5.5, 240, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.hugetripletwin = {
    PARENT: [exports.genericTank],
    LABEL: 'Triple Twin',
    DANGER: 7,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [20, 8, 0.9, -1, 0, -5, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.skim, g.double]),
            TYPE: exports.missile,
        },
    }, {
        POSITION: [20, 8, 0.9, -1, 0, 5, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.skim, g.double]),
            TYPE: exports.missile,
        },
    }, {
        POSITION: [20, 8, 0.9, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.skim, g.double]),
            TYPE: exports.missile,
        },
    }, ],
};
exports.autodouble = makeAuto(exports.double, 'Auto-Double');
exports.split = {
    PARENT: [exports.genericTank],
    LABEL: 'Hewn Double',
    DANGER: 7,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [19, 8, 1, 0, 5.5, 25, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 8, 1, 0, -5.5, -25, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [20, 8, 1, 0, 5.5, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [20, 8, 1, 0, -5.5, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [20, 8, 1, 0, 5.5, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [20, 8, 1, 0, -5.5, 180, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
            TYPE: exports.bullet,
        },
    }, ],
};

exports.bent = {
    PARENT: [exports.genericTank],
    LABEL: 'Triple Shot',
    DANGER: 6,
    BODY: {
        SPEED: base.SPEED * 0.9,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [19, 8, 1, 0, -2, -20, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 8, 1, 0, 2, 20, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [22, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.benttrap = {
    PARENT: [exports.genericTank],
    LABEL: 'Triple Shot',
    DANGER: 6,
    BODY: {
        SPEED: base.SPEED * 0.9,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [19, 8, 1, 0, -2, -20, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
            TYPE: exports.a,
        },
    }, {
        POSITION: [19, 8, 1, 0, 2, 20, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
            TYPE: exports.a,
        },
    }, {
        POSITION: [5, 8, 1.5, 16, 2, 20, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
            TYPE: exports.trap,
        },
    }, {
        POSITION: [5, 8, 1.5, 16, -2, -20, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
            TYPE: exports.trap,
        },
    }, {
        POSITION: [22, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
            TYPE: exports.a,
        },
    }, {
        POSITION: [5, 8, 1.5, 17, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
            TYPE: exports.trap,
        },
    }, ],
};
exports.bentdouble = {
    PARENT: [exports.genericTank],
    LABEL: 'Bent Double',
    DANGER: 7,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [19, 8, 1, 0, -1, -25, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 8, 1, 0, 1, 25, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [22, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 8, 1, 0, -1, 155, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 8, 1, 0, 1, -155, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [22, 8, 1, 0, 0, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.penta = {
    PARENT: [exports.genericTank],
    LABEL: 'Penta Shot',
    DANGER: 7,
    BODY: {
        SPEED: base.SPEED * 0.85,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [16, 8, 1, 0, -3, -30, 0.667, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [16, 8, 1, 0, 3, 30, 0.667, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 8, 1, 0, -2, -15, 0.333, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 8, 1, 0, 2, 15, 0.333, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [22, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.benthybrid = makeHybrid(exports.bent, 'Bent Hybrid');

exports.triple = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    BODY: {
        FOV: base.FOV * 1.05,
    },
    LABEL: 'Triplet',
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 10, 1, 0, 5, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [18, 10, 1, 0, -5, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [21, 10, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.quint = {
    PARENT: [exports.genericTank],
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.1,
    },
    LABEL: 'Quintuplet',
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [16, 10, 1, 0, -5, 0, 0.667, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [16, 10, 1, 0, 5, 0, 0.667, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 10, 1, 0, -3, 0, 0.333, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 10, 1, 0, 3, 0, 0.333, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [22, 10, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.dual = {
    PARENT: [exports.genericTank],
    DANGER: 7,
    BODY: {
        ACCEL: base.ACCEL * 0.8,
        FOV: base.FOV * 1.1,
    },
    LABEL: '',
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 7, 1, 0, 5.5, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.lowpower]),
            TYPE: exports.bullet,
            LABEL: 'Small',
        },
    }, {
        POSITION: [18, 7, 1, 0, -5.5, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.lowpower]),
            TYPE: exports.bullet,
            LABEL: 'Small',
        },
    }, {
        POSITION: [16, 8.5, 1, 0, 5.5, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [16, 8.5, 1, 0, -5.5, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
            TYPE: exports.bullet,
        },
    }, ],
};


exports.sniper = {
    PARENT: [exports.genericTank],
    LABEL: 'Sniper',
    BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        FOV: base.FOV * 1.2,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [24, 8.5, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.rifle = {
    PARENT: [exports.genericTank],
    LABEL: 'Rifle',
    BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        FOV: base.FOV * 1.225,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [20, 10.5, 1, 0, 0, 0, 0, ],
    }, {
        POSITION: [24, 7, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.assassin = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    LABEL: 'Assassin',
    BODY: {
        ACCELERATION: base.ACCEL * 0.6,
        SPEED: base.SPEED * 0.85,
        FOV: base.FOV * 1.4,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [27, 8.5, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [5, 8.5, -1.6, 8, 0, 0, 0, ],
    }, ],
};
exports.ak47 = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    LABEL: 'AK-47',
    BODY: {
        ACCELERATION: base.ACCEL * 0.6,
        SPEED: base.SPEED * 0.85,
        FOV: base.FOV * 1.4,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [27, 8.5, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [5, 8.5, -1.6, 8, 0, 0, 0, ],
    }, {
        POSITION: [5, 8.5, 1, 27, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.ranger = {
    PARENT: [exports.genericTank],
    LABEL: 'Ranger',
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * 0.5,
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.5,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [32, 8.5, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.ranger]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [5, 8.5, -1.6, 8, 0, 0, 0, ],
    }, ],
};
exports.autoass = makeAuto(exports.assassin, "");

exports.hunter = {
    PARENT: [exports.genericTank],
    LABEL: 'Hunter',
    DANGER: 6,
    BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.25,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [24, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [21, 12, 1, 0, 0, 0, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.preda = {
    PARENT: [exports.genericTank],
    LABEL: 'Predator',
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        SPEED: base.SPEED * 0.85,
        FOV: base.FOV * 1.3,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [24, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.hunter2, g.preda]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [21, 12, 1, 0, 0, 0, 0.15, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.preda]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [18, 16, 1, 0, 0, 0, 0.3, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.ypreda = {
    PARENT: [exports.genericTank],
    LABEL: 'Y-Predator',
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        SPEED: base.SPEED * 0.85,
        FOV: base.FOV * 1.3,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [24, 4, 1, 0, 3.5, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.hunter2]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [24, 4, 1, 0, -3.5, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.hunter2]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [28, 4, 1, 0, 0, 0, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.hunter2]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [21, 12, 1, 0, 0, 0, 0.15, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.preda]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [18, 16, 1, 0, 0, 0, 0.3, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.poach = makeHybrid(exports.hunter, 'Poacher');
exports.sidewind = {
    PARENT: [exports.genericTank],
    LABEL: 'Sidewinder',
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.3,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [10, 11, -0.5, 14, 0, 0, 0, ],
    }, {
        POSITION: [21, 12, -1.1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewind]),
            TYPE: exports.snake,
            STAT_CALCULATOR: gunCalcNames.sustained,
        },
    }, ],
};

exports.director = {
    PARENT: [exports.genericTank],
    LABEL: 'Director',
    STAT_NAMES: statnames.drone,
    DANGER: 5,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.1,
    },
    MAX_CHILDREN: 5,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [6, 12, 1.2, 8, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
        },
    }, ],
};
exports.master = {
    PARENT: [exports.genericTank],
    LABEL: '',
    STAT_NAMES: statnames.drone,
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.15,
    },
    FACING_TYPE: 'autospin',
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [16, 1, 0, 0, 0, 0],
        TYPE: exports.masterGun,
    }, {
        POSITION: [16, 1, 0, 120, 0, 0],
        TYPE: [exports.masterGun, {
            INDEPENDENT: true,
        }],
    }, {
        POSITION: [16, 1, 0, 240, 0, 0],
        TYPE: [exports.masterGun, {
            INDEPENDENT: true,
        }],
    }, ],
};

exports.overseer = {
    PARENT: [exports.genericTank],
    LABEL: 'Overseer',
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.1,
    },
    MAX_CHILDREN: 8,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [6, 12, 1.2, 8, 0, 90, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 12, 1.2, 8, 0, 270, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, ],
};
exports.overhunt = {
    PARENT: [exports.genericTank],
    LABEL: 'Overhunt',
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.1,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [10, 8, 1.2, 8, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.hunter]),
            TYPE: exports.drone,
            MAX_CHILDREN: 8,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 14, 1.2, 8, 0, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.hunter]),
            TYPE: exports.drone,
            MAX_CHILDREN: 8,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, ],
};
exports.overdrivet = {
    PARENT: [exports.genericTank],
    LABEL: 'Overdrive',
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.1,
    },
    MAX_CHILDREN: 4,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [6, 12, 1.2, 8, 0, 90, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.oddrone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 12, 1.2, 8, 0, 270, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.oddrone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }],
};
exports.overworkert = {
    PARENT: [exports.genericTank],
    LABEL: 'Overworker',
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.0,
    },
    MAX_CHILDREN: 6,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [6, 12, 1.2, 8, 0, 90, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.oddrone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 12, 1.2, 8, 0, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.oddrone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 12, 1.2, 8, 0, 270, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.oddrone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 12, 1.2, 8, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.oddrone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }],
};
exports.overcruisert = {
    PARENT: [exports.genericTank],
    LABEL: 'Overcruiser',
    DANGER: 6,
    FACING_TYPE: 'locksFacing',
    STAT_NAMES: statnames.swarm,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.2,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [7, 7.5, 0.6, 7, 4, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: exports.odswarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [7, 7.5, 0.6, 7, -4, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: exports.odswarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, ],
};
exports.overdrive = makeAuto(exports.overdrivet, 'Overdrive', {
    type: exports.odTurret,
    size: 11,

});
exports.overworker = makeAuto(exports.overworkert, 'Overworker', {
    type: exports.odTurret,
    size: 11,

});
exports.overcruiser = makeAuto(exports.overcruisert, 'Overcruiser', {
    type: exports.odTurret,
    size: 11,

});
exports.lancedrone =  makeAuto({
    PARENT: [exports.genericTank],
    LABEL: 'Lancedrone',
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.1,
    },
    MAX_CHILDREN: 4,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [6, 12, 1.2, 8, 0, 90, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.smashminion,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 12, 1.2, 8, 0, 270, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.smashminion,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }],
}, 'Lancedrone', {type: exports.trap, size: 9, COLOR: 16});

exports.general= makeAuto({
  PARENT: [exports.genericTank],
                LABEL: 'Overdrive',
                DANGER: 5,
                STAT_NAMES: statnames.drone,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 1.0,
                    FOV: base.FOV * 1.3,
                },
                MAX_CHILDREN: 5,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.fastdrone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, }, {
                POSITION: [   6,     12,    1.2,     8,      0,    270,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.fastdrone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, },
            ],
        }, 'General', {type: exports.generalt, size: 9});

            exports.sergeant= makeAuto({
                PARENT: [exports.genericTank],
                LABEL: 'Overdrive',
                DANGER: 6,
                STAT_NAMES: statnames.drone,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 1.1,
                    FOV: base.FOV * 1.4,
                },
                MAX_CHILDREN: 5,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.fastdrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.fastdrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.fastdrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, { 
                    POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.fastdrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, },
                ],
        }, 'Sergeant', {type: exports.generalt, size: 9});
exports.overlord = {
    PARENT: [exports.genericTank],
    LABEL: 'Overlord',
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.1,
    },
    MAX_CHILDREN: 8,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [6, 12, 1.2, 8, 0, 90, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 12, 1.2, 8, 0, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 12, 1.2, 8, 0, 270, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 12, 1.2, 8, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, ],
};

exports.spaceship = {
    PARENT: [exports.genericTank],
    LABEL: 'Spaceship',
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    SHAPE: 8,
    SIZE: 28,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.1,
        HEALTH: base.HEALTH * 4,
    },
    MAX_CHILDREN: 32,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [6, 7, 1.2, 8, 0, 90, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 7, 1.2, 8, 0, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 7, 1.2, 8, 0, 270, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 7, 1.2, 8, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 7, 1.2, 8, 0, 45, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 7, 1.2, 8, 0, 135, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 7, 1.2, 8, 0, -45, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 7, 1.2, 8, 0, -135, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, ],
};
exports.spaceshiplite = {
    PARENT: [exports.genericTank],
    LABEL: 'Spaceship Lite',
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    SHAPE: 6,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.1,
        HEALTH: base.HEALTH * 4,
        RELOAD: base.RELOAD * 9,
    },
    MAX_CHILDREN: 24,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [6, 7, 1.2, 8, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 7, 1.2, 8, 0, 60, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 7, 1.2, 8, 0, 120, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 7, 1.2, 8, 0, -60, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 7, 1.2, 8, 0, -120, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 7, 1.2, 8, 0, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, ],
};
exports.overlordm = {
    PARENT: [exports.genericTank],
    LABEL: 'Overlord',
    TYPE: 'minion',
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.1,
        RANGE: 720,
    },
    DIE_AT_RANGE: true,
    MAX_CHILDREN: 8,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [6, 12, 1.2, 8, 0, 90, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 12, 1.2, 8, 0, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 12, 1.2, 8, 0, 270, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 12, 1.2, 8, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, ],
};
exports.overtrap = {
    PARENT: [exports.genericTank],
    LABEL: 'Overtrapper',
    DANGER: 7,
    STAT_NAMES: statnames.generic,
    BODY: {
        ACCELERATION: base.ACCEL * 0.6,
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.2,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [6, 11, 1.2, 8, 0, 125, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 3,
        },
    }, {
        POSITION: [6, 11, 1.2, 8, 0, 235, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 3,
        },
    }, {
        POSITION: [14, 8, 1, 0, 0, 0, 0, ],
    }, {
        POSITION: [4, 8, 1.5, 14, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap,
        },
    }, ],
};
exports.banshee = {
    PARENT: [exports.genericTank],
    LABEL: '',
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * 0.5,
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.1,
    },
    FACING_TYPE: 'autospin',
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [10, 8, 0, 0, 80, 0],
        TYPE: exports.bansheegun,
    }, {
        POSITION: [10, 8, 0, 120, 80, 0],
        TYPE: exports.bansheegun,
    }, {
        POSITION: [10, 8, 0, 240, 80, 0],
        TYPE: exports.bansheegun,
    }, ],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [6, 11, 1.2, 8, 0, 60, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 2,
        },
    }, {
        POSITION: [6, 11, 1.2, 8, 0, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 2,
        },
    }, {
        POSITION: [6, 11, 1.2, 8, 0, 300, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 2,
        },
    }, ]
};
exports.bansheehammer = {
    PARENT: [exports.genericTank],
    LABEL: 'Candle',
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * 8,
        SPEED: base.SPEED * 8,
        FOV: base.FOV * 1.1,
    },
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [10, 8, 0, 0, 80, 0],
        TYPE: exports.bansheegun,
    }, ],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [6, 11, 1.2, 8, 0, 60, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.doublereload, g.candl]),
            TYPE: exports.bullet,
            AUTOFIRE: false,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 11, 1.2, 8, 0, -60, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.doublereload, g.candl]),
            TYPE: exports.bullet,
            AUTOFIRE: false,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, ]
};
exports.autoover = makeAuto(exports.overseer, "");
exports.overgunner = {
    PARENT: [exports.genericTank],
    LABEL: 'Overgunner',
    DANGER: 7,
    STAT_NAMES: statnames.generic,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.1,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [6, 11, 1.2, 8, 0, 125, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 3,
        },
    }, {
        POSITION: [6, 11, 1.2, 8, 0, 235, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 3,
        },
    }, {
        POSITION: [19, 2, 1, 0, -2.5, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.slow, g.flank, g.lotsmorrecoil]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 2, 1, 0, 2.5, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.slow, g.flank, g.lotsmorrecoil]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [12, 11, 1, 0, 0, 0, 0, ],
    }, ],
};

function makeSwarmSpawner(guntype) {
    return {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 2,
        },
        CONTROLLERS: ['nearestDifferentMaster'],
        COLOR: 16,
        AI: {
            NO_LEAD: true,
            SKYNET: true,
            FULL_VIEW: true,
        },
        GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [14, 15, 0.6, 14, 0, 0, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: guntype,
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        }],
    };
}
exports.cruiserGun = makeSwarmSpawner(combineStats([g.swarm]));
exports.cruiser = {
    PARENT: [exports.genericTank],
    LABEL: 'Cruiser',
    DANGER: 6,
    FACING_TYPE: 'locksFacing',
    STAT_NAMES: statnames.swarm,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.2,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [7, 7.5, 0.6, 7, 4, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [7, 7.5, 0.6, 7, -4, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, ],
};
exports.cruisingtank = {
    PARENT: [exports.genericTank],
    LABEL: 'Cruising Tank',
    DANGER: 6,
    FACING_TYPE: 'locksFacing',
    STAT_NAMES: statnames.swarm,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.2,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [7, 7.5, 0.6, 7, 4, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [7, 7.5, 0.6, 7, -4, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, 0, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.battleship = {
    PARENT: [exports.genericTank],
    LABEL: 'Battleship',
    DANGER: 7,
    STAT_NAMES: statnames.swarm,
    FACING_TYPE: 'locksFacing',
    BODY: {
        ACCELERATION: base.ACCEL,
        FOV: base.FOV * 1.5,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [7, 7.5, 0.6, 7, 4, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
            TYPE: exports.battleswarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
            LABEL: 'Guided'
        },
    }, {
        POSITION: [7, 7.5, 0.6, 7, -4, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: [exports.battleswarm],
            STAT_CALCULATOR: gunCalcNames.swarm,
            LABEL: 'Autonomous',
        },
    }, {
        /*POSITION: [7, 7.5, 0.6, 7, 4, 120, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
            TYPE: exports.battleswarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
            LABEL: 'Guided'
        },
    }, {*/
        POSITION: [7, 7.5, 0.6, 7, -4, 120, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: [exports.battleswarm],
            STAT_CALCULATOR: gunCalcNames.swarm,
            LABEL: 'Autonomous',
        },
    }, {
        POSITION: [7, 7.5, 0.6, 7, 4, -120, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: exports.battleswarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
            LABEL: 'Guided',
        },
        /* }, {
             POSITION: [7, 7.5, 0.6, 7, -4, -120, 0.5, ],
             PROPERTIES: {
                 SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                 TYPE: [exports.battleswarm],
                 STAT_CALCULATOR: gunCalcNames.swarm,
                 LABEL: 'Autonomous',
             }, */
    }, ],
};
exports.solidago = {
    PARENT: [exports.genericTank],
    LABEL: 'Solidago',
    DANGER: 7,
    STAT_NAMES: statnames.swarm,
    FACING_TYPE: 'locksFacing',
    BODY: {
        ACCELERATION: base.ACCEL,
        FOV: base.FOV * 1.2,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [7, 7.5, 0.6, 7, 4, 100, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
            LABEL: 'Guided'
        },
    }, {
        POSITION: [7, 7.5, 0.6, 7, -4, 100, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: [exports.autoswarm],
            STAT_CALCULATOR: gunCalcNames.swarm,
            LABEL: 'Autonomous',
        },
    }, {
        POSITION: [7, 7.5, 0.6, 7, 4, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
            LABEL: 'Guided'
        },
    }, {
        POSITION: [7, 7.5, 0.6, 7, -4, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: [exports.autoswarm],
            STAT_CALCULATOR: gunCalcNames.swarm,
            LABEL: 'Autonomous',
        },
    }, {
        POSITION: [7, 7.5, 0.6, 7, 4, -100, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: [exports.autoswarm],
            STAT_CALCULATOR: gunCalcNames.swarm,
            LABEL: 'Autonomous',
        },
    }, {
        POSITION: [7, 7.5, 0.6, 7, -4, -100, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
            LABEL: 'Guided'
        },
    }, ],
};
exports.carrier = {
    PARENT: [exports.genericTank],
    LABEL: 'Carrier',
    DANGER: 7,
    STAT_NAMES: statnames.swarm,
    FACING_TYPE: 'locksFacing',
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.3,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [7, 7.5, 0.6, 7, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [7, 7.5, 0.6, 7, 2, 40, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [7, 7.5, 0.6, 7, -2, -40, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }],
};
exports.autocruiser = makeAuto(exports.cruiser, "");
exports.fortress = {
    PARENT: [exports.genericTank],
    LABEL: 'Fortress', //'Palisade',
    DANGER: 7,
    STAT_NAMES: statnames.generic,
    FACING_TYPE: 'autospin',
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.2,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [7, 7.5, 0.6, 7, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: [exports.swarm, {
                CONTROLLERS: ['canRepel']
            }],
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [7, 7.5, 0.6, 7, 0, 120, 1 / 3, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: [exports.swarm, {
                CONTROLLERS: ['canRepel']
            }],
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [7, 7.5, 0.6, 7, 0, 240, 2 / 3, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: [exports.swarm, {
                CONTROLLERS: ['canRepel']
            }],
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [14, 9, 1, 0, 0, 60, 0, ],
    }, {
        POSITION: [4, 9, 1.5, 14, 0, 60, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap,
        },
    }, {
        POSITION: [14, 9, 1, 0, 0, 180, 0, ],
    }, {
        POSITION: [4, 9, 1.5, 14, 0, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap,
        },
    }, {
        POSITION: [14, 9, 1, 0, 0, 300, 0, ],
    }, {
        POSITION: [4, 9, 1.5, 14, 0, 300, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap,
        },
    }, ],
};
exports.megafort = {
    PARENT: [exports.genericTank],
    LABEL: 'Mega Fortress', //'Palisade',
    DANGER: 7,
    STAT_NAMES: statnames.generic,
    FACING_TYPE: 'autospin',
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.2,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [14, 9, 1, 0, 0, 60, 0, ],
    }, {
        POSITION: [4, 9, 1.5, 14, 0, 60, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap,
        },
    }, {
        POSITION: [14, 9, 1, 0, 0, 180, 0, ],
    }, {
        POSITION: [4, 9, 1.5, 14, 0, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap,
        },
    }, {
        POSITION: [14, 9, 1, 0, 0, 300, 0, ],
    }, {
        POSITION: [4, 9, 1.5, 14, 0, 300, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap,
        },
    }, ],
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [12, 8, 0, 0, 190, 0],
        TYPE: exports.tritrapgun,
    }, {
        POSITION: [12, 8, 0, 120, 190, 0],
        TYPE: exports.tritrapgun,
    }, {
        POSITION: [12, 8, 0, 240, 190, 0],
        TYPE: exports.tritrapgun,
    }, ],
};


exports.underseer = {
    PARENT: [exports.genericTank],
    LABEL: 'Underseer',
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.1,
    },
    SHAPE: 4,
    MAX_CHILDREN: 14,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [5, 12, 1.2, 8, 0, 90, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
            TYPE: exports.sunchip,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
        },
    }, {
        POSITION: [5, 12, 1.2, 8, 0, 270, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
            TYPE: exports.sunchip,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
        },
    }, ]
};

exports.necromancer = {
    PARENT: [exports.genericTank],
    LABEL: 'Necromancer',
    DANGER: 7,
    STAT_NAMES: statnames.necro,
    BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.15,
    },
    SHAPE: 4,
    FACING_TYPE: 'autospin',
    MAX_CHILDREN: 14,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [5, 12, 1.2, 8, 0, 90, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
            TYPE: exports.sunchip,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro,
        },
    }, {
        POSITION: [5, 12, 1.2, 8, 0, 270, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
            TYPE: exports.sunchip,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro,
        },
    }, {
        POSITION: [5, 12, 1.2, 8, 0, 0, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.weak, g.doublereload]),
            TYPE: exports.autosunchip,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 4,
            STAT_CALCULATOR: gunCalcNames.necro,
            LABEL: 'Guard',
        },
    }, {
        POSITION: [5, 12, 1.2, 8, 0, 180, 0.75],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.weak, g.doublereload]),
            TYPE: exports.autosunchip,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 4,
            STAT_CALCULATOR: gunCalcNames.necro,
            LABEL: 'Guard',
        },
    }, ],
};

exports.lilfact = {
    PARENT: [exports.genericTank],
    LABEL: '',
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: base.SPEED * 0.8,
        ACCELERATION: base.ACCEL * 0.5,
        FOV: 1.1,
    },
    GUNS: [{ /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [4.5, 10, 1, 10.5, 0, 0, 0, ],
    }, {
        POSITION: [1, 12, 1, 15, 0, 0, 0, ],
        PROPERTIES: {
            MAX_CHILDREN: 4,
            SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
            TYPE: exports.minion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
        },
    }, {
        POSITION: [3.5, 12, 1, 8, 0, 0, 0, ],
    }],
};
exports.hpk2turret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: base.SPEED * 0.8,
        ACCELERATION: base.ACCEL * 0.5,
        FOV: 1.1,
    },
    GUNS: [{ /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [4.5, 10, 1, 10.5, 0, 0, 0, ],
    }, {
        POSITION: [1, 12, 1, 15, 0, 0, 0, ],
        PROPERTIES: {
            MAX_CHILDREN: 1,
            SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
            TYPE: exports.hpk2minion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
        },
    }, {
        POSITION: [3.5, 12, 1, 8, 0, 0, 0, ],
    }],
};
exports.factory = {
    PARENT: [exports.genericTank],
    LABEL: 'Factory',
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: 1.1,
    },
    SHAPE: 4,
    MAX_CHILDREN: 6,
    GUNS: [{ /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [5, 12, 1.2, 8, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.minion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
        },
    }],
};
exports.deviser = {
    PARENT: [exports.genericTank],
    LABEL: 'Deviser',
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: 1.1,
    },
    MAX_CHILDREN: 1,
    GUNS: [{ /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [5, 11, 1, 10.5, 0, 0, 0, ],
    }, {
        POSITION: [2, 14, 1, 15.5, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.minion2,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
        },
    }, {
        POSITION: [4, 14, 1, 8, 0, 0, 0, ],
    }],
};
exports.fact2 = {
    PARENT: [exports.genericTank],
    LABEL: 'TESTBED',
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: 1.1,
    },
    MAX_CHILDREN: 9,
    GUNS: [{ /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [5, 11, 1, 10.5, 0, 0, 0, ],
    }, {
        POSITION: [2, 14, 1, 15.5, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.overlordm,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
        },
    }, {
        POSITION: [2, 14, 1, 15.5, 0, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.testbedm,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
        },
    }, {
        POSITION: [4, 14, 1, 8, 0, 0, 0, ],
    }],
};
exports.efturret = {
    PARENT: [exports.genericTank],
    LABEL: 'TESTBED',
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: 1.1,
    },
    MAX_CHILDREN: 16,
    GUNS: [{ /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [5, 11, 1, 10.5, 0, 0, 0, ],
    }, {
        POSITION: [2, 14, 1, 15.5, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.overlordm,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
        },
    }, {
        POSITION: [2, 14, 1, 15.5, 0, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.minion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
        },
    }, {
        POSITION: [4, 14, 1, 8, 0, 0, 0, ],
    }],
};
exports.machine = {
    PARENT: [exports.genericTank],
    LABEL: 'Machine Gun',
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [12, 10, 1.4, 8, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.machineii = /*makeAuto(*/{
    PARENT: [exports.genericTank],
    LABEL: 'Machine Gun II',
    SHAPE: 103,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [12, 10, 1.4, 8, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.spray = {
    PARENT: [exports.genericTank],
    LABEL: 'Sprayer',
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [23, 7, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lowpower, g.mach, g.morerecoil]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [12, 10, 1.4, 8, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
            TYPE: exports.bullet,
        },
    }, ],
};

exports.mini = {
    PARENT: [exports.genericTank],
    LABEL: 'Minigun',
    DANGER: 6,
    BODY: {
        FOV: 1.2,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [22, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [20, 8, 1, 0, 0, 0, 0.333, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, 0, 0.667, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.stream = {
    PARENT: [exports.genericTank],
    LABEL: 'Streamliner',
    DANGER: 7,
    BODY: {
        FOV: 1.3,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [25, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [23, 8, 1, 0, 0, 0, 0.2, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [21, 8, 1, 0, 0, 0, 0.4, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 8, 1, 0, 0, 0, 0.6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [17, 8, 1, 0, 0, 0, 0.8, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.hybridmini = makeHybrid(exports.mini, "");
exports.minitrap = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    LABEL: '',
    STAT_NAMES: statnames.trap,
    BODY: {
        FOV: 1.15,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [24, 8, 1, 0, 0, 0, 0, ],
    }, {
        POSITION: [4, 8, 1.3, 22, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap,
        },
    }, {
        POSITION: [4, 8, 1.3, 18, 0, 0, 0.333, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap,
        },
    }, {
        POSITION: [4, 8, 1.3, 14, 0, 0, 0.667, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap,
        },
    }, ],
};

exports.pound = {
    PARENT: [exports.genericTank],
    DANGER: 5,
    BODY: {
        ACCELERATION: base.ACCEL * 0.8,
    },
    LABEL: 'Pounder',
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [20, 12, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.destroy = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
    },
    LABEL: 'Destroyer',
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [21, 14, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.anni = {
    PARENT: [exports.genericTank],
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
    },
    LABEL: 'Annihilator',
    DANGER: 7,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [20.5, 19.5, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.hiveshooter = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        SPEED: base.speed * 0.8,
    },
    LABEL: '',
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [14, 14, -1.2, 5, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.hive]),
            TYPE: exports.hive,
        },
    }, {
        POSITION: [15, 12, 1, 5, 0, 0, 0, ],
    }],
};
exports.hybrid = makeHybrid(exports.destroy, 'Hybrid');
exports.shotgun2 = {
    PARENT: [exports.genericTank],
    DANGER: 7,
    LABEL: 'Shotgun',
    BODY: {
        ACCELERATION: base.ACCEL * 0.7,
    },
    GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
        POSITION: [4, 3, 1, 11, -3, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [4, 3, 1, 11, 3, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [4, 4, 1, 13, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports.casing,
        },
    }, {
        POSITION: [1, 4, 1, 12, -1, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports.casing,
        },
    }, {
        POSITION: [1, 4, 1, 11, 1, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports.casing,
        },
    }, {
        POSITION: [1, 3, 1, 13, -1, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [1, 3, 1, 13, 1, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [1, 2, 1, 13, 2, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports.casing,
        },
    }, {
        POSITION: [1, 2, 1, 13, -2, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports.casing,
        },
    }, {
        POSITION: [15, 14, 1, 6, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
            TYPE: exports.casing,
        },
    }, {
        POSITION: [8, 14, -1.3, 4, 0, 0, 0, ],
    }],
};
exports.m2 = {
    PARENT: [exports.genericTank],
    DANGER: 7,
    LABEL: 'Meister',
    BODY: {
        ACCELERATION: base.ACCEL * 0.7,
    },
    GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
        POSITION: [10, 10, 1, 13, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.doublereload, g.doublereload,

                g.morespeed
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [4, 3, 1, 11, -3, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.doublereload, g.doublereload]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [4, 3, 1, 11, 3, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.doublereload, g.doublereload]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [4, 4, 1, 13, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.doublereload, g.doublereload]),
            TYPE: exports.casing,
        },
    }, {
        POSITION: [1, 4, 1, 12, -1, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.doublereload, g.doublereload]),
            TYPE: exports.casing,
        },
    }, {
        POSITION: [1, 4, 1, 11, 1, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.doublereload, g.doublereload]),
            TYPE: exports.casing,
        },
    }, {
        POSITION: [1, 3, 1, 13, -1, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.doublereload, g.doublereload]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [1, 3, 1, 13, 1, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.doublereload, g.doublereload]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [1, 2, 1, 13, 2, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.doublereload, g.doublereload]),
            TYPE: exports.casing,
        },
    }, {
        POSITION: [1, 2, 1, 13, -2, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.doublereload, g.doublereload]),
            TYPE: exports.casing,
        },
    }, {
        POSITION: [15, 14, 1, 6, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.doublereload, g.doublereload,

                g.fake
            ]),
            TYPE: exports.casing,
        },
    }, {
        POSITION: [8, 14, -1.3, 4, 0, 0, 0, ],
    }],
};

exports.builder = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    LABEL: 'Trapper',
    STAT_NAMES: statnames.trap,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.15,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 12, 1, 0, 0, 0, 0, ],
    }, {
        POSITION: [2, 12, 1.1, 18, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
            TYPE: exports.block,
        },
    }, ],
};
exports.snipetrap = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    LABEL: 'Snipetrapper',
    STAT_NAMES: statnames.trap,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.15,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [22, 10, 1, 0, 0, 0, 0, ],
    }, {
        POSITION: [2, 10, 1.1, 22, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.sniper]),
            TYPE: exports.trap,
        },
    }, ],
};
exports.snipebuild = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    LABEL: 'Snipebuilder',
    STAT_NAMES: statnames.trap,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.15,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [22, 10, 1, 0, 0, 0, 0, ],
    }, {
        POSITION: [2, 10, 1.1, 22, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.sniper, g.lessreload]),
            TYPE: exports.block,
        },
    }, ],
};
exports.trapsassin = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    LABEL: 'Trapsassin',
    STAT_NAMES: statnames.trap,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.15,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [25, 10, 1, 0, 0, 0, 0, ],
    }, {
        POSITION: [2, 10, 1.1, 25, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.sniper, g.assass]),
            TYPE: exports.trap,
        },
    }, ],
};
exports.rangetrap = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    LABEL: 'Rangetrap',
    STAT_NAMES: statnames.trap,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.15,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [25, 10, 1, 0, 0, 0, 0, ],
    }, {
        POSITION: [2, 10, 1.1, 25, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.sniper, g.assass, g.ranger]),
            TYPE: exports.trap,
        },
    }, ],
};
exports.blocksassin = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    LABEL: 'Blocksassin',
    STAT_NAMES: statnames.trap,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.15,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [25, 12, 1, 0, 0, 0, 0, ],
    }, {
        POSITION: [2, 12, 1.1, 25, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.sniper, g.assass, g.lessreload]),
            TYPE: exports.block,
        },
    }, ],
};
exports.flankbuilder = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    LABEL: 'Flank Trapper',
    STAT_NAMES: statnames.trap,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.15, 
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 12, 1, 0, 0, 0, 0, ],
    }, {
        POSITION: [2, 12, 1.1, 18, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
            TYPE: exports.block,
        },
    }, {
        POSITION: [18, 12, 1, 0, 0, 180, 0, ],
    }, {
        POSITION: [2, 12, 1.1, 18, 0, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
            TYPE: exports.block,
        },
    }, ],
};
exports.stackedbuilder = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    LABEL: 'Stacked Trapper',
    STAT_NAMES: statnames.trap,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.15,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 12, 1, 0, 0, 0, 0, ],
    }, {
        POSITION: [2, 12, 1.1, 18, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
            TYPE: exports.block,
        },
    }, {
        POSITION: [18, 12, 1, 0, 0, 0, 0, ],
    }, {
        POSITION: [2, 12, 1.1, 18, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
            TYPE: exports.block,
        },
    }, ],
};
exports.builder2 = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    LABEL: 'Rock Climber',
    STAT_NAMES: statnames.trap,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.15,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 12, 1, 0, 0, 0, 0, ],
    }, {
        POSITION: [2, 20, 1.1, 18, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.doublereload]),
            TYPE: exports.obstacle,
        },
    }, ],
};
exports.pent2 = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    LABEL: 'pentrap spawner',
    STAT_NAMES: statnames.trap,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.15,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [5, 13, -1, -4, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
            TYPE: exports.pentatrap,
        },
    }, ],
};
exports.engineer = {
    PARENT: [exports.genericTank],
    DANGER: 7,
    LABEL: 'Engineer',
    STAT_NAMES: statnames.trap,
    BODY: {
        SPEED: base.SPEED * 0.75,
        FOV: base.FOV * 1.15,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [5, 11, 1, 10.5, 0, 0, 0, ],
    }, {
        POSITION: [3, 14, 1, 15.5, 0, 0, 0, ],
    }, {
        POSITION: [2, 14, 1.3, 18, 0, 0, 0, ],
        PROPERTIES: {
            MAX_CHILDREN: 9,
            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
            TYPE: exports.pillbox,
            SYNCS_SKILLS: true,
        },
    }, {
        POSITION: [4, 14, 1, 8, 0, 0, 0, ]
    }],
};
exports.engineer2 = {
    PARENT: [exports.genericTank],
    DANGER: 7,
    LABEL: 'Engineer',
    STAT_NAMES: statnames.trap,
    BODY: {
        SPEED: base.SPEED * 0.75,
        FOV: base.FOV * 1.15,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [5, 11, 1, 10.5, 0, 0, 0, ],
    }, {
        POSITION: [3, 14, 1, 15.5, 0, 0, 0, ],
    }, {
        POSITION: [2, 14, 1.3, 18, 0, 0, 0, ],
        PROPERTIES: {
            MAX_CHILDREN: 9,
            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
            TYPE: exports.pillbox2,
            SYNCS_SKILLS: true,
        },
    }, {
        POSITION: [4, 14, 1, 8, 0, 0, 0, ]
    }],
};
exports.construct = {
    PARENT: [exports.genericTank],
    LABEL: 'Mega Trapper',
    STAT_NAMES: statnames.trap,
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * 0.5,
        SPEED: base.SPEED * 0.7,
        FOV: base.FOV * 1.15,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 18, 1, 0, 0, 0, 0, ],
    }, {
        POSITION: [2, 18, 1.2, 18, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
            TYPE: exports.block,
        },
    }, ],
};
exports.minelayer = {
    PARENT: [exports.genericTank],
    LABEL: 'Mega Trapper',
    STAT_NAMES: statnames.trap,
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * 0.5,
        SPEED: base.SPEED * 0.7,
        FOV: base.FOV * 1.15,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 18, 1, 0, 0, 0, 0, ],
    }, {
        POSITION: [2, 18, 1.2, 18, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
            TYPE: exports.block
            },
        },
   ],
};
exports.construct2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Anomaly Trapper',
    STAT_NAMES: statnames.trap,
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * 0.5,
        SPEED: base.SPEED * 0.7,
        FOV: base.FOV * 3,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 18, 1, 0, 0, 0, 0, ],
    }, {
        POSITION: [2, 18, 1.2, 18, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.huge]),
            TYPE: exports.block,
        },
    }, ],
};
exports.autobuilder = makeAuto(exports.builder);
exports.autoex = makeAuto(exports.baseProtector);
exports.conq = {
    PARENT: [exports.genericTank],
    DANGER: 7,
    LABEL: '',
    STAT_NAMES: statnames.trap,
    BODY: {
        SPEED: base.SPEED * 0.8,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [21, 14, 1, 0, 0, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [18, 14, 1, 0, 0, 0, 0, ],
    }, {
        POSITION: [2, 14, 1.1, 18, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
            TYPE: exports.block,
        },
    }, ],
};
exports.bentboomer = {
    PARENT: [exports.genericTank],
    DANGER: 7,
    LABEL: 'Boomer',
    STAT_NAMES: statnames.trap,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.15,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [8, 10, 1, 8, -2, -35, 0, ],
    }, {
        POSITION: [8, 10, 1, 8, 2, 35, 0, ],
    }, {
        POSITION: [2, 10, 1.3, 16, -2, -35, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fast, g.twin]),
            TYPE: exports.boomerang,
        },
    }, {
        POSITION: [2, 10, 1.3, 16, 2, 35, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fast, g.twin]),
            TYPE: exports.boomerang,
        },
    }, ],
};
exports.ritoparn = {
    PARENT: [exports.genericTank],
    DANGER: 7,
    LABEL: 'Ritoparn',
    STAT_NAMES: statnames.trap,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.15,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [8, 10, 1, 8, -2, -35, 0, ],
    }, {
        POSITION: [8, 10, 1, 8, 2, 35, 0, ],
    }, {
        POSITION: [2, 10, 1.3, 16, -2, -35, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fast, g.twin]),
            TYPE: exports.boomerang,
        },
    }, {
        POSITION: [2, 10, 1.3, 16, 2, 35, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fast, g.twin]),
            TYPE: exports.boomerang,
        },
    }, {
        POSITION: [5, 10, 1, 14, 0, 0, 0, ],
    }, {
        POSITION: [6, 10, -1.5, 7, 0, 0, 0, ],
    }, {
        //POSITION: [  12,    15,      1,      0,      0,      0,      0,   ],
        //    }, {
        POSITION: [2, 10, 1.3, 18, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang]),
            TYPE: exports.boomerang,
        },
    }, {
        POSITION: [7, 15.5, 1.1, 7, 0, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
            TYPE: [exports.bentboomer, {
                CONTROLLERS: [
                    'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'
                ],
                SPEED: 3,
                SIZE: 28,
                LEVEL: 60,
                CAN_BE_ON_LEADERBOARD: false,
            }],
            MAX_CHILDREN: 4,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, ],
};
exports.boomer = {
    PARENT: [exports.genericTank],
    DANGER: 7,
    LABEL: 'Boomer',
    STAT_NAMES: statnames.trap,
    FACING_TYPE: 'locksFacing',
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.15,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [5, 10, 1, 14, 0, 0, 0, ],
    }, {
        POSITION: [6, 10, -1.5, 7, 0, 0, 0, ],
    }, {
        //POSITION: [  12,    15,      1,      0,      0,      0,      0,   ],
        //    }, {
        POSITION: [2, 10, 1.3, 18, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang]),
            TYPE: exports.boomerang,
        },
    }, ],
};
exports.machboomer = {
    PARENT: [exports.genericTank],
    DANGER: 7,
    LABEL: 'Machine Boomer',
    STAT_NAMES: statnames.trap,
    FACING_TYPE: 'locksFacing',
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.15,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [5, 10, 1.4, 14, 0, 0, 0, ],
    }, {
        POSITION: [6, 10, -1.1, 7, 0, 0, 0, ],
    }, {
        //POSITION: [  12,    15,      1,      0,      0,      0,      0,   ],
        //    }, {
        POSITION: [2, 10, 1.7, 18, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.mach, g.boomerang, g.machboomer]),
            TYPE: exports.boomerang,
        },
    }, ],
};
exports.boomerception = makeAuto(exports.boomer, 'Boomerception', {
    type: exports.boomer,
    size: 12,
});
exports.boomerturret = {
    PARENT: [exports.genericTank],
    DANGER: 7,
    LABEL: '',
    STAT_NAMES: statnames.trap,
    FACING_TYPE: 'locksFacing',
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.15,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [5, 10, 1, 14, 0, 0, 0, ],
    }, {
        POSITION: [6, 10, -1.5, 7, 0, 0, 0, ],
    }, {
        //POSITION: [  12,    15,      1,      0,      0,      0,      0,   ],
        //    }, {
        POSITION: [2, 10, 1.3, 18, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang, g.auto]),
            TYPE: exports.boomerang,
        },
    }, ],
};

exports.quadtrapper = {
    PARENT: [exports.genericTank],
    DANGER: 7,
    LABEL: '',
    STAT_NAMES: statnames.trap,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.15,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [14, 6, 1, 0, 0, 45, 0, ],
    }, {
        POSITION: [2, 6, 1.1, 14, 0, 45, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
            TYPE: exports.block,
        },
    }, {
        POSITION: [14, 6, 1, 0, 0, 135, 0, ],
    }, {
        POSITION: [2, 6, 1.1, 14, 0, 135, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
            TYPE: exports.block,
        },
    }, {
        POSITION: [14, 6, 1, 0, 0, 225, 0, ],
    }, {
        POSITION: [2, 6, 1.1, 14, 0, 225, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
            TYPE: exports.block,
        },
    }, {
        POSITION: [14, 6, 1, 0, 0, 315, 0, ],
    }, {
        POSITION: [2, 6, 1.1, 14, 0, 315, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
            TYPE: exports.block,
        },
    }, ],
};

exports.artillery = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    LABEL: 'Artillery',
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [17, 3, 1, 0, -6, -7, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
            TYPE: exports.bullet,
            LABEL: 'Secondary',
        },
    }, {
        POSITION: [17, 3, 1, 0, 6, 7, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
            TYPE: exports.bullet,
            LABEL: 'Secondary',
        },
    }, {
        POSITION: [19, 12, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
            TYPE: exports.bullet,
            LABEL: 'Heavy',
        },
    }, ],
};
exports.stalin = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    LABEL: 'idk',
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [17, 3, 0.7, 0, -6, -7, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
            TYPE: exports.missile,
            LABEL: 'Secondary',
        },
    }, {
        POSITION: [17, 3, 1, 0, 6, 7, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
            TYPE: exports.missile,
            LABEL: 'Secondary',
        },
    }, {
        POSITION: [19, 12, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.morespeed, g.arty]),
            TYPE: exports.bullet,
            LABEL: 'Heavy',
        },
    }, ],
};
exports.mortar = {
    PARENT: [exports.genericTank],
    LABEL: 'Mortar',
    DANGER: 7,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [13, 3, 1, 0, -8, -7, 0.6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
            TYPE: exports.bullet,
            LABEL: 'Secondary',
        },
    }, {
        POSITION: [13, 3, 1, 0, 8, 7, 0.8, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
            TYPE: exports.bullet,
            LABEL: 'Secondary',
        },
    }, {
        POSITION: [17, 3, 1, 0, -6, -7, 0.2, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
            TYPE: exports.bullet,
            LABEL: 'Secondary',
        },
    }, {
        POSITION: [17, 3, 1, 0, 6, 7, 0.4, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
            TYPE: exports.bullet,
            LABEL: 'Secondary',
        },
    }, {
        POSITION: [19, 12, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
            TYPE: exports.bullet,
            LABEL: 'Heavy',
        },
    }, ],
};
exports.skimmer = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: base.FOV * 1.15,
    },
    LABEL: 'Skimmer',
    DANGER: 7,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [10, 14, -0.5, 9, 0, 0, 0, ],
    }, {
        POSITION: [17, 15, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
            TYPE: exports.missile,
            STAT_CALCULATOR: gunCalcNames.sustained,
        },
    }, ],
};
exports.dskimmer = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: base.FOV * 1.15,
    },
    LABEL: 'Duplicator',
    DANGER: 7,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [10, 14, -0.5, 9, 0, 0, 0, ],
    }, {
        POSITION: [17, 15, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
            TYPE: exports.dmissile2,
            STAT_CALCULATOR: gunCalcNames.sustained,
        },
    }, ],
};
exports.gskimmer = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: base.FOV * 1.15,
    },
    LABEL: 'Grow Skimmer',
    DANGER: 7,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [13.5, 10, 1.5, 9, 0, 0, 0, ],
    }, {
        POSITION: [17, 15, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
            TYPE: exports.gmissile,
            STAT_CALCULATOR: gunCalcNames.sustained,
        },
    }, ],
};
exports.shskimmer = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: base.FOV * 1.15,
    },
    LABEL: 'Shrink Skimmer',
    DANGER: 7,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [10, 14, -0.5, 9, 0, 0, 0, ],
    }, {
        POSITION: [17, 15, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
            TYPE: exports.smissile,
            STAT_CALCULATOR: gunCalcNames.sustained,
        },
    }, ],
};
exports.boostering = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: base.FOV * 1.15,
    },
    LABEL: 'Boostering',
    DANGER: 7,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [10, 14, -0.5, 9, 0, 0, 0, ],
    }, {
        POSITION: [17, 15, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
            TYPE: exports.boosterspawn,
            STAT_CALCULATOR: gunCalcNames.sustained,
        },
    }, {
        POSITION: [13, 8, 1, 0, -1, 135, 0.6, ],
    }, {
        POSITION: [13, 8, 1, 0, 1, 225, 0.6, ],
    }, {
        POSITION: [16, 8, 1, 0, 0, 145, 0.1, ],
    }, {
        POSITION: [16, 8, 1, 0, 0, 215, 0.1, ],
    }, ],
};
exports.manip = {
    PARENT: [exports.genericTank],
    CONTROLLERS: ['nearestDifferentMaster'],
    BODY: {
        FOV: base.FOV * 1.15,
    },
    LABEL: 'Skimmer',
    DANGER: 7,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [10, 14, -0.5, 9, 0, 0, 0, ],
    }, {
        POSITION: [17, 15, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim, g.morespeed, g.doublereload, g.doublereload]),
            TYPE: [exports.missile, {
                TYPE: 'minion',
                CONTROLLERS: ['nearestDifferentMaster'],
            }],
            STAT_CALCULATOR: gunCalcNames.sustained,
        },
    }, ],
};

exports.sunskimmer = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: base.FOV * 1.15,
    },
    LABEL: 'Skimmer',
    DANGER: 7,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [10, 5, -0.5, 9, 0, 0, 0, ],
    }, {
        POSITION: [17, 45, -0.4, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
            TYPE: exports.sunmissile,
            STAT_CALCULATOR: gunCalcNames.sustained,
        },
    }, ],
};

exports.skimmer2 = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: base.FOV * 1.15,
    },
    SHAPE: -4,
    LABEL: 'TESTBED',
    DANGER: 7,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [10, 14, -0.2, 9, 0, 0, 0, ],
    }, {
        POSITION: [17, 15, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
            TYPE: exports.testmissile,
            STAT_CALCULATOR: gunCalcNames.sustained,
        },
    }, ],
};
exports.spar = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: base.FOV * 1.15,
    },
    SHAPE: 0,
    LABEL: 'Sparker',
    DANGER: 7,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [10, 14, -0.2, 9, 0, 0, 0, ],
    }, {
        POSITION: [17, 15, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim, g.norng]),
            TYPE: exports.testmissile2,
            STAT_CALCULATOR: gunCalcNames.sustained,
        },
    }, ],
};
exports.spread = {
    PARENT: [exports.genericTank],
    LABEL: 'Spreadshot',
    DANGER: 7,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [13, 4, 1, 0, -0.8, -75, 5 / 6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
            TYPE: exports.bullet,
            LABEL: 'Spread',
        },
    }, {
        POSITION: [14.5, 4, 1, 0, -1.0, -60, 4 / 6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
            TYPE: exports.bullet,
            LABEL: 'Spread',
        },
    }, {
        POSITION: [16, 4, 1, 0, -1.6, -45, 3 / 6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
            TYPE: exports.bullet,
            LABEL: 'Spread',
        },
    }, {
        POSITION: [17.5, 4, 1, 0, -2.4, -30, 2 / 6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
            TYPE: exports.bullet,
            LABEL: 'Spread',
        },
    }, {
        POSITION: [19, 4, 1, 0, -3.0, -15, 1 / 6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
            TYPE: exports.bullet,
            LABEL: 'Spread',
        },
    }, {
        POSITION: [13, 4, 1, 0, 0.8, 75, 5 / 6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
            TYPE: exports.bullet,
            LABEL: 'Spread',
        },
    }, {
        POSITION: [14.5, 4, 1, 0, 1.0, 60, 4 / 6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
            TYPE: exports.bullet,
            LABEL: 'Spread',
        },
    }, {
        POSITION: [16, 4, 1, 0, 1.6, 45, 3 / 6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
            TYPE: exports.bullet,
            LABEL: 'Spread',
        },
    }, {
        POSITION: [17.5, 4, 1, 0, 2.4, 30, 2 / 6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
            TYPE: exports.bullet,
            LABEL: 'Spread',
        },
    }, {
        POSITION: [19, 4, 1, 0, 3.0, 15, 1 / 6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
            TYPE: exports.bullet,
            LABEL: 'Spread',
        },
    }, {
        POSITION: [13, 10, 1.3, 8, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.spreadmain, g.spread]),
            TYPE: exports.bullet,
            LABEL: 'Pounder',
        },
    }, ],
};
exports.spreadt = {
    PARENT: [exports.genericTank],
    TYPE: 'minion',
    LABEL: 'Spreadshot minion',
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.1,
        RANGE: 720,
    },
    DIE_AT_RANGE: true,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [13, 4, 1, 0, -0.8, -75, 5 / 6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
            TYPE: exports.bullet,
            LABEL: 'Spread',
        },
    }, {
        POSITION: [14.5, 4, 1, 0, -1.0, -60, 4 / 6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
            TYPE: exports.bullet,
            LABEL: 'Spread',
        },
    }, {
        POSITION: [16, 4, 1, 0, -1.6, -45, 3 / 6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
            TYPE: exports.bullet,
            LABEL: 'Spread',
        },
    }, {
        POSITION: [17.5, 4, 1, 0, -2.4, -30, 2 / 6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
            TYPE: exports.bullet,
            LABEL: 'Spread',
        },
    }, {
        POSITION: [19, 4, 1, 0, -3.0, -15, 1 / 6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
            TYPE: exports.bullet,
            LABEL: 'Spread',
        },
    }, {
        POSITION: [13, 4, 1, 0, 0.8, 75, 5 / 6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
            TYPE: exports.bullet,
            LABEL: 'Spread',
        },
    }, {
        POSITION: [14.5, 4, 1, 0, 1.0, 60, 4 / 6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
            TYPE: exports.bullet,
            LABEL: 'Spread',
        },
    }, {
        POSITION: [16, 4, 1, 0, 1.6, 45, 3 / 6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
            TYPE: exports.bullet,
            LABEL: 'Spread',
        },
    }, {
        POSITION: [17.5, 4, 1, 0, 2.4, 30, 2 / 6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
            TYPE: exports.bullet,
            LABEL: 'Spread',
        },
    }, {
        POSITION: [19, 4, 1, 0, 3.0, 15, 1 / 6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
            TYPE: exports.bullet,
            LABEL: 'Spread',
        },
    }, {
        POSITION: [13, 10, 1.3, 8, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.spreadmain, g.spread]),
            TYPE: exports.bullet,
            LABEL: 'Pounder',
        },
    }, ],
};
exports.flank = {
    PARENT: [exports.genericTank],
    LABEL: 'Flank Guard',
    BODY: {
        SPEED: base.SPEED * 1.1,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [12, 8, 1, 0, 0, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.tritank = {
    PARENT: [exports.genericTank],
    LABEL: 'Tri-Tank',
    BODY: {
        SPEED: base.SPEED * 1.1,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, 120, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, 240, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.spurter = {
    PARENT: [exports.genericTank],
    LABEL: 'Spurter',
    BODY: {
        SPEED: base.SPEED * 1.1,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, 225, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, 45, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, 315, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, 135, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.hexa = {
    PARENT: [exports.genericTank],
    LABEL: 'Hexa Tank',
    DANGER: 6,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, 120, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, 240, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, 60, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, 180, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, 300, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.octo = {
    PARENT: [exports.genericTank],
    LABEL: 'Octo Tank',
    DANGER: 7,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, 90, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, 270, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, 45, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, 135, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, 225, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, 315, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.octoc = {
    PARENT: [exports.genericTank],
    LABEL: 'Octo Tank',
    DANGER: 7,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 12, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
            TYPE: exports.missile,
        },
    }, {
        POSITION: [18, 12, 1, 0, 0, 90, 0.2, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
            TYPE: exports.missile,
        },
    }, {
        POSITION: [18, 12, 1, 0, 0, 180, 0.4, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
            TYPE: exports.missile,
        },
    }, {
        POSITION: [18, 12, 1, 0, 0, 270, 0.6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
            TYPE: exports.missile,
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, 45, 0.1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, 135, 0.3, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, 225, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, 315, 0.7, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.heptatrap = (() => {
    let a = 360 / 7,
        d = 1 / 7;
    return {
        PARENT: [exports.genericTank],
        LABEL: 'Hepta-Trapper',
        DANGER: 7,
        BODY: {
            SPEED: base.SPEED * 0.8,
        },
        STAT_NAMES: statnames.trap,
        HAS_NO_RECOIL: true,
        GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 7, 1, 0, 0, 0, 0, ],
        }, {
            POSITION: [3, 7, 1.7, 15, 0, 0, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        }, {
            POSITION: [15, 7, 1, 0, 0, a, 4 * d, ],
        }, {
            POSITION: [3, 7, 1.7, 15, 0, a, 4 * d, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        }, {
            POSITION: [15, 7, 1, 0, 0, 2 * a, 1 * d, ],
        }, {
            POSITION: [3, 7, 1.7, 15, 0, 2 * a, 1 * d, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        }, {
            POSITION: [15, 7, 1, 0, 0, 3 * a, 5 * d, ],
        }, {
            POSITION: [3, 7, 1.7, 15, 0, 3 * a, 5 * d, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        }, {
            POSITION: [15, 7, 1, 0, 0, 4 * a, 2 * d, ],
        }, {
            POSITION: [3, 7, 1.7, 15, 0, 4 * a, 2 * d, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        }, {
            POSITION: [15, 7, 1, 0, 0, 5 * a, 6 * d, ],
        }, {
            POSITION: [3, 7, 1.7, 15, 0, 5 * a, 6 * d, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        }, {
            POSITION: [15, 7, 1, 0, 0, 6 * a, 3 * d, ],
        }, {
            POSITION: [3, 7, 1.7, 15, 0, 6 * a, 3 * d, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        }, ],
    };
})();
exports.enneatrap = (() => {
    let a = 360 / 9,
        d = 1 / 9;
    return {
        PARENT: [exports.genericTank],
        LABEL: 'Ennea-Trapper',
        DANGER: 7,
        BODY: {
            SPEED: base.SPEED * 0.8,
        },
        STAT_NAMES: statnames.trap,
        HAS_NO_RECOIL: true,
        GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 7, 1, 0, 0, 0, 0, ],
        }, {
            POSITION: [3, 7, 1.7, 15, 0, 0, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        }, {
            POSITION: [15, 7, 1, 0, 0, a, 4 * d, ],
        }, {
            POSITION: [3, 7, 1.7, 15, 0, a, 4 * d, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        }, {
            POSITION: [15, 7, 1, 0, 0, 2 * a, 1 * d, ],
        }, {
            POSITION: [3, 7, 1.7, 15, 0, 2 * a, 1 * d, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        }, {
            POSITION: [15, 7, 1, 0, 0, 3 * a, 5 * d, ],
        }, {
            POSITION: [3, 7, 1.7, 15, 0, 3 * a, 5 * d, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        }, {
            POSITION: [15, 7, 1, 0, 0, 4 * a, 2 * d, ],
        }, {
            POSITION: [3, 7, 1.7, 15, 0, 4 * a, 2 * d, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        }, {
            POSITION: [15, 7, 1, 0, 0, 5 * a, 6 * d, ],
        }, {
            POSITION: [3, 7, 1.7, 15, 0, 5 * a, 6 * d, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        }, {
            POSITION: [15, 7, 1, 0, 0, 6 * a, 7 * d, ],
        }, {
            POSITION: [3, 7, 1.7, 15, 0, 6 * a, 7 * d, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        }, {
            POSITION: [15, 7, 1, 0, 0, 7 * a, 8 * d, ],
        }, {
            POSITION: [3, 7, 1.7, 15, 0, 7 * a, 8 * d, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        }, {
            POSITION: [15, 7, 1, 0, 0, 8 * a, 9 * d, ],
        }, {
            POSITION: [3, 7, 1.7, 15, 0, 8 * a, 9 * d, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        }, ],
    };
})();
exports.hexatrap = makeAuto({
    PARENT: [exports.genericTank],
    LABEL: 'Hexa-Trapper',
    DANGER: 7,
    BODY: {
        SPEED: base.SPEED * 0.8,
    },
    STAT_NAMES: statnames.trap,
    HAS_NO_RECOIL: true,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [15, 7, 1, 0, 0, 0, 0, ],
    }, {
        POSITION: [3, 7, 1.7, 15, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap,
        },
    }, {
        POSITION: [15, 7, 1, 0, 0, 60, 0.5, ],
    }, {
        POSITION: [3, 7, 1.7, 15, 0, 60, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap,
        },
    }, {
        POSITION: [15, 7, 1, 0, 0, 120, 0, ],
    }, {
        POSITION: [3, 7, 1.7, 15, 0, 120, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap,
        },
    }, {
        POSITION: [15, 7, 1, 0, 0, 180, 0.5, ],
    }, {
        POSITION: [3, 7, 1.7, 15, 0, 180, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap,
        },
    }, {
        POSITION: [15, 7, 1, 0, 0, 240, 0, ],
    }, {
        POSITION: [3, 7, 1.7, 15, 0, 240, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap,
        },
    }, {
        POSITION: [15, 7, 1, 0, 0, 300, 0.5, ],
    }, {
        POSITION: [3, 7, 1.7, 15, 0, 300, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap,
        },
    }, ],
}, 'Hexa-Trapper');
exports.shexatrap = makeAuto({
    PARENT: [exports.genericTank],
    LABEL: 'Hexa-Trapper',
    DANGER: 7,
    BODY: {
        SPEED: base.SPEED * 0.8,
    },
    STAT_NAMES: statnames.trap,
    HAS_NO_RECOIL: true,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [15, 7, 1, 0, 0, 0, 0, ],
    }, {
        POSITION: [3, 7, 1.7, 15, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap,
        },
    }, {
        POSITION: [15, 7, 1, 0, 0, 60, 0.5, ],
    }, {
        POSITION: [3, 7, 1.7, 15, 0, 60, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap,
        },
    }, {
        POSITION: [15, 7, 1, 0, 0, 120, 0, ],
    }, {
        POSITION: [3, 7, 1.7, 15, 0, 120, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap,
        },
    }, {
        POSITION: [15, 7, 1, 0, 0, 180, 0.5, ],
    }, {
        POSITION: [3, 7, 1.7, 15, 0, 180, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap,
        },
    }, {
        POSITION: [15, 7, 1, 0, 0, 240, 0, ],
    }, {
        POSITION: [3, 7, 1.7, 15, 0, 240, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap,
        },
    }, {
        POSITION: [15, 7, 1, 0, 0, 300, 0.5, ],
    }, {
        POSITION: [3, 7, 1.7, 15, 0, 300, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap,
        },
    }, {
        POSITION: [7, 7.5, 0.6, 8, 0, 30, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: [exports.autoswarm],
            STAT_CALCULATOR: gunCalcNames.swarm,
            LABEL: 'Autonomous',
        },
    }, {
        POSITION: [7, 7.5, 0.6, 8, 0, 90, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: [exports.autoswarm],
            STAT_CALCULATOR: gunCalcNames.swarm,
            LABEL: 'Autonomous',
        },
    }, {
        POSITION: [7, 7.5, 0.6, 8, 0, 150, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: [exports.autoswarm],
            STAT_CALCULATOR: gunCalcNames.swarm,
            LABEL: 'Autonomous',
        },
    }, {
        POSITION: [7, 7.5, 0.6, 8, 0, -30, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: [exports.autoswarm],
            STAT_CALCULATOR: gunCalcNames.swarm,
            LABEL: 'Autonomous',
        },
    }, {
        POSITION: [7, 7.5, 0.6, 8, 0, -90, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: [exports.autoswarm],
            STAT_CALCULATOR: gunCalcNames.swarm,
            LABEL: 'Autonomous',
        },
    }, {
        POSITION: [7, 7.5, 0.6, 8, 0, -150, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: [exports.autoswarm],
            STAT_CALCULATOR: gunCalcNames.swarm,
            LABEL: 'Autonomous',
        },
    }, ],
}, 'Hexa-Swarm-Trapper');

exports.tri = {
    PARENT: [exports.genericTank],
    LABEL: 'Tri-Angle',
    BODY: {
        HEALTH: base.HEALTH * 0.8,
        SHIELD: base.SHIELD * 0.8,
        DENSITY: base.DENSITY * 0.6,
    },
    DANGER: 6,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.tonsmorrecoil]),
            TYPE: exports.bullet,
            LABEL: 'Front',
        },
    }, {
        POSITION: [16, 8, 1, 0, 0, 150, 0.1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
            TYPE: exports.bullet,
            LABEL: gunCalcNames.thruster,
        },
    }, {
        POSITION: [16, 8, 1, 0, 0, 210, 0.1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
            TYPE: exports.bullet,
            LABEL: gunCalcNames.thruster,
        },
    }, ],
};
exports.thisisforenig = {
    PARENT: [exports.genericTank],
    LABEL: 'Surfer',
    BODY: {
        HEALTH: base.HEALTH * 0.8,
        SHIELD: base.SHIELD * 0.8,
        DENSITY: base.DENSITY * 0.6,
    },
    DANGER: 6,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [16, 6, 0.6, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.tonsmorrecoil]),
            TYPE: exports.swarm,
            LABEL: 'Front',
        },
    }, {
        POSITION: [16, 8, 1, 0, 0, 150, 0.1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
            TYPE: exports.bullet,
            LABEL: gunCalcNames.thruster,
        },
    }, {
        POSITION: [16, 8, 1, 0, 0, 210, 0.1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
            TYPE: exports.bullet,
            LABEL: gunCalcNames.thruster,
        },
    }, {
        POSITION: [16, 6, 0.6, 0, 0, 180.1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.tonsmorrecoil]),
            TYPE: exports.autoswarm,
            LABEL: gunCalcNames.thruster,
        },
    }, ],
};
exports.booster = {
    PARENT: [exports.genericTank],
    LABEL: 'Booster',
    BODY: {
        HEALTH: base.HEALTH * 0.6,
        SHIELD: base.SHIELD * 0.6,
        DENSITY: base.DENSITY * 0.2,
        SPEED: base.SPEED * 9,
        ACCEL: base.ACCEL * 5
    },
    DANGER: 7,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.muchmorerecoil]),
            TYPE: exports.bullet,
            LABEL: 'Front',
        },
    }, {
        POSITION: [13, 8, 1, 0, -1, 135, 0.6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
            TYPE: exports.bullet,
            LABEL: gunCalcNames.thruster,
        },
    }, {
        POSITION: [13, 8, 1, 0, 1, 225, 0.6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
            TYPE: exports.bullet,
            LABEL: gunCalcNames.thruster,
        },
    }, {
        POSITION: [16, 8, 1, 0, 0, 145, 0.1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
            TYPE: exports.bullet,
            LABEL: gunCalcNames.thruster,
        },
    }, {
        POSITION: [16, 8, 1, 0, 0, 215, 0.1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
            TYPE: exports.bullet,
            LABEL: gunCalcNames.thruster,
        },
    }, ],
};
exports.boosterii = {
    PARENT: [exports.genericTank],
    LABEL: 'Booster II',
    BODY: {
        HEALTH: base.HEALTH * 0.6,
        SHIELD: base.SHIELD * 0.6,
        DENSITY: base.DENSITY * 0.2,
        SPEED: base.SPEED * 9,
        ACCEL: base.ACCEL * 5
    },
    DANGER: 7,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.muchmorerecoil]),
            TYPE: exports.bullet,
            LABEL: 'Front',
        },
    }, {
        POSITION: [12, 3.5, 1, 0, 7.25, 180, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.flank, g.tri, g.thruster]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [12, 3.5, 1, 0, -7.25, 180, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.flank, g.tri, g.thruster]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [16, 3.5, 1, 0, 3.75, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.flank, g.tri, g.thruster]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [16, 3.5, 1, 0, -3.75, 180, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.flank, g.tri, g.thruster]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.marine = {
    PARENT: [exports.genericTank],
    LABEL: 'Marine',
    INVISIBLE: [0.08, 0.03],
    BODY: {
        HEALTH: base.HEALTH * 0.6,
        SHIELD: base.SHIELD * 0.6,
        DENSITY: base.DENSITY * 0.2,
    },
    DANGER: 7,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.muchmorerecoil]),
            TYPE: exports.bullet,
            LABEL: 'Front',
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, 105, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
            TYPE: exports.bullet,
            LABEL: gunCalcNames.thruster,
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, -105, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
            TYPE: exports.bullet,
            LABEL: gunCalcNames.thruster,
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, 180, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
            TYPE: exports.bullet,
            LABEL: gunCalcNames.thruster,
        },
    }, ],
};
exports.fighter = {
    PARENT: [exports.genericTank],
    LABEL: 'Fighter',
    BODY: {
        DENSITY: base.DENSITY * 0.6,
    },
    DANGER: 7,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
            TYPE: exports.bullet,
            LABEL: 'Front',
        },
    }, {
        POSITION: [16, 8, 1, 0, -1, 90, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
            TYPE: exports.bullet,
            LABEL: 'Side',
        },
    }, {
        POSITION: [16, 8, 1, 0, 1, -90, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
            TYPE: exports.bullet,
            LABEL: 'Side',
        },
    }, {
        POSITION: [16, 8, 1, 0, 0, 150, 0.1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
            TYPE: exports.bullet,
            LABEL: gunCalcNames.thruster,
        },
    }, {
        POSITION: [16, 8, 1, 0, 0, 210, 0.1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
            TYPE: exports.bullet,
            LABEL: gunCalcNames.thruster,
        },
    }, ],
};
exports.brutalizer = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        DENSITY: base.DENSITY * 0.6,
    },
    DANGER: 7,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
            TYPE: exports.bullet,
            LABEL: 'Front',
        },
    }, {
        POSITION: [7, 7.5, 0.6, 7, -1, 90, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: [exports.autoswarm],
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [7, 7.5, 0.6, 7, 1, -90, 9, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: [exports.autoswarm],
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [16, 8, 1, 0, 0, 150, 0.1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
            TYPE: exports.bullet,
            LABEL: gunCalcNames.thruster,
        },
    }, {
        POSITION: [16, 8, 1, 0, 0, 210, 0.1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
            TYPE: exports.bullet,
            LABEL: gunCalcNames.thruster,
        },
    }, ],
};
exports.bomber = {
    PARENT: [exports.genericTank],
    LABEL: 'Bomber',
    BODY: {
        DENSITY: base.DENSITY * 0.6,
    },
    DANGER: 7,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [20, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
            TYPE: exports.bullet,
            LABEL: 'Front',
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, 130, 0.1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
            TYPE: exports.bullet,
            LABEL: 'Wing',
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, 230, 0.1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
            TYPE: exports.bullet,
            LABEL: 'Wing',
        },
    }, {
        POSITION: [14, 8, 1, 0, 0, 180, 0, ],
    }, {
        POSITION: [4, 8, 1.5, 14, 0, 180, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.morerecoil]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap,
        },
    }, ],
};
exports.autotri = makeAuto(exports.tri);
exports.autotri.BODY = {
    SPEED: base.SPEED,
};
exports.falcon = {
    PARENT: [exports.genericTank],
    LABEL: 'Falcon',
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * 0.8,
        FOV: base.FOV * 1.2,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [27, 8.5, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.lessreload, g.nerfgun]),
            TYPE: exports.bullet,
            LABEL: 'Assassin',
            ALT_FIRE: true,
        },
    }, {
        POSITION: [5, 8.5, -1.6, 8, 0, 0, 0, ],
    }, {
        POSITION: [16, 8, 1, 0, 0, 150, 0.1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil, g.nerfgun]),
            TYPE: exports.bullet,
            LABEL: gunCalcNames.thruster,
        },
    }, {
        POSITION: [16, 8, 1, 0, 0, 210, 0.1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil, g.nerfgun]),
            TYPE: exports.bullet,
            LABEL: gunCalcNames.thruster,
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, 180, 0.6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil, g.nerfgun]),
            TYPE: exports.bullet,
            LABEL: gunCalcNames.thruster,
        },
    }, ],
};
exports.nightingale = {
    PARENT: [exports.genericTank],
    LABEL: 'Nightingale',
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * 0.8,
        FOV: base.FOV * 1.2,
    },
    GUNS: [{ // Length, width, yadda yadda yadda
        POSITION: [20, 8, 1, 0, 5.5, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
            TYPE: exports.bullet,
            ALT_FIRE: true,
        },
    }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [20, 8, 1, 0, -5.5, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
            TYPE: exports.bullet,
            ALT_FIRE: true,
        },
    }, {
        POSITION: [16, 8, 1, 0, 0, 150, 0.1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
            TYPE: exports.bullet,
            LABEL: gunCalcNames.thruster,
        },
    }, {
        POSITION: [16, 8, 1, 0, -0, -150, 0.1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
            TYPE: exports.bullet,
            LABEL: gunCalcNames.thruster,
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, 180, 0.6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
            TYPE: exports.bullet,
            LABEL: gunCalcNames.thruster,
        },
    }, ],
};
exports.toucan = {
    PARENT: [exports.genericTank],
    LABEL: 'Toucan',
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * 0.8,
        FOV: base.FOV * 1.2,
    },
    GUNS: [{ // Length, width, yadda yadda yadda
        POSITION: [20, 8, 1, 0, 5.5, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
            TYPE: exports.bullet,
            ALT_FIRE: true,
        },
    }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [20, 8, 1, 0, -5.5, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
            TYPE: exports.bullet,
            ALT_FIRE: true,
        },
    }, {
        /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [25, 10, 1, 0, 0, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
            TYPE: exports.bullet,
            ALT_FIRE: true,
        },
    }, {
        POSITION: [16, 8, 1, 0, 0, 150, 0.1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
            TYPE: exports.bullet,
            LABEL: gunCalcNames.thruster,
        },
    }, {
        POSITION: [16, 8, 1, 0, -0, -150, 0.1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
            TYPE: exports.bullet,
            LABEL: gunCalcNames.thruster,
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, 180, 0.6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
            TYPE: exports.bullet,
            LABEL: gunCalcNames.thruster,
        },
    }, ],
};
exports.osprey = {
    PARENT: [exports.genericTank],
    LABEL: 'Osprey',
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * 0.8,
        FOV: base.FOV * 1.2,
    },
    GUNS: [{ // Length, width, yadda yadda yadda
        POSITION: [24, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2]),
            TYPE: exports.bullet,
            ALT_FIRE: true,
        },
    }, {
        POSITION: [21, 12, 1, 0, 0, 0, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter]),
            TYPE: exports.bullet,
            ALT_FIRE: true,
        },
    }, {
        POSITION: [16, 8, 1, 0, 0, 150, 0.1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
            TYPE: exports.bullet,
            LABEL: gunCalcNames.thruster,
        },
    }, {
        POSITION: [16, 8, 1, 0, -0, -150, 0.1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
            TYPE: exports.bullet,
            LABEL: gunCalcNames.thruster,
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, 180, 0.6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
            TYPE: exports.bullet,
            LABEL: gunCalcNames.thruster,
        },
    }, ],
};
exports.falcon2 = {
    PARENT: [exports.genericTank],
    LABEL: 'gud Falcon',
    DANGER: 7,
    BODY: {
        HEALTH: base.HEALTH * 0.6,
        SHIELD: base.SHIELD * 0.6,
        DENSITY: base.DENSITY * 0.2,
        SPEED: base.SPEED * 9,
        ACCEL: base.ACCEL * 5
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [27, 8.5, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.lessreload]),
            TYPE: exports.bullet,
            LABEL: 'Assassin',
            ALT_FIRE: true,
        },
    }, {
        POSITION: [5, 8.5, -1.6, 8, 0, 0, 0, ],
    }, {
        POSITION: [16, 8, 1, 0, 0, 150, 0.1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
            TYPE: exports.bullet,
            LABEL: gunCalcNames.thruster,
        },
    }, {
        POSITION: [16, 8, 1, 0, -0, -150, 0.1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
            TYPE: exports.bullet,
            LABEL: gunCalcNames.thruster,
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, 180, 0.6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
            TYPE: exports.bullet,
            LABEL: gunCalcNames.thruster,
        },
    }, ],
};

exports.auto3 = {
    PARENT: [exports.genericTank],
    LABEL: 'Auto-3',
    DANGER: 6,
    FACING_TYPE: 'autospin',
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [11, 8, 0, 0, 190, 0],
        TYPE: exports.auto3gun,
    }, {
        POSITION: [11, 8, 0, 120, 190, 0],
        TYPE: exports.auto3gun,
    }, {
        POSITION: [11, 8, 0, 240, 190, 0],
        TYPE: exports.auto3gun,
    }, ],
};
exports.thing3 = {
    PARENT: [exports.genericTank],
    LABEL: 'thing-3',
    DANGER: 6,
    FACING_TYPE: 'autospin',
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [11, 8, 0, 0, 190, 0],
        TYPE: exports.skimmerspinner,
    }, {
        POSITION: [11, 8, 0, 120, 190, 0],
        TYPE: exports.skimmerspinner,
    }, {
        POSITION: [11, 8, 0, 240, 190, 0],
        TYPE: exports.skimmerspinner,
    }, ],
};
exports.boomer3 = {
    PARENT: [exports.genericTank],
    LABEL: 'Boomer-3',
    DANGER: 6,
    FACING_TYPE: 'autospin',
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [11, 8, 0, 0, 190, 0],
        TYPE: exports.boomerturret,
    }, {
        POSITION: [11, 8, 0, 120, 190, 0],
        TYPE: exports.boomerturret,
    }, {
        POSITION: [11, 8, 0, 240, 190, 0],
        TYPE: exports.boomerturret,
    }, ],
};
exports.moomoo = {
    PARENT: [exports.genericTank],
    LABEL: 'Moomoo',
    DANGER: 6,
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [11, 9, 0, -45, 190, 0],
        TYPE: exports.smash,
    }, {
        POSITION: [11, 9, 0, 45, 190, 0],
        TYPE: exports.smash,
    }, ],
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
    STAT_NAMES: statnames.smasher
};
exports.hitler = {
    PARENT: [exports.genericTank],
    LABEL: 'Geargrinder',
    DANGER: 6,
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [11, 8, 0, 60, 190, 0],
        TYPE: exports.hivet,
    }, {
        POSITION: [11, 8, 0, -60, 190, 0],
        TYPE: exports.hivet,
    }, {
        POSITION: [10, 0, 0, 120, 0, 0],
        TYPE: exports.cruiserGun,
    }, {
        POSITION: [10, 0, 0, -120, 0, 0],
        TYPE: exports.cruiserGun,
    }, ],
};

exports.auto5 = {
    PARENT: [exports.genericTank],
    LABEL: 'Auto-5',
    DANGER: 7,
    FACING_TYPE: 'autospin',
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [11, 8, 0, 0, 190, 0],
        TYPE: exports.auto5gun,
    }, {
        POSITION: [11, 8, 0, 72, 190, 0],
        TYPE: exports.auto5gun,
    }, {
        POSITION: [11, 8, 0, 144, 190, 0],
        TYPE: exports.auto5gun,
    }, {
        POSITION: [11, 8, 0, 216, 190, 0],
        TYPE: exports.auto5gun,
    }, {
        POSITION: [11, 8, 0, 288, 190, 0],
        TYPE: exports.auto5gun,
    }, ],
};
exports.auto7 = {
    PARENT: [exports.genericTank],
    LABEL: 'Auto-7',
    DANGER: 7,
    FACING_TYPE: 'autospin',
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [11, 8, 0, 51.4285714286, 190, 0],
        TYPE: exports.auto5gun,
    }, {
        POSITION: [11, 8, 0, 102.857142857, 190, 0],
        TYPE: exports.auto5gun,
    }, {
        POSITION: [11, 8, 0, 154.285714286, 190, 0],
        TYPE: exports.auto5gun,
    }, {
        POSITION: [11, 8, 0, 205.714285714, 190, 0],
        TYPE: exports.auto5gun,
    }, {
        POSITION: [11, 8, 0, 257.142857143, 190, 0],
        TYPE: exports.auto5gun,
    }, {
        POSITION: [11, 8, 0, 308.571428571, 190, 0],
        TYPE: exports.auto5gun,
    }, {
        POSITION: [11, 8, 0, 0, 190, 0],
        TYPE: exports.auto5gun,
    }, ],
};
exports.hpk1t = {
    PARENT: [exports.genericTank],
    LABEL: 'HPK-1',
    SHAPE: 7,
    DANGER: 7,
    SIZE: 32,
    COLOR: 4,
    FACING_TYPE: 'autospin',
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [6, 8, 0, 77.1428571, 190, 0],
        TYPE: exports.twin,
    }, {
        POSITION: [6, 8, 0, 128.5714285, 190, 0],
        TYPE: exports.twin,
    }, {
        POSITION: [6, 8, 0, 179.9999999, 190, 0],
        TYPE: exports.twin,
    }, {
        POSITION: [6, 8, 0, 231.4285713, 190, 0],
        TYPE: exports.twin,
    }, {
        POSITION: [6, 8, 0, 282.8571427, 190, 0],
        TYPE: exports.twin,
    }, {
        POSITION: [6, 8, 0, 334.2857141, 190, 0],
        TYPE: exports.twin,
    }, {
        POSITION: [6, 8, 0, 25.7142857, 190, 0],
        TYPE: exports.twin,
    }, ],
};
exports.hpk2t = {
    PARENT: [exports.genericTank],
    LABEL: 'HPK-2',
    DANGER: 7,
    SIZE: 32,
    COLOR: 4,
    SHAPE: 7,
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [8, 8, 0, 51.4285714286, 190, 0],
        TYPE: exports.hpk2turret,
    }, {
        POSITION: [8, 8, 0, 102.857142857, 190, 0],
        TYPE: exports.hpk2turret,
    }, {
        POSITION: [8, 8, 0, 154.285714286, 190, 0],
        TYPE: exports.hpk2turret,
    }, {
        POSITION: [8, 8, 0, 205.714285714, 190, 0],
        TYPE: exports.hpk2turret,
    }, {
        POSITION: [8, 8, 0, 257.142857143, 190, 0],
        TYPE: exports.hpk2turret,
    }, {
        POSITION: [8, 8, 0, 308.571428571, 190, 0],
        TYPE: exports.hpk2turret,
    }, {
        POSITION: [8, 8, 0, 0, 190, 0],
        TYPE: exports.builder,
    }, ],
};
exports.hpk1 = makeAuto(exports.hpk1t, 'HPK-1', {
    type: exports.fivenailgun,
    size: 11,

});
exports.hpk2 = makeAuto(exports.hpk2t, 'HPK-2', {
    type: exports.gcruiser,
    size: 11,

});
exports.auto25 = {
    PARENT: [exports.genericTank],
    LABEL: 'Auto-5',
    DANGER: 7,
    FACING_TYPE: 'autospin',
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [11, 8, 0, 0, 190, 0],
        TYPE: exports.auto5,
    }, {
        POSITION: [11, 8, 0, 72, 190, 0],
        TYPE: exports.auto5,
    }, {
        POSITION: [11, 8, 0, 144, 190, 0],
        TYPE: exports.auto5,
    }, {
        POSITION: [11, 8, 0, 216, 190, 0],
        TYPE: exports.auto5,
    }, {
        POSITION: [11, 8, 0, 288, 190, 0],
        TYPE: exports.auto5,
    }, ],
};
exports.sierpinski5 = {
    PARENT: [exports.genericTank],
    LABEL: 'Auto-5',
    DANGER: 7,
    FACING_TYPE: 'autospin',
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [11, 8, 0, 0, 190, 0],
        TYPE: exports.auto25,
    }, {
        POSITION: [11, 8, 0, 72, 190, 0],
        TYPE: exports.auto25,
    }, {
        POSITION: [11, 8, 0, 144, 190, 0],
        TYPE: exports.auto25,
    }, {
        POSITION: [11, 8, 0, 216, 190, 0],
        TYPE: exports.auto25,
    }, {
        POSITION: [11, 8, 0, 288, 190, 0],
        TYPE: exports.auto25,
    }, ],
};
exports.autocirno = {
    PARENT: [exports.genericTank],
    LABEL: 'Auto-Baka',
    DANGER: 7,
    FACING_TYPE: 'autospin',
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [11, 8, 0, 0, 280, 0],
        TYPE: exports.auto5gun,
    }, {
        POSITION: [11, 8, 0, 40, 280, 0],
        TYPE: exports.auto5gun,
    }, {
        POSITION: [11, 8, 0, 80, 280, 0],
        TYPE: exports.auto5gun,
    }, {
        POSITION: [11, 8, 0, 120, 280, 0],
        TYPE: exports.auto5gun,
    }, {
        POSITION: [11, 8, 0, 160, 280, 0],
        TYPE: exports.auto5gun,
    }, {
        POSITION: [11, 8, 0, 200, 280, 0],
        TYPE: exports.auto5gun,
    }, {
        POSITION: [11, 8, 0, 140, 280, 0],
        TYPE: exports.auto5gun,
    }, {
        POSITION: [11, 8, 0, 280, 280, 0],
        TYPE: exports.auto5gun,
    }, {
        POSITION: [11, 8, 0, 216, 320, 0],
        TYPE: exports.auto5gun,
    }, ],
};
exports.auto8 = {
    PARENT: [exports.genericTank],
    LABEL: 'Auto-8',
    DANGER: 7,
    FACING_TYPE: 'autospin',
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [7, 8, 0, 0, 190, 0],
        TYPE: exports.bigauto4gun,
    }, {
        POSITION: [7, 8, 0, 45, 190, 1],
        TYPE: exports.bigauto4gun,
    }, {
        POSITION: [7, 8, 0, 90, 190, 0],
        TYPE: exports.bigauto4gun,
    }, {
        POSITION: [7, 8, 0, 135, 190, 1],
        TYPE: exports.bigauto4gun,
    }, {
        POSITION: [7, 8, 0, 180, 190, 0],
        TYPE: exports.bigauto4gun,
    }, {
        POSITION: [7, 8, 0, -135, 190, 1],
        TYPE: exports.bigauto4gun,
    }, {
        POSITION: [7, 8, 0, -90, 190, 0],
        TYPE: exports.bigauto4gun,
    }, {
        POSITION: [7, 8, 0, -45, 190, 1],
        TYPE: exports.bigauto4gun,
    }, ],
};
exports.test5 = {
    PARENT: [exports.genericTank],
    LABEL: 'Swiss Toolset',
    DANGER: 7,
    FACING_TYPE: 'autospin',
    SHAPE: 7,
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [10, 8, 0, 231.428571429, 220, 0],
        TYPE: exports.spread,
    }, {
        POSITION: [10, 8, 0, 231.428571429 + 2 * 51.4285714286, 220, 0],
        TYPE: exports.rifle,
    }, {
        POSITION: [10, 8, 0, 231.428571429 + 3 * 51.4285714286, 220, 0],
        TYPE: exports.ranger,
    }, {
        POSITION: [10, 8, 0, 231.428571429 + 4 * 51.4285714286, 220, 0],
        TYPE: exports.engineer,
    }, {
        POSITION: [10, 8, 0, 231.428571429 + 5 * 51.4285714286, 220, 0],
        TYPE: exports.skimmer,
    }, {
        POSITION: [10, 8, 0, 231.428571429 + 6 * 51.4285714286, 220, 0],
        TYPE: exports.lilfact,
    }, {
        POSITION: [10, 8, 0, -51.4285714286 + (-25.7142857143), 220, 0],
        TYPE: exports.cruiser,
    }, ],
};
exports.heavy3 = {
    BODY: {
        SPEED: base.SPEED * 0.95,
    },
    PARENT: [exports.genericTank],
    LABEL: 'Mega-3',
    DANGER: 7,
    FACING_TYPE: 'autospin',
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [14, 8, 0, 0, 190, 0],
        TYPE: exports.heavy3gun,
    }, {
        POSITION: [14, 8, 0, 120, 190, 0],
        TYPE: exports.heavy3gun,
    }, {
        POSITION: [14, 8, 0, 240, 190, 0],
        TYPE: exports.heavy3gun,
    }, ],
};
exports.tritrap = {
    LABEL: '',
    BODY: {
        SPEED: base.SPEED * 1.1,
    },
    PARENT: [exports.genericTank],
    DANGER: 6,
    FACING_TYPE: 'autospin',
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [12, 8, 0, 0, 190, 0],
        TYPE: exports.tritrapgun,
    }, {
        POSITION: [12, 8, 0, 120, 190, 0],
        TYPE: exports.tritrapgun,
    }, {
        POSITION: [12, 8, 0, 240, 190, 0],
        TYPE: exports.tritrapgun,
    }, ],
};
exports.hk1template = {
    LABEL: 'HK-1',
    SIZE: 32,
    BODY: {
        SPEED: base.SPEED * 1.1,
    },
    SHAPE: 6,
    PARENT: [exports.genericTank],
    DANGER: 6,
    FACING_TYPE: 'autospin',
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [12, 8, 0, 0, 190, 0],
        TYPE: exports.boomerturret,
    }, {
        POSITION: [12, 8, 0, 120, 190, 0],
        TYPE: exports.boomerturret,
    }, {
        POSITION: [12, 8, 0, 240, 190, 0],
        TYPE: exports.boomerturret,
    }, {
        POSITION: [9, 8, 0, 60, 190, 0],
        TYPE: exports.tritrapgun,
    }, {
        POSITION: [9, 8, 0, 180, 190, 0],
        TYPE: exports.tritrapgun,
    }, {
        POSITION: [9, 8, 0, 300, 190, 0],
        TYPE: exports.tritrapgun,
    }, ],
};
exports.hk1 = makeAuto(exports.hk1template, 'HK-1', {
    type: exports.gcruiser,
    size: 11,

});
exports.hk2template = {
    LABEL: 'HK-2 template',
    SIZE: 32,
    BODY: {
        SPEED: base.SPEED * 1.1,
    },
    SHAPE: 6,
    PARENT: [exports.genericTank],
    DANGER: 6,
    FACING_TYPE: 'autospin',
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [12, 8, 0, 0, 190, 0],
        TYPE: exports.boomerturret,
    }, {
        POSITION: [12, 8, 0, 120, 190, 0],
        TYPE: exports.boomerturret,
    }, {
        POSITION: [12, 8, 0, 240, 190, 0],
        TYPE: exports.boomerturret,
    }, {
        POSITION: [9, 8, 0, 60, 190, 0],
        TYPE: exports.tritrapgun,
    }, {
        POSITION: [9, 8, 0, 180, 190, 0],
        TYPE: exports.tritrapgun,
    }, {
        POSITION: [9, 8, 0, 300, 190, 0],
        TYPE: exports.tritrapgun,
    }, {
        POSITION: [6, 8, 0, 90, 190, 0],
        TYPE: exports.dual,
    }, {
        POSITION: [6, 8, 0, 210, 190, 0],
        TYPE: exports.dual,
    }, {
        POSITION: [6, 8, 0, 330, 190, 0],
        TYPE: exports.dual,
    }, {
        POSITION: [6, 8, 0, 150, 190, 0],
        TYPE: exports.dual,
    }, {
        POSITION: [6, 8, 0, 270, 190, 0],
        TYPE: exports.dual,
    }, {
        POSITION: [6, 8, 0, 30, 190, 0],
        TYPE: exports.dual,
    }, ],
};
exports.hk2 = makeAuto(exports.hk2template, 'HK-2', {
    type: exports.preda,
    size: 11,

});
exports.hk2_1 = makeAuto(exports.hk2, 'HK-2.1', {
    type: exports.gunner,
    size: 11,

});
exports.twinminion = {
    PARENT: [exports.genericTank],
    LABEL: 'Minion',
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.9,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'
    ],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [16, 4, 1, 0, -3.5, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.minion]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [16, 4, 1, 0, 3.5, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.minion]),
            TYPE: exports.bullet,
        },
    }],
};
exports.sfactminion = {
    PARENT: [exports.genericTank],
    LABEL: 'Minion',
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.9,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    SHAPE: 4,
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'
    ],
    //CONTROLLERS: ['nearestDifferentMaster'],
    MAX_CHILDREN: 6,
    GUNS: [{ /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [5, 12, 1.2, 8, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.minion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
        },
    }],
};
exports.hpk2minion = (() => {
    let a = 360 / 7,
        d = 1 / 7;
    return {
        PARENT: [exports.genericTank],
        LABEL: 'Minion',
        TYPE: 'minion',
        DAMAGE_CLASS: 0,
        HITS_OWN_TYPE: 'hardWithBuffer',
        FACING_TYPE: 'smoothToTarget',
        SHAPE: 7,
        BODY: {
            FOV: 0.9,
            SPEED: 3,
            ACCELERATION: 0.4,
            HEALTH: 5,
            SHIELD: 0,
            DAMAGE: 1.2,
            RESIST: 1,
            PENETRATION: 1,
            DENSITY: 0.4,
        },
        DRAW_HEALTH: false,
        CLEAR_ON_MASTER_UPGRADE: true,
        GIVE_KILL_MESSAGE: false,
        CONTROLLERS: [
            'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'
        ],
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [{
            POSITION: [15, 7, 1, 0, 0, 0, 0, ],
        }, {
            POSITION: [3, 7, 1.7, 15, 0, 0, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        }, {
            POSITION: [15, 7, 1, 0, 0, a, 4 * d, ],
        }, {
            POSITION: [3, 7, 1.7, 15, 0, a, 4 * d, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        }, {
            POSITION: [15, 7, 1, 0, 0, 2 * a, 1 * d, ],
        }, {
            POSITION: [3, 7, 1.7, 15, 0, 2 * a, 1 * d, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        }, {
            POSITION: [15, 7, 1, 0, 0, 3 * a, 5 * d, ],
        }, {
            POSITION: [3, 7, 1.7, 15, 0, 3 * a, 5 * d, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        }, {
            POSITION: [15, 7, 1, 0, 0, 4 * a, 2 * d, ],
        }, {
            POSITION: [3, 7, 1.7, 15, 0, 4 * a, 2 * d, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        }, {
            POSITION: [15, 7, 1, 0, 0, 5 * a, 6 * d, ],
        }, {
            POSITION: [3, 7, 1.7, 15, 0, 5 * a, 6 * d, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        }, {
            POSITION: [15, 7, 1, 0, 0, 6 * a, 3 * d, ],
        }, {
            POSITION: [3, 7, 1.7, 15, 0, 6 * a, 3 * d, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        }, ],
    };
})();
exports.hk3 = {
    LABEL: 'HK-3',
    SIZE: 38,
    BODY: {
        SPEED: base.SPEED * 1.1,
    },
    SHAPE: 6,
    PARENT: [exports.genericTank],
    DANGER: 10,
    FACING_TYPE: 'autospin',
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [6, 8, 1.2, 8, 0, 0, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.slow]),
                TYPE: exports.trap,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.trap,
                WAIT_TO_CYCLE: true,
            },
        }, {
            POSITION: [0, 5.5, 1.2, 8, 0, 180, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.factory]),
                TYPE: exports.twinminion,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 5,
            },
        }, {
            POSITION: [6, 8, 1.2, 8, 0, 120, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.slow]),
                TYPE: exports.trap,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.trap,
                WAIT_TO_CYCLE: true,
            },
        }, {
            POSITION: [6, 8, 1.2, 8, 0, 240, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.slow]),
                TYPE: exports.trap,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.trap,
                WAIT_TO_CYCLE: true,
            },
        },



    ],
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [8, 0, 0, 0, 360, 1, ],
        TYPE: [exports.sniper3gun, {
            INDEPENDENT: true
        }]
    }, {
        POSITION: [4, 6.5, 0, 0, 190, 1],
        TYPE: exports.bigauto4gun,
    }, {
        POSITION: [4, 6.5, 0, 120, 190, 1],
        TYPE: exports.bigauto4gun,
    }, {
        POSITION: [4, 6.5, 0, 240, 190, 1],
        TYPE: exports.bigauto4gun,
    }, {
        POSITION: [6, 8, 0, 0, 190, 0],
        TYPE: exports.boomerturret,
    }, {
        POSITION: [6, 8, 0, 120, 190, 0],
        TYPE: exports.boomerturret,
    }, {
        POSITION: [6, 8, 0, 240, 190, 0],
        TYPE: exports.boomerturret,
    }, {
        POSITION: [6, 8, 0, 60, 190, 0],
        TYPE: exports.masterGun,
    }, {
        POSITION: [6, 8, 0, 180, 190, 0],
        TYPE: exports.masterGun,
    }, {
        POSITION: [6, 8, 0, 300, 190, 0],
        TYPE: exports.masterGun,
    }, {
        POSITION: [6, 8, 0, 30, 190, 0],
        TYPE: exports.machineAutoTurret,
    }, {
        POSITION: [6, 8, 0, 90, 190, 0],
        TYPE: exports.machineAutoTurret,
    }, {
        POSITION: [6, 8, 0, 150, 190, 0],
        TYPE: exports.machineAutoTurret,
    }, {
        POSITION: [6, 8, 0, 210, 190, 0],
        TYPE: exports.machineAutoTurret,
    }, {
        POSITION: [6, 8, 0, 270, 190, 0],
        TYPE: exports.machineAutoTurret,
    }, {
        POSITION: [6, 8, 0, 330, 190, 0],
        TYPE: exports.machineAutoTurret,
    }, ],
};
exports.hk4 = {
    PARENT: [exports.genericTank],
    SIZE: 40,

    LABEL: 'HK-4',
    BODY: {
        FOV: 1.6,
        SPEED: base.SPEED * 0.075,
        HEALTH: base.HEALTH * 10,
        SHIELD: base.SHIELD * 4,
        REGEN: base.REGEN,
        DAMAGE: base.DAMAGE * 5,
        REGEN: base.REGEN * 1.5
    },
    SHAPE: 6,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['alwaysFire'],
    SKILL: skillSet({
        rld: 0.5,
        dam: 0.8,
        pen: 0.8,
        str: 0.8,
        spd: 1,
        atk: 0.3,
        hlt: 0.7,
        shi: 0.2,
        rgn: 0.2,
        mob: 0.3,
    }),
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [0, 6, 1.2, 8, 0, 25, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.factory, g.morereload, g.stronger]),
                TYPE: exports.hk1,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 2,
            },
        }, {
            POSITION: [10, 4, -1.6, 9, 0, 0, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: exports.autoswarm,

                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.swarm,
                WAIT_TO_CYCLE: true,
            },
        }, {

            POSITION: [6, 4, -1.6, 9, 0, 60, 0.5, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: exports.autoswarm,

                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.swarm,
                WAIT_TO_CYCLE: true,
            },
        }, {
            POSITION: [10, 4, -1.6, 9, 0, 120, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: exports.autoswarm,

                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.swarm,
                WAIT_TO_CYCLE: true,
            },
        }, {
            POSITION: [6, 4, -1.6, 9, 0, 180, 0.5, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: exports.autoswarm,

                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.swarm,
                WAIT_TO_CYCLE: true,
            },
        }, {
            POSITION: [10, 4, -1.6, 9, 0, 240, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: exports.autoswarm,

                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.swarm,
                WAIT_TO_CYCLE: true,
            },
        }, {
            POSITION: [6, 4, -1.6, 9, 0, 300, 0.5, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: exports.autoswarm,

                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.swarm,
                WAIT_TO_CYCLE: true,
            },
        }, {

            POSITION: [5, 6, 1.3, 8, 0, 60, 0.25, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),

                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                MAX_CHILDREN: 3


            },
        }, {
            POSITION: [5, 6, 1.3, 8, 0, 180, 0.25, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),

                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                MAX_CHILDREN: 3


            },
        }, {
            POSITION: [5, 6, 1, 8, 0, 300, 0.25, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),

                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                MAX_CHILDREN: 3


            },
        }, {




            POSITION: [15, 10, 1, 0, 0, 0, 0, ],
        }, {
            POSITION: [3, 10, 1.7, 15, 0, 0, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.pound]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        }, {
            POSITION: [15, 10, 1, 0, 0, 120, 0, ],
        }, {
            POSITION: [3, 10, 1.7, 15, 0, 120, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.pound]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        }, {
            POSITION: [15, 10, 1, 0, 0, 240, 0, ],
        }, {
            POSITION: [3, 10, 1.7, 15, 0, 240, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.pound]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },




    ],
    AI: {
        NO_LEAD: false,
    },
    TURRETS: [{
        /*********  SIZE     X       Y     ANGLE    ARC */
        POSITION: [8, 10, 0, 0, 180, 0, ],
        TYPE: [exports.sniper3gun],
    }, {
        POSITION: [8, 10, 0, 120, 180, 0, ],
        TYPE: [exports.sniper3gun],
    }, {
        POSITION: [8, 10, 0, 240, 180, 0, ],
        TYPE: [exports.sniper3gun],
    }, {
        POSITION: [8, 0, 0, 0, 360, 1, ],
        TYPE: [exports.heavy3gun, {
            INDEPENDENT: true
        }]
    }, {
        POSITION: [4, 6.5, 0, 0, 190, 1],
        TYPE: exports.bigauto4gun,
    }, {
        POSITION: [4, 6.5, 0, 120, 190, 1],
        TYPE: exports.bigauto4gun,
    }, {
        POSITION: [4, 6.5, 0, 240, 190, 1],
        TYPE: exports.bigauto4gun,
    }, ],
};
exports.hk5 = {
    PARENT: [exports.genericTank],
    SIZE: 45,

    LABEL: 'HK-5',
    BODY: {
        FOV: 1.6,
        SPEED: base.SPEED * 0.075,
        HEALTH: base.HEALTH * 10,
        SHIELD: base.SHIELD * 4,
        REGEN: base.REGEN,
        DAMAGE: base.DAMAGE * 5,
        REGEN: base.REGEN * 1.5
    },
    SHAPE: 6,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['alwaysFire'],
    SKILL: skillSet({
        rld: 0.5,
        dam: 0.8,
        pen: 0.8,
        str: 0.8,
        spd: 1,
        atk: 0.3,
        hlt: 0.7,
        shi: 0.2,
        rgn: 0.2,
        mob: 0.3,
    }),
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */

        POSITION: [4.5, 6, 1, 10.5, 0, 0, 0, ],
    }, {
        POSITION: [1, 8, 1, 15, 0, 0, 0, ],
        PROPERTIES: {
            MAX_CHILDREN: 4,
            SHOOT_SETTINGS: combineStats([g.factory, g.mini]),
            TYPE: exports.twinminion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
        },
    }, {
        POSITION: [3.5, 8, 1, 8, 0, 0, 0, ],
    }, {
        POSITION: [4.5, 6, 1, 10.5, 0, 240, 0, ],
    }, {
        POSITION: [1, 8, 1, 15, 0, 240, 0, ],
        PROPERTIES: {
            MAX_CHILDREN: 4,
            SHOOT_SETTINGS: combineStats([g.factory, g.mini]),
            TYPE: exports.twinminion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
        },
    }, {
        POSITION: [3.5, 6, 1, 8, 0, 240, 0, ],
    }, {
        POSITION: [4.5, 6, 1, 10.5, 0, 120, 0, ],
    }, {
        POSITION: [1, 8, 1, 15, 0, 120, 0, ],
        PROPERTIES: {
            MAX_CHILDREN: 4,
            SHOOT_SETTINGS: combineStats([g.factory, g.mini]),
            TYPE: exports.twinminion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
        },
    }, {
        POSITION: [3.5, 6, 1, 8, 0, 120, 0, ],
    }, ],
    AI: {
        NO_LEAD: false,
    },
    TURRETS: [{
        /*********  SIZE     X       Y     ANGLE    ARC */
        POSITION: [4, 10, 0, 0, 180, 0, ],
        TYPE: [exports.sniperturret],
    }, {
        POSITION: [4, 10, 0, 60, 180, 0, ],
        TYPE: [exports.sniperturret],
    }, {
        POSITION: [4, 10, 0, 120, 180, 0, ],
        TYPE: [exports.sniperturret],
    }, {
        POSITION: [4, 10, 0, 180, 180, 0, ],
        TYPE: [exports.sniperturret],
    }, {
        POSITION: [4, 10, 0, 240, 180, 0, ],
        TYPE: [exports.sniperturret],
    }, {
        POSITION: [4, 10, 0, 300, 180, 0, ],
        TYPE: [exports.sniperturret],
    }, {
        POSITION: [8, 0, 0, 0, 360, 2, ],
        TYPE: [exports.testbed, {
            INDEPENDENT: true
        }]
    }, {
        POSITION: [4, 6.5, 0, 0, 190, 1],
        TYPE: exports.machineAutoTurret,
    }, {
        POSITION: [4, 6.5, 0, 60, 190, 1],
        TYPE: exports.machineAutoTurret,
    }, {
        POSITION: [4, 6.5, 0, 120, 190, 1],
        TYPE: exports.machineAutoTurret,
    }, {
        POSITION: [4, 6.5, 0, 180, 190, 1],
        TYPE: exports.machineAutoTurret,
    }, {
        POSITION: [4, 6.5, 0, 240, 190, 1],
        TYPE: exports.machineAutoTurret,
    }, {
        POSITION: [4, 6.5, 0, 300, 190, 1],
        TYPE: exports.machineAutoTurret,
    }, ],
};

exports.sniper3 = {
    PARENT: [exports.genericTank],
    DANGER: 7,
    LABEL: '',
    BODY: {
        ACCELERATION: base.ACCEL * 0.6,
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.25,
    },
    FACING_TYPE: 'autospin',
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [13, 8, 0, 0, 170, 0],
        TYPE: exports.sniper3gun,
    }, {
        POSITION: [13, 8, 0, 120, 170, 0],
        TYPE: exports.sniper3gun,
    }, {
        POSITION: [13, 8, 0, 240, 170, 0],
        TYPE: exports.sniper3gun,
    }, ],
};
exports.auto4 = {
    PARENT: [exports.genericTank],
    DANGER: 5,
    LABEL: 'Auto-4',
    FACING_TYPE: 'autospin',
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [13, 6, 0, 45, 160, 0],
        TYPE: exports.auto4gun,
    }, {
        POSITION: [13, 6, 0, 135, 160, 0],
        TYPE: exports.auto4gun,
    }, {
        POSITION: [13, 6, 0, 225, 160, 0],
        TYPE: exports.auto4gun,
    }, {
        POSITION: [13, 6, 0, 315, 160, 0],
        TYPE: exports.auto4gun,
    }, ],
};
exports.auto4s = {
    PARENT: [exports.genericTank],
    DANGER: 5,
    LABEL: 'skirmish-4',
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [13, 6, 0, 45, 160, 0],
        TYPE: exports.auto4invisgun,
    }, {
        POSITION: [13, 6, 0, 135, 160, 0],
        TYPE: exports.auto4invisgun,
    }, {
        POSITION: [13, 6, 0, 225, 160, 0],
        TYPE: exports.auto4invisgun,
    }, {
        POSITION: [13, 6, 0, 315, 160, 0],
        TYPE: exports.auto4invisgun,
    }, ],
};

exports.flanktrap = {
    PARENT: [exports.genericTank],
    LABEL: 'Trap Guard',
    STAT_NAMES: statnames.generic,
    DANGER: 6,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [20, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [13, 8, 1, 0, 0, 180, 0, ],
    }, {
        POSITION: [4, 8, 1.7, 13, 0, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap,
        },
    }, ],
};
exports.guntrap = {
    PARENT: [exports.genericTank],
    LABEL: 'Gunner Trapper',
    DANGER: 7,
    STAT_NAMES: statnames.generic,
    BODY: {
        FOV: base.FOV * 1.25,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [19, 2, 1, 0, -2.5, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 2, 1, 0, 2.5, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [12, 11, 1, 0, 0, 0, 0, ],
    }, {
        POSITION: [13, 11, 1, 0, 0, 180, 0, ],
    }, {
        POSITION: [4, 11, 1.7, 13, 0, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.fast, g.halfrecoil]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap,
        },
    }, ],
};
exports.pentagun = {
    PARENT: [exports.genericTank],
    LABEL: 'Pentabionic Single Turret',
    //CONTROLLERS: ['nearestDifferentMaster'],
    COLOR: 14,
    SHAPE: 5,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [19, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.single]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [5.5, 8, -1.8, 6.5, 0, 0, 0, ],
    }],
};
exports.squareturret = {
    PARENT: [exports.genericTank],
    LABEL: 'obs turret',
    //CONTROLLERS: ['nearestDifferentMaster'],
    COLOR: 3,
    SHAPE: 4,
    TURRETS: [{
        /*********  SIZE     X       Y     ANGLE    ARC */
        POSITION: [11, 0, 0, 0, 360, 1, ],
        TYPE: [exports.battleship, {
            INDEPENDENT: true,
            COLOR: 3,
        }],
    }, ],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [24, 8.5, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.obs1 = {
    PARENT: [exports.genericTank],
    LABEL: 'OBS-1',
    //CONTROLLERS: ['nearestDifferentMaster'],
    COLOR: 3,
    SHAPE: 4,
    TURRETS: [{
        /*********  SIZE     X       Y     ANGLE    ARC */
        POSITION: [11, 0, 0, 0, 360, 1, ],
        TYPE: [exports.battleship, {
            INDEPENDENT: true,
            COLOR: 3,
        }],
    }, {
        POSITION: [20, 0, -20, 0, 0, 1, ],
        TYPE: [exports.squareturret, {
            COLOR: 3,
        }],
    }, {
        POSITION: [20, 0, 20, 0, 0, 1, ],
        TYPE: [exports.squareturret, {
            COLOR: 3,
        }],
    }, {
        POSITION: [20, -20, 0, 0, 0, 1, ],
        TYPE: [exports.squareturret, {
            COLOR: 3,
        }],
    }, {
        POSITION: [20, 20, 0, 0, 0, 1, ],
        TYPE: [exports.squareturret, {
            COLOR: 3,
        }],
    }, ],
};
exports.obs2 = {
    PARENT: [exports.genericTank],
    LABEL: 'OBS-2',
    //CONTROLLERS: ['nearestDifferentMaster'],
    COLOR: 3,
    SHAPE: 4,
    TURRETS: [{
        /*********  SIZE     X       Y     ANGLE    ARC */
        POSITION: [11, 0, 0, 0, 360, 1, ],
        TYPE: [exports.battleship, {
            INDEPENDENT: true,
            COLOR: 3,
        }],
    }, {
        POSITION: [10, 0, -19, 0, 0, 1, ],
        TYPE: [exports.obs1, {
            COLOR: 3,
        }],
    }, {
        POSITION: [10, 0, 19, 0, 0, 1, ],
        TYPE: [exports.obs1, {
            COLOR: 3,
        }],
    }, {
        POSITION: [10, -19, 0, 0, 0, 1, ],
        TYPE: [exports.obs1, {
            COLOR: 3,
        }],
    }, {
        POSITION: [10, 19, 0, 0, 0, 1, ],
        TYPE: [exports.obs1, {
            COLOR: 3,
        }],
    }, ],
};
exports.bushwhack = {
    PARENT: [exports.genericTank],
    LABEL: 'Snipe Guard',
    BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        FOV: base.FOV * 1.2,
    },
    DANGER: 7,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [24, 8.5, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.morerecoil]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [13, 8.5, 1, 0, 0, 180, 0, ],
    }, {
        POSITION: [4, 8.5, 1.7, 13, 0, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap,
        },
    }, ],
};
exports.hi = {
    PARENT: [exports.genericTank],
    LABEL: 'Admiral',
    BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        FOV: base.FOV * 1.2,
    },
    DANGER: 7,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [21, 1.9, 1, 0, 3, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.morerecoil, g.morespeed]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [21, 1.9, 1, 0, -3, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.morerecoil, g.morespeed]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [13, 8.5, 1, 0, 0, -140, 0, ],
    }, {
        POSITION: [4, 8.5, 1.7, 13, 0, -140, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap,
        },
    }, {
        POSITION: [13, 8.5, 1, 0, 0, 140, 0, ],
    }, {
        POSITION: [4, 8.5, 1.7, 13, 0, 140, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap,
        },
    }, {
        POSITION: [20, 6, 0.9, 0, 0, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.halfreload]),
            TYPE: exports.swarm,
        },
    }],
};

// NPCS:
exports.crasher = {
    TYPE: 'crasher',
    LABEL: 'Crasher',
    COLOR: 5,
    SHAPE: 3,
    SIZE: 5,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: {
        NO_LEAD: true,
    },
    BODY: {
        SPEED: 5,
        ACCEL: 0.01,
        HEALTH: 0.5,
        DAMAGE: 5,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
};
exports.sentry = {
    PARENT: [exports.genericTank],
    TYPE: 'crasher',
    LABEL: 'Sentry',
    DANGER: 3,
    COLOR: 5,
    SHAPE: 3,
    SIZE: 10,
    SKILL: skillSet({
        rld: 0.5,
        dam: 0.8,
        pen: 0.8,
        str: 0.1,
        spd: 1,
        atk: 0.5,
        hlt: 0,
        shi: 0,
        rgn: 0.7,
        mob: 0,
    }),
    VALUE: 1500,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: {
        NO_LEAD: true,
    },
    BODY: {
        FOV: 0.5,
        ACCEL: 0.006,
        DAMAGE: base.DAMAGE * 2,
        SPEED: base.SPEED * 0.5,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothToTarget',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.sentry2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Sentry',
    DANGER: 3,
    COLOR: 5,
    SHAPE: 3,
    SIZE: 20,
    SKILL: skillSet({
        rld: 0.5,
        dam: 0.8,
        pen: 0.8,
        str: 0.1,
        spd: 1,
        atk: 0.5,
        hlt: 0,
        shi: 0,
        rgn: 0.7,
        mob: 0,
    }),
    VALUE: 1500,
    VARIES_IN_SIZE: true,
    BODY: {
        FOV: 2.5,
        ACCEL: 1,
        DAMAGE: base.DAMAGE * 2,
        SPEED: base.SPEED * 2.5,
    },
    MOTION_TYPE: 'motor',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.trapTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.5,
    },
    INDEPENDENT: true,
    CONTROLLERS: ['nearestDifferentMaster'],
    COLOR: 16,
    AI: {
        SKYNET: true,
        FULL_VIEW: true,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [16, 14, 1, 0, 0, 0, 0, ],
    }, {
        POSITION: [4, 14, 1.8, 16, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.lowpower, g.fast, g.halfreload]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap,
        },
    }, ],
};
exports.sentrySwarm = {
    PARENT: [exports.sentry],
    LABEL: 'Swarm Sentry',
    DANGER: 3,
    GUNS: [{
        POSITION: [7, 14, 0.6, 7, 0, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, ],
};
exports.sentrySwarm2 = {
    PARENT: [exports.sentry2],
    DANGER: 3,
    GUNS: [{
        POSITION: [7, 14, 0.6, 7, 0, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, ],
};
exports.sentryGun = makeAuto(exports.sentry, 'Gun Sentry', {
    type: exports.heavy3gun,
    size: 12,
});
exports.sentryTrap = makeAuto(exports.sentry, 'Trap Sentry', {
    type: exports.trapTurret,
    size: 12,
});
exports.sentryTwin = makeAuto(exports.sentry, 'Twin Sentry', {
    type: exports.auto4gun,
    size: 12,
});

exports.miniboss = {
    PARENT: [exports.genericTank],
    TYPE: 'miniboss',
    DANGER: 6,
    SKILL: skillSet({
        rld: 0.7,
        dam: 0.5,
        pen: 0.8,
        str: 0.8,
        spd: 0.2,
        atk: 0.3,
        hlt: 1,
        shi: 0.7,
        rgn: 0.7,
        mob: 0,
    }),
    LEVEL: 45,
    DISPLAY_NAME: true,
    CONTROLLERS: ['nearestDifferentMaster', 'minion', 'canRepel'],
    AI: {
        NO_LEAD: true,
    },
    HITS_OWN_TYPE: 'hard',
    BROADCAST_MESSAGE: 'A Visitor has Left!.',
};
exports.crasherSpawner = {
    PARENT: [exports.genericTank],
    LABEL: 'Spawned',
    STAT_NAMES: statnames.drone,
    CONTROLLERS: ['nearestDifferentMaster'],
    COLOR: 5,
    INDEPENDENT: true,
    AI: {
        chase: true,
    },
    MAX_CHILDREN: 4,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [6, 12, 1.2, 8, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.weak, g.weak]),
            TYPE: [exports.drone, {
                LABEL: 'Crasher',
                VARIES_IN_SIZE: true,
                DRAW_HEALTH: true
            }],
            SYNCS_SKILLS: true,
            AUTOFIRE: true,
            STAT_CALCULATOR: gunCalcNames.drone,
        },
    }, ],
};
exports.elite = {
    PARENT: [exports.miniboss],
    LABEL: 'Elite Crasher',
    COLOR: 5,
    SHAPE: 3,
    SIZE: 20,
    VARIES_IN_SIZE: true,
    VALUE: 150000,
    BODY: {
        FOV: 1.3,
        SPEED: base.SPEED * 0.25,
        HEALTH: base.HEALTH * 1.5,
        SHIELD: base.SHIELD * 1.25,
        REGEN: base.REGEN,
        DAMAGE: base.DAMAGE * 2.5,
    },
};
exports.rhobody = {
    PARENT: [exports.miniboss],
    LABEL: 'Rho',
    SHAPE: 5,
    SIZE: 25,
    COLOR: 14,
    VARIES_IN_SIZE: true,
    VALUE: 150000,
    BODY: {
        FOV: 1.3,
        SPEED: base.SPEED * 0.25,
        HEALTH: base.HEALTH * 1.5,
        SHIELD: base.SHIELD * 1.25,
        REGEN: base.REGEN,
        DAMAGE: base.DAMAGE * 2.5,
    },
};
exports.elite2 = {
    PARENT: [exports.miniboss],
    LABEL: 'Chocolatebar',
    COLOR: 1,
    SHAPE: 4,
    SIZE: 20,
    VARIES_IN_SIZE: true,
    VALUE: 150000,
    BODY: {
        FOV: 1.4,
        SPEED: base.SPEED * 0.25,
        HEALTH: base.HEALTH * 1.5,
        SHIELD: base.SHIELD * 1.25,
        REGEN: base.REGEN,
        DAMAGE: base.DAMAGE * 2.5,
        RELOAD: base.RELOAD * 5,
    },
};
exports.eternalshrinemaiden = {
    PARENT: [exports.miniboss],
    LABEL: 'Chocolatebar',
    SHAPE: 0,
    VARIES_IN_SIZE: false,
    VALUE: 150000,
    BODY: {
        FOV: 1.4,
        SPEED: base.SPEED * 0.25,
        HEALTH: base.HEALTH * 1.5,
        SHIELD: base.SHIELD * 1.25,
        REGEN: base.REGEN,
        DAMAGE: base.DAMAGE * 2.5,
        RELOAD: base.RELOAD * 1.3,
    },
};
// Mythical Crasher
// Code made by Ɦﻉɭɭƈคፕ
// Original idea by Rodrigo
// Implemented into ACarras by AC

// Turrets and crap:
exports.hexaTrapAutoGun = {
    LABEL: 'Hexa Trapper',
    BODY: {
        FOV: 2
    },
    COLOR: 16,
    HAS_NO_RECOIL: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapAltToFire'],
    GUNS: [{
        POSITION: [15, 7, 1, 0, 0, 0, 0]
    }, {
        POSITION: [3, 7, 1.7, 15, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.lessreload/*, g.auto*/]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap
        }
    }, {
        POSITION: [15, 7, 1, 0, 0, 60, 0]
    }, {
        POSITION: [3, 7, 1.7, 15, 0, 60, 0.5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.lessreload]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap
        }
    }, {
        POSITION: [15, 7, 1, 0, 0, 120, 0]
    }, {
        POSITION: [3, 7, 1.7, 15, 0, 120, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.lessreload]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap
        }
    }, {
        POSITION: [15, 7, 1, 0, 0, 180, 0]
    }, {
        POSITION: [3, 7, 1.7, 15, 0, 180, 0.5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.lessreload]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap
        }
    }, {
        POSITION: [15, 7, 1, 0, 0, 240, 0]
    }, {
        POSITION: [3, 7, 1.7, 15, 0, 240, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.lessreload]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap
        }
    }, {
        POSITION: [15, 7, 1, 0, 0, 300, 0]
    }, {
        POSITION: [3, 7, 1.7, 15, 0, 300, 0.5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.lessreload]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap
        }
    }]
};
exports.sniperAutoGun3 = {
    LABEL: 'Sniper',
    BODY: {
        FOV: 2
    },
    COLOR: 16,
    HAS_NO_RECOIL: true,
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
    GUNS: [{
        POSITION: [24, 8.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.halfreload, g.faster/*, g.auto*/]),
            TYPE: exports.bullet
        }
    }]
};
exports.pounderAutoGun2 = {
    LABEL: 'Pounder',
    BODY: {
        FOV: 1.25
    },
    COLOR: 5,
    HAS_NO_RECOIL: true,
    CONTROLLERS: ['onlyAcceptInArc', 'nearestDifferentMaster'],
    GUNS: [{
        POSITION: [20, 12, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.halfreload, g.faster/*, g.auto*/]),
            TYPE: exports.bullet
        }
    }]
};
exports.weirdGunnerAuto3 = {
    LABEL: 'Gunner',
    BODY: {
        FOV: 1.5
    },
    COLOR: 16,
    HAS_NO_RECOIL: true,
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
    GUNS: [{
        POSITION: [11, 2.5, 1, 0, 8.7, 0, 0.75],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.halfreload, g.lessreload]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [11, 2.5, 1, 0, -8.7, 0, 0.75],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.halfreload, g.lessreload]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [12.5, 2.5, 1, 0, 7.25, 0, 0.5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.halfreload, g.lessreload]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [12.5, 2.5, 1, 0, -7.25, 0, 0.5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.halfreload, g.lessreload]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [14, 2.5, 1, 0, 5.5, 0, 0.25],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.halfreload, g.lessreload]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [14, 2.5, 1, 0, -5.5, 0, 0.25],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.halfreload, g.lessreload]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [16.5, 2.4, 1, 0, 3.2, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.faster, g.halfreload, g.lessreload]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [16.5, 2.4, 1, 0, -3.2, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.faster, g.halfreload, g.lessreload]),
            TYPE: exports.bullet
        }
    }]
};
// Official boss export:
exports.mythicalCrasher = {
    PARENT: [exports.genericTank],
    LABEL: 'Mythical Crasher',
    DANGER: 9,
    SIZE: 66,
    COLOR: 5,
    SHAPE: 3,
    BODY: {
        SPEED: 1.25,
        ACCELERATION: 0.64,
        HEALTH: 3500,
        DAMAGE: 8,
        REGEN: base.REGEN * 0.45,
        FOV: 0.775
    },
    GUNS: [{
        POSITION: [3.5, 2.8, 1.4, 8, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.threequartersrof]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [3.5, 2.8, 1.4, 8, 5.5, 180, 0.333],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.threequartersrof]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [3.5, 2.8, 1.4, 8, 11, 180, 0.667],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.threequartersrof]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [3.5, 2.8, 1.4, 8, -5.5, 180, 0.333],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.threequartersrof]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [3.5, 2.8, 1.4, 8, -11, 180, 0.667],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.threequartersrof]),
            TYPE: exports.bullet
        }
    }],
    TURRETS: [{
        POSITION: [1.9, -5.7, 2.1, 0, 360, 1],
        TYPE: [exports.hexaTrapAutoGun, {
            CONTROLLERS: ['slowSpin']
        }]
    }, {
        POSITION: [1.9, -5.7, -2.1, 0, 360, 1],
        TYPE: [exports.hexaTrapAutoGun, {
            CONTROLLERS: ['slowSpinReverse']
        }]
    }, {
        POSITION: [2, 13.5, -1.35, 0, 220, 0],
        TYPE: exports.pounderAutoGun2
    }, {
        POSITION: [2, 10.7, -2.95, 0, 220, 0],
        TYPE: exports.pounderAutoGun2
    }, {
        POSITION: [2, 7.9, -4.575, 0, 220, 0],
        TYPE: exports.pounderAutoGun2
    }, {
        POSITION: [2, 5.1, -6.2, 0, 220, 0],
        TYPE: exports.pounderAutoGun2
    }, {
        POSITION: [2, 2.3, -7.8, 0, 220, 0],
        TYPE: exports.pounderAutoGun2
    }, {
        POSITION: [2, -0.5, -9.4, 0, 220, 0],
        TYPE: exports.pounderAutoGun2
    }, {
        POSITION: [2, -3.3, -11, 0, 220, 0],
        TYPE: exports.pounderAutoGun2
    }, {
        POSITION: [2, -6.1, -12.6, 0, 220, 0],
        TYPE: exports.pounderAutoGun2
    }, {
        POSITION: [2, 13.5, 1.35, 0, 220, 0],
        TYPE: exports.pounderAutoGun2
    }, {
        POSITION: [2, 10.7, 2.95, 0, 220, 0],
        TYPE: exports.pounderAutoGun2
    }, {
        POSITION: [2, 7.9, 4.575, 0, 220, 0],
        TYPE: exports.pounderAutoGun2
    }, {
        POSITION: [2, 5.1, 6.2, 0, 220, 0],
        TYPE: exports.pounderAutoGun2
    }, {
        POSITION: [2, 2.3, 7.8, 0, 220, 0],
        TYPE: exports.pounderAutoGun2
    }, {
        POSITION: [2, -0.5, 9.4, 0, 220, 0],
        TYPE: exports.pounderAutoGun2
    }, {
        POSITION: [2, -3.3, 11, 0, 220, 0],
        TYPE: exports.pounderAutoGun2
    }, {
        POSITION: [2, -6.1, 12.6, 0, 220, 0],
        TYPE: exports.pounderAutoGun2
    }, {
        POSITION: [2, 12.75, 0, 0, 361, 1],
        TYPE: exports.sniperAutoGun3
    }, {
        POSITION: [2, 10, -1.6, 0, 361, 1],
        TYPE: exports.sniperAutoGun3
    }, {
        POSITION: [2, 7.25, -3.2, 0, 361, 1],
        TYPE: exports.sniperAutoGun3
    }, {
        POSITION: [2, 4.5, -4.8, 0, 361, 1],
        TYPE: exports.sniperAutoGun3
    }, {
        POSITION: [2, 1.75, -6.4, 0, 361, 1],
        TYPE: exports.sniperAutoGun3
    }, {
        POSITION: [2, -1, -8, 0, 361, 1],
        TYPE: exports.sniperAutoGun3
    }, {
        POSITION: [2, -3.75, -9.6, 0, 361, 1],
        TYPE: exports.sniperAutoGun3
    }, {
        POSITION: [2, -6.4, -11.1, 0, 361, 1],
        TYPE: exports.sniperAutoGun3
    }, {
        POSITION: [2, 10, 1.6, 0, 361, 1],
        TYPE: exports.sniperAutoGun3
    }, {
        POSITION: [2, 7.25, 3.2, 0, 361, 1],
        TYPE: exports.sniperAutoGun3
    }, {
        POSITION: [2, 4.5, 4.8, 0, 361, 1],
        TYPE: exports.sniperAutoGun3
    }, {
        POSITION: [2, 1.75, 6.4, 0, 361, 1],
        TYPE: exports.sniperAutoGun3
    }, {
        POSITION: [2, -1, 8, 0, 361, 1],
        TYPE: exports.sniperAutoGun3
    }, {
        POSITION: [2, -3.75, 9.6, 0, 361, 1],
        TYPE: exports.sniperAutoGun3
    }, {
        POSITION: [2, -6.4, 11.1, 0, 361, 1],
        TYPE: exports.sniperAutoGun3
    }, {
        POSITION: [2, 2, 4.9, 270, 361, 1],
        TYPE: exports.weirdGunnerAuto3
    }, {
        POSITION: [2, 2, 2.5, 270, 361, 1],
        TYPE: exports.weirdGunnerAuto3
    }, {
        POSITION: [2, 2, 0.1, 270, 361, 1],
        TYPE: exports.weirdGunnerAuto3
    }, {
        POSITION: [2, 2, -2.3, 270, 361, 1],
        TYPE: exports.weirdGunnerAuto3
    }, {
        POSITION: [2, 2, -4.9, 90, 361, 1],
        TYPE: exports.weirdGunnerAuto3
    }, {
        POSITION: [2, 2, -2.5, 90, 361, 1],
        TYPE: exports.weirdGunnerAuto3
    }, {
        POSITION: [2, 2, -0.1, 90, 361, 1],
        TYPE: exports.weirdGunnerAuto3
    }, {
        POSITION: [2, 2, 2.3, 90, 361, 1],
        TYPE: exports.weirdGunnerAuto3
    }]
};
// Some thing
// Code by Hellcat (again)
// Original idea by the original dev of arras
// Actual Mothership:
exports.healMinion = {
    // TO DO: Retrofit this to have healing mechanics
    PARENT: [exports.minion],
    LABEL: 'Healing Minion',
    /*BODY: {
        FOV: 0.6,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: -1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
        RANGE: 100
    },*/
    GUNS: [{
        POSITION: [18, 8, -1.75, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minion]),
            TYPE: exports.bullet
        }
    }]
};
exports.healMinionSpawner = {
    LABEL: '',
    COLOR: 16,
    SHAPE: 6,
    MAX_CHILDREN: 6,
    GUNS: [{
        POSITION: [16.5, 9.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory, g.bigger, g.halfreload]),
            TYPE: exports.healMinion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true
        }
    }]
};
exports.autoOverdude = {
    PARENT: [exports.minion],
    LABEL: 'Overdude',
    INDEPENDENT: true,
    FACING_TYPE: 'autospin',
    GUNS: [{
        POSITION: [6, 12, 1.2, 8, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 2
        }
    }, {
        POSITION: [6, 12, 1.2, 8, 0, 120, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 2
        }
    }, {
        POSITION: [6, 12, 1.2, 8, 0, 240, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: [exports.drone, {
                INDEPENDENT: true
            }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 2
        }
    }]
};
var autoOverdudeSpawners = a => {
    return [{
        POSITION: [4, 3.5, 1.35, 8, 0, a, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory, g.doublesize, g.halfreload, g.halfreload]),
            TYPE: exports.autoOverdude,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            MAX_CHILDREN: 1
        }
    }];
};
exports.rangerAutoGun = {
    LABEL: 'Ranger',
    BODY: {
        FOV: 2
    },
    CONTROLLERS: ['onlyAcceptInArc', 'nearestDifferentMaster'],
    COLOR: 16,
    //INDEPENDENT: true,
    GUNS: [{
        POSITION: [32, 8.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.halfreload]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [5, 8.5, -1.6, 8, 0, 0, 0]
    }]
};
exports.gunnerAutoGun3 = {
    LABEL: 'Gunner',
    BODY: {
        FOV: 1.25
    },
    COLOR: 16,
    CONTROLLERS: ['onlyAcceptInArc', 'nearestDifferentMaster'],
    //INDEPENDENT: true,
    GUNS: [{
        POSITION: [17, 2.5, 1, 0, 6, 0, 0.667],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.lessrange, g.lessreload]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [17, 2.5, 1, 0, -6, 0, 0.333],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.lessrange, g.lessreload]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [18, 2.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.lessrange, g.lessreload]),
            TYPE: exports.bullet
        }
    }]
};
exports.mothership2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Mothership',
    DANGER: 8,
    SHAPE: 12,
    SIZE: 32,
    STAT_NAMES: statnames.generic,
    FACING_TYPE: 'autospin2',
    BODY: {
        REGEN: 0.001,
        ACCELERATION: 0.45,
        SPEED: 0.975,
        HEALTH: 1000,
        PUSHABILITY: 0.15,
        DENSITY: 0.2
    },
    GUNS: [],
    TURRETS: [{
        POSITION: [4.25, 5, 8.5, 0, 120, 1],
        TYPE: exports.rangerAutoGun
    }, {
        POSITION: [4.25, 5, 8.5, 120, 120, 1],
        TYPE: exports.rangerAutoGun
    }, {
        POSITION: [4.25, 5, 8.5, 240, 120, 1],
        TYPE: exports.rangerAutoGun
    }, {
        POSITION: [4.25, 5, 8.5, 60, 120, 1],
        TYPE: exports.gunnerAutoGun3
    }, {
        POSITION: [4.25, 5, 8.5, 180, 120, 1],
        TYPE: exports.gunnerAutoGun3
    }, {
        POSITION: [4.25, 5, 8.5, 300, 120, 1],
        TYPE: exports.gunnerAutoGun3
    }, {
        POSITION: [8.25, 0, 0, 0, 360, 1],
        TYPE: exports.healMinionSpawner
    }]
};
 var a = 0;
for (let i = 0; i < 6; i++) {
    a += 60;
    exports.mothership2.GUNS = exports.mothership2.GUNS.concat(autoOverdudeSpawners(a + 30));
  
}
exports.factsummoner = {
    PARENT: [exports.genericTank],
    LABEL: 'Factory Summoner',
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.15,
    },
    SHAPE: 4,
    SIZE: 32,
    COLOR: 1,
    FACING_TYPE: 'autospin',
    MAX_CHILDREN: 12,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [5, 12, 1.2, 8, 0, 90, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory, g.doublereload]),
            TYPE: exports.sfactminion,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
        },
    }, {
        POSITION: [5, 12, 1.2, 8, 0, 270, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory, g.doublereload]),
            TYPE: exports.sfactminion,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
        },
    }, {
        POSITION: [5, 12, 1.2, 8, 0, 0, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory, g.doublereload]),
            TYPE: exports.sfactminion,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            LABEL: 'Guard',
        },
    }, {
        POSITION: [5, 12, 1.2, 8, 0, 180, 0.75],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory, g.doublereload]),
            TYPE: exports.sfactminion,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            LABEL: 'Guard',
        },
    }, ],
};
exports.summoner = {
    PARENT: [exports.miniboss],
    LABEL: 'Summoner',
    DANGER: 7,
    COLOR: 3,
    SIZE: 32,
    STAT_NAMES: statnames.necro,
    BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.15,
    },
    SHAPE: 4,
    FACING_TYPE: 'autospin',
    MAX_CHILDREN: 36,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [3, 12, 1.2, 8, 0, 90, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
            TYPE: [exports.sunchip, {
                COLOR: 13
            }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro,
            COLOR: 13,
        },
    }, {
        POSITION: [3, 12, 1.2, 8, 0, 270, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
            TYPE: [exports.sunchip, {
                COLOR: 13
            }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro,
            COLOR: 13,
        },
    }, {
        POSITION: [3, 12, 1.2, 8, 0, 0, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.weak, g.doublereload]),
            TYPE: [exports.autosunchip, {
                COLOR: 13
            }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro,
            LABEL: 'Guard',

        },
    }, {
        POSITION: [3, 12, 1.2, 8, 0, 180, 0.75],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.weak, g.doublereload]),
            TYPE: [exports.autosunchip, {
                COLOR: 13
            }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro,
            LABEL: 'Guard',

        },
    }, ],
};
exports.summonerxxl = {
    PARENT: [exports.miniboss],
    LABEL: 'Summoner XXL',
    DANGER: 7,
    COLOR: 3,
    SIZE: 32,
    STAT_NAMES: statnames.necro,
    BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.15,
    },
    SHAPE: 4,
    FACING_TYPE: 'autospin',
    MAX_CHILDREN: 36,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [3, 12, 1.2, 8, 0, 90, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
            TYPE: [exports.sunchip, {
                COLOR: 13
            }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro,
            COLOR: 13,
        },
    }, {
        POSITION: [3, 12, 1.2, 8, 0, 270, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
            TYPE: [exports.sunchip, {
                COLOR: 13
            }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro,
            COLOR: 13,
        },
    }, {
        POSITION: [3, 12, 1.2, 8, 0, 0, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.weak, g.doublereload]),
            TYPE: [exports.autosunchip, {
                COLOR: 13
            }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro,
            LABEL: 'Guard',

        },
    }, {
        POSITION: [3, 12, 1.2, 8, 0, 180, 0.75],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.weak, g.doublereload]),
            TYPE: [exports.autosunchip, {
                COLOR: 13
            }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro,
            LABEL: 'Guard',

        },
    }, ],
    TURRETS: [{
        /*********  SIZE     X       Y     ANGLE    ARC */
        POSITION: [11, 0, 0, 0, 360, 1, ],
        TYPE: [exports.necromancer],
    }, {
        POSITION: [11, 0, 0, 0, 360, 1, ],
        TYPE: [exports.bigauto4gun, {
            INDEPENDENT: true,
            COLOR: 3,
        }]
    }, ],
};
var arc = 110;
var b = -arc;
var bAmount = 5;
let burstBulletGuns2 = b => {
    return [{
        POSITION: [0, 10.5, 1.2, 7, 0, b, 3.5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.morespeed, g.lessreload, g.bigger, g.morespeed2,  g.norng]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.swarm,
            AUTOFIRE: true
        }
    } , {
            POSITION: [0, 10.5, 1.2, 7, 0, b-3, 3.5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.morespeed, g.lessreload, g.bigger,  g.norng]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.swarm,
            AUTOFIRE: true
        }
    }, {
            POSITION: [0, 10.5, 1.2, 7, 0, b+3, 3.5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.morespeed, g.lessreload, g.bigger,  g.norng]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.swarm,
            AUTOFIRE: true
        }
    }];
};
exports.burstBullet2 = {
    PARENT: [exports.bullet],
    LABEL: 'Bursting Bullet',
    BODY: {
        RANGE: 90,
        SPEED: 0
    },
    MOTION_TYPE: 'glide',
    GUNS: [],
};
while(b <= arc) {
    exports.burstBullet2.GUNS = exports.burstBullet2.GUNS.concat(burstBulletGuns2(b));
    b += arc/bAmount;
}
exports.breaker = {
    PARENT: [exports.genericTank],
    LABEL: 'Breaker',
    DANGER: 7,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: 1.15
    },
    GUNS: [{
        POSITION: [18, 15, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
            TYPE: exports.burstBullet2
        }
    }, {
        POSITION: [15, 2, -8, 0, 0, 0, 0]
    }]
};

exports.elite_destroyer = {
    PARENT: [exports.elite],
    FACING_TYPE: 'autospin',
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [5, 16, 1, 6, 0, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
            TYPE: exports.bullet,
            LABEL: 'Devastator',
        },
    }, {
        POSITION: [5, 16, 1, 6, 0, 60, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
            TYPE: exports.bullet,
            LABEL: 'Devastator',
        },
    }, {
        POSITION: [5, 16, 1, 6, 0, -60, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
            TYPE: exports.bullet,
            LABEL: 'Devastator',
        },
    }, ],
    TURRETS: [{
        /*********  SIZE     X       Y     ANGLE    ARC */
        POSITION: [11, 0, 0, 180, 360, 0, ],
        TYPE: [exports.crasherSpawner]
    }, {
        POSITION: [11, 0, 0, 60, 360, 0, ],
        TYPE: [exports.crasherSpawner]
    }, {
        POSITION: [11, 0, 0, -60, 360, 0, ],
        TYPE: [exports.crasherSpawner]
    }, {
        POSITION: [11, 0, 0, 0, 360, 1, ],
        TYPE: [exports.bigauto4gun, {
            INDEPENDENT: true,
            COLOR: 5,
        }]
    }, ],
};
exports.guardian = {
    PARENT: [exports.elite],
    STAT_NAMES: statnames.swarm,
    AI: {
        chase: true,
    },
    SIZE: 32,
    LABEL: 'Guardian Redux',
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [2, 4, 1.2, 8, 0, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: [exports.swarm, {
                LABEL: 'Guardian Crasher',
                VARIES_IN_SIZE: true,
                DRAW_HEALTH: true
            }],
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [2, 4, 1.2, 8, 0, 135, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: [exports.autoswarm, {
                LABEL: 'Guardian Crasher',
                VARIES_IN_SIZE: true,
                DRAW_HEALTH: true
            }],
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [2, 4, 1.2, 8, 0, 215, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: [exports.swarm, {
                LABEL: 'Guardian Crasher',
                VARIES_IN_SIZE: true,
                DRAW_HEALTH: true
            }],
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [5, 16, 1.5, 6, 0, 180, 0, ],
    }, ],
    TURRETS: [{
        /*********  SIZE     X       Y     ANGLE    ARC */
        POSITION: [11, 0, 0, 0, 360, 1, ],
        TYPE: [exports.battleship, {
            INDEPENDENT: true,
            COLOR: 5,
        }]
    }, {
        POSITION: [14, 6, 0, 60, 190, 0],
        TYPE: [exports.spray, {
            COLOR: 5,
        }],
    }, {
        POSITION: [14, 6, 0, -60, 190, 0],
        TYPE: [exports.spray, {
            COLOR: 5,
        }],
    }, ],
};
exports.ultimateg = {
    PARENT: [exports.elite],
    STAT_NAMES: statnames.swarm,
    AI: {
        chase: true,
    },
    LABEL: 'Guardian Redux Duplicated',
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [2, 4, 1.2, 8, 0, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: [exports.swarm, {
                LABEL: 'Guardian Crasher',
                VARIES_IN_SIZE: true,
                DRAW_HEALTH: true
            }],
            SYNCS_SKILLS: true,
            AUTOFIRE: true,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [2, 4, 1.2, 8, 0, 135, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: [exports.autoswarm, {
                LABEL: 'Guardian Crasher',
                VARIES_IN_SIZE: true,
                DRAW_HEALTH: true
            }],
            SYNCS_SKILLS: true,
            AUTOFIRE: true,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [2, 4, 1.2, 8, 0, 215, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: [exports.swarm, {
                LABEL: 'Guardian Crasher',
                VARIES_IN_SIZE: true,
                DRAW_HEALTH: true
            }],
            SYNCS_SKILLS: true,
            AUTOFIRE: true,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [5, 16, 1.5, 6, 0, 180, 0, ],
    }, ],
    TURRETS: [{
        /*********  SIZE     X       Y     ANGLE    ARC */
        POSITION: [11, 0, 0, 0, 360, 1, ],
        TYPE: [exports.battleship, {
            INDEPENDENT: true,
            COLOR: 5,
        }]
    }, {
        POSITION: [14, 6, 0, 60, 190, 0],
        TYPE: [exports.spray, {
            COLOR: 5,
        }],
    }, {
        POSITION: [14, 6, 0, -60, 190, 0],
        TYPE: [exports.spray, {
            COLOR: 5,
        }],
    }, {
        POSITION: [14, 6, 20, 60, 190, 0],
        TYPE: [exports.guardian, {
            COLOR: 5,
        }],
    }, {
        POSITION: [14, 6, 20, -60, 190, 0],
        TYPE: [exports.guardian, {
            COLOR: 5,
        }],
    }, {
        POSITION: [14, 6, 20, 180, 190, 0],
        TYPE: [exports.guardian, {
            COLOR: 5,
        }],
    }, ],
};
exports.defendersupreme = {
        PARENT: [exports.miniboss],
        LABEL: 'Defender Supreme',
        SHAPE: 3,
        COLOR: 2,
        SIZE: 32,
        GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [13, 8, 1, 0, 0, 0, 0, ],
        }, {
            POSITION: [4, 8, 1.7, 13, 0, 0, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.block,
                STAT_CALCULATOR: gunCalcNames.block,
            },
        }, {
            POSITION: [13, 8, 1, 0, 0, 120, 0, ],
        }, {
            POSITION: [4, 8, 1.7, 13, 0, 120, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.block,
                STAT_CALCULATOR: gunCalcNames.block,
            },
        }, {
            POSITION: [13, 8, 1, 0, 0, 240, 0, ],
        }, {
            POSITION: [4, 8, 1.7, 13, 0, 240, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.block,
                STAT_CALCULATOR: gunCalcNames.block
            },
        }, {
            POSITION: [13, 8, 1, 0, 0, 60, 0, ],
        }, {
            POSITION: [4, 8, 1.7, 13, 0, 60, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.block,
                STAT_CALCULATOR: gunCalcNames.block,
            },
        }, {
            POSITION: [13, 8, 1, 0, 0, 180, 0, ],
        }, {
            POSITION: [4, 8, 1.7, 13, 0, 180, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.block,
                STAT_CALCULATOR: gunCalcNames.block,
            },
        }, {
            POSITION: [13, 8, 1, 0, 0, 300, 0, ],
        }, {
            POSITION: [4, 8, 1.7, 13, 0, 300, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.block,
                STAT_CALCULATOR: gunCalcNames.block
            },
        }, ],
        TURRETS: [{
            /*********  SIZE     X       Y     ANGLE    ARC */
            POSITION: [4, 3, 6, 60, 360, 1, ],
            TYPE: [exports.boomer]
        }, {
            POSITION: [4, 3, -6, -60, 360, 1, ],
            TYPE: [exports.boomer]
        }, {
            POSITION: [4, -7, 0, 180, 360, 1, ],
            TYPE: [exports.boomer]
        }, {
            POSITION: [8, 0, 0, 0, 360, 1, ],
            TYPE: [exports.tritrap]
        }, ],
    },
    exports.ultimated = {
    PARENT: [exports.miniboss],
    COLOR: 2,
    SIZE: 32,
    STAT_NAMES: statnames.swarm,
    AI: {
        chase: true,
    },
    LABEL: 'Defender Supreme Duplicated',
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [13, 8, 1, 0, 0, 0, 0, ],
        }, {
            POSITION: [4, 8, 1.7, 13, 0, 0, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.block,
                STAT_CALCULATOR: gunCalcNames.block,
            },
        }, {
            POSITION: [13, 8, 1, 0, 0, 120, 0, ],
        }, {
            POSITION: [4, 8, 1.7, 13, 0, 120, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.block,
                STAT_CALCULATOR: gunCalcNames.block,
            },
        }, {
            POSITION: [13, 8, 1, 0, 0, 240, 0, ],
        }, {
            POSITION: [4, 8, 1.7, 13, 0, 240, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.block,
                STAT_CALCULATOR: gunCalcNames.block
            },
        }, {
            POSITION: [13, 8, 1, 0, 0, 60, 0, ],
        }, {
            POSITION: [4, 8, 1.7, 13, 0, 60, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.block,
                STAT_CALCULATOR: gunCalcNames.block,
            },
        }, {
            POSITION: [13, 8, 1, 0, 0, 180, 0, ],
        }, {
            POSITION: [4, 8, 1.7, 13, 0, 180, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.block,
                STAT_CALCULATOR: gunCalcNames.block,
            },
        }, {
            POSITION: [13, 8, 1, 0, 0, 300, 0, ],
        }, {
            POSITION: [4, 8, 1.7, 13, 0, 300, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.block,
                STAT_CALCULATOR: gunCalcNames.block
            },
        }, ],
    TURRETS: [{
        /*********  SIZE     X       Y     ANGLE    ARC */
        POSITION: [4, 3, 6, 0, 360, 1, ],
            TYPE: [exports.boomer]
        }, {
            POSITION: [4, 3, -6, 0, 360, 1, ],
            TYPE: [exports.boomer]
        }, {
            POSITION: [4, -7, 0, 0, 360, 1, ],
            TYPE: [exports.boomer]
        }, {
            POSITION: [8, 0, 0, 0, 360, 1, ],
            TYPE: [exports.tritrap]
        }, {
        POSITION: [14, 6, 20, 120, 190, 0],
        TYPE: [exports.defendersupreme, {
            COLOR: 2,
        }],
    }, {
        POSITION: [14, 6, 20, 240, 190, 0],
        TYPE: [exports.defendersupreme, {
            COLOR: 2,
        }],
    }, {
        POSITION: [14, 6, 20, 0, 190, 0],
        TYPE: [exports.defendersupreme, {
            COLOR: 2,
        }],
    }, ],
};
exports.ultimated2 = {
    PARENT: [exports.miniboss],
    STAT_NAMES: statnames.swarm,
    AI: {
        chase: true,
    },
    COLOR: 2,
    SIZE: 32,
    LABEL: 'Defender Supreme Duplicated 2',
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [13, 8, 1, 0, 0, 0, 0, ],
        }, {
            POSITION: [4, 8, 1.7, 13, 0, 0, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.block,
                STAT_CALCULATOR: gunCalcNames.block,
            },
        }, {
            POSITION: [13, 8, 1, 0, 0, 120, 0, ],
        }, {
            POSITION: [4, 8, 1.7, 13, 0, 120, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.block,
                STAT_CALCULATOR: gunCalcNames.block,
            },
        }, {
            POSITION: [13, 8, 1, 0, 0, 240, 0, ],
        }, {
            POSITION: [4, 8, 1.7, 13, 0, 240, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.block,
                STAT_CALCULATOR: gunCalcNames.block
            },
        }, {
            POSITION: [13, 8, 1, 0, 0, 60, 0, ],
        }, {
            POSITION: [4, 8, 1.7, 13, 0, 60, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.block,
                STAT_CALCULATOR: gunCalcNames.block,
            },
        }, {
            POSITION: [13, 8, 1, 0, 0, 180, 0, ],
        }, {
            POSITION: [4, 8, 1.7, 13, 0, 180, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.block,
                STAT_CALCULATOR: gunCalcNames.block,
            },
        }, {
            POSITION: [13, 8, 1, 0, 0, 300, 0, ],
        }, {
            POSITION: [4, 8, 1.7, 13, 0, 300, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.block,
                STAT_CALCULATOR: gunCalcNames.block
            },
        }, ],
    TURRETS: [{
        /*********  SIZE     X       Y     ANGLE    ARC */
        POSITION: [4, 3, 6, 0, 360, 1, ],
            TYPE: [exports.boomer]
        }, {
            POSITION: [4, 3, -6, 0, 360, 1, ],
            TYPE: [exports.boomer]
        }, {
            POSITION: [4, -7, 0, 0, 360, 1, ],
            TYPE: [exports.boomer]
        }, {
            POSITION: [8, 0, 0, 0, 360, 1, ],
            TYPE: [exports.tritrap]
        }, {
        POSITION: [14, 6, 20, 120, 190, 0],
        TYPE: [exports.ultimated, {
            COLOR: 2,
        }],
    }, {
        POSITION: [14, 6, 20, 240, 190, 0],
        TYPE: [exports.ultimated, {
            COLOR: 2,
        }],
    }, {
        POSITION: [14, 6, 20, 0, 190, 0],
        TYPE: [exports.ultimated, {
            COLOR: 2,
        }],
    }, ],
};
exports.defendersupremeII = {
        PARENT: [exports.miniboss],
        LABEL: 'ArenaC Chaos Machine',
        SHAPE: 3,
        COLOR: 2,
        SIZE: 32,
        GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [13, 8, 1, 0, 0, 0, 0, ],
        }, {
            POSITION: [4, 8, 1.7, 13, 0, 0, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.block,
                STAT_CALCULATOR: gunCalcNames.block,
            },
        }, {
            POSITION: [13, 8, 1, 0, 0, 120, 0, ],
        }, {
            POSITION: [4, 8, 1.7, 13, 0, 120, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.block,
                STAT_CALCULATOR: gunCalcNames.block,
            },
        }, {
            POSITION: [13, 8, 1, 0, 0, 240, 0, ],
        }, {
            POSITION: [4, 8, 1.7, 13, 0, 240, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.block,
                STAT_CALCULATOR: gunCalcNames.block
            },
        }, {
            POSITION: [13, 8, 1, 0, 0, 60, 0, ],
        }, {
            POSITION: [4, 8, 1.7, 13, 0, 60, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.block,
                STAT_CALCULATOR: gunCalcNames.block,
            },
        }, {
            POSITION: [13, 8, 1, 0, 0, 180, 0, ],
        }, {
            POSITION: [4, 8, 1.7, 13, 0, 180, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.block,
                STAT_CALCULATOR: gunCalcNames.block,
            },
        }, {
            POSITION: [13, 8, 1, 0, 0, 300, 0, ],
        }, {
            POSITION: [4, 8, 1.7, 13, 0, 300, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.block,
                STAT_CALCULATOR: gunCalcNames.block
            },
                    POSITION: [13, 8, 1, 0, 0, 0, 0, ],
        }, {
            POSITION: [4, 8, 1.7, 13, 0, 0, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.boomer,
                STAT_CALCULATOR: gunCalcNames.block,
            },
        }, {
            POSITION: [13, 8, 1, 0, 0, 120, 0, ],
        }, {
            POSITION: [4, 8, 1.7, 13, 0, 120, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.boomer,
                STAT_CALCULATOR: gunCalcNames.block,
            },
        }, {
            POSITION: [13, 8, 1, 0, 0, 240, 0, ],
        }, {
            POSITION: [4, 8, 1.7, 13, 0, 240, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.boomer,
                STAT_CALCULATOR: gunCalcNames.block
            },
        }, {
            POSITION: [13, 8, 1, 0, 0, 60, 0, ],
        }, {
            POSITION: [4, 8, 1.7, 13, 0, 60, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.boomer,
                STAT_CALCULATOR: gunCalcNames.block,
            },
        }, {
            POSITION: [13, 8, 1, 0, 0, 180, 0, ],
        }, {
            POSITION: [4, 8, 1.7, 13, 0, 180, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.boomer,
                STAT_CALCULATOR: gunCalcNames.block,
            },
        }, {
            POSITION: [13, 8, 1, 0, 0, 300, 0, ],
        }, {
            POSITION: [4, 8, 1.7, 13, 0, 300, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.boomer,
                STAT_CALCULATOR: gunCalcNames.block
            },
        }, ],
        TURRETS: [{
            /*********  SIZE     X       Y     ANGLE    ARC */
            POSITION: [4, 3, 6, 0, 360, 1, ],
            TYPE: [exports.thing3]
        }, {
            POSITION: [4, 3, -6, 0, 360, 1, ],
            TYPE: [exports.thing3]
        }, {
            POSITION: [4, -7, 0, 0, 360, 1, ],
            TYPE: [exports.thing3]
        }, {
            POSITION: [8, 0, 0, 0, 360, 1, ],
            TYPE: [exports.guardian]
        }, ],
    },
    exports.elitetank = {
        PARENT: [exports.genericTank],
        COLOR: 8,
        SHAPE: 3,
        LABEL: 'atrium',
        FACING_TYPE: 'autospin',
        GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [5, 16, 1.3, 6, 0, 180, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                TYPE: exports.swarm,
                LABEL: 'Devastator',
            },
        }, {
            POSITION: [5, 16, 1.3, 6, 0, 60, 0.3, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                TYPE: exports.swarm,
                LABEL: 'Devastator',
            },
        }, {
            POSITION: [5, 16, 1.3, 6, 0, -60, 0.6, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                TYPE: exports.swarm,
                LABEL: 'Devastator',
            },
        }, ],
        TURRETS: [{
            /*********  SIZE     X       Y     ANGLE    ARC */
            POSITION: [11, 0, 0, 0, 360, 1, ],
            TYPE: [exports.construct, {
                COLOR: 16,
            }]
        }, ],
    };
exports.elite_gunner = {
    PARENT: [exports.elite],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [14, 16, 1, 0, 0, 180, 0, ],
    }, {
        POSITION: [4, 16, 1.5, 14, 0, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
            TYPE: [exports.pillbox, {
                INDEPENDENT: true,
            }],
        },
    }, {
        POSITION: [6, 14, -2, 2, 0, 60, 0, ],
    }, {
        POSITION: [6, 14, -2, 2, 0, 300, 0, ],
    }],
    AI: {
        NO_LEAD: false,
    },
    TURRETS: [{
        /*********  SIZE     X       Y     ANGLE    ARC */
        POSITION: [14, 8, 0, 60, 180, 0, ],
        TYPE: [exports.auto4gun],
    }, {
        POSITION: [14, 8, 0, 300, 180, 0, ],
        TYPE: [exports.auto4gun],
    }],
};
exports.elite_yuyuko = {
    PARENT: [exports.elite],
    MAX_CHILDREN: 10,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [14, 16, 1.5, -3, 0, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: [exports.autosmash, {
                CONTROLLERS: [
                    'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'
                ],
                SPEED: 3,
                LEVEL: 120,
                SIZE: 28,
            }],
        },
    }, ],
    AI: {
        NO_LEAD: false,
    },
    TURRETS: [{
        /*********  SIZE     X       Y     ANGLE    ARC */
        POSITION: [12, 8, 0, 60, 180, 1, ],
        TYPE: [exports.shotgun2],
    }, {
        POSITION: [6, 8, 10, 60, 180, 0, ],
        TYPE: [exports.shotgun2],
    }, {
        POSITION: [6, 8, -10, 300, 180, 0, ],
        TYPE: [exports.shotgun2],
    }, {
        POSITION: [12, 8, 0, 300, 180, 1, ],
        TYPE: [exports.shotgun2],
    }],
};
exports.elite_nurber = {
    PARENT: [exports.elite],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [14, 10, 1, 0, 3, 230, 0, ],
    }, {
        POSITION: [4, 10, 1.5, 14, 3, 230, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
            TYPE: [exports.pillbox, {
                INDEPENDENT: false,
            }],
        },
    }, {
        POSITION: [14, 10, 1, 0, -3, -230, 0, ],
    }, {
        POSITION: [4, 10, 1.5, 14, -3, -230, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
            TYPE: [exports.pillbox, {
                INDEPENDENT: false,
            }],
        },
    }, ],
    AI: {
        NO_LEAD: false,
    },
    TURRETS: [{
        /*********  SIZE     X       Y     ANGLE    ARC */
        POSITION: [10, 8, 0, 60, 180, 1, ],
        TYPE: [exports.machine],
    }, {
        POSITION: [10, 8, 0, 300, 180, 1, ],
        TYPE: [exports.machine],
    }],
};
exports.elite_hewn = {
    PARENT: [exports.elite],
    MAX_CHILDREN: 3,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [14, 10, 1.5, 0, 0, 60, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: [exports.hewnminion, {
                INDEPENDENT: false,
            }],
        },
    }, {
        POSITION: [14, 10, 1.5, 0, 0, -60, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: [exports.hewnminion, {
                INDEPENDENT: false,
            }],
        },
    }, {
        POSITION: [14, 10, 1.5, 0, 0, -180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: [exports.hewnminion, {
                INDEPENDENT: false,
            }],
        },
    }, ],
    AI: {
        NO_LEAD: false,
    },
    TURRETS: [{
        POSITION: [10, 0, 0, 0, 360, 1, ],
        TYPE: [exports.bentboomer],
    }, {
        POSITION: [3, 9, 0, 0, 360, 1, ],
        TYPE: [exports.builder],
    }, {
        POSITION: [3, 9, 0, 120, 360, 1, ],
        TYPE: [exports.builder],
    }, {
        POSITION: [3, 9, 0, -120, 360, 1, ],
        TYPE: [exports.builder],
    }],
};
exports.elite_hewn2 = {
    PARENT: [exports.elite],
    MAX_CHILDREN: 3,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [14, 10, 1.5, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: [exports.hewnminion, {
                INDEPENDENT: false,
            }],
        },
    }, ],
    AI: {
        NO_LEAD: false,
    },
    TURRETS: [{
        POSITION: [10, 0, 0, 0, 360, 1, ],
        TYPE: [exports.octo],
    }, ],
};
exports.elite_sprayer = {
    PARENT: [exports.elite],
    AI: {
        NO_LEAD: false,
    },
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [14, 6, 0, 180, 190, 0],
        TYPE: [exports.spray, {
            COLOR: 5,
        }],
    }, {
        POSITION: [14, 6, 0, 60, 190, 0],
        TYPE: [exports.spray, {
            COLOR: 5,
        }],
    }, {
        POSITION: [14, 6, 0, -60, 190, 0],
        TYPE: [exports.spray, {
            COLOR: 5,
        }],
    }, ],
};
exports.elite_cruiser = {
    PARENT: [exports.elite],
    AI: {
        NO_LEAD: false,
    },
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [14, 6, 0, 180, 190, 0],
        TYPE: [exports.director, {
            COLOR: 5,
        }],
    }, {
        POSITION: [14, 6, 0, 60, 190, 0],
        TYPE: [exports.cruiser, {
            COLOR: 5,
        }],
    }, {
        POSITION: [14, 6, 0, -60, 190, 0],
        TYPE: [exports.cruiser, {
            COLOR: 5,
        }],
    }, ],
};
exports.elite_sprayer2 = {
    PARENT: [exports.elite2],
    AI: {
        NO_LEAD: false,
    },
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [14, 6, 0, 180, 190, 0],
        TYPE: [exports.skimmer, {
            COLOR: 1,
        }],
    }, {
        POSITION: [14, 6, 0, 90, 190, 0],
        TYPE: [exports.skimmer, {
            COLOR: 1,
        }],
    }, {
        POSITION: [14, 6, 0, -90, 190, 0],
        TYPE: [exports.skimturret, {
            COLOR: 1,
        }],
    }, {
        POSITION: [14, 6, 0, 0, 190, 0],
        TYPE: [exports.skimturret, {
            COLOR: 1,
        }],
    }, ],
};
exports.elite_factory = {
    PARENT: [exports.elite],
    AI: {
        NO_LEAD: false,
    },
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [14, 6, 0, 180, 190, 0],
        TYPE: [exports.director, {
            COLOR: 5,
        }],
    }, {
        POSITION: [14, 6, 0, 60, 190, 0],
        TYPE: [exports.director, {
            COLOR: 5,
        }],
    }, {
        POSITION: [14, 6, 0, -60, 190, 0],
        TYPE: [exports.director, {
            COLOR: 5,
        }],
    }, ],
};
exports.rho = {
    PARENT: [exports.rhobody],
    COLOR: 14,
    AI: {
        NO_LEAD: false,
    },
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [14, 6, 0, 36, 190, 0],
        TYPE: [exports.pentagun, {
            COLOR: 14,
        }],
    }, {
        POSITION: [14, 6, 0, -36, 190, 0],
        TYPE: [exports.pentagun, {
            COLOR: 14,
        }],
    }, {
        POSITION: [14, 2, 0, 108, 0, 0],
        TYPE: [exports.crasherSpawner, {
            COLOR: 14,
        }],
    }, {
        POSITION: [14, 2, 0, -108, 0, 0],
        TYPE: [exports.crasherSpawner, {
            COLOR: 14,
        }],
    }, {
        POSITION: [14, 2, 0, -180, 0, 0],
        TYPE: [exports.crasherSpawner, {
            COLOR: 14,
        }],
    }, ],
};
exports.theta = {
    PARENT: [exports.rhobody],
    COLOR: 14,
    LABEL: 'Theta',
    AI: {
        NO_LEAD: false,
    },
    TURRETS: [{
        POSITION: [14, 0, 0, 36, 0, 0],
        TYPE: [exports.pent2, {
            COLOR: 1,
        }],
    }, {
        POSITION: [14, 0, 0, -36, 0, 0],
        TYPE: [exports.pent2, {
            COLOR: 1,
        }],
    }, {
        POSITION: [14, 0, 0, 108, 0, 0],
        TYPE: [exports.pent2, {
            COLOR: 1,
        }],
    }, {
        POSITION: [14, 0, 0, -108, 0, 0],
        TYPE: [exports.pent2, {
            COLOR: 1,
        }],
    }, {
        POSITION: [14, 0, 0, -180, 0, 0],
        TYPE: [exports.pent2, {
            COLOR: 1,
        }],
    }, ],
};
exports.palisade = (() => {
    let props = {
        SHOOT_SETTINGS: combineStats([g.factory, g.pound, g.halfreload, g.halfreload]),
        TYPE: exports.minion,
        STAT_CALCULATOR: gunCalcNames.drone,
        AUTOFIRE: true,
        MAX_CHILDREN: 1,
        SYNCS_SKILLS: true,
        WAIT_TO_CYCLE: true,
    };
    return {
        PARENT: [exports.miniboss],
        LABEL: 'Rogue Palisade',
        COLOR: 17,
        SHAPE: 6,
        SIZE: 28,
        VALUE: 500000,
        BODY: {
            FOV: 1.3,
            SPEED: base.SPEED * 0.1,
            HEALTH: base.HEALTH * 2,
            SHIELD: base.SHIELD * 2,
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 3,
        },
        GUNS: [{ /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [4, 6, -1.6, 8, 0, 0, 0, ],
            PROPERTIES: props,
        }, {
            POSITION: [4, 6, -1.6, 8, 0, 60, 0, ],
            PROPERTIES: props,
        }, {
            POSITION: [4, 6, -1.6, 8, 0, 120, 0, ],
            PROPERTIES: props,
        }, {
            POSITION: [4, 6, -1.6, 8, 0, 180, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                TYPE: exports.minion,
                STAT_CALCULATOR: gunCalcNames.drone,
                AUTOFIRE: true,
                MAX_CHILDREN: 1,
                SYNCS_SKILLS: true,
                WAIT_TO_CYCLE: true
            }
        }, {
            POSITION: [4, 6, -1.6, 8, 0, 240, 0],
            PROPERTIES: props,
        }, {
            POSITION: [4, 6, -1.6, 8, 0, 300, 0],
            PROPERTIES: props,
        }],
        TURRETS: [{
            POSITION: [5, 10, 0, 30, 110, 0],
            TYPE: exports.trapTurret
        }, {
            POSITION: [5, 10, 0, 90, 110, 0],
            TYPE: exports.trapTurret
        }, {
            POSITION: [5, 10, 0, 150, 110, 0],
            TYPE: exports.trapTurret
        }, {
            POSITION: [5, 10, 0, 210, 110, 0],
            TYPE: exports.trapTurret
        }, {
            POSITION: [5, 10, 0, 270, 110, 0],
            TYPE: exports.trapTurret
        }, {
            POSITION: [5, 10, 0, 330, 110, 0],
            TYPE: exports.trapTurret
        }],
    };
})();
exports.heptisade = (() => {
    let props = {
        SHOOT_SETTINGS: combineStats([g.factory, g.pound, g.halfreload, g.halfreload]),
        TYPE: exports.minion,
        STAT_CALCULATOR: gunCalcNames.drone,
        AUTOFIRE: true,
        MAX_CHILDREN: 1,
        SYNCS_SKILLS: true,
        WAIT_TO_CYCLE: true,
    };
    return {
        PARENT: [exports.miniboss],
        LABEL: 'Hepti',
        COLOR: 10,
        SHAPE: 7,
        SIZE: 28,
        VALUE: 500000,
        BODY: {
            FOV: 1.3,
            SPEED: base.SPEED * 0.1,
            HEALTH: base.HEALTH * 2,
            SHIELD: base.SHIELD * 2,
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 3,
        },
        GUNS: [{ /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [4, 6, -1.6, 8, 0, 231.428571429, 0, ],
            PROPERTIES: props,
        }, {
            POSITION: [4, 6, -1.6, 8, 0, 231.428571429 + 2 * 51.4285714286, 0, ],
            PROPERTIES: props,
        }, {
            POSITION: [4, 6, -1.6, 8, 0, 231.428571429 + 3 * 51.4285714286, 0, ],
            PROPERTIES: props,
        }, {
            POSITION: [4, 6, -1.6, 8, 0, 231.428571429 + 4 * 51.4285714286, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                TYPE: exports.minion,
                STAT_CALCULATOR: gunCalcNames.drone,
                AUTOFIRE: true,
                MAX_CHILDREN: 1,
                SYNCS_SKILLS: true,
                WAIT_TO_CYCLE: true
            }
        }, {
            POSITION: [4, 6, -1.6, 8, 0, 231.428571429 + 5 * 51.4285714286, 0],
            PROPERTIES: props,
        }, {
            POSITION: [4, 6, -1.6, 8, 0, 231.428571429 + 6 * 51.4285714286, 0],
            PROPERTIES: props,
        }, {
            POSITION: [4, 6, -1.6, 8, 0, -51.4285714286 + (-25.7142857143), 0],
            PROPERTIES: props,
        }],
        TURRETS: [{
            POSITION: [5, 10, 0, 360 / 7, 110, 0],
            TYPE: exports.trapTurret
        }, {
            POSITION: [5, 10, 0, 360 / 7 * 2, 110, 0],
            TYPE: exports.trapTurret
        }, {
            POSITION: [5, 10, 0, 360 / 7 * 3, 110, 0],
            TYPE: exports.trapTurret
        }, {
            POSITION: [5, 10, 0, 360 / 7 * 4, 110, 0],
            TYPE: exports.trapTurret
        }, {
            POSITION: [5, 10, 0, 360 / 7 * 5, 110, 0],
            TYPE: exports.trapTurret
        }, {
            POSITION: [5, 10, 0, 360 / 7 * 6, 110, 0],
            TYPE: exports.trapTurret
        }, {
            POSITION: [5, 10, 0, 360 / 7 * 7, 110, 0],
            TYPE: exports.trapTurret
        }],
    };
})();
exports.bot = {
    AUTO_UPGRADE: 'random',
    FACING_TYPE: 'looseToTarget',
    BODY: {
        SIZE: 10
    },
    NAME: "ai_",
    CONTROLLERS: ['nearestDifferentMaster', 'mapAltToFire', 'minion', 'fleeAtLowHealth'],
    AI: {
        STRAFE: true
    }
};
exports.part = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    SHAPE: 3,
    COLOR: 14,
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [12, 0, 0, 0, 360, 1],
        TYPE: exports.accelerator,
    }, ],
};
exports.part2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    SHAPE: 3,
    COLOR: 14,
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [12, 0, 0, 0, 360, 1],
        TYPE: exports.minitrap,
    }, ],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 8, 1, 0, 0, 60, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, -60, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.wat = makeHybrid(exports.pound, 'Harvester');
exports.hexoo = {
    PARENT: [exports.genericTank],
    COLOR: 14,
    SHAPE: 5,
    LABEL: 'oriental battle pentagon',
    TURRETS: [{
        POSITION: [8.5, 13, 0, -144 + 36, 0, 0],
        TYPE: [exports.part, {
            COLOR: 14,
            AUTOFIRE: true,
        }],
    }, {
        POSITION: [8.5, 13, 0, 144 - 36, 0, 0],
        TYPE: [exports.part, {
            COLOR: 14,
            AUTOFIRE: true,
        }],
    }, ],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [12, 4, 1, 0, 0, 36, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.morespeed, g.doublereload]),
            TYPE: exports.bullet,
            LABEL: 'Front',
        },
    }, {
        POSITION: [12, 4, 1, 0, 0, -36, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.morespeed, g.doublereload]),
            TYPE: exports.bullet,
            LABEL: 'Front',
        },
    }, ],
};

exports.hexoo2 = {
    PARENT: [exports.genericTank],
    COLOR: 14,
    SHAPE: 5,
    SIZE: 20,
    LABEL: 'OBP2',
    TURRETS: [{
        POSITION: [8.5, 13, 0, -144 + 36, 0, 0],
        TYPE: [exports.part2, {
            COLOR: 14,
            AUTOFIRE: true,
        }],
    }, {
        POSITION: [6.5, 13, 0, -180, 0, 0],
        TYPE: [exports.part, {
            COLOR: 14,
            AUTOFIRE: true,
        }],
    }, {
        POSITION: [12.5, 0, 0, 0, 360, 1],
        TYPE: [exports.oldAutoSmasherTurret, {
            COLOR: 14,
            AUTOFIRE: true,
        }],
    }, {
        POSITION: [8.5, 13, 0, 144 - 36, 0, 0],
        TYPE: [exports.part2, {
            COLOR: 14,
            AUTOFIRE: true,
        }],
    }, ],
};
exports.billgun = {
    PARENT: [exports.genericTank],
    LABEL: 'Basic',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.billgates,
            LABEL: '', // def
            STAT_CALCULATOR: 0, // def
            WAIT_TO_CYCLE: false, // def
            AUTOFIRE: false, // def
            SYNCS_SKILLS: false, // def         
            MAX_CHILDREN: 0, // def  
            ALT_FIRE: false, // def 
            NEGATIVE_RECOIL: false, // def
        },
    }, ],
};
exports.billgates = makeAuto(exports.trap2, 'Automater', {
    type: exports.basic,
    size: 10,
    independent: false,
});
exports.missile123 = {
    PARENT: [exports.bullet],
    SHAPE: 0,
    LABEL: 'Logical assimilation',
    INDEPENDENT: true,
    VARIES_IN_SIZE: true,
    BODY: {
        RANGE: 120,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [14, 6, 1, 0, -2, 130, 0, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil,

                g.morespeed, g.morespeed
            ]),
            TYPE: [exports.billgates, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, {
        POSITION: [14, 6, 1, 0, 2, 230, 0, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil,

                g.morespeed, g.morespeed
            ]),
            TYPE: [exports.billgates, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, ],
};
exports.techno = {
    PARENT: [exports.genericTank],
    LABEL: "Techno",
    SIZE: 12,
    SHAPE: 0,
    GUNS: [{
            POSITION: [22.154, 3.2, 1, 0, -8.308, 0, 0],
        },
        {
            POSITION: [4.154, 4.8, 1, 21.6, -8.308, 0, 0],
        },
        {
            POSITION: [22.154, 3.2, 1, 0, 8.308, 0, 0],
        },
        {
            POSITION: [4.154, 4.8, 1, 21.6, 8.308, 0, 0],
        },
        {
            POSITION: [4.154, 4.8, 1, 21.6, 8.308, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [18, 1.4, 0.1, 1, 1, 0.75, 1, 4.5, 1, 1, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [4.154, 4.8, 1, 21.6, -8.308, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [18, 1.4, 0.1, 1, 1, 0.75, 1, 4.5, 1, 1, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [4.154, 4.8, 1, 21.6, -8.308, 0, 1.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [18, 1.4, 0.1, 1, 1, 0.75, 1, 4.5, 1, 1, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [4.154, 4.8, 1, 21.6, 8.308, 0, 1.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [18, 1.4, 0.1, 1, 1, 0.75, 1, 4.5, 1, 1, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [4.154, 4.8, 1, 21.6, 8.308, 0, 2.3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [18, 1.4, 0.1, 1, 1, 0.75, 1, 4.5, 1, 1, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [4.154, 4.8, 1, 21.6, -8.308, 0, 2.3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [18, 1.4, 0.1, 1, 1, 0.75, 1, 4.5, 1, 1, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [4.154, 4.8, 1, 16.615, 0, 0, 3.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [18, 1.4, 0.1, 1, 1, 0.75, 1, 4.5, 1, 1, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [4.154, 4.8, 1, 15.231, -2.769, 0, 3.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [18, 1.4, 0.1, 1, 1, 0.75, 1, 4.5, 1, 1, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [4.154, 4.8, 1, 15.231, 2.769, 0, 3.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [18, 1.4, 0.1, 1, 1, 0.75, 1, 4.5, 1, 1, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [4.154, 4.8, 1, 13.846, 5.538, 0, 3.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [18, 1.4, 0.1, 1, 1, 0.75, 1, 4.5, 1, 1, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [4.154, 4.8, 1, 13.846, -5.538, 0, 3.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [18, 1.4, 0.1, 1, 1, 0.75, 1, 4.5, 1, 1, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [4.154, 4.8, 1, 13.846, 0, 0, 3.5],
        },
        {
            POSITION: [0.6923333333333332, 4.8, 1.3, 13.846, 0, 0, 3.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange, g.machgun]),
                TYPE: exports.trap
            },
        },
        {
            POSITION: [13.846, 8, 1, 0, 0, 0, 3.5],
        },
        {
            POSITION: [2.307692307692308, 7.199999999999999, 1.2, 8, 8.308, 285, 3.5],
        },
        {
            POSITION: [2.307692307692308, 7.199999999999999, 1.2, 8, -8.308, 75, 3.5],
        },
        {
            POSITION: [9.138, 1.6, 1, 11.077, 8.308, 345, 3.5],
        },
        {
            POSITION: [9.138, 1.6, 1, 11.077, -8.308, 15, 3.5],
        },
        {
            POSITION: [9.138, 1.6, 1, 2.769, 0, 0, 3.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [18, 1.4, 0.1, 1, 1, 0.75, 1, 4.5, 1, 1, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet
            },
        },
    ],
};
exports.sbasic = {
    PARENT: [exports.genericTank],
    LABEL: 'Supertank™',
    SIZE: 120,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.15,
        HEALTH: 9000,
    },
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.norng]),
            TYPE: exports.bullet,
            LABEL: '', // def
            STAT_CALCULATOR: 0, // def
            WAIT_TO_CYCLE: false, // def
            AUTOFIRE: false, // def
            SYNCS_SKILLS: false, // def         
            MAX_CHILDREN: 0, // def  
            ALT_FIRE: false, // def 
            NEGATIVE_RECOIL: false, // def
        },
    }, ],
};
exports.skimmer3 = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: base.FOV * 1.15,
    },
    SHAPE: 0,
    LABEL: 'TESTBED',
    DANGER: 7,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [10, 14, -0.2, 9, 0, 0, 0, ],
    }, {
        POSITION: [17, 15, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim, g.morespeed]),
            TYPE: exports.missile123,
            STAT_CALCULATOR: gunCalcNames.sustained,
        },
    }, ],
};
exports.stalker = {
    PARENT: [exports.genericTank],
    DANGER: 7,
    LABEL: 'Stalker',
    BODY: {
        ACCELERATION: base.ACCELERATION * 0.55,
        SPEED: base.SPEED * 0.85,
        FOV: base.FOV * 1.35,
    },
    INVISIBLE: [0.08, 0.03],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [27, 8.5, -2, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.banshee2 = {
    PARENT: [exports.genericTank],
    LABEL: '63500 wat',
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * 0.5,
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.1,
    },
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [10, 8, 0, 90, 360, 0],
        TYPE: [exports.gunner, {
            INDEPENDENT: false,
        }],
    }, {
        POSITION: [10, 8, 0, -90, 360, 0],
        TYPE: [exports.gunner, {
            INDEPENDENT: false,
        }],
    }, ],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [6, 11, 1.2, 8, 0, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.doublereload]),
            TYPE: exports.billgates,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, ]
};
exports.bugcarrier = {
    PARENT: [exports.genericTank],
    LABEL: 'Airship',
    DANGER: 7,
    SHAPE: 0,
    STAT_NAMES: statnames.swarm,
    FACING_TYPE: 'locksFacing',
    MAX_CHILDREN: 10,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 2.3,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [10, 11, -0.9, 9, 0, 0, 0, ],
    }, {
        POSITION: [7, 15.5, 0.8, 7, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
            TYPE: [exports.booster, {
                CONTROLLERS: [
                    'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel'
                ],
                SPEED: 3,
                SIZE: 28,
                LEVEL: 60,
                CAN_BE_ON_LEADERBOARD: false,
            }],
            STAT_CALCULATOR: gunCalcNames.swarm,
        },


    }],
};
exports.autokys = {
    PARENT: [exports.genericTank],
    LABEL: 'Auto-waitwhat',
    DANGER: 7,
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [11, 8, 0, 90, 360, 0],
        TYPE: exports.quadtrapper,
    }, {
        POSITION: [11, 8, 0, -90, 360, 0],
        TYPE: exports.quadtrapper,
    }, ],
};
exports.baseProtector2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Base',
    SIZE: 74,
    DAMAGE_CLASS: 0,
    ACCEPTS_SCORE: false,
    CAN_BE_ON_LEADERBOARD: false,
    SKILL: skillSet({
        rld: 1,
        dam: 1,
        pen: 1,
        spd: 1,
        str: 1,
    }),
    BODY: { // def
        SPEED: 0,
        HEALTH: 10000,
        DAMAGE: 10,
        PENETRATION: 0.25,
        SHIELD: 1000,
        REGEN: 100,
        FOV: 1,
        PUSHABILITY: 0,
        HETERO: 0,
    },
    //CONTROLLERS: ['nearestDifferentMaster'],
    FACING_TYPE: 'autospin',
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [25, 0, 0, 0, 360, 0],
        TYPE: exports.dominationBody2,
    }, {
        POSITION: [12, 7, 0, 72, 100, 0],
        TYPE: exports.baseSwarmTurret,
    }, {
        POSITION: [12, 7, 0, 144, 100, 0],
        TYPE: exports.baseSwarmTurret,
    }, {
        POSITION: [12, 7, 0, -72, 100, 0],
        TYPE: exports.baseSwarmTurret,
    }, {
        POSITION: [12, 7, 0, -144, 100, 0],
        TYPE: exports.baseSwarmTurret,
    }, {
        POSITION: [12, 7, 0, 0, 100, 0],
        TYPE: exports.baseSwarmTurret,
    }, ],
    GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
        POSITION: [4.5, 11.5, -1.3, 6, 0, 72, 0, ],
    }, {
        POSITION: [4.5, 11.5, -1.3, 6, 0, 144, 0, ],
    }, {
        POSITION: [4.5, 11.5, -1.3, 6, 0, -72, 0, ],
    }, {
        POSITION: [4.5, 11.5, -1.3, 6, 0, -144, 0, ],
    }, {
        POSITION: [4.5, 11.5, -1.3, 6, 0, 0, 0, ],
    }, {
        POSITION: [4.5, 8.5, -1.5, 7, 0, 72, 0, ],
    }, {
        POSITION: [4.5, 8.5, -1.5, 7, 0, 144, 0, ],
    }, {
        POSITION: [4.5, 8.5, -1.5, 7, 0, -72, 0, ],
    }, {
        POSITION: [4.5, 8.5, -1.5, 7, 0, -144, 0, ],
    }, {
        POSITION: [4.5, 8.5, -1.5, 7, 0, 0, 0, ],
    }, ],
}
exports.megaminitrap = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    LABEL: '',
    STAT_NAMES: statnames.trap,
    BODY: {
        FOV: 1.15,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [24, 18, 1, 0, 0, 0, 0, ],
    }, {
        POSITION: [4, 18, 1.3, 22, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap,
        },
    }, {
        POSITION: [4, 18, 1.3, 18, 0, 0, 0.333, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap,
        },
    }, {
        POSITION: [4, 18, 1.3, 14, 0, 0, 0.667, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap,
        },
    }, ],
};
exports.test3 = {
    PARENT: [exports.genericTank],
    LABEL: 'Spinning dial',
    DANGER: 6,
    FACING_TYPE: 'autospin',
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [11, 7, 0, -90, 360, 0, ],
        TYPE: [exports.accelerator, {
            COLOR: 16,
            CONTROLLERS: ['reversespin'],
        }]
    }, {
        POSITION: [13, 0, 0, 0, 360, 1, ],
        TYPE: [exports.genericTank, {
            COLOR: 16,
        }]
    }, {
        POSITION: [11, 7, 0, 90, 360, 0, ],
        TYPE: [exports.accelerator, {
            COLOR: 16,
            CONTROLLERS: ['reversespin'],
        }]
    }, ],
};
exports.luna = {
    PARENT: [exports.genericTank],
    LABEL: '?',
    DANGER: 7,
    COLOR: 16,
    SIZE: 40,
    FACING_TYPE: 'autospin',
    SHAPE: 7,
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [10, 8, 0, 231.428571429, 220, 0],
        TYPE: exports.builder3,
    }, {
        POSITION: [10, 8, 0, 231.428571429 + 2 * 51.4285714286, 220, 0],
        TYPE: exports.builder3,
    }, {
        POSITION: [10, 8, 0, 231.428571429 + 3 * 51.4285714286, 220, 0],
        TYPE: exports.builder3,
    }, {
        POSITION: [10, 8, 0, 231.428571429 + 4 * 51.4285714286, 220, 0],
        TYPE: exports.builder3,
    }, {
        POSITION: [10, 8, 0, 231.428571429 + 5 * 51.4285714286, 220, 0],
        TYPE: exports.builder3,
    }, {
        POSITION: [10, 8, 0, 231.428571429 + 6 * 51.4285714286, 220, 0],
        TYPE: exports.builder3,
    }, {
        POSITION: [10, 8, 0, -51.4285714286 + (-25.7142857143), 220, 0],
        TYPE: exports.builder3,
    }, ],
};
exports.luna2 = {
    PARENT: [exports.genericTank],
    LABEL: '???',
    DANGER: 7,
    COLOR: 16,
    SIZE: 40,
    FACING_TYPE: 'autospin',
    SHAPE: 7,
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [8, 10, 0, 231.428571429, 220, 0],
        TYPE: exports.luna,
    }, {
        POSITION: [8, 10, 0, 231.428571429 + 2 * 51.4285714286, 220, 0],
        TYPE: exports.luna,
    }, {
        POSITION: [8, 10, 0, 231.428571429 + 3 * 51.4285714286, 220, 0],
        TYPE: exports.luna,
    }, {
        POSITION: [8, 10, 0, 231.428571429 + 4 * 51.4285714286, 220, 0],
        TYPE: exports.luna,
    }, {
        POSITION: [8, 10, 0, 231.428571429 + 5 * 51.4285714286, 220, 0],
        TYPE: exports.luna,
    }, {
        POSITION: [8, 10, 0, 231.428571429 + 6 * 51.4285714286, 220, 0],
        TYPE: exports.luna,
    }, {
        POSITION: [8, 10, 0, -51.4285714286 + (-25.7142857143), 220, 0],
        TYPE: exports.luna,
    }, ],
};
exports.juhac = {
    PARENT: [exports.genericTank],
    LABEL: 'Serbian Tram',
    DANGER: 7,
    FACING_TYPE: 'autospin',
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [13, 8, 0, 0, 90, 0],
        TYPE: exports.minitrap,
    }, {
        POSITION: [13, 8, 0, 120, 90, 0],
        TYPE: exports.minitrap,
    }, {
        POSITION: [13, 8, 0, -120, 90, 0],
        TYPE: exports.minitrap,
    }, ],
};
exports.testoof = {
    PARENT: [exports.genericTank],
    LABEL: 'Luna dial',
    DANGER: 6,
    FACING_TYPE: 'autospin',
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [10, 8, 0, 0, 360, 0, ],
        TYPE: [exports.flank, {
            COLOR: 16,
            CONTROLLERS: ['testspin'],
        }]
    }, {
        POSITION: [10, 8, 0, 90, 360, 0, ],
        TYPE: [exports.flank, {
            COLOR: 16,
            CONTROLLERS: ['testspin'],
        }]
    }, {
        POSITION: [10, 8, 0, 180, 360, 0, ],
        TYPE: [exports.flank, {
            COLOR: 16,
            CONTROLLERS: ['testspin'],
        }]
    }, {
        POSITION: [10, 8, 0, -90, 360, 0, ],
        TYPE: [exports.flank, {
            COLOR: 16,
            CONTROLLERS: ['testspin'],
        }]
    }, {
        POSITION: [13, 0, 0, 0, 360, 1, ],
        TYPE: [exports.hexa, {
            COLOR: 16,
            CONTROLLERS: ['reversespin'],
        }]
    }, ],
};
exports.skimboss = {
    PARENT: [exports.genericTank],
    BODY: {
        HEALTH: 300,
        DAMAGE: 2,
        SHIELD: 200,
    },
    LABEL: 'skimboss improved',
    SHAPE: 3,
    COLOR: 2,
    FACING_TYPE: 'autospin',
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [15, 5, 0, 60, 170, 0],
        TYPE: exports.skimturret,
    }, {
        POSITION: [15, 5, 0, 180, 170, 0],
        TYPE: exports.skimturret,
    }, {
        POSITION: [15, 5, 0, 300, 170, 0],
        TYPE: exports.skimturret,
    }, {
        POSITION: [4, 3, 6, 0, 360, 1, ],
        TYPE: [exports.boomer]
    }, {
        POSITION: [4, 3, -6, 0, 360, 1, ],
        TYPE: [exports.boomer]
    }, {
        POSITION: [4, -7, 0, 0, 360, 1, ],
        TYPE: [exports.boomer]
    }, ],
};

// TESTBED Upgrade path (Improved by Hellcat on behalf of Cupcake)`  
exports.testbed.UPGRADES_TIER_2 = [exports.testbedboss, exports.testbedsentry, exports.testbedmisc, exports.basic];
exports.testbedboss.UPGRADES_TIER_3 = [exports.hk1, exports.hk2, exports.hk2_1, exports.hk3, exports.hk4, exports.hk5, exports.factsummoner, exports.testbedbossp2];
exports.testbedbossp2.UPGRADES_TIER_3 = [exports.elite_sprayer, exports.palisade, exports.elite_gunner, exports.elite_destroyer, exports.guardian, exports.heptisade, exports.hpk1, exports.testbedbossp3];
exports.testbedbossp3.UPGRADES_TIER_3 = [exports.hpk2, exports.obs1, exports.defendersupreme, exports.summoner, exports.obs2, exports.skimboss, exports.elite_cruiser, exports.testbedbossp4];
exports.testbedbossp4.UPGRADES_TIER_3 = [exports.mythicalCrasher];
exports.testbedmisc.UPGRADES_TIER_3 = [exports.baseProtector, exports.banshee, exports.conq, exports.techno, exports.overcruiser, exports.moomoo, exports.trapattack, exports.testbedmiscp2];
exports.testbedsentry.UPGRADES_TIER_3 = [exports.sentryTrap, exports.sentryGun, exports.sentrySwarm, exports.sentryTwin];
exports.testbedmiscp2.UPGRADES_TIER_3 = [exports.breaker, exports.skimmerspinner];
//Normal Upgrade path
exports.basic.UPGRADES_TIER_1 = [exports.twin, exports.sniper, exports.machine, exports.flank, exports.director];
exports.basic.UPGRADES_TIER_2 = [exports.smash];
exports.basic.UPGRADES_TIER_3 = [exports.single, exports.cruisingtank, exports.wither, exports.magician]
exports.smash.UPGRADES_TIER_3 = [exports.megasmash, exports.spike, exports.autosmash, exports.octosmash];
exports.twin.UPGRADES_TIER_2 = [exports.double, exports.bent, exports.gunner, exports.hexa, exports.cruiser];
exports.twin.UPGRADES_TIER_3 = [exports.triple, exports.dual, exports.nightingale];
exports.double.UPGRADES_TIER_3 = [exports.tripletwin, exports.split, exports.autodouble, exports.bentdouble, exports.doubleguard];
exports.bent.UPGRADES_TIER_3 = [exports.penta, exports.spread, exports.benthybrid, exports.bentdouble, exports.triple];
exports.gunner.UPGRADES_TIER_3 = [exports.autogunner, exports.nailgun, exports.auto4, exports.machinegunner, exports.gcruiser, exports.hewnGunner, exports.huntgunner];
exports.sniper.UPGRADES_TIER_2 = [exports.assassin, exports.hunter, exports.mini, exports.builder, exports.snipetrap];
exports.sniper.UPGRADES_TIER_3 = [exports.bushwhack];
exports.snipetrap.UPGRADES_TIER_3 = [exports.snipebuild, exports.trapsassin];
exports.snipebuild.UPGRADES_TIER_3 = [exports.blocksassin];
exports.trapsassin.UPGRADES_TIER_3 = [exports.rangetrap, exports.blocksassin];
exports.hunter.UPGRADES_TIER_3 = [exports.preda, exports.poach, exports.sidewind, exports.dual, exports.osprey, exports.overhunt];
exports.builder.UPGRADES_TIER_3 = [exports.construct, exports.autobuilder, exports.engineer, exports.boomer];
exports.machine.UPGRADES_TIER_2 = [exports.destroy, exports.artillery, exports.mini, exports.gunner];
exports.machine.UPGRADES_TIER_3 = [exports.spray, exports.machboomer];
exports.destroy.UPGRADES_TIER_3 = [exports.anni, exports.hybrid, exports.construct, exports.shotgun2, exports.hiveshooter];
exports.artillery.UPGRADES_TIER_3 = [exports.mortar, exports.spread, exports.skimmer];
exports.mini.UPGRADES_TIER_3 = [exports.stream, exports.nailgun, exports.hybridmini];
exports.flank.UPGRADES_TIER_2 = [exports.hexa, exports.tri, exports.auto3, exports.flanktrap, exports.spurter];
exports.flank.UPGRADES_TIER_3 = [exports.flankbuilder];
exports.tri.UPGRADES_TIER_3 = [exports.fighter, exports.booster, exports.falcon, exports.bomber, exports.autotri, exports.brutalizer, exports.nightingale, exports.osprey];
exports.hexa.UPGRADES_TIER_3 = [exports.octo, exports.hexatrap];
exports.auto3.UPGRADES_TIER_3 = [exports.auto5, exports.heavy3, exports.auto4, exports.tritrap, exports.sniper3, exports.boomer3, ];
exports.flanktrap.UPGRADES_TIER_3 = [exports.bushwhack, exports.guntrap, exports.fortress, exports.bomber];
exports.director.UPGRADES_TIER_2 = [exports.overseer, exports.cruiser];
exports.director.UPGRADES_TIER_3 = [exports.factory];
exports.overseer.UPGRADES_TIER_3 = [exports.overlord, exports.overtrap, exports.overgunner, exports.autoover, exports.overdrive, exports.overhunt, exports.lancedrone];
exports.underseer.UPGRADES_TIER_3 = [exports.necromancer];
exports.cruiser.UPGRADES_TIER_3 = [exports.carrier, exports.battleship, exports.fortress, exports.autocruiser, exports.gcruiser, exports.cruisingtank];
exports.auto5.UPGRADES_TIER_3 = [exports.auto7];
exports.skimmer.UPGRADES_TIER_3 = [exports.boostering, exports.gskimmer, exports.dskimmer, exports.shskimmer];
exports.booster.UPGRADES_TIER_3 = [exports.boostering, exports.boosterii];
exports.falcon.UPGRADES_TIER_3 = [exports.toucan];
exports.fortress.UPGRADES_TIER_3 = [exports.megafort];
exports.tritrap.UPGRADES_TIER_3 = [exports.megafort];
exports.overlord.UPGRADES_TIER_3 = [exports.overworker];
exports.overdrive.UPGRADES_TIER_3 = [exports.overworker];
exports.boomer.UPGRADES_TIER_3 = [exports.boomer3, exports.boomerception, exports.machboomer];
exports.guardian.UPGRADES_TIER_3 = [exports.ultimateg];
exports.preda.UPGRADES_TIER_3 = [exports.ypreda];
exports.summoner.UPGRADES_TIER_3 = [exports.summonerxxl];
exports.shotgun2.UPGRADES_TIER_3 = [exports.m2];
exports.triple.UPGRADES_TIER_3 = [exports.quint];
exports.defendersupreme.UPGRADES_TIER_3 = [exports.ultimated, exports.defendersupremeII];
exports.ultimated.UPGRADES_TIER_3 = [exports.ultimated2];
exports.hewnGunner.UPGRADES_TIER_3 = [exports.hewnHuntgunner, exports.hewnGC];
exports.huntgunner.UPGRADES_TIER_3 = [exports.hewnHuntgunner, exports.huntGC];
exports.gcruiser.UPGRADES_TIER_3 = [exports.hewnGC, exports.huntGC];
exports.skimmerspinner.UPGRADES_TIER_3 = [exports.thing3];