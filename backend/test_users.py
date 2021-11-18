import pytest
import model_mongodb
import hashlib

def test_email_exists_pass():
    expected = {
        'email': 'oh@mygod.com'
    }
    temp_model = model_mongodb.Model(expected)
    temp_user = model_mongodb.User(temp_model)
    assert(temp_user.email_exists(), 1)

def test_email_exists_fail():
    expected = {
        'email': 'aaaa@aaaaaaa.com'
    }
    temp_model = model_mongodb.Model(expected)
    temp_user = model_mongodb.User(temp_model)
    assert(temp_user.email_exists(), 0)

def test_user_exists_pass():
    expected = {
        'email': 'oh@mygod.com',
        'password': 'killme'
    }
    temp_model = model_mongodb.Model(expected)
    temp_user = model_mongodb.User(temp_model)
    assert(temp_user.user_exists(), 1)

def test_user_exists_fail():
    expected = {
        'email': 'notreal',
        'password': 'bye'
    }
    temp_model = model_mongodb.Model(expected)
    temp_user = model_mongodb.User(temp_model)
    assert(temp_user.user_exists(), 0)

def test_encrypt_password_pass():
    expected = {
        'password': '123a'
    }
    hash_object = hashlib.sha1(b'123a')
    exp = hash_object.hexdigest()
    temp_model = model_mongodb.Model(expected)
    temp_user = model_mongodb.User(temp_model)
    temp_user.encryptPassword()
    assert(temp_user.password == exp)

def test_encrypt_password_fail():
    expected = {
        'password': '123a'
    }
    hash_object = hashlib.sha1(b'123b')
    exp = hash_object.hexdigest()
    temp_model = model_mongodb.Model(expected)
    temp_user = model_mongodb.User(temp_model)
    temp_user.encryptPassword()
    assert(temp_user.password != exp)

def test_find_all():  
    user = {
        "_id":"617ef920ddb23b7f7447370c",
        "firstName":"ohmygod",
        "lastName":"ohmygod",
        "email":"oh@mygod.com",
        "password":"killme",
        "cPass":"killme"
    }
    assert user in model_mongodb.User().find_all()