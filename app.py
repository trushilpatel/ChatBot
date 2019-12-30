from flask import Flask, flash, redirect, render_template, request, session, abort
import mongodb

# import utility

app = Flask(__name__)
DBU = mongodb.DataBaseUtility()


@app.route('/')
def layout():
    home_buttons = list(DBU.home_button())
    print(home_buttons)
    return render_template("home.html", home_buttons=home_buttons)


@app.route('/botResponse/get')
def botResponse():
    msg = request.args.get("msg")
    small = msg.lower()
    return DBU.find_qna_reply(small)


@app.route('/buttonResponse/get')
def button_botResponse():
    msg = request.args.get("msg")
    temp = DBU.find_button_reply(msg)
    print(temp)
    return str(temp).replace("'", '"')


@app.route('/admin')
def admin():
    return render_template("myadmin.html")


@app.route("/save/qna")
def save_qna():
    msg = request.args.get("msg")
    print(msg)
    DBU.insert_qna(msg)
    return "Successfully Saved..."


@app.route("/save/LBT/link")
def save_LBT_link():
    msg = request.args.get("msg")
    print(msg)
    DBU.insert_LBT_link(msg)
    return "Successfully Saved..."


@app.route("/save/LBT/BT")
def save_LBT_BT():
    msg = request.args.get("msg")
    DBU.insert_LBT_BT(msg)
    return "Successfully Saved..."


@app.route("/delete/button")
def delete_button():
    msg = request.args.get("msg")
    DBU.delete_button(msg)
    return "Button Successfully Deleted..."


@app.route("/delete/qna")
def delete_qna():
    msg = request.args.get("msg")
    DBU.delete_qna(msg)
    return "QNA Successfully Deleted..."


@app.route("/getDetails/qna")
def get_details_qna():
    msg = request.args.get("msg")
    return str(DBU.find_qna(msg.lower()))


@app.route("/getDetails/button")
def get_details_buttons():
    msg = request.args.get("msg")
    return str(DBU.find_button_reply(msg))


if __name__ == "__main__":
    app.run(debug=True)
