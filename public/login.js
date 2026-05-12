const loginForm = document.getElementById("login");

const lgEmail = loginForm.querySelector("#lgemailSec");
const emailInput = lgEmail.querySelector("#email")
const lgPhone = loginForm.querySelector("#lgnumberSec")
const phoneInput = lgPhone.querySelector("#phone")
const lgPassword = loginForm.querySelector("#lgpasswordSec")
const passInput = lgPassword.querySelector("#password")
const toggleBtn = loginForm.querySelector("#toggleBtn")
console.log(loginForm)

let mode = "email"
function toggleMode() {


    if (mode === "email") {
        // clearErr(Phone)
        mode = "phone";
        lgEmail.style.display = "none";
        lgPhone.style.display = "block"

        emailInput.value = "";
        toggleBtn.innerText = "Login with email instead";
    }
    else {
        mode = "email";
        lgEmail.style.display = "block";
        lgPhone.style.display = "none"
        // clearErr(Phone)
        phoneInput.value = "";
        toggleBtn.innerText = "Login with phone instead";
    }

}

function lgPasswordVal(password) {

    if (password === "") {
        showErr(passInput, "This field is required");
        return false;
    } else {
        clearErr(passInput);
        return true
    }
}

function lgemailVal(email) {
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
function lgphoneVal(phone, img) {
    if (!img.dataset.iso) {
        showErr(userCountry, "This field is required");
        return false;
    }
    else {
        clearErr(userCountry);

    }
    if (phone === "") {
        showErr(phoneInput, "This field is required");
        return false;
    }
    if (phone.length < 6) {
        showErr(phoneInput, "Phone Number must be 7 digits long");
        return false;
    }
    else {
        clearErr(phoneInput);

    }
}

function loginValidation() {
    const password = passInput.value.trim()

    lgPasswordVal(password)

    let data = { password }
    if (mode === "email") {
        const email = emailInput.value.trim()
       if(!lgemailVal(email)) {
        return false
       }
        data.email = email;
    } else {
        const flagImg = document.getElementById("countryFlag");
        console.log(flagImg);

        const phone = phoneInput.value.trim()
        lgphoneVal(phone, flagImg)
        data.phone = phone
    }
    return data

}

async function loginApi() {
    // let loginForm = document.getElementById("login");
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const formdata = loginValidation();
            if (!formdata) {
                return
            }
            console.log(formdata);
            // const formdata = {
            //     email: loginForm.lgEmail.value,
            //     password: loginForm.lgPassword.value
            // }
            // console.log(formdata)
            try {
                const res = await fetch("/login",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formdata)
                    })
                const data = await res.json();
                console.log(data)


            } catch (error) {

            }
        })

    }
}

loginApi()
console.log("connected")