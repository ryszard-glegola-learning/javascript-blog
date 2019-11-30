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
		    console.log('clickedElement:',clickedElement);
		    clickedElement.classList.add('active');
		    console.log('Article link' + clickedElement + ' is now active!');  // Do wykomentowania

		  /* [DONE] remove class 'active' from all articles */
		  	console.log('Any articles to deactivate?');
			const activeArticles = document.querySelectorAll('.posts article.active');
			for(let activeArticle of activeArticles){
			  activeArticle.classList.remove('active');
			  console.log('Article deactivated!',activeArticle);
			}  

		  /* [DONE] get 'href' attribute from the clicked link */
		 //  	console.log('Tip: clickedElement is ',clickedElement);
		  	const hrefAttributeClicked = clickedElement.getAttribute('href');
		 // 	console.log('hrefAttributeClicked is ',hrefAttributeClicked);

		  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
		  	const targetArticle = document.querySelector(hrefAttributeClicked)
		  	console.log('targetArticle is ',targetArticle);

		  /* [DONE] add class 'active' to the correct article */
		  	targetArticle.classList.add('active');

		console.log(' ... ');
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

		console.log('== gTL STARTS ==');

	  	/* [DONE] remove contents of titleList */
		  	const titleList = document.querySelector(optTitleListSelector);
			titleList.innerHTML = ''; 

	  	/* [IN PROGRESS] for each article */
			const articles = document.querySelectorAll(optArticleSelector);
			for(let article of articles){
			
			/* [DONE] get the article id */
			  	const articleId = article.getAttribute('id');
			  	// console.log('Article id ' + articleId + ' is: ',article);  

			/* [DONE] find the title element */
			/* [DONE] ... and get the title from the title element */
				const articleTitle = article.querySelector(optTitleSelector).innerHTML;

			/* [DONE] create HTML of the link */
				const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
				console.log('linkHTML ' + articleId + ' is ' + linkHTML);

			/* [IN PROGRESS] insert link into titleList */
				var htmlArticleList = titleList.innerHTML;
				htmlArticleList.insertAdjacentHTML('afterend', linkHTML);

		//	linkHTML.insertAdjacentHTML('afterend', linkHTML);
			}
		console.log('== gTL ENDED ==');
	}

	generateTitleLinks();
	console.log('== RUN ENDED ==');
}