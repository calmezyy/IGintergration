// kubejs/startup_scripts/ore_globals.js
// Shared data for ore mapping scripts (used by LootJS drop modifiers)

console.info('[ore_globals] Loaded');

global.ENABLE_IG_TO_TFC   = true;  // still handy toggle
global.ENABLE_IG_TO_GTCEU = true;  // toggle for greg drops

// Standard lists used in all your LootJS scripts
global.ORE_GRADES  = ['poor', 'normal', 'rich'];
global.IG_FAMILIES = ['tfc', 'minecraft'];

global.TFC_ROCKS = [
  'gneiss','marble','phyllite','quartzite','schist','slate',
  'claystone','chert','chalk','conglomerate','dolomite',
  'limestone','basalt','shale'
];

global.MC_ROCKS = ['stone','granite','diorite','andesite','deepslate','tuff'];
