export { renderFooter }

function renderFooter() {
    
    app.footer.innerHTML = `

        <link rel="stylesheet" href="./css/footer.css">

        <div class="footer-center uk-grid-small uk-child-width-expand@s uk-text-center" uk-grid>

            <div>
                <p>IES Doctor LLuis Simarro</p>
                <p>Curso 22 / 23</p>
            </div>

        </div>

    `;

}