const titleClickHandler = function(event){   
  
  // Dlaczego titleClickHandler jest stala?
  const clickedElement = this;
  console.log('Link was clicked!',event); 

  /* [DONE] remove class 'active' from all article links  */
	const activeLinks = document.querySelectorAll('.titles a.active');
	for(let activeLink of activeLinks){
	  activeLink.classList.remove('active');
	}

  /* [DONE] add class 'active' to the clicked link */
	// event.preventDefault();
    console.log('clickedElement:',clickedElement);
    clickedElement.classList.add('active');
    console.log('Article link ' + clickedElement + ' is now active!');  // Do wykomentowania

  /* [DONE] remove class 'active' from all articles */
	const activeArticles = document.querySelectorAll('.posts article.active');
	for(let activeArticle of activeArticles){
	  activeArticle.classList.remove('active');
	  // console.log('Article deactivated!',activeArticle);
	}  

  /* [DONE] get 'href' attribute from the clicked link */
  	const hrefAttributeClicked = clickedElement.getAttribute('href');
  	console.log('hrefAttributeClicked: ', hrefAttributeClicked); 

  /* find the correct article using the selector (value of 'href' attribute) */
  	const theArticleIamLookingFor = document.querySelector(hrefAttributeClicked);

  /* add class 'active' to the correct article */
   	theArticleIamLookingFor.classList.add('active');
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

/* script 'settings' in constants - good practice */
const optArticleSelector = '.post',
	  optTitleSelector = '.post-title',
	  optTitleListSelector = '.titles';

function generateTitleLinks(){

	/* remove contents of titleList */
	const titleList = document.querySelector(optTitleListSelector);

	// Dlaczego titleList to STALA, mimo ze potem zmieniamy jej wartosc?

	// console.log('titleList: ',titleList);  
	titleList.innerHTML = ''; // 

	/* for each article */
	const articles = document.querySelectorAll('.posts article.post');
	// console.log('articles: ',articles);  

  	let html = '';

	for(let article of articles){

		/* get the article id */
		// console.log('article: ',article); 
		const articleId = article.getAttribute('id');
		// console.log('articleId: ',articleId); 

		/* find the title element */
		/* get the title from the title element */
		const articleTitle = article.querySelector(optTitleSelector).innerHTML;
		// console.log('articleTitle: ',articleTitle); 

		/* create HTML of the link */
		const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
		// console.log('linkHTML: ',linkHTML);

		/* insert link into html variable */
		html = html + linkHTML;
		// console.log('html: ',html);
	}

 	titleList.innerHTML = html;

}

generateTitleLinks();