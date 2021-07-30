from flask import Blueprint, jsonify, request
from app import forms
from flask_login import login_required
from app.models import db, Drawing
from app.forms import DrawingForm

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
@login_required
def allDrawings():
    drawings = Drawing.query.all()
    return {'drawings': [drawing.to_dict() for drawing in drawings]}


# get a drawing
@drawing_routes.route('/<int:id>')
@login_required
def oneDrawing(id):
    drawing = Drawing.query.filter(Drawing.id == id).all()
    return drawing.to_dict()


# create a drawing
@drawing_routes.route('/', methods=['POST'])
@login_required
def createDrawing():
    form = DrawingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        drawing = Drawing(
            title=form.title.data,
            colors=form.colors.data,
            date_created=form.date_created.data
        )
        db.session.add(drawing)
        db.session.commit()
        return drawing.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# edit a drawing
@drawing_routes.route('/<int:id>', methods=['PUT'])
@login_required
def editDrawing(drawing_id):
    form = DrawingForm()
    drawing = Drawing.query.get(drawing_id)
    if form.validate_on_submit():
        drawing.title = form.title.data,
        drawing.colors = form.colors.data,
        drawing.date_created=form.date_created.data  
        db.session.commit()
        return drawing.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# delete a drawing
@drawing_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def deleteDrawing(drawing_id):
    drawing = Drawing.query.get(drawing_id)
    db.session.delete(drawing)
    db.session.commit()   
    return drawing.to_dict()
