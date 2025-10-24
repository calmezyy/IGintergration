// kubejs/server_scripts/ig_to_gtceu_drops.js
// Immersive Geology -> GTCEu raw items (block-break fallback, ignores loot tables)

const ensureIgDefaults =
  global.__ensureImmersiveGeologyDefaults ||
  (global.__ensureImmersiveGeologyDefaults = () => {
    const pickArray = (...options) => {
      for (const option of options) {
        if (Array.isArray(option) && option.length > 0) {
          return option.slice();
        }
      }
      return [];
    };

    const normalize = values => {
      const result = [];
      for (const value of values) {
        if (value === undefined || value === null) continue;
        const entry = String(value).trim();
        if (!entry || result.indexOf(entry) !== -1) continue;
        result.push(entry);
      }
      return result;
    };

    const defaults = {
      grades: ['poor', 'normal', 'rich'],
      families: ['tfc', 'minecraft'],
      tfcRocks: [
        'andesite',
        'basalt',
        'chalk',
        'chert',
        'claystone',
        'conglomerate',
        'diorite',
        'dolomite',
        'gabbro',
        'gneiss',
        'granite',
        'limestone',
        'marble',
        'phyllite',
        'quartzite',
        'rhyolite',
        'schist',
        'shale',
        'slate'
      ],
      mcRocks: ['stone', 'granite', 'diorite', 'andesite', 'deepslate', 'tuff'],
      ores: [
        'cassiterite',
        'native_copper',
        'native_gold',
        'native_silver',
        'chromite',
        'hematite',
        'magnetite',
        'sphalerite',
        'copper',
        'gold',
        'silver',
        'pyrite',
        'chalcopyrite',
        'chalcocite',
        'galena',
        'ilmenite',
        'bauxite',
        'apatite',
        'monazite',
        'molybdenite',
        'fluorite'
      ],
      gtceuAliases: {
        native_copper: 'copper',
        native_gold: 'gold',
        native_silver: 'silver'
      }
    };

    const resolvedGrades = normalize(pickArray(global.ORE_GRADES, defaults.grades));
    const resolvedFamilies = normalize(pickArray(global.IG_FAMILIES, defaults.families));
    const resolvedTfcRocks = normalize(
      pickArray(global.TFC_ROCKS, global.TFC_STONE_TYPES, defaults.tfcRocks)
    );
    const resolvedMcRocks = normalize(pickArray(global.MC_ROCKS, defaults.mcRocks));
    const resolvedOres = normalize(pickArray(global.IG_TFC_ORES, defaults.ores));

    global.ORE_GRADES = resolvedGrades;
    global.IG_FAMILIES = resolvedFamilies;
    global.TFC_ROCKS = resolvedTfcRocks;
    global.MC_ROCKS = resolvedMcRocks;
    global.IG_TFC_ORES = resolvedOres;
    global.IG_GTCEU_ALIASES = Object.assign({}, defaults.gtceuAliases, global.IG_GTCEU_ALIASES || {});

    if (typeof global.ENABLE_IG_TO_TFC !== 'boolean') global.ENABLE_IG_TO_TFC = true;
    if (typeof global.ENABLE_IG_TO_GTCEU !== 'boolean') global.ENABLE_IG_TO_GTCEU = true;
    if (typeof global.ORE_DEBUG !== 'boolean') global.ORE_DEBUG = false;

    if (typeof global.getTfcStyleItemId !== 'function') {
      const tfcCache = new Map();
      global.getTfcStyleItemId = (grade, ore) => {
        const key = grade + ':' + ore;
        if (tfcCache.has(key)) return tfcCache.get(key);

        let resolved = null;
        const namespaces = ['tfc', 'firmalife'];
        for (let i = 0; i < namespaces.length && !resolved; i++) {
          const id = namespaces[i] + ':ore/' + grade + '_' + ore;
          if (!Item.of(id).isEmpty()) resolved = id;
        }

        if (!resolved && grade === 'normal') {
          for (let j = 0; j < namespaces.length && !resolved; j++) {
            const id = namespaces[j] + ':ore/' + ore;
            if (!Item.of(id).isEmpty()) resolved = id;
          }
        }

        tfcCache.set(key, resolved);
        return resolved;
      };
    }

    if (typeof global.getGtceuRawItemId !== 'function') {
      const gtceuCache = new Map();
      const aliasMap = global.IG_GTCEU_ALIASES;
      global.getGtceuRawItemId = (grade, ore) => {
        const key = grade + ':' + ore;
        if (gtceuCache.has(key)) return gtceuCache.get(key);

        const candidates = new Set([ore]);
        if (aliasMap && aliasMap[ore]) candidates.add(aliasMap[ore]);
        if (ore.startsWith('native_')) candidates.add(ore.substring('native_'.length));
        if (ore.endsWith('_ore')) candidates.add(ore.slice(0, -4));

        let resolved = null;
        const gradePrefixes = grade === 'normal' ? [''] : [grade + '_', ''];
        for (const candidate of candidates) {
          const cleaned = candidate.replace(/^_+|_+$/g, '');
          if (!cleaned) continue;
          for (let k = 0; k < gradePrefixes.length; k++) {
            const id = 'gtceu:' + gradePrefixes[k] + 'raw_' + cleaned;
            if (!Item.of(id).isEmpty()) {
              resolved = id;
              break;
            }
          }
          if (resolved) break;
        }

        gtceuCache.set(key, resolved);
        return resolved;
      };
    }

    return {
      grades: global.ORE_GRADES.slice(),
      families: global.IG_FAMILIES.slice(),
      tfcRocks: global.TFC_ROCKS.slice(),
      mcRocks: global.MC_ROCKS.slice(),
      ores: global.IG_TFC_ORES.slice()
    };
  });

ensureIgDefaults();

const ENABLE_IG_TO_GTCEU = global.ENABLE_IG_TO_GTCEU ?? true;
const ENABLE_IG_TO_TFC = global.ENABLE_IG_TO_TFC ?? true;

if (ENABLE_IG_TO_GTCEU) {
  console.info('[ig_to_gtceu_drops] Enabled');

  const ORE_REGEX = /^(?:immersivegeology:)(?:tfc_|minecraft_)?(poor|normal|rich)_ore_block_([a-z0-9_]+)_[a-z0-9_]+$/;

  BlockEvents.broken(event => {
    const id = event.block.id;
    if (!id.startsWith('immersivegeology:')) return;

    const match = ORE_REGEX.exec(id);
    if (!match) return;

    const grade = match[1];
    const ore = match[2];

    if (ENABLE_IG_TO_TFC) {
      const tfcItem = global.getTfcStyleItemId(grade, ore);
      if (tfcItem) {
        if (global.ORE_DEBUG) {
          console.info('[ig_to_gtceu_drops] Loot table handles ' + id + ' via ' + tfcItem);
        }
        return;
      }
    }

    const item = global.getGtceuRawItemId(grade, ore);
    if (!item) {
      if (global.ORE_DEBUG) console.warn('[ig_to_gtceu_drops] Unmapped ' + ore + ' from ' + id);
      return;
    }

    event.block.set('minecraft:air');
    event.block.popItem(item);
    event.cancel();

    if (global.ORE_DEBUG) console.info('[ig_to_gtceu_drops] ' + id + ' -> ' + item);
  });
} else {
  console.info('[ig_to_gtceu_drops] Disabled by toggle');
}
