// kubejs/server_scripts/ig_quern_recipes.js
// IG-exclusive ores → Partial/Dirty Crushed Ore via TFC Quern
// Poor → 1 Partial (kubejs namespace)
// Normal → 2 Partials
// Rich → 3 Partials
// (Excludes coal ores)

ServerEvents.recipes(event => {
  const ores = [
    'cuprite','zircon','acanthite','alumina','smithsonite','thorianite',
    'fluorite','cryolite','vanadinite','unobtania','millerite','thorite',
    'anatase','wolframite'
  ];

  // --- Poor ores → 1 partial dirty crushed ---
  ores.forEach(ore => {
    event.recipes.tfc.quern(
      `kubejs:partial_dirty_crushed_ore_${ore}`,
      `immersivegeology:poor_ore_${ore}`
    ).id(`immersivegeology:quern/poor_partial_dirty_crushed_ore_${ore}`);
  });

  // --- Normal ores → 2 partial dirty crushed ---
  ores.forEach(ore => {
    event.recipes.tfc.quern(
      Item.of(`kubejs:partial_dirty_crushed_ore_${ore}`, 2),
      `immersivegeology:normal_ore_${ore}`
    ).id(`immersivegeology:quern/normal_partial_dirty_crushed_ore_${ore}`);
  });

  // --- Rich ores → 3 partial dirty crushed ---
  ores.forEach(ore => {
    event.recipes.tfc.quern(
      Item.of(`kubejs:partial_dirty_crushed_ore_${ore}`, 3),
      `immersivegeology:rich_ore_${ore}`
    ).id(`immersivegeology:quern/rich_partial_dirty_crushed_ore_${ore}`);
  });
});
