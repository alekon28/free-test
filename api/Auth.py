from flask_jwt_extended import create_access_token
from flask_restful import Resource, reqparse
from flask import request
from werkzeug import security
import datetime
from DBModels import db, User


class Signin(Resource):
    def post(self):
        body = request.get_json()
        user = body['username']
        password = body['password']
        u = User.query.filter_by(username=user).first()
        if u is None:
            return {'message': 'Invalid credentials login'}, 401
        elif not security.check_password_hash(u.password_hash, password):
            return {'message': 'Invalid credentials pass'}, 401
        else:
            expires = datetime.timedelta(days=1)
            access_token = create_access_token(identity=str(user), expires_delta=expires)
            return {'token': access_token}, 200


class Signup(Resource):
    def post(self):
        body = request.get_json()
        user = body['username']
        password = body['password']
        user_exist = User.query.filter_by(username=user).first()
        if user_exist:
            return {'message': 'user exist'}, 409
        pwhash = security.generate_password_hash(password)
        u = User(username=user, password_hash=pwhash)
        try:
            db.session.add(u)
            db.session.commit()
        except Exception as e:
            return {'message': str(e)}, 500
        finally:
            return {'message': 'success'}, 200
