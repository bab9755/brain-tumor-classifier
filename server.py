from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
from handle_upload import process_image, generate_model
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

origins = [
    'http://localhost:3000'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins
)

class Image(BaseModel):
    image: bytes ##takes in the image to be analyzed
    format: str

class Prediction(BaseModel):
    diagnosis: str #return the type of brain tumor



@app.get("/")
def home():
    return {"message": "This is a brain turmor prediction model"}

@app.post('/predict')
def predict(file: UploadFile, response_model=Prediction):
    # prediction = diagnose()
    image = file.file.read()
    print('Got the image file from fast api')

    processed_image = process_image(image)
    model = generate_model()
    print('Regenerate the model')
    class_names = ['glioma', 'meningioma', 'notumor', 'pituitary']
    prediction = model.predict(processed_image)
    predicted_class = class_names[np.argmax(prediction)]

    return {"diagnosis": predicted_class}