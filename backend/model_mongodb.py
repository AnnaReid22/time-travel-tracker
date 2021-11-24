#Taken and slightly repurposed from BJ Klingenberg's CSC 307 Flask backend assignment
#https://github.com/bklingen-calpoly/csc307-flask-backend.git
import pymongo
from bson import ObjectId
import dns
import os
import hashlib
from dotenv import load_dotenv

class Model(dict):
    __getattr__ = dict.get
    __delattr__ = dict.__delitem__
    __setattr__ = dict.__setitem__

class User(Model):
    load_dotenv()  # take environment variables from .env.
    MONGODB_URI = os.environ['MONGODB_URI']
    db_client = pymongo.MongoClient(MONGODB_URI)
    collection = db_client["ttt"]["tttUsers"]

    def encryptPassword(self):
        hash_object = hashlib.sha1(self.password.encode())
        self.password = hash_object.hexdigest()
        self.cPass = self.password

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
        return todos

    def find_completed_by_user(self, user):
        todos = list(self.collection.find({"completed" : True, "user": user}))
        for todo in todos:
            todo["_id"] = str(todo["_id"])
        return todos

    def find_all_todos_by_user(self, user):
        todos = list(self.collection.find({ "user": user }))
        for todo in todos:
            todo["_id"] = str(todo["_id"])
        return todos

    def find_todos(self):
        todos = list(self.collection.find({ "completed" : False }))
        for todo in todos:
            todo["_id"] = str(todo["_id"])
        return todos
        
    def update_completed(self, id, bool):
        return self.collection.update_one(
            {"_id": ObjectId(id) },
            { "$set":{"completed": bool}},
            upsert=False)

    def update_one(self, id, replacement):
        return self.collection.update_one(
            { "_id": ObjectId(id) }, 
            {"$set": replacement}, 
            upsert=False)

