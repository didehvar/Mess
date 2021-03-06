function registerSettings() {
	const isDnD = game.system.id === 'dnd5e';
	
	game.settings.register('mess', 'actor-item-sort', {
		name: "Activate item sort button.",
		hint: "Adds a button to actor sheets for sorting all items of that category alphabetically.",
		scope: "user",
		config: isDnD,
		default: isDnD,
		type: Boolean
	})

	game.settings.register('mess', 'better-draggable', {
		name: "Activate better drag'n'drop workflow.",
		scope: "user",
		config: false,// Change if implemented
		default: isDnD,
		type: Boolean
	})

	game.settings.register('mess', 'prepared-spell-tracker', {
		name: "Activate prepared spell tracker",
		hint: "Adds a tracker to the spellbook tab, providing a way to track the allowed maximum of prepared spells.",
		scope: "user",
		config: isDnD,
		default: isDnD,
		type: Boolean
	})

	game.settings.register('mess', 'add-scrolling', {
		name: "Activating numerical field scrolling.",
		hint: "Lets you in-/decrease numerical fields in the Actor sheet using the mouse wheel when focused.",
		scope: "user",
		config: isDnD,
		default: isDnD,
		type: Boolean
	});

	game.settings.register('mess', 'modify-rolling', {
		name: "Alternative Rolling.",
		hint: "Changes the way rolling is displayed and executed for DnD5e. Reload for all connected clients is required for this to take effect if changed!",
		scope: "world",
		config: isDnD,
		default: isDnD,
		type: Boolean
	});

	game.settings.register('mess', 'modify-templates', {
		name: "Activate modified templates.",
		hint: "Makes templates texture fill scaling instead of tiling and does allow the usage of videos as texture. Reload for all connected clients is required for this to take effect if changed!",
		scope: "world",
		config: true,
		default: true,
		type: Boolean
	});
	
	game.settings.register('mess', 'change-placeables', {
		name: "Activate placeables changes.",
		hint: "Changes some behaviours of placeables, like preview snapping to grid. Reload for all connected clients is required for this to take effect if changed!",
		scope: "world",
		config: true,
		default: true,
		type: Boolean
	});	
}


Hooks.on('ready', async function() {
	if (game.settings.get('mess', 'actor-item-sort'))
		(await import(/* webpackChunkName: "item-sort-btns" */ './actor-item-sort-btn.js')).default();
	if (game.settings.get('mess', 'better-draggable'))
		(await import(/* webpackChunkName: "draggable-items" */ './draggable-items.js')).default();
	if (game.settings.get('mess', 'prepared-spell-tracker'))
		(await import(/* webpackChunkName: "prepared-spell-tracker" */ './prepared-spell-tracker.js')).default();
	if (game.settings.get('mess', 'add-scrolling'))
		(await import(/* webpackChunkName: "add-scrolling" */ './add-scrolling.js')).default();
	
	if (CONFIG.debug.mess) {
		const actor = (await fromUuid('Actor.xV3LUAg05Pz5MFTS'));
		actor.sheet.render(true);
	}
});

Hooks.on('init', async function() {
	CONFIG.debug.mess = false;
	(await import('./settings.js')).MessSettings.init();
	if (CONFIG.debug.mess) {
		console.log(game.settings.get('mess', 'modify-templates'))
		console.log(game.settings.get('mess', 'modify-rolling'))
		console.log(game.settings.get('mess', 'change-placeables'))
	}
	if (game.settings.get('mess', 'modify-templates'))
		(await import(/* webpackChunkName: "modify-templates" */ './modify-templates.js')).default();
	if (game.settings.get('mess', 'modify-rolling'))
		(await import(/* webpackChunkName: "modify-rolling" */ './modify-rolling.js')).default();
	if (game.settings.get('mess', 'change-placeables'))
		(await import(/* webpackChunkName: "change-placeables" */ './change-placeables.js')).default();
});