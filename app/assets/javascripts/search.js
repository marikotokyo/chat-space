$(document).on('turbolinks:load',function() {
  var user_search_result = $('#user-search-result');
  var chat_group_users = $('#chat-group-users');

  function appendUsers(users) {
    var user_html = `
                    <div class="chat-group-user clearfix">
                      <p class="chat-group-user__name">
                        ${ users.name }
                      </p>
                      <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ users.id }" data-user-name="${ users.name }">
                        追加
                      </a>
                    </div>
                    `
    user_search_result.append(user_html);
  }

  function appendNoUsers(users) {
    var user_html = `
                    <div class="chat-group-user clearfix">${ users }</div>
                    `
    user_search_result.append(user_html)
  }

  function addUser(user_id, user_name) {
    var user_html = `
                    <div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                      <input name='group[user_ids][]' type='hidden' value="${user_id}">
                      <p class='chat-group-user__name', id = 'data-user-name'>
                        ${user_name}
                      </p>
                      <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>
                        削除
                      </a>
                    </div>
                    `
    chat_group_users.append(user_html);
  }

  $("#user-search-field").on("keyup", function() {
    var input_name = $("#user-search-field").val();
      $(user_search_result).empty();

         $.ajax({
          type: 'GET',
          url: '/users',
          data: { keyword: input_name },
          dataType: 'json'
        })

         .done(function(users) {
          if(users.length !== 0) {
            users.forEach(function(users){
              appendUsers(users);
            });
          }
          else {
            appendNoUsers("一致するユーザーはいません");
          }
        })
        .fail(function(){
          alert('ユーザー検索に失敗しました');
        })
      })

  $(document).on("click", ".user-search-add", function(e) {
    var user_id = $(this).attr("data-user-id");
    var user_name = $(this).attr("data-user-name");
    $(this).parent().remove();
    addUser(user_id, user_name);
  });

   $(document).on("click", ".user-search-remove", function(e) {
    $(this).parent().remove();
  });
});

