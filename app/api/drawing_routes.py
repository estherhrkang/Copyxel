from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Drawing

drawing_routes = Blueprint('drawings', __name__)


# get all drawings by all users
@drawing_routes.route('/')
@login_required
def drawings():
    drawings = Drawing.query.all()
    return {'drawings': [drawing.to_dict() for drawing in drawings]}


# get a specific drawing by all users
@drawing_routes.route('/<int:id>')
@login_required
def drawing(id):
    drawing = Drawing.query.filter(Drawing.id == id).all()
    return drawing.to_dict()