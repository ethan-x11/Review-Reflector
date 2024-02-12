from langdetect import detect
from deep_translator import GoogleTranslator
from tqdm import tqdm
import pandas as pd


# Simple function to detect and translate text
def detect_and_translate(text, target_lang='en'):
    try:
        result_lang = detect(text)
    except:
        result_lang = target_lang
    
    if result_lang == target_lang:
        return text
    else:
        translator = GoogleTranslator(source='auto', target='en')
        translate_text = translator.translate(text)
        return translate_text
    
def translation_loop(textlist,target_lang='en'):
    res = {}
    print("Translating...")
    df = pd.DataFrame({'Text': textlist})
    for i, texts in tqdm(df.iterrows(), total=len(df)):
        try:
            text = texts['Text']
            translated_text = detect_and_translate(text, target_lang)
            res[i] = translated_text
        except RuntimeError:
            print(f'\nBroke for id {i}')

    return res

if __name__ == '__main__':
    example = ["english is a good language", "নমস্কার"]
    print(translation_loop(example, 'en'))
