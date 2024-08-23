import { db } from '$lib/database/db.js';
import { categories, products } from '$lib/database/schema.js';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const currentCategory = await db.query.categories.findFirst({
		where: eq(categories.urlPath, params.id)
	});

	const categoryList = await db.select().from(categories).all();

	if (currentCategory == undefined) throw error(404);

	const productList = await db.query.products.findMany({
		where: eq(products.categoryId, currentCategory.id)
	});

	return {
		currentCategory,
		categoryList,
		productList
	};
}
