# coding=utf8

from flask import render_template,request

from . import main

@main.route('/login', methods=['GET', 'POST'])
def login_process():
    if request.method == 'GET':
        return render_template('login.html')
    else:
        name = request.data.get('email')
        password = request.data.get('password')
        return render_template('index.html')


@main.route('/register', methods=['GET', 'POST'])
def register_process():
    if request.method == 'GET':
        return render_template('register.html')
    else:
        # name = request.data.get('email')
        # password = request.data.get('password')
        return render_template('login.html')