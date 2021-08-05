from .db import db


likes = db.Table(
    'likes',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), primary_key=True),
    db.Column('drawing_id', db.Integer, db.ForeignKey('drawings.id', ondelete='CASCADE'), primary_key=True)
)


# class Like(db.Model):
#     __tablename__ = 'likes'

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     drawing_id = db.Column(db.Integer, db.ForeignKey('drawings.id', ondelete='CASCADE'), nullable=False)

#     user = db.relationship('User', back_populates='likes')
#     drawing = db.relationship('Drawing', back_populates='likes')

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'user_id': self.user_id,
#             'drawing_id': self.drawing_id
#         }
