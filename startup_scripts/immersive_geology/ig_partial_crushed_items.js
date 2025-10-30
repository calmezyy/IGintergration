// kubejs/startup_scripts/ig_partial_crushed_items.js
// Registers both Partial Dirty Crushed and Partial Crushed Ore items
// Extended to include materials found in 🪨 forge:raw_materials
// ES5-safe (no let/const/arrow)

StartupEvents.registry('item', function (event) {
  // Your original IG-only list
  var igOnly = [
    'cuprite','zircon','acanthite','alumina','smithsonite','thorianite',
    'fluorite','cryolite','vanadinite','unobtania','millerite','thorite',
    'anatase','wolframite'
  ];

  // Keys derived from your forge:raw_materials tag dump
  // (normalize by taking the part after raw_ OR after ore/normal_)
  var rawKeys = [
    // ad_astra / firmalife / misc
    'calorite','desh','chromite',

    // GTCEu raw_* (alphabetical-ish to make diffs sane)
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

  // Build a unique, order-stable list: IG first, then everything else
  var seen = {};
  var ores = [];

  function addKey(k) {
    if (!seen[k]) { seen[k] = true; ores.push(k); }
  }

  for (var i = 0; i < igOnly.length; i++) addKey(igOnly[i]);
  for (var j = 0; j < rawKeys.length; j++) addKey(rawKeys[j]);

  // Helper to make a nicer display name: underscores -> spaces, Title Case
  function prettyName(key) {
    var s = String(key).replace(/_/g, ' ');
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  for (var k = 0; k < ores.length; k++) {
    var ore = ores[k];
    var proper = prettyName(ore);

    // Partial Dirty Crushed Ore
    event.create('immersivegeology:partial_dirty_crushed_ore_' + ore)
      .texture('immersivegeology:item/dirty_crushed_ore_' + ore) // may not exist for all keys yet
      .displayName('Partial Dirty Crushed ' + proper + ' Ore');

    // Partial Clean Crushed Ore
    event.create('immersivegeology:partial_crushed_ore_' + ore)
      .texture('immersivegeology:item/crushed_ore_' + ore) // may not exist for all keys yet
      .displayName('Partial Crushed ' + proper + ' Ore');
  }

  console.info('[Immersive Geology] Registered partial dirty & clean crushed ores: ' + ores.length);
});
