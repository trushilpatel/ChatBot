const LBT_json = {
    main_button_name: null,
    total_buttons: 0,
    total_texts: 0,
    button_names: [],
    texts: []
};

var link = 0;
var hide_LBT_link = 0;
//Some common variables
var temp = null;
var html_data = null;


//------------------------------------------------------------------------------------------------------------------
// INSERT


// Option LBT selected DONE
function selected_qna_LBT() {
    document.getElementById('options').style.display = 'none';
    document.getElementById('select_qna_LBT').style.display = 'block';
}


// LBT -> LINk Button Text division
// add Link inside button div DONE
function LBT_add_link() {
    document.getElementById("LBT").style.display = 'none';
    link = 1;
    html_data =
        '<div class="row no-gutters m-1">' +
        '<div class="col-1 pl-2 pt-2">' +
        '<div>Link</div>' +
        '</div>' +
        '<div class="col-1 pl-4 pt-2">' +
        '<div>:</div>' +
        '</div>' +
        '<div class="col-10">' +
        '<input type="text" class="form-control" id="added_link"' + ' name="link-desc">' +
        '</div>' +
        '</div>';
    document.getElementById('add_link_button_text').insertAdjacentHTML('beforeend', html_data);
}


// QNA option Selected DONE
function selected_qna() {
    document.getElementById("select_qna_LBT").style.display = 'none';
    document.getElementById("insert_qna").style.display = "block";
}


// BUTTON option selected DONE
function selected_button() {
    document.getElementById("select_qna_LBT").style.display = 'none';
    document.getElementById("insert_button").style.display = "block";
}


// add Button input inside button div DONE
function LBT_add_btn() {
    if (hide_LBT_link === 0) {
        hide_LBT_link = 1;
        document.getElementById("hide_link").style.display = 'none';
        LBT_add_btn();
    } else {
        temp = "added_button_" + String(LBT_json.total_buttons);
        html_data = '<div class="row no-gutters m-1">' +
            '<div class="col-1 pl-2 pt-2">' +
            '<div>Button ' + LBT_json.total_buttons + '</div>' +
            '</div>' +
            '<div class="col-1 pl-4 pt-2">' +
            '<div>:</div>' +
            '</div>' +
            '<div class="col-4">' +
            '<input type="text" class="form-control" id=' + temp + ' name="button-name">' +
            '</div>' +
            '</div>';
        LBT_json.total_buttons += 1;
        document.getElementById('add_link_button_text').insertAdjacentHTML('beforeend', html_data);
    }
}


// add text input inside button div DONE
function LBT_add_txt() {
    if (hide_LBT_link === 0) {
        hide_LBT_link = 1;
        document.getElementById("hide_link").style.display = 'none';
        LBT_add_txt();
    } else {
        const temp = "added_text_" + String(LBT_json.total_texts);
        const html_data =
            '<div class="row no-gutters m-1">' +
            '<div class="col-1 pl-2 pt-2">' +
            '<div>Text ' + LBT_json.total_texts + '</div>' +
            '</div>' +
            '<div class="col-1 pl-4 pt-2">' +
            '<div>:</div>' +
            '</div>' +
            '<div class="col-10">' +
            '<input type="text" class="form-control" id=' + temp + ' name="text-desc">' +
            '</div>' +
            '</div>';
        LBT_json.total_texts += 1;
        document.getElementById('add_link_button_text').insertAdjacentHTML('beforeend', html_data);
    }
}


// QNA Save DONE
function qna_save() {
    const qna_json = {
        "question": $("#qna_question").val(),
        "answer": $("#qna_answer").val()
    };

    $.get("/save/qna", {msg: JSON.stringify(qna_json)}).done(function (data) {
        alert(data);
        window.location = "/admin";
    });
}


// LBT Save DONE
function LBT_save() {
    if (link === 0) {
        LBT_json.main_button_name = $('#LBT_main_button_name').val();

        temp = "#added_button_";
        for (var i = 0; i < LBT_json.total_buttons; i++) {
            LBT_json.button_names.push($(temp + i).val());
        }

        temp = "#added_text_";
        for (var i = 0; i < LBT_json.total_texts; i++) {
            LBT_json.texts.push($(temp + i).val());
        }

        $.get("/save/LBT/BT", {msg: JSON.stringify(LBT_json)}).done(function (data) {
            alert(data);
            window.location = '/admin';

        });
    } else {
        temp = {
            "main_button_name": $('#LBT_main_button_name').val(),
            "link": $('#added_link').val()
        };

        $.get("/save/LBT/link", {msg: JSON.stringify(temp)}).done(function (data) {
            alert(data);
            window.location = '/admin';
        });
    }
}


// INSERT ENDED


//------------------------------------------------------------------------------------------------------------------
// GET DETAILS


// Get Details of buttons or questions
function selected_get_details() {
    document.getElementById('options').style.display = 'none';
    document.getElementById('show_get_details').style.display = 'block';
}


// Get Details selected QNA DONE
function get_details_qna() {
    document.getElementById('show_get_details').style.display = 'none';
    document.getElementById('show_get_details_qna').style.display = 'block';
}


// Get Details selected BUTTON DONE
function get_details_button() {
    document.getElementById('show_get_details').style.display = 'none';
    document.getElementById('show_get_details_button').style.display = 'block';
}


// Get Details button DONE
function GD_button() {
    temp = $("#GD_button_id").val();

    $.get("/getDetails/button", {msg: temp}).done(function (data) {
        const html_data =
            "<div class="col-6 m-3 pt-3></div>"
        window.location = "/admin";
    });
}


// Get Details QnA DONE
function GD_qna() {
    temp = $("#GD_qna_id").val();

    $.get("/getDetails/qna", {msg: temp}).done(function (data) {
        const d = data;
        alert(d);
        window.location = "/admin";
    });
}


// GET DETAILS ENDED


//------------------------------------------------------------------------------------------------------------------
// DELETE


// Option delete DONE
function selected_delete() {
    document.getElementById('options').style.display = 'none';
    document.getElementById('select_delete').style.display = 'block';
}


// DELETE selected QNA DONE
function selected_delete_qna() {
    document.getElementById('select_delete').style.display = 'none';
    document.getElementById('delete_qna').style.display = 'block';
}


// DELETE selected BUTTON DONE
function selected_delete_button() {
    document.getElementById('select_delete').style.display = 'none';
    document.getElementById('delete_button').style.display = 'block';
}


// DELETE button DONE
function delete_button() {
    temp = $("#delete_button_id").val();

    $.get("/delete/button", {msg: temp}).done(function (data) {
        alert(data);
        window.location = "/admin";
    });
}


// DELETE QnA DONE
function delete_qna() {
    temp = $("#delete_qna_id").val();

    $.get("/delete/qna", {msg: temp}).done(function (data) {
        alert(data);

        window.location = "/admin";
    });
}


// DELETE ENDED
//------------------------------------------------------------------------------------------------------------------
