// kubejs/server_scripts/immersive_geology/ie_crusher_recipes.js
// IE Crusher recipes:
// - #forge:raw_materials → 1x crushed + 33% + 16.5% secondaries
// - #forge:rich_raw_materials → 1x crushed + 100% + 33% + 16.5% secondaries

ServerEvents.recipes(function (event) {
  var rawIds  = Ingredient.of('#forge:raw_materials').getItemIds().toArray();
  var richIds = Ingredient.of('#forge:rich_raw_materials').getItemIds().toArray();
  var alias   = { aluminum: 'aluminium', nether_quartz: 'quartz' };
  var added = 0, skipped = 0;

  function getBase(idStr) {
    var parts = String(idStr).split(':');
    if (parts.length < 2) return null;
    var ns = parts[0], path = parts[1];
    if (!path) return null;

    if (path.indexOf('raw_') === 0) {
      var b = path.substring(4);
      if (ns === 'immersiveengineering' && alias[b]) b = alias[b];
      return b;
    }
    if (path.indexOf('rich_raw_') === 0) return path.substring('rich_raw_'.length);
    var m = path.match(/^ore\/normal_(.+)$/);
    if (m) return m[1];
    return null;
  }

  function findCrushed(base) {
    var cands = ['gtceu:crushed_' + base + '_ore', 'gtceu:crushed_' + base];
    for (var i = 0; i < cands.length; i++) if (Item.exists(cands[i])) return cands[i];
    return null;
  }

  function addCrusher(inId, base, isRich) {
    var outId = findCrushed(base);
    if (!outId) return false;

    var secs = isRich
      ? [
          { chance: 1.0,   output: { item: outId } }, // guaranteed extra
          { chance: 0.33,  output: { item: outId } },
          { chance: 0.165, output: { item: outId } }
        ]
      : [
          { chance: 0.33,  output: { item: outId } },
          { chance: 0.165, output: { item: outId } }
        ];

    event.custom({
      type: 'immersiveengineering:crusher',
      input:  { item: inId },
      result: { item: outId, count: 1 },              // always 1x now
      secondaries: secs,
      energy: 2400
    }).id('kubejs:ie_crusher/' + base + '_from_' + String(inId).replace(/[:/]/g, '_'));
    return true;
  }

  // normal/raw
  for (var i = 0; i < rawIds.length; i++) {
    var inId = String(rawIds[i]);
    if (!Item.exists(inId)) { skipped++; continue; }
    var base = getBase(inId);
    if (!base) { skipped++; continue; }
    if (addCrusher(inId, base, false)) added++; else skipped++;
  }

  // rich
  for (var j = 0; j < richIds.length; j++) {
    var inId2 = String(richIds[j]);
    if (!Item.exists(inId2)) { skipped++; continue; }
    var base2 = getBase(inId2);
    if (!base2) { skipped++; continue; }
    if (addCrusher(inId2, base2, true)) added++; else skipped++;
  }

  console.info('[ie] IE Crusher recipes added=' + added + ', skipped=' + skipped);
});
