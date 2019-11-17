const titleClickHandler = function(event){
  	console.log('Link was clicked!',event);  // Do wykomentowania

  /* [DONE] remove class 'active' from all article links  */

	const activeLinks = document.querySelectorAll('.titles a.active');
	for(let activeLink of activeLinks){
	  activeLink.classList.remove('active');
	}

  /* [DONE] add class 'active' to the clicked link */
	
	event.preventDefault();
	const clickedElement = this;
    console.log('clickedElement:',clickedElement);
    clickedElement.classList.add('active');
    console.log('Article link' + clickedElement + ' is now active!');  // Do wykomentowania

  /* [DONE] remove class 'active' from all articles */

	const activeArticles = document.querySelectorAll('.posts article.active');
	for(let activeArticle of activeArticles){
	  activeArticle.classList.remove('active');
	  console.log('Article deactivated!',activeArticle);
	}  

  /* get 'href' attribute from the clicked link */

  /* find the correct article using the selector (value of 'href' attribute) */

  /* add class 'active' to the correct article */

}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}