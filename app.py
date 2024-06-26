from flask import Flask, render_template, request
import json
import re
import mongodb
import requests

app = Flask(__name__)
DBU = mongodb.DataBaseUtility()
link = "http://3b32e889.ngrok.io/msg"


@app.route('/')
def layout():
    home_buttons = list(DBU.home_button())
    print(home_buttons)
    return render_template("home.html", home_buttons=home_buttons)


@app.route('/botResponse/get')
def botResponse():
    msg = request.args.get("msg")
    print(msg[0])
    match = re.search(r'[a-zA-Z0-9]+', msg)
    if(match):
        print("english")
        small = msg.lower()
        res = DBU.find_qna_reply(small)
    else:
        print("notenglish")
        res = DBU.find_qna_reply(msg)
        if (res == "I am sorry, currently i do not have the information about the same."):
            res = 'નરેન્દ્ર મોદ દે આવ છ'
            #res = requests.get(link, params={"msg": msg, "topNSentences": 1, "sentenceLength": 3})

    return res


@app.route('/buttonResponse/get')
def button_botResponse():
    msg = request.args.get("msg")
    temp = DBU.find_button_reply(msg)
    print(temp)
    return str(temp).replace("'", '"')

@app.route('/advanceResponse/get')
def advanceResponse():
    msg = request.args.get("msg")
    num = request.args.get("topNSentences")
    #x = requests.get(link, params={"msg": msg, "topNSentences": num, "sentenceLength": 3})
    #res = json.loads(x.text)
    #print(res)
    res = {'નરેન્દ્ર મોદ દે આવ છ': 0.3067945953367415, 'નરેન્દ્ર મોદ દે સાથ જ': 0.05474789711674041}
    return res


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
    res = DBU.find_button_reply(msg)
    return res


if __name__ == "__main__":
    app.run(debug=True)
