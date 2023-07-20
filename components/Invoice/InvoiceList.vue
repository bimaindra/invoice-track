<!-- components/InvoiceList.vue -->
<template>
	<div>
		<template
			v-for="invoice in invoices"
			:key="invoice.id">
			<NuxtLink
				:to="`/invoices/${invoice.id}`"
				class="hover:bg-slate-50 active:bg-slate-100 transition grid grid-cols-2 md:grid-cols-9 md:items-center gap-4 px-4 md:px-8 py-6 my-4 border rounded-lg">
				<div class="md:hidden">
					<p class="text-lg text-ellipsis overflow-hidden mb-4">
						<b>#{{ invoice.id }}</b>
					</p>
					<p class="text-sm mb-4"
						>Due:
						<p class="font-semibold">{{ invoice.date }}</p>
					</p>
					<p class="text-2xl font-bold"
						>IDR
						{{
							invoice.items.reduce(
								(acc, currentValue) => acc + currentValue.price * currentValue.qty,
								0
							)
						}}</p
					>
				</div>
				<div class="md:hidden text-right">
					<p class="text-ellipsis overflow-hidden mb-4 font-semibold">{{ invoice.client.name }}</p>
					<Badges :badgeType="invoice.status" />
				</div>

				<div class="hidden md:block col-span-2">
					<p class="text-ellipsis overflow-hidden">
						<b>#{{ invoice.id }}</b>
					</p>
				</div>
				<div class="hidden md:block col-span-2 text-center">
					<small>Due:</small>
					<p class="font-semibold text-sm">{{ invoice.date }}</p>
				</div>
				<div class="hidden md:block text-center">
					<p class="text-ellipsis overflow-hidden">{{ invoice.client.name }}</p>
				</div>
				<div class="hidden md:block col-span-2 text-center">
					<b
						>IDR
						{{
							invoice.items.reduce(
								(acc, currentValue) => acc + currentValue.price * currentValue.qty,
								0
							)
						}}</b
					>
				</div>
				<div class="hidden md:block text-center">
					<Badges :badgeType="invoice.status" />
				</div>
				<div class="col-span-1 hidden md:block text-right">
					<button
						class="btn">
						View</button
					>
				</div>
			</NuxtLink>
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
