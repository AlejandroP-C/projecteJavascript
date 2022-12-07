import { router } from "./router/router.js";

// ? Utils
import { handleMobileChange, mediaQuery } from "./utils/handleMobileChange.js";
import * as users from "./utils/users.js";

// ? Views
import { renderHeaderDesktop } from "./views/shared/desktopHeader.js";
import { renderHeaderMobile } from "./views/shared/mobileHeader.js";
import { renderFooter } from "./views/shared/footer.js";

window.app = {};

(function () {

    document.addEventListener("DOMContentLoaded", async function () {

        let user = await users.getUserInfo();

        app.header = document.querySelector("#header");
        app.footer = document.querySelector("#footer");

        router(window.location.hash);

        handleMobileChange(mediaQuery) ? renderHeaderDesktop(user) : renderHeaderMobile(user);

        mediaQuery.addEventListener("change", () => {
            handleMobileChange(mediaQuery) ? renderHeaderDesktop(user) : renderHeaderMobile(user);
        });

        renderFooter();

    });

    window.addEventListener('hashchange', function hasChanged() {
        router(window.location.hash);
    });

})();