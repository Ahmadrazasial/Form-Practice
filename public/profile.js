
async function loadProfile() {

    // const token = localStorage.getItem("token")
     try {
        const res = await fetch("/profile",{
            method:"GET",
            credentials: "include"
            
        })
        const data = await res.json();
        // console.log(data.user)

        if(data.success === false){
            // localStorage.removeItem("token");
          window.location.href = "/login.html"
          return;
        }

        console.log(data.user.firstname)
        document.getElementById("container").append(`My name is ${data.user.firstname}`)

    } catch (error) {
        console.log("error",error)
    }
}

loadProfile()