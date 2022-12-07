export { competitorsListTemplate }

function competitorsListTemplate(competitor) {

    function formatCompetitorName(name) { return name.split(",")[1] + ' ' + name.split(",")[0] }

    const competitorsTemplate = `

        <div class="tag-wrapper">

            <div class="card card2-content">

                <div class="tagline white-hero-tagline">${formatCompetitorName(competitor.name)}</div>

            </div>

        </div>

    `;

    return competitorsTemplate;

}