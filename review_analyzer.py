from amazon_review import fetch_reviews
from sentiment_analysis import review_score
import pandas as pd

def sentiment_scores(url):
    try:
        filepath = fetch_reviews(url)
    except:
        return "Runtime Error"
    
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
        
    

if __name__ == "__main__":
    url = input("Enter the URL: ")
    print(sentiment_scores(url))