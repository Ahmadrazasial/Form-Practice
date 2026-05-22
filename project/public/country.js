
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
                if (countryList) {
                    countryList.append(div)
                }
                // console.log(country.idd)
            })
        } catch (error) {
            console.log("Err", error)
        }
    })()

if (userCountry) {
    userCountry.addEventListener("click", (e) => {
        countryList.classList.replace("h-0", "h-[60vh]")
        countryList.classList.replace("-top-0", "-top-56")
        countryList.classList.remove("opacity-0")
    })
}


window.addEventListener("click", (e) => {
    if (!countryList || !userCountry) return;

    if (!countryList.contains(e.target) && !userCountry.contains(e.target)) {
        countryList.classList.replace("h-[60vh]", "h-0");
        countryList.classList.replace("-top-56", "-top-0");
        countryList.classList.add("opacity-0");
    }
});

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

if (countryList) {
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
}
async function setDial() {
    try {
        const ip = await fetch('https://ipwho.is')
        const res = await ip.json();
        console.log(res)
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

// document.addEventListener("DOMContentLoaded", () => {
//     if (document.getElementById("signup") || document.getElementById("login")) {
//         setDial();
//     }
// })