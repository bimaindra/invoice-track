<!-- pages/invoices/[id].vue -->
<template>
	<div class="container mx-auto px-4 lg:px-0">
		<h1 class="text-3xl lg:text-4xl font-bold mb-2">Invoice Detail</h1>
		<div class="flex md:justify-end gap-4 items-center mt-10 md:mt-0">
			<router-link
				:to="`/invoices/edit/${invoice.id}`"
				class="btn btn-success"
				>Edit</router-link
			>
			<button
				@click="deleteInvoice(invoice.id)"
				class="btn btn-danger">
				Delete
			</button>
			<button
				v-if="invoice.status !== 'paid'"
				@click="markInvoiceAsPaid(invoice.id)"
				class="btn btn-primary">
				<span class="hidden md:inline-block">Mark as</span> Paid
			</button>
			<router-link
				to="/invoices"
				class="btn"
				>Back</router-link
			>
		</div>
		<div class="px-6 py-12 rounded-lg shadow-lg mt-4">
			<h2
				class="text-2xl font-bold mb-4 pb-4 border-b"
				v-if="invoice">
				#{{ invoice.id }}
			</h2>
			<div class="grid grid-cols-2">
				<div class="text-left">
					<h3 class="font-bold text-xl mb-4 underline">From</h3>
					<p class="mb-4">
						<b>Name:</b> <br />
						{{ invoice.biller.name }}
					</p>
					<p class="mb-4">
						<b>Address:</b> <br />
						{{ invoice.biller.address }}
					</p>
				</div>
				<div class="text-right">
					<h3 class="font-bold text-xl mb-4 underline">To</h3>
					<p class="mb-4">
						<b>Name:</b> <br />
						{{ invoice.client.name }}
					</p>
					<p class="mb-4">
						<b>Email:</b> <br />
						{{ invoice.client.email }}
					</p>
					<p class="mb-4">
						<b>Address:</b> <br />
						{{ invoice.client.address }}
					</p>
				</div>
			</div>
			<hr class="my-8" />
			<h2 class="text-2xl font-bold mb-4 pb-4 border-b">Item List</h2>

			<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
				<table class="w-full text-sm text-left text-gray-500">
					<thead class="text-xs text-gray-700 uppercase bg-gray-50">
						<tr>
							<th
								scope="col"
								class="px-6 py-3">
								No
							</th>
							<th
								scope="col"
								class="px-6 py-3">
								Name
							</th>
							<th
								scope="col"
								class="px-6 py-3">
								Qty
							</th>
							<th
								scope="col"
								class="px-6 py-3">
								Price
							</th>
							<th
								scope="col"
								class="px-6 py-3">
								Total
							</th>
						</tr>
					</thead>
					<tbody>
						<tr
							class="bg-white border-"
							v-for="(item, index) in invoice.items"
							:key="index">
							<td class="px-6 py-4">{{ index + 1 }}</td>
							<td class="px-6 py-4">{{ item.name }}</td>
							<td class="px-6 py-4">{{ item.qty }}</td>
							<td class="px-6 py-4">{{ item.price }}</td>
							<td class="px-6 py-4">{{ item.qty * item.price }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
	import { useInvoicesStore } from '@/store/invoices';
	import { useRouter } from 'vue-router';

	export default {
		setup() {
			const invoicesStore = useInvoicesStore();
			const router = useRouter();
			const route = useRoute();
			const invoiceId = route.params.id;
			const invoice = computed(() =>
				invoicesStore.getInvoiceById(parseInt(invoiceId))
			);

			const deleteInvoice = (id) => {
				invoicesStore.deleteInvoice(id);
				router.push('/invoices');
			};

			const markInvoiceAsPaid = (id) => {
				invoicesStore.updatePaidInvoice(id);
				router.push('/invoices');
			};

			return {
				invoice,
				deleteInvoice,
				markInvoiceAsPaid,
			};
		},
	};
</script>
