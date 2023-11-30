from amazon_review import fetch_reviews
from sentiment_analysis import review_score
import pandas as pd
from gtranslator import translation_loop

def translator(filepath):
    df = pd.read_csv(f'./data/{filepath}')

    # Check if the "label" column exists and every row has data
    if 'translated_text' in df.columns:
        # Check if every row has data in the "label" column
        if df['translated_text'].notnull().values.any():
            print('Translated text values already exists')
            return filepath
    text_list = df['text'].tolist()
    translated = translation_loop(text_list)
    df['translated_text'] = [translated[i] for i in range(len(translated))]

    # Save the DataFrame back to the CSV file
    df.to_csv(f'./data/{filepath}', index=False)
    # print(translated)
    return "Success!"

def sentiment_scores(filepath):
    if not filepath:
        return "Error"
    else:
        # Open the CSV file
        df = pd.read_csv(f'./data/{filepath}')
        
        # Check if the "label" column exists and every row has data
        if 'label' in df.columns:
            # Check if every row has data in the "label" column
            if df['label'].notnull().values.any():
                print('Scores already exists in label column')
                return filepath
        
        # Pass the text column as a list to the review_score function
        text_list = df['text'].tolist()
        scores = review_score(text_list)
        
        # Add new columns for label and score
        df['label'] = [scores[i]['label'] for i in range(len(scores))]
        df['score'] = [scores[i]['score'] for i in range(len(scores))]
        
        # Save the DataFrame back to the CSV file
        df.to_csv(f'./data/{filepath}', index=False)
        
    return filepath

def analyzer(url):
    try:
        out = fetch_reviews(url)
    except:
        return "Runtime Error"
    
    if not out:
        return "Error"
    else:
        sentiment_scores(out)
        translator(out)
        
    return out
    

if __name__ == "__main__":
    url = input("Enter the URL: ")
    print(analyzer(url))