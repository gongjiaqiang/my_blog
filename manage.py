# coding=utf8

import os
from my_blog import create_app, db
from flask_script import Manager, Shell
from flask_migrate import Migrate, MigrateCommand


app = create_app('default')
manager = Manager(app)
migrate = Migrate(app, db)

def make_shell_context():
    return dict(app=app, db=db)

manager.add_command('shell', Shell(make_context=make_shell_context))
manager.add_command('db', MigrateCommand)


if __name__ == '__main__':
    manager.run()
    # print(app.url_map)
    # app.run(host="0.0.0.0", port=5000)
