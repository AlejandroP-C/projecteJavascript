export { notificationsTemplate }

function notificationsTemplate(form) {

    /*const notificationsTemplate = `

        <link rel="stylesheet" href="./css/notifications.css">

        <div class="uk-card-header">

            <div class="uk-grid-small uk-flex-middle" uk-grid>

                <div class="uk-width-expand">
                    <h3 class="uk-card-title uk-margin-remove-bottom">${form[1].name}</h3>
                    <p class="uk-text-meta uk-margin-remove-top uk-text-normal">${form[1].email}</p>
                </div>

            </div>

        </div>

        <div class="uk-card-body">
            <p>${form[1].message}</p>
        </div>

        <div class="uk-card-footer">

            <a href="mailto:${form[1].email}" class="uk-button button-email">
                <i class="fa-solid fa-at"></i>
            </a>

            <a class="uk-button button-delete notificationID">
                <i class="fa-solid fa-trash"><input type="hidden" value="${form[1].id}"></i>
                <input type="hidden" value="${form[1].id}">                
            </a>

            <a class="uk-button button-signup notificationEmail">
                <i class="fa-solid fa-user-plus"><input type="hidden" value="${form[1].email}"></i>
                <input type="hidden" value="${form[1].email}">
            </a>

        </div>

    `;*/

    const notificationsTemplate = `
    
        <div class="basic-column">

            <div class="notification-profile-card">

                <div class="notification-profilecard-wrapper">

                    <h3 class="notification-profilename">${form[1].name}</h3>
                    <div class="tagline-email">${form[1].email}</div>
                    <p class="text-14">${form[1].message}</p>
                </div>

                <div class="options">
                    <a href="mailto:${form[1].email}" class="btn w-button w-button-reply"><i class="fa-solid fa-at"></i></a>
                    <a class="btn w-button w-button-delete">
                        <i class="fa-solid fa-trash"><input type="hidden" value="${form[1].id}"></i>
                        <input type="hidden" value="${form[1].id}">
                    </a>
                    <a class="btn w-button w-button-add">
                        <i class="fa-solid fa-user-plus"><input type="hidden" value="${form[1].email}"></i>
                        <input type="hidden" value="${form[1].email}">
                    </a>    
                </div>
            </div>
        </div>
    
    `;

    return notificationsTemplate;

}