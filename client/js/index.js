$(document).ready(function() {

    $.ajax({
        url: "http://localhost:3000/questions",
        method: "GET",
        success: function(data) {
            console.log(data);
            if (localStorage.getItem("token")) {
                $('#loginorlogout').append(`
          <button onclick="loginPage()" id="login-submit" tabindex="1" class="pull-xs-right form-control btn btn-outline-danger my-2 my-sm-0">Log out</button>
          `)
          $('.tronjumbo').append(`
              <div class="jumbotron vertical-center pagination-centered">
                  <div id="welcome" style="margin: auto">
                        <br><br><br>
                        <h8 class="display-4" style="color: white;"><b>Find new people. Discover new world.</b></h8>
                        <br><br><br>
                        <div class="col-2" style="margin: auto">
                          <button data-toggle="modal" data-target="#modal-create" id="login-submit" tabindex="1" class="form-control btn-main">Create</button>
                        </div>
                  </div>
                </div>`)
                // $('#create-question').append(`<button onclick="loginPage()" id="login-submit" tabindex="1" class="pull-xs-right form-control btn btn-outline-warning my-2 my-sm-0">Create New Thread</button>`)
                  var arrTemp = ""
                  for (var i = 0; i < data.length; i++) {
                    if (data[i].postedBy.username == localStorage.getItem("username") ) {
                    arrTemp += `
                    <div class="card">
                      <div class="card-block">

                        <h4 id="title-question-${data[i]._id}" class="card-title">${data[i].title.slice(0, 75)}</h4>
                        <p style="color: rgb(103, 103, 103)">posted by : ${data[i].postedBy.username}</p>
                        <div class="card">
                          <div class="card-block">
                            <h6 class="card-subtitle mb-2 text-muted">${data[i].question.slice(0, 200)} ... <a onclick="read('${data[i]._id}')">(read more)</a></h6>
                          </div>
                        </div>
                        <div class="container">
                          <div class="row">
                            <p>Category : <span class="badge badge-warning">${data[i].category}</span></p>
                            <p class="card-text"><small class="text-muted">Likes : ${data[i].upvote.length - data[i].downvote.length}</small></p>
                            <span></span>
                            <p class="card-text"><small class="text-muted">Reply : ${data[i].answers.length}</small></p>
                          </div>
                        </div>
                          <button class="btn btn-outline-danger" onclick="deleteQuestion('${data[i]._id}')">Delete</button>
                            <button class="btn btn-outline-warning" onclick="read('${data[i]._id}')">Read</button>
                        </div>
                      </div>
                    `
                    }
                    else {
                      arrTemp += `
                      <div class="card">
                        <div class="card-block">

                          <h4 id="title-question-${data[i]._id}" class="card-title">${data[i].title.slice(0, 75)}</h4>
                          <p style="color: rgb(103, 103, 103)">posted by : ${data[i].postedBy.username}</p>
                          <div class="card">
                            <div class="card-block">
                              <h6 class="card-subtitle mb-2 text-muted">${data[i].question.slice(0, 200)} ... <a onclick="read('${data[i]._id}')">(read more)</a></h6>
                            </div>
                          </div>
                          <div class="container">
                            <div class="row">
                              <p>Category : <span class="badge badge-warning">${data[i].category}</span></p>
                              <p class="card-text"><small class="text-muted">Likes : ${data[i].upvote.length - data[i].downvote.length}</small></p>
                              <span></span>
                              <p class="card-text"><small class="text-muted">Reply : ${data[i].answers.length}</small></p>
                            </div>
                          </div>
                            <button class="btn btn-outline-warning" onclick="read('${data[i]._id}')">Read</button>
                          </div>
                        </div>
                      `
                    }
                  }

                $('#questions-list').append(arrTemp)
            } else {
                $('.tronjumbo').append(`
          <div class="jumbotron vertical-center pagination-centered">
              <div id="welcome" style="margin: auto">
                    <br><br><br>
                    <h8 class="display-4" style="color: white;"><b>Find new people. Discover new world.</b></h8>
                    <br><br><br>
                    <div class="col-2" style="margin: auto">
                      <button onclick="loginPage()" id="login-submit" tabindex="1" class="form-control btn-main">Log in</button>
                    </div>
              </div>
            </div>`)

                $('#login-or-logout').append(`<li class="navbar-rmv-hover"><a onclick="logIn()" class="waves-effect btn waves-light log-btn" style="background-color: rgb(255, 36, 108;)">Login</a></li>`)
                $('#header-text').append('<h3 id="options" class="center-align" style="color: rgb(255, 36, 108)"><span style="color: white; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;">FullStuck</span> Overflow</h3>')
            }

        }
    })


})

function createQuestion() {
    $.ajax({
      url    : `http://localhost:3000/questions/create/${localStorage.getItem('username')}`,
      type   : "POST",
      data   : {
        title    : $('#add-title').val(),
        question : $('#add-question').val(),
        category : $('#add-category').val()
      },
      success: function(data) {
        if (data.postedBy.username == localStorage.getItem("username") ) {
          $('#questions-list').append(`
            <div class="card-block">

              <h4 id="title-question-${data._id}" class="card-title">${data.title.slice(0, 75)}</h4>
              <p style="color: rgb(103, 103, 103)">posted by : ${data.postedBy.username}</p>
              <div class="card">
                <div class="card-block">
                  <h6 class="card-subtitle mb-2 text-muted">${data.question.slice(0, 200)} ... <a onclick="read('${data[i]._id}')">(read more)</a></h6>
                </div>
              </div>
              <div class="container">
                <div class="row">
                  <p>Category : <span class="badge badge-warning">${data.category}</span></p>
                  <p class="card-text"><small class="text-muted">Likes : ${data.upvote.length - data.downvote.length}</small></p>
                  <span></span>
                  <p class="card-text"><small class="text-muted">Reply : ${data.answers.length}</small></p>
                </div>
              </div>
                <button class="btn btn-outline-danger" onclick="deleteQuestion('${data._id}')" >Delete</button>
                <button onclick="read('${data._id}')" class="btn btn-outline-warning">Read</button>
              </div>
            </div>

            `)
        }
        }
      })
    }

function deleteQuestion(id){
  $.ajax({
    url    : `http://localhost:3000/questions/delete/${id}`,
    type   : "Delete",
    success: function(data) {
      location.reload()
    }
  })
}
// function toQuestion(data) {
//   // console.log(data);
//   localStorage.setItem("questionId", data)
//   window.location.href = 'http://127.0.0.1:8080/question.html'
// }
// function logIn() {
//   localStorage.clear()
//   window.location.href = 'http://127.0.0.1:8080/login.html'
// }
//
function loginPage(){
  localStorage.clear()
  window.location.href = 'http://127.0.0.1:8080/login.html'
}
//
// function formReset() {
//   $('#form-delete').remove()
// }

$('#closemodal').click(function() {
    $('#modal-create').modal('hide');
});

function read(data) {
  // console.log(data);
  localStorage.setItem("questionId", data)
  window.location.href = 'http://127.0.0.1:8080/question.html'
}
