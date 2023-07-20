<!-- pages/invoices.vue -->
<template>
	<div class="container mx-auto px-4 lg:px-0">
		<div class="flex justify-between items-center mb-12">
			<div>
				<h1 class="text-3xl lg:text-4xl font-bold mb-2">Invoices</h1>
				<p>Total {{ invoices.length }} invoices.</p>
			</div>
			<div class="flex gap-4 items-center">
				<select
					v-model="filter"
					@change="">
					<option value="">Filter</option>
					<option value="draft">Draft</option>
					<option value="pending">Pending</option>
					<option value="paid">Paid</option>
				</select>
				<router-link
					to="/invoices/add"
					class="btn btn-primary"
					>+ New <span class="hidden md:inline">Invoice</span></router-link
				>
			</div>
		</div>
		<InvoiceList />
	</div>
</template>

<script>
	import { useInvoicesStore } from '@/store/invoices';
	import InvoiceList from '@/components/Invoice/InvoiceList.vue';

	export default {
		components: {
			InvoiceList,
		},
		setup() {
			const invoicesStore = useInvoicesStore();
			const filter = ref('');

			return {
				invoices: invoicesStore.invoices,
				filter,
			};
		},
	};
</script>
