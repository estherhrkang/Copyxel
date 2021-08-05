from app.models import db, Drawing, User


def seed_likes():
    drawing1 = Drawing.query.filter(Drawing.id == 1).first()

    user1 = User.query.filter(User.id == 1).first()

    drawing1.liked_users.append(user1)

    db.session.commit()
