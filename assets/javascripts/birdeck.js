var API= 'http://localhost:3000';

$(document).ready(function(){

	var getPosts = function(){
		return $.ajax({
			url: API + '/api/v1/posts',
			method: 'get',
		}).done(function(data){
			for(var i=0; i< data.length; i++) {
				var paragraph = document.createElement('p');
				paragraph.className = 'post'
				var node = document.createTextNode(data[i].description);
				paragraph.appendChild(node);
				var latest_post = document.getElementById('latest-posts')
				latest_post.appendChild(paragraph);
			}
		}).fail(function(error){
			console.error(err);
		});
	};

	var showPost = function(){
		var latest_post = document.getElementById('latest-posts')
		var input = document.getElementById('show-form-input').value
		var paras = document.getElementsByClassName('post')
		while(paras[0]){
			paras[0].parentNode.removeChild(paras[0])
		}
		return $.ajax({
			url: API + '/api/v1/posts/' + input,
			method: 'get'
		}).done(function(data){
			var paragraph = document.createElement('p');
			paragraph.className = 'post'
			var node = document.createTextNode(data.description);
			paragraph.appendChild(node);
			latest_post.appendChild(paragraph);
		}).fail(function(error){
			console.error(err);
		});
	}
	document.getElementById('button-fetch').addEventListener('click', getPosts)
	document.getElementById("show-form-submit").addEventListener("click", showPost)

  // #tabs for CRUD actions activated
  $( "#tabs" ).tabs();

  // general form submission prevention
  $('form').on('submit', function(event){
    event.preventDefault();
  });
});
