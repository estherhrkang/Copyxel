from .db import db


likes = db.Table(
    'likes',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('drawing_id', db.Integer, db.ForeignKey('drawings.id'), primary_key=True),
)
