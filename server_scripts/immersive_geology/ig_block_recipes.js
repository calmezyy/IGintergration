// kubejs/server_scripts/immersive_geology/ig_block_recipes.js

ServerEvents.recipes(function (event) {

  event.shaped(
    Item.of('kubejs:crude_refractory_brick_block', 1),
    [
      'AAB',
      'ABB',
      'BBB'
    ],
    {
      A: 'immersivegeology:refractory_brick',
      B: 'gtceu:bronze_nugget'
    }
  ).id('immersivegeology:crafting/craft_refractory_bricks');
  
  event.shaped(
    Item.of('kubejs:plated_kiln_bricks', 1),
    [
      'CCC',
      'ABA',
      'CCC'
    ],
    {
      A: 'kubejs:reinforced_insulated_fire_bricks',
      B: 'gtceu:black_steel_plate',
	  C: '#ad_astra:steel_plates',
    }
  ).id('immersivegeology:crafting/plated_kiln_bricks');
  
  event.shapeless(
  Item.of('kubejs:reinforced_insulated_fire_bricks', 1), 
  [
    'tfcbetterbf:insulated_fire_bricks',
	'#ad_astra:steel_plates',
  ]
).id('immersivegeology:crafting/craft_reinforced_insulated_fire_bricks');
  
});