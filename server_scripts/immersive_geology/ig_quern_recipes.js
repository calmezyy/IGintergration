// kubejs/server_scripts/ig_quern_recipes.js

ServerEvents.recipes(event => {
  // IG-exclusive ores → Dirty Crushed Ore via TFC Quern
  // (explicit list; excludes bituminous/anthracite/lignite and silver/native silver)

  event.recipes.tfc.quern('immersivegeology:dirty_crushed_ore_cuprite',     'immersivegeology:normal_ore_cuprite'    ).id('immersivegeology:quern/dirty_crushed_ore_cuprite');
  event.recipes.tfc.quern('immersivegeology:dirty_crushed_ore_zircon',      'immersivegeology:normal_ore_zircon'     ).id('immersivegeology:quern/dirty_crushed_ore_zircon');
  event.recipes.tfc.quern('immersivegeology:dirty_crushed_ore_acanthite',   'immersivegeology:normal_ore_acanthite'  ).id('immersivegeology:quern/dirty_crushed_ore_acanthite');
  event.recipes.tfc.quern('immersivegeology:dirty_crushed_ore_alumina',     'immersivegeology:normal_ore_alumina'    ).id('immersivegeology:quern/dirty_crushed_ore_alumina');
  event.recipes.tfc.quern('immersivegeology:dirty_crushed_ore_smithsonite', 'immersivegeology:normal_ore_smithsonite').id('immersivegeology:quern/dirty_crushed_ore_smithsonite');
  event.recipes.tfc.quern('immersivegeology:dirty_crushed_ore_thorianite',  'immersivegeology:normal_ore_thorianite' ).id('immersivegeology:quern/dirty_crushed_ore_thorianite');
  event.recipes.tfc.quern('immersivegeology:dirty_crushed_ore_fluorite',    'immersivegeology:normal_ore_fluorite'   ).id('immersivegeology:quern/dirty_crushed_ore_fluorite');
  event.recipes.tfc.quern('immersivegeology:dirty_crushed_ore_cryolite',    'immersivegeology:normal_ore_cryolite'   ).id('immersivegeology:quern/dirty_crushed_ore_cryolite');
  event.recipes.tfc.quern('immersivegeology:dirty_crushed_ore_vanadinite',  'immersivegeology:normal_ore_vanadinite' ).id('immersivegeology:quern/dirty_crushed_ore_vanadinite');
  event.recipes.tfc.quern('immersivegeology:dirty_crushed_ore_unobtania',   'immersivegeology:normal_ore_unobtania'  ).id('immersivegeology:quern/dirty_crushed_ore_unobtania');
  event.recipes.tfc.quern('immersivegeology:dirty_crushed_ore_millerite',   'immersivegeology:normal_ore_millerite'  ).id('immersivegeology:quern/dirty_crushed_ore_millerite');
  event.recipes.tfc.quern('immersivegeology:dirty_crushed_ore_thorite',     'immersivegeology:normal_ore_thorite'    ).id('immersivegeology:quern/dirty_crushed_ore_thorite');
  event.recipes.tfc.quern('immersivegeology:dirty_crushed_ore_anatase',     'immersivegeology:normal_ore_anatase'    ).id('immersivegeology:quern/dirty_crushed_ore_anatase');
  event.recipes.tfc.quern('immersivegeology:dirty_crushed_ore_wolframite',  'immersivegeology:normal_ore_wolframite' ).id('immersivegeology:quern/dirty_crushed_ore_wolframite');
});