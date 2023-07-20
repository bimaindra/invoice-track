<template>
	<div>
		<h1 class="text-3xl lg:text-4xl font-bold mb-6">{{ formTitle }}</h1>
		<form @submit.prevent="submitForm">
			<div class="py-4 flex flex-col gap-4">
				<h2 class="text-xl font-bold">Bill From</h2>
				<div>
					<label
						for="billerName"
						class="mb-2 block"
						>Name</label
					>
					<input
						v-model="biller.name"
						id="billerName"
						placeholder="Biller's name"
						class="form-input"
						required />
				</div>
				<div>
					<label class="mb-2 block">Address</label>
					<textarea
						name="address"
						placeholder="Address"
						rows="2"
						class="form-input"
						required
						v-model="biller.address"></textarea>
				</div>
			</div>

			<div class="py-4 flex flex-col gap-4">
				<h2 class="text-xl font-bold">Bill To</h2>
				<div>
					<label class="mb-2 block">Client's Name</label>
					<input
						type="text"
						placeholder="Name"
						class="form-input"
						required
						v-model="client.name" />
				</div>
				<div>
					<label class="mb-2 block">Client's Email</label>
					<input
						type="email"
						placeholder="Email"
						class="form-input"
						required
						v-model="client.email" />
				</div>
				<div>
					<label class="mb-2 block">Address</label>
					<textarea
						placeholder="Address"
						rows="2"
						class="form-input"
						required
						v-model="client.address"></textarea>
				</div>
				<div class="flex items-center gap-4 justify-between">
					<div class="w-full">
						<label class="mb-2 block">Invoice Date</label>
						<input
							type="date"
							name="date"
							class="form-input"
							required
							v-model="date" />
					</div>
					<div class="w-full">
						<label class="mb-2 block">Payment Terms</label>
						<select
							type="text"
							placeholder="Payment Terms"
							class="form-input"
							required
							v-model="paymentTerms">
							<option value="">Select payment terms</option>
							<option value="30">30 Days</option>
							<option value="60">60 Days</option>
							<option value="90">90 Days</option>
						</select>
					</div>
				</div>
				<div>
					<label class="mb-2 block">Project Description</label>
					<textarea
						placeholder="Project description"
						rows="2"
						class="form-input"
						required
						v-model="projectDescription"></textarea>
				</div>
			</div>

			<h3 class="text-lg mb-4 font-semibold">Item List</h3>
			<div
				class="flex flex-col md:flex-row gap-4 justify-between my-4 items-center text-center"
				v-for="(item, index) in items"
				:key="index">
				<div class="flex items-center gap-4 flex-1">
					<div class="w-full">
						<input
							placeholder="Item name"
							class="form-input"
							v-model="item.name"
							required />
					</div>
					<div class="w-full">
						<input
							placeholder="Quantity"
							class="form-input"
							type="number"
							v-model="item.qty"
							required />
					</div>
					<div class="w-full">
						<input
							placeholder="Price"
							class="form-input"
							type="number"
							v-model="item.price"
							required />
					</div>
				</div>
				<div class="flex items-center justify-between gap-4">
					<div class="min-w-[150px]">
						<p>Total</p>
						<b>IDR {{ item.qty * item.price }}</b>
					</div>
					<button
						type="button"
						class="btn"
						@click="removeItem(index)">
						-
					</button>
				</div>
			</div>
			<div>
				<button
					type="button"
					class="btn w-full"
					@click="addItem">
					Add Item
				</button>
			</div>

			<div class="mt-6 flex justify-end gap-4">
				<button
					type="submit"
					class="btn btn-primary">
					{{ formButton }}
				</button>
				<router-link
					to="/invoices"
					class="btn"
					>Cancel</router-link
				>
			</div>
		</form>
	</div>
</template>

<script>
	import { ref } from 'vue';
	import { useRouter } from 'vue-router';
	import { useInvoicesStore } from '@/store/invoices';

	export default {
		props: {
			formTitle: String,
			formButton: String,
			invoice: Object, // For editing an existing invoice
		},
		setup(props) {
			const invoicesStore = useInvoicesStore();
			const router = useRouter();
			const { invoice } = props;

			const biller = ref({
				name: '',
				address: '',
			});

			const client = ref({
				name: '',
				email: '',
				address: '',
			});

			const date = ref('');
			const projectDescription = ref('');
			const paymentTerms = ref('');

			const items = ref([]);

			if (invoice) {
				Object.assign(biller.value, invoice.biller);
				Object.assign(client.value, invoice.client);
				date.value = invoice.date;
				projectDescription.value = invoice.projectDescription;
				paymentTerms.value = invoice.paymentTerms;
				items.value = invoice.items.map((item) => ({ ...item }));
			}

			const addItem = () => {
				items.value.push({
					name: '',
					qty: 0,
					price: 0,
				});
			};

			const removeItem = (index) => {
				items.value.splice(index, 1);
			};

			const submitForm = () => {
				const newInvoice = {
					id: invoice ? invoice.id : Date.now(),
					biller: { ...biller.value },
					client: { ...client.value },
					date: date.value,
					projectDescription: projectDescription.value,
					paymentTerms: paymentTerms.value,
					status: 'draft',
					items,
				};

				if (invoice) {
					invoicesStore.updateInvoice(newInvoice);
				} else {
					invoicesStore.addInvoice(newInvoice);
				}

				// Clear the form fields after adding the invoice
				biller.value.name = '';
				biller.value.address = '';
				client.value.name = '';
				client.value.email = '';
				client.value.address = '';
				items.value = [];

				// Redirect to the invoices list page after submission
				router.push('/invoices');
			};

			return {
				biller,
				client,
				date,
				projectDescription,
				paymentTerms,
				items,
				addItem,
				removeItem,
				submitForm,
			};
		},
	};
</script>
