import datetime
from dataclasses import dataclass
from sqlalchemy import CheckConstraint
from app import db


guest_answers = db.Table(
    'guest_answers',
    db.Column('guest_id', db.Integer, db.ForeignKey('guest.id')),
    db.Column('answer_id', db.Integer, db.ForeignKey('answer.id'))
)


@dataclass
class Answer(db.Model):
    id: int
    question_id: int
    scale_id: int
    text: str
    impact_type: str
    impact_value: int

    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'), nullable=False)
    scale_id = db.Column(db.Integer, db.ForeignKey('scale.id'), nullable=False)
    text = db.Column(db.String(8192), nullable=False)
    impact_type = db.Column(db.String(1), nullable=False)
    impact_value = db.Column(db.Integer, nullable=False)
    CheckConstraint("impact_type = '+' or impact_type = '-' or impact_type = '*' or or impact_type = '/'", name='impact_type_c')

    def __repr__(self):
        return '<Answer %r>' % self.id

    """    def __init__(self, question_id, scale_id, text, impact_type, impact_value):
            self.question_id = question_id
            self.scale_id = scale_id
            self.text = text
            self.impact_type = impact_type
            self.impact_value = impact_value"""


@dataclass
class Scale(db.Model):
    id: int
    test_id: int
    name: str
    answers: Answer

    id = db.Column(db.Integer, primary_key=True)
    test_id = db.Column(db.Integer, db.ForeignKey('test.id'), nullable=False)
    name = db.Column(db.String(256), nullable=False)
    answers = db.relationship('Answer', backref='scale', lazy=True)

    def __repr__(self):
        return '<Scale %r>' % self.id

    """    def __init__(self, test_id, name):
            self.test_id = test_id
            self.name = name"""


@dataclass
class Guest(db.Model):
    id: int
    test_id: int
    guest_name: str
    created_at: str
    answers: Answer

    id = db.Column(db.Integer, primary_key=True)
    test_id = db.Column(db.Integer, db.ForeignKey('test.id'), nullable=False)
    guest_name = db.Column(db.String(256), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now(), nullable=False)
    answers = db.relationship('Answer', secondary=guest_answers, backref='guest_answers')

    def __repr__(self):
        return '<Guest %r>' % self.id


@dataclass
class Question(db.Model):
    id: int
    test_id: int
    number: int
    text: str
    answers: Answer

    id = db.Column(db.Integer, primary_key=True)
    test_id = db.Column(db.Integer, db.ForeignKey('test.id'), nullable=False)
    number = db.Column(db.Integer, nullable=False)
    text = db.Column(db.String(8192), nullable=False)
    answers = db.relationship('Answer', backref='question', lazy=True)

    def __repr__(self):
        return '<Question %r>' % self.id

    """    def __init__(self, test_id, number, text=None, answers=None):
            self.test_id = test_id
            self.number = number
            self.text = text
            self.answers = answers"""


@dataclass
class Test(db.Model):
    id: int
    created_by: int
    name: str
    token: str
    questions: Question
    guests: Guest
    scales: Scale

    id = db.Column(db.Integer, primary_key=True)
    created_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(1024), nullable=False)
    token = db.Column(db.String(256), nullable=True)
    questions = db.relationship('Question', backref='test', lazy=True)
    guests = db.relationship('Guest', backref='test', lazy=True)
    scales = db.relationship('Scale', backref='test', lazy=True)

    def __repr__(self):
        return '<Test %r>' % self.id

    """    def __init__(self, created_by, name, token=None, scales=None):
            self.created_by = created_by
            self.name = name
            self.token = token
            self.scales = scales
    """


@dataclass
class User(db.Model):
    id: int
    username: str
    created_at: str
    role: str
    tests: Test

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(256), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now(), nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    role = db.Column(db.String(3), default='usr', nullable=False)
    tests = db.relationship('Test', backref='user', lazy=True)
    CheckConstraint("role = 'usr' or role = 'adm'", name='var_role')

    def __repr__(self):
        return '<User %r>' % self.username

    """    def __init__(self, username, password_hash, created_at=None, role=None):
            self.username = username
            self.created_at = created_at
            self.password_hash = password_hash
            self.role = role"""
