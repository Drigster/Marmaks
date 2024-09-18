import { db } from '$lib/database/db.js';
import { settings } from '$lib/database/schema.js';

export const load = async () => {
	const settingList = await db.select().from(settings).all();
	const settingDict = {} as any;

	settingList.forEach((setting) => {
		settingDict[setting.key] = setting.value;
	});

	return { settingDict };
};
