// kubejs/server_scripts/quern_remove_specific.js
ServerEvents.recipes(event => {
  // exact
  event.remove({ id: 'tfg:quern/copper_crushed_ore_from_poor_raw_ore' });
});
