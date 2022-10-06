from sqlalchemy import and_
from app.extensions import db
from datetime import datetime

class User(db.Model):
    __tablename__ = "user"
    __table_args__ = {
        'mysql_charset': 'utf8mb4'
    }
    __fields__ = ["id", "nickname", "password_hash", "create_time"]
    # 主键 自增
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    # 用户名 唯一 加索引 据说unique会自动被加索引
    nickname = db.Column(db.String(128), unique=True, index=True, nullable=False)
    # 密码的哈希 暂定用SHA-256
    password_hash = db.Column(db.String(256))
    # 创建时间
    create_time = db.Column(db.DateTime, default=datetime.now())
    
    @classmethod
    def make_user(cls, nickname):
        '''插入一个用户至数据库'''
        user = User(nickname=nickname)
        db.session.add(user)
        db.session.commit()

    @classmethod
    def all_user(cls):
        '''返回数据库中所有用户'''
        users = User.query.all()
        return users

    @classmethod
    def get_user(cls, nickname, password_hash):
        user = User.query.filter(and_(User.nickname == nickname, User.password_hash == password_hash))
        return user

    @classmethod
    def reg(cls, nickname, password_hash):
        user = User(nickname=nickname, password_hash=password_hash)
        db.session.add(user)
        db.session.commit()
        return "注册成功"

    @classmethod
    def get_nickname(cls, nickname):
        user = User.query.filter(User.nickname == nickname)
        return user
        


