export { racetrackInfoTemplate }

function racetrackInfoTemplate(racetrack) {

    const racetrackTemplate = `

        <link rel="stylesheet" href="./css/racetrack-info.css">

        <div class="tag-wrapper">
            <div class="article">
                <h2 class="name">${racetrack.name}</h2>
                <div class="tagline tagline-promo-40"><i class="fa-solid fa-location-dot"></i>&nbsp${racetrack.city}</div>
                <div class="article-cover article-content-3"></div>
            </div>
        </div>

    `;

    return racetrackTemplate;

}