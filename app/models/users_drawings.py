from .db import db


users_drawings = db.Table(
    'users_drawings',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), primary_key=True),
    db.Column('drawing_id', db.Integer, db.ForeignKey('drawings.id', ondelete='CASCADE'), primary_key=True),
)