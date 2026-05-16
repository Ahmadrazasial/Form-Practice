
const lgFormSec = document.getElementById("lgformSec")
const loginForm = document.getElementById("login");
const countryList = document.getElementById("countries");
const userCountry = document.getElementById("userCountry");
const userFlag = document.getElementById("countryFlag")
const Phone = document.getElementById("phone")
const lgEmail = loginForm.querySelector("#lgemailSec");
const emailInput = lgEmail.querySelector("#email")
const lgPhone = loginForm.querySelector("#lgnumberSec")
const phoneInput = lgPhone.querySelector("#phone")
const lgPassword = loginForm.querySelector("#lgpasswordSec")
const passInput = lgPassword.querySelector("#password")
const toggleBtn = loginForm.querySelector("#toggleBtn")
const authSpan = loginForm.querySelector("#authError")
// console.log(loginForm)

let mode = "email"
function toggleMode() {
clearAuthErr(authSpan)

    if (mode === "email") {
        clearErr(emailInput)
        clearErr(passInput)
        mode = "phone";

        emailInput.value = "";
        passInput.value = "";
        lgEmail.style.display = "none";
        lgPhone.style.display = "block"


        toggleBtn.innerText = "Login with email instead";
    }
    else {
        clearErr(phoneInput)
        clearErr(userCountry)
        clearErr(passInput)
        mode = "email";
        phoneInput.value = "";
        passInput.value = "";
        lgEmail.style.display = "block";
        lgPhone.style.display = "none"
        // clearErr(Phone)

        toggleBtn.innerText = "Login with phone instead";
    }

}

function lgPasswordVal() {
    const password = passInput.value.trim()
    if (password === "") {
        showErr(passInput, "This field is required");
        return false;
    } else {
        clearErr(passInput);
        return true
    }
}

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


const requiredFields = [emailInput, userCountry, phoneInput, passInput];
const validationArr = [lgemailVal, lgcodeVal, lgphoneVal, lgPasswordVal];

inputClear(requiredFields, validationArr);

function loginValidation() {


    lgPasswordVal()
    const password = passInput.value.trim();
    let data = { password }
    if (mode === "email") {

        if (!lgemailVal()) {
            return false
        }
        data.email = emailInput.value.trim();
    } else {



        lgcodeVal()
        lgphoneVal()
        data.phone = phoneInput.value
    }
    return data

}

function showAuthErr(span,message) {
    span.style.display = "block";
    span.textContent = message;
}
function clearAuthErr(span) {
    span.style.display = "none";
    span.textContent = "";
}
async function loginApi() {
    // let loginForm = document.getElementById("login");
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            clearAuthErr(authSpan)
            const formdata = loginValidation();
            if (!formdata.password || (!formdata.email && !formdata.phone)) return
            // console.log(formdata);
            // const formdata = {
            //     email: emailInput.value.trim(),
            //     password: passInput.value.trim()
            // }
            console.log(formdata)
            try {
                const res = await fetch("/login",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formdata)
                    })
                const dataRet = await res.json();
                // console.log(dataRet)

                if (dataRet.success === false) {
                    const obj = dataRet.errFields

                    for (const key in obj) {

                        const element = obj[key];

                        // console.log(element)

                       showAuthErr(authSpan,element)
                    }
                }else{
                    loginForm.reset()
                    userFlag.src = ""
                    userFlag.dataset.iso = ""
                    const msg = dataRet.message;
                    lgFormSec.style.display = "none";
                    lgFormSec.parentElement.append(successMs(msg,lgFormSec))
                }

            } catch (error) {
                console.log("Error", error)
            }
        })

    }
}

loginApi()
console.log("connected")