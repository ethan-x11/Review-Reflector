import subprocess

# Ask the user for the ASIN
asin = input("Enter the ASIN: ")

# Construct the command
command = f"scrapy crawl amazon_reviews -a asin={asin}"

# Execute the command
subprocess.run(command, shell=True)