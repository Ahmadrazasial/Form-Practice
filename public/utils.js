function showErr(input, message) {
    const error = document.querySelector(`.errSpan[data-for="${input.id}"]`);
    if (!error) return;
    error.style.display = "block";
    error.textContent = message;

}

function clearErr(input) {
    const error = document.querySelector(`.errSpan[data-for="${input.id}"]`);
    if (!error) return;
    error.textContent = "";
}

requiredFields.filter(Boolean).forEach((field, index) => {
    if (!field) return;
    field.addEventListener("input", () => {
        clearErr(field);
        // if (serverErrors && serverErrors[field.name]) {
        //     delete serverErrors[field.name];
        // };
        validationArr[index]();
    })
})

const phoneDiv = document.getElementById("fullNumber");

if (phoneDiv) {


    phoneDiv.addEventListener("focusin", () => {
        if (phoneDiv) phoneDiv.classList.add("outline");
    })

    phoneDiv.addEventListener("focusout", () => {
        if (phoneDiv) phoneDiv.classList.remove("outline");
    })
}