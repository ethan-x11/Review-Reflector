from requests_html import HTMLSession, HTML
from typing import List
import pandas as pd
import csv

class ReviewsScraper:
    def __init__(self, asin: str, region: str , *args, **kwargs):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) '
                        'AppleWebKit/537.11 (KHTML, like Gecko) '
                        'Chrome/23.0.1271.64 Safari/537.11',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
            'Accept-Encoding': 'none',
            'Accept-Language': 'en-US,en;q=0.8',
            'Connection': 'keep-alive'
        }
        self.asin = asin
        self.region = region.lower()
        self.base_url = f'https://www.amazon.{self.region}/product-reviews/{self.asin}/'
        # self.session = HTMLSession()

    def get_reviews_from_page(self, page_content: int) -> List[dict]:
        reviews = []
        #asin,text,title,verified,rating,location,date
        for tag in page_content.find('div[data-hook=review]'):
            try:
                title = tag.find('a[data-hook=review-title]', first=True).text[19:]
                rating = tag.find('i[data-hook=review-star-rating]', first=True).text.replace('.0 out of 5 stars', '')
                location_and_date = tag.find('span[data-hook=review-date]', first=True).text
                try:
                    verified = bool(tag.find('span[data-hook=avp-badge]', first=True).text)
                except:
                    verified = False
                text = tag.find('span[data-hook=review-body]', first=True).text.replace('\n', '')
                reviews.append({
                    'title': title,
                    'rating': rating,
                    'text': text,
                    'verified': verified,
                    'location_and_date': location_and_date
                })
            except:
                pass
        return reviews

    def has_reviews(self, page_content: HTML) -> bool:
        if page_content.find('div[data-hook=review]'):
            return True
        return False

    def iterate_over_pages(self) -> List[dict]:
        reviews = []
        stardict = {0:"all_stars", 5:"five_star", 4:"four_star", 3:"three_star", 2:"two_star", 1:"one_star"}
        for star in range(0,6):
            star_val = stardict[star]
            retry_count = 0
            print(f"\nStar: {star_val}")
            i = 1
            while i <= 10:
                print(f"Page: {i}")
                amazon_reviews_url = f'{self.base_url}?sortBy=recent&filterByStar={star_val}&pageNumber={i}'
                session = HTMLSession()
                r = session.get(f'{amazon_reviews_url}', headers=self.headers)
                if self.has_reviews(r.html):
                    new_reviews = self.get_reviews_from_page(r.html)
                    # print("New reviews")
                    # print(new_reviews)
                    reviews += new_reviews
                    retry_count = 0
                elif retry_count < 3:
                    retry_count += 1
                    print("Retrying previous page")
                    i -= 1
                else:
                    print("No reviews")
                    print(r.html)
                    break
                i += 1
        return reviews

    def save_to_file(self, reviews: List[dict], filepath: str):
        if reviews:
            fieldnames = ['asin', 'title', 'rating', 'text', 'verified', 'location_and_date']
            df = pd.DataFrame(reviews)
            df['asin'] = self.asin  # Add asin value to each row
            df = df[fieldnames]
            df.to_csv(filepath, index=False)



if __name__ == '__main__':
    asin = 'B0B3N94THK'
    # asin = 'B09G9FPH6'
    scraper = ReviewsScraper(asin=asin, region = "in")
    all_reviews = scraper.iterate_over_pages()
    print("Done.")
    print(all_reviews)
    scraper.save_to_file(all_reviews, f"./data/{asin}.csv")
