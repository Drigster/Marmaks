import { JWT_SECRET } from '$env/static/private';
import { db } from '$lib/database/db.js';
import { users } from '$lib/database/schema.js';
import { redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

export function load({ cookies }) {
	const token = cookies.get('token');
	if (token == undefined) {
		throw redirect(303, '/admin');
	}
	try {
		const decoded = jwt.verify(token, JWT_SECRET);

		const user = db.query.users.findFirst({
			where: eq(users.id, decoded.user)
		});
		if (user == undefined) {
			cookies.delete('token', { path: '/' });
			throw redirect(303, '/admin');
		}
	} catch (err) {
		console.log(err);
		cookies.delete('token', { path: '/' });
		throw redirect(303, '/admin');
	}
}
