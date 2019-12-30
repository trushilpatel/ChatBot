import pymongo
import json


def connectToMongo(altas_link="mongodb+srv://m001:m001@cluster0-r9obi.mongodb.net/college?retryWrites=true&w=majority"):
    client = pymongo.MongoClient(altas_link)
    return client.college


def stringToJson(s):
    return json.loads(s)


class DataBaseUtility:
    def __init__(self):
        self.db = connectToMongo()

    def insert_qna(self, s):
        json_obj = stringToJson(s)
        collection = self.db.qna
        print(collection.insert_one(json_obj))

    def insert_LBT_link(self, s):
        json_obj = stringToJson(s)
        collection = self.db.buttons
        print(collection.insert_one(json_obj))

    def insert_LBT_BT(self, s):
        json_obj = stringToJson(s)
        collection = self.db.buttons
        print(collection.insert_one(json_obj))

    def delete_button(self, s):
        collection = self.db.buttons
        print(collection.delete_many({"main_button_name": s}))

    def delete_qna(self, s):
        collection = self.db.qna
        print(collection.delete_many({"question": s}))

    def find_qna(self, s):
        collection = self.db.qna
        x = collection.find({"question": s})
        temp = None

        for i in x:  # getting the first value from all possible x value
            temp = i
            break

        return temp

    def find_qna_reply(self, s):
        x = self.find_qna(s)

        try:
            if "_id" in x:
                x.pop("_id")
        except:  # if there is no match then default reply is returned
            return "I am sorry, currently i do not have the information about the same."

        return x['answer']

    def find_button(self, s):
        collection = self.db.buttons
        x = collection.find({"main_button_name": s})
        temp = None

        for i in x:
            temp = i
            break
        return temp

    def find_button_reply(self, s):
        x = self.find_button(s)
        try:
            if "_id" in x:
                x.pop("_id")
        except:
            return {"texts": ["I am sorry, currently i do not have the information about the same."]}

        return x

    def find_button_all(self):
        collection = self.db.buttons
        x = collection.find()
        main = dict()

        for i in x:
            if 'link' not in i.keys():
                main[i["main_button_name"]] = dict({
                    "button_names": i["button_names"],
                    "texts": i["texts"]
                })
            else:
                main[i["main_button_name"]] = dict({
                    "link": i["link"]
                })

        return main

    def home_button(self):
        main = self.find_button_all()
        home = dict()
        all_buttons = set()

        for i in main.keys():
            if "button_names" in main[i]:
                all_buttons.update(main[i]["button_names"])

        temp = set(main.keys()) - all_buttons

        return temp
        # print(all_buttons)


if __name__ == "__main__":
    # insert_qna('{"question":"hello"}')
    # insert_qna('{"question": "hi"}')
    # delete_qna("hi")
    # print(find_qna_reply())
    # home_button()
    db = DataBaseUtility()
    print(db.find_button_all())
