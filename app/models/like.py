from .db import db


class Like(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    drawing_id = db.Column(db.Integer, db.ForeignKey('posts.id'), ondelete='CASCADE', nullable=False)

    user = db.relationship('User', back_populates='likes')
    drawing = db.relationship('Drawing', back_populates='likes')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'drawing_id': self.drawing_id
        }

