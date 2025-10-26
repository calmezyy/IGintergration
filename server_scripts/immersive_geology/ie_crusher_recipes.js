// kubejs/server_scripts/immersive_geology/ie_crusher_recipes.js
// Immersive Engineering Crusher recipes:
// - #forge:raw_materials → 1x crushed + secondaries
// - #forge:rich_raw_materials → 2x crushed + secondaries

ServerEvents.recipes(function (event) {
  var rawIds  = Ingredient.of('#forge:raw_materials').getItemIds().toArray();
  var richIds = Ingredient.of('#forge:rich_raw_materials').getItemIds().toArray();
  var alias   = { aluminum: 'aluminium', nether_quartz: 'quartz' };
  var added = 0;
  var skipped = 0;

  function getBase(idStr) {
    var parts = String(idStr).split(':');
    if (parts.length < 2) return null;
    var ns = parts[0];
    var path = parts[1];
    if (!path) return null;

    // gtceu:raw_*
    if (path.indexOf('raw_') === 0) {
      var b = path.substring(4);
      if (ns === 'immersiveengineering' && alias[b]) b = alias[b];
      return b;
    }

    // gtceu:rich_raw_*
    if (path.indexOf('rich_raw_') === 0) {
      return path.substring('rich_raw_'.length);
    }

    // TFC or other mods: ore/normal_*
    var m = path.match(/^ore\/normal_(.+)$/);
    if (m) return m[1];

    return null;
  }

  function findCrushed(base) {
    var cands = [
      'gtceu:crushed_' + base + '_ore',
      'gtceu:crushed_' + base
    ];
    for (var i = 0; i < cands.length; i++) {
      if (Item.exists(cands[i])) return cands[i];
    }
    return null;
  }

  function addCrusher(inId, base, count) {
    var outId = findCrushed(base);
    if (!outId) return false;

    event.custom({
      type: 'immersiveengineering:crusher',
      input:  { item: inId },
      result: { item: outId, count: count },
      secondaries: [
        { chance: 0.33,  output: { item: outId } },
        { chance: 0.165, output: { item: outId } }
      ],
      energy: 2400
    }).id('kubejs:ie_crusher/' + base + '_from_' + String(inId).replace(/[:/]/g, '_'));
    return true;
  }

  // 1x from #forge:raw_materials
  for (var i = 0; i < rawIds.length; i++) {
    var inId = String(rawIds[i]);
    if (!Item.exists(inId)) { skipped++; continue; }
    var base = getBase(inId);
    if (!base) { skipped++; continue; }
    if (addCrusher(inId, base, 1)) added++; else skipped++;
  }

  // 2x from #forge:rich_raw_materials
  for (var j = 0; j < richIds.length; j++) {
    var inId2 = String(richIds[j]);
    if (!Item.exists(inId2)) { skipped++; continue; }
    var base2 = getBase(inId2);
    if (!base2) { skipped++; continue; }
    if (addCrusher(inId2, base2, 2)) added++; else skipped++;
  }

  console.info('[ie] IE Crusher recipes added=' + added + ', skipped=' + skipped);
});
