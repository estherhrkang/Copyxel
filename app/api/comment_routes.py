from flask import Blueprint, jsonify, request
from app import forms
from flask_login import login_required, current_user
from app.models import db, Comment, Drawing, User
from app.forms import CommentForm

comment_routes = Blueprint('comments', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# get all comments (of a drawing?)
@comment_routes.route('/')
# @login_required
def all_comments():
    comments = Comment.query.all()
    return {'comments': [comment.to_dict() for comment in comments]}


# create a comment on a drawing is @ drawing_routes


# edit a comment on a drawing
@comment_routes.route('/<int:comment_id>', methods=['PUT'])
@login_required
def edit_comment(comment_id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    comment = Comment.query.get(comment_id)
    if form.validate_on_submit():
        comment.content=form.content.data
        db.session.commit()

        comments = Comment.query.all()
        return {'comments': [comment.to_dict() for comment in comments]}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# delete a comment on a drawing
@comment_routes.route('/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    comment = Comment.query.filter(Comment.id == comment_id).first()
    db.session.delete(comment)
    db.session.commit()

    comments = Comment.query.all()
    return {'comments': [comment.to_dict() for comment in comments]}
