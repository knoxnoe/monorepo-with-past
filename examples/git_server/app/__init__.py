from flask import Flask
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from app.config import config
from app.userapp.models import User

from app.repositoryapp.models import Repository
from app.extensions import db, migrate
from app.views import DEFAULT_BLUEPRINT
from management.commands import UserFactory, UserList, RepositoryFactory, RepositoryList


def create_app(config_name):
    # 创建应用实例
    app = Flask(__name__)
    # 通过类初始化配置
    app.config.from_object(config[config_name])
    # 配置蓝本
    config_blueprint(app)
    # 初始化插件
    db.init_app(app)
    migrate.init_app(app, db)
    # 返回应用实例
    return app

def create_manager(app):
    manager = Manager(app)
    manager.add_command('db', MigrateCommand)
    manager.add_command('make_user', UserFactory())
    manager.add_command('list_user', UserList())
    manager.add_command('make_repo', RepositoryFactory())
    manager.add_command('list_repo', RepositoryList())

    return manager

def config_blueprint(app):
    for blueprint, url_prefix in DEFAULT_BLUEPRINT:
        app.register_blueprint(blueprint, url_prefix=url_prefix)

