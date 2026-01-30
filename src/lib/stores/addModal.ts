import { writable } from 'svelte/store';

export const showAddModal = writable(false);

export function openAddModal() {
	showAddModal.set(true);
}

export function closeAddModal() {
	showAddModal.set(false);
}
