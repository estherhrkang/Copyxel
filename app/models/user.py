from .db import db
from .users_drawings import users_drawings
from .likes import likes
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_img = db.Column(db.String(255), nullable=True)

    # many-to-many thru association table
    drawings = db.relationship('Drawing', secondary=users_drawings, back_populates='users')
    liked_drawings = db.relationship('Drawing', secondary=likes, back_populates='liked_users')

    # comments = db.relationship('Comment', back_populates='user')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profile_img': self.profile_img,
            'drawings': [drawing.to_dict() for drawing in self.drawings],
            'liked_drawings': [liked_drawing.to_dict() for liked_drawing in self.liked_drawings]
        }
