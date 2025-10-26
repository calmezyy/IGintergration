// kubejs/startup_scripts/ig_partial_crushed_items.js
// Registers both Partial Dirty Crushed and Partial Crushed Ore items

StartupEvents.registry('item', event => {
  const ores = [
    'cuprite','zircon','acanthite','alumina','smithsonite','thorianite',
    'fluorite','cryolite','vanadinite','unobtania','millerite','thorite',
    'anatase','wolframite'
  ];

  ores.forEach(ore => {
    const proper = ore.charAt(0).toUpperCase() + ore.slice(1);

    // Partial Dirty Crushed Ore
    event.create(`immersivegeology:partial_dirty_crushed_ore_${ore}`)
      .texture(`immersivegeology:item/dirty_crushed_ore_${ore}`) // reuse texture for now
      .displayName(`Partially Dirty Crushed ${proper} Ore`);

    // Partial Clean Crushed Ore
    event.create(`immersivegeology:partial_crushed_ore_${ore}`)
      .texture(`immersivegeology:item/crushed_ore_${ore}`) // reuse clean texture for now
      .displayName(`Partially Crushed ${proper} Ore`);
  });

  console.info('[Immersive Geology] Registered partial dirty & clean crushed ores.');
});
