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
function inputClear(fields, validationArr) {
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

function showLoader() {
    const overlay = document.createElement("div");
     overlay.className = "loader-overlay";

     overlay.innerHTML = `<img class="loader" src="images/loading.svg">`
     document.body.appendChild(overlay)
}
function hideLoader() {
    document.querySelector(".loader-overlay")?.remove();
}

function successMs(msg, formsSec, a,btnText, newTab = false, reset = false) {
    const successSec = document.createElement("div")

    successSec.className = "successful";
    const greet = document.createElement("img")
    greet.className = "greet";
    greet.src = "images/success.svg";
    const text = document.createElement("h4")
    text.className = "text";
    text.textContent = msg || "Success";
    const link = document.createElement("a")
    link.className = "redirect";
    link.textContent = btnText

    const sendAgain = document.createElement("p");
    sendAgain.className = "resend";
    const span = document.createElement("span");

    span.className = "resend-text";
    span.textContent = "Resend";


    // span.addEventListener("click", async (e) => {
    // e.preventDefault();

    // successSec.remove();

    // await recoverAccount();
// });

    sendAgain.textContent = `If u did'nt receive link.Resend Password Reset Link.`
    sendAgain.append(span)
    link.addEventListener("click", (e) => {
        e.preventDefault();

        successSec.remove();
        forgotFormSec.style.display = "flex"
        if (newTab) {
            window.open(a, "_blank");
        } else {
            window.location.href = a;
        }



    })
    if (reset === true) {
        successSec.append(greet, text, link, sendAgain)
    } else {
        successSec.append(greet, text, link);

    } return successSec;
}

function togglePassword(icons, inputs) {
    icons.forEach((icon, index) => {
        icon.addEventListener("click", () => {
            const input = inputs[index]
            // console.log(input.type)
            if (input.type === "password") {
                input.type = "text";
                icon.src = "/images/hide.svg";
                // console.log(input.type)
            } else {
                icon.src = "/images/show.svg";
                input.type = "password";
                // console.log(input.type)
            }
        })
    })
}

function inputFocus(fields) {
    fields.forEach((field) => {
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

Array.from(inputs).forEach(input => {
    input.style.color = "#007A55"
    input.style.outlineColor = "#007A55"
})


function toggleMode(txt,Email,Phone,authErr = true  ,pass = true) {
    if(authErr ) clearAuthErr(authSpan)
  
    if (mode === "email") {
        clearErr(emailInput)
        if(pass){ 
            clearErr(passInput)
            passInput.value = "";
        }
        mode = "phone";

        emailInput.value = "";
        
        Email.style.display = "none";
        Phone.style.display = "block"


        toggleBtn.innerText = txt;
    }
    else {
        clearErr(phoneInput)
        clearErr(userCountry)
        clearErr(passInput)
        mode = "email";
        phoneInput.value = "";
        passInput.value = "";
        Email.style.display = "block";
        Phone.style.display = "none"
        // clearErr(Phone)

        toggleBtn.innerText = txt;
    }

}