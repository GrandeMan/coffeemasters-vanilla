const Store = {
	menu: null,
	cart: [],
};

const proxiedStore = new Proxy(Store, {
	set(target, property, value) {
		target[property] = value;
		if (property == "menu") {
			window.dispatchEvent(new CustomEvent("menu-updated"));
		}
		if (property == "cart") {
			window.dispatchEvent(new CustomEvent("cart-updated"));
		}
		return true;
	},
});

export { proxiedStore };
