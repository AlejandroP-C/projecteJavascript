export { renderAccountInfo };

function renderAccountInfo(user) {

    const accountInfo = `

        <link rel="stylesheet" href="./css/account.css">

        <div class="_6-col">
            <div class="profile-profile-card">
                <img src="${user.avatar_blob}" class="profile-avatar">
                <h2 class="profile-name">${user.first_name}&nbsp${user.last_name}</h2>
                <div class="tagline-account profile-email">${user.email}</div>
            </div>
        </div>

    `;

    return accountInfo;

}