from flask import Flask, render_template, request, jsonify
import controller

App = Flask(__name__)


@App.route('/')
def index():
    return render_template('index.html')


@App.route('/data', methods=['GET'])
def data():
    action = request.args.get('action')
    query = request.args.get('query')

    output = controller.generate_output(action, query)

    return jsonify(output)


if __name__ == '__main__':
    App.run(debug=True)
