from .db import db
from .users_drawings import users_drawings
from .favorites import favorites
from datetime import datetime


class Drawing(db.Model):
    __tablename__ = 'drawings'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    rows = db.Column(db.String, nullable=False)
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    users = db.relationship('User', secondary=users_drawings, back_populates='drawings')
    users = db.relationship('User', secondary=favorites, back_populates='drawings')
    comments = db.relationship('Comment', back_populates='drawing')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'rows': self.rows,
            'date_created': self.date_created
        }
