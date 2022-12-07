export { render401 }

function render401() {

    const unauthorizedTemplate = `
    
        <link rel="stylesheet" href="./css/error.css">

        <div class="error">
            <p> > <span>CÓDIGO DE ERROR:</span> "<i>HTTP 401 Unauthorized</i>"</p>
            <p> > <span>MENSAJE DE ERROR:</span> "<i>Acceso denegado. Usted no esta autorizado en esta página.</i>"</p>
            <p> > <span>ALGUNAS PÁGINAS ESTÁN RESTRINGIDAS A USUARIOS AUTORIZADOS:</span> <i>Inicie sesión o contacte con nosotros.</i></p>
        </div>

    `;

    return unauthorizedTemplate;

}