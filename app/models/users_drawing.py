from .db import db


users_drawing = db.Table(
    'users_drawings',
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('drawing_id', db.Integer, db.ForeignKey('drawings.id'), primary_key=True),
)