ServerEvents.recipes(event => {
	event.custom({
		type: 'immersiveengineering:crusher',
		input: { item: 'gtceu:raw_chalcopyrite' },
		result: { item: 'gtceu:crushed_chalcopyrite_ore', count: 1 },
		secondaries: [],
		energy: 2400
	}).id('kubejs:ie_crusher/chalcopyrite_from_raw');
});