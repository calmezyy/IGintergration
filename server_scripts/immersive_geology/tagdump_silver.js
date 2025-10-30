// KubeJS 6, Rhino-safe, no Java interop
// Dump the contents of a FLUID tag
ServerEvents.tags('fluid', function (event) {
  var tagId = 'forge:silver'; // ← change this to the fluid tag you want to inspect
  var tag = event.get(tagId);
  if (!tag) {
    console.info('[TAG DUMP] ' + tagId + ' not found');
    return;
  }

  var ids = tag.getObjectIds().toArray(); // ResourceLocation[] → Java array
  var out = [];
  for (var i = 0; i < ids.length; i++) out.push(String(ids[i])); // to JS strings
  out.sort();

  console.info('[TAG DUMP] ' + tagId + ' entries=' + out.length);
  for (var j = 0; j < out.length; j++) console.info(' - ' + out[j]);
});