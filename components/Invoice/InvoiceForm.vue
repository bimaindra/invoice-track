<template>
	<div class="flex flex-col gap-4">
		<div>
			<input
				type="text"
				placeholder="Name"
				class="border rounded-md px-4 py-2"
				v-model="invoice.name" />
		</div>
		<div>
			<input
				type="email"
				placeholder="Email"
				class="border rounded-md px-4 py-2"
				v-model="invoice.email" />
		</div>
		<div>
			<textarea
				name="address"
				placeholder="Address"
				rows="2"
				class="border rounded-md px-4 py-2"
				v-model="invoice.address"></textarea>
		</div>
		<div>
			<input
				type="date"
				name="date"
				class="border rounded-md px-4 py-2"
				v-model="invoice.date" />
		</div>
		<div>
			<textarea
				name="projectDescription"
				rows="2"
				class="border rounded-md px-4 py-2"
				v-model="invoice.projectDescription"></textarea>
		</div>
		<div>
			<select
				name="status"
				placeholder="Status"
				class="border rounded-md px-4 py-2"
				v-model="invoice.status">
				<option value="draft">Draft</option>
				<option value="pending">Pending</option>
				<option value="paid">Paid</option>
			</select>
		</div>
		<div>
			<h3>Item List</h3>
			<div
				class="flex gap-4 justify-between my-4"
				v-for="(_, index) in invoice.items"
				:key="index">
				<input
					type="text"
					placeholder="Item Name"
					class="border rounded-md px-4 py-2"
					v-model="invoice.items[index].name" />
				<input
					type="number"
					placeholder="Item Qty"
					class="border rounded-md px-4 py-2"
					v-model="invoice.items[index].qty" />
				<input
					type="number"
					placeholder="Item Price"
					class="border rounded-md px-4 py-2"
					v-model="invoice.items[index].price" />
				<p>Total {{ invoice.items[index].qty * invoice.items[index].price }}</p>
				<button
					@click="removeInvoiceItem(index)"
					class="border rounded-md px-4 py-2">
					Remove
				</button>
			</div>
			<button
				@click="addInvoiceItem()"
				class="border rounded-md px-4 py-2">
				Add new item
			</button>
		</div>
		<button
			@click="addInvoice()"
			class="border rounded-md px-4 py-2">
			Add new invoice
		</button>
	</div>
</template>

<script>
	import { useInvoiceStore } from '@/store/invoice';

	export default defineComponent({
		setup() {
			const store = useInvoiceStore();
			const invoice = reactive({
				id: null,
				name: '',
				email: '',
				address: '',
				date: '',
				projectDescription: '',
				status: '',
				items: [],
			});

			const invoiceItem = {
				name: '',
				qty: 0,
				price: 0,
				total: 0,
			};

			const addInvoice = () => {
				store.addInvoice(invoice);
			};

			const addInvoiceItem = () => {
				invoice.items.push(invoiceItem);
			};

			const removeInvoiceItem = (idx) => {
				const filtered = invoice.items.filter((_, index) => idx !== index);

				invoice.items = filtered;
			};

			return {
				store,
				invoice,
				addInvoice,
				addInvoiceItem,
				removeInvoiceItem,
			};
		},
	});
</script>
