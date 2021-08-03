from app.models import db, Drawing


def seed_drawings():
    masterpiece = Drawing(
        colors=[
            ["#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff"], 
            ["#fff", "#fff", "#e91e63", "#fff", "#e91e63", "#fff", "#e91e63", "#fff", "#fff", "#fff"], 
            ["#fff", "#fff", "#fff", "#e91e63", "#e91e63", "#e91e63", "#fff", "#fff", "#fff", "#fff"], 
            ["#fff", "#fff", "#fff", "#e91e63", "#fff", "#e91e63", "#e91e63", "#fff", "#fff", "#fff"], 
            ["#fff", "#fff", "#e91e63", "#e91e63", "#e91e63", "#e91e63", "#e91e63", "#fff", "#fff", "#fff"], 
            ["#fff", "#fff", "#e91e63", "#e91e63", "#fff", "#e91e63", "#e91e63", "#fff", "#fff", "#fff"], 
            ["#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff"], 
            ["#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff"], 
            ["#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff"], 
            ["#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff"]
        ],
        date_created='2021-07-25'
    )

    db.session.add(masterpiece)

    db.session.commit()


def undo_drawings():
    db.session.execute('TRUNCATE drawings RESTART IDENTITY CASCADE;')
    db.session.commit()
