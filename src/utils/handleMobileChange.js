export { mediaQuery, handleMobileChange }

const mediaQuery = window.matchMedia('(min-width: 900px)');

function handleMobileChange(e) {

    // true = desktop | false = mobile
    if (e.matches) { return true } else { return false }

}