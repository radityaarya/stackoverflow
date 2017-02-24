$.ajax({
      url    : `http://localhost:3000/questions/${localStorage.getItem('questionId')}`,
      method: "GET",
      success: function(data) {
        if (data[0].postedBy.username == localStorage.getItem("username") ) {
          $('#questions-list').append(`
            <div class="card">
            <div class="card-block">

              <h4 id="title-question-${data[0]._id}" class="card-title">${data[0].title}</h4>
              <p style="color: rgb(103, 103, 103)">posted by : ${data[0].postedBy.username}</p>
              <div class="card">
                <div class="card-block">
                  <h6 class="card-subtitle mb-2 text-muted">${data[0].question}</a></h6>
                </div>
              </div>
              <div class="container">
                <div class="row">
                  <p>Category : <span class="badge badge-warning">${data[0].category}</span></p>
                  <p id="upvoteQ-${data[0]._id}" class="card-text">Likes : ${data[0].upvote.length - data[0].downvote.length}</p>
                  <span></span>
                  <p class="card-text">Reply : ${data[0].answers.length}</p>
                </div>
              </div>
                <button onclick="upvoteQ('upvoteQ-${data[0]._id}')">Vote</button>
                <button data-target="#modal-reply" data-toggle="modal">Reply</button>
              </div>
            </div>
          `)

        }
        else{
          $('#questions-list').append(`
            <div class="card">
            <div class="card-block">

              <h4 id="title-question-${data[0]._id}" class="card-title">${data[0].title}</h4>
              <p style="color: rgb(103, 103, 103)">posted by : ${data[0].postedBy.username}</p>
              <div class="card">
                <div class="card-block">
                  <h6 class="card-subtitle mb-2 text-muted">${data[0].question}</a></h6>
                </div>
              </div>
              <div class="container">
                <div class="row">
                  <p>Category : <span class="badge badge-warning">${data[0].category}</span></p>
                  <p id="upvoteQ-${data[0]._id}" class="card-text">Likes : ${data[0].upvote.length - data[0].downvote.length}</p>
                  <span></span>
                  <p class="card-text">Reply : ${data[0].answers.length}</p>
                </div>
              </div>
                <button onclick="upvoteQ('upvoteQ-${data[0]._id}')">Vote</button>
                <button data-target="#modal-reply" data-toggle="modal">Reply</button>
              </div>
            </div>
          `)
        }
        var answer = ''
        for (var i = 0; i < data[0].answers.length; i++) {
          answer +=  `
                <div class="card">
                <div class="card-block">

                  <p style="color: rgb(103, 103, 103)">replied by : ${data[0].answers[i].postedBy.username}</p>
                  <div class="card">
                    <div class="card-block">
                      <h6 class="card-subtitle mb-2 text-muted">${data[0].answers[i].content}</a></h6>
                    </div>
                  </div>
                  <div class="container">
                    <div class="row">
                      <p id="upvoteA-${data[0].answers[i]._id}" class="card-text">Likes : ${data[0].answers[i].upvote.length - data[0].answers[i].downvote.length}</p>
                      <span></span>
                    </div>
                  </div>
                    <button onclick="upvoteA('${data[0].answers[i]._id}', 'upvoteA-${data[0].answers[i]._id}', '${[i]}')" >Vote</button>
                  </div>
                </div>`
        }
        $('#answer-list').append(answer)
      }
    })

    function createReply() {
      // console.log($('#reply-question').val());
        $.ajax({
          url    : `http://localhost:3000/questions/${localStorage.getItem('questionId')}/answer/${localStorage.getItem('username')}`,
          type   : "PUT",
          data   : {
            content : $('#reply-question').val()
          },
          success: function(data) {
            location.reload()
            }
            }
          )}

          function upvoteQ(id){
            $(document).ready(function() {
              $.ajax({
                url  : `http://localhost:3000/questions/${localStorage.getItem('questionId')}/upvoteq/${localStorage.getItem('username')}`,
                type : "PUT",
                success: function(data){
                  // console.log(data);
                  if (data.err) alert(data.err)
                  else {
                    document.querySelector(`#${id}`).innerHTML = `Likes : ${data.upvote.length}`
                  }
                }
              })
            })
          }

          function upvoteA(idAns, idUp, index){
            $(document).ready(function() {
              $.ajax({
                url  : `http://localhost:3000/questions/${localStorage.getItem('questionId')}/upvoteans/${idAns}/${localStorage.getItem('username')}`,
                type : "PUT",
                success: function(data){
                  // console.log(data);
                  if (data.err) alert(data.err)
                  else {
                    document.querySelector(`#${idUp}`).innerHTML = `Likes : ${data.answers[index].upvote.length}`
                  }
                }
              })
            })
          }
