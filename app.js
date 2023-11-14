import { proxiedStore } from "./services/Store.js";
import API from "./services/API.js";
import { loadData } from "./services/Menu.js";
import Router from "./services/Router.js";
import { MenuPage } from "./components/MenuPage.js";
import { OrderPage } from "./components/OrderPage.js";
import { DetailsPage } from "./components/DetailsPage.js";
import ProductItem from "./components/ProductItem.js";
import CartItem from "./components/CartItem.js";

window.app = {};
app.store = proxiedStore;
app.router = Router;

window.addEventListener("DOMContentLoaded", () => {
	loadData();
	app.router.init();
});

window.addEventListener("cart-updated", (event) => {
	const badge = document.getElementById("badge");
	const quantity = app.store.cart.reduce(
		(total, item) => total + item.quantity,
		0
	);
	badge.textContent = quantity;
	badge.hidden = quantity == 0;
});
