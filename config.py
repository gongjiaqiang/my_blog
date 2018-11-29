# coding=utf8

import os
import redis
from logging.config import dictConfig


basedir = os.path.abspath(os.path.dirname(__name__))

class Config(object):
    """基本配置参数"""
    SECRET_KEY = "TQ6uZxn+SLqiLgVimX838/VplIsLbEP5jV7vvZ+Ohqw="
    # SECRET_KEY = os.environ.get('SECRET_KEY') or 'this is a secret string'
    SQLALCHEMY_TRACK_MODIFICATIONS = True

    # 创建redis实例用到的参数
    REDIS_HOST = "127.0.0.1"
    REDIS_PORT = 6379

    # flask-session使用的参数
    SESSION_TYPE = "redis"  # 保存session数据的地方
    SESSION_USE_SIGNER = True  # 为session id进行签名
    SESSION_REDIS = redis.StrictRedis(host=REDIS_HOST, port=REDIS_PORT)  # 保存session数据的redis配置
    PERMANENT_SESSION_LIFETIME = 86400  # session数据的有效期秒

    @staticmethod
    def init_app(self):
        pass

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DATABASE_URL') or 'mysql+pymysql://root:mysql@localhost/mysite'

class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DATABASE_URL') or 'mysql+pymysql://root:mysql@localhost/mysite'

class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DATABASE_URL') or 'mysql+pymysql://root:mysql@localhost/mysite'


config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}

# dictConfig({
#     'version': 1,
#     'formatters': {'default': {
#         'format': '[%(asctime)s] %(levelname)s in %(module)s: %(message)s',
#     }},
#     'handlers': {'wsgi': {
#         'class': 'logging.StreamHandler',
#         'stream': 'ext://flask.logging.wsgi_errors_stream',
#         'formatter': 'default'
#     }},
#     'root': {
#         'level': 'INFO',
#         'handlers': ['wsgi']
#     }
# })
