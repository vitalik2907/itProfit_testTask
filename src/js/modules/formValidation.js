import { parsePhoneNumberFromString } from "libphonenumber-js";

export const validateForm = () => {
	const form = document.getElementById("feedbackForm");
	const elements = form.elements;

	resetErrorStyles(elements);

	let isValid = true;

	for (let i = 0; i < elements.length; i++) {
		const element = elements[i];

		if (element.type !== "submit") {
			if (element.name === "email" && !validateEmail(element.value)) {
				setValidationError(
					element,
					"Введите корректный адрес электронной почты"
				);
				isValid = false;
			} else if (
				element.name === "phone" &&
				!isValidPhoneNumber(element.value)
			) {
				setValidationError(element, "Введите корректный номер телефона");
				isValid = false;
			} else if (element.value.trim() === "") {
				setValidationError(element, "Это поле обязательно для заполнения");
				isValid = false;
			} else {
				resetValidationStyles(element);
			}
		}
	}

	return isValid;
};

const isValidPhoneNumber = phoneNumber => {
	const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber, "BY");

	return parsedPhoneNumber && parsedPhoneNumber.isValid();
};

const resetErrorStyles = elements => {
	for (let i = 0; i < elements.length; i++) {
		const element = elements[i];

		if (element.type !== "submit") {
			element.style.border = "1px solid #ccc";
		}
	}
};

const resetValidationStyles = element => {
	element.style.border = "1px solid #ccc";
	element.title = "";
	const existingError = element.nextElementSibling;
	if (existingError && existingError.className === "error-message") {
		existingError.remove();
	}
};

const setValidationError = (element, errorMessage) => {
	element.style.border = "1px solid red";
	element.title = errorMessage;
	const existingError = element.nextElementSibling;
	if (existingError && existingError.className === "error-message") {
		existingError.remove();
	}
};

const validateEmail = email => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};
