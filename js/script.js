'use strict';

/*document.getElementById('test-button').addEventListener('click', function () {
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
});*/

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('clickedElement (with plus): ' + clickedElement);

  console.log('Link was clicked!');
  console.log(event);

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.post.active');
  console.log(activeArticles);

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log('article selector: ' + articleSelector);

  /* [DONE]  using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log('target article: ' + targetArticle);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');
  console.log('ACTIVE ARTICLE:', targetArticle);
};

const links = document.querySelectorAll('.titles a');

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

const generateTitileLinks = function () {
  console.log('bum');

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* [DONE] find all the articles and save them to variable: articles*/

  const articles = document.querySelectorAll(optArticleSelector);
  console.log('articles' + articles);

  /* for each article */

  for (let article of articles) {
    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');
    console.log('article ID: ' + articleId);

    /* [DONE] find the title element */ /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log('articleTitle' + articleTitle);

    /* [DONE]create HTML of the link */
    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      '</span></a></li>';
    console.log(linkHTML);

    /* [DONE] insert link into titleList */

    titleList.insertAdjacentHTML('beforeend', linkHTML); //titleList.innerHTML = titleList.innerHTML + linkHTML; - MOZNA TEZ TAK
  }
};

generateTitileLinks();
