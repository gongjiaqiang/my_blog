# coding=utf8

from flask import render_template,request, jsonify
from my_blog.utils.commons import RET

from . import main

@main.route('/login', methods=['POST'])
def login_process():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    return jsonify(errno=RET.OK, errmsg="OK",data={})



@main.route('/register', methods=['POST'])
def register_process():

    return jsonify(errno=RET.OK)

