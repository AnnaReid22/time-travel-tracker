import pytest
import model_mongodb 

def test_find_all_todos():  
    expected = {
            "_id" : "6181918385eced7a97a48fda",
            "title" : "test",
            "start" : "2021-11-02T19:29:07.799Z",
            "end" : "2021-11-02T19:29:07.799Z",
            "description" : "yo",
            "importance" : 4,
            "notify" : "2021-11-02T19:29:07.799Z",
            "category" : "school"
        }
    assert expected in model_mongodb.Todo().find_all()


def test_update_one():  
    expected = {
            "title" : "test",
            "start" : "2021-11-02T19:29:07.799Z",
            "end" : "2021-11-02T19:29:07.799Z",
            "description" : "yo",
            "importance" : 4,
            "notify" : "2021-11-02T19:29:07.799Z",
            "category" : "school"
        }
    assert model_mongodb.Todo().update_one("6181918385eced7a97a48fda", expected).modified_count == 0