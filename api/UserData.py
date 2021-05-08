from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from DBModels import User
from flask import jsonify


class UserData(Resource):
    @jwt_required()
    def get(self):
        user = get_jwt_identity()
        u = User.query.with_entities(User.username, User.id, User.created_at, User.role).filter_by(username=user).first()
        result = dict(u)
        if u is None:
            return {'message': 'user has been deleted'}, 404
        else:
            return jsonify(result).get_json(), 200