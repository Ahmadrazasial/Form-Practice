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
function inputClear(fields,validationArr){
    fields.filter(Boolean).forEach((field, index) => {
    if (!field) return;
    field.addEventListener("input", () => {
        clearErr(field);
        clearAuthErr(authSpan)
        // if (serverErrors && serverErrors[field.name]) {
        //     delete serverErrors[field.name];
        // };
        validationArr[index]();
    })
})
}



const phoneDiv = document.getElementById("fullNumber");

if (phoneDiv) {


    phoneDiv.addEventListener("focusin", () => {
        if (phoneDiv) phoneDiv.classList.add("outline");
    })

    phoneDiv.addEventListener("focusout", () => {
        if (phoneDiv) phoneDiv.classList.remove("outline");
    })
}

function successMs(msg,formsSec) {
    const successSec = document.createElement("div")
    successSec.className = "successful";
    const greet = document.createElement("img")
    greet.className = "greet";
    greet.src = "images/success.svg";
    const text = document.createElement("h3")
    text.className = "text";
    text.textContent = msg || "Success";
    const link = document.createElement("a")
    link.className = "redirect";
    link.textContent = "Continue"

    link.addEventListener("click", (e) => {
        e.preventDefault();

        successSec.remove();

        formsSec.style.display = "flex";
    })
    successSec.append(greet, text, link);
    return successSec;
}