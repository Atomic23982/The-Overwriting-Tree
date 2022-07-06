addLayer("OW", {
    name: "overwrite", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "OW", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#BF40BF", 
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Overwrites", // Name of prestige currency
    baseResource: "Resets", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5,
    passiveGeneration() { if (hasUpgrade('OW', 22)) return 0.50 },
    passiveGeneration() { if (hasUpgrade('OW', 31)) return 0.50 },
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('OW', 23)) mult = mult.times(upgradeEffect('OW', 23))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "Shift+o", description: "Shift+o: Reset for Overwrites", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}, upgrades: {
        11: {
            title: "Quick Resets",
            description: "Double your reset gain.",
            cost: new Decimal(1), 
        },

        12: {
            title: "Acceleration Boost",
            description: "Overwrites boost Reset gain.",
            cost: new Decimal(3), 
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },

        13: {
            title: "Reset Boosting",
            description: "Resets boost Reset gain.",
            cost: new Decimal(8), 
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },

        21: {
            title: "More Overwrites",
            description: "'Quick Resets' are stronger.",
            cost: new Decimal(20),

        },

        22: {
            title: "Automated Overwriting",
            description: "Gain 50% of Overwrites gained on reset per second.",
            cost: new Decimal(100), 
        },

        23: {
            title: "Smart Decisions",
            description: "Overwrites boost their own gain.",
            cost: new Decimal(200),
            effect() {
                return player.OW.points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, 
        },

        31: {
            title: "Automated Overwriting^2",
            description: "Gain 100% of Overwrites gained on reset per second.",
            cost: new Decimal(2000),
        },
    },
})
