import datetime

from flask_restful import Resource, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from DBModels import db, User, Test, Question, Answer, Guest
from flask import jsonify


class UserTests(Resource):
    @jwt_required()
    def get(self):
        user = get_jwt_identity()
        uid = User.query.with_entities(User.id).filter_by(username=user).first()[0]
        ts = Test.query.with_entities(Test.name, Test.id).filter_by(created_by=uid).all()
        result = [dict(x) for x in ts]
        return jsonify(result).get_json(), 200


class AddTest(Resource):
    @jwt_required()
    def post(self):
        user = get_jwt_identity()
        body = request.get_json()
        test_name = body["name"]
        test_token = body["token"]
        questions = body["questions"]
        uid = User.query.with_entities(User.id).filter_by(username=user).first()[0]
        if uid is None:
            return {'message': 'user has been deleted'}, 401
        test = Test(created_by=uid, name=test_name, token=test_token)
        for question in body["questions"]:
            qst = Question(number=1, text=question["text"])
            for answer in question["answers"]:
                ans = Answer(
                    impact_type=answer["impact_type"],
                    impact_value=answer["impact_value"],
                    scale_name=answer["scale_name"],
                    text=answer["text"]
                )
                qst.answers.append(ans)
            test.questions.append(qst)

        db.session.add(test)
        db.session.commit()
        print(test)
        return {"message": "success"}, 200


class GetTest(Resource):
    def get(self, test_id):
        test = Test.query.filter_by(id=test_id).first()
        if test is None:
            return {"message": "test doesn't exist"}, 404
        print()

        result = {
            "id": test.id,
            "created_by": test.created_by,
            "name": test.name,
            "token": test.token,
            "questions": list(map(lambda x: {
                "id": x.id,
                "test_id": x.test_id,
                "number": x.number,
                "text": x.text,
                "answers": list(map(lambda y: {
                    "id": y.id,
                    "question_id": y.question_id,
                    "scale_name": y.scale_name,
                    "text": y.text,
                    "impact_type": y.impact_type,
                    "impact_value": y.impact_value
                }, [answer for answer in x.answers]))
            }, [question for question in test.questions]))
        }
        print(result)
        return jsonify(result).get_json(), 200
        #return {"message": f"under maintenance id: {test_id}"}, 200


class PassTest(Resource):
    def post(self):
        body = request.get_json()
        test_id = body["test_id"]
        guest_name = body["guest_name"]
        token = body["token"]
        answers_ids = body["answer_ids"]
        g = Guest(test_id=test_id, guest_name=guest_name)
        for i in answers_ids:
            g.answers.append(Answer.query.filter_by(id=i).first())
        db.session.add(g)
        db.session.commit()
        return {"message": "success"}, 200


class TestStat(Resource):
    @jwt_required()
    def get(self):
        user = get_jwt_identity()
        uid = User.query.with_entities(User.id).filter_by(username=user).first()[0]
