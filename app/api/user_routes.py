from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db

user_routes = Blueprint('users', __name__)


# get all users
@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


# get a specific user
@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


# update a specific user
@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_user(id):
    data = request.get_json()
    user = User.query.get(id)
    user.username = data['username']
    user.email = data['email']
    user.password = data['password']
    user.profile_img = data['profile_img']
    db.session.commit()
    return user.to_dict()


# delete a specific user
@user_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_user(id):
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return user.to_dict()