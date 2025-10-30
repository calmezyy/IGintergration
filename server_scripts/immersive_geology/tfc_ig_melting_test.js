// kubejs/server_scripts/tfc_ig_melting_test.js
ServerEvents.recipes(event => {
  event.custom({
    type: "tfc:heating",
    ingredient: { item: "immersivegeology:crushed_ore_acanthite" },
    result_fluid: { fluid: "gtceu:silver", amount: 90 },
    temperature: 480
  }).id("kubejs:tfc/heating/ig_acanthite_to_silver");
});