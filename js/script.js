$(document).ready(function() {
    var randomMessages = ["La parte più difficile nella vita di un programmatore è quando si da la caccia ad un bug per una settimana, si trova il codice che genera il bug, si offende l'autore del codice ed infine ci si accorge di essere l'autore del codice maledetto.",
        "Misurare i progressi della programmazione dalle linee di codice è come misurare i progressi nella costruzione di aerei dal loro peso.",
        "Gli smanettoni erediteranno la terra.",
        "Quando dici: 'Ho scritto un programma che manda in crash Windows', la gente ti guarda stupita e ti dice: 'Hey, ce l'ho nel sistema, gratis'",
        "I bravi programmatori sanno cosa scrivere. I migliori sanno cosa riscrivere.",
        "Un pessimo programmatore può creare due posti di lavoro all'anno.",
        "Programmare è un atto innaturale.",
        "Non è necessario essere pazzi per essere un webmaster (ma aiuta).",
        "Se la modifica di un programmatore a un programma esistente funziona, probabilmente non era quello che voleva il cliente."]
    $(".message-field-text").keyup(changeSendIcon); //Cambia l'icona REC/INVIA
    $(".send-message-btn").click(sendNewMessage); //Invia il messaggio al click (+ risposta "Ok")
    $(".message-field-text").keypress(sendWithEnter); //Invia il messaggio (non vuoto) con Enter
    $(".search-contacts").keyup(searchContact); //Trova i contatti usando il campo di ricerca

    $('.contact').click(function() { //Seleziona il contatto con cui chattare

        var name = $(this).find(".contact-name").text();
        var avatar = $(this).find(".avatar-img").attr("src");

        var userId = $(this).data('codiceUtente');

        $(".open-settings").addClass("active");
        $(".message-bar-content").addClass("active");
        $(".intro-logo").addClass("hidden");

        $(".contact").removeClass("active");
        $(this).addClass("active");

        $(".main-section .messages-box").each(function() {
            if (userId == $(this).data('codiceUtente')) {
                $(".main-section .messages-box").removeClass("active");
                $(this).addClass("active");
            }
        });
        $(".open-contact-bar-left").each(function() {
            if (userId == $(this).data('codiceUtente')) {
                $(".open-contact-bar-left").removeClass("active");
                $(this).addClass("active");
                $(this).find(".open-avatar img").attr("src", avatar);
                $(this).find(".open-name").text(name);
            }

        });
    });





    // ========= FUNZIONI =================


    function sendNewMessage() { //invia il messaggio scritto con l'orario
        var input = $(".message-field-text").val();
        $(".message-field-text").val("");
        var messageTime = getMessageTime();
        var message = $(".template-message-sent .message-sent").clone();
        message.find(".message-content").text(input);
        message.find(".message-time").text(messageTime);
        $(".messages-box.active").append(message);
        var scrollPixel = $(".messages-box.active").prop('scrollHeight');
        $(".messages-box.active").scrollTop(scrollPixel);
        var everyLastMessageTime = $(".messages-box.active .message-time:last").text();
        $(".contact.active .time").text(everyLastMessageTime);
        $(".contact.active .message-preview").text(input);
        setTimeout(returnOk, 1000); //>>>>>>>>>>>> richiama la funzione che risponde "Ok"

    };

    function returnOk() { //risponde "Ok" ad ogni messaggio inviato, con l'orario
        var messageTime = getMessageTime();
        var messageOk = $(".template-message-received .message-received").clone();
        var i = Math.floor(Math.random() * 9);
        messageOk.find(".message-content").text(randomMessages[i]);
        messageOk.find(".message-time").text(messageTime);
        $(".messages-box.active").append(messageOk);
        var scrollPixel = $(".messages-box.active").prop('scrollHeight');
        $(".messages-box.active").scrollTop(scrollPixel);
        var lastMessageTime = $(".messages-box.active .message-received .message-time:last").text();
        $(".open-contact-bar-left.active .last-access").text("Ultimo accesso alle ore " + lastMessageTime);
        var everyLastMessageTime = $(".messages-box.active .message-time:last").text();
        $(".contact.active .time").text(everyLastMessageTime);
        $(".contact.active .message-preview").text(randomMessages[i]);


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

    function sendWithEnter(event) { //invia il messaggio con Enter
        if ((event.key == "Enter") && ($(".message-field-text").val().trim() != "")) {
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

    function getMessageTime() { //genera l'orario di invio / ricezione messaggio
        var time = new Date();
        var messageTime = (addZero(time.getHours(addZero)) + ":" + addZero(time.getMinutes())).toString();
        return messageTime;
    };

    function addZero(i) { //aggiunge lo "0" per formattare correttamente hh:mm
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    };



}); //chiusura document ready ==============================
