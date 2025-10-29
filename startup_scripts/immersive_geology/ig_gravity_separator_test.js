// kubejs/startup_scripts/ig_gravity_multiblock_id.js
// Logs Immersive Engineering multiblock IDs when formed (e.g., Gravity Separator)

StartupEvents.init(e => {
  // Wrap in init so it runs at startup, when Forge event bus is available
  try {
    ForgeEvents.onEvent(
      'blusunrize.immersiveengineering.api.multiblocks.MultiblockHandler$MultiblockFormEvent',
      ev => {
        // Multiblock unique ID (ResourceLocation)
        const id = ev.getMultiblock().getUniqueName().toString();
        const pos = ev.getClickedBlock();   // BlockPos
        const player = ev.getEntity();

        console.log(`[IE multiblock formed] ${id} at ${pos}`);
        if (player) player.tell(`Formed: ${id}`);
      }
    );
  } catch (err) {
    console.log('[IE multiblock formed] Failed to register listener:', err);
  }
});
