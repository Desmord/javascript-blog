'use strict';

{

    const getHrefAttribute = function (fullAttribute) {
        return fullAttribute.substring(1, fullAttribute.length)
    }

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

        const clickedElementHref = getHrefAttribute(this.getAttribute(`href`))
        const searchedArticle = document.querySelector(`#${clickedElementHref}`);
        searchedArticle.classList.add(`active`)

    }

    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles';

    function generateTitleLinks() {

        const titleList = document.querySelector(optTitleListSelector);
        titleList.innerHTML = ``;

        const articles = document.querySelectorAll(optArticleSelector);
        for (let article of articles) {
            const articleId = article.getAttribute(`id`);
            const articleTitle = article.querySelector(optTitleSelector).innerHTML;
            const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

            // titleList.innerHTML = titleList.innerHTML + linkHTML;
            titleList.insertAdjacentHTML(`beforeend`, linkHTML)
        }


        const links = document.querySelectorAll('.titles a');

        for (let link of links) {
            link.addEventListener('click', titleClickHandler);
        }

    }

    generateTitleLinks();


}