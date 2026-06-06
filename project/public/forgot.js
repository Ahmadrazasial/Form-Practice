console.log("connected")
const forgotFormSec = document.getElementById("forgotformSec")
const forgotForm = document.getElementById("forgot");
const forgotEmail = forgotForm?.querySelector("#forgotemailSec");
const emailInput = forgotEmail.querySelector("#email")
// const countryList = document.getElementById("countries");
// const userCountry = document.getElementById("userCountry");
// const userFlag = document.getElementById("countryFlag")
// const Phone = document.getElementById("phone")
// const forgotPhone = forgotForm?.querySelector("#forgotnumberSec")
// const phoneInput = forgotPhone.querySelector("#phone");
// const toggleBtn = forgotForm?.querySelector("#toggleBtn")

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
// function lgcodeVal() {

//     if (!userFlag.dataset.iso) {
//         showErr(userCountry, "This field is required");
//         return false;
//     }
//     else {
//         clearErr(userCountry);
//         return true
//     }
// }
// function lgphoneVal() {
//     const phone = phoneInput.value.trim()
//     if (phone === "") {
//         showErr(phoneInput, "This field is required");
//         return false;
//     }
//     if (phone.length < 11) {
//         showErr(phoneInput, "Phone Number must be 11 digits long");
//         return false;
//     }
//     else {
//         clearErr(phoneInput);
//         return true
//     }
// }

// function loginValidation() {

//     let data = { }
//     if (mode === "email") {

//         if (!lgemailVal()) {
//             return false
//         }
//         data.email = emailInput.value.trim();
//     } else {



//         lgcodeVal()
//         lgphoneVal()
//         data.phone = phoneInput.value
//     }
//     return data

// }

const requiredFields = [emailInput];
const validationArr = [lgemailVal];

inputClear(requiredFields, validationArr);


async function recoverAccount() {

    forgotForm?.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!lgemailVal()) {
            return false;
        }
        try {
        let formdata = {};
        let email = emailInput.value.trim();
        formdata.email = email
        const res = await fetch("/api/auth/forgot", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formdata)
        })
        const data = await res.json(); 
        console.log(data)
    } catch (error) {
        console.log("Error ", error)
    }
    })
    

}
recoverAccount()