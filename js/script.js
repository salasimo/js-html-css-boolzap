$(document).ready(function(){

    $(".enter-send").click(function(){
        var input = $(".message-field-text").val();
        $(".message-field-text").val("");
        var time = new Date();
        var messageSentTime = time.getHours().toString() + ":" + time.getMinutes().toString();
        var message = $(".template-message-sent .message-sent").clone();
        message.find(".message-content").text(input);
        message.find(".message-time").text(messageSentTime);
        $(".messages-box").append(message);
    });






}); //chiusura document ready
