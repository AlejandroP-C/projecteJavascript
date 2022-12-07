export { signUpForm }

function signUpForm(email) {

    const signUpTemplate = `

        <link rel="stylesheet" href="./css/signup.css">

        <div class="parent clearfix">

            <div class="signup">

                <div class="container">

                    <div class="signup-form">


                        <form class="uk-grid-small" uk-grid>

                            <div class="uk-width-1-2@s">
                                <input class="uk-input" id="InputName" type="text" placeholder="Nombre">
                            </div>

                            <div class="uk-width-1-2@s">
                                <input class="uk-input" id="InputLastName" type="text" placeholder="Apellidos">
                            </div>

                            <div class="uk-width-1-1">
                                <input class="uk-input" id="InputEmail" type="text" placeholder="Correo electrónico" value="${email}">
                            </div>

                            <div class="uk-width-1-2@s">
                                <input class="uk-input" id="InputPassword" type="password" placeholder="Contraseña">
                            </div>

                            <div class="uk-width-1-2@s">
                                <input class="uk-input" id="InputValidatePassword" type="password" placeholder="Repita la contraseña">
                            </div>

                            <div class="uk-width-1-1 uk-form-controls">
                                <label><input class="uk-radio" id="admin" type="radio" name="admin"> Adminstrador</label>
                                <label><input class="uk-radio" id="normalUser" type="radio" name="user"> Usuario</label>
                            </div>
                            
                            <button id="btn-signup">dar de alta</button>
                            
                        </form>

                    </div>

                </div>

            </div>

        </div>

    `;

    return signUpTemplate;

}