#!/usr/bin/env python
# coding: utf-8

from flask import Flask, request, jsonify

from extract import fetch_maori_translation

app = Flask(__name__)


@app.route("/", methods=['GET'])
def translate():
    text = request.args.get('text')
    return jsonify(fetch_maori_translation(text))


if __name__ == "__main__":
    app.run(host="127.0.0.1", port="8004")
