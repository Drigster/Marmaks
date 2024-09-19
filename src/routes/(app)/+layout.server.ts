import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { _orderSchema } from './sendorder/+server';
import { db } from '$lib/database/db';
import { products, settings } from '$lib/database/schema';
import { eq } from 'drizzle-orm';

export const load = async () => {
	const orderForm = await superValidate(zod(_orderSchema), {
		id: 'order'
	});
	const productList = await db.select().from(products).all();
	const phoneSetting = await db.query.settings.findFirst({
		where: eq(settings.key, 'phone1')
	});
	const emailSetting = await db.query.settings.findFirst({
		where: eq(settings.key, 'email')
	});
	let phone = phoneSetting?.value ? phoneSetting?.value : '';
	let email = emailSetting?.value ? emailSetting?.value : '';

	return { orderForm, productList, phone, email };
};
