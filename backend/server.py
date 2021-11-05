import pymongo
from flask import Flask
from flask import request
from flask import jsonify
import json
from flask_cors import CORS
from model_mongodb import User
from model_mongodb import Todo

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'

#login API routes
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

#Todos API routes
@app.route('/todos', methods=['POST', 'GET'])
def add_todo():
    if request.method == 'GET':
        return jsonify(Todo().find_all()), 201
    if request.method == 'POST':
        todoToAdd = request.get_json()
        newTodo = Todo(todoToAdd)
        newTodo.save()
        return jsonify(newTodo), 201

@app.route('/todos/<id>', methods=['GET', 'DELETE', 'PUT'])
def get_todo(id):
    if request.method == 'GET':
        todo = Todo({"_id": id})
        if todo.reload():
            return todo, 201
        else:
            return jsonify({"error": "Todo not found"}), 404
    elif request.method == 'DELETE':
        deleteTodo = Todo({"_id": id})
        if deleteTodo.remove(): 
            resp = jsonify({}), 204
            return resp
        else:
           return jsonify({"error": "Todo not found"}), 404
    elif request.method == 'PUT':
        editTodo = request.get_json()
        if Todo().update_one(id, editTodo): 
            resp = jsonify({}), 204
            return resp
        else:
           return jsonify({"error": "Todo not found"}), 404
