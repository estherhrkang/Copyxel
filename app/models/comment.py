from .db import db


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    drawing_id = db.Column(db.Integer, db.ForeignKey('drawings.id'), nullable=False)

    # one-to-many (many)
    user = db.relationship('User', back_populates='comments')
    drawing = db.relationship('Drawing', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'user_id': self.user_id,
            'drawing_id': self.drawing_id
        }
