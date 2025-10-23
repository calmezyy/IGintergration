// Logs each TFC quern recipe ID and its input in a human-readable way
ServerEvents.recipes(event => {
  var n = 0;

  function showIngredient(ing) {
    try {
      if (!ing) return 'null';
      if (ing.item) return 'item=' + String(ing.item) + (ing.count ? ' x' + ing.count : '');
      if (ing.tag)  return 'tag=' + String(ing.tag)  + (ing.count ? ' x' + ing.count : '');
      if (ing.items && Array.isArray(ing.items)) {
        var parts = [];
        for (var i = 0; i < ing.items.length; i++) {
          var it = ing.items[i];
          if (it.item) parts.push(String(it.item));
          else if (it.tag) parts.push('#' + String(it.tag));
        }
        return 'items=[' + parts.join(', ') + ']';
      }
      // fallback to JSON
      return JSON.stringify(ing);
    } catch (e) {
      return '<error reading ingredient>';
    }
  }

  event.forEachRecipe({ type: 'tfc:quern' }, r => {
    var j = r.json;
    var ing = j.ingredient || j.input;
    console.info('[quern] id=' + r.getId() + ' | ' + showIngredient(ing));
    n++;
  });

  console.info('[quern] total=' + n);
});
