export { teamsListTemplate }

function teamsListTemplate(team) {

    const teamsTemplate = `
    
        <div class="tag-wrapper">
            <div class="team-card">
                <div class="team-card-image team-card-1"></div>
                <div class="team-card-description">
                    <div>
                        <h3 class="team-name-title">${team.name}</h3>
                        <div class="riders-wrapper"></div>
                    </div>
                </div>
            </div>
        </div>
    `;

    return teamsTemplate;

}