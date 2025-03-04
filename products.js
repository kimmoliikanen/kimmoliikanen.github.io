//Tuotteiden tietokanta
const products = [
    //women's collection
    { id: 1, name: "T-shirt", image: "ai-generated-8557635_1280.jpg", description: "100% organic cotton. Relaxed fit.", price: 29.90 },
    { id: 2, name: "Outdoor jacket", image: "hiking-8216486_1280.jpg", description: "Waterproof and windproof softshell jacket.", price: 199.90 },
    { id: 3, name: "Trousers", image: "trousers-2685231_1280.jpg", description: "Straight leg. Water- and windproof.", price: 89.89},
    { id: 4, name: "Tights", image: "mountains-3959204_1280.jpg", description: "Outdoor tights for hiking.", price: 79.90 },

    //men's collection
    { id: 5, name: "T-shirt", image: "t-shirt-7973404_1280.jpg", description: "100% organic cotton. Relaxed fit.", price: 29.90 },
    { id: 6, name: "Hoodie", image: "man-5575050_1280.jpg", description: "100% organic cotton. Relaxed fit.", price: 99.90 },
    { id: 7, name: "Trousers", image: "walk-617390_1280.jpg", description: "Tight leg. Water- and windproof.", price: 89.89},
    { id: 8, name: "Jacket", image: "orange-jacket-4714097_1280.jpg", description: "Waterproof and windproof softshell jacket.", price: 189.90 },

    //equipment
    { id: 9, name: "Backpack", image: "backpack-1868720_1280.jpg", description: "Weatherproof backback. 50l.", price: 99.90 },
    { id: 10, name: "Trailrunning shoes", image: "running-shoes-115149_1280.jpg", description: "Cushioned shoes for trails.", price: 129.90 },
    { id: 11, name: "Beanie", image: "people-2574410_1280.jpg", description: "Beanie made of 100% merinowool. Breathable and warm.", price: 59.90},
    { id: 12, name: "Waterbottle", image: "clean-kanteen-4423681_1280.jpg", description: "Waterbottle. Made from aluminium. Leakage free.", price: 39.90 }

];

//Hae tuotteen ID URL:stä
const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get("id"));

//Etsi oikea tuote listalta
const product = products.find(p => p.id === productId);

if (product) {
    document.getElementById("product-title").textContent = product.name;
    document.getElementById("product-image").src = product.image;
    document.getElementById("product-description").textContent = product.description;
    document.getElementById("product-price").textContent = product.price.toFixed(2);
} else {
    document.querySelector(".container").innerHTML = "<h2>Product not found</h2>";
}