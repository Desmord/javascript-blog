'use strict';

{

    const getHrefAttribute = function (fullAttribute) {
        return fullAttribute.substring(1, fullAttribute.length);
    };

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

        const clickedElementHref = getHrefAttribute(this.getAttribute(`href`));
        const searchedArticle = document.querySelector(`#${clickedElementHref}`);
        searchedArticle.classList.add(`active`);

    };

    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles',
        optArticleTagsSelector = '.post-tags .list',
        optTagsListSelector = '.tags.list',
        optArticleAuthorSelector = `.post-author`;

    const generateTitleLinks = function (filtredLinksId) {

        const titleList = document.querySelector(optTitleListSelector);
        titleList.innerHTML = ``;


        const articles = document.querySelectorAll(optArticleSelector);
        for (let article of articles) {
            const articleId = article.getAttribute(`id`);
            const articleTitle = article.querySelector(optTitleSelector).innerHTML;
            const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

            if (filtredLinksId) {
                if (filtredLinksId.length !== 0 && filtredLinksId.some(linkIndex => linkIndex == articleId)) {
                    titleList.insertAdjacentHTML(`beforeend`, linkHTML);
                }
            } else {
                titleList.insertAdjacentHTML(`beforeend`, linkHTML);
            }

        }

        const links = document.querySelectorAll('.titles a');

        for (let link of links) {
            link.addEventListener('click', titleClickHandler);
        }

    };

    generateTitleLinks();

    const generateTags = function () {
        const articles = document.querySelectorAll(optArticleSelector);


        for (let article of articles) {
            const tagsWrapper = article.querySelector(optArticleTagsSelector);
            const articleTags = article.getAttribute(`data-tags`);
            const articleTagsArray = articleTags.split(` `);
            let html = ``;

            for (let tag of articleTagsArray) {
                html = html + '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';
            }

            tagsWrapper.insertAdjacentHTML(`beforeend`, html);

        }

    };

    generateTags();

    const tagClickHandler = function (event) {

        event.preventDefault();

        const clickedEvent = this;
        const href = getHrefAttribute(clickedEvent.children[0].getAttribute(`href`));
        const tag = href.substring(4, href.length);
        const activeLinks = document.querySelectorAll(`a.active`);
        const allArticles = document.querySelectorAll(`article`);
        let searchedLinks = [];

        for (let activeLink of activeLinks) {
            activeLink.classList.remove(`active`);
        }

        for (let article of allArticles) {
            const articleTags = article.getAttribute(`data-tags`);
            const articleTagsArray = articleTags.split(` `);
            const tagExist = articleTagsArray.some(articleTag => articleTag === tag ? true : false);

            if (tagExist) {
                const linkIndex = article.getAttribute(`id`);
                searchedLinks.push(linkIndex);
            }
        }

        generateTitleLinks(searchedLinks);

    };

    const addClickListenersToTags = function () {
        const tagsWrappers = document.querySelectorAll(optArticleTagsSelector);

        for (let tag of tagsWrappers) {
            const links = tag.querySelectorAll(`li`);

            for (let link of links) {
                link.addEventListener(`click`, tagClickHandler);
            }
        }

    };

    addClickListenersToTags();

    const generateAuthors = function () {
        const articles = document.querySelectorAll(optArticleSelector);


        for (let article of articles) {
            const tagsWrapper = article.querySelector(optArticleAuthorSelector);
            const author = tagsWrapper.getAttribute(`data-author`);
            let html = '<a href="#author-' + author + '">by ' + author + '</a></li>';

            tagsWrapper.insertAdjacentHTML(`beforeend`, html);

        }

    };

    generateAuthors();

    const authorClickHandler = function (event) {
        event.preventDefault();

        const clickedEvent = this;
        const href = getHrefAttribute(clickedEvent.getAttribute(`href`));
        const author = href.substring(7, href.length);
        const activeLinks = document.querySelectorAll(`a.active`);
        const allArticles = document.querySelectorAll(`article`);
        let filtredLinksIndexs = [];

        for (let activeLink of activeLinks) {
            activeLink.classList.remove(`active`);
        }

        for (let article of allArticles) {
            const articleAuthor = article.querySelector(optArticleAuthorSelector).getAttribute(`data-author`);

            if (author === articleAuthor) {
                const linkIndex = article.getAttribute(`id`);
                filtredLinksIndexs.push(linkIndex);
            }

        }

        generateTitleLinks(filtredLinksIndexs);
    };

    const addClickListenersToAuthors = function () {
        const tagsWrappers = document.querySelectorAll(optArticleAuthorSelector);

        for (let tag of tagsWrappers) {
            const links = tag.querySelectorAll(`a`);

            for (let link of links) {
                link.addEventListener(`click`, authorClickHandler);
            }
        }

    };

    addClickListenersToAuthors();

    const generateTagsLinks = function () {

        let allTags = [],
            html = ``;
        const allArticles = document.querySelectorAll(`article`);
        const tagsWrapper = document.querySelector(optTagsListSelector);

        for (let article of allArticles) {
            const articleTags = article.getAttribute(`data-tags`);
            const articleTagsArray = articleTags.split(` `);

            for (let tag of articleTagsArray) {
                const isTagExist = allTags.some(value => value == tag ? true : false);
                if (!isTagExist) {
                    allTags.push(tag);
                }
            }

        }

        for (let tag of allTags) {
            html = html + '<li><a href="#">' + tag + '</a></li>';
        }

        tagsWrapper.insertAdjacentHTML(`beforeend`, html);
    };


    generateTagsLinks();

}