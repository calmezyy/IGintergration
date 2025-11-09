// kubejs/client_scripts/rename_crude_bloomery.js
// Renames Immersive Geology's "Crude Bloomery" to "Crude Furnace"
// Applies to the block, item, and multiblock name in English (US)
// ES5-safe and reloadable (F3+T).

ClientEvents.lang('en_us', function (event) {
  event.add('block.immersivegeology.bloomery', 'Crude Furnace');
  event.add('item.immersivegeology.bloomery', 'Crude Furnace');
  event.add('multiblock.immersivegeology.bloomery', 'Crude Furnace');
});