<!-- pages/edit/_id.vue -->
<template>
	<div class="container mx-auto px-4 lg:px-0">
		<InvoiceForm
			:formTitle="`Edit Invoice - ID: ${invoice.id}`"
			formButton="Update"
			:invoice="invoice" />
	</div>
</template>

<script>
	import { useInvoicesStore } from '@/store/invoices';
	import InvoiceForm from '@/components/Invoice/InvoiceForm.vue';

	export default {
		components: {
			InvoiceForm,
		},
		setup() {
			const invoicesStore = useInvoicesStore();
			const route = useRoute();
			const invoiceId = route.params.id;
			const invoice = computed(() =>
				invoicesStore.getInvoiceById(parseInt(invoiceId))
			);

			return {
				invoice,
			};
		},
	};
</script>
