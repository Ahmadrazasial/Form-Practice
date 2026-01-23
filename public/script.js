const countryPhoneCodes = [
    { name: "Afghanistan", dial_code: "+93" },
    { name: "Albania", dial_code: "+355" },
    { name: "Algeria", dial_code: "+213" },
    { name: "American Samoa", dial_code: "+1-684" },
    { name: "Andorra", dial_code: "+376" },
    { name: "Angola", dial_code: "+244" },
    { name: "Anguilla", dial_code: "+1-264" },
    { name: "Antarctica", dial_code: "+672" },
    { name: "Antigua and Barbuda", dial_code: "+1-268" },
    { name: "Argentina", dial_code: "+54" },
    { name: "Armenia", dial_code: "+374" },
    { name: "Aruba", dial_code: "+297" },
    { name: "Australia", dial_code: "+61" },
    { name: "Austria", dial_code: "+43" },
    { name: "Azerbaijan", dial_code: "+994" },
    { name: "Bahamas", dial_code: "+1-242" },
    { name: "Bahrain", dial_code: "+973" },
    { name: "Bangladesh", dial_code: "+880" },
    { name: "Barbados", dial_code: "+1-246" },
    { name: "Belarus", dial_code: "+375" },
    { name: "Belgium", dial_code: "+32" },
    { name: "Belize", dial_code: "+501" },
    { name: "Benin", dial_code: "+229" },
    { name: "Bermuda", dial_code: "+1-441" },
    { name: "Bhutan", dial_code: "+975" },
    { name: "Bolivia", dial_code: "+591" },
    { name: "Bosnia and Herzegovina", dial_code: "+387" },
    { name: "Botswana", dial_code: "+267" },
    { name: "Brazil", dial_code: "+55" },
    { name: "British Virgin Islands", dial_code: "+1-284" },
    { name: "Brunei", dial_code: "+673" },
    { name: "Bulgaria", dial_code: "+359" },
    { name: "Burkina Faso", dial_code: "+226" },
    { name: "Burundi", dial_code: "+257" },
    { name: "Cambodia", dial_code: "+855" },
    { name: "Cameroon", dial_code: "+237" },
    { name: "Canada", dial_code: "+1" },
    { name: "Cape Verde", dial_code: "+238" },
    { name: "Cayman Islands", dial_code: "+1-345" },
    { name: "Central African Republic", dial_code: "+236" },
    { name: "Chad", dial_code: "+235" },
    { name: "Chile", dial_code: "+56" },
    { name: "China", dial_code: "+86" },
    { name: "Colombia", dial_code: "+57" },
    { name: "Comoros", dial_code: "+269" },
    { name: "Congo (Brazzaville)", dial_code: "+242" },
    { name: "Congo (Kinshasa)", dial_code: "+243" },
    { name: "Costa Rica", dial_code: "+506" },
    { name: "Croatia", dial_code: "+385" },
    { name: "Cuba", dial_code: "+53" },
    { name: "Cyprus", dial_code: "+357" },
    { name: "Czech Republic", dial_code: "+420" },
    { name: "Denmark", dial_code: "+45" },
    { name: "Djibouti", dial_code: "+253" },
    { name: "Dominica", dial_code: "+1-767" },
    { name: "Dominican Republic", dial_code: "+1-809" },
    { name: "Ecuador", dial_code: "+593" },
    { name: "Egypt", dial_code: "+20" },
    { name: "El Salvador", dial_code: "+503" },
    { name: "Equatorial Guinea", dial_code: "+240" },
    { name: "Eritrea", dial_code: "+291" },
    { name: "Estonia", dial_code: "+372" },
    { name: "Eswatini", dial_code: "+268" },
    { name: "Ethiopia", dial_code: "+251" },
    { name: "Fiji", dial_code: "+679" },
    { name: "Finland", dial_code: "+358" },
    { name: "France", dial_code: "+33" },
    { name: "Gabon", dial_code: "+241" },
    { name: "Gambia", dial_code: "+220" },
    { name: "Georgia", dial_code: "+995" },
    { name: "Germany", dial_code: "+49" },
    { name: "Ghana", dial_code: "+233" },
    { name: "Greece", dial_code: "+30" },
    { name: "Greenland", dial_code: "+299" },
    { name: "Grenada", dial_code: "+1-473" },
    { name: "Guatemala", dial_code: "+502" },
    { name: "Guinea", dial_code: "+224" },
    { name: "Guyana", dial_code: "+592" },
    { name: "Haiti", dial_code: "+509" },
    { name: "Honduras", dial_code: "+504" },
    { name: "Hong Kong", dial_code: "+852" },
    { name: "Hungary", dial_code: "+36" },
    { name: "Iceland", dial_code: "+354" },
    { name: "India", dial_code: "+91" },
    { name: "Indonesia", dial_code: "+62" },
    { name: "Iran", dial_code: "+98" },
    { name: "Iraq", dial_code: "+964" },
    { name: "Ireland", dial_code: "+353" },
    { name: "Israel", dial_code: "+972" },
    { name: "Italy", dial_code: "+39" },
    { name: "Jamaica", dial_code: "+1-876" },
    { name: "Japan", dial_code: "+81" },
    { name: "Jordan", dial_code: "+962" },
    { name: "Kazakhstan", dial_code: "+7" },
    { name: "Kenya", dial_code: "+254" },
    { name: "Kuwait", dial_code: "+965" },
    { name: "Kyrgyzstan", dial_code: "+996" },
    { name: "Laos", dial_code: "+856" },
    { name: "Latvia", dial_code: "+371" },
    { name: "Lebanon", dial_code: "+961" },
    { name: "Lesotho", dial_code: "+266" },
    { name: "Liberia", dial_code: "+231" },
    { name: "Libya", dial_code: "+218" },
    { name: "Lithuania", dial_code: "+370" },
    { name: "Luxembourg", dial_code: "+352" },
    { name: "Malaysia", dial_code: "+60" },
    { name: "Maldives", dial_code: "+960" },
    { name: "Mexico", dial_code: "+52" },
    { name: "Mongolia", dial_code: "+976" },
    { name: "Morocco", dial_code: "+212" },
    { name: "Nepal", dial_code: "+977" },
    { name: "Netherlands", dial_code: "+31" },
    { name: "New Zealand", dial_code: "+64" },
    { name: "Nigeria", dial_code: "+234" },
    { name: "North Korea", dial_code: "+850" },
    { name: "Norway", dial_code: "+47" },
    { name: "Oman", dial_code: "+968" },
    { name: "Pakistan", dial_code: "+92" },
    { name: "Philippines", dial_code: "+63" },
    { name: "Poland", dial_code: "+48" },
    { name: "Portugal", dial_code: "+351" },
    { name: "Qatar", dial_code: "+974" },
    { name: "Romania", dial_code: "+40" },
    { name: "Russia", dial_code: "+7" },
    { name: "Saudi Arabia", dial_code: "+966" },
    { name: "Singapore", dial_code: "+65" },
    { name: "South Africa", dial_code: "+27" },
    { name: "South Korea", dial_code: "+82" },
    { name: "Spain", dial_code: "+34" },
    { name: "Sri Lanka", dial_code: "+94" },
    { name: "Sweden", dial_code: "+46" },
    { name: "Switzerland", dial_code: "+41" },
    { name: "Thailand", dial_code: "+66" },
    { name: "Turkey", dial_code: "+90" },
    { name: "UAE", dial_code: "+971" },
    { name: "United Kingdom", dial_code: "+44" },
    { name: "United States", dial_code: "+1" },
    { name: "Vietnam", dial_code: "+84" },
    { name: "Yemen", dial_code: "+967" },
    { name: "Zambia", dial_code: "+260" },
    { name: "Zimbabwe", dial_code: "+263" }
];

const Firstname = document.getElementById("first")
const Lastname = document.getElementById("last")
const Countrycode = document.getElementById("code");
const Phone = document.getElementById("phone")
const Email = document.getElementById("email")
const Password = document.getElementById("password")
const Confirm = document.getElementById("confirm")
const formsSec = document.getElementById("formSec");
const errSpans = document.querySelectorAll(".errSpan");
const codeField = document.querySelector(".wraper")



countryPhoneCodes.forEach(code => {
    const option = document.createElement("option")
    option.classList.add("option")
    option.value = code.dial_code;
    option.textContent = `${code.name} ${code.dial_code}`;
    Countrycode.append(option)
})



const codeDisplay = document.getElementById("codeDisplay");

Countrycode.addEventListener("change", () => {
    // const selected = Countrycode.selectedOptions[0];  
    const selected = Countrycode.querySelector('option:checked');
    if (selected) {
        codeDisplay.textContent = selected.value + " ↓"
        Countrycode.blur()
    }
})
Countrycode.addEventListener("focus", () => {
    Countrycode.value = "";
})
Countrycode.addEventListener("keydown", () => {
    codeDisplay.textContent = "";
})
// const options = Countrycode.options
// console.log(options)

// Array.from(options).forEach((option) => {
//     option.addEventListener("", () => {
//         codeDisplay.textContent = ""
//     })
// })

const requiredFields = [Firstname, Lastname, Countrycode, Phone, Email, Password, Confirm];

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
    if (Countrycode.value.trim() === "") {
        showErr(Countrycode, "This field is required");
        return false;
    }
    else {
        clearErr(Countrycode);
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
    text.textContent = msg
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

    //     const phoneDiv = field.closest("#fullNumber") || field.parentElement
    //  field.addEventListener("focus", (e) => {
    //         if (phoneDiv) phoneDiv.classList.add("outline");
    //     })

    //     field.addEventListener("focusout", (e) => {
    //         if (phoneDiv) phoneDiv.classList.remove("outline");
    //     })  

    field.addEventListener("input", () => {
        clearErr(field);

        if (serverErrors && serverErrors[field.name]) {
            delete serverErrors[field.name];
        };
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
            cCode: signupform.code.value,
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

