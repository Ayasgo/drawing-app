from flask import Flask, render_template, request
import csv
app = Flask(__name__)

@app.route('/', methods = ['POST', 'GET'])
def index():
    if request.is_json:
        paths = request.get_json().get('paths')

        with open('static/data.csv', 'a', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(paths)
        return {}
        
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
   