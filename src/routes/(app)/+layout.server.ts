import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { _orderSchema } from './sendorder/+server';
import { db } from '$lib/database/db';
import { products, settings } from '$lib/database/schema';
import { eq } from 'drizzle-orm';
import { loadFlash } from 'sveltekit-flash-message/server';

export const load = loadFlash(async () => {
	const orderForm = await superValidate(zod(_orderSchema), {
		id: 'order'
	});
	const productList = await db.select().from(products).all();
	const phoneSetting = await db.query.settings.findFirst({
		where: eq(settings.key, 'phone1')
	});
	const phone2Setting = await db.query.settings.findFirst({
		where: eq(settings.key, 'phone2')
	});
	const emailSetting = await db.query.settings.findFirst({
		where: eq(settings.key, 'email')
	});
	const phone = phoneSetting?.value ? phoneSetting?.value : '';
	const phone2 = phone2Setting?.value ? phone2Setting?.value : '';
	const email = emailSetting?.value ? emailSetting?.value : '';

	return { orderForm, productList, phone, phone2, email };
});
