export {
    createSimpleDiv,
    createLogin,
    createSignup,
    createAccountInfo,
    createRacetrackCards,
    createCompetitorsCards,
    createCircuitCard,
    createTeamsCards,
    createNotificationsCards,
    createContactForm
}

import { router } from "../router/router.js";

// ? utils
import * as user from "../utils/users.js"
import * as supabase from "../utils/supabase.js";

// ? OpenLayers map
import L from "../../node_modules/leaflet/dist/leaflet.js";

function createSimpleDiv(template) {

    let div = document.createElement("div");
    div.setAttribute('id', "innerDiv");

    div.innerHTML = template;

    return div;

}

function createFancyCard(id, css, template) {

    let card = document.createElement("div");
    card.setAttribute("id", id);
    card.classList.add("basic-column");

    css.forEach(element => { card.classList.add(element) });

    card.innerHTML = template;

    return card;

}

function createLogin(innerDiv) {

    let showPasswd = true;

    innerDiv.querySelector("#InputPassword").addEventListener("keypress", (event) => {

        if (event.key == 'Enter') {
            event.preventDefault();
            innerDiv.querySelector("#btn-login").click();
        }
    });

    innerDiv.querySelector(".passwd").addEventListener("click", () => {

        let passordInput = document.getElementById("InputPassword");

        /* Icon creation */

            let iconOpen = document.createElement("i");
            iconOpen.classList.add("fa-solid");
            iconOpen.classList.add("fa-eye");

            let iconClosed = document.createElement("i");
            iconClosed.classList.add("fa-solid");
            iconClosed.classList.add("fa-eye-slash");

        /* Icon creation */

        if (showPasswd) {

            document.querySelector(".passwd").removeChild(document.querySelector(".passwd").firstChild);
            document.querySelector(".passwd").append(iconOpen);

            passordInput.setAttribute('type', 'text');
            showPasswd = false;

        } else {

            document.querySelector(".passwd").removeChild(document.querySelector(".passwd").firstChild);
            document.querySelector(".passwd").append(iconClosed);

            passordInput.setAttribute('type', 'password');
            showPasswd = true;

        }

    }, false);

    if (innerDiv.querySelector("#btn-login")) {

        innerDiv.querySelector("#btn-login").addEventListener("click", (event) => {

            event.preventDefault();

            const email = document.getElementById("InputEmail").value;
            const password = document.getElementById("InputPassword").value;

            user.loginUser(email, password).then(status => {

                if (status.success) {

                    // TODO: Change  
                    setTimeout(() => {
                        window.location.reload();
                    }, 1200);

                } else { UIkit.modal.alert(status.errorText) }

            });

        });

    } else {

        innerDiv.querySelector("#btn-resset").addEventListener("click", () => {

            const email = document.getElementById("InputEmail").value;

            supabase.recoverPasswordSupabase(email);

        });

    }
}

function createSignup(innerDiv) {

    innerDiv.querySelector("#btn-signup").addEventListener("click", () => {

        // const name = document.getElementById("InputName").value;
        // const lastName = document.getElementById("InputLastName").value;
        // const validatePassword = document.getElementById("InputValidatePassword").value;
        // const admin = document.getElementById("admin").checked;
        // const normalUser = document.getElementById("normalUser").checked;

        const email = document.getElementById("InputEmail").value;
        const password = document.getElementById("InputPassword").value;

        supabase.signUpSupabase(email, password);

    });
    
}

function createAccountInfo(template, user) {

    let showChangeAvatarInput = true;

    let css = [];
    let card = createFancyCard(user.id, css, template);

    card.querySelector(".profile-avatar").addEventListener("click", () => {

        if (showChangeAvatarInput) {

            // <div class="js-upload uk-placeholder uk-text-center">

                let js_upload = document.createElement("div");
                js_upload.classList.add("js-upload");
                js_upload.classList.add("uk-placeholder");
                js_upload.classList.add("uk-text-center");
            
                //<span uk-icon="icon: cloud-upload"></span>
                let upload_icon = document.createElement("span");
                upload_icon.setAttribute("uk-icon", "icon: cloud-upload");
                js_upload.append(upload_icon);

                //<span class="uk-text-middle">Attach binaries by dropping them here or</span>
                let spantext1 = document.createElement("span");
                spantext1.classList.add("uk-text-middle");
                spantext1.innerHTML = "&emsp;Arrastra una imagen aquí o";
                js_upload.append(spantext1);

                //<div uk-form-custom>
                    let custom_form = document.createElement("div");
                    custom_form.setAttribute("uk-form-custom", "");

                    //<input type="file" accept="">
                    let input_file = document.createElement("input");
                    input_file.setAttribute("id", "document");
                    input_file.setAttribute("type", "file");
                    input_file.setAttribute("accept", "image/png, image/jpeg");
                    custom_form.append(input_file);
            
                    //<span class="uk-link">selecting one</span>
                    let spantext2 = document.createElement("span");
                    spantext2.classList.add("uk-text-primary");
                    spantext2.innerHTML = "&nbsp;seleccione una";
                    custom_form.append(spantext2);

                //</div>

            // </div>

            js_upload.append(custom_form);
            card.querySelector(".profile-profile-card").append(js_upload);

            //  ? Listeners for image drag and drop
                js_upload.addEventListener(
                    "dragover",
                    (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        js_upload.classList.add("uk-box-shadow-medium");
                    },
                    false
                );

                js_upload.addEventListener(
                    "dragleave",
                    (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        js_upload.classList.remove("uk-box-shadow-medium");
                    },
                    false
                );

                js_upload.addEventListener(
                    "drop",
                    (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        js_upload.classList.remove("uk-box-shadow-medium");

                        let input_file = document.getElementById("document");
                        let files = e.dataTransfer.files;
                        
                        input_file.files = files;
                        
                        handleImage(input_file.files[0]);
                        
                    },
                    false
                );
            //  ? Listeners for image drag and drop

            //  ? Send image to supabase
            function handleImage(image) {

                card.querySelector(".profile-profile-card").removeChild(card.querySelector(".js-upload"));

                let imageThumbnail = card.querySelector(".profile-avatar");
                let file = URL.createObjectURL(image);
                imageThumbnail.setAttribute("src", file);

                let optionsDiv = document.createElement("div");

                let buttonChange = document.createElement("button");
                buttonChange.classList.add("button-change");

                let buttonCancel = document.createElement("button");
                buttonCancel.classList.add("button-cancel");

                let cancelIcon = document.createElement("i");
                cancelIcon.classList.add("fa-solid");
                cancelIcon.classList.add("fa-xmark");
                buttonCancel.append(cancelIcon);
                
                let changeIcon = document.createElement("i");
                changeIcon.classList.add("fa-solid");
                changeIcon.classList.add("fa-arrows-rotate");
                buttonChange.append(changeIcon);

                optionsDiv.setAttribute("uk-grid", "");
                optionsDiv.classList.add("uk-grid");
                optionsDiv.classList.add("uk-margin-medium-top");

                let divButtonChange = document.createElement("div");
                let divButtonCancel = document.createElement("div");

                divButtonChange.append(buttonChange);
                divButtonCancel.append(buttonCancel);

                optionsDiv.append(divButtonCancel, divButtonChange);
                card.querySelector(".profile-profile-card").append(optionsDiv);

                buttonChange.addEventListener("click", async () => {
                    
                    let formImg = new FormData();
                    formImg.append("avatar", image, 'avatarProfile.png');                
                    
                    try {

                        let access_token = localStorage.getItem('access_token');
                        let uid = localStorage.getItem('user_id');

                        let avatarResponse = await supabase.fileRequest(`/storage/v1/object/profiles/avatar${uid}.png`, formImg, access_token);

                        user.avatar_url = avatarResponse.urlAvatar;
                        delete user.avatar_blob;

                        await supabase.updateData(`profiles?id=eq.${uid}&select=*`, access_token, user);

                        // TODO: Change  
                        setTimeout(() => { window.location.reload() }, 1500);

                    } catch (error) { UIkit.modal.alert(error) }

                }, false);

                buttonCancel.addEventListener("click", () => { router("#/account") }, false);

            }

            input_file.addEventListener("change", (event) => { handleImage(event.target.files[0]) }, false);
        
            showChangeAvatarInput = false;

        } else { 

            if (card.querySelector(".profile-avatar")) {

                card.querySelector(".profile-profile-card").removeChild(card.querySelector(".js-upload")); 
                showChangeAvatarInput = true; 
                
            }
        }

    }, false);

    return card;
}

function createRacetrackCards(template, racetrack) {

    let css = ["cards"];
    let card = createFancyCard(racetrack.id, css, template);

    return card;

}

function createCircuitCard(template, circuit) {

    function latlong(coordinates) { return coordinates.split(','); }

    let css = ["w-col", "w-col-6"];
    let card = createFancyCard(circuit.id, css, template);

    //  ? OpenLayersMap configuration
        let mapContainer = card.querySelector(".article-content-3");

        var tileLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: false
        });

        var map = L.map(mapContainer, {
            zoomControl: true,
            layers: [tileLayer],
            maxZoom: 15,
            minZoom: 14
        }).setView([latlong(circuit.coordinates)[0], latlong(circuit.coordinates)[1]], 13);

        // ! Wait until map render is completed
        setTimeout(function () { map.invalidateSize() }, 1000);

    //  ? OpenLayersMap configuration

    return card;

}

function createCompetitorsCards(template, competitor) {

    let css = ["w-col", "w-col-3"];
    let card = createFancyCard(competitor.id, css, template);
        
    card.querySelector(".card2-content").style.backgroundImage = "url(" + competitor.avatar_blob + ")"; 

    return card;

}

function createTeamsCards(template, team, competitors) {
    
    function createDivRider(competitors, riders_wrapper) {

        competitors.forEach(element => {

            let competitor_name = document.createElement("div");
            competitor_name.setAttribute("id", element.id);
            competitor_name.classList.add("tagline");
            competitor_name.classList.add("tagline-rider");

            let bold = document.createElement("b");
            bold.innerHTML = '&nbsp' + element.name.split(",")[0];

            competitor_name.innerHTML = element.name.split(",")[1];
            competitor_name.append(bold);

            riders_wrapper.append(competitor_name);
            
        });
        
    }

    let css = ["w-col", "w-col-4"];
    let card = createFancyCard(team.id, css, template);

    card.querySelector(".team-card-1").style.backgroundImage = "url(" + team.avatar_blob + ")"; 

    createDivRider(competitors, card.querySelector(".riders-wrapper"));

    return card;

}

function createNotificationsCards(template, notificaction) {

    let card = document.createElement("div");
    card.setAttribute('id', notificaction[1].id);
    card.classList.add("cards");

    card.innerHTML = template;

    card.querySelector(".w-button-delete").addEventListener("click", () => {

        supabase.deleteData(`notifications?id=eq.${notificaction[1].id}`);

        // TODO: Change  
        setTimeout(() => {
            window.location.hash = "#/notifications";
            router(window.location.hash);
        }, 800);

    }, false);

    card.querySelector(".w-button-add").addEventListener("click", () => {

        // TODO: Change  
        setTimeout(() => {
            window.location.hash = "#/sign-up/" + notificaction[1].email;
            router(window.location.hash);
        }, 500);

    }, false);

    return card;

}

function createContactForm(innerDiv) {

    (function ($) {
        "use strict"; $('.input100').each(function () {
            $(this).on('blur', function () {
                if ($(this).val().trim() != "") { $(this).addClass('has-val'); }
                else { $(this).removeClass('has-val'); }
            })
        })
    })(jQuery);

    innerDiv.querySelector("#btn-send").addEventListener("click", () => {

        let pass = true;

        let divName = innerDiv.querySelector("#name");
        let divEmail = innerDiv.querySelector("#email");
        let divMessage = innerDiv.querySelector("#message");

        let inputName = innerDiv.querySelector("#InputName");
        let inputEmail = innerDiv.querySelector("#InputEmail");
        let inputMessage = innerDiv.querySelector("#InputMessage");

        function isEmailValid(inputEmailValue) {
            const re = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
            return re.test(inputEmailValue);
        };

        function check(inputName, inputEmail, inputMessage) {

            divName.classList.remove("alert-validate");
            divEmail.classList.remove("alert-validate");
            divMessage.classList.remove("alert-validate");

            if (inputName.textLength < 3) { divName.classList.add("alert-validate"); pass = false; }

            if (!isEmailValid(inputEmail.value)) { divEmail.classList.add("alert-validate"); pass = false; }

            if (inputMessage.textLength < 20) { divMessage.classList.add("alert-validate"); pass = false; }

        }

        check(inputName, inputEmail, inputMessage);

        if (pass) {

            let contact = {
                'name': `${inputName.value}`,
                'email': `${inputEmail.value}`,
                'message': `${inputMessage.value}`,
            }

            supabase.createData(`/notifications`, access_token, contact);

            // TODO: Change  
            setTimeout(() => {
                window.location.hash = "#/home";
                router(window.location.hash);
            }, 800);
        }

    });

}