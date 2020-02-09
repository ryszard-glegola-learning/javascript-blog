{

  /* ################ SETTINGS ################ */

  const opts = {
    tagSizes: {
      count: 5,
      classPrefix: 'tag-size',
    },
  };

  const select = {
    all: {
      articles: '.post',
      linksTo: {
        tags: 'a[href^="#tag-"]',
        tagsActive: 'a.active[href^="#tag-"]',
        authors: 'a[href^="#author-"]',
        authorsActive: 'a.active[href^="#author-"]',
      },
    },
    article: {
      title: '.post-title',
      tags: '.post-tags .list',
      tagLink: '.post-tags .list a',
      author: '.post-author',
      authorLink: '.post-author a',
    },
    listOf: {
      titles: '.titles',
      tags: '.tags',
      tagLink: '.tags a',
      authors: '.authors',
      authorLink: '.authors a'
    },
  };

  const templates = {
    articleLinkTpl: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),

    tagLinkTpl: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),

    authorLinkTpl: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    authorListLink: Handlebars.compile(document.querySelector('#template-author-list-link').innerHTML)
  }; // a semicolon, because this is a constant declaration

  /* ################ TITLES ################ */

  function showFilteredPostList() {
    let articlesListHeading = document.getElementById('articles-list-heading');
    const activeAuthorLinksCheck = document.querySelectorAll(select.all.linksTo.authorsActive);
    const activeTagLinksCheck = document.querySelectorAll(select.all.linksTo.tagsActive);
    if ((activeTagLinksCheck.length != 0) || (activeAuthorLinksCheck.length != 0)) {
      articlesListHeading.innerHTML = 'Filtered posts';}
  }

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
    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(hrefAttributeClicked);

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');

    /* [DONE] */
    showFilteredPostList();
  }

  function generateTitleLinks(customSelector = ''){
    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(select.listOf.titles);
    titleList.innerHTML = '';
    let articlesListHTML = document.getElementById('articles-list');

    /* [DONE] for each article */
    const articles = document.querySelectorAll(select.all.articles + customSelector);
    for(let article of articles){

      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');

      /* [DONE] find the title element */
      /* [DONE] ... and get the title from the title element */
      const articleTitle = article.querySelector(select.article.title).innerHTML;

      /* [DONE] create HTML of the link - implement Handlebars */
      /*
      // Old code:
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      // New code - using Handlebars:
      */
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLinkTpl(linkHTMLData);

      /* [DONE] insert link into titleList */
      articlesListHTML.insertAdjacentHTML('beforeend', linkHTML);
    }

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
    /* [DONE] Add a restore full menu link */
    articlesListHTML.insertAdjacentHTML('beforeend', '<a href="?">Full list...</a>');
  }

  generateTitleLinks();





  /* ################ TAGS ################ */

  function calculateTagsParams(allTagsObject) {
    const outputMinMaxObject = {min: null, max: null};
    for (let tagKey in allTagsObject){
      const tagCount = allTagsObject[tagKey];

      if(outputMinMaxObject.min == null && outputMinMaxObject.max == null) {
        outputMinMaxObject.min = tagCount;
        outputMinMaxObject.max = tagCount;
      }
      // szukamy min i max
      if(tagCount < outputMinMaxObject.min){
        outputMinMaxObject.min = tagCount;
      }
      if(tagCount > outputMinMaxObject.max){
        outputMinMaxObject.max = tagCount;
      }
    }
    // console.log('min: ',outputMinMaxObject.min,', max: ',outputMinMaxObject.max);
    return outputMinMaxObject; // Ha ha, bingo
  }


  function calculateTagClass(count, params){
    const tagCountSpan = params.max - params.min; // rozrzut liczebności tagów
    const tagClassIncrement = opts.tagSizes.count/tagCountSpan;
    // if (tagClassNo > opts.tagSizes.count) {tagClassNo = opts.tagSizes.count;}; // - zamiast tej linijki short if niżej;
    let tagClassNo = (opts.tagSizes.count < Math.round(count * tagClassIncrement)) ? opts.tagSizes.count : Math.round(count * tagClassIncrement);
    // if (tagClassNo == 0) {tagClassNo = 1} // - zamiast tej linijki short if niżej;
    const tagClass = opts.tagSizes.classPrefix + '-' + (tagClassNo ? tagClassNo : 1);
    return tagClass;
  }


  function generateTags(){
    /* [DONE IN TASK 2] create a new variable allTags with an empty object */
    let allTags = {};

    /* [DONE] find all articles */
    const articles = document.querySelectorAll(select.all.articles);

    /* [DONE] START LOOP: for every article: */
    for(let article of articles){

      /* [DONE] find tags wrapper */
      const tagsWrapper = article.querySelector(select.article.tags);

      /* [DONE] get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');

      /* [DONE] split tags into array */
      const articleTagsArray = articleTags.split(' ');

      /* [DONE] START LOOP: for each tag */
      for(let tag of articleTagsArray){
        /* [NEW] generate HTML of the tag link */
        /*
        // Old code:
        tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';
        // New code - using Handlebars:
        */
        const tagHTMLData = {tagTpl: tag};
        const tagHTML = templates.tagLinkTpl(tagHTMLData);

        /* [DONE USING insertAdjacentHTML] insert HTML of all the links into the tags wrapper */
        tagsWrapper.insertAdjacentHTML('beforeend', tagHTML);

        /* [DONE IN TASK 2] check if this link is NOT already in allTags */
        if(!allTags.hasOwnProperty(tag)){
          /* [DONE IN TASK 2] add generated code to allTags array */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
        /* [DONE] END LOOP: for each tag */
      }

      /* [DONE] END LOOP: for every article: */
    }

    /* [DONE IN TASK 2] find list of tags in right column */
    const tagList = document.querySelector('.tags');
    /* [DONE] find list of tags in right column */
    const tagsParams = calculateTagsParams(allTags);
    /* [NEW Handlebars] create variable for all links HTML code */
    // let allTagsHTML = '';
    /* [NEW Handlebars] initialise sorting */
    const allTagsData = {tags: []};
    const tagsAndTheirCount = [];
    function compareTagCounts(a, b){
      return b.tagCount - a.tagCount;
    }
    /* [DONE IN TASK 2] START LOOP: for each tag in the allTags object */
    for(let tag in allTags){
      let tagAndItsCount = {tagName: tag, tagCount: allTags[tag]};
      tagsAndTheirCount.push(tagAndItsCount);
    }
    tagsAndTheirCount.sort(compareTagCounts);
    for(let tag in tagsAndTheirCount){
      // console.log("tagsAndTheirCount[tag].tagName: ", tagsAndTheirCount[tag].tagName);
      // [DONE Handlebars]
      // allTagsHTML += tagLinkHTML;
      allTagsData.tags.push ({
        listTagTpl: tag,
        tagCountTpl: allTags[tagsAndTheirCount[tag].tagName],
        tagClassTpl: calculateTagClass(allTags[tagsAndTheirCount[tag].tagName], tagsParams),
        tagNameTpl: tagsAndTheirCount[tag].tagName
      });
      // console.log('allTagsData.tags: ',allTagsData.tags);
      // console.log('tagCountTpl', allTags[tagsAndTheirCount[tag].tagName]);
      // console.log(' ---- ')
    /* [DONE IN TASK 2] END LOOP: for each tag in the allTags object */
    }
    /* [NEW Handlebars] add html from allTagsHTML to tagList */
    tagList.innerHTML += templates.tagCloudLink(allTagsData);
  }


  function tagClickHandler(event){
    /* [DONE] prevent default action for this event */
    event.preventDefault();
    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    /* [DONE] find all tag links with class active */
    const activeTagLinks = document.querySelectorAll(select.all.linksTo.tagsActive);
    /* [DONE] START LOOP: for each active tag link */
    for(let activeTagLink of activeTagLinks){
    /* [DONE] remove class active */
      activeTagLink.classList.remove('active');
    /* [DONE] END LOOP: for each active tag link */
    }
    /* [DONE] If any authors are now shown active, deactivate them */
    const activeAuthorLinks = document.querySelectorAll(select.all.linksTo.authorsActive);
    for(let activeAuthorLink of activeAuthorLinks){
      activeAuthorLink.classList.remove('active');
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
    /* [DONE] */
    showFilteredPostList();
  }


  function addClickListenersToArticleTags(){
    /* find all links to tags under articles */
    const links = document.querySelectorAll(select.article.tagLink);
    /* START LOOP: for each link */
    for(let link of links){
    /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  }


  function addClickListenersToListTags(){
    /* find all links to tags under articles */
    const links = document.querySelectorAll(select.listOf.tagLink);
    /* START LOOP: for each link */
    for(let link of links){
    /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  }


  generateTags();
  addClickListenersToArticleTags();
  addClickListenersToListTags();





  /* ################ AUTHORS ################ */

  function generateAuthors(){
    /* [DONE IN TASK 2] create a new variable allAuthorsArticleCounts with an empty object */
    let allAuthorsArticleCounts = {};
    /* [DONE] find all articles */
    const articles = document.querySelectorAll(select.all.articles);
    /* [DONE] START LOOP: for every article: */
    for(let article of articles){
      /* [DONE] find author wrapper */
      const authorWrapper = article.querySelector(select.article.author);
      /* [DONE] get tags from data-authors attribute */
      const articleAuthor = article.getAttribute('data-author');
      /* [DONE] generate HTML of the link */
      const articleAuthorNoSpace = articleAuthor.replace(' ', '_');
      // authorWrapper.innerHTML = '<a href="#author-' + articleAuthorNoSpace + '">' + articleAuthor + '</a>';
      /* [DONE] generate HTML of the tag link */
      /*
      // Old code:
      authorWrapper.innerHTML = '<a href="#author-' + articleAuthorNoSpace + '">' + articleAuthor + '</a>'
      // New code - using Handlebars:
      */
      const authorHTMLData = {authorTpl: articleAuthor, authorNoSpaceTpl: articleAuthorNoSpace};
      const authorHTML = templates.authorLinkTpl(authorHTMLData);
      authorWrapper.insertAdjacentHTML('beforeend', authorHTML);

      /* [DONE IN TASK 2] check if this link is NOT already in allTags */
      if(!allAuthorsArticleCounts.hasOwnProperty(articleAuthorNoSpace)){
        /* [DONE IN TASK 2] add generated code to allAuthorsArticleCounts array */
        allAuthorsArticleCounts[articleAuthorNoSpace] = 1;
      } else {
        allAuthorsArticleCounts[articleAuthorNoSpace]++;
      }
      /* [DONE] END LOOP: for every article: */
    }
    /* [DONE IN TASK 2] find list of authors in right column */
    const authorList  = document.querySelector(select.listOf.authors);
    /* [DONE IN TASK 2] create variable for all links HTML code */
    // let allAuthorsHTML = '';
    const allAuthorsNames = {authors: []};
    // console.log('allAuthorsNames:', allAuthorsNames);
    /* [DONE IN TASK 2] START LOOP: for each authors in the allTags object */
    for(let author in allAuthorsArticleCounts){
      /* [DONE IN TASK 2] generate code of a long and add it to allTags */
      const authorWithSpace = author.replace('_', ' ');
      // allAuthorsHTML += '<li><a href="#author-' + author + '">' + authorWithSpace + '</a> (' + allAuthorsArticleCounts[author] + ') </li>';
      allAuthorsNames.authors.push ({
        authorNoSpaceTpl: author,
        authorNameTpl: authorWithSpace
      });
      /* [DONE IN TASK 2] END LOOP: for each authors in the allTags object */
    }
    /* [NEW Handlebars] add html from allAuthorsHTML to authorList */
    authorList.innerHTML = templates.authorListLink(allAuthorsNames);  // this works
  }


  function authorClickHandler(event){
    /* [DONE] prevent default action for this event */
    event.preventDefault();
    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* [DONE] make a new constant "articleAuthor" and extract author name from the "href" constant */
    const articleAuthor = href.replace('#author-', '').replace('_', ' ');
    /* [DONE] find all author links with class active */
    const activeAuthorLinks = document.querySelectorAll(select.all.linksTo.authorsActive);
    /* [DONE] START LOOP: for each active author link */
    for(let activeAuthorLink of activeAuthorLinks){
    /* [DONE] remove class active */
      activeAuthorLink.classList.remove('active');
    /* [DONE] END LOOP: for each active tag link */
    }
    /* [DONE] If any tags are now shown active, deactivate them */
    const activeTagLinks = document.querySelectorAll(select.all.linksTo.tagsActive);
    for(let activeTagLink of activeTagLinks){
      activeTagLink.classList.remove('active');
    }
    /* find all author links with "href" attribute equal to the "href" constant */
    const hrefAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found author link */
    for(let authorLink of hrefAuthorLinks){
    /* add class active */
      authorLink.classList.add('active');
    /* END LOOP: for each found author link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + articleAuthor + '"]');
    /* [DONE] */
    showFilteredPostList();
  }


  function addClickListenersToAuthor(authorLinkSelector){
    // selektor jako argument!
    /* find all links to authors */
    const links = document.querySelectorAll(authorLinkSelector);

    /* START LOOP: for each link */
    for(let link of links){
    /* add authorClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
    }
  }


  generateAuthors();
  addClickListenersToAuthor(select.article.authorLink);
  addClickListenersToAuthor(select.listOf.authorLink);
}

