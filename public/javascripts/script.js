window.addEventListener('load', () => {
    document.querySelector(".dropdown-button").addEventListener('click', event => {
        //console.log(event.target.closest('.dropdown-button'));
        document.querySelector('.dropdown-menu').classList.toggle('hidden');
    })
})