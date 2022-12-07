export { renderContactForm }

function renderContactForm() {

    const contactFormTemplate = `
    
        <link rel="stylesheet" href="./css/contact.css">

        <div class="container-contact100">

            <div class="wrap-contact100">

                <form class="contact100-form validate-form">

                    <div class="wrap-input100 validate-input" data-validate="El nombre es un valor obligatorio" id="name">

                        <span class="label-input100">Nombre</span>

                        <input class="input100" type="text" name="name" id="InputName" placeholder="....">

                        <span class="focus-input100"></span>

                    </div>

                    <div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz" id="email">

                        <span class="label-input100">Email</span>

                        <input class="input100" type="text" name="email" id="InputEmail" placeholder="....">

                        <span class="focus-input100"></span>

                    </div>

                    <div class="wrap-input100 validate-input" data-validate="El mensaje debe tener un mínimo de caracteres de 20" id="message">

                        <span class="label-input100">Mensaje</span>

                        <textarea class="input100" name="message" id="InputMessage" placeholder="...."></textarea>

                        <span class="focus-input100"></span>

                    </div>

                    <button class="send" id="btn-send">Enviar</button>

                </form>

            </div>

        </div>
    `;

    return contactFormTemplate;

}