'use strict';

const titleClickHandler = function (event) {
    event.preventDefault();

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }

    const activeArticles = document.querySelectorAll('.active');

    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

    const clickedElement = this;
    clickedElement.classList.add(`active`);

    const clickedElementHref = this.getAttribute(`href`).substring(1, this.getAttribute(`href`).length);
    const searchedArticle = document.querySelector(`#${clickedElementHref}`);
    searchedArticle.classList.add(`active`)

}

const links = document.querySelectorAll('.titles a');

for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}