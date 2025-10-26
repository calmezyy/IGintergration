// kubejs/server_scripts/immersive_geology/ie_crusher_recipes.js
// Generate IE Crusher recipes:
// - from #forge:raw_materials and TFC ore/normal_*  → 1x crushed + secondaries
// - from TFC ore/rich_*                              → 2x crushed + secondaries

ServerEvents.recipes(function (event) {
  var rawIds   = Ingredient.of('#forge:raw_materials').getItemIds().toArray();
  var oresAll  = Ingredient.of('#forge:ores').getItemIds().toArray(); // for rich ores

  var alias = { aluminum: 'aluminium', nether_quartz: 'quartz' };

  function getBaseFromRaw(idStr) {
    var parts = String(idStr).split(':');
    var ns = parts[0], path = parts[1];
    if (!ns || !path) return null;

    if (path.indexOf('raw_') === 0) {
      var b = path.substring(4);
      if (ns === 'immersiveengineering' && alias[b]) b = alias[b];
      return b;
    }
    var m = path.match(/^ore\/normal_(.+)$/); // TFC/FirmaLife "normal"
    if (m) return m[1];
    return null;
  }

  function getBaseFromRich(idStr) {
    var parts = String(idStr).split(':');
    var path = parts[1];
    if (!path) return null;
    var m = path.match(/^ore\/rich_(.+)$/); // TFC "rich"
    if (m) return m[1];
    return null;
  }

  function findCrushed(basename) {
    var cands = [
      'gtceu:crushed_' + basename + '_ore',
      'gtceu:crushed_' + basename
    ];
    for (var i = 0; i < cands.length; i++) if (Item.exists(cands[i])) return cands[i];
    return null;
  }

  function addCrusher(inId, basename, outCount) {
    var outId = findCrushed(basename);
    if (!outId) return false;

    event.custom({
      type: 'immersiveengineering:crusher',
      input:  { item: inId },
      result: { item: outId, count: outCount },
      secondaries: [
        { chance: 0.33,  output: { item: outId } },
        { chance: 0.165, output: { item: outId } }
      ],
      energy: 2400
    }).id('kubejs:ie_crusher/' + basename + '_from_' + String(inId).replace(/[:/]/g, '_'));
    return true;
  }

  var added = 0, skipped = 0;

  // Raw + normal → 1x
  for (var i = 0; i < rawIds.length; i++) {
    var inId = String(rawIds[i]);
    if (!Item.exists(inId)) { skipped++; continue; }
    var base = getBaseFromRaw(inId);
    if (!base) { skipped++; continue; }
    if (addCrusher(inId, base, 1)) added++; else skipped++;
  }

  // Rich → 2x
  for (var j = 0; j < oresAll.length; j++) {
    var inId2 = String(oresAll[j]);
    // Quick filter to avoid most non-TFC items
    if (inId2.indexOf('tfc:ore/rich_') !== 0) continue;
    if (!Item.exists(inId2)) { skipped++; continue; }
    var baseRich = getBaseFromRich(inId2);
    if (!baseRich) { skipped++; continue; }
    if (addCrusher(inId2, baseRich, 2)) added++; else skipped++;
  }

  console.info('[ie] IE Crusher recipes added=' + added + ', skipped=' + skipped);
});
