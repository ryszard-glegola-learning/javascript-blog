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

		  /* [IN PROGRESS] add class 'active' to the correct article */
		  	targetArticle.classList.add('active');

		console.log('== RUN ENDED ==');
	}

	const links = document.querySelectorAll('.titles a');

	for(let link of links){
	  link.addEventListener('click', titleClickHandler);
	}
}