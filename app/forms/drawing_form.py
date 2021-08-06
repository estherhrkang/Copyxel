from flask_wtf import FlaskForm
from wtforms import StringField, DateField
from wtforms.validators import DataRequired


class DrawingForm(FlaskForm):
    colors = StringField('colors', validators=[DataRequired()])
    sample_colors = StringField('sample_colors', validators=[DataRequired()])
    date_created = DateField('date_created', validators=[DataRequired()])