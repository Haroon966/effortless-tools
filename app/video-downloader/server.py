from flask import Flask, request, jsonify
import yt_dlp
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def download_youtube_video(url, download_path='./'):
    # The options for the yt_dlp.YoutubeDL downloader
    ydl_opts = {
        'outtmpl': f'{download_path}/video.mp4',  # Save video with its title
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])
        # Assuming the video is downloaded successfully, return the path
        return f"{download_path}/{ydl.prepare_filename(ydl.extract_info(url))}"

@app.route('/download-video', methods=['GET'])
def download_video():
    video_id = request.args.get('videoId')
    download_path = request.args.get('downloadPath', './public/downloads')  # Get download path from query params

    if not video_id:
        return jsonify({"error": "No video ID provided"}), 400

    # Ensure the download path exists
    os.makedirs(download_path, exist_ok=True)

    video_url = f"https://www.youtube.com/watch?v={video_id}"

    try:
        file_path = download_youtube_video(video_url, download_path)
        return jsonify({"downloadUrl": file_path}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)  # Run the server on port 5000