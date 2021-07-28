from flask_wtf import FlaskForm
from wtforms import StringField, DateField
from wtforms.validators import DataRequired, ValidationError
# from app.models import Drawing


class DrawingForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    rows = StringField('rows', validators=[DataRequired()])
    date_created = DateField('date_created', validators=[DataRequired()])