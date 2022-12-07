export { renderLogin }

function renderLogin(forgot) {

    let loginTemplate = ``;

    if (forgot) {

        loginTemplate = `
    
            <link rel="stylesheet" href="./css/forgot.css">
            
            <div class="parent clearfix">

                <div class="resset">

                    <div class="container">
                    
                        <div class="resset-form">

                            <form>

                                <input type="email" id="InputEmail" placeholder="Correo electrónico">

                                <div class="forget-pass">
                                    <a href="#/login">Volver al login</a>
                                </div>

                                <button class="send" id="btn-resset">Enviar</button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        `;

        
    } else {

        loginTemplate = `
    
            <link rel="stylesheet" href="./css/login.css">
            
            <div class="parent clearfix">

                <div class="login">

                    <div class="container">
                    
                        <div class="login-form">

                            <form>

                                <input type="email" id="InputEmail" placeholder="Correo electrónico">
                                <div class="uk-flex-inline">
                                    <input type="password" id="InputPassword" placeholder="Contraseña">
                                    <button class="passwd"><i class="fa-solid fa-eye-slash"></i></button>
                                </div>

                                <div class="forget-pass">
                                    <a href="#/login/forgot">¿Has olvidado la contraseña?</a>
                                </div>

                                <button class="send" id="btn-login">Entrar</button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        `;
       
    }


    return loginTemplate;

}