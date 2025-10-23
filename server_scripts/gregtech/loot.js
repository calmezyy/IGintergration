// priority: 10
"use strict";
const STONE_TYPES_TO_COBBLE = {
	gabbro: 'tfc:rock/cobble/gabbro',
	shale: 'tfc:rock/cobble/shale',
	claystone: 'tfc:rock/cobble/claystone',
	limestone: 'tfc:rock/cobble/limestone',
	conglomerate: 'tfc:rock/cobble/conglomerate',
	dolomite: 'tfc:rock/cobble/dolomite',
	chert: 'tfc:rock/cobble/chert',
	chalk: 'tfc:rock/cobble/chalk',
	rhyolite: 'tfc:rock/cobble/rhyolite',
	dacite: 'tfc:rock/cobble/dacite',
	quartzite: 'tfc:rock/cobble/quartzite',
	slate: 'tfc:rock/cobble/slate',
	phyllite: 'tfc:rock/cobble/phyllite',
	schist: 'tfc:rock/cobble/schist',
	gneiss: 'tfc:rock/cobble/gneiss',
	marble: 'tfc:rock/cobble/marble',
	basalt: 'tfc:rock/cobble/basalt',
	diorite: 'tfc:rock/cobble/diorite',
	andesite: 'tfc:rock/cobble/andesite',
	granite: 'tfc:rock/cobble/granite',
	deepslate: 'minecraft:cobbled_deepslate',
	pyroxenite: 'tfg:rock/cobble_blackstone',
	dripstone: 'tfg:block/rock/cobble_dripstone',
	keratophyre: 'tfg:block/rock/cobble_crackrack',
	moon_stone: 'ad_astra:moon_cobblestone',
	moon_deepslate: 'ad_astra:moon_sand',
	mars_stone: 'ad_astra:mars_cobblestone',
	venus_stone: 'ad_astra:venus_cobblestone',
	mercury_stone: 'ad_astra:mercury_cobblestone',
	glacio_stone: 'ad_astra:glacio_cobblestone',
	permafrost: 'gtceu:ice_dust'
}

const registerGTCEULoots = (event) => {

	// Have to define these here because normal loot table jsons don't support checking for hammers

	// Crush raw rock into cobble
	global.TFC_STONE_TYPES.forEach(stoneType => {
		event.addBlockLootModifier(`tfc:rock/raw/${stoneType}`)
			.matchMainHand('#forge:tools/hammers')
			.removeLoot(ItemFilter.ALWAYS_TRUE)
			.addLoot(STONE_TYPES_TO_COBBLE[stoneType]);
	})

	// Defined in kubejs/startup_scripts/tfg/constants.js
	global.HAMMERING.forEach(x => {
		event.addBlockLootModifier(x.raw)
			.matchMainHand('#forge:tools/hammers')
			.removeLoot(ItemFilter.ALWAYS_TRUE)
			.addLoot(x.hammered)
	})

	event.addBlockLootModifier('minecraft:gilded_blackstone')
		.matchMainHand('#forge:tools/hammers')
		.removeLoot(ItemFilter.ALWAYS_TRUE)
		.addSequenceLoot(
			LootEntry.of('tfg:rock/cobble_blackstone'),
			LootEntry.of('tfc:powder/native_gold')
		)
	
	// Go through all materials
	forEachMaterial(material => {
		if (material.hasProperty(PropertyKey.ORE)) {

			// Indicator buds
			if (material.hasProperty(PropertyKey.GEM)) {
				let normalDrop = ChemicalHelper.get(TagPrefix.gemChipped, material, 1)
				let sawDrop = ChemicalHelper.get(TagPrefix.gem, material, 1)

				let bud = `gtceu:${material.getName()}_bud_indicator`;

				event.addBlockLootModifier(bud)
					.matchMainHand("tfc:gem_saw")
					.addLoot(sawDrop);

				event.addBlockLootModifier(bud)
					.not(n => n.matchMainHand("tfc:gem_saw"))
					.addLoot(normalDrop);
			}

			let richRawOre = ChemicalHelper.get(TFGTagPrefix.richRawOre, material, 1)
			let normalRawOre = ChemicalHelper.get(TagPrefix.rawOre, material, 1)
			let poorRawOre = ChemicalHelper.get(TFGTagPrefix.poorRawOre, material, 1)

			// I LOVE LOOTJS I LOVE LOOTJS I LOVE LOOTJS
			let rawOreBlock = `:${ChemicalHelper.get(TagPrefix.rawOreBlock, material, 1).getItem()}`;
			if (material === GTMaterials.Copper || material === GTMaterials.Gold || material === GTMaterials.Iron) {
				rawOreBlock = `minecraft${  rawOreBlock}`;
			} else if (material === TFGHelpers.getMaterial('desh')
				|| material === TFGHelpers.getMaterial('ostrum')
				|| material === TFGHelpers.getMaterial('calorite')) {
				rawOreBlock = `ad_astra${  rawOreBlock}`;
			} else {
				rawOreBlock = `gtceu${  rawOreBlock}`;
			}

			event.addBlockLootModifier(rawOreBlock)
				.removeLoot(ItemFilter.ALWAYS_TRUE)
				.addWeightedLoot([4, 6],
				[
					richRawOre.withChance(0.2),
					normalRawOre.withChance(0.6),
					poorRawOre.withChance(0.2)
				]);

			// Stone ores
			global.ORE_BEARING_STONES.forEach(stoneType => {

				let stoneTypeMaterial = TFGHelpers.getMaterial(stoneType)

				// Material doesn't work here because of reasons
				if (stoneTypeMaterial === null) {
					if (stoneType === "pyroxenite")
						stoneTypeMaterial = GTMaterials.Blackstone;
					else if (stoneType === "deepslate")
						stoneTypeMaterial = GTMaterials.Deepslate;
				}

				let stoneTypeDust = ChemicalHelper.get(TagPrefix.dust, stoneTypeMaterial, 1)

				// break with pickaxe/mining hammer/drill/mining machine
				event.addBlockLootModifier(`gtceu:${stoneType}_${material.getName()}_ore`)
					.removeLoot(ItemFilter.ALWAYS_TRUE)
					.addWeightedLoot([
						richRawOre.withChance(0.2),
						normalRawOre.withChance(0.6),
						poorRawOre.withChance(0.2)
					])
					.addLoot(
						LootEntry.of(stoneTypeDust).when((c) => c.randomChance(0.25))
					)

				// break with hammer
				event.addBlockLootModifier(`gtceu:${stoneType}_${material.getName()}_ore`)
					.matchMainHand('#forge:tools/hammers')
					.addLoot(STONE_TYPES_TO_COBBLE[stoneType]);
			})
		}
	})
}