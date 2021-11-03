#Taken and slightly repurposed from BJ Klingenberg's CSC 307 Flask backend assignment
#https://github.com/bklingen-calpoly/csc307-flask-backend.git
import pymongo
from bson import ObjectId
import dns
import os
from dotenv import load_dotenv

class Model(dict):
    """
    A simple model that wraps mongodb document
    """
    __getattr__ = dict.get
    __delattr__ = dict.__delitem__
    __setattr__ = dict.__setitem__

    def save(self):
        if not self._id:
            self.collection.insert(self)
        else:
            self.collection.update(
                { "_id": ObjectId(self._id) }, self)
        self._id = str(self._id)

    def reload(self):
        if self._id:
            result = self.collection.find_one({"_id": ObjectId(self._id)})
            if result :
                self.update(result)
                self._id = str(self._id)
                return True
        return False

    def remove(self):
        if self._id:
            resp = self.collection.remove({"_id": ObjectId(self._id)})
            self.clear()
            return resp

class User(Model):
    # to use a .env file, create .env and include a statmement MONGODB_URI='mongodb+srv://<atlas-user>:<password>@cluster0.6f9re.mongodb.net/<myFirstDatabase>?retryWrites=true&w=majority'
    # with <atlas-user>, <password> and <myFirstDatabase> updated accordingly
    # make sure .env is in .gitignore so that your password isn't relased into the wild

    load_dotenv()  # take environment variables from .env.
    MONGODB_URI = os.environ['MONGODB_URI']
    db_client = pymongo.MongoClient(MONGODB_URI)
    collection = db_client["ttt"]["tttUsers"]

    def find_all(self):
        users = list(self.collection.find())
        for user in users:
            user["_id"] = str(user["_id"])
        return users

    def email_exists(self):
        return (self.collection.find({"email": self.email}).limit(1).count() == 1)
    def user_exists(self):
        return (self.collection.find({"email": self.email, "password": self.password}).limit(1).count() == 1)


class Todo(Model):
    load_dotenv()
    MONGODB_URI = os.environ['MONGODB_URI']
    db_client = pymongo.MongoClient(MONGODB_URI)
    collection = db_client["ttt"]["tttTodos"]

    def find_all(self):
        todos = list(self.collection.find({}))
        for todo in todos:
            todo["_id"] = str(todo["_id"])
        return str(todos)

    def update_one(self, id, replacement):
        return self.collection.replace_one(
            { "_id": ObjectId(id) }, 
            replacement, 
            upsert=False)



