// Find only the core ore *items* for IG, TFC, and GTCEu
ServerEvents.highPriorityData(event => {
  const allItems = Ingredient.all.itemIds;

  const immersiveGeology = allItems
    .filter(id => id.startsWith('immersivegeology:normal_ore_'));

  const tfc = allItems
    .filter(id => id.startsWith('tfc:ore/normal_') && id.split('/').length === 2);

  const gregtech = allItems
    .filter(id =>
      id.startsWith('gtceu:raw_') &&
      !id.includes('_block') &&
      !id.includes('_sand') &&
      !id.includes('_bucket') &&
      !id.includes('_dust') &&
      !id.includes('_nugget') &&
      !id.includes('_parts')
    );

  console.info('================ CORE ORE ITEM SCAN ================');
  console.info(`Immersive Geology: ${immersiveGeology.length}`);
  immersiveGeology.forEach(id => console.info('  - ' + id));
  console.info('----------------------------------------------------');
  console.info(`TFC: ${tfc.length}`);
  tfc.forEach(id => console.info('  - ' + id));
  console.info('----------------------------------------------------');
  console.info(`GregTech CEu: ${gregtech.length}`);
  gregtech.forEach(id => console.info('  - ' + id));
  console.info('====================================================');
});
