import "../styles/main.scss";
import { validateForm } from "./modules/formValidation.js";
import { submitForm } from "./modules/ajaxSubmit.js";

document.getElementById("feedbackForm").addEventListener("submit", event => {
	event.preventDefault();

	if (validateForm()) {
		submitForm();
	}
});

document.getElementById("openModalBtn").addEventListener("click", () => {
	const modal = document.getElementById("myModal");
	modal.style.display = "flex";
	document.body.style.overflow = "hidden";
});

document.getElementById("closeModalBtn").addEventListener("click", () => {
	const modal = document.getElementById("myModal");
	modal.style.display = "none";
	document.body.style.overflow = "auto";
});
