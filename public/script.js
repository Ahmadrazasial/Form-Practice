// import { Console } from "winston/lib/winston/transports";

const Firstname = document.getElementById("first")
const Lastname = document.getElementById("last")
const userCountry = document.getElementById("userCountry");
const Phone = document.getElementById("phone")
const Email = document.getElementById("email")
const Password = document.getElementById("password")
const Confirm = document.getElementById("confirm")
const spformsSec = document.getElementById("spformSec");
const spForm = document.getElementById("signup");
const errSpans = document.querySelectorAll(".errSpan");
const countryList = document.getElementById("countries");
const userFlag = document.getElementById("countryFlag")

// console.log(Email)




const requiredFields = [Firstname, Lastname, userCountry, Phone, Email, Password, Confirm];



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
    if (Phone.value.trim().length < 11) {
        showErr(Phone, "Phone Number must be 11 digits long");
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




const serverErrors = {};

const validationArr = [validatefn, validateln, validatecode, validateNumber, validateEmail, validatePassword, validateConfirm];
function Validate() {
    return validationArr.map(field => field()).every(Boolean);
}

inputClear(requiredFields, validationArr);


async function signupApi() {
    const signupform = document.getElementById("signup");
    if (signupform) {
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
                // if (!data.success) { return }


                if (data.success === false){
                    const obj = data.fields;
                    // Object.assign(serverErrors, obj);

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
                if(data.success === true){
                    // requiredFields.forEach(field=>{
                    //     field.value = ""
                    // })
                    spForm.reset()
                    userFlag.src = ""
                    userFlag.dataset.iso = ""
                    const message = data.message;
                    console.log(message);
                    spformsSec.style.display = "none";
                    spformsSec.parentElement.append(successMs(message,spformsSec))
                }

            } catch (error) {
                console.error("Error", error)
            }

        })
    }
}

signupApi()


