// kubejs/server_scripts/immersive_geology/ig_ae2_transform.js
// Generates AE2 transform recipes for all dirty -> clean ores
// Works in any fluid tagged as tfc:water

ServerEvents.recipes(function (event) {
  var ores = [
    "cuprite",
    "zircon",
    "acanthite",
    "alumina",
    "smithsonite",
    "thorianite",
    "fluorite",
    "cryolite",
    "vanadinite",
    "unobtania",
    "millerite",
    "thorite",
    "anatase",
    "wolframite"
  ];

  for (var i = 0; i < ores.length; i++) {
    var ore = ores[i];
    event.custom({
      "type": "ae2:transform",
      "circumstance": { "type": "fluid", "tag": "tfc:water" },
      "ingredients": [
        { "item": "immersivegeology:dirty_crushed_ore_" + ore }
      ],
      "result": { "item": "immersivegeology:partial_crushed_ore_" + ore },
      "time": 100
    }).id("tfg:ae_transform/dirty_" + ore);
  }

  console.info("[IG AE2 Transform] Registered " + ores.length + " ore cleaning recipes.");
});
