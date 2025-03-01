document.addEventListener("DOMContentLoaded", () => {
    fetch("https://kimmoliikanen.github.io/kurssi.json") 
        .then(response => response.json())
        .then(data => {
            document.getElementById("otsikko").textContent = data.otsikko;
            document.getElementById("kuvaus").textContent = data.kuvaus;
            document.getElementById("kuva").src = data.kuva;

            
            document.getElementById("kurssi").textContent = `${data.opintojakso.nimi} (${data.opintojakso.tunnus}) - ${data.opintojakso.opintopisteet} op`;


            let sisaltolista = document.getElementById("sisalto");
            sisaltolista.innerHTML = "";
            data.sisalto.forEach(item => {
                let li = document.createElement("li");
                li.textContent = item;
                sisaltolista.appendChild(li);
            });

        let tekniikatlista = document.getElementById("tekniikat");
        tekniikatlista.innerHTML = "";
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
            console.error("Virhe haettaessa JSON-dataa:", error);
            document.body.innerHTML += "<p style='color: red;'>Tietoa ei pystytä hakemaan.</p>";
        });
});