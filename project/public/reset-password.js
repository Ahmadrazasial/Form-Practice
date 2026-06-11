
console.log("Working");
const resetForm = document.getElementById("reset")
const passInput = document.getElementById("password")
const cnfmInput = document.getElementById("confirm");



async function passUpdate() {
    resetForm.addEventListener("submit", async (e) =>{
        e.preventDefault();
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
        } catch (error) {
            console.log(error)
        }
    })
}
passUpdate()

// showErr(passInput,"strong")