import pymongo
from flask import Flask
from flask import request
from flask import jsonify
import json
from flask_cors import CORS
from model_mongodb import Todo

app = Flask(__name__)
CORS(app)

@app.route('/todos', methods=['POST', 'GET'])
def add_todo():
    if request.method == 'GET':
        return Todo().find_all(), 201
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
