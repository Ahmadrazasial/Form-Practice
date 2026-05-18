
async function loadProfile() {

    const token = localStorage.getItem("token")
    try {
        const res = await fetch("/profile",{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${token}`
            }
            
        })
        const data = await res.json();

        if(data.success === false){
            localStorage.removeItem("token");
          window.location.href = "/login.html"
          return;
        }

        console.log(data.user)
        document.getElementById("#container").append(`My name is ${data.user.fullname}`)

    } catch (error) {
        console.log("error",error)
    }
}

loadProfile()