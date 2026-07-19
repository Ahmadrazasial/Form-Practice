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
        // clearAuthErr(authSpan)
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

function successMs(msg,formsSec,a) {
    const successSec = document.createElement("div")
    successSec.style.display = "flex"
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

        window.location.href = a;
    })
    successSec.append(greet, text, link);
    return successSec;
}

function togglePassword(icons,inputs) {
icons.forEach((icon,index) =>{
    icon.addEventListener("click",() => {
        const input = inputs[index]
        // console.log(input.type)
        if(input.type === "password"){
            input.type = "text";
            icon.src = "/images/hide.svg";
            // console.log(input.type)
        }else {
            icon.src = "/images/show.svg";
             input.type = "password";
            // console.log(input.type)
        }
    })
})
}

function inputFocus(fields) {
fields.forEach((field)=>{
    field.style.borderColor = "#007A55"
         field.addEventListener("focusin", () => {
        field.classList.add("outline");
    })

    field.addEventListener("focusout", () => {
      field.classList.remove("outline");
    })
    })
}

const inputs = document.getElementsByTagName("input");

Array.from(inputs).forEach(input =>{
    input.style.color = "#007A55"
    input.style.outlineColor = "#007A55" 
})