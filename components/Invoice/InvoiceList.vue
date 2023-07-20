<!-- components/InvoiceList.vue -->
<template>
	<div>
		<template
			v-for="invoice in invoices"
			:key="invoice.id">
			<div
				class="grid grid-cols-10 items-center gap-4 text-center px-4 py-6 my-4 border rounded-md">
				<div class="col-span-2">
					<p class="text-ellipsis overflow-hidden">
						<b>#{{ invoice.id }}</b>
					</p>
				</div>
				<div class="col-span-2">
					<small>Due Date:</small>
					<p class="font-semibold text-sm">{{ invoice.date }}</p>
				</div>
				<div>
					<p class="text-ellipsis overflow-hidden">{{ invoice.client.name }}</p>
				</div>
				<div class="col-span-2">
					IDR
					{{
						invoice.items.reduce(
							(acc, currentValue) => acc + currentValue.total,
							0
						)
					}}
				</div>
				<div>
					<Badges :badgeType="invoice.status" />
				</div>
				<div class="col-span-2">
					<router-link
						:to="`/invoices/${invoice.id}`"
						class="btn">
						View</router-link
					>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
	import { useInvoicesStore } from '@/store/invoices';

	export default {
		setup() {
			const invoicesStore = useInvoicesStore();

			return {
				invoices: invoicesStore.invoices,
				deleteInvoice: invoicesStore.deleteInvoice,
			};
		},
	};
</script>
