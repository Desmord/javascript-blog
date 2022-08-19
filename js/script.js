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


    const opt = {
        articleSelector: '.post',
        titleSelector: '.post-title',
        titleListSelector: '.titles',
        articleTagsSelector: '.post-tags .list',
        tagsListSelector: '.tags.list',
        articleAuthorSelector: `.post-author`,
        authorListSelector: '.list.authors',
        cloudClassPrefi: 'font-size-',
    };

    const generateTitleLinks = function (filtredLinksId) {

        const titleList = document.querySelector(opt.titleListSelector);
        titleList.innerHTML = ``;


        const articles = document.querySelectorAll(opt.articleSelector);
        for (let article of articles) {
            const articleId = article.getAttribute(`id`);
            const articleTitle = article.querySelector(opt.titleSelector).innerHTML;
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
        const articles = document.querySelectorAll(opt.articleSelector);


        for (let article of articles) {
            const tagsWrapper = article.querySelector(opt.articleTagsSelector);
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
        const tagsWrappers = document.querySelectorAll(opt.articleTagsSelector);

        for (let tag of tagsWrappers) {
            const links = tag.querySelectorAll(`li`);

            for (let link of links) {
                link.addEventListener(`click`, tagClickHandler);
            }
        }

        const tagsSectionlWrapper = document.querySelector(opt.tagsListSelector);
        const tagsLink = tagsSectionlWrapper.querySelectorAll(`li`);

        for (let link of tagsLink) {
            link.addEventListener(`click`, tagClickHandler);
        }

    };

    const generateAuthors = function () {
        const articles = document.querySelectorAll(opt.articleSelector);


        for (let article of articles) {
            const tagsWrapper = article.querySelector(opt.articleAuthorSelector);
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
            const articleAuthor = article.querySelector(opt.articleAuthorSelector).getAttribute(`data-author`);

            if (author === articleAuthor) {
                const linkIndex = article.getAttribute(`id`);
                filtredLinksIndexs.push(linkIndex);
            }

        }

        generateTitleLinks(filtredLinksIndexs);

    };

    const addClickListenersToAuthors = function () {
        const authorWrappers = document.querySelectorAll(opt.articleAuthorSelector);

        for (let author of authorWrappers) {
            const links = author.querySelectorAll(`a`);

            for (let link of links) {
                link.addEventListener(`click`, authorClickHandler);
            }
        }

        const authorSectionWrapper = document.querySelector(opt.authorListSelector).querySelectorAll(`li`);

        for (let author of authorSectionWrapper) {
            const links = author.querySelectorAll(`a`);

            for (let link of links) {
                link.addEventListener(`click`, authorClickHandler);
            }
        }

    };



    const calculateTagsParams = function (tags) {
        let params = {
            max: 0,
            min: 999999,
        };

        for (let tag in tags) {
            params.max = tags[tag] > params.max ? tags[tag] : params.max;
            params.min = tags[tag] < params.min ? tags[tag] : params.min;
        }

        return params;
    };

    const getTagLinkSizeClass = function (tag, params) {
        const tagNumberMoreThenMininum = tag - params.min;
        const paramsNumberRange = params.max - params.min;
        let tagRange = 0;

        if (tagNumberMoreThenMininum === 0) {
            tagRange = 0;
        } else if (tagNumberMoreThenMininum === paramsNumberRange) {
            tagRange = 1;
        } else {
            tagRange = tagNumberMoreThenMininum / paramsNumberRange;
        }


        if (tagRange >= 0.8) {
            return 5;
        } else if (tagRange >= 0.6) {
            return 4;
        } else if (tagRange >= 0.4) {
            return 3;
        } else if (tagRange >= 0.2) {
            return 2;
        } else {
            return 1;
        }

    };

    const generateTagsLinks = function () {

        let allTags = {};
        const allArticles = document.querySelectorAll(`article`);
        const tagsWrapper = document.querySelector(opt.tagsListSelector);

        for (let article of allArticles) {
            const articleTags = article.getAttribute(`data-tags`);
            const articleTagsArray = articleTags.split(` `);

            for (let tag of articleTagsArray) {

                if (!allTags[tag]) {
                    allTags[tag] = 1;
                } else {
                    allTags[tag]++;
                }

            }

        }

        const tagsParams = calculateTagsParams(allTags);
        let html = ``;

        for (let tag in allTags) {
            html = html + '<li><a href="#tag-' + tag + '" class="' + opt.cloudClassPrefi + '' + getTagLinkSizeClass(allTags[tag], tagsParams) + ' cloud">' + tag + '</a></li>';
        }

        tagsWrapper.insertAdjacentHTML(`beforeend`, html);
    };


    generateTagsLinks();
    addClickListenersToTags();

    const generateAuthorLinks = function () {

        let allAuthors = {};
        const allArticles = document.querySelectorAll(`article`);
        const authorWrapper = document.querySelector(opt.authorListSelector);

        for (let article of allArticles) {
            const articleAuthor = article.querySelector(`.post-author`).getAttribute(`data-author`);

            if (!allAuthors[articleAuthor]) {
                allAuthors[articleAuthor] = 1;
            } else {
                allAuthors[articleAuthor]++;
            }

        }

        const authorParams = calculateTagsParams(allAuthors);
        let html = ``;

        for (let author in allAuthors) {
            html += '<li><a href="#author-' + author + '" class="' + opt.cloudClassPrefi + '' + getTagLinkSizeClass(allAuthors[author], authorParams) + ' cloud">' + author + '</a></li>';
        }

        authorWrapper.insertAdjacentHTML(`beforeend`, html);
    };


    generateAuthorLinks();
    addClickListenersToAuthors();

}