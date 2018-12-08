$(document).on('turbolinks:load', function() {
  function buildHTML(message){
    var imagehtml = (message.image)? `<img class="lower-message__image" src="${message.image}">` : "";
      var html =
         `<div class="message" data-message-id = "${message.id}" >
            <div class="upper-message">
              <div class="upper-message__user-name">
                ${message.user_name}
              </div>
              <div class="upper-message__date">
                ${message.date}
              </div>
            </div>
            <div class="lower-message">
              <p class="lower-message__content">
                ${message.content}
              </p>
            </div>
              ${imagehtml}
          </div>`
        return html;
      };

$('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
     .done(function(data){
       var html = buildHTML(data);
       $('.messages').append(html);
       $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
       $('form')[0].reset();
     })
     .fail(function(){
        alert('error');
      })
     .always(function(){
      $(".form__submit").prop("disabled", false);
     });
    })

    var interval = setInterval(function(){
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
        var last_message_id = $('.message').last().data('message-id');

        $.ajax({
          url: location.href,
          type: 'GET',
          data: { id: last_message_id },
          dataType: 'json'
        })

        .done(function(messages){
          if (messages.length !== 0){
            messages.forEach(function(messages){
              var insertHTML = buildHTML(messages);
              $('.messages').append(insertHTML);
            });
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},"first");
          }
        })
        .fail(function(messages){
          alert('自動更新に失敗しました');
        })
      } else {
        clearInterval(interval);
      }
    } ,5000);
});
