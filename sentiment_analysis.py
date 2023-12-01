import pandas as pd
import numpy as np
from transformers import AutoTokenizer, AutoConfig
from transformers import AutoModelForSequenceClassification
from scipy.special import softmax
from tqdm import tqdm


# Set default label as "null" and score as 0
default_scores_dict = {
    'label': 'null',
    'score': 0
}
    
def polarity_scores_roberta(text,tokenizer,model):    
    try:
        encoded_text = tokenizer(text, return_tensors='pt')
        output = model(**encoded_text)
        scores = output[0][0].detach().numpy()
        scores = softmax(scores)
        
        # scoredict = {"negative": scores[0], "neutral": scores[1], "positive": scores[2]}
        # print("\n" ,text , " : ", scoredict , "\n")
        
        max_index = np.argmax(scores)
        if max_index == 0:
            scores_dict = { 
                'label': 'negative',
                'score': scores[max_index]
            }
        elif max_index == 1:
            scores_dict = {
                'label': 'neutral',
                'score': scores[max_index]
            }
        else:
            scores_dict = {
                'label': 'positive',
                'score': scores[max_index]
            }
            
    except RuntimeError:
        scores_dict = default_scores_dict
    
    return scores_dict

def review_score(textlist):
    print("\nLoading Model...")
    # MODEL = f"cardiffnlp/twitter-roberta-base-sentiment-latest"
    MODEL = f"cardiffnlp/twitter-xlm-roberta-base-sentiment"
    tokenizer = AutoTokenizer.from_pretrained(MODEL)
    config = AutoConfig.from_pretrained(MODEL)
    model = AutoModelForSequenceClassification.from_pretrained(MODEL)
    tokenizer.save_pretrained(MODEL)
    model.save_pretrained(MODEL)
    print("Model Loading Success\n")
    
    res = {}
    print("Calculating Scores...")
    df = pd.DataFrame({'Text': textlist})
    for i, texts in tqdm(df.iterrows(), total=len(df)):
        try:
            text = texts['Text']
            scores_dict = polarity_scores_roberta(text,tokenizer,model)
            res[i] = scores_dict
        except RuntimeError:
            print(f'\nBroke for id {i}')

    return res
            
if __name__ == '__main__':
    textlist = ['I love sentiment analysis!', 'I hate sentiment analysis!','Really Good', 'I hate sentiment analysis!']
    print( review_score(textlist) )
    # t='I’m so disappointed with this purchase. After updates and even a factory reset to try and remedy the issue, this iPad kept freezing and restarting every few minutes. I asked for a replacement but have to return and wait up to 30 days for a refund to potentially repurchase. When I get my refund I’m going to Best Buy.'
    # print( polarity_scores_roberta(t) )