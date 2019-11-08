$(function() {
  var search_list = $('#user-search-result');
  
  function addUser(user) {
    var html = `<div class='chat-group-user clearfix'>
                  <p class='chat-group-user__name'>${user.name}</p>
                  <a class='user-search-add chat-group-user__btn chat-group-user__btn--add' data-user-id=${user.id}' data-user-name=${user.name}'>追加</a>
                </div>`
    search_list.append(html);
  }

  function addNoUser() {
    var html = `<div class='chat-group-user clearfix'>
                  <p class='chat-group-user__name'>ユーザーが見つかりません</p>
                </div>`
    search-list.append(html);
  }
  
  function addDeleteUser(id, name) {
    var html = `<div class='chat-group-user clearfix' id='${id}'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>  
                    <p class='chat-group-user__name'>${name}</p>
                    <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`;

    $('#chat-group-users').append(html);
  }

  $('#user-search-field').on('keyup', function(e) {
    var input = $('#user-search-field').val();
    console.log(input)
    if (input !=="") {
      $.ajax({
        type: 'GET',
        url: '/users',
        data: {keyword: input },
        dataType: 'json'
    })

    .done(function(users) {
      $('#user-search-result').empty();

      if (users.length !== 0) {
        users.forEach(function(user) {
            addUser(user);
        });
      } else {
        addNoUser('一致するユーザーはいません');
      }
    })

    .fail(function() {
      alert('通信エラーです。ユーザーが表示できません。');
    })
   }  
  });
  
  

  $('#user-search-result').on('click', '.chat-group-user__btn--add', function() {
    var user_id = $(this).data('user-id');
    var user_name = $(this).data('user-name');
    addDeleteUser(user_id, user_name);
    $(this)
      .parent()
      .remove();
  });

  $('#chat-group-users').on('click', '.chat-group-user__btn--remove', function() {
    $(this)
      .parent()
      .remove();
  });
});


