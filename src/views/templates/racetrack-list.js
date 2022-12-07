export { racetracksListTemplate }

function formatDates(schedule) {

    let date = new Date(schedule.slice(0, 10));

    date = new Intl.DateTimeFormat('es-ES', { dateStyle: 'long', timeStyle: 'short' }).format(date);

    return date.slice(0, -6);

}

function racetracksListTemplate(stages) {

    const racetracksTemplate = `

        <div class="racetrack-card">

            <div class="uk-card-header">

                <div class="uk-grid-small uk-flex-middle" uk-grid>

                    <div class="uk-width-auto">
                        <img class="flag" width="55" src="https://etqukqiamhsbllqshgvh.supabase.co/storage/v1/object/public/flags/${stages.country_code}.png" alt="Flag">
                    </div>

                    <div class="uk-width-expand">
                        <h3 class="uk-card-title uk-margin-remove-bottom">${stages.description}</h3>
                        <p class="uk-text-meta uk-margin-remove-top uk-text-normal">${formatDates(stages.scheduled)} - ${formatDates(stages.scheduled_end)}</p>
                    </div>

                </div>

            </div>

            <div class="uk-card-body">
                <a href="./#/racetrack/${stages.id}" class="tag-wrapper-racetrack">
                    <div class="label">
                        <span class="label-text">Mas información</span>
                    </div>
                </a>
            </div>

        </div>

    `;

    return racetracksTemplate;

}