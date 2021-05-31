from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_cors import CORS

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 't1NP63m4wnBg6nyHYKfmc2TpCOGI4nss'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///./db/test.db'

api = Api(app)
jwt = JWTManager(app)
db = SQLAlchemy(app)
CORS(app)

from DBModels import db

db.create_all()

from api.Auth import Signup, Signin
from api.UserData import UserData
from api.TestData import AddTest, UserTests, GetTest, PassTest, TestStat
api.add_resource(UserTests, "/api/tests")
api.add_resource(AddTest, "/api/test/add")
api.add_resource(Signup, "/api/signup")
api.add_resource(Signin, "/api/signin")
api.add_resource(UserData, "/api/user/info")
api.add_resource(GetTest, "/api/test/<test_id>")
api.add_resource(PassTest, "/api/test/pass")
api.add_resource(TestStat, "/api/test/stat/<test_id>")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
