// kubejs/server_scripts/ig_prospectable_tags.js
// Add all IG ore blocks (both families) to #tfc:prospectable

console.info('[ig_prospectable_tags] Loaded');

ServerEvents.tags('blocks', event => {
  var grades   = global.ORE_GRADES;
  var families = global.IG_FAMILIES;
  var tfcRocks = global.TFC_ROCKS;
  var mcRocks  = global.MC_ROCKS;

  // We don't need the ore list here; mark *all* IG ore blocks as prospectable.
  // Use a minimal ore token to reduce expansion; but it's fine to be generous.
  var ores = [
    'cassiterite','native_copper','native_gold','native_silver','chromite',
    'hematite','magnetite','sphalerite','copper','gold','silver',
    // add more if you want to prospect every IG ore in the pack:
    'pyrite','chalcopyrite','chalcocite','galena','ilmenite','bauxite','apatite','monazite','molybdenite','fluorite'
  ];

  var fam, rocks, g, o, r;
  for (var fi = 0; fi < families.length; fi++) {
    fam   = families[fi];
    rocks = (fam === 'tfc') ? tfcRocks : mcRocks;

    for (var gi = 0; gi < grades.length; gi++) {
      g = grades[gi];
      for (var oi = 0; oi < ores.length; oi++) {
        o = ores[oi];
        for (var ri = 0; ri < rocks.length; ri++) {
          r = rocks[ri];
          event.add('tfc:prospectable', 'immersivegeology:' + fam + '_' + g + '_ore_block_' + o + '_' + r);
        }
      }
    }
  }
});
