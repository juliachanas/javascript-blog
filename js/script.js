'use strict';

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

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list';

function generateTitileLinks(customSelector = '') {
  console.log('custom selector ' + customSelector);

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* [DONE] find all the articles and save them to variable: articles*/

  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );
  console.log(optArticleSelector + customSelector);

  /* for each article */

  let html = '';

  for (let article of articles) {
    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');
    //console.log('article ID: ' + articleId);

    /* [DONE] find the title element */ /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    //console.log('articleTitle' + articleTitle);

    /* [DONE]create HTML of the link */
    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      '</span></a></li>';
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

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  console.log('allTags' + allTags);

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  /* START LOOP: for every article: */

  for (let article of articles) {
    /* find tags wrapper */

    const wrappTags = article.querySelector(optArticleTagsSelector);
    console.log('WRAPPERS ' + wrappTags);

    /* make html variable with empty string */

    let html = '';
    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    console.log('articleTags ' + articleTags);

    /*split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log('articleTagsArray ' + articleTagsArray);

    /* START LOOP: for each tag */

    for (let tag of articleTagsArray) {
      console.log('tag ' + tag);

      /* generate HTML of the link */

      const linkHTML =
        '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      console.log('LINKHTML ' + linkHTML);

      /* add generated code to html variable */

      html = html + linkHTML;
      console.log('html ' + html);

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        /* jesli nie - negacja - jesli alltags nie ma klucza tag */
        //[NEW] add tag to allTags object
        allTags[tag] = 1;
      } else {
        allTags[tag]++; /* ++ inkrementacja - zwieksza liczbe o 1 */
      }
    }
    console.log('alltags ' + allTags);
    /* insert HTML of all the links into the tags wrapper */
    wrappTags.innerHTML = html;
  }
  // [NEW] find list of tags in right column
  const tagList = document.querySelector(optTagsListSelector);
  console.log('taglist ' + tagList);

  // [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  // [NEW] START LOOP: for each tag in allTags:
  for (let tag in allTags) {
    // [NEW] generate code of a link and add it to allTagsHTML
    /*allTagsHTML +=
      '<li><a href="#tag-' +
      tag +
      ' (' +
      allTags[tag] +
      ')</a></li>'; */ /*doklejenie kolejnego linka do zmiennej */
    allTagsHTML += '<a href="#tag-' + tag + ' (' + allTags[tag] + ')</a>'; // <a href="#tag-kot"> kot (3) </a>
  }

  console.log('All ' + allTagsHTML);
  // [NEW] END LOOP

  // [NEW] add HTML from allTagsHTML to tagList
  tagList.innerHTML = allTagsHTML;
  //console.log('TAGLIST' + tagList);
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
  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);
  //console.log(articles);

  /* START LOOP: for every article: */

  for (let article of articles) {
    /* find tags wrapper */

    const wrappAuthor = article.querySelector(optArticleAuthorSelector);
    /*console.log(wrappAuthor);

    /* get tags from data-author attribute */

    const articleAuthor = article.getAttribute('data-author');
    /*console.log('articleAuthor ' + articleAuthor);

    /* generate HTML of the link */

    const linkHTML =
      '<a href="#author-' +
      articleAuthor +
      '"><span>' +
      articleAuthor +
      '</span></a>';
    /*console.log(linkHTML);

    /* insert HTML of all the links into the tags wrapper */

    wrappAuthor.innerHTML = linkHTML;
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
