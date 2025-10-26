// KubeJS 6, Rhino-safe, no Java interop
ServerEvents.tags('item', function (event) {
  var tag = event.get('forge:raw_materials');
  if (!tag) {
    console.info('[TAG DUMP] forge:raw_materials not found');
    return;
  }

  var ids = tag.getObjectIds().toArray(); // Java array
  var out = [];
  for (var i = 0; i < ids.length; i++) out.push(String(ids[i])); // to JS strings
  out.sort();

  console.info('[TAG DUMP] forge:raw_materials entries=' + out.length);
  for (var j = 0; j < out.length; j++) console.info(' - ' + out[j]);
});
