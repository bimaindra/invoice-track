<!-- pages/add.vue -->
<template>
	<div class="container mx-auto px-4 lg:px-0">
		<InvoiceForm
			formTitle="Create Invoice"
			formButton="Create" />
	</div>
</template>

<script>
	import InvoiceForm from '@/components/Invoice/InvoiceForm.vue';

	export default {
		components: {
			InvoiceForm,
		},
	};
</script>
