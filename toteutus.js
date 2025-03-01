document.addEventListener("DOMContentLoaded", () => {
    fetch("https://kimmoliikanen.github.io/toteutus.json") //oma JSON-linkki
    .then(response => response.json())
    .then(data => {
        document.getElementById("toteutusnimi").textContent = data.toteutus;
        document.getElementById("lukumaara").textContent = data.lukumaara;
        document.getElementById("ajankohta").textContent = `${data.alku} - ${data.loppu}`;
        document.getElementById("kesto").textContent = data.kesto;
        document.getElementById("toteutuskuva").src = data.kuva;

        let lista = document.getElementById("osallistujat");
        lista.innerHTML = "";
        data.osallistujat.forEach(hlo => {
            let li = document.createElement("li");
            li.textContent = hlo.nimi;
            lista.appendChild(li);
        });
    })
    .catch(error => {
        console.error("Virhe haettaessa JSON-dataa:", error);
        document.body.innerHTML += "<p style='color: red;'>Tietoa ei voitu hakea.</p>";
    });
});