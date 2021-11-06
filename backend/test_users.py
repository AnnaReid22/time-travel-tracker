import pytest
import model_mongodb

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