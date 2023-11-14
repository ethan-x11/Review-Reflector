import scrapy
from urllib.parse import urljoin


class AmazonReviewsSpider(scrapy.Spider):
    name = "amazon_reviews"

    def __init__(self, country='', *args, **kwargs):
        super(AmazonReviewsSpider, self).__init__(*args, **kwargs)
        self.country = country.lower()

        if self.country == 'india':
            self.base_url = 'https://www.amazon.in'
        elif self.country == 'america':
            self.base_url = 'https://www.amazon.com'
        elif self.country == 'british':
            self.base_url = 'https://www.amazon.co.uk'
        else:
            raise ValueError('Invalid country provided. Please provide a valid country (india/america/british) using the -a option')

    custom_settings = {
        'FEEDS': { './../../data/%(asin)s_%(time)s.csv': { 'format': 'csv',}}
        }

    def start_requests(self):
        asin = getattr(self, 'asin', None)
        if asin is None:
            raise ValueError('Please provide an ASIN using the -a option')
        amazon_reviews_url = f'{self.base_url}/product-reviews/{asin}/'
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
    

