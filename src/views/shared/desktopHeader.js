export { renderHeaderDesktop }

import { numberOfNotificactions } from "../../utils/api.js";

/* 
    ? When user is not logged, 'contact from' is available.
    ? If user is 'admin', can view  notificactions from 'contact form' and also create users.
    ? When user is not 'admin' only can view account settings and / or info.
*/

async function renderHeaderDesktop(user) {
    
    app.header.innerHTML = ``;

    if (user === undefined) {
        
        app.header.innerHTML = `
  
            <link rel="stylesheet" href="./css/header.css">

            <div class="uk-navbar-container" uk-navbar>

                <div class="uk-navbar-center">

                    <img src="./images/webpack_logo.png" class="rounded webpack_logo">
                    
                    <div class="button-group">
                        <a href="#/home">página principal</a>
                        <a href="#/racetracks">circuitos</a>
                        <a href="#/competitors">competidores</a>
                        <a href="#/teams">equipos</a>
                        <a href="#/contact">contacto</a>
                    </div>

                    <a href="#/login"><img src="./images/default_user.png" class="user_img img__header" type="button"></img></a>

                </div>

            </div
                                
        `;
        
    } else if (user.admin) {

        let notificationCount = await numberOfNotificactions('notifications?select=*', localStorage.getItem("access_token"));

        if (notificationCount != 0) {
            
            app.header.innerHTML = `
      
                <link rel="stylesheet" href="./css/header.css">
    
                <div class="uk-navbar-container" uk-navbar>
    
                    <div class="uk-navbar-center">
    
                        <img src="./images/webpack_logo.png" class="rounded webpack_logo">
                        
                        <div class="button-group">
                            <a href="#/home">página principal</a>
                            <a href="#/racetracks">circuitos</a>
                            <a href="#/competitors">competidores</a>
                            <a href="#/teams">equipos</a>
                        </div>
    
                        <div class="user uk-flex">
                            <img src="${user.avatar_blob}" class="user_img img__header" type="button"></img>
                            <span class="uk-badge">${notificationCount}</span>
                        </div>
    
                        <div uk-dropdown animation: uk-animation-slide-top-small; duration: 1000>
                            <ul class="uk-nav uk-dropdown-nav">
                                <li class="uk-nav-header user-name" id="user">${user.first_name}</li>
    
                                <li><a href="#/notifications"><span class="uk-badge">${notificationCount}</span>Notificaciones</a></li>
                                <li><a href="#/account"><span class="uk-margin-small-right" uk-icon="icon: user"></span> Mi cuenta</a></li>
    
                                <li class="uk-nav-divider"></li>
                                <li><a href="#/sign-out" class="sign-out"><span class="uk-margin-small-right" uk-icon="icon: sign-out"></span> Cerrar sesión</a></li>
                            </ul>
                        </div>
    
                    </div>
    
                </div
                                    
            `;

        } else {

            app.header.innerHTML = `
      
                <link rel="stylesheet" href="./css/header.css">
    
                <div class="uk-navbar-container" uk-navbar>
    
                    <div class="uk-navbar-center">
    
                        <img src="./images/webpack_logo.png" class="rounded webpack_logo">
                        
                        <div class="button-group">
                            <a href="#/home">página principal</a>
                            <a href="#/racetracks">circuitos</a>
                            <a href="#/competitors">competidores</a>
                            <a href="#/teams">equipos</a>
                        </div>
    
                        <img src="${user.avatar_blob}" class="user_img img__header" type="button"></img>
    
                        <div uk-dropdown animation: uk-animation-slide-top-small; duration: 1000>
                            <ul class="uk-nav uk-dropdown-nav">
                                <li class="uk-nav-header user-name" id="user">${user.first_name}</li>
    
                                <li><a href="#/notifications"><span class="uk-badge">${notificationCount}</span>Notificaciones</a></li>
                                <li><a href="#/account"><span class="uk-margin-small-right" uk-icon="icon: user"></span> Mi cuenta</a></li>
    
                                <li class="uk-nav-divider"></li>
                                <li><a href="#/sign-out" class="sign-out"><span class="uk-margin-small-right" uk-icon="icon: sign-out"></span> Cerrar sesión</a></li>
                            </ul>
                        </div>
    
                    </div>
    
                </div
                                    
            `;
            
        }


    } else {
        
        app.header.innerHTML = `
  
            <link rel="stylesheet" href="./css/header.css">

            <div class="uk-navbar-container" uk-navbar>

                <div class="uk-navbar-center">

                    <img src="./images/webpack_logo.png" class="rounded webpack_logo">
                    
                    <div class="button-group">
                        <a href="#/home">página principal</a>
                        <a href="#/racetracks">circuitos</a>
                        <a href="#/competitors">competidores</a>
                        <a href="#/teams">equipos</a>
                    </div>

                    <img src="${user.avatar_blob}" class="user_img img__header" type="button"></img>

                    <div uk-dropdown animation: uk-animation-slide-top-small; duration: 1000>
                        <ul class="uk-nav uk-dropdown-nav">
                            <li class="uk-nav-header user-name" id="user">${user.first_name}</li>

                            <li><a href="#/account"><span class="uk-margin-small-right" uk-icon="icon: user"></span> Mi cuenta</a></li>

                            <li class="uk-nav-divider"></li>
                            <li><a href="#/sign-out" class="sign-out"><span class="uk-margin-small-right" uk-icon="icon: sign-out"></span> Cerrar sesión</a></li>
                        </ul>
                    </div>

                </div>

            </div
                                
        `;
    }

}