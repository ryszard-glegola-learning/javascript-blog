{

  /* script 'settings' in constants - good practice */
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagListSelector = '.post-tags .list',
    optArticleTagSelector = '.post-tags .list a',
    optListTagSelector = '.tags a',
    optArticleAuthorSelector = '.post-author';

  /* ################ TITLES ################ */

  function titleClickHandler(event){
    event.preventDefault();
    const clickedElement = this;

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');
    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const hrefAttributeClicked = clickedElement.getAttribute('href');
    console.log('href: ', hrefAttributeClicked);
    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(hrefAttributeClicked);

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
  }

  function generateTitleLinks(customSelector = ''){

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

      /* [DONE] insert link into titleList */
      articlesListHTML.insertAdjacentHTML('beforeend', linkHTML);
    }

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  }

  generateTitleLinks();






  /* ################ TAGS ################ */

  function generateTags(){

    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

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

        /* [DONE USING insertAdjacentHTML] insert HTML of all the links into the tags wrapper */
        tagsWrapper.insertAdjacentHTML('beforeend', tagHTML);

        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags.hasOwnProperty(tag)){
          /* [NEW] add generated code to allTags array */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
        /* [DONE] END LOOP: for each tag */
      }

      /* [DONE] END LOOP: for every article: */
    }

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');

    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';
    /* [NEW] START LOOP: for each tag in the allTags object */
    for(let tag in allTags){
      /* [NEW] generate code of a long and add it to allTags */
      allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + '</a> +  (' + allTags[tag] + ') </li>'
    /* [NEW] END LOOP: for each tag in the allTags object */
    }
    /* [NEW] add html from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
  }

  function tagClickHandler(event){
  /* [DONE] prevent default action for this event */
    event.preventDefault();
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    // debugger;
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
  /* [DONE] find all tag links with class active */
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
    /* find all links to tags under articles */
    const links = document.querySelectorAll(optArticleTagSelector);

   /* START LOOP: for each link */
    for(let link of links){

  /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  }


  generateTags();
  addClickListenersToTags();








/* ################ AUTHORS ################ */

  function generateAuthors(){
    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    // console.log('articles: ', articles);

    /* [DONE] START LOOP: for every article: */
    for(let article of articles){

      /* [DONE] find author wrapper */
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      // console.log('. authorWrapper: ', authorWrapper);

      /* [DONE] make html variable with empty string */
      // let authorHTML = '';

      /* [DONE] get tags from data-tags attribute */
      const articleAuthor = article.getAttribute('data-author');
      // console.log('articleAuthor: ', articleAuthor);

      /* [DONE] generate HTML of the link */
      const articleAuthorNoSpace = articleAuthor.replace(' ', '_');
      authorWrapper.innerHTML = '<a href="#author-' + articleAuthorNoSpace + '">' + articleAuthor + '</a>';

      /* [DONE] END LOOP: for every article: */
    }
  }

  function authorClickHandler(event){
    /* [DONE] prevent default action for this event */
    event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    // const authorLink = clickedElement.innerHTML;
    console.log('clickedElement', clickedElement);
    // console.log('authorLink', authorLink);
    // debugger;

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
   const href = clickedElement.querySelector('a[href^="#author-"]').getAttribute('href');
   console.log('href: ', href);

  /* [DONE] make a new constant "articleAuthor" and extract author name from the "href" constant */
    const articleAuthor = href.replace('#author-', '').replace('_', ' ');
    console.log('articleAuthor: ', articleAuthor);

  /* [DONE] find all author links with class active */
    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');

  /* [DONE] START LOOP: for each active author link */
    for(let activeAuthorLink of activeAuthorLinks){

    /* [DONE] remove class active */
      activeAuthorLink.classList.remove('active');

  /* [DONE] END LOOP: for each active tag link */
    }

    console.log('href is still: ', href);
  /* find all author links with "href" attribute equal to the "href" constant */

    const hrefAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found author link */
    for(let authorLink of hrefAuthorLinks){
    /* add class active */
      authorLink.classList.add('active');
  /* END LOOP: for each found author link */
    }

    console.log('hrefAuthorLinks list: ', hrefAuthorLinks);

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + articleAuthor + '"]');
  }


  function addClickListenersToAuthor(){
    /* find all links to authors */
    const links = document.querySelectorAll(optArticleAuthorSelector);
    // console.log('links: ',links);

   /* START LOOP: for each link */
    for(let link of links){

    /* add authorClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);

    /* END LOOP: for each link */
    }
  }


  function addClickListenersToListTags(){
    /* find all links to tags under articles */
    const links = document.querySelectorAll(optListTagSelector);

   /* START LOOP: for each link */
    for(let link of links){

  /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  }

  generateAuthors();
  addClickListenersToAuthor();
  addClickListenersToListTags();

}
