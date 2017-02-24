// template for login form
$(function() {

    $('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

});

function createUser(){
  $(document).ready(function(){
    $.ajax({
      url  : "http://localhost:3000/users/signup",
      type : "POST",
      data: {
        username: $('#signup-username').val(),
        password: $('#signup-password').val()
      },
      success: function(data) {
        console.log(data.err);
        if (data.err) {
          alert(data.err)
        }
        else {
          alert("Register success! Now Login!")
        }

      }
    })
  })
}

function login(){
    $.ajax({
      url  : "http://localhost:3000/users/login",
      type : "POST",
      data: {
        username: $('#signin-username').val(),
        password: $('#signin-password').val()
      },
      success: function(data) {
        if (data.err) {
          alert(data.err)
        }
        else {
          // console.log(data.token)
          localStorage.setItem("token", data.token)
          localStorage.setItem("username", data.username)

          window.location.href = 'http://127.0.0.1:8080/index.html'
        }
      }
    })
}
