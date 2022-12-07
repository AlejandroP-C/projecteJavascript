export { renderHeaderMobile }

import { numberOfNotificactions } from "../../utils/api.js";

/* 
    ? When user is not logged, 'contact from' is available.
    ? If user is 'admin', can view  notificactions from 'contact form' and also create users.
    ? When user is not 'admin' only can view account settings and / or info.
*/

async function renderHeaderMobile(user) {
    
    app.header.innerHTML = ``;

    if (user === undefined) { 

        app.header.innerHTML = `

            <link rel="stylesheet" href="./css/header.css">

            <div class="mobile" uk-navbar>
                    
                <button class="uk-button uk-button-default" type="button" uk-toggle="target: #offcanvas-nav ">
                    <i class="fa-solid fa-bars"></i>
                </button>
                
                <div class="webpack_image"><img src="./images/webpack_logo.png" class="rounded webpack_logo"></div>
                
            </div>

            <div id="offcanvas-nav" uk-offcanvas="overlay: true; mode: push; flip: true;">

                <div class="uk-offcanvas-bar">
            
                    <ul class="uk-nav uk-nav-default">

                        <li class="uk-active"><a href="#/home">Home</a></li>
                        
                        <ul class="uk-nav-sub">

                            <li><a href="#/racetracks">Circuitos</a></li>
                            <li><a href="#/competitors">Competidores</a></li>
                            <li><a href="#/teams">Equipos</a></li>
                            <li><a href="#/contact">Contacto</a></li>

                        </ul>
        
                        <li class="uk-nav-header user-name" id="user">LOGIN</li>

                        <li><a href="#/login"><span class="uk-margin-small-right" uk-icon="icon:  sign-in"></span> Sign In</a></li>

                    </ul>

                </div>

            </div>
        
        `;

    } else if (user.admin) { 

        let notificationCount = await numberOfNotificactions('notifications?select=*', localStorage.getItem("access_token"));

        app.header.innerHTML = `

            <link rel="stylesheet" href="./css/header.css">

            <div class="mobile" uk-navbar>
                    
                <button class="uk-button uk-button-default" type="button" uk-toggle="target: #offcanvas-nav ">
                    <i class="fa-solid fa-bars"></i>
                </button>
                
                <div class="webpack_image"><img src="./images/webpack_logo.png" class="rounded webpack_logo"></div>
                
            </div>

            <div id="offcanvas-nav" uk-offcanvas="overlay: true; mode: push; flip: true;">

                <div class="uk-offcanvas-bar">
            
                    <ul class="uk-nav uk-nav-default">

                        <li class="uk-active"><a href="#/home">Home</a></li>
                        
                        <ul class="uk-nav-sub">

                            <li><a href="#/racetracks">Circuitos</a></li>
                            <li><a href="#/competitors">Competidores</a></li>
                            <li><a href="#/teams">Equipos</a></li>

                        </ul>

                        <li class="uk-nav-header user-name" id="user">${user.first_name}</li>

                        <li><a href="#/notifications"><span class="uk-badge">${notificationCount}</span>Notifications</a></li>
                        <li><a href="#/account"><span class="uk-margin-small-right" uk-icon="icon: user"></span> Account</a></li>

                        <li class="uk-nav-divider"></li>

                        <li><a href="#/sign-out"><span class="uk-margin-small-right" uk-icon="icon: sign-out"></span> Sign Out</a></li>

                    </ul>

                </div>

            </div>
        
        `;
    
    } else {

        app.header.innerHTML = `

            <link rel="stylesheet" href="./css/header.css">

            <div class="mobile" uk-navbar>
                    
                <button class="uk-button uk-button-default" type="button" uk-toggle="target: #offcanvas-nav ">
                    <i class="fa-solid fa-bars"></i>
                </button>
                
                <div class="webpack_image"><img src="./images/webpack_logo.png" class="rounded webpack_logo"></div>
                
            </div>

            <div id="offcanvas-nav" uk-offcanvas="overlay: true; mode: push; flip: true;">

                <div class="uk-offcanvas-bar">
            
                    <ul class="uk-nav uk-nav-default">

                        <li class="uk-active"><a href="#/home">Home</a></li>
                        
                        <ul class="uk-nav-sub">

                            <li><a href="#/racetracks">Circuitos</a></li>
                            <li><a href="#/competitors">Competidores</a></li>
                            <li><a href="#/teams">Equipos</a></li>

                        </ul>

                        <li class="uk-nav-header user-name" id="user">${user.first_name}</li>

                        <li><a href="#/account"><span class="uk-margin-small-right" uk-icon="icon: user"></span> Account</a></li>

                        <li class="uk-nav-divider"></li>

                        <li><a href="#/sign-out"><span class="uk-margin-small-right" uk-icon="icon: sign-out"></span> Sign Out</a></li>

                    </ul>

                </div>

            </div>
        
        `;


    }

}