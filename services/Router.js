const Router = {
	init: () => {
		document.querySelectorAll("a.navlink").forEach((link) =>
			link.addEventListener("click", (event) => {
				event.preventDefault();
				// const url1 = event.target.href;
				const url = event.target.getAttribute("href");
				Router.go(url);
			})
		);
		//listen for back/forward in browser
		window.addEventListener("popstate", (event) => {
			Router.go(event.state.path, false);
		});

		//check the initial URL
		Router.go(location.pathname);
	},
	go: (path, addToHistory = true) => {
		console.log(`going to ${path}`);

		if (addToHistory) {
			history.pushState({ path }, null, path);
		}
		let content = null;
		switch (path) {
			case "/":
				content = document.createElement("h1");
				content.textContent = "Menu";
				break;
			case "/order":
				content = document.createElement("h1");
				content.textContent = "Your Order";
				break;
			default:
				if (path.startsWith("/product/")) {
					content = document.createElement("h1");
					content.textContent = "Details";
					const paramId = path.substring(path.lastIndexOf("/") + 1);
					content.dataset.id = paramId;
				}
		}

		if (content) {
			document.querySelector("main").innerHTML = "";
			document.querySelector("main").appendChild(content);
			window.scrollTo(0, 0);
		}
	},
};

export default Router;
