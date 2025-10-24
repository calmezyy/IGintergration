// kubejs/server_scripts/immersive_geology/ig_partial_crushed_recipes.js
// Adds 2 partials → 1 dirty crushed recipes (uses kubejs namespace)

ServerEvents.recipes(event => {
  const ores = [
    'cuprite','zircon','acanthite','alumina','smithsonite','thorianite',
    'fluorite','cryolite','vanadinite','unobtania','millerite','thorite',
    'anatase','wolframite'
  ];

  ores.forEach(ore => {
    event.shapeless(
      `immersivegeology:dirty_crushed_ore_${ore}`,
      [
        `kubejs:partial_dirty_crushed_ore_${ore}`,
        `kubejs:partial_dirty_crushed_ore_${ore}`
      ]
    ).id(`immersivegeology:crafting/dirty_from_partial_${ore}`);
  });
  
    // 2 poor → 1 partial
  ores.forEach(ore => {
    event.shapeless(
      Item.of(`kubejs:partial_dirty_crushed_ore_${ore}`, 1),
      [
        `immersivegeology:poor_ore_${ore}`,
        `immersivegeology:poor_ore_${ore}`,
        '#forge:hammer'
      ]
    ).id(`immersivegeology:hammer/poor_to_partial_${ore}`);
  });

  // 2 normal → 2 partial
  ores.forEach(ore => {
    event.shapeless(
      Item.of(`kubejs:partial_dirty_crushed_ore_${ore}`, 2),
      [
        `immersivegeology:normal_ore_${ore}`,
        `immersivegeology:normal_ore_${ore}`,
        '#forge:hammer'
      ]
    ).id(`immersivegeology:hammer/normal_to_partial_${ore}`);
  });

  // 2 rich → 3 partial
  ores.forEach(ore => {
    event.shapeless(
      Item.of(`kubejs:partial_dirty_crushed_ore_${ore}`, 3),
      [
        `immersivegeology:rich_ore_${ore}`,
        `immersivegeology:rich_ore_${ore}`,
        '#forge:hammer'
      ]
    ).id(`immersivegeology:hammer/rich_to_partial_${ore}`);
  });
  
   ores.forEach(ore => {
    event.remove({ id: `immersivegeology:crafting/crush_${ore}_poor_ore_with_work_hammer` });
    event.remove({ id: `immersivegeology:crafting/crush_${ore}_normal_ore_with_work_hammer` });
    event.remove({ id: `immersivegeology:crafting/crush_${ore}_rich_ore_with_work_hammer` });
  });
  
});
