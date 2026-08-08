console.log("connected")
const forgotFormSec = document.getElementById("forgotFormSec")
const forgotForm = document.getElementById("forgot");
const forgotEmail = forgotForm?.querySelector("#forgotemailSec");
const emailInput = forgotEmail.querySelector("#email")
const countryList = document.getElementById("countries");
const userCountry = document.getElementById("userCountry");
const userFlag = document.getElementById("countryFlag")
const Phone = document.getElementById("phone")
const forgotPhone = forgotForm?.querySelector("#forgotnumberSec")
const phoneInput = forgotPhone.querySelector("#phone");
const toggleBtn = forgotForm?.querySelector("#toggleBtn")

 let mode = "email";
toggleBtn?.addEventListener("click", () => {
  const txt = mode === "email" ? "Send Code via Email" : "Send Code via Phone SMS";
    toggleMode( txt,forgotEmail,forgotPhone,authErr = false ,passInput = false);
})
function lgemailVal() {
    const email = emailInput.value.trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
        showErr(emailInput, "This field is required");
        return false;
    }
    if (!emailRegex.test(email)) {
        showErr(emailInput, "Invalid email.Please enter a valid email address");
        return false;
    }
    else {
        clearErr(emailInput);
        return true
    }
}
function lgcodeVal() {

    if (!userFlag.dataset.iso) {
        showErr(userCountry, "This field is required");
        return false;
    }
    else {
        clearErr(userCountry);
        return true
    }
}
function lgphoneVal() {
    const phone = phoneInput.value.trim()
    if (phone === "") {
        showErr(phoneInput, "This field is required");
        return false;
    }
    if (phone.length < 11) {
        showErr(phoneInput, "Phone Number must be 11 digits long");
        return false;
    }
    else {
        clearErr(phoneInput);
        return true
    }
}

function loginValidation() {

    let formData = { }
    if (mode === "email") {

        if (!lgemailVal()) {
            return false
        }
        formData.email = emailInput.value.trim();
    } else {
        if (!lgcodeVal() && !lgphoneVal()) {
            return false
        }
        lgcodeVal()
        lgphoneVal()
        formData.phone = phoneInput.value.trim();
        console.log(formData)
    }
    return formData

}

const requiredFields = [emailInput,userCountry,phoneInput];
const validationArr = [lgemailVal, lgcodeVal, lgphoneVal];

inputClear(requiredFields, validationArr);


async function recoverAccount() {


if (!loginValidation()) {
        return false
    }
    try {
        showLoader()
     
        const res = await fetch("/api/auth/forgot", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginValidation()),
        })
        const data = await res.json();
        console.log(data)
        const msg = data.message
        const back = "/forgot-password.html"
        const mail = 'https://google.com'
        forgotFormSec.style.display = "none"


        if (data.success === false) {
            document.querySelector(".successful")?.remove();
            forgotFormSec.parentElement.append(successMs(msg, forgotFormSec, back, "Go Back", false, true))
        } else {
            document.querySelector(".successful")?.remove();
            forgotFormSec.parentElement.append(successMs(msg, forgotFormSec, mail, "Open Mail", true, true))
        }
        if (data.fields.success === false) {
            document.querySelector(".successful")?.remove();
            forgotFormSec.parentElement.append(successMs(data.fields.message, forgotFormSec, back, "Go Back", false, false))
        }
    } catch (error) {
        console.log("Error ", error)
    } finally {
        hideLoader()
    }

}
forgotForm?.addEventListener("submit", async (e) => {
    e.preventDefault()
    recoverAccount()
})
document.addEventListener("click", (e) => {
    if (e.target.matches(".resend-text")) {
        e.preventDefault();
        console.log("clicked");
        recoverAccount();
    }
});
