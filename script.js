const clickSetStar = document.getElementById('click__set-star');
const backgroundNumber = document.querySelectorAll('.background__number');
const mainSelection = document.getElementById('main-selection')

let selectedNumber  = null;

const ClickNumber = (event) => {
    backgroundNumber.forEach(e => e.classList.remove('no-hover'));

    event.target.classList.add('no-hover');
    selectedNumber = event.target.textContent
};

backgroundNumber.forEach(e => e.addEventListener('click', ClickNumber));

clickSetStar.addEventListener('click', () => {
    if (selectedNumber ) {

        const nowRap = `
        <section class="section__box">
            <div class="all__items">
                <div class="container__image-operations">
                    <img src="img/illustration-thank-you.svg" alt="image" class="image__thank">
                </div>

                <span class="span__background">
                    <nav class="nav__selected">You selected ${selectedNumber} out of 5</nav>
                </span>

                <div class="fill__text">
                    <h1>Thank you!</h1>
                </div>

            <div class="container__text-p">
                <p>We appreciate you taking the time to give a rating.</p>
                <p>If you ever need more support, don’t hesitate to</p>
                <p>get in touch!</p>
            </div>
        </div>

        </section>

        `

        mainSelection.innerHTML = nowRap
    }
})
