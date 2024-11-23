from flask import Flask, render_template

app = Flask(__name__, static_folder='static')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/editor')
def editor():
    return render_template('language_select.html')

@app.route('/editor/cpp')
def cpp_editor():
    return render_template('cpp_editor.html')

if __name__ == '__main__':
    app.run(debug=True)
