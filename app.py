from flask import Flask, render_template, jsonify
import os

app = Flask(__name__, 
           template_folder='src/templates',
           static_folder='src/static',
           static_url_path='/static')

@app.route('/')
def counter_app():
    return render_template('index.html')

@app.route('/health')
def health_check():
    return jsonify({
        'status': 'healthy',
        'service': 'housley-counter',
        'version': '1.0.0'
    }), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)