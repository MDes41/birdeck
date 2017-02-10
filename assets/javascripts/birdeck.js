var API= 'http://localhost:3000';

$(document).ready(function(){
	var latest_post = document.getElementById('latest-posts');

	var createPost = function(data) {
		var paragraph = document.createElement('p');
		paragraph.className = 'post';
		var node = document.createTextNode(data.id + '- ' + data.description)
		paragraph.appendChild(node)
		return paragraph
	}

	var clearPosts = function() {
		var paras = document.getElementsByClassName('post');
		while(paras[0]){
			paras[0].parentNode.removeChild(paras[0])
		}
	}

	var getPosts = function(){
		clearPosts();
		return $.ajax({
			url: API + '/api/v1/posts',
			method: 'get',
		}).done(function(data){
			for(var i=0; i< data.length; i++) {
				latest_post.appendChild(createPost(data[i]));
			}
		}).fail(function(error){
			console.error(err);
		});
	};


	var showPost = function(){
		var input = document.getElementById('show-form-input').value;
		clearPosts();
		return $.ajax({
			url: API + '/api/v1/posts/' + input,
			method: 'get'
		}).done(function(data){
			var paragraph = createPost(data)
			latest_post.appendChild(paragraph);
		}).fail(function(error){
			console.error(err);
		});
	}

	var getPost = function() {
		var input = document.getElementById('post-input').value;
		clearPosts();
		return $.ajax({
			url: API + '/api/v1/posts',
			type: 'post',
			data: {post: {description: input} }
		}).done(function(data){
			var paragraph = createPost(data)
			latest_post.appendChild(paragraph)
		}).fail(function(error){
			console.error(err);
		})
	}

	var getUpdate = function() {
		var inputId = document.getElementById('update-id').value;
		var inputDescription = document.getElementById('update-description').value;
		clearPosts();
		return $.ajax({
			url: API + '/api/v1/posts/' + inputId,
			method: 'post',
			data: { _method: 'PATCH', post: {description: inputDescription} }
		}).done(function(data){
			latest_post.appendChild(createPost(data))
		}).fail(function(error){
			console.error(err);
		})
	}

		var getDelete = function() {
		var inputId = document.getElementById('delete-id').value;
		clearPosts();
		return $.ajax({
			url: API + '/api/v1/posts/' + inputId,
			method: 'post',
			data: { _method: 'delete' }
		}).done(function(data){
			getPosts();
		}).fail(function(error){
			console.error(err);
		})
	}


	document.getElementById('delete-submit').addEventListener('click', getDelete)
	document.getElementById('post-submit').addEventListener('click', getPost)
	document.getElementById('update-submit').addEventListener('click', getUpdate)
	document.getElementById('button-fetch').addEventListener('click', getPosts)
	document.getElementById("show-form-submit").addEventListener("click", showPost)

  // #tabs for CRUD actions activated
  $( "#tabs" ).tabs();

  // general form submission prevention
  $('form').on('submit', function(event){
    event.preventDefault();
  });
});
