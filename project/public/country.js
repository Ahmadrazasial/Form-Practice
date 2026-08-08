
(async function () {
    try {
        const response = await fetch(
            'https://api.restcountries.com/countries/v5',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer rc_live_9a776bbf3e264cb6a5416216dc1f8b5c',
                    'Content-Type': 'application/json'
                }

            }
        )

        const data = await response.json();
        const countries = data.data.objects
        // console.log(countries)


        countries.forEach(country => {
            // console.log(country)
            const div = document.createElement("div");
            div.className = "country";
            // console.log(`+${country.calling_codes[0]}`)
            const iso = country.codes.alpha_2;
            const name = country.names.common;
            const dial = `+${country.calling_codes[0]}`;
            const flag = country.flag.url_svg;
            div.dataset.iso = iso
            div.dataset.name = name;
            div.dataset.dial = dial;
            div.dataset.flag = flag;
            const countryflag = document.createElement("img")
            countryflag.className = "countryFlag";
            countryflag.src = flag;
            const countryName = document.createElement("span")
            countryName.className = "countryName";
            countryName.textContent = name;
            countryName.dataset = name;
            const countryDial = document.createElement("span")
            countryDial.className = "countryDial";
            countryDial.textContent = dial;
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
        countryList.classList.replace("w-0", "w-[300px]")
        countryList.classList.replace("-top-0", "-top-36")
        countryList.classList.remove("opacity-0")
    })
}


window.addEventListener("click", (e) => {
    if (!countryList || !userCountry) return;

    if (!countryList.contains(e.target) && !userCountry.contains(e.target)) {
        countryList.classList.replace("h-[60vh]", "h-0");
        countryList.classList.replace("w-[300px]", "w-0")
        countryList.classList.replace("-top-36", "-top-0");
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
        // country.classList.replace("w-full", "w-0")
        countryList.classList.replace("h-[60vh]", "h-0")
        countryList.classList.replace("w-[300px]", "w-0")
        countryList.classList.replace("-top-36", "-top-0")
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

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("signup") || document.getElementById("login")) {
        setDial();
    }
})