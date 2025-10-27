// kubejs/server_scripts/immersive_geology/ie_crusher_recipes.js
// IE Crusher recipes:
// - #forge:raw_materials         → 1x crushed + 33% + 16.5% secondaries
// - #forge:rich_raw_materials    → 1x crushed + 100% + 33% + 16.5% + 16.5% secondaries
// - #forge:poor_raw_materials    → 1x crushed + 33% secondary
ServerEvents.recipes(function (event) {
  var rawIds  = Ingredient.of('#forge:raw_materials').getItemIds().toArray();
  var richIds = Ingredient.of('#forge:rich_raw_materials').getItemIds().toArray();
  var poorIds = Ingredient.of('#forge:poor_raw_materials').getItemIds().toArray();

  // base-name aliases
  var alias = {
    aluminum: 'aluminium',
    nether_quartz: 'quartz',
    native_gold: 'gold',
    native_copper: 'copper',
    native_silver: 'silver',
    limonite: 'yellow_limonite' // GTCEu naming
  };

  function normalize(base) {
    if (!base) return base;
    if (alias[base]) return alias[base];
    if (base.indexOf('native_') === 0) return base.substring(7);
    return base;
  }

  var added = 0, skipped = 0;

  function getBase(idStr) {
    var parts = String(idStr).split(':'), ns = parts[0], path = parts[1];
    if (!path) return null;

    if (path.indexOf('raw_') === 0) {
      var b = path.substring(4);
      if (ns === 'immersiveengineering' && alias[b]) b = alias[b];
      return normalize(b);
    }
    if (path.indexOf('rich_raw_') === 0)  return normalize(path.substring('rich_raw_'.length));
    if (path.indexOf('poor_raw_') === 0)  return normalize(path.substring('poor_raw_'.length));

    var m;
    m = path.match(/^ore\/normal_(.+)$/); if (m) return normalize(m[1]);
    m = path.match(/^ore\/rich_(.+)$/);   if (m) return normalize(m[1]);
    m = path.match(/^ore\/poor_(.+)$/);   if (m) return normalize(m[1]);

    return null;
  }

  function findCrushed(base) {
    var cands = ['gtceu:crushed_' + base + '_ore', 'gtceu:crushed_' + base];
    for (var i = 0; i < cands.length; i++) if (Item.exists(cands[i])) return cands[i];
    return null;
  }

  function addCrusher(inId, base, grade) {
    var outId = findCrushed(base);
    if (!outId) return false;

    var secs;
    if (grade === 'rich') {
      secs = [
        { chance: 0.33,  output: { item: outId } },
        { chance: 0.165, output: { item: outId } },
        { chance: 0.165, output: { item: outId } }
      ];
    } else if (grade === 'poor') {
      secs = [
        { chance: 0.33,  output: { item: outId } }
      ];
    } else {
      secs = [
        { chance: 0.33,  output: { item: outId } },
        { chance: 0.165, output: { item: outId } }
      ];
    }

    event.custom({
      type: 'immersiveengineering:crusher',
      input:  { item: inId },
      result: { item: outId, count: 1 },
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
    if (addCrusher(inId, base, 'normal')) added++; else skipped++;
  }

  // rich
  for (var j = 0; j < richIds.length; j++) {
    var inId2 = String(richIds[j]);
    if (!Item.exists(inId2)) { skipped++; continue; }
    var base2 = getBase(inId2);
    if (!base2) { skipped++; continue; }
    if (addCrusher(inId2, base2, 'rich')) added++; else skipped++;
  }

  // poor
  for (var k = 0; k < poorIds.length; k++) {
    var inId3 = String(poorIds[k]);
    if (!Item.exists(inId3)) { skipped++; continue; }
    var base3 = getBase(inId3);
    if (!base3) { skipped++; continue; }
    if (addCrusher(inId3, base3, 'poor')) added++; else skipped++;
  }

  console.info('[ie] IE Crusher recipes added=' + added + ', skipped=' + skipped);
});
