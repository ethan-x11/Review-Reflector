import subprocess

def review_scrapper(asin, country):
    # Construct the command
    command = f"scrapy crawl amazon_reviews -a asin={asin} -a country={country}"

    # Execute the command
    subprocess.run(command, shell=True)
    
    
# Ask the user for the ASIN
asin = input("Enter the ASIN: ")
country = input("Enter the country: ")
review_scrapper(asin, country)