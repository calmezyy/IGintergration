// kubejs/server_scripts/ig_to_gtceu_drops.js
// Immersive Geology -> GTCEu raw items (fallback when IG doesn't provide loot tables)

if (global.ENABLE_IG_TO_GTCEU) {
  console.info('[ig_to_gtceu_drops] Enabled');

  // immersivegeology:(tfc_|minecraft_)?(poor|normal|rich)_ore_block_<ore>_<rock>
  const ORE_REGEX_GTCEU =
    /^(?:immersivegeology:)(?:tfc_|minecraft_)?(poor|normal|rich)_ore_block_([a-z0-9_]+)_[a-z0-9_]+$/;

  BlockEvents.broken(event => {
    const id = String(event.block.id);
    if (!id.startsWith('immersivegeology:')) return;

    const m = ORE_REGEX_GTCEU.exec(id);
    if (!m) return;

    const grade = m[1];
    const ore   = m[2];
    const drop  = global.getGtceuRawItemId ? global.getGtceuRawItemId(grade, ore) : null;
    if (!drop) {
      if (global.ORE_DEBUG) {
        console.warn('[ig_to_gtceu_drops] Unmapped ore "' + ore + '" from ' + id);
        if (event.player) event.player.tell('[GTCEu map missing] ' + ore);
      }
      return;
    }

    event.block.set('minecraft:air');
    event.block.popItem(drop);
    event.cancel();

    if (global.ORE_DEBUG) {
      const msg = '[ig_to_gtceu_drops] ' + id + ' -> ' + drop;
      console.info(msg);
      if (event.player) event.player.tell(msg);
    }
  });
} else {
  console.info('[ig_to_gtceu_drops] Disabled by toggle');
}
