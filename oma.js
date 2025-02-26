document.addEventListener("DOMContentLoaded", () => {
    fetch("https://kimmoliikanen.github.io/kurssi.json") 
        .then(response => response.json())
        .then(data => {
            document.getElementById("otsikko").textContent = data.otsikko;
            document.getElementById("kuvaus").textContent = data.kuvaus;
            document.getElementById("kuva").src = data.kuva;
            document.getElementById("kurssi").textContent = `${data.nimi} (${data.tunnus}) - ${data.opintopisteet} op`;

            let sisaltolista = document.getElementById("sisalto");
            data.sisalto.forEach(item => {
                let li = document.createElement("li");
                li.textContent = item;
                sisaltoLista-appenChild(li);
            });

        let tekniikatlista = document.getElementById("tekniikat");
        data.tekniikat.forEach(item => {
            let li= document.createElement("li");
            let a= document.createElement("a");
            a.href = item.linkki;
            a.textContent = item.aihe;
            a.target = "_blank";
            li.appendChild(a);
            tekniikatlista.appendChild(li);
        });
        })
        .catch(error => {
            document.getElementById("vastaus").innerHTML = "<p>Tietoa ei pystytä hakemaan</p>";
            console.error("Virhe haettaessa JSON-dataa:", error);
        });
});