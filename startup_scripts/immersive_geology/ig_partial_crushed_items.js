// kubejs/startup_scripts/ig_partial_crushed_items.js
// Registers Partial Dirty Crushed Ore items

StartupEvents.registry('item', event => {
  const ores = [
    'cuprite','zircon','acanthite','alumina','smithsonite','thorianite',
    'fluorite','cryolite','vanadinite','unobtania','millerite','thorite',
    'anatase','wolframite'
  ];

  ores.forEach(ore => {
    event.create(`partial_dirty_crushed_ore_${ore}`)
      .texture(`immersivegeology:item/dirty_crushed_ore_${ore}`) // reuse texture for consistency
      .displayName(`Partial Dirty Crushed ${ore.charAt(0).toUpperCase() + ore.slice(1)}`);
  });
});
