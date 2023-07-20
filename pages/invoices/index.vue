<!-- pages/invoices.vue -->
<template>
	<div class="container mx-auto px-4 lg:px-0">
		<div class="flex justify-between items-center mb-12">
			<div>
				<h1 class="text-3xl lg:text-4xl font-bold mb-2">Invoices</h1>
				<!--<p>There are {{ store.invoices.length }} total invoices</p>-->
			</div>
			<div class="flex gap-4 items-center">
				<select>
					<option value="">Filter</option>
					<option value="draft">Draft</option>
					<option value="pending">Pending</option>
					<option value="paid">Paid</option>
				</select>
				<router-link
					to="/invoices/add"
					class="btn btn-primary"
					>+ New <span class="hidden md:block">Invoice</span></router-link
				>
			</div>
		</div>
		<InvoiceList />
	</div>
</template>

<script>
	import InvoiceList from '@/components/Invoice/InvoiceList.vue';

	export default {
		components: {
			InvoiceList,
		},
	};
</script>
