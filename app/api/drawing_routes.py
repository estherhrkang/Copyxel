from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Drawing

user_routes = Blueprint('drawings', __name__)


# get all drawings by all users
@user_routes.route('/')
@login_required
def drawings():
    drawings = Drawing.query.all()
    return {'drawings': [drawing.to_dict() for drawing in drawings]}

# get a specific drawing by all users
@user_routes.route('/<int:id>')
@login_required
def drawing(id):
    drawing = Drawing.query.filter(Drawing.id == id).all()
    return drawing.to_dict()