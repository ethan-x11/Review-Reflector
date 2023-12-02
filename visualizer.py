import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import base64
from io import BytesIO
from wordcloud_list import generate_wordcloud

plt.style.use('ggplot')

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
    
    tmpfile = BytesIO()
    pos_fig.savefig(tmpfile, format='png')
    pos_fig_base64= base64.b64encode(tmpfile.getvalue()).decode('utf-8')
    pos_fig_png = '\'data:image/png;base64,{}\''.format(pos_fig_base64)
    
    neg_fig.savefig(tmpfile, format='png')
    neg_fig_base64= base64.b64encode(tmpfile.getvalue()).decode('utf-8')
    neg_fig_png = '\'data:image/png;base64,{}\''.format(neg_fig_base64)
    
    return {'positive': pos_fig_png, 'negative': neg_fig_png}

def RatingGraph(df):
    ratingVSdate = df[['date', 'rating']]
    rating_fig = plt.figure(figsize=(20, 4))
    sns.set(style="whitegrid")
    # Calculate the rolling mean of ratings
    rolling_mean = ratingVSdate['rating'].rolling(window=7).mean()
    # Plot the rolling mean as a smooth trend line
    sns.lineplot(x='date', y=rolling_mean, data=ratingVSdate, color='green', label='Smooth Trend')
    plt.xlabel('Time', fontsize=14, labelpad=10, color='green', fontweight='bold')
    plt.ylabel('Rating', fontsize=14, labelpad=10, color='green', fontweight='bold')
    plt.title('Rating VS Date', fontsize=20, color='green', fontweight='bold')
    plt.xticks(rotation=90)
    plt.gca().set_xticklabels([])
    plt.yticks([1, 2, 3, 4, 5])
    
    tmpfile = BytesIO()
    rating_fig.savefig(tmpfile, format='png')
    rating_fig_base64= base64.b64encode(tmpfile.getvalue()).decode('utf-8')
    rating_fig_png = '\'data:image/png;base64,{}\''.format(rating_fig_base64)
    return rating_fig_png

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

def fetch_wordcloud(df):
    thumbs_up = './Images/thumbs-up.png'
    thumbs_down = './Images/thumbs-down.png'
    positive_reviews_list = df.loc[df['label'] == 'positive', ['translated_text']]['translated_text'].tolist()
    negative_reviews_list = df.loc[df['label'] == 'negative', ['translated_text']]['translated_text'].tolist()
    pos_fig = generate_wordcloud(positive_reviews_list,thumbs_up)
    neg_fig = generate_wordcloud(negative_reviews_list,thumbs_down)
    
    tmpfile = BytesIO()
    pos_fig.savefig(tmpfile, format='png')
    pos_fig_base64= base64.b64encode(tmpfile.getvalue()).decode('utf-8')
    pos_fig_png = '\'data:image/png;base64,{}\''.format(pos_fig_base64)
    
    neg_fig.savefig(tmpfile, format='png')
    neg_fig_base64= base64.b64encode(tmpfile.getvalue()).decode('utf-8')
    neg_fig_png = '\'data:image/png;base64,{}\''.format(neg_fig_base64)
    
    res = {'positive': pos_fig_png, 'negative': neg_fig_png}
    
    return res

def visualization(filepath):
    df = pd.read_csv(f'./data/{filepath}')
    out = {}
    
    Scores = ScoreGraph(df)
    Ratings = RatingGraph(df)
    Rev = Reviews(df)
    wc = fetch_wordcloud(df)
    
    out = {
            'ScoreGraph': Scores, 
            'RatingGraph': Ratings,
            'wordcloud': wc, 
            'Reviews': Rev,
        }
    
    # print(out)
    
    return out



if __name__ == "__main__":
    out = visualization(filepath='B09G9FPHY6_2023-12-01.csv')
    print(out)
    import sys
    size_kb = sys.getsizeof(out)
    print(f"Size: {size_kb*10} KB")
    # plt.show()
    import json
    # Save out to a JSON file
    with open('./data/output.json', 'w') as file:
        json.dump(out, file)