// kubejs/server_scripts/ig_to_tfc_drops.js
// Immersive Geology -> TFC/Firmalife drops (covers tfc_* and minecraft_*)

if (global.ENABLE_IG_TO_TFC) {
  console.info('[ig_to_tfc_drops] Enabled');

  ServerEvents.blockLootTables(event => {
    var grades   = global.ORE_GRADES;
    var families = global.IG_FAMILIES;
    var tfcRocks = global.TFC_ROCKS;
    var mcRocks  = global.MC_ROCKS;
    var ores     = global.IG_TFC_ORES;

    var rules = 0, fam, rocks, g, o, r, igBlock, tfcItem;
    for (var fi = 0; fi < families.length; fi++) {
      fam   = families[fi];
      rocks = (fam === 'tfc') ? tfcRocks : mcRocks;

      for (var gi = 0; gi < grades.length; gi++) {
        g = grades[gi];
        for (var oi = 0; oi < ores.length; oi++) {
          o = ores[oi];
          for (var ri = 0; ri < rocks.length; ri++) {
            r = rocks[ri];

            // immersivegeology:<fam>_<grade>_ore_block_<ore>_<rock>
            igBlock = 'immersivegeology:' + fam + '_' + g + '_ore_block_' + o + '_' + r;
            tfcItem = global.getTfcStyleItemId(g, o);

            event.addSimpleBlock(igBlock, tfcItem);
            rules++;
          }
        }
      }
    }

    console.info('[ig_to_tfc_drops] Added ' + rules + ' IG → TFC/Firmalife drop overrides');
  });
} else {
  console.info('[ig_to_tfc_drops] Disabled by toggle');
}
