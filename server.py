#!/usr/bin/env python
# coding: utf-8

from flask import Flask, request, jsonify
import logbook

from extract import fetch_maori_translation


def apply_logging():
    from os.path import abspath, exists, dirname, join

    server_log_file = join(dirname(abspath(__file__)), "maori.log")
    if not exists(server_log_file):
        open(server_log_file, "w").close()

    logbook.set_datetime_format("local")
    local_log = logbook.FileHandler(server_log_file)
    local_log.format_string = (
        u'[{record.time:%Y-%m-%d %H:%M:%S}] '
        u'lineno:{record.lineno} '
        u'{record.level_name}:{record.message}')
    local_log.push_application()


apply_logging()
app = Flask(__name__)


@app.route("/", methods=['GET'])
def translate():
    text = request.args.get('text')
    ip = request.headers.get("X-Real-IP", "")
    logbook.info(" {} {}".format(ip, text.encode("utf-8")))
    return jsonify(fetch_maori_translation(text))


if __name__ == "__main__":
    app.run(host="127.0.0.1", port="8004")
