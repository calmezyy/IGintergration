// KubeJS 6, Rhino-safe, no Java interop
ServerEvents.tags('item', function (event) {
  var tag = event.get('forge:crushed_ores');
  if (!tag) {
    console.info('[TAG DUMP] forge:crushed_ores not found');
    return;
  }

  var ids = tag.getObjectIds().toArray(); // Java array
  var out = [];
  for (var i = 0; i < ids.length; i++) out.push(String(ids[i])); // to JS strings
  out.sort();

  console.info('[TAG DUMP] forge:crushed_ores entries=' + out.length);
  for (var j = 0; j < out.length; j++) console.info(' - ' + out[j]);
});
