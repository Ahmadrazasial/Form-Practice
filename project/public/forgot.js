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
const otpSec = document.querySelector("#otpFormSec");
const otpForm = document.getElementById("otpForm")
const otpInput = document.querySelector("#otp");

const otpSubmit = otpSec?.querySelector("#otpSubmit");
console.log(otpSec, otpInput, otpSubmit)

let mode = "email";
toggleBtn?.addEventListener("click", () => {
    const txt = mode === "email" ? "Send Code via Email" : "Send Code via Phone SMS";
    toggleMode(txt, forgotEmail, forgotPhone, authErr = false, passInput = false);
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
function otpVal() {
    const otpValue = otpInput.value.trim()
    if (otpValue === "") {
        showErr(otpInput, "This field is required");
        return false;
    }
    if (otpValue.length < 6 || otpValue.length > 6) {
        showErr(otpInput, "OTP must be 6 digits long");
        return false;
    }
    else {
        clearErr(otpInput);
        return true
    }
}
let formData = {}
function emailValidation() {
    if (!lgemailVal()) {
        return false
    }
    formData.email = emailInput.value.trim();

    return formData

}
function phoneValidation() {
    const phonerequired = [lgcodeVal, lgphoneVal]
    const isValid = phonerequired.map(field => field()).every(Boolean);
    if (!isValid) {
        return false
    }
    formData.phone = phoneInput.value.trim();
    return formData
}
const requiredFields = [emailInput, userCountry, phoneInput, otpInput];
const validationArr = [lgemailVal, lgcodeVal, lgphoneVal, otpVal];

inputClear(requiredFields, validationArr);


async function emailRecoverAccount() {
    if (!emailValidation()) {
        return false
    }
    try {
        showLoader()

        const res = await fetch("/api/auth/forgot/email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(emailValidation()),
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
async function phoneRecoverAccount() {
    if (!phoneValidation()) {
        return false
    }
    try {
        showLoader()

        const res = await fetch("/api/auth/forgot/phone", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(phoneValidation()),
        })
        const data = await res.json();
        console.log(data)
        const msg = data.message
        const back = "/forgot-password.html"
        // if(data.fields){
        //     // showErr(otpInput,data.fields.otp)
        //     console.log(data.fields.otp)
        // }

        if (data.success === true) {
            forgotFormSec.style.display = "none"
            otpSec.style.display = "block"
            document.getElementById("otpMessage").textContent = msg;
        } else {
            showErr(phoneInput, data.message)
        }
        if (data.fields.success === false) {
            showErr(phoneInput, data.fields.message)
        }

    } catch (error) {
        console.log("Error ", error)
    } finally {
        hideLoader()
    }

}
async function verifyOtp() {
    // if(!otpVal()){
    //     return false
    // }
    try {
        showLoader()
        const res = await fetch("/api/auth/forgot/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone: formData.phone, otp: otpInput.value.trim() })

        });
        console.log(formData.phone, otpInput.value)
        const data = await res.json();
        console.log(data)
        
        if (data.success === true) {
            
            const msg = data.message;
            const resetPage = `reset-password/${data.token}`;
            console.log(resetPage)
            otpSec.style.display = "none";
            otpSec.parentElement.append(successMs(msg, otpSec, resetPage, "Reset Password", true, false))
            ;
            
        }else {
            showErr(otpInput, data.message)
            
        }
        if (data.validArr?.success === false) {
            console.log(data.validArr.otp)
            const msg = data.validArr.otp
            showErr(otpInput, msg)
            
        }
        
         
    } catch (error) {
        console.log("Error ", error)
    } finally {
        hideLoader()
    }
}
otpForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    verifyOtp();
})
forgotForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (forgotEmail.classList.contains("block") && mode === "email") {
        emailRecoverAccount()
    } else {
        phoneRecoverAccount()
    }
})

document.addEventListener("click", (e) => {
    if (e.target.matches(".resend-text")) {
        e.preventDefault();
        console.log("clicked");
        if (mode === "email") {
            emailRecoverAccount()
        } else {
            phoneRecoverAccount()
        }
    }
});






async function sendCode() {
    const url = 'https://messagebird-sms-gateway.p.rapidapi.com/sms';
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': 'd347ea0275mshde6afdce1672f1ep100f13jsnf46b51bb675e',
            'x-rapidapi-host': 'messagebird-sms-gateway.p.rapidapi.com',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            sender: 'MessageBird',
            body: new URLSearchParams('Your verification code is 123456.'),
            destination: '31600000001,31600000002',
            reference: '268431687',
            timestamp: '201308020025',
            replacechars: 'checked',
            type: 'normal',
            udh: undefined,
            test: undefined,
            dlr_url: 'http://www.example.com/dlr-messagebird.php'
        })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}
sendCode()