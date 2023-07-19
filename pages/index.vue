<template>
	<div class="container mx-auto">
		<div class="flex flex-col gap-4">
			<div>
				<input
					type="hidden"
					v-model="invoice.data.id" />
				<input
					type="text"
					placeholder="Name"
					class="border rounded-md px-4 py-2"
					v-model="invoice.data.name" />
			</div>
			<div>
				<input
					type="email"
					placeholder="Email"
					class="border rounded-md px-4 py-2"
					v-model="invoice.data.email" />
			</div>
			<div>
				<textarea
					name="address"
					placeholder="Address"
					rows="2"
					class="border rounded-md px-4 py-2"
					v-model="invoice.data.address"></textarea>
			</div>
			<div>
				<input
					type="date"
					name="date"
					class="border rounded-md px-4 py-2"
					v-model="invoice.data.date" />
			</div>
			<div>
				<textarea
					name="projectDescription"
					rows="2"
					class="border rounded-md px-4 py-2"
					v-model="invoice.data.projectDescription"></textarea>
			</div>
			<div>
				<select
					name="status"
					placeholder="Status"
					class="border rounded-md px-4 py-2"
					v-model="invoice.data.status">
					<option value="draft">Draft</option>
					<option value="pending">Pending</option>
					<option value="paid">Paid</option>
				</select>
			</div>
			<div>
				<h3>Item List</h3>
				<div
					class="flex gap-4 justify-between my-4 text-center"
					v-for="(_, index) in invoice.data.items"
					:key="index">
					<input
						type="text"
						placeholder="Item Name"
						class="border rounded-md px-4 py-2"
						v-model="invoice.data.items[index].name" />
					<input
						type="number"
						placeholder="Item Qty"
						class="border rounded-md px-4 py-2"
						v-model="invoice.data.items[index].qty" />
					<input
						type="number"
						placeholder="Item Price"
						class="border rounded-md px-4 py-2"
						v-model="invoice.data.items[index].price" />
					<p>
						Total <br />
						{{
							invoice.data.items[index].qty * invoice.data.items[index].price
						}}
					</p>
					<button
						@click="handleRemoveInvoiceItem(index)"
						class="border rounded-md px-4 py-2">
						-
					</button>
				</div>
				<button
					@click="handleAddInvoiceItem()"
					class="border rounded-md px-4 py-2">
					+
				</button>
			</div>

			<button
				v-if="isEdit"
				@click="
					handleUpdateInvoice(invoice.data.id, invoice.data), (isEdit = false)
				"
				class="border rounded-md px-4 py-2">
				Save Update
			</button>
			<button
				v-if="isEdit"
				@click="handleRemoveInvoice(invoice.data.id), (isEdit = false)"
				class="border rounded-md px-4 py-2">
				Delete invoice
			</button>
			<button
				v-else
				@click="handleAddInvoice()"
				class="border rounded-md px-4 py-2">
				Save
			</button>
		</div>

		<div>
			<template
				v-for="item in store.invoices"
				:key="item.id">
				<div
					class="flex items-center justify-between gap-4 text-center p-4 my-4 border rounded-md">
					<div>
						<p>
							<b>#{{ item.id }}</b>
						</p>
					</div>
					<div>
						<p>{{ item.date }}</p>
					</div>
					<div>
						<p>{{ item.name }}</p>
					</div>
					<div>
						IDR
						<!--{{
							item.items.reduce(
								(acc, currentValue) => acc + currentValue.total,
								0
							)
						}}-->
					</div>
					<div>
						<p>{{ item.status }}</p>
					</div>
					<div>
						<button @click="handleGetSelectedInvoice(item), (isEdit = true)">
							>
						</button>
					</div>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
	import { useInvoiceStore } from '@/store/invoice';

	export default defineComponent({
		setup() {
			const store = useInvoiceStore();
			const isEdit = ref(false);
			const invoice = reactive({
				data: {
					id: null,
					name: '',
					email: '',
					address: '',
					date: '',
					projectDescription: '',
					status: 'draft',
					items: [],
				},
			});

			const invoiceItem = {
				name: '',
				qty: 0,
				price: 0,
			};

			const handleFormValidation = () => {
				if (
					invoice.data.name === '' ||
					invoice.data.email === '' ||
					invoice.data.address === '' ||
					invoice.data.date === '' ||
					invoice.data.projectDescription === '' ||
					invoice.data.status === ''
				) {
					alert('All field are required. Please fill the empty field.');
					return false;
				}

				if (invoice.data.items.length) {
					invoice.data.items.forEach((item) => {
						if (item.name === '') {
							alert('Please fill the Item Name field if you add some items.');
							return false;
						}
					});
				}

				return true;
			};

			const handleResetForm = () => {
				invoice.data.name = '';
				invoice.data.email = '';
				invoice.data.address = '';
				invoice.data.date = '';
				invoice.data.projectDescription = '';
				invoice.data.status = '';
			};

			const handleAddInvoice = () => {
				if (handleFormValidation()) {
					store.addInvoice(invoice);
					handleResetForm();
				}
			};

			const handleAddInvoiceItem = () => {
				invoice.data.items.push(invoiceItem);
			};

			const handleRemoveInvoiceItem = (idx) => {
				const filtered = invoice.data.items.filter((_, index) => idx !== index);

				invoice.data.items = filtered;
			};

			const handleRemoveInvoice = (id) => {
				store.removeInvoice(id);
				handleResetForm();
			};

			const handleGetSelectedInvoice = (item) => {
				invoice.data = item;
			};

			const handleUpdateInvoice = (id, invoice) => {
				if (handleFormValidation()) {
					store.updateInvoice(id, invoice);
					handleResetForm();
				}
			};

			return {
				store,
				invoice,
				handleAddInvoice,
				handleAddInvoiceItem,
				handleRemoveInvoiceItem,
				handleRemoveInvoice,
				handleGetSelectedInvoice,
				handleUpdateInvoice,
				handleRemoveInvoice,
			};
		},
	});
</script>
