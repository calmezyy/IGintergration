// kubejs/client_scripts/ig_lang_names.js
// Human-readable names for IG TFC-style ore blocks (both families), for prospector chat

console.info('[ig_lang_names] client lang injector active');

var LOCALES = ['en_us','en_gb'];

var ORES_FOR_NAMES = [
  'cassiterite','native_copper','native_gold','native_silver','chromite',
  'hematite','magnetite','sphalerite','copper','gold','silver',
  // include a few common extras so tooltips look nice beyond the unified set:
  'pyrite','chalcopyrite','chalcocite','galena','ilmenite','bauxite','apatite','monazite','molybdenite','fluorite'
];

var ROCKS_TFC = globalThis && globalThis.TFC_ROCKS ? globalThis.TFC_ROCKS : [
  'gneiss','marble','phyllite','quartzite','schist','slate',
  'claystone','chert','chalk','conglomerate','dolomite',
  'limestone','basalt','shale'
];
var ROCKS_MC  = globalThis && globalThis.MC_ROCKS ? globalThis.MC_ROCKS : ['stone','granite','diorite','andesite','deepslate','tuff'];
var GRADES = { poor:'Poor', normal:'Normal', rich:'Rich' };

function cap(s) {
  var parts = s.split('_');
  for (var i = 0; i < parts.length; i++) {
    var w = parts[i];
    parts[i] = w.charAt(0).toUpperCase() + w.slice(1);
  }
  return parts.join(' ');
}

for (var li = 0; li < LOCALES.length; li++) {
  (function(locale) {
    ClientEvents.lang(locale, event => {
      var fam, rocks, gk, ore, rock, key, name;

      // family: tfc_*
      fam = 'tfc';
      rocks = ROCKS_TFC;
      for (gk in GRADES) {
        for (var oi = 0; oi < ORES_FOR_NAMES.length; oi++) {
          ore = ORES_FOR_NAMES[oi];
          for (var ri = 0; ri < rocks.length; ri++) {
            rock = rocks[ri];
            key  = 'block.immersivegeology.' + fam + '_' + gk + '_ore_block_' + ore + '_' + rock;
            name = cap(rock) + ' ' + cap(ore) + ' Ore (' + GRADES[gk] + ')';
            event.add(key, name);
          }
        }
      }

      // family: minecraft_*
      fam = 'minecraft';
      rocks = ROCKS_MC;
      for (gk in GRADES) {
        for (var oi2 = 0; oi2 < ORES_FOR_NAMES.length; oi2++) {
          ore = ORES_FOR_NAMES[oi2];
          for (var ri2 = 0; ri2 < rocks.length; ri2++) {
            rock = rocks[ri2];
            key  = 'block.immersivegeology.' + fam + '_' + gk + '_ore_block_' + ore + '_' + rock;
            name = cap(rock) + ' ' + cap(ore) + ' Ore (' + GRADES[gk] + ')';
            event.add(key, name);
          }
        }
      }
    });
  })(LOCALES[li]);
}
