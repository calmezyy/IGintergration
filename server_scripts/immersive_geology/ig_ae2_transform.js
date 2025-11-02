// kubejs/server_scripts/immersive_geology/ig_ae2_transform.js
// Expanded: AE2 transforms for IG dirty_crushed -> partial_crushed (existing)
//          + GTCEu crushed_*_ore -> IG partial_crushed_ore_* (new)
// Works in any fluid tagged as tfc:water

ServerEvents.recipes(function (event) {
  // -----------------------------
  // 1) Your existing IG dirty -> partial transforms
  // -----------------------------
  var igOres = [
    "cuprite","zircon","acanthite","alumina","smithsonite","thorianite",
    "fluorite","cryolite","vanadinite","unobtania","millerite","thorite",
    "anatase","wolframite"
  ];

  for (var i = 0; i < igOres.length; i++) {
    var ore = igOres[i];
    event.custom({
      "type": "ae2:transform",
      "circumstance": { "type": "fluid", "tag": "tfc:water" },
      "ingredients": [{ "item": "immersivegeology:dirty_crushed_ore_" + ore }],
      "result": { "item": "immersivegeology:partial_crushed_ore_" + ore },
      "time": 100
    }).id("tfg:ae_transform/dirty_" + ore);
  }

  // -----------------------------
  // 2) NEW: GTCEu crushed_*_ore -> IG partial_crushed_ore_*
  //     Auto-discovers all GTCEu crushed ores from #forge:crushed_ores
  // -----------------------------

  // Optional: skip anything you don’t want auto-wired
  var blacklist = {
    // example: "coal": true
  };

  function toJsArray(javaList) {
    var out = [];
    for (var k = 0; k < javaList.length; k++) out.push(javaList[k]);
    return out;
  }

  function itemExists(id) {
    try { return !Item.of(id).isEmpty(); } catch (e) { return false; }
  }

  // Aliases (if names differ between GTCEu and IG, add mappings here)
  // left = GTCEu <name>, right = IG <name>
  var alias = {
    // "aluminium": "alumina",
    // "aluminum":  "alumina"
  };

  var added = 0;

  // Grab all items in #forge:crushed_ores
  var crushedIds = [];
  try {
    var ids = Ingredient.of('#forge:crushed_ores').getItemIds().toArray();
    for (var a = 0; a < ids.length; a++) crushedIds.push(String(ids[a]));
  } catch (e1) {
    try {
      var stacks = Ingredient.of('#forge:crushed_ores').getStacks().toArray();
      for (var b = 0; b < stacks.length; b++) crushedIds.push(String(stacks[b].id || stacks[b].getId()));
    } catch (e2) {
      console.info('[IG AE2 Transform] Could not enumerate #forge:crushed_ores; no GT transforms added.');
    }
  }

  for (var c = 0; c < crushedIds.length; c++) {
    var id = crushedIds[c]; // e.g., "gtceu:crushed_hematite_ore"
    if (!id || id.indexOf('gtceu:crushed_') !== 0 || id.lastIndexOf('_ore') !== id.length - 4) continue;

    var base = id.substring('gtceu:crushed_'.length, id.length - '_ore'.length); // "hematite"
    if (blacklist[base]) continue;

    var igName = alias[base] || base;
    var igPartialId = 'immersivegeology:partial_crushed_ore_' + igName;
    if (!itemExists(igPartialId)) continue;

    event.custom({
      "type": "ae2:transform",
      "circumstance": { "type": "fluid", "tag": "tfc:water" },
      "ingredients": [{ "item": 'gtceu:crushed_' + base + '_ore' }],
      "result": { "item": igPartialId },
      "time": 100
    }).id('tfg:ae_transform/gt_crushed_to_partial/' + igName);

    added++;
  }

  console.info("[IG AE2 Transform] Registered " + igOres.length + " dirty->partial and " + added + " GTCEu crushed->partial recipes.");
});
