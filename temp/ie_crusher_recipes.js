// File: kubejs/server_scripts/immersive_geology/ie_crusher_recipes.js

ServerEvents.recipes(event => {
  const TAG = '#forge:raw_materials';

  // Per-item overrides when auto-guess fails
  // 'input_id' : 'output_id'
  const OVERRIDES = {
    // examples:
    // 'minecraft:raw_copper': 'gtceu:crushed_copper',
    // 'immersiveengineering:raw_uranium': 'gtceu:crushed_uraninite',
  };

  // Optional secondaries per input
  // 'input_id': [{chance: 0.25, output: 'mod:item'}, ...]
  const SECONDARIES = {
    // 'gtceu:raw_galena': [{ chance: 0.1, output: 'gtceu:silver_dust' }],
  };

  const stacks = Ingredient.of(TAG).getStacks().toArray();
  const seen = new Set();

  for (const s of stacks) {
    const inId = String(s.id);
    if (seen.has(inId)) continue;
    seen.add(inId);

    const outId = resolveOutput(inId, OVERRIDES);
    if (!outId) {
      console.log(`[IE Crusher] no crushed variant found for ${inId}`);
      continue;
    }

    const secs = SECONDARIES[inId] ?? [];
    event.recipes.immersiveengineering
      .crusher(outId, inId, secs)
      .id(`kubejs:ie_crusher/${inId.replace(':', '/')}`);

    console.log(`[IE Crusher] ${inId} -> ${outId}${secs.length ? ` +${secs.length} secs` : ''}`);
  }
});

/** Pick an output id. Try override, then common patterns. */
function resolveOutput(inId, OVERRIDES) {
  if (OVERRIDES[inId]) return OVERRIDES[inId];

  const [ns, path] = inId.split(':');
  // normalize common raw/ore prefixes
  const core = path
    .replace(/^raw_/, '')
    .replace(/^ore\/normal_/, '')
    .replace(/^ore\//, '');

  const candidates = [
    `${ns}:crushed_${core}`,
    `gtceu:crushed_${core}`,
    `${ns}:${core}_crushed`,
    `gtceu:${core}_crushed`,
  ];

  for (const id of candidates) if (Item.exists(id)) return id;
  return null;
}
