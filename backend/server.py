from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['JSON_SORT_KEYS'] = False
app.config['SQLALCHEMY_TRACK_NOTIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'

db = SQLAlchemy(app)

class Account(db.Model):
    username = db.Column(db.String(32), primary_key=True)
    password = db.Column(db.String(32))
    firstName = db.Column(db.String(32))
    lastName = db.Column(db.String(32))
    role = db.Column(db.String(32))

@app.route('/test')
def test():
    account = Account(username="testuser", password="testpassword")
    db.session.add(account)
    db.session.commit()

    return 'added'


@app.route('/view')
def view():
    account = Account.query.filter_by(username="testuser").first()
    return "%s, %s" % (account.username, account.password)


@app.route('/', methods = ['GET'])
def home():
    resp = 'hi'
    return resp

if __name__ == "__main__":
    app.run(host = "0.0.0.0", port=80)
