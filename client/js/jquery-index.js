$(document).ready(function() {

  // $('.modal').modal();

  $.ajax({
    url  : "http://localhost:3000/questions",
    method : "GET",
    success: function(data) {
      if (localStorage.getItem("token")) {
        $('#login-or-logout').append(`<li class="navbar-rmv-hover"><a onclick="logOut()" class="waves-effect btn waves-light log-btn" style="background-color: rgb(255, 36, 108)">Logout</a></li>`)
        $('#create-question').append(`<li class="navbar-rmv-hover"><a onclick="logOut()" class="waves-effect btn log-btn">Create Question</a></li>`)

        var arrTemp = ""
        for (var i = 0; i < data.length; i++) {
          arrTemp += `
          <a href="#">
            <div class="card-content">
              <div class="row margin">

                <div class="col s9">
                  <h5 id="title-question-${data[i]._id}" class="option-show-title title-question">
                    ${data[i].title.slice(0, 75)}
                  </h5>
                  <p class="question-preview">${data[i].question.slice(0, 100)} ... <a>(read more)</a></p>
                </div>
              </div>

              <hr>

              <p>category : <span class="chip"> ${data[i].category}</span> </p>

              </div>
          </a>
          `
        }

        $('#questions-list').append(arrTemp)
      }
      else{
        $('#login-or-logout').append(`<li class="navbar-rmv-hover"><a onclick="logIn()" class="waves-effect btn waves-light log-btn" style="background-color: rgb(255, 36, 108)">Login</a></li>`)
        $('#header-text').append('<h3 id="options" class="center-align">LOGIN FIRST</h3>')
      }

    }
  })
})

function logIn() {
  localStorage.clear()
  window.location.href = 'http://127.0.0.1:8080/login.html'
}

function logOut() {
  localStorage.clear()
  window.location.href = 'http://127.0.0.1:8080/login.html'
}
