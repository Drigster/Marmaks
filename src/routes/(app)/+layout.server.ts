import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { _orderSchema } from "./sendorder/+server";

export const load = async () => {
	const orderForm = await superValidate(zod(_orderSchema), {
		id: "order"
	});

	return { orderForm };
};