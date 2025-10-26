// kubejs/server_scripts/immersive_geology/edit_refractory_bricks.js

ServerEvents.recipes(function (event) {
  event.remove({ id: 'immersivegeology:crafting/craft_refractory_bricks' });

  event.shaped(
    Item.of('immersivegeology:storage_block_refractory_brick', 1),
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
});
