from flask import Blueprint, jsonify, request
from app import forms
from flask_login import login_required, current_user
from app.models import db, Comment, Drawing, User

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


# get all comments on a drawing


# create a comment on a drawing


# edit a comment on a drawing


# delete a comment on a drawing
