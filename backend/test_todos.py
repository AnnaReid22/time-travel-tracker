import pytest
import model_mongodb 
todo = {
        "_id":"619570c50da5fd2cbb0d425a",
        "title":"DO NOT DELETE: FOR PYTESTS",
        "start":"2050-11-16T08:00:00.000Z",
        "end":"2050-11-17T08:00:00.000Z",
        "description":"",
        "importance":"!",
        "givenStart":"2050-11-16T08:00:00.000Z",
        "givenEnd":"2050-11-17T08:00:00.000Z",
        "category":"Other",
        "doNotPush":False,
        "completed":False,
        "display":False,
        "user":"test@test.com"
    }
todoEdit = {"importance":"!!"}
todoRev = {"importance":"!"}

complete = {
        "_id":"619570f60da5fd2cbb0d425b",
        "title":"DO NOT DELETE: FOR PYTESTS",
        "start":"2050-11-24T08:00:00.000Z",
        "end":"2050-11-25T08:00:00.000Z",
        "description":"",
        "importance":"!",
        "givenStart":"2050-11-25T08:00:00.000Z",
        "givenEnd":"2050-11-26T08:00:00.000Z",
        "category":"Other",
        "doNotPush":False,
        "completed":True,
        "display":True,
        "user":"test@test.com"
    }

def test_find_all():  
    todoFound = todo in model_mongodb.Todo().find_all()
    completeFound = complete in model_mongodb.Todo().find_all()
    assert completeFound and todoFound

def test_find_all_by_user():  
    todoFound = todo in model_mongodb.Todo().find_all_todos_by_user("test@test.com")
    completeFound = complete in model_mongodb.Todo().find_all_todos_by_user("test@test.com")
    assert completeFound and todoFound

def test_find_completed():  
    todoFound = todo in model_mongodb.Todo().find_completed_by_user("test@test.com")
    completeFound = complete in model_mongodb.Todo().find_completed_by_user("test@test.com")
    assert completeFound and not todoFound
    
def test_find_todo():  
    todoFound = todo in model_mongodb.Todo().find_todos()
    completeFound = complete in model_mongodb.Todo().find_todos()
    assert todoFound and not completeFound

def test_update_one():  
    assert model_mongodb.Todo().update_one("619570c50da5fd2cbb0d425a", todoEdit).modified_count > 0

def test_update_reset():  
    assert model_mongodb.Todo().update_one("619570c50da5fd2cbb0d425a", todoRev).modified_count > 0
def test_update_same():  
    assert model_mongodb.Todo().update_one("619570c50da5fd2cbb0d425a", todoRev).modified_count == 0

def test_update_completed():
        assert model_mongodb.Todo().update_completed("619570f60da5fd2cbb0d425b", False).modified_count > 0

def test_update_completed_undo():
        assert model_mongodb.Todo().update_completed("619570f60da5fd2cbb0d425b", True).modified_count > 0
 
def test_update_completed_same():
        assert model_mongodb.Todo().update_completed("619570f60da5fd2cbb0d425b", True).modified_count == 0