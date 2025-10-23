// kubejs/server_scripts/ig_quern_recipes.js

ServerEvents.recipes(event => {
  // --- Immersive Geology exclusive Quern recipes
  const igOres = [
    'zircon',
    'acanthite',
    'alumina',
    'smithsonite',
    'thorianite',
    'fluorite',
    'cryolite',
    'vanadinite',
    'unobtania',
    'millerite',
    'thorite',
    'anatase',
    'wolframite',
    'cuprite' // included for completeness
  ];

  igOres.forEach(ore => {
    event.recipes.tfc.quern(
      `immersivegeology:dirty_crushed_ore_${ore}`,
      `immersivegeology:normal_ore_${ore}`
    ).id(`immersivegeology:quern/dirty_crushed_ore_${ore}`);
  });
});
