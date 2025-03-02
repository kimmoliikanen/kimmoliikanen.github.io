document.addEventListener("DOMContentLoaded", async () => {
    const junatDiv = document.getElementById("junat");

    try {
        const response = await fetch("https://rata.digitraffic.fi/api/v1/live-trains/station/HKI?departing_trains=100&include_nonstopping=false");

        if (!response.ok) {
            throw new Error(`Virhe haettaessa junatietoja: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Haetut junatiedot:", data); //DEBUG

        let junatHtml = "<ul>";

        for (let i = 0; i < data.length; i++) {
            const juna = data[i];

            //Tarkistetaan, onko kyseessä pitkän matkan juna
            if (juna.trainCategory !== "Long-distance") {
                continue;
            }

            for (let j = 0; j < juna.timeTableRows.length; j++) {
                const row = juna.timeTableRows[j];

                //Tarkistetaan, onko asema Tampere (TPE) ja lähtöaika (DEPARTURE)
                if (row.stationShortCode === "TPE" && row.type === "DEPARTURE") {
                    const lahtopaikka = juna.timeTableRows[0].stationShortCode;
                    const vika = juna.timeTableRows.length - 1;
                    const maaranpaa = juna.timeTableRows[vika].stationShortCode;
                
                    const pvm = row.scheduledTime;
                    const aika = `${pvm.substr(0, 10)} kello: ${pvm.substr(11, 5)}`;
                
                    junatHtml += `
                        <li>
                            <strong>Juna ${juna.trainNumber}</strong><br>
                            Lähtöpaikka: ${lahtopaikka} → Määränpää: ${maaranpaa}<br>
                            Tampereelta lähtö: ${aika}
                        </li>
                    `;
                    break; //Löytyi Tampereen lähtö, ei tarvitse käsitellä muita rivejä
                }
            }
        }

        junatHtml += "</ul>";

        if (junatHtml === "<ul></ul>") {
            junatDiv.innerHTML = "<p>Ei löydetty Tampereelle meneviä junia.</p>";
        }   else {
            junatDiv.innerHTML = junatHtml;
        }

    } catch (error) {
        console.error(error);
        junatDiv.innerHTML = `<p style="color: red;">Junatietojen haku epäonnistui.</p>`;
    }
});