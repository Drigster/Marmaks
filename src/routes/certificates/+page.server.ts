import { db } from '$lib/database/db.js';
import { certificates } from '$lib/database/schema.js';

export const load = async () => {
	const certificateList = await db.select().from(certificates).all();

	return { certificateList };
};
