export {
    printWithTemplate,
    numberOfNotificactions,
    getRacetracksList,
    getRacetrackInfo,
    getCompetitorsList,
    getTeamsList,
    getNotifications,
    createImageBlob
}

// ? Utils
import * as supabase from "../utils/supabase.js";
import * as BUILD from "../utils/createTemplates.js";

// ? Templates
import { racetracksListTemplate } from "../views/templates/racetrack-list.js";
import { racetrackInfoTemplate } from "../views/templates/racetrack-info.js";
import { notificationsTemplate } from "../views/templates/notifications.js";
import { teamsListTemplate } from "../views/templates/teams-list.js";
import { competitorsListTemplate } from "../views/templates/competitors-list.js";

function printWithTemplate(querySelector, template) {
    querySelector.append(template);
}

async function numberOfNotificactions(uri, token) {
    const data = await supabase.getData(uri, token);
    if (data != null) { return Object.entries(data).length } else { return 0 }
}

async function getRacetracksList(uri, token, querySelector) {
    const databaseData = await supabase.getData(uri, token);
    databaseData.forEach(element => {
        printWithTemplate(querySelector, BUILD.createRacetrackCards(racetracksListTemplate(element), element));
    });
}

async function getRacetrackInfo(uri, token, querySelector) {
    let div = document.createElement("div");
    querySelector.append(div);
    const databaseData = await supabase.getData(uri, token);
    databaseData.forEach(element => {
        printWithTemplate(querySelector, BUILD.createCircuitCard(racetrackInfoTemplate(element), element));
    });
}

async function getCompetitorsList(uri, token, querySelector) {
    const databaseData = await supabase.getData(uri, token);
    databaseData.forEach(async element => {
        element = await createImageBlob("competitors", element.id, token);
        printWithTemplate(querySelector, BUILD.createCompetitorsCards(competitorsListTemplate(element), element));
    });
}

async function getCompetitorsInTeam(teamID, token) {
    return await supabase.getData(`/competitors?select=*,team!inner(*)&team.id=eq.${teamID}`, token);
}

async function getTeamsList(uri, token, querySelector) {
    const databaseData = await supabase.getData(uri, token);
    databaseData.forEach(async element => {
        element = await createImageBlob("teams", element.id, token);
        printWithTemplate(querySelector, BUILD.createTeamsCards(teamsListTemplate(element), element, await getCompetitorsInTeam(element.id, token)));
    });
}

async function getNotifications(uri, token, querySelector) {
    const databaseData = await supabase.getData(uri, token);
    
    if (Object.entries(databaseData).length != 0) {

        Object.entries(databaseData).forEach(element => {
            printWithTemplate(querySelector, BUILD.createNotificationsCards(notificationsTemplate(element), element));
        });

    } else {

        // TODO: Change  
        window.location.hash = "#/home";
        router(window.location.hash);

        UIkit.modal.alert("Actualmente, usted no tiene notificaciones");

    }
}

async function createImageBlob(table, filter, access_token) {

    let response = await supabase.getData(`${table}?id=eq.${filter}&select=*`, access_token);

    let avatar_url = response[0].avatar_url;
    response[0].avatar_blob = false;

    if (avatar_url) {

        let imageBlob = await supabase.getFileRequest(avatar_url, access_token);

        if (imageBlob instanceof Blob) { response[0].avatar_blob = URL.createObjectURL(imageBlob) }

    }

    return response[0];    
}