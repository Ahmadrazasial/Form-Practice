const countryPhoneCodes = [
    { name: "Afghanistan", dial_code: "+93" },
    { name: "Albania", dial_code: "+355" },
    { name: "Algeria", dial_code: "+213" },
    { name: "American Samoa", dial_code: "+1-684" },
    { name: "Andorra", dial_code: "+376" },
    { name: "Angola", dial_code: "+244" },
    { name: "Anguilla", dial_code: "+1-264" },
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
    { name: "Ethiopia", dial_code: "+251" },
    { name: "Fiji", dial_code: "+679" },
    { name: "Finland", dial_code: "+358" },
    { name: "France", dial_code: "+33" },
    { name: "French Polynesia", dial_code: "+689" },
    { name: "Gabon", dial_code: "+241" },
    { name: "Gambia", dial_code: "+220" },
    { name: "Georgia", dial_code: "+995" },
    { name: "Germany", dial_code: "+49" },
    { name: "Ghana", dial_code: "+233" },
    { name: "Greece", dial_code: "+30" },
    { name: "Greenland", dial_code: "+299" },
    { name: "Grenada", dial_code: "+1-473" },
    { name: "Guatemala", dial_code: "+502" },
    // ...and so on for all countries cut for brevity
];

const countrycode = document.getElementById("code");

countryPhoneCodes.forEach(code => {
    const option = document.createElement("option")
    option.value = code.dial_code;
    option.textContent = `${code.name} ${code.dial_code}`;
    countrycode.append(option)
})

let submit = document.getElementById("submit");

async function formApi() {
    const signupform = document.getElementById("signup");
    signupform.addEventListener("submit", async (e) => {
        e.preventDefault()
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
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify(formdata),
                }
            )
            const data = await res.json();
            console.log(data)
            alert(data);

        } catch (error) {
            console.error("Error",error)
        }
    })
}



// submit.addEventListener("click", () => {
//     console.log(document.getElementById("signup").first.value)
//     formApi();
// })
formApi()

