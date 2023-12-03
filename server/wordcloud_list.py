import nltk
from nltk.corpus import opinion_lexicon
from nltk.stem import SnowballStemmer
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from wordcloud import WordCloud
from PIL import Image
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

plt.style.use('ggplot')

nltk.download('punkt')
nltk.download('stopwords')
nltk.download('opinion_lexicon')

def generate_wordcloud(data,figure):
    word= []
    for i in data:
        word.append(word_tokenize(i.lower()))
    word_list = [i for sublist in word for i in sublist]
    stop_words = set()
    stemmer = set()
    stop_words.update(stopwords.words('english'))
    stemmer = SnowballStemmer('english')

    filtered_words = []
    for word in word_list: 
        if word not in stop_words and word.isalpha():
            stemmed_word = stemmer.stem(word)
            filtered_words.append(stemmed_word)

    words = set(opinion_lexicon.positive())

    word_list = [word for word in filtered_words if word in words]
    text = ' '.join(word_list)
    
    icon = Image.open(figure)
    image_mask = Image.new(mode='RGB', size = icon.size, color=(255,255,255))
    image_mask.paste(icon, box = icon)
    rgb_array = np.array(image_mask)

    word_cloud = WordCloud(mask = rgb_array, background_color='white',contour_width=1, contour_color='black',
                            colormap='viridis')
    word_cloud.generate(text)

    fig = plt.figure(figsize=([8, 8]))

    plt.imshow(word_cloud, interpolation='bicubic')
    plt.axis('off')
    # plt.show()
    return fig

if __name__ == '__main__':
    df = pd.read_csv('./data/B09G9FPHY6_2023-12-04.csv')
    data = df.loc[df['label'] == 'positive', ['translated_text']]['translated_text'].tolist()
    out = generate_wordcloud(data,'./Images/thumbs-up.png')
    out.show()