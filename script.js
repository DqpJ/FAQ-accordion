const openContent = document.querySelectorAll('.open-content');

const ChangeMinusPlusVinText = (event) => {
    const target = event.currentTarget;
    const textParagraph = target.closest('.opening__text').nextElementSibling;

    if (target.src.includes('icon-minus.svg')) {
        target.src = 'img/icon-plus.svg';
        textParagraph.classList.remove('visibility__text');
    } else {
        target.src = 'img/icon-minus.svg';
        textParagraph.classList.add('visibility__text');
    }
}

openContent.forEach(visibility => visibility.addEventListener('click', ChangeMinusPlusVinText));
