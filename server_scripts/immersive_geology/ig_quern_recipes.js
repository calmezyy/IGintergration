// kubejs/server_scripts/ig_quern_recipes.js
// IG ores → Partial Dirty Crushed via TFC Quern
// Poor → 1 partial
// Normal → 2 partials
// Rich → 3 partials
// Skips coal. ES5-safe (no let/const/arrow)

ServerEvents.recipes(function (event) {
  // --- Your original IG-only list
  var igOnly = [
    'cuprite','zircon','acanthite','alumina','smithsonite','thorianite',
    'fluorite','cryolite','vanadinite','unobtania','millerite','thorite',
    'anatase','wolframite'
  ];

  // --- Extended keys derived from forge:raw_materials tag dump
  // (Normalized forms; we will try to map them to IG ores named
  //  immersivegeology:{poor|normal|rich}_ore_<key>)
  var rawKeys = [
    // ad_astra / firmalife / misc
    'calorite','desh','chromite',

    // GTCEu raw_*
    'almandine','aluminium','alunite','amethyst','apatite','armalcolite','asbestos',
    'barite','basaltic_mineral_sand','bastnasite','bauxite','bentonite','beryllium',
    'blue_topaz','borax','bornite','calcite','cassiterite_sand','certus_quartz',
    'chalcocite','chalcopyrite','cinnabar','coal','cobalt','cobaltite','cooperite',
    'diamond','diatomite','electrotine','emerald','etrium','fullers_earth','galena',
    'garnet_sand','glauconite_sand','goethite','granitic_mineral_sand','graphite',
    'green_sapphire','grossular','gypsum','ilmenite','kyanite','lapis','lazurite',
    'lead','lepidolite','lithium','magnesite','mica','molybdenite','molybdenum',
    'monazite','naquadah','neodymium','nether_quartz','nickel','oilsands','olivine',
    'opal','palladium','pentlandite','pitchblende','platinum','pollucite','powellite',
    'pyrite','pyrochlore','pyrolusite','pyrope','quartzite','realgar','red_garnet',
    'redstone','rock_salt','rose_quartz','ruby','salt','saltpeter','sapphire',
    'scheelite','soapstone','sodalite','spessartine','spodumene','stibnite','sulfur',
    'talc','tantalite','thorium','tin','topaz','tricalcium_phosphate','trona',
    'tungstate','uraninite','vanadium_magnetite','wulfenite','yellow_garnet','zeolite',

    // Immersive Engineering raw_*
    'aluminum','lead','nickel','silver','uranium',

    // Vanilla raw_*
    'copper',

    // TFC ore/normal_* (strip the prefix)
    'bismuthinite','cassiterite','garnierite','hematite','limonite',
    'magnetite','malachite','native_copper','native_gold','native_silver',
    'sphalerite','tetrahedrite',

    // TFMG raw_*
    'lead','lithium','nickel'
  ];

  // --- Build unique list: IG-first, then others; skip 'coal'
  var seen = {};
  var ores = [];
  function addKey(k) { if (!seen[k] && k !== 'coal') { seen[k] = true; ores.push(k); } }
  for (var i = 0; i < igOnly.length; i++) addKey(igOnly[i]);
  for (var j = 0; j < rawKeys.length; j++) addKey(rawKeys[j]);

  // --- Helper to add quern set if the IG ore items exist
  function addQuernSet(key) {
    // Inputs we expect to exist in IG:
    var poor  = 'immersivegeology:poor_ore_'   + key;
    var normal= 'immersivegeology:normal_ore_' + key;
    var rich  = 'immersivegeology:rich_ore_'   + key;

    // Output partial
    var partial = 'immersivegeology:partial_dirty_crushed_ore_' + key;

    // Guard against nonexistent inputs (prevents bad/missing item spam)
    var poorExists   = !Item.of(poor).isEmpty();
    var normalExists = !Item.of(normal).isEmpty();
    var richExists   = !Item.of(rich).isEmpty();

    if (!poorExists && !normalExists && !richExists) {
      // If none of the three exist, skip silently (or log if you want)
      // console.info('[IG Quern] Skipping ' + key + ' (no IG ore variants found)');
      return;
    }

    if (poorExists) {
      event.recipes.tfc.quern(
        partial,
        poor
      ).id('immersivegeology:quern/poor_partial_dirty_crushed_ore_' + key);
    }

    if (normalExists) {
      event.recipes.tfc.quern(
        Item.of(partial, 2),
        normal
      ).id('immersivegeology:quern/normal_partial_dirty_crushed_ore_' + key);
    }

    if (richExists) {
      event.recipes.tfc.quern(
        Item.of(partial, 3),
        rich
      ).id('immersivegeology:quern/rich_partial_dirty_crushed_ore_' + key);
    }
  }

  // Register all
  for (var k = 0; k < ores.length; k++) addQuernSet(ores[k]);

  console.info('[IG Quern] Registered quern recipes for keys=' + ores.length);
});
