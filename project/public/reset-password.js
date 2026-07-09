console.log("Working");
const resetForm = document.getElementById("reset")
const passInput = document.getElementById("password")
const cnfmInput = document.getElementById("confirm");



function validatePassword() {
    const password = passInput.value.trim()
    if (password === "") {
        showErr(passInput, "This field is required");
        return false;
    }
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
    if (!passRegex.test(password)) {
        showErr(passInput, "Password must contain a lowecase letter , an uppercase letter, a number, a symbol and must be 8 characters long");
        return false;
    }
    else {
        clearErr(passInput);
        return true;
    }
}
function validateConfirm() {
    const confirm = cnfmInput.value.trim()
    const password = passInput.value.trim()
    if (confirm === "") {
        showErr(cnfmInput, "This field is required");
        return false;
    }
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
    if (!passRegex.test(confirm)) {
        showErr(cnfmInput, "Password must contain a lowecase letter , an uppercase letter, a number, a symbol and must be 8 characters long");
        return false;
    }
    if (password !== confirm) {
        showErr(cnfmInput, "Passwords do not match");
        return false
    }
    else {
        clearErr(cnfmInput);
        return true;
    }
}



const requiredFields = [passInput, cnfmInput];
const validationArr = [validatePassword, validateConfirm];


inputClear(requiredFields, validationArr);

function Validate() {
    return validationArr.map(field => field()).every(Boolean);
}

async function passUpdate() {
    resetForm.addEventListener("submit", async (e) =>{
        e.preventDefault();
        if(!Validate()){
            return ;
        }
        const token = window.location.pathname.split("/").pop();
        const password = passInput.value
        try {
            const res = await fetch(`/api/auth/reset-password/${token}`,{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({password})
            })
            const data = await res.json();
            console.log(data)
            if(data.fields){
                showErr(passInput,data.fields.password)
            }
            if(data.success === false){
                showErr(passInput,data.message)
            }
        } catch (error) {
            console.log(error)
        }
    })
}
passUpdate()

