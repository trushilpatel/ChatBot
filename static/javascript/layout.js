$("#textinput").keypress(function (e) {
    if (e.keyCode === 13)
        getBotResponse();
});



function greeting() {
    const d = new Date();
    const n = d.getHours();
    let greet = '';

    if (n >= 5 && n <= 12)
        greet = "Good Morning";
    else if (n >= 12 && n <= 17)
        greet = "Good Afternoon";
    else
        greet = "Good Evening";

    document.getElementById('greeting').insertAdjacentHTML('beforeend', greet);
}


function open_chatbox() {
    greeting();
    document.getElementById("chatbox").style.display = "block";
    document.getElementById("chatbox").style.animation = "scale-in-br 0.2s cubic-bezier(0.785, 0.135, 0.150, 0.860) both";
    document.getElementById("bot-icon").style.display = "none";
}


function close_chatbox() {
    document.getElementById("chatbox").style.animation = "scale-out-br 0.2s cubic-bezier(0.550, 0.085, 0.680, 0.530) both";
    setTimeout(function () {
        document.getElementById("bot-icon").style.display = "block";
    }, 300);
}


function insert_bot_response_text(elm, data) {
    document.getElementById('wave').style.display = "none";
    elm.insertAdjacentHTML('beforeend',
        '<div class="row no-gutters" >' +
        '<div class="col-11 col-sm-11 col-md-10 col-lg-9 col-xl-9 ml-2 mt-2">' +
        '<div class="msg py-1 px-2 float-left border bg-white text-dark" style="border-color: whitesmoke; animation-name: bot_msg; word-break: break-all">' +
        data +
        '</div>' +
        '</div>' +
        '</div>'
    );
}


function insert_user_request_text(elm, rawText) {
    elm.insertAdjacentHTML('beforeend',
        '<div class="row no-gutters" >' +
        '<div class="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">' +
        '</div>' +
        '<div class="col-11 col-sm-11 col-md-11 col-lg-11 col-xl-11">' +
        '<div class="msg py-1 px-2 m-2 float-right text-dark" style="background-color: rgb(166, 231, 255); animation-name: user_msg; word-break: break-all">' +
        rawText +
        '</div>' +
        '</div>' +
        '</div>'
    );
}

let numOfAnswers = 10;
// toggle switch listener
document.addEventListener('DOMContentLoaded', function () {
  var checkbox = document.querySelector('input[type="checkbox"]');
  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
      // do this

      document.getElementById("chatbox").style.minHeight = "96%";
      document.getElementById("chatbox").style.minWidth = "98%";

      var numb = ['5','10','20','40'];
      var html_data =
      '<div class="row no-gutters justify-content-center mt-3">'+
           '<div class="msg py-1 px-2 border bg-success text-light" style="border-color:whitesmoke;">'+
                'Advance Mode is ON !'+
           '</div>'+
      '</div>'+
      '<div class="row no-gutters">'+
           '<div class="col-11 col-sm-11 col-md-10 col-lg-9 col-xl-9 ml-2 mt-2">'+
                '<div class="msg py-1 px-2 float-left border bg-white text-dark" style="border-color:whitesmoke;animation-name: bot_msg;">'+
                    'Choose numbers of possible answers '+
                '</div>'+
            '</div>'+
            '<div class="col-11 col-sm-11 col-md-10 col-lg-9 col-xl-9 ml-2 mt-1">';

        for (var i of numb) {
            html_data += '<div class="px-2 pb-1 ml-1 mt-1 float-left">' +
                                '<button class="bot-opt" id="opt'+i+'" onclick="setNoOfAnswer('+ i + ')" >' + i + '</button>' +
                         '</div>';
        }

         html_data += '</div>' + '</div>';

        document.getElementById('chat-panel').insertAdjacentHTML('beforeend', html_data);
        $('#chat').animate({scrollTop: $('#chat').get(0).scrollHeight}, 0);

    }
    else{
      document.getElementById("chatbox").style.minHeight = "50vh";
      document.getElementById("chatbox").style.minWidth = "25vw";
      var html_data =
      '<div class="row no-gutters justify-content-center mt-1 mb-2">'+
           '<div class="msg py-1 px-2 border bg-danger text-light" style="border-color:whitesmoke;">'+
                'Advance Mode is OFF !'+
           '</div>'+
      '</div>';
       document.getElementById('chat-panel').insertAdjacentHTML('beforeend', html_data);
       $('#chat').animate({scrollTop: $('#chat').get(0).scrollHeight}, 0);

    }
  });

});

function setNoOfAnswer(number){
    numOfAnswers = number;
    selected = 'opt'+number;
    document.getElementById(selected).style.background = "yellowgreen";
}


function getBotResponse() {
    const rawText = $("#textinput").val();
    const elm = document.getElementById("chat-panel");

    insert_user_request_text(elm, rawText);
    document.getElementById('wave').style.display = "block";
    $('#chat').animate({scrollTop: $('#chat').get(0).scrollHeight}, 0);
    $("#textinput").val("");


    var checkbox = document.querySelector('input[type="checkbox"]');

    if (checkbox.checked) {
      // do this

      $.get("/advanceResponse/get", {msg: rawText, topNSentences: numOfAnswers}).done(function (data) {
            setTimeout(function () {

                const object = data;
                for (const [key, value] of Object.entries(object)) {
                    insert_bot_response_text(elm, key);
                }

            }, 1500);
            $('#chat').animate({scrollTop: $('#chat').get(0).scrollHeight}, 0);
        });


    } else {

      //get response for user text

        $.get("/botResponse/get", {msg: rawText}).done(function (data) {
            setTimeout(function () {
                insert_bot_response_text(elm, data);
            }, 1500);
            $('#chat').animate({scrollTop: $('#chat').get(0).scrollHeight}, 0);
        });

    }




    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    return 0
}


function reflect_btn(msg) {
    insert_user_request_text(document.getElementById('chat-panel'), msg);
    document.getElementById('wave').style.display = "block";
    $('#chat').animate({scrollTop: $('#chat').get(0).scrollHeight}, 0);

}


function button_response(msg) {
    //setTimeout(function () {
    let html_data = '<div class="row no-gutters" >' +
        '<div class="col-11 col-sm-11 col-md-10 col-lg-9 col-xl-9 ml-2 mt-1">';

    $.get("/buttonResponse/get", {msg: msg}).done(function (data) {
        var myjson = JSON.parse(data);
        var link = myjson.link;


        setTimeout(function () {

            if (link === undefined) {
                document.getElementById('wave').style.display = "none";

                if ((myjson.texts).length > 0) {
                    const elm = document.getElementById("chat-panel");
                    for (var i in myjson.texts)
                        insert_bot_response_text(elm, myjson.texts[i]);
                }

                if ((myjson.button_names).length > 0) {
                    var bn;
                    var p;

                    for (var i in myjson.button_names) {
                        bn = myjson.button_names[i];
                        p = "'" + bn + "'";

                        html_data += '<div class="px-2 pb-1 ml-1 mt-1 float-left">' +
                            '<button class="bot-opt" onclick=" reflect_btn(' + p + '); setTimeout(function(){button_response(' + p + ');}, 1500);" >' + bn + '</button>' +
                            '</div>';
                    }

                    html_data += '</div>' +
                        '</div>';

                    document.getElementById('chat-panel').insertAdjacentHTML('beforeend', html_data);
                    $('#chat').animate({scrollTop: $('#chat').get(0).scrollHeight}, 0);

                }
            } else if (link !== undefined) {
                document.getElementById('wave').style.display = "none";
                window.open(myjson.link, '_blank');
            }

        }, 1500);

    });
}