export { router }

// ? Utils
import * as API from "../utils/api.js";
import * as RENDER from "../utils/createTemplates.js";
import * as USERS from "../utils/users.js";
import { logoutSupabase } from "../utils/supabase.js";

// ? Templates
import { renderLogin } from "../views/templates/login.js"
import { renderAccountInfo } from "../views/templates/account.js";
import { renderContactForm } from "../views/templates/contactForm.js";
import { signUpForm } from "../views/templates/signup.js";
import { render401 } from "../views/templates/errors.js";
import { renderHome } from "../views/templates/home.js";

// Is user allowed to use route?
function isAllowed(route, user) {

    const routesAllowedNoLogged = ["#/home", "#/contact", "#/login"];
    const routesForbiddenLogged = ["#/contact", "#/login"];
    const routesAllowedAdmin = ["#/notifications"];

    if (!USERS.isLogged() && !routesAllowedNoLogged.includes(route)) {

        window.location.hash = "#/error";
        return false;

    } else if (USERS.isLogged() && routesForbiddenLogged.includes(route)) {

        window.location.hash = "#/home";
        return false;

    } else if (user && !user.admin && routesAllowedAdmin.includes(route)) {

        window.location.hash = "#/error";
        return false;

    } else { return true }

}

const router = async (route) => {

    let user = await USERS.getUserInfo();

    const access_token = localStorage.getItem("access_token");

    let mainPage = document.querySelector("#main");
    let divGrid3 = document.querySelector("#divGrid3");

    //  Hide menu when route changes on mobile resolution
    let offcanvas = document.querySelector("#offcanvas-nav");
    UIkit.offcanvas(offcanvas).hide();

    //  Delete all page content when route changes
    if (mainPage.childNodes[0]) { mainPage.removeChild(mainPage.childNodes[0]) }
    if (divGrid3.childNodes[0]) { while (divGrid3.firstChild) { divGrid3.removeChild(divGrid3.childNodes[0]) } }

    if (/#\/(racetrack)\/[0-9]{1,2}$/.test(route)) {

        let id = route.split("/")[2];

        if (isAllowed(route, user)) { API.getRacetrackInfo(`venue?id=eq.${id}&select=*`, access_token, divGrid3) }

    } else if (/#\/(sign-up)\/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(route)) {

        let email = route.split("/")[2];

        if (isAllowed(route, user)) {
            API.printWithTemplate(mainPage, RENDER.createSimpleDiv(signUpForm(email)));
            RENDER.createSignup(mainPage.childNodes[0]);
        }

    } else {

        switch (route) {

            case "#/home":

                document.title = "Página Principal";

                API.printWithTemplate(mainPage, RENDER.createSimpleDiv(renderHome()));

                break;

            case "#/contact":

                document.title = "Contacto";

                if (isAllowed(route, user)) {
                    API.printWithTemplate(mainPage, RENDER.createSimpleDiv(renderContactForm()));
                    RENDER.createContactForm(mainPage.childNodes[0]);
                }

                break;

            case "#/login":

                document.title = "Login";

                if (isAllowed(route, user)) {
                    API.printWithTemplate(mainPage, RENDER.createSimpleDiv(renderLogin(false)));
                    RENDER.createLogin(mainPage.childNodes[0]);
                }

                break;

            case "#/login/forgot":

                document.title = "Login";

                API.printWithTemplate(mainPage, RENDER.createSimpleDiv(renderLogin(true)));
                RENDER.createLogin(mainPage.childNodes[0]);

                break;

            case "#/sign-out":

                localStorage.clear();
                await logoutSupabase(access_token).then( () => {

                    window.location.hash = '#/home';
                    setTimeout(() => { window.location.reload() }, 600);

                });

                break;

            case "#/account":

                if (isAllowed(route, user)) {
                    let div = document.createElement("div");
                    divGrid3.append(div);
                    API.printWithTemplate(divGrid3, RENDER.createAccountInfo(renderAccountInfo(user), user));
                }

                break;

            case "#/racetracks":

                document.title = "Circuitos";

                if (isAllowed(route, user)) { API.getRacetracksList(`stages?select=*`, access_token, divGrid3) }

                break;

            case "#/competitors":

                document.title = "Competidores";

                if (isAllowed(route, user)) { API.getCompetitorsList(`/competitors?select=*`, access_token, divGrid3) }

                break;

            case "#/teams":

                document.title = "Equipos";

                if (isAllowed(route, user)) { API.getTeamsList(`teams?select=*`, access_token, divGrid3) }

                break;


            case "#/notifications":

                document.title = "Notificaciones";

                if (isAllowed(route, user)) { API.getNotifications(`notifications?select=*`, access_token, divGrid3) }

                break;

            case "#/error":

                document.title = "Error!";

                API.printWithTemplate(mainPage, RENDER.createSimpleDiv(render401()));

                break;

        }
    }


}