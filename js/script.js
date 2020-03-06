$(document).ready(function() {

    $(".message-field-text").keyup(changeSendIcon); //Cambia l'icona REC/INVIA
    $(".send-message-btn").click(sendNewMessage); //Invia il messaggio al click (+ risposta "Ok")
    $(".message-field-text").keypress(sendWithEnter); //Invia il messaggio (non vuoto) con Enter
    $(".search-contacts").keyup(searchContact); //Trova i contatti usando il campo di ricerca

    // ========= FUNZIONI =======================

    function addZero(i) { //aggiunge lo "0" per formattare correttamente hh:mm
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    };


    function sendNewMessage() { //invia il messaggio scritto con l'ora
        var input = $(".message-field-text").val();
        $(".message-field-text").val("");
        var messageTime = getMessageTime();
        var message = $(".template-message-sent .message-sent").clone();
        message.find(".message-content").text(input);
        message.find(".message-time").text(messageTime);
        $(".messages-box").append(message);
        $(".messages-box").animate({ scrollTop: 9999 }, "slow");
        setTimeout(returnOk, 1000); //>>>>>>>>>>>> richiamo la funzione che risponde "Ok"
    };

    function returnOk() { //risponde "Ok" ad ogni messaggio inviato, con l'ora
        var messageTime = getMessageTime();
        var messageOk = $(".template-message-received .message-received").clone();
        messageOk.find(".message-content").text("Ok");
        messageOk.find(".message-time").text(messageTime);
        $(".messages-box").append(messageOk);
        $(".messages-box").animate({ scrollTop: 9999 }, "slow");
    };

    function changeSendIcon(event) { //cambia icona di rec/invio
        if ($(".message-field-text").val().trim() != "") {
            $("i.rec-audio-btn").removeClass("active");
            $("i.send-message-btn").addClass("active");
        } else {
            $("i.rec-audio-btn").addClass("active");
            $("i.send-message-btn").removeClass("active");
        };
    };

    function sendWithEnter(event){ //invia il messaggio con Enter
        if ( (event.key == "Enter") && ($(".message-field-text").val().trim() != "") ){
            sendNewMessage();
        };
    };

    function searchContact(event) { //cerca tra i contatti
        var charFilter = $(this).val().toLowerCase();
        $(".contact-name").each(function() {
            if ($(this).text().toLowerCase().includes(charFilter)) {
                $(this).parents(".contact").show();
            } else {
                $(this).parents(".contact").hide();
            };
        });
    };

    function getMessageTime(){ //genera l'orario di invio / ricezione messaggio
        var time = new Date();
        var messageTime = addZero(time.getHours(addZero)) + ":" + addZero(time.getMinutes());
        return messageTime;
    };




}); //chiusura document ready ==============================
