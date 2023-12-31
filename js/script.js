'use strict';

const opts = {
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  articleTagsSelector: '.post-tags .list',
  articleAuthorSelector: '.post-author',
  tagsListSelector: '.tags.list',
  cloudClassCount: 4,
  cloudClassPrefix: 'tag-size-',
  authorListSelector: '.authors.list',
};

const templates = {
  articleLink: Handlebars.compile(
    document.querySelector('#template-article-link').innerHTML
  ),
  tagLink: Handlebars.compile(
    document.querySelector('#template-tag-link').innerHTML
  ),
  authorLink: Handlebars.compile(
    document.querySelector('#template-author-link').innerHTML
  ),
  tagCloudLink: Handlebars.compile(
    document.querySelector('#template-tag-cloud-link').innerHTML
  ),
  authorCloudLink: Handlebars.compile(
    document.querySelector('#template-author-cloud-link').innerHTML
  ),
};

/*document.getElementById('test-button').addEventListener('click', function () {
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
});*/

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  //console.log('clickedElement (with plus): ' + clickedElement);

  //console.log('Link was clicked!');
  //console.log(event);

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');
  //console.log('clickedElement:', clickedElement);

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.post.active');
  //console.log(activeArticles);

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  //console.log('article selector: ' + articleSelector);

  /* [DONE]  using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  //console.log('target article: ' + targetArticle);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');
  // console.log('ACTIVE ARTICLE:', targetArticle);
};

function generateTitileLinks(customSelector = '') {
  console.log(`custom selector ${customSelector}`);

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(opts.titleListSelector);
  titleList.innerHTML = '';

  /* [DONE] find all the articles and save them to variable: articles*/

  const articles = document.querySelectorAll(
    opts.articleSelector + customSelector
  );
  console.log(opts.articleSelector + customSelector);

  /* for each article */

  let html = '';

  for (let article of articles) {
    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');
    //console.log('article ID: ' + articleId);

    /* [DONE] find the title element */ /* get the title from the title element */
    const articleTitle = article.querySelector(opts.titleSelector).innerHTML;
    //console.log('articleTitle' + articleTitle);

    /* [DONE]create HTML of the link */
    //const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);

    //console.log(linkHTML);

    /* [DONE] insert link into titleList */

    //titleList.insertAdjacentHTML('beforeend', linkHTML); //titleList.innerHTML = titleList.innerHTML + linkHTML; - MOZNA TEZ TAK
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  //console.log(html);

  const links = document.querySelectorAll('.titles a');
  //console.log('linki ' + links);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitileLinks();

function calculateTagsParams(allTags) {
  const params = { min: 999999, max: 0 };

  for (let tag in allTags) {
    //console.log(tag + ' is used ' + allTags[tag] + ' times');

    if (allTags[tag] > params.max) {
      params.max = allTags[tag];
    }

    if (allTags[tag] < params.min) {
      params.min = allTags[tag];
    }
  }
  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (opts.cloudClassCount - 1) + 1);
  return opts.cloudClassPrefix + classNumber;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  //console.log(allTags);

  /* find all articles */
  const articles = document.querySelectorAll(opts.articleSelector);
  //console.log(articles);

  /* START LOOP: for every article: */

  for (let article of articles) {
    /* find tags wrapper */
    const wrappTags = article.querySelector(opts.articleTagsSelector);
    //console.log('WRAPPERS ' + wrappTags);

    /* make html variable with empty string */

    let html = '';
    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    //console.log('articleTags ' + articleTags);

    /*split tags into array */
    const articleTagsArray = articleTags.split(' ');
    //console.log('articleTagsArray ' + articleTagsArray);

    /* START LOOP: for each tag */

    for (let tag of articleTagsArray) {
      // console.log('tag ' + tag);

      /* generate HTML of the link */

      //const linkHTML =
      //  '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';

      //const linkHTML = `<li><a href="#tag-${tag}"><span>${tag}</span></a></li>`;
      //console.log('LINKHTML ' + linkHTML);
      const linkHTMLData = { tag };
      const linkHTML = templates.tagLink(linkHTMLData);
      console.log(linkHTML);

      /* add generated code to html variable */

      html = html + linkHTML;
      //console.log('html ' + html);

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        /* jesli nie - negacja - jesli alltags nie ma klucza tag */
        //[NEW] add tag to allTags object
        allTags[tag] = 1;
      } else {
        allTags[tag]++; /* ++ inkrementacja - zwieksza liczbe o 1 */
      }
    }
    //console.log('alltags ' + allTags);
    /* insert HTML of all the links into the tags wrapper */
    wrappTags.innerHTML = html;
  }
  // [NEW] find list of tags in right column
  const tagList = document.querySelector(opts.tagsListSelector);
  console.log(tagList);

  const tagsParams = calculateTagsParams(allTags);
  //console.log('tagsParams: ', tagsParams);

  // [NEW] create variable for all links HTML code */
  //let allTagsHTML = '';
  const allTagsData = { tags: [] };

  // [NEW] START LOOP: for each tag in allTags:
  for (let tag in allTags) {
    // [NEW] generate code of a link and add it to allTagsHTML
    /*allTagsHTML +=
      '<li><a href="#tag-' +
      tag +
      ' (' +
      allTags[tag] +
      ')</a></li>'; */ /*doklejenie kolejnego linka do zmiennej */
    //allTagsHTML +='<li><a href="#tag-' +tag + '">' + tag + ' (' + allTags[tag] + ')</a></li>'; // <a href="#tag-kot"> kot (3) </a>
    //allTagsHTML += `<li><a href="#tag-${tag}" class="${calculateTagClass(allTags[tag], tagsParams)}">${tag}</a></li>`; // wesola tworczosc

    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams),
    });
  }

  //console.log('All ' + allTagsHTML);
  // [NEW] END LOOP

  // [NEW] add HTML from allTagsHTML to tagList
  //tagList.innerHTML = allTagsHTML;
  //console.log('TAGLIST' + tagList);
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log(tagList.innerHTML);
}

generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /*console.log('tagselector ' + href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /*console.log('tag: ' + tag);

  /* find all tag links with class active */

  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks) {
    /* remove class active */
    activeTagLink.classList.remove('active');
  }
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */

  const tagLinks = document.querySelectorAll(
    '.list-horizontal a[href="' + href + '"]'
  );

  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    /* add class active */
    tagLink.classList.add('active');
  }

  /* END LOOP: for each found tag link */
  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitileLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const links = document.querySelectorAll('[href^="#tag-"]');
  /*console.log(links);
  /* START LOOP: for each link */

  for (let link of links) {
    link.addEventListener('click', tagClickHandler);
  }
  /* add tagClickHandler as event listener for that link */
  /* END LOOP: for each link */
}

addClickListenersToTags();

function generateAuthors() {
  // new object

  let allAuthors = {};
  console.log(allAuthors);

  /* find all articles */
  const articles = document.querySelectorAll(opts.articleSelector);
  //console.log(articles);

  /* START LOOP: for every article: */

  for (let article of articles) {
    /* find tags wrapper */

    const wrappAuthor = article.querySelector(opts.articleAuthorSelector);
    //console.log(wrappAuthor);

    /* get tags from data-author attribute */

    const articleAuthor = article.getAttribute('data-author');
    //console.log('articleAuthor ' + articleAuthor);

    /* generate HTML of the link */
    //const linkHTML = `<a href="#author-${articleAuthor}"><span>${articleAuthor}</span></a>`;
    const linkHTMLData = { author: articleAuthor };
    const linkHTML = templates.authorLink(linkHTMLData);
    //console.log('link: ' + linkHTML);

    /* [NEW] check if this link is NOT already in allAuthors */
    if (!allAuthors[articleAuthor]) {
      /* jesli nie - negacja - jesli allAuthors nie ma klucza articleAuthor */
      //[NEW] add articleAuthor to allAuthors object
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++; /* ++ inkrementacja - zwieksza liczbe o 1 */
    }
    //console.log(allAuthors);

    /* insert HTML of all the links into the tags wrapper */
    wrappAuthor.innerHTML = linkHTML;

    // [NEW] find list of authors in right column
    const authorsList = document.querySelector(opts.authorListSelector);
    console.log(authorsList);

    // [NEW] create variable for all links HTML code */
    //let allAuthorsHTML = '';
    const allAuthorsData = { authors: [] };

    // [NEW] START LOOP: for each tag in allAuthors:
    for (let author in allAuthors) {
      // [NEW] generate code of a link and add it to allAuthorsHTML

      //allTagsHTML +='<li><a href="#tag-' +tag + '">' + tag + ' (' + allTags[tag] + ')</a></li>'; // <a href="#tag-kot"> kot (3) </a>
      //allAuthorsHTML += `<li><a href="#author-${author}">${author}(${allAuthors[author]})</a></li>`; // wesola tworczosc
      allAuthorsData.authors.push({
        author: author,
        count: allAuthors[author],
      });
    }

    authorsList.innerHTML = templates.authorCloudLink(allAuthorsData);
    //console.log(allAuthorsData);
  }
}

generateAuthors();

function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /*console.log('author href ' + href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');
  /*console.log('author: ' + author);

  /* find all tag links with class active */

  const activeAuthorLinks = document.querySelectorAll('.post-author a.active');

  /* START LOOP: for each active tag link */
  for (let activeAuthorLink of activeAuthorLinks) {
    /* remove class active */
    activeAuthorLink.classList.remove('active');
  }
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */

  const authorLinks = document.querySelectorAll(
    '.post-author a[href="' + href + '"]'
  );

  /* START LOOP: for each found tag link */
  for (let authorLink of authorLinks) {
    /* add class active */
    authorLink.classList.add('active');
  }

  /* END LOOP: for each found tag link */
  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitileLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  /* find all links to authors */
  const links = document.querySelectorAll('[href^="#author-"]');
  /*console.log(links);
  /* START LOOP: for each link */

  for (let link of links) {
    link.addEventListener('click', authorClickHandler);
  }
  /* add tagClickHandler as event listener for that link */
  /* END LOOP: for each link */
}

addClickListenersToAuthors();
