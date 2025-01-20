# This server listens for POST requests to /remove-background
# The requests must contain a 'image' key with the image file
# The server will remove the background and return the processed image
# The server will run on port 5000

from flask import Flask, request, jsonify, send_file
from rembg import remove
from PIL import Image
import io
from flask_ngrok import run_with_ngrok

app = Flask(__name__)
run_with_ngrok(app)  # This will expose your local server to the internet

@app.route('/remove-background', methods=['POST'])
def remove_background():
    if 'image' not in request.files:
        return jsonify({"error": "No image file uploaded"}), 400
    
    file = request.files['image']
    input_image = file.read()
    output_image = remove(input_image)
    
    # Save the processed image temporarily
    output_path = 'output.png'
    with open(output_path, 'wb') as f:
        f.write(output_image)
    
    return send_file(output_path, mimetype='image/png')