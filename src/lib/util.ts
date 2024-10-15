import type { Writable } from 'svelte/store';

export function clickOutside(node) {
	// the node has been mounted in the DOM

	window.addEventListener('click', handleClick);

	function handleClick(e) {
		if (!node.contains(e.target)) {
			node.dispatchEvent(new CustomEvent('outsideclick'));
		}
	}

	return {
		destroy() {
			// the node has been removed from the DOM
			window.removeEventListener('click', handleClick);
		}
	};
}

export function copy(event: MouseEvent, text: string, flash: Writable<App.PageData['flash']>) {
	event.stopPropagation();
	const clickedElement = event.target as HTMLElement;
	if (clickedElement == null) {
		return;
	}

	navigator.clipboard.writeText(text);
	flash.set({ type: 'info', message: 'Скопировано' });
}
