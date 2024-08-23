import { setError, superValidate } from 'sveltekit-superforms';
import { fail, redirect } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import jwt from "jsonwebtoken";
import { ADMIN_LOGIN, ADMIN_PASSWORD, JWT_SECRET } from '$env/static/private';
import { z } from 'zod';
import { adminLoginAttempts, setAdminLoginAttempts } from '$lib/stores';

const schema = z.object({
	login: z.string(),
	password: z.string()
})

export const load = async ({ cookies }) => {
	const form = await superValidate(zod(schema));

	if(cookies.get("token") != undefined){
		redirect(303, "/admin/products");
	}

	return { form };
};

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(schema));

		if (!form.valid) {
			return fail(400, { form });
		}

		if (adminLoginAttempts >= 5) {
			setAdminLoginAttempts(adminLoginAttempts + 1);
			return setError(form, 'login', 'Превышено колинчество неудачных входов!');
		}

		if (form.data.login != ADMIN_LOGIN) {
			return setError(form, 'login', 'Пользователь не найден!');
		}

		if (form.data.password != ADMIN_PASSWORD) {
			setAdminLoginAttempts(adminLoginAttempts + 1);
			if(adminLoginAttempts == 5){
				setTimeout(() => {
					setAdminLoginAttempts(0);
				}, 1000 * 60 * 10);
			}
			return setError(form, 'password', 'Пароль не верен!');
		}

		const token = jwt.sign({ user: ADMIN_LOGIN }, JWT_SECRET);
		cookies.set("token", token, { path: "/" });
		return redirect(303, '/admin/products');
	}
};
