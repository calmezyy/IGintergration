// kubejs/startup_scripts/immersive_geology/ig_blocks.js

StartupEvents.registry('block', function (event) {
	
	event.create('crude_refractory_brick_block')
		.displayName('Crude Refractory Brick Block')
		.material('stone')
		.hardness(2.0)
		.resistance(6.0)
		.requiresTool(true)
		.tagBlock('minecraft:mineable/pickaxe')
		.tagBlock('minecraft:needs_stone_tool')
		.model('minecraft:block/cube_all')
		.textureAll('immersivegeology:textures/block/static_block/refractory_brick');	//broken texture rn
	
	event.create('reinforced_insulated_fire_bricks')
		.displayName('Reinforced Insulated Fire Bricks')
		.material('stone')
		.hardness(4.0)
		.resistance(12.0)
		.requiresTool(true)
		.tagBlock('minecraft:mineable/pickaxe')
		.tagBlock('minecraft:needs_iron_tool')
		.model('minecraft:block/cube_all')
		.textureAll('immersivegeology:textures/block/static_block/refractory_brick');	//broken texture rn
	
	event.create('plated_kiln_bricks')
		.displayName('Plated Kiln Bricks')
		.material('stone')
		.hardness(4.0)
		.resistance(12.0)
		.requiresTool(true)
		.tagBlock('minecraft:mineable/pickaxe')
		.tagBlock('minecraft:needs_iron_tool')
		.model('minecraft:block/cube_all')
		.textureAll('immersivegeology:textures/block/static_block/refractory_brick');	//broken texture rn
	
});