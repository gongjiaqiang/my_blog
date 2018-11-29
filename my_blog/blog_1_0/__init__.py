# coding=utf8
from flask import Blueprint

#  实例化 Blueprint 类，两个参数分别为蓝本的名字和蓝本所在包或模块，第二个通常填 __name__ 即可
main = Blueprint('main', __name__, template_folder='templates')

from . import views, login

@main.after_request
def after_request(response):
    """设置默认的响应报文格式为application/json"""
    # 如果响应报文response的Content-Type是以text开头，则将其改为默认的json类型
    if response.headers.get("Content-Type").startswith("text"):
        response.headers["Content-Type"] = "application/json"
    return response