{
  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    // console.log('clickedElement:',clickedElement);
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');
    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const hrefAttributeClicked = clickedElement.getAttribute('href');

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(hrefAttributeClicked);
    // console.log('targetArticle is ',targetArticle);

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');

    // console.log(' ... ');
  }; // Why the semicolon? Because it's a constant, not a function!

  /* script 'settings' in constants - good practice */
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagListSelector = '.post-tags .list',
    optArticleTagSelector = '.post-tags .list a';

  function generateTitleLinks(customSelector = ''){

    console.log('customSelector + optArticleSelector: ', optArticleSelector + customSelector);

    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    let articlesListHTML = document.getElementById('articles-list');

    /* [DONE] for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    for(let article of articles){

      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');

      /* [DONE] find the title element */
      /* [DONE] ... and get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* [DONE] create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      // console.log('linkHTML ' + articleId + ' is ' + linkHTML);

      /* [DONE] insert link into titleList */
      articlesListHTML.insertAdjacentHTML('beforeend', linkHTML);
      // console.log(articleId + ' articlesListHTML is ', articlesListHTML);
      // console.log(articleId + ' titleList.innerHTML is ', titleList.innerHTML);
      // console.log('## LOOP END ##');
    }

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
    // console.log('== gTL ENDED ==');
  }

  generateTitleLinks();

  function generateTags(){
    // console.log('== genTags STARTS ==');
    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    // console.log('articles: ', articles);

    /* [DONE] START LOOP: for every article: */
    for(let article of articles){

      /* [DONE] find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagListSelector);
      // console.log('tagsWrapper: ', tagsWrapper);

      /* [DONE] make html variable with empty string */
      let tagHTML = '';

      /* [DONE] get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      // console.log('TAG! articleTags holds: ', articleTags);

      /* [DONE] split tags into array */
      const articleTagsArray = articleTags.split(' ');

      /* [DONE] START LOOP: for each tag */
      for(let tag of articleTagsArray){
        // console.log('TAG: ',tag);
        /* [DONE] generate HTML of the link */
        tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';
        // console.log('tagHTML: ', tagHTML);
        tagsWrapper.insertAdjacentHTML('beforeend', tagHTML);
        /* [DONE] END LOOP: for each tag */
      }

      /* [DONE ABOVE USING insertAdjacentHTML] insert HTML of all the links into the tags wrapper */
      // console.log('tagsWrapper: ', tagsWrapper);
      /* [DONE] END LOOP: for every article: */
      // console.log('= for each article loop ENDS =');
    }
    // console.log('== genTags ENDS ==');
  }

  generateTags();

/* ############################################### */

  function tagClickHandler(event){
  /* [DONE] prevent default action for this event */
    event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    // debugger;

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    // console.log('href: ',href);

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

  /* [IN PROGRESS] find all tag links with class active */
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* [DONE] START LOOP: for each active tag link */
    for(let activeTagLink of activeTagLinks){

    /* [DONE] remove class active */
      activeTagLink.classList.remove('active');

  /* [DONE] END LOOP: for each active tag link */
    }

  /* find all tag links with "href" attribute equal to the "href" constant */
    const hrefTagLink = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
    for(let tagLink of hrefTagLink){
    /* add class active */
      tagLink.classList.add('active');
  /* END LOOP: for each found tag link */
    }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags(){
    /* find all links to tags */
    const links = document.querySelectorAll(optArticleTagSelector);

   /* START LOOP: for each link */
    for(let link of links){

  /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
    }
  }

  addClickListenersToTags();
}
