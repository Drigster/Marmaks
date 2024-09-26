import { actionResult, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { writeFileSync, mkdirSync } from 'fs';
import { ORIGIN, SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER } from '$env/static/private';
import nodemailer, { type Transporter } from 'nodemailer';

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
	const customerEmail = await transporter.sendMail({
		from: `"МАРМАКС" <${SMTP_USER}>`,
		to: `${email}`,
		subject: 'Ваш заказ получен!',
		text: `Здравствуйте ${name}.
		Мы получили ваш заказ. С вами свяжутся в скорое время. Если у вас есть дополнительные вопросы пишите нам на почту: или звоните по телефону: .
		Дубликат вашего заказа: 
		\tИмя: ${name}
		\tТелефон: ${phone}
		\tПочта: ${email}
		\tСообщение: ${message}
		\tСписок файлов: ${files.join(', ')}`
	}, (err, info) => {
		console.log(JSON.stringify(err));

		if (process.env.NODE_ENV === 'development' && info) {
			console.log('CustomerEmail Preview URL: ' + nodemailer.getTestMessageUrl(info));
		}
	});
	const internalEmail = await transporter.sendMail({
		from: `"МАРМАКС" <${SMTP_USER}>`,
		to: `${email}`,
		subject: 'Получен новый заказ!',
		text: `\tИмя: ${name}
		\tТелефон: ${phone}
		\tПочта: ${email}
		\tСообщение: ${message}
		\tСписок файлов: ${files.join(', ')}`
	}, (err, info) => {
		console.log(JSON.stringify(err));

		if (process.env.NODE_ENV === 'development' && info) {
			console.log('InternalEmail Preview URL: ' + nodemailer.getTestMessageUrl(info));
		}
	});
}

export const _orderSchema = z.object({
	name: z.string(),
	phone: z.string(),
	email: z.string().email(),
	message: z.string(),
	files: z.instanceof(File, { message: 'Please upload a file.' }).array().optional()
});

export async function POST({ request }) {
	const orderForm = await superValidate(request, zod(_orderSchema));

	if (!orderForm.valid) {
		actionResult('failure', { orderForm }, 400);
	}

	const dirName = Date.now() + '_' + Math.round(Math.random() * 10000);

	mkdirSync(`data/${dirName}`);

	const filePaths: string[] = [];
	if (orderForm.data.files != undefined) {
		for (let i = 0; i < orderForm.data.files.length; i++) {
			const file: File = orderForm.data.files[i];
			writeFileSync(
				`data/${dirName}/${file.name}`,
				new Uint8Array(await file.arrayBuffer())
			);
			filePaths.push(`${ORIGIN}/files/${dirName}/${file.name}`);
		}
	}

	sendOrder(
		orderForm.data.email,
		orderForm.data.name,
		orderForm.data.phone,
		orderForm.data.message,
		filePaths
	);

	orderForm.data.files = undefined;

	return actionResult('success', { orderForm }, 200);
}
