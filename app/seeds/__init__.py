from flask.cli import AppGroup
from .users import seed_users, undo_users
from .drawings import seed_drawings, undo_drawings
# from .users_drawings import seed_users_drawings
# from .likes import seed_likes

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    # seed_drawings()
    # seed_users_drawings()
    # seed_likes()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # undo_drawings()
    # Add other undo functions here
