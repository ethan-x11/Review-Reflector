import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import nltk
from nltk.corpus import opinion_lexicon
from nltk.stem import SnowballStemmer
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from wordcloud import WordCloud
from PIL import Image
import numpy as np

plt.style.use('ggplot')

# nltk.download('punkt')
# nltk.download('stopwords')
# nltk.download('opinion_lexicon')


def ScoreGraph(df):
    positive_score = df.loc[df['label'] == 'positive', ['date', 'score']]
    pos_fig = plt.figure(figsize=(20, 4))
    sns.set(style="whitegrid")
    sns.lineplot(x='date', y='score', data=positive_score, color='green', errorbar=None,  linestyle='--', marker='o')
    sns.barplot(x='date', y='score', data=positive_score,errorbar=None, hue='date', legend=False, alpha=0.7, palette=sns.color_palette("crest", n_colors=len(positive_score)))
    plt.xlabel('Date Range: ' + str(positive_score['date'].min()) + ' to ' + str(positive_score['date'].max()), fontsize=14, labelpad=10, color='green', fontweight='bold')
    plt.ylabel('Positivity',fontsize=14, labelpad=10, color='green', fontweight='bold')
    plt.title('Positive Score Graph', fontsize=20, color='green', fontweight='bold' )
    plt.xticks(rotation=90)
    plt.gca().set_xticklabels([])
    # plt.show()
    
    negative_score = df.loc[df['label'] == 'negative', ['date', 'score']]
    neg_fig = plt.figure(figsize=(20, 4))
    sns.set(style="whitegrid")
    sns.lineplot(x='date', y='score', data=negative_score, color='green', errorbar=None,  linestyle='--', marker='o')
    sns.barplot(x='date', y='score', data=negative_score,errorbar=None, hue='date', legend=False, alpha=0.7, palette=sns.color_palette("crest", n_colors=len(negative_score)))
    plt.xlabel('Date Range: ' + str(negative_score['date'].min()) + ' to ' + str(negative_score['date'].max()), fontsize=14, labelpad=10, color='green', fontweight='bold')
    plt.ylabel('Negativity',fontsize=14, labelpad=10, color='green', fontweight='bold')
    plt.title('Negative Score Graph', fontsize=20, color='green', fontweight='bold' )
    plt.xticks(rotation=90)
    plt.gca().set_xticklabels([])
    return {'positive': pos_fig, 'negative': neg_fig}

def RatingGraph(df):
    ratingVSdate = df[['date', 'rating']]
    rating_fig = plt.figure(figsize=(20, 4))
    sns.set(style="whitegrid")
    sns.lineplot(x='date', y='rating', data=ratingVSdate, color='green', errorbar=None, label='Line', linestyle='--', marker='o')
    # sns.barplot(x='date', y='rating', data=ratingVSdate,errorbar=None, hue='date', legend=False, alpha=0.7, palette=sns.color_palette("crest", n_colors=len(ratingVSdate)//2))
    plt.xlabel('Time', fontsize=14, labelpad=10, color='green', fontweight='bold')
    plt.ylabel('Rating',fontsize=14, labelpad=10, color='green', fontweight='bold')
    plt.title('Rating VS Date', fontsize=20, color='green', fontweight='bold' )
    plt.xticks(rotation=90)
    plt.gca().set_xticklabels([])
    return rating_fig

def Reviews(df):
    Top_positive_review = df.loc[(df['label'] == 'positive') & (df['rating'] == 5.0)]
    Top_positive_review.sort_values(by='score', ascending=False, inplace=True)
    Top_positive_review = Top_positive_review[['date', 'title', 'text', 'location']].reset_index(drop=True)
    Top_positive_review = Top_positive_review.head(10).to_dict(orient='index')
    # print(Top_positive_review)
    Top_negative_review = df.loc[(df['label'] == 'negative') & (df['rating'] == 1.0)]
    Top_negative_review.sort_values(by='score', ascending=False, inplace=True)
    Top_negative_review = Top_negative_review[['date', 'title', 'text', 'location']].reset_index(drop=True)
    Top_negative_review = Top_negative_review.head(10).to_dict(orient='index')
    
    Critical = df.loc[(df['label'] == 'negative')]
    Critical.sort_values(by='score', ascending=False, inplace=True)
    Critical = Critical [['date', 'title','text', 'rating', 'location' ]].head(1).reset_index(drop=True).to_dict(orient='records')[0]
    
    res = {'Critical_Reviews': Critical, 'Top_Reviews':{'Positive':Top_positive_review, 'Negative':Top_negative_review} }

    return res

def word_cloud(df):
    return

def visualization(filepath):
    df = pd.read_csv(f'./data/{filepath}')
    out = {}
    
    Scores = ScoreGraph(df)
    Ratings = RatingGraph(df)
    Rev = Reviews(df)
    wc = word_cloud(df)
    
    out = {'ScoreGraph': Scores, 'RatingGraph': Ratings, 'Reviews': Rev}
    
    # print(out)
    
    return out



if __name__ == "__main__":
    visualization(filepath='B09G9FPHY6_2023-12-01.csv')
