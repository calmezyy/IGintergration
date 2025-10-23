// kubejs/server_scripts/ig_to_gtceu_drops.js
// Immersive Geology -> GTCEu raw items (block-break fallback, ignores loot tables)

if (global.ENABLE_IG_TO_GTCEU) {
  console.info('[ig_to_gtceu_drops] Enabled');

  var ORE_REGEX = /^(?:immersivegeology:)(?:tfc_|minecraft_)?(poor|normal|rich)_ore_block_([a-z0-9_]+)_[a-z0-9_]+$/;

  BlockEvents.broken(event => {
    var id = event.block.id;
    if (id.indexOf('immersivegeology:') !== 0) return;

    var m = ORE_REGEX.exec(id);
    if (!m) return;

    var grade = m[1];
    var ore   = m[2];
    var item  = global.getGtceuRawItemId(grade, ore);
    if (!item) {
      if (global.ORE_DEBUG) console.warn('[ig_to_gtceu_drops] Unmapped ' + ore + ' from ' + id);
      return;
    }

    event.block.set('minecraft:air');
    event.block.popItem(item);
    event.cancel();

    if (global.ORE_DEBUG) console.info('[ig_to_gtceu_drops] ' + id + ' -> ' + item);
  });
} else {
  console.info('[ig_to_gtceu_drops] Disabled by toggle');
}
