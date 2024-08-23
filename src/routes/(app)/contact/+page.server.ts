import { db } from '$lib/database/db.js';
import { settings } from '$lib/database/schema.js';
import { type Settings } from "$lib/database/db"

export const load = async () => {
	const settingList = await db.select().from(settings).all();
	let settingDict = {};

	settingList.forEach(setting => {
		settingDict[setting.key] = setting.value
	});

	return { settingDict };
};