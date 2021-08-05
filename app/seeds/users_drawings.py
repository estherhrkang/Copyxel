from app.models import db, Drawing, User


def seed_users_drawings():
    drawing1 = Drawing.query.filter(Drawing.id == 1).first()

    user1 = User.query.filter(User.id == 1).first()

    drawing1.users.append(user1)

    db.session.commit()
