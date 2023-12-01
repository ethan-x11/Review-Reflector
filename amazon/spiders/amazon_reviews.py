import scrapy
from urllib.parse import urljoin


class AmazonReviewsSpider(scrapy.Spider):
    name = "amazon_reviews"

    def __init__(self, region='', stars='6' , *args, **kwargs):
        super(AmazonReviewsSpider, self).__init__(*args, **kwargs)
        self.region = region.lower()
        
        # countrydict = {"india": 'https://www.amazon.in', "america": 'https://www.amazon.com', "british": 'https://www.amazon.co.uk'}

        try:
            self.base_url = f'https://www.amazon.{self.region}'
        except:
            raise ValueError('Invalid region provided. Please provide a valid region (india/america/british) using the -a option')
        
        stardict = {0:"all_stars", 5:"five_star", 4:"four_star", 3:"three_star", 2:"two_star", 1:"one_star"}
        
        self.stars = int(stars)
        try:
            self.star = stardict[self.stars]
        except:
            raise ValueError('Invalid country provided. Please provide a valid stars count using the -a option')
        
    custom_settings = {
        'FEEDS': { './data/%(asin)s_%(time)s.csv': { 'format': 'csv',}}
        }

    def start_requests(self):
        asin = getattr(self, 'asin', None) #Amazon product serial number
        star = getattr(self, 'star', None)
        if asin is None:
            raise ValueError('Please provide an ASIN using the -a option')
        amazon_reviews_url = f'{self.base_url}/product-reviews/{asin}?sortBy=recent&filterByStar={star}'
        yield scrapy.Request(url=amazon_reviews_url, callback=self.parse_reviews, meta={'asin': asin, 'retry_count': 0})


    def parse_reviews(self, response):
        asin = response.meta['asin']
        retry_count = response.meta['retry_count']

        next_page_relative_url = response.css(".a-pagination .a-last>a::attr(href)").get()
        if next_page_relative_url is not None:
            retry_count = 0
            next_page = urljoin(self.base_url, next_page_relative_url)
            yield scrapy.Request(url=next_page, callback=self.parse_reviews, meta={'asin': asin, 'retry_count': retry_count})

        ## Adding this retry_count here so we retry any amazon js rendered review pages
        elif retry_count < 3:
            retry_count = retry_count+1
            yield scrapy.Request(url=response.url, callback=self.parse_reviews, dont_filter=True, meta={'asin': asin, 'retry_count': retry_count})


        ## Parse Product Reviews
        review_elements = response.css("#cm_cr-review_list div.review") 
        for review_element in review_elements:
            yield {
                    "asin": asin,
                    "text": "".join(review_element.css("span[data-hook=review-body] ::text").getall()).strip(),
                    "title": review_element.css("*[data-hook=review-title]>span::text").get(),
                    "location_and_date": review_element.css("span[data-hook=review-date] ::text").get(),
                    "verified": bool(review_element.css("span[data-hook=avp-badge] ::text").get()),
                    "rating": review_element.css("*[data-hook*=review-star-rating] ::text").re(r"(\d+\.*\d*) out")[0],
                    }
    

