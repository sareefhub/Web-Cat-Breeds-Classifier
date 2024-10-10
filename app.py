import os
from flask import Flask, request, redirect, url_for, render_template
from werkzeug.utils import secure_filename
from predict import predict_image  # Import predict_image from predict.py

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/uploads'

ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        if 'file' not in request.files:
            return redirect(request.url)

        file = request.files['file']

        if file and allowed_file(file.filename):
            # ลบไฟล์เก่าทั้งหมดใน UPLOAD_FOLDER
            for filename in os.listdir(app.config['UPLOAD_FOLDER']):
                file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                try:
                    os.remove(file_path)
                except Exception as e:
                    print(f"Error deleting file {file_path}: {e}")

            # บันทึกไฟล์ใหม่
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)

            # Predict the image using predict_image function
            label, score = predict_image(filepath)

            return render_template('index.html', label=label, score=score, image_url=filepath)

    # การรีไดเร็กต์กลับไปที่หน้าแรกเมื่อรีเฟรช
    return render_template('index.html', label=None, score=None)

if __name__ == '__main__':
    app.run(debug=True)
