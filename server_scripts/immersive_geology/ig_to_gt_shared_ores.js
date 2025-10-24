// kubejs/server_scripts/immersive_geology/ig_to_gt_shared_ores.js
// TFC + GregTech swaps in ONE file.
// - Natives (gold/silver/copper) => TFC native_* drops (all families/grades/rocks)
// - For the listed ores, prefer TFC ore if it exists; otherwise use GTCEu raw_*.

LootJS.modifiers(function (event) {
  var grades   = global.ORE_GRADES   || ['poor', 'normal', 'rich'];
  var families = global.IG_FAMILIES  || ['tfc', 'minecraft'];
  var tfcRocks = global.TFC_ROCKS    || [];
  var mcRocks  = global.MC_ROCKS     || [];

  // ---------- 1) TFC natives (exact rule) ----------
  var nativeOres = ['gold', 'silver', 'copper'];
  var nativeAlias = { gold: 'native_gold', silver: 'native_silver', copper: 'native_copper' };

  for (var fi = 0; fi < families.length; fi++) {
    var familyA = families[fi];
    var rocksA  = (familyA === 'tfc') ? tfcRocks : mcRocks;

    for (var gi = 0; gi < grades.length; gi++) {
      var gradeA = grades[gi];

      for (var oi = 0; oi < nativeOres.length; oi++) {
        var oreA   = nativeOres[oi];
        var dropA  = 'tfc:ore/' + gradeA + '_' + nativeAlias[oreA];

        for (var ri = 0; ri < rocksA.length; ri++) {
          var rockA = rocksA[ri];
          var blockIdA = 'immersivegeology:' + familyA + '_' + gradeA + '_ore_block_' + oreA + '_' + rockA;

          event
            .addBlockLootModifier(blockIdA)
            .removeLoot(Ingredient.all)
            .addLoot(Item.of(dropA));
        }
      }
    }
  }
	
  // ---------- 2) Pure TFC ores (standard names, no 'native_' prefix) ----------
  var tfcOres = [
    'hematite', 'magnetite', 'sphalerite', 'cassiterite',
    'bismuthinite', 'malachite', 'limonite', 'tetrahedrite', 'garnierite'
  ];

  for (var fi = 0; fi < families.length; fi++) {
    var family = families[fi];
    var rocks  = (family === 'tfc') ? tfcRocks : mcRocks;

    for (var gi = 0; gi < grades.length; gi++) {
      var grade = grades[gi];

      for (var oi = 0; oi < tfcOres.length; oi++) {
        var ore = tfcOres[oi];
        var drop = 'tfc:ore/' + grade + '_' + ore;

        for (var ri = 0; ri < rocks.length; ri++) {
          var rock = rocks[ri];
          var blockId = 'immersivegeology:' + family + '_' + grade + '_ore_block_' + ore + '_' + rock;

          event
            .addBlockLootModifier(blockId)
            .removeLoot(Ingredient.all)
            .addLoot(Item.of(drop));
        }
      }
    }
  }

  // ---------- 3) GT shared ores (prefer TFC if it exists) ----------
  var ores = [
    'ilmenite','galena','bauxite','monazite','pyrite','chalcopyrite',
    'molybdenite','uraninite','platinum','gypsum','cobaltite','lead',
    'pyrolusite','apatite'
  ];

  // If any of these ever exist in TFC as tfc:ore/<grade>_<sameName>, we’ll use them.
  function tfcItemId(grade, ore) {
    return 'tfc:ore/' + grade + '_' + ore;
  }
  function itemExists(id) {
    try { return !Item.of(id).isEmpty(); } catch (e) { return false; }
  }

  for (var fj = 0; fj < families.length; fj++) {
    var family = families[fj];
    var rocks  = (family === 'tfc') ? tfcRocks : mcRocks;

    for (var gj = 0; gj < grades.length; gj++) {
      var grade = grades[gj];

      for (var oj = 0; oj < ores.length; oj++) {
        var ore = ores[oj];

        // Priority: TFC ore if present; else GT raw
        var tfcDrop = tfcItemId(grade, ore);
        var drop    = itemExists(tfcDrop) ? tfcDrop : ('gtceu:raw_' + ore);

        for (var rj = 0; rj < rocks.length; rj++) {
          var rock = rocks[rj];
          var blockId = 'immersivegeology:' + family + '_' + grade + '_ore_block_' + ore + '_' + rock;

          event
            .addBlockLootModifier(blockId)
            .removeLoot(Ingredient.all)
            .addLoot(Item.of(drop));
        }
      }
    }
  }
});
