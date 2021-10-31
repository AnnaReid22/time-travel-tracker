import pymongo
from flask import Flask
from flask import request
from flask import jsonify
import json
from flask_cors import CORS
from model_mongodb import User

app = Flask(__name__)
# CORS stands for Cross Origin Requests.
# Here we'll allow requests coming from any domain. Not recommended for production environment.
CORS(app)

# client = pymongo.MongoClient("mongodb+srv://tttFEAccount:tttcsc307@tttusers.qqxey.mongodb.net/ttt?retryWrites=true&w=majority")
# db = client.get_database()
# print(db.name)


@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/users', methods=['POST'])
def register_user():
    userToAdd = request.get_json()
    newUser = User(userToAdd)
    if (newUser.email_exists()):
        return jsonify({"error": "User already exists"}), 404
    else:
        newUser.save()
        return jsonify(newUser), 201
@app.route('/login', methods=['POST'])
def login():  
    userToAdd = request.get_json()
    current_user = User(userToAdd)
    if (current_user.user_exists()):
        return jsonify(current_user), 200
    return jsonify({"error": "User not found"}), 401
