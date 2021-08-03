from flask import Blueprint, request
from app.models import Like, db

like_routes = Blueprint('likes', __name__)


# get all likes
@like_routes.route('/')
def all_likes():
    likes = Like.query.all()
    return {'likes': [like.to_dict() for like in likes]}


# get likes by user id
@like_routes.route('/<int:id>')
def likes_by_user(id):
    likes = Like.query.filter(Like.user_id == id).all()
    return {'likes': [like.to_dict() for like in likes]}


# get a specific like by user for drawing
@like_routes.route('/<int:id>/drawing/<int:drawing_id>')
def like_for_drawing(id, drawing_id):
    likes = Like.query.filter(Like.user_id == id, Like.drawing_id == drawing_id).all()
    return {'likes': [like.to_dict() for like in likes]}


# create a like
@like_routes.route('/', methods=['POST'])
def create_like():
    data = request.get_json()
    like = Like(
        user_id=data['user_id'],
        drawing_id=data['drawing_id']
    )
    db.session.add(like)
    db.session.commit()
    return like.to_dict()


# delete a specific like
@like_routes.route('/<int:id>', methods=['DELETE'])
def delete_like(like_id):
    like = Like.query.filter(Like.id == like_id)
    db.session.delete(like)
    db.session.commit()
    return like.to_dict()
