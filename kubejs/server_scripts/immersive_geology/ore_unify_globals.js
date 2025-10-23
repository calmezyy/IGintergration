// kubejs/startup_scripts/ore_unify_globals.js
// Shared data + helpers for ore unification across scripts (Rhino-safe)

console.info('[ore_unify_globals] Loaded');

global.ORE_DEBUG = false;

// Toggle features here to avoid conflicts between pipelines
global.ENABLE_IG_TO_TFC  = true;   // maps Immersive Geology -> TFC/Firmalife items
global.ENABLE_IG_TO_GTCEU = false; // maps Immersive Geology -> GTCEu raw items

// Grades encoded in IG block IDs
global.ORE_GRADES = ['poor', 'normal', 'rich'];

// IG families (prefixes in block IDs)
global.IG_FAMILIES = ['tfc', 'minecraft'];

// Rock sets per family
global.TFC_ROCKS = [
  'gneiss','marble','phyllite','quartzite','schist','slate',
  'claystone','chert','chalk','conglomerate','dolomite',
  'limestone','basalt','shale'
];
global.MC_ROCKS = ['stone','granite','diorite','andesite','deepslate','tuff'];

// Ores you’re unifying to TFC/Firmalife
global.IG_TFC_ORES = [
  'cassiterite',
  'native_copper','native_gold','native_silver',
  'chromite',
  'hematite','magnetite','sphalerite',
  // IG minecraft_* families sometimes use plain names:
  'copper','gold','silver'
];

// Aliases: IG ore id -> TFC ore id piece
global.ORE_ALIAS = {
  // map plain names to native_* for TFC
  'copper': 'native_copper',
  'gold'  : 'native_gold',
  'silver': 'native_silver'
};

// Target mod overrides per ore (default is tfc)
global.ORE_TARGET_MOD = {
  // Firmalife hosts chromite
  'chromite': 'firmalife'
};

// Build TFC/Firmalife item id (grade always explicit: poor/normal/rich)
global.getTfcStyleItemId = function(grade, oreIdPart) {
  var alias = global.ORE_ALIAS[oreIdPart] || oreIdPart;
  var modid = global.ORE_TARGET_MOD[alias] || 'tfc';
  return modid + ':ore/' + grade + '_' + alias;
};

// ---------- GTCEu mapping (only used if ENABLE_IG_TO_GTCEU = true) ----------
global.IG_TO_GTCEU_OREMAP = {
  apatite:'apatite', bauxite:'bauxite', chalcocite:'chalcocite', chalcopyrite:'chalcopyrite',
  cobaltite:'cobaltite', galena:'galena', gypsum:'gypsum', ilmenite:'ilmenite',
  molybdenite:'molybdenite', monazite:'monazite', pyrite:'pyrite',
  pyrolusite:'pyrolusite', scheelite:'scheelite', thorite:'thorite',
  uraninite:'uraninite', vanadinite:'vanadinite', wolframite:'wolframite', zircon:'zircon',
  // typo safety
  illuminite:'ilmenite'
};

global.getGtceuRawItemId = function(grade, oreIdPart) {
  var mat = global.IG_TO_GTCEU_OREMAP[oreIdPart];
  if (!mat) return null;
  if (grade === 'normal') return 'gtceu:raw_' + mat;
  return 'gtceu:' + grade + '_raw_' + mat;
};
