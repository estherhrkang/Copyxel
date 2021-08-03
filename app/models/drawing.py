from .db import db
from .users_drawings import users_drawings
from .likes import likes
from datetime import datetime


class Drawing(db.Model):
    __tablename__ = 'drawings'

    id = db.Column(db.Integer, primary_key=True)
    colors = db.Column(db.String, nullable=False)
    sample_colors = db.Column(db.String, nullable=False)
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    # many-to-many thru association table
    users = db.relationship('User', secondary=users_drawings, back_populates='drawings')
    # one-to-many (one)
    likes = db.relationship('Like', back_populates='drawing')
    comments = db.relationship('Comment', back_populates='drawing')

    def to_dict(self):
        return {
            'id': self.id,
            'colors': self.colors,
            'sample_colors': self.sample_colors,
            'date_created': self.date_created
        }
