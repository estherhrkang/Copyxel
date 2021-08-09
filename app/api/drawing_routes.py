from flask import Blueprint, jsonify, request
from app import forms
from flask_login import login_required, current_user
from app.models import db, Drawing, User, Comment
from app.forms import DrawingForm, CommentForm

drawing_routes = Blueprint('drawings', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# get all drawings by all users
@drawing_routes.route('/')
# @login_required
def all_drawings():
    drawings = Drawing.query.all()
    return {'drawings': [drawing.to_dict() for drawing in drawings]}


# get a drawing
# @drawing_routes.route('/<int:id>')
# @login_required
# def one_drawing(id):
#     drawing = Drawing.query.filter(Drawing.id == id).first()
#     return drawing.to_dict()


# create a drawing
@drawing_routes.route('/', methods=['POST'])
@login_required
def create_drawing():
    form = DrawingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        drawing = Drawing(
            colors=form.colors.data,
            sample_colors=form.sample_colors.data,
            date_created=form.date_created.data
        )
        db.session.add(drawing)
        db.session.commit()
        
        # also create association btw drawing and current user
        currentUser = User.query.filter(User.id == current_user.id).first()
        currentUser.drawings.append(drawing)
        db.session.commit()

        drawings = Drawing.query.all()
        return {'drawings': [drawing.to_dict() for drawing in drawings], 'user': currentUser.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# create a like on a drawing
@drawing_routes.route('/<int:drawing_id>/likes', methods=['POST'])
@login_required
def create_like(drawing_id):
    drawing = Drawing.query.filter(Drawing.id == drawing_id).first()
    currentUser = User.query.filter(User.id == current_user.id).first()
    currentUser.liked_drawings.append(drawing)
    db.session.commit()

    drawings = Drawing.query.all()
    return {'drawings': [drawing.to_dict() for drawing in drawings], 'user': currentUser.to_dict()}


# create a comment on a drawing
@drawing_routes.route('/<int:drawing_id>/comments', methods=['POST'])
@login_required
def create_comment(drawing_id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            content=form.content.data,
            user_id=current_user.id,
            drawing_id=drawing_id
        )
        db.session.add(comment)
        db.session.commit()

        drawings = Drawing.query.all()
        currentUser = User.query.filter(User.id == current_user.id).first()
        return {'drawings': [drawing.to_dict() for drawing in drawings], 'user': currentUser.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# delete a drawing
@drawing_routes.route('/<int:drawing_id>', methods=['DELETE'])
@login_required
def delete_drawing(drawing_id):
    drawing = Drawing.query.get(drawing_id)
    db.session.delete(drawing)
    db.session.commit()   
    # remove the row on association table
    currentUser = User.query.filter(User.id == current_user.id).first()
    # currentUser.drawings.remove(drawing)
    # db.session.commit()

    # get updated drawings list
    drawings = Drawing.query.all()
    return {'drawings': [drawing.to_dict() for drawing in drawings], 'user': currentUser.to_dict()}


# delete a like on a drawing
@drawing_routes.route('/<int:drawing_id>/likes', methods=['DELETE'])
@login_required
def delete_like(drawing_id):
    drawing = Drawing.query.filter(Drawing.id == drawing_id).first()
    currentUser = User.query.filter(User.id == current_user.id).first()

    # remove the association between drawing and current user
    # currentUser.liked_drawings = None
    currentUser.liked_drawings.remove(drawing)
    db.session.commit()
    
    drawings = Drawing.query.all()
    # return drawing.to_dict()
    return {'drawings': [drawing.to_dict() for drawing in drawings], 'user': currentUser.to_dict()}
