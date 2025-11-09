// kubejs/server_scripts/create_tags.js

ServerEvents.tags('item', function (event) {
  // This will create immersivegeology:powder/bauxite if it doesn't exist
  event.add('immersivegeology:powder/bauxite', [
    'immersivegeology:powder_bauxite',
    'gtceu:bauxite_dust'
  ]);
});