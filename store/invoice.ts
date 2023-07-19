import { defineStore } from 'pinia';

export interface Invoice {
	id: number | string;
	name: string;
	email: string;
	address: string;
	date: string;
	projectDescription: string;
	status: 'draft' | 'pending' | 'paid';
	items: InvoiceItem[];
}

export interface InvoiceItem {
	name: string;
	qty: number;
	price: number;
	total: number;
}

const state = () => ({
	invoices: [
		{
			id: 'lk44n1j9',
			name: 'Bima',
			email: 'abc@mail.com',
			address: 'Jakarta',
			date: '2024-01-01',
			projectDescription: 'lorem	ipsum dolor sit amet',
			status: 'draft',
			items: [
				{
					name: 'Banner Design',
					qty: 2,
					price: 100,
					total: 200,
				},
			],
		},
		{
			id: 'lk23T1j2',
			name: 'Jhon',
			email: 'aaa@mail.com',
			address: 'Surabaya',
			date: '2024-01-01',
			projectDescription: 'lorem	ipsum dolor sit amet',
			status: 'pending',
			items: [],
		},
		{
			id: 'lkgnaq4',
			name: 'Bima',
			email: 'Indra',
			address: 'Jakarta',
			date: '2024-01-01',
			projectDescription: 'lorem	ipsum dolor sit amet',
			status: 'paid',
			items: [
				{
					name: 'Banner Design',
					qty: 2,
					price: 100,
					total: 200,
				},
				{
					name: 'Website revamp',
					qty: 1,
					price: 100,
					total: 100,
				},
			],
		},
	],
});

const getters = {
	getInvoices: (state: any) => state.invoices,
	getInvoiceById: (state: any) => {
		return (id: number) =>
			state.items.find((item: any) => !!item && item.id == id);
	},
};

export const useInvoiceStore = defineStore('invoice', {
	state,
	getters,
	actions: {
		addInvoice(invoice: any) {
			const { data } = invoice;
			this.invoices.push({ id: Date.now(), ...data });
		},
		removeInvoice(id: number | string) {
			this.invoices = this.invoices.filter((item) => item.id !== id);
		},
		updateInvoice(id: number | string, updatedInvoice: any) {
			const items = this.invoices;
			const index = items.findIndex((item) => !!item && item.id == id);

			items[index] = { ...items[index], ...updatedInvoice };
		},
	},
});
