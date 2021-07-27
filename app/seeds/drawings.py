# from app.models import db, Drawing


# def seed_drawings():
#     cherry = Drawing(
#         title='cherry', rows='', date_created='2021-07-27')
#     dog = Drawing(
#         username='dog', rows='', date_created='2021-07-28')
#     hamburger = Drawing(
#         username='hamburger', rows='', date_created='2021-07-29')

#     db.session.add(cherry)
#     db.session.add(dog)
#     db.session.add(hamburger)

#     db.session.commit()


# # Uses a raw SQL query to TRUNCATE the users table.
# # SQLAlchemy doesn't have a built in function to do this
# # TRUNCATE Removes all the data from the table, and RESET IDENTITY
# # resets the auto incrementing primary key, CASCADE deletes any
# # dependent entities
# def undo_users():
#     db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
#     db.session.commit()
