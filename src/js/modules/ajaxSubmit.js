export const submitForm = () => {
	const form = document.getElementById("feedbackForm");
	const formData = new FormData(form);

	fetch("http://localhost:9090/api/registration", {
		method: "POST",
		body: formData,
	})
		.then(response => response.json())
		.then(data => {
			handleResponse(data);
		})
		.catch(error => console.error("Error during form submission:", error));
};

const handleResponse = data => {
	const modalHeader = document.getElementById("modalHeader");
	modalHeader.innerHTML = "";
	const modalContent = document.getElementById("modalContent");
	modalContent.innerHTML = "";

	if (data.status === "success") {
		const form = document.getElementById("feedbackForm");
		form.reset();

		modalHeader.textContent = "Success";
		modalContent.textContent = data.message;
	} else if (data.status === "error") {
		for (const field in data.fields) {
			const errorDiv = document.createElement("div");
			errorDiv.textContent = data.message && data.fields[field];
			modalContent.appendChild(errorDiv);
		}
		modalHeader.textContent = "Error";
		modalContent.textContent = data.message;
	}
	document.getElementById("openModalBtn").click();
};
