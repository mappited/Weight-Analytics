#! /usr/bin/env python3
import unittest
import json

URL = "https://127.0.0.1:3000"


class AccountData:
    def __init__(self,*, email, password):
        self.email = email
        self.password = password

    def data(self):
        return {
            "name": self.email,
            "password": self.password
        }


class TestAccountRoutes(unittest.TestCase):

    def test_sing_up(self):
        account = [
            AccountData(email="", password="")
        ]
        for account in accounts:
            request.post()


if __name__ == '__main__':
    unittest.main()