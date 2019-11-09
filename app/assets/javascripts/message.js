$(function(){
  function buildHTML(message) {
    var addImage = message.image? `<img class = "lower-message__image", src="${message.image}"></img>` : ''  
    var html = `<div class="message" data-message-id="${message.id}">
                 <div class="upper-message">
                   <div class="upper-message__user-name">
                     ${message.user_name}
                   </div>
                   <div class="upper-message__date">
                     ${message.created_at}
                   </div>
                 </div>
                 <div class="lower-message">
                   <p class="lower-message__content">
                     ${message.content}
                   </p>
                   ${addImage}
                 </div>
               </div>`

    return html
  }


  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType:  false
    })
    .done(function(message) {
      var html = buildHTML(message); 
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight});
      $('#form__submit').removeAttr('disabled');
      return false
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('#form__submit').removeAttr('disabled');
  });  
  })
  
  $('document').ready(function(){
    $(".main").animate({scrollTop:$('.footer__framework')},500, 'swing');
  })

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
        var last_message_id = $('.message:last').data("message-id");
        $.ajax({
          url: "api/messages",
          type: 'get',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function(messages) {
          var insertHTML ='';
          messages.forEach(function (message){
            insertHTML = buildHTML(message);
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
            $('.messages').append(insertHTML);  
          })
        })
        .fail(function() {
          alert('自動更新に失敗しました');
        });
    }
  }; 
  setInterval(reloadMessages, 5000);
});

