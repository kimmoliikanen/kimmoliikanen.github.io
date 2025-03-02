document.addEventListener("DOMContentLoaded", async () => {
    const kameratDiv = document.getElementById("kamerat");

    //Lakalaivan kelikamerat (Tie 3)
    const kamerat = [
        "C04507",
        "C04508",
        "C04509",
        "C04510",
        
    ];

    for (const id of kamerat) {
        try {
            const response = await fetch(`https://tie.digitraffic.fi/api/weathercam/v1/stations/${id}`);

            if (!response.ok) {
                throw new Error(`Virhe haettaessa kelikameraa: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log(`Kamera ${id} data:`, data); //DEBUG
            console.log(`Kamera ${id} presets:`, data.properties.presets);
            if (data.properties.presets.length > 0) {
                let kameraHtml = `<div><h3>Kamera ${id}</h3>`;

                for (const preset of data.properties.presets) {
                    if (preset.imageUrl) {

                        const timestamp = preset.measuredTime
                            ? new Date(preset.measuredTime).toLocaleString("fi-FI")
                            : new Date(data.properties.dataUpdatedTime).toLocaleString("fi-FI");


                        kameraHtml += `
                            <p>Päivitetty: ${timestamp}</p>
                            <img src="${preset.imageUrl}" alt="liikennekamera ${id}" width="400">
                        `;
                    }
                }

                kameraHtml += `</div>`;
                kameratDiv.innerHTML += kameraHtml;
            } else {
                throw new Error(`Kamera ${id}: Ei kuvia saatavilla`);
            }
        } catch (error) {
            console.error(error);
            kameratDiv.innerHTML += `<p style="color: red;">Kuvaa ei voitu ladata (${id})</p>`;
        }
    }
});