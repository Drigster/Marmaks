import { actionResult, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { writeFileSync, mkdirSync } from 'fs';
import { ORIGIN, SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER } from '$env/static/private';
import nodemailer, { type Transporter } from 'nodemailer';
import { db } from '$lib/database/db.js';
import { settings } from '$lib/database/schema.js';
import { eq, or } from 'drizzle-orm';

let transporter: Transporter;
try {
	if (process.env.NODE_ENV === 'development') {
		const testAccount = await nodemailer.createTestAccount();
		transporter = nodemailer.createTransport({
			host: 'smtp.ethereal.email',
			port: 587,
			secure: false,
			auth: {
				user: testAccount.user,
				pass: testAccount.pass
			}
		});
	} else {
		transporter = nodemailer.createTransport({
			host: SMTP_HOST,
			port: SMTP_PORT,
			secure: true,
			auth: {
				user: SMTP_USER,
				pass: SMTP_PASSWORD
			},
			tls: {
				rejectUnauthorized: false
			}
		});
	}

	transporter.verify(function (error) {
		if (error) {
			console.log(error);
		} else {
			console.log('MailServer is ready to take messages');
		}
	});
} catch (error) {
	console.log(error);
}

async function sendOrder(
	email: string,
	name: string,
	phone: string,
	message: string,
	files: string[]
) {
	const settingsList = await db
		.select()
		.from(settings)
		.where(or(eq(settings.key, 'phone1'), eq(settings.key, 'email')));

	const userMailStatus = await transporter.sendMail({
		from: `"МАРМАКС" <${SMTP_USER}>`,
		to: `${email}`,
		subject: 'Ваш заказ получен!',
		text: `Здравствуйте ${name}.
		Мы получили ваш заказ. С вами свяжутся в скорое время. Если у вас есть дополнительные вопросы пишите нам на почту: ${settingsList.find((e) => (e.key = 'email'))?.value} или звоните по телефону: ${settingsList.find((e) => (e.key = 'phone1'))?.value}.
		Дубликат вашего заказа: 
		\tИмя: ${name}
		\tТелефон: ${phone}
		\tПочта: ${email}
		\tСообщение: ${message}
		\tСписок файлов: \n\t${files.join('\n\t')}`
	});
	if (userMailStatus.accepted.length == 0) {
		console.log(JSON.stringify(userMailStatus));
		return false;
	}

	console.log(userMailStatus);

	const internalMailStatus = await transporter.sendMail({
		from: `"МАРМАКС" <${SMTP_USER}>`,
		to: `${SMTP_USER}`,
		subject: 'Получен новый заказ!',
		text: `\tИмя: ${name}
		\tТелефон: ${phone}
		\tПочта: ${email}
		\tСообщение: ${message}
		\tСписок файлов: ${files.join(', ')}`
	});
	if (internalMailStatus.accepted.length == 0) {
		console.log(JSON.stringify(userMailStatus));
	}

	if (process.env.NODE_ENV === 'development') {
		console.log(nodemailer.getTestMessageUrl(internalMailStatus));
	}

	return true;
}

export const _orderSchema = z.object({
	name: z.string(),
	phone: z.string(),
	email: z.string().email(),
	message: z.string(),
	files: z
		.instanceof(File, { message: 'Please upload a file.' })
		.refine((f) => f.size < 100_000_000, 'Максимальный размер файла 100Mb.')
		.array()
		.optional()
});

export async function POST({ request }) {
	const orderForm = await superValidate(request, zod(_orderSchema));

	if (!orderForm.valid) {
		return actionResult('failure', { orderForm });
	}

	const dirName = Date.now() + '_' + Math.round(Math.random() * 10000);

	mkdirSync(`data/${dirName}`);

	const filePaths: string[] = [];
	if (orderForm.data.files != undefined) {
		for (let i = 0; i < orderForm.data.files.length; i++) {
			const file: File = orderForm.data.files[i];
			writeFileSync(`data/${dirName}/${file.name}`, new Uint8Array(await file.arrayBuffer()));
			filePaths.push(`${ORIGIN}/files/${dirName}/${file.name}`);
		}
	}

	const status = await sendOrder(
		orderForm.data.email,
		orderForm.data.name,
		orderForm.data.phone,
		orderForm.data.message,
		filePaths
	);

	orderForm.data.files = undefined;

	if (!status) {
		return actionResult('error', 'Error sending email');
	}

	return actionResult('success', { orderForm });
}
