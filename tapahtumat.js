document.addEventListener("DOMContentLoaded", () => {
    const url = "https://api.visittampere.com/api/v1/visittampere/event/published/all/?format=json&lang=fi"; //API-data URL

    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Verkkovirhe! Tapahtumia ei voitu hakea.");
        }
        return response.json(); //Muunnetaan vastaus JSON-muotoon
    })
    .then(data => {
        tapahtumat(data);
    })
    .catch(error => {
        console.error("Virhe haettaessa dataa:", error);
        document.getElementById("vastaus").innerHTML = `<p style="color: red;">Tietoa ei pystytä hakemaan.</p>`;
    });
});



function tapahtumat(data) {
    let teksti = "<h1>Tampereella tapahtuu</h1>";

    //Käydään läpi data ja luodaan HTML-sisältö

    for (let i = 0; i < data.length; i++) {
        let nimi = data[i].title ? data[i].title: "Ei nimeä saatavilla";
        let kuvaus = data[i].description ? data[i].description: "Ei kuvausta saatavilla";
        let url = data[i].url ? data[i].url: "#";

        teksti += `<h3>${nimi}</h3>`;
        teksti += `<p>${kuvaus}</p>`;
        teksti += `<p><a href="${url}" target="_blank">${url}</a></p>`;
    }

    //Näytetään tapahtumat sivulla
    
    document.getElementById("vastaus").innerHTML = teksti;
}
