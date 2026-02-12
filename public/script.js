

const Firstname = document.getElementById("first")
const Lastname = document.getElementById("last")
const userCountry = document.getElementById("userCountry");
const Phone = document.getElementById("phone")
const Email = document.getElementById("email")
const Password = document.getElementById("password")
const Confirm = document.getElementById("confirm")
const formsSec = document.getElementById("formSec");
const errSpans = document.querySelectorAll(".errSpan");
const countryList = document.getElementById("countries");
const userFlag = document.getElementById("countryFlag")
const flagImg = document.getElementById("countryFlag");


(async function () {
    try {
        const API = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,idd,cca2")
        const apiData = await API.json()
        apiData.forEach(country => {
            const div = document.createElement("div");
            div.className = "country";
            div.dataset.iso = country.cca2
            div.dataset.name = country.name.common;
            div.dataset.dial = country.idd.root + (country.idd.suffixes?.[0] || "");
            div.dataset.flag = country.flags.svg;
            const countryflag = document.createElement("img")
            countryflag.className = "countryFlag";
            countryflag.src = country.flags.svg;
            const countryName = document.createElement("span")
            countryName.className = "countryName";
            countryName.textContent = country.name.common;
            countryName.dataset = country.name.common;
            const countryDial = document.createElement("span")
            countryDial.className = "countryDial";
            countryDial.textContent = country.idd.root + (country.idd.suffixes?.[0] || "");
            div.append(countryflag, countryName, countryDial)
            countryList.append(div)
            // console.log(country.idd)
        })
    } catch (error) {
        console.log("Err", error)
    }
})()


userCountry.addEventListener("click", (e) => {
    countryList.classList.replace("h-0", "h-[60vh]")
    countryList.classList.replace("-top-0", "-top-56")
    countryList.classList.remove("opacity-0")
})

window.addEventListener("click", (e) => {
    if (!countryList.contains(e.target) && !userCountry.contains(e.target)) {
        countryList.classList.replace("h-[60vh]", "h-0")
        countryList.classList.replace("-top-56", "-top-0")
        countryList.classList.add("opacity-0")
    }
})

let selectedCountry = {
    iso: null,
    dial: null,
    flag: null,
}

function showCountry(s, i, p, d) {
    if (!s || !i || !d || !p) return;
    userFlag.src = s
    userFlag.dataset.iso = i
    const local = p.value.replace(/^\+\d+\s*/, "");
    p.value = `${d} ${local}`;
}

countryList.addEventListener("click", (e) => {
    const item = e.target.closest(".country")
    if (!item) return;
    selectedCountry = {
        iso: item.dataset.iso,
        dial: item.dataset.dial,
        flag: item.dataset.flag,
    }
    showCountry(selectedCountry.flag, selectedCountry.iso, Phone, selectedCountry.dial);
    countryList.classList.replace("h-[60vh]", "h-0")
    countryList.classList.replace("-top-56", "-top-0")
    countryList.classList.add("opacity-0")
    clearErr(userCountry)
})

async function setDial() {
    try {
        const ip = await fetch('https://ipwho.is')
        const res = await ip.json();
        const country = res.country_code.trim();
        const countries = document.querySelector(".countries").querySelectorAll(".country");

        countries.forEach((mulk) => {
            if (mulk.dataset.iso.toUpperCase() === country) {
                const iso = mulk.dataset.iso;
                const flag = mulk.dataset.flag
                const dial = mulk.dataset.dial
                showCountry(flag, iso, Phone, dial)
            }
            return;
        })
    } catch (error) {
        
        console.log("Error ", error)
    }
}

document.addEventListener("DOMContentLoaded", () => {
    setDial();
})


const requiredFields = [Firstname, Lastname, userCountry, Phone, Email, Password, Confirm];

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

function validatefn() {
    if (Firstname.value.trim() === "") {
        showErr(Firstname, "This field is required");
        return false;
    }
    else {
        clearErr(Firstname);
        return true;
    }
}

function validateln() {
    if (Lastname.value.trim() === "") {
        showErr(Lastname, "This field is required");
        return false;
    }
    else {
        clearErr(Lastname);
        return true;
    }
}

function validatecode() {
    const flagImg = document.getElementById("countryFlag");
    console.log(flagImg);
    if (!flagImg.dataset.iso) {
        showErr(userCountry, "This field is required");
        return false;
    }
    else {
        clearErr(userCountry);
        return true;
    }
}
function validateNumber() {
    if (Phone.value.trim() === "") {
        showErr(Phone, "This field is required");
        return false;
    }
    if (Phone.value.length < 6) {
        showErr(Phone, "Phone Number must be 7 digits long");
        return false;
    }
    else {
        clearErr(Phone);
        return true;
    }
}

function validateEmail() {
    const email = Email.value.trim()
    if (email === "") {
        showErr(Email, "This field is required");
        return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showErr(Email, "Invalid email.Please enter a valid email address");
        return false;
    }
    else {
        clearErr(Email);
        return true;
    }
}
function validatePassword() {
    const password = Password.value.trim()
    if (password === "") {
        showErr(Password, "This field is required");
        return false;
    }
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
    if (!passRegex.test(password)) {
        showErr(Password, "Password must contain a lowecase letter , an uppercase letter, a number, a symbol and must be 8 characters long");
        return false;
    }
    else {
        clearErr(Password);
        return true;
    }
}
function validateConfirm() {
    const confirm = Confirm.value.trim()
    const password = Password.value.trim()
    if (confirm === "") {
        showErr(Confirm, "This field is required");
        return false;
    }
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
    if (!passRegex.test(confirm)) {
        showErr(Confirm, "Password must contain a lowecase letter , an uppercase letter, a number, a symbol and must be 8 characters long");
        return false;
    }
    if (password !== confirm) {
        showErr(Confirm, "Passwords do not match");
        return false
    }
    else {
        clearErr(Confirm);
        return true;
    }
}


function successMs(msg) {
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

const serverErrors = {};

const validationArr = [validatefn, validateln, validatecode, validateNumber, validateEmail, validatePassword, validateConfirm];
function Validate() {

    return validationArr.map(field => field()).every(Boolean);
}
requiredFields.forEach((field, index) => {

    field.addEventListener("input", () => {
        clearErr(field);
        // if (serverErrors && serverErrors[field.name]) {
        //     delete serverErrors[field.name];
        // };
        validationArr[index]();
    })
})

const phoneDiv = document.getElementById("fullNumber");

phoneDiv.addEventListener("focusin", () => {
    if (phoneDiv) phoneDiv.classList.add("outline");
})

phoneDiv.addEventListener("focusout", () => {
    if (phoneDiv) phoneDiv.classList.remove("outline");
})


let submit = document.getElementById("submit");

async function formApi() {
    const signupform = document.getElementById("signup");
    signupform.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!Validate()) {
            return
        }
        const formdata = {
            firstname: signupform.first.value,
            lastname: signupform.last.value,
            number: signupform.phone.value,
            email: signupform.email.value,
            password: signupform.password.value
        }
        try {
            const res = await fetch("/signup",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formdata),
                }
            )
            const data = await res.json();
            console.log(data)



            if (data.success === false) {
                const obj = data.fields;
                Object.assign(serverErrors, obj);

                for (const key in obj) {
                    const element = obj[key];

                    // Map server field keys to input elements
                    const inputMap = {
                        phoneNumber: Phone,
                        email: Email
                    };

                    const input = inputMap[key];
                    if (input) {
                        showErr(input, element);
                    }
                }
                return;
            }
            const message = data.message;
            console.log(message);
            formsSec.style.display = "none";
            formsSec.parentElement.append(successMs(message))
        } catch (error) {
            console.error("Error", error)
        }

    })

}

formApi()

