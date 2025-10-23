// zzz_remove_quern_ore_crushing.js
// Kill ALL ore-crushing quern recipes by ID (small_/poor_/normal_/rich_).
// Logs each removal so you can verify.

console.info('[zzz_remove_quern_ore_crushing] Loaded');

ServerEvents.recipes(event => {
  var removed = 0;
  
   // Nuke all copper-related quern recipes across any namespace
  event.remove({ id: /.*quern\/small_native_copper/ });
  event.remove({ id: /.*quern\/small_.*/ }); // all small_ ore recipes
  event.remove({ id: /.*quern\/poor_.*/ });
  event.remove({ id: /.*quern\/normal_.*/ });
  event.remove({ id: /.*quern\/rich_.*/ });

  console.info("[zzz_remove_quern_ore_crushing] Wiped small_*, poor_*, normal_*, rich_* quern recipes from all namespaces.");

  function startsWithAny(s, prefixes) {
    if (typeof s !== 'string') return false;
    for (var i = 0; i < prefixes.length; i++) {
      if (s.startsWith(prefixes[i])) return true;
    }
    return false;
  }

  var killPrefixes = [
    'tfg:quern/small_',   // ore pieces
    'tfg:quern/poor_',    // just in case
    'tfg:quern/normal_',  // just in case
    'tfg:quern/rich_'     // just in case
  ];

  // First pass: list all quern recipe IDs
  var toRemove = [];
  event.forEachRecipe({ type: 'tfg:quern' }, r => {
    var id = String(r.getId());
    if (startsWithAny(id, killPrefixes)) {
      toRemove.push(id);
    }
  });

  // Second pass: remove them explicitly and log each one
  for (var i = 0; i < toRemove.length; i++) {
    var id = toRemove[i];
    event.remove({ id: id });
    removed++;
    console.info('[zzz_remove_quern_ore_crushing] removed ' + id);
  }

  console.info('[zzz_remove_quern_ore_crushing] total_removed=' + removed);
});
