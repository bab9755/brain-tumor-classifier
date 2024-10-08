import tensorflow as tf
from preprocessing import crop_img
IMG_SIZE = 256

def process_image(image):
    cropped_image = crop_img(image)
    print('Cropped the image')
    resized_image = tf.image.resize(cropped_image, [IMG_SIZE, IMG_SIZE]) #resize the image to 256x256
    print('Resized the image')
    normalizer = tf.keras.layers.Rescaling(1./255)
    
    normalized_image = normalizer(resized_image)
    print('Normalize the image')
    return  normalized_image


def generate_model():
    return tf.keras.models.load_model('./brain_prediction_model.keras')