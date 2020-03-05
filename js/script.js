$(document).ready(function(){
    // if $(".message-field-text").val() !=
    $(".enter-send").click(newMessageSent);

$(".search-contacts").keyup(function(event){
    var charFilter = $(this).val().toLowerCase();
    $(".contact-name").each(function(){
        if ($(this).text().toLowerCase().includes(charFilter)){
            $(this).parents(".contact").show();
        } else{
            $(this).parents(".contact").hide();
        }
    });
});

// ========= FUNZIONI =======================

    function addZero(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    };


    function newMessageSent(){
        var input = $(".message-field-text").val();
        $(".message-field-text").val("");
        var time = new Date();
        var messageTime = addZero(time.getHours(addZero)) + ":" + addZero(time.getMinutes());
        var message = $(".template-message-sent .message-sent").clone();
        message.find(".message-content").text(input);
        message.find(".message-time").text(messageTime);
        $(".messages-box").append(message);
        $(".main-section").scrollTop($(".main-section")[0].scrollHeight); // funziona solo al primo click! Why??!
        setTimeout(returnOk, 1000);
    };

    function returnOk(){
        var time = new Date();
        var messageTime = addZero(time.getHours(addZero)) + ":" + addZero(time.getMinutes());
        var messageOk = $(".template-message-received .message-received").clone();
        messageOk.find(".message-content").text("Ok");
        messageOk.find(".message-time").text(messageTime);
        $(".messages-box").append(messageOk);
        $(".main-section").scrollTop($(".main-section")[0].scrollHeight); // funziona solo al primo click! Why??!
    };



}); //chiusura document ready