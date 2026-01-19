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

const errSpans = document.querySelectorAll(".errSpan");


countryPhoneCodes.forEach(code => {
    const option = document.createElement("option")
    option.classList.add("option")
    option.value = code.dial_code;
    option.textContent = `${code.name} ${code.dial_code}`;
    Countrycode.append(option)
})

const requiredFields = [Firstname, Lastname, Countrycode, Phone, Email, Password, Confirm];
async function Validate() {

    requiredFields.forEach((field, index) => {

        if (field.value.trim() === "") {
            errSpans[index].style.display = "block";
            errSpans[index].textContent = "This field is required";
        }else{
            errSpans[index].textContent = "";
        }
    });

    console.log(Countrycode)
    // if (p.length < 8) {
    //     fields.phoneNumber = "The Phone Number must be 8 characters long"
    // }
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //     fields.email = "Invalid email.Please enter a valid email address"
    // }

    // const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;

    // if(!passRegex.test(password)){
    //     fields.password = "Password must contain a lowercase letter , an uppercase letter , a digit and a special character and should be 8 characters long";
    // }
}
// Validate();

let submit = document.getElementById("submit");

async function formApi() {
    const signupform = document.getElementById("signup");
    signupform.addEventListener("submit", async (e) => {
        e.preventDefault()
        Validate();
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
            // console.log(formdata.cCode)
            // alert(data);

        } catch (error) {
            console.error("Error", error)
        }
    })
}



// submit.addEventListener("click", () => {
//     console.log(document.getElementById("signup").first.value)
//     formApi();
// })
formApi()

