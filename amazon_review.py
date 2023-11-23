import subprocess
import datetime
import time
import os
import os
import datetime
import pandas as pd
import re
import datetime
import requests

def review_scrapper_script(asin, region):
    # Construct the filename with the current date
    date = datetime.datetime.now().strftime("%Y-%m-%d")
    filename = f"{asin}_{date}.csv"
    filetemp = f"{asin}_{date}temp.csv"
    if not os.path.exists(f"./data/{filename}"):
        # Create an empty CSV file with the filename
        open(f"./data/{filename}", 'w').close()

    # Construct the command
    for stars in range(0,6):
        print("\nFetching Reviews of " , stars , " stars\n")
        command = f"scrapy crawl amazon_reviews -a asin={asin} -a country={region} -a stars={stars} -t csv -o ./data/{filetemp}"

        # Execute the command
        subprocess.run(command, shell=True)
        
            #if the csv file has data, append it to the filename
        if os.path.exists(f"./data/{filetemp}") and os.path.getsize(f"./data/{filetemp}") > 0:
            # Read the data from filetemp
            df_temp = pd.read_csv(f"./data/{filetemp}")

            # Check if the filename already exists
            if os.path.exists(f"./data/{filename}"):
                # Read the existing data from filename
                
                if os.path.exists(f"./data/{filename}") and os.path.getsize(f"./data/{filename}") > 0:
                    df_existing = pd.read_csv(f"./data/{filename}")
                else:
                    df_existing = pd.DataFrame()

                # Append the data from filetemp to filename
                df_combined = pd.concat([df_existing, df_temp], ignore_index=True)

                # Write the combined data back to filename
                df_combined.to_csv(f"./data/{filename}", index=False)
            else:
                # Write the data from filetemp to filename
                df_temp.to_csv(f"./data/{filename}", index=False)

        # Delete the filetemp
        if os.path.exists(f"./data/{filetemp}"):
            os.remove(f"./data/{filetemp}")
    
    #if the csv file have data then keep it else delete it
    if (os.path.exists(f"./data/{filename}") and os.path.getsize(f"./data/{filename}") <= 0):
        #delete the file
        os.remove(f"./data/{filename}")
        return False

    # Return the filename
    return filename

def extract_location_and_date(filename):
    # Load the CSV file using pandas
    df = pd.read_csv(f"./data/{filename}")

    # Check if the dataset has the "location_and_date" column
    if "location_and_date" not in df.columns:
        print(f"File {filename} does not have the 'location_and_date' column.")
        return filename

    # Extract the location and date from the "location_and_date" column
    df["location"] = df["location_and_date"].str.replace("Reviewed in ", "")
    df["location"] = df["location"].str.split(" on ").str[0]
    df["date"] = df["location_and_date"].str.split(" on ").str[1]

    # Format the date in yyyy-mm-dd numerical format
    df["date"] = pd.to_datetime(df["date"], format='mixed').dt.strftime("%Y-%m-%d")

    # Drop the "location_and_date" column
    df.drop("location_and_date", axis=1, inplace=True)
    
    # Sort the DataFrame by the "date" column in ascending order
    df.sort_values("date", inplace=True)

    # Write the updated dataframe back to the same CSV file
    df.to_csv(f"./data/{filename}", index=False)

    # Return the filename of the updated file
    return filename



def clean_dataset(filename):
    print("Cleaning Dataset")
    # Load the CSV file using pandas
    df = pd.read_csv(f"./data/{filename}")

    # Check if the dataset has any data
    if df.empty:
        return "Empty df"

    # Clean the "text" column
    df["text"] = df["text"].str.replace(r'^The media could not be loaded\.\s*', '', regex=True)

    # Drop duplicate rows based on all columns
    df.drop_duplicates(inplace=True)

    # Remove rows with blank data in any column
    df.dropna(inplace=True)

    # Write the cleaned dataframe back to the same CSV file
    df.to_csv(f"./data/{filename}", index=False)

    extract_location_and_date(filename)
    print("Dataset Cleaned")
    # Return the filename of the cleaned file
    return filename


def scrape_review(asin, region):
    date = datetime.datetime.now().strftime("%Y-%m-%d")
    filename = f"{asin}_{date}.csv"
    filepath = os.path.join("./data/", filename)

    # Check if the file already exists and has data
    if os.path.exists(filepath) and os.path.getsize(filepath) > 0:
        print(f"File {filename} already exists and has data.")
    else:
        filename = review_scrapper_script(asin, region)
        if(filename):
            clean_dataset(filename)
            # Check if a file with the same name and an old date exists
            for file in os.listdir("./data/"):
                if file.startswith(asin) and file.endswith(".csv"):
                    file_date = file.split("_")[1].split(".")[0]
                    if file_date < date:
                        os.remove(os.path.join("./data/", file))
                        print(f"Deleted old file: {file}")

        # filename = clean_dataset(review_scrapper_script(asin, region))
    print(f"Output: {filename}")    
    return filename

def extract_asin_and_region(url):
    #url examples:
    #https://www.amazon.in/gp/product/B0C6KFZC9Z/ref=ewc_pr_img_1?smid=A2NL691BALGYOE&th=1
    #https://www.amazon.com/2021-Apple-10-2-inch-iPad-Wi-Fi/dp/B09G9FPHY6/ref=cm_cr_arp_d_product_top?ie=UTF8&th=1
    #https://www.amazon.in/Rockerz-450-Wireless-Bluetooth-Headphone/dp/B07PR1CL3S/ref=sr_1_5?crid=28NDGIMB8QEQO&keywords=headphone&qid=1700421756&s=electronics&sprefix=headpho%2Celectronics%2C231&sr=1-5&th=1
    
    # Send a GET request to the URL and follow redirects
    response = requests.get(url, allow_redirects=True)
    url = response.url
    # Extract the ASIN
    asin_match = re.search(r"(?:product-reviews|product|dp)/([A-Z0-9]+)[/? ]", url)
    if asin_match:
        asin = asin_match.group(1)
    else:
        asin = None
    
    # Extract the country
    amazon_index = url.find("amazon.")
    first_slash_index = url.find("/", amazon_index)
    regions = {"in": "india", "com": "america", "co.uk": "british"}
    region = regions[url[amazon_index + len("amazon."):first_slash_index]]
    
    return asin, region

def fetch_reviews(url):
    start_time = time.time()
    
    asin, region = extract_asin_and_region(url)
    print("ASIN:", asin)
    print("Region:", region)
    out = scrape_review(asin, region)
    
    end_time = time.time()
    total_time = end_time - start_time
    minutes = int(total_time // 60)
    seconds = int(total_time % 60)
    print(f"Total ETL Time: {minutes} minutes {seconds} seconds")
    return out

if __name__ == "__main__":
    url = input("Enter the URL: ")
    print(fetch_reviews(url))
    # print(str(fetch_reviews(url)) + " is the output")