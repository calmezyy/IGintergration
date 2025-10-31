// kubejs/server_scripts/debug/dump_quern_recipes.js
// Dumps all TFC Quern recipes (inputs/outputs) to the server log
// and to kubejs/data_dump/quern_recipes.json
// KubeJS 6, ES5/Rhino-safe (no let/const/arrow, no Java interop)

ServerEvents.recipes(function (event) {
  function asId(x) {
    if (!x) return '?';
    // Ingredient forms
    if (x.item) return String(x.item);
    if (x.tag)  return '#' + String(x.tag);
    if (x.items && x.items.length) {
      // Some datapacks use ingredient.items: [{item:"a"}, {item:"b"}]
      var parts = [];
      for (var i = 0; i < x.items.length; i++) {
        parts.push(asId(x.items[i]));
      }
      return '[' + parts.join(', ') + ']';
    }
    // Fallback to JSON to capture odd shapes / NBT
    return JSON.stringify(x);
  }

  function asStack(x) {
    if (!x) return '?';
    var id = asId(x);
    var count = x.count ? (' x' + x.count) : '';
    return id + count;
  }

  var rows = [];
  var count = 0;

  event.forEachRecipe({ type: 'tfc:quern' }, function (rec) {
    count++;
    var j = rec.json;

    // TFC quern is usually:
    // { "type":"tfc:quern", "ingredient":{item|tag|items:[...]}, "result":{item,count?} }
    var ing = j.ingredient || j.ingredients || null;
    var res = j.result || null;

    var inStr  = asId(ing);
    var outStr = asStack(res);

    var line = '[QUERN] ' + String(rec.getId()) + ' :: ' + inStr + ' => ' + outStr;
    console.info(line);

    rows.push({
      id: String(rec.getId()),
      input: inStr,
      result: outStr
    });
  });

  // Also write a machine-readable dump for later use
  JsonIO.write('kubejs/data_dump/quern_recipes.json', rows);

  console.info('[QUERN DUMP] Wrote ' + count + ' recipes to kubejs/data_dump/quern_recipes.json');
});
