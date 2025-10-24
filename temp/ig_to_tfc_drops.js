// kubejs/server_scripts/ig_to_tfc_drops.js
// Immersive Geology ore BLOCK -> TFC ore ITEM drops
// Block: immersivegeology:<family>_<grade>_ore_block_<ore>_<rock>
// Drop : tfc:ore/<grade>_<ore>

if (!global.ENABLE_IG_TO_TFC) {
  console.info('[ig_to_tfc_drops] Disabled by toggle');
} else {
  console.info('[ig_to_tfc_drops] Enabled');

  // Fallback builder for TFC item ids
  function tfcItemId(grade, ore) {
    return 'tfc:ore/' + grade + '_' + ore;
  }

  ServerEvents.blockLootTables(event => {
    var grades   = global.ORE_GRADES;    // ['poor','normal','rich']
    var families = global.IG_FAMILIES;   // ['tfc','minecraft']
    var tfcRocks = global.TFC_ROCKS;     // rock names
    var mcRocks  = global.MC_ROCKS;      // vanilla stone names
    var ores     = global.IG_TFC_ORES;   // TFC-style ore keys (hematite, etc.)

    var rules = 0;

    for (var fi = 0; fi < families.length; fi++) {
      var family = families[fi];
      var rocks  = (family === 'tfc') ? tfcRocks : mcRocks;

      for (var gi = 0; gi < grades.length; gi++) {
        var grade = grades[gi];

        for (var oi = 0; oi < ores.length; oi++) {
          var ore = ores[oi];

          for (var ri = 0; ri < rocks.length; ri++) {
            var rock = rocks[ri];

            // Exact IG block id
            var igBlockId = 'immersivegeology:' + family + '_' + grade + '_ore_block_' + ore + '_' + rock;

            // Use global helper if present, otherwise fallback
            var dropItemId;
            if (global.getTfcStyleItemId) {
              dropItemId = global.getTfcStyleItemId(grade, ore);
            } else {
              dropItemId = tfcItemId(grade, ore);
            }

            event.addSimpleBlock(igBlockId, dropItemId);
            rules++;
          }
        }
      }
    }

    console.info('[ig_to_tfc_drops] Added ' + rules + ' IG -> TFC drop overrides (format enforced)');
  });
}
