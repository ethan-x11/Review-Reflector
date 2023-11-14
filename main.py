import subprocess
import csv
import datetime
import os
import os
import datetime



def review_scrapper(asin, country):
    # Construct the filename with the current date
    date = datetime.datetime.now().strftime("%Y-%m-%d")
    filename = f"{asin}_{date}.csv"

    # Construct the command
    command = f"scrapy crawl amazon_reviews -a asin={asin} -a country={country} -t csv -o ./../../data/{filename}"

    # Execute the command
    subprocess.run(command, shell=True)

    # Return the filename
    return filename

def extract_location_and_date(filename):
    # Load the CSV file
    with open(f"./../../data/{filename}", "r") as f:
        reader = csv.DictReader(f)
        reviews = list(reader)

    # Check if the CSV file has the "location_and_date" column
    if "location_and_date" not in reviews[0]:
        print(f"File {filename} does not have the 'location_and_date' column.")
        return filename

    # Loop through each review
    for review in reviews:
        # Extract the location and date from the "location_and_date" column
        location_and_date = review["location_and_date"]
        location, date = location_and_date.split(" on ")
        location = location.replace("Reviewed in ", "")

        # Add the location and date as separate columns
        review["location"] = location
        review["date"] = date

        # Remove the "location_and_date" column
        del review["location_and_date"]

    # Write the updated reviews to the same CSV file
    with open(f"./../../data/{filename}", "w", newline='') as f:
        writer = csv.DictWriter(f, fieldnames=reviews[0].keys())
        writer.writeheader()
        writer.writerows(reviews)

    # Return the filename of the updated file
    return filename


def clean_dataset(filename):
    # Load the CSV file
    with open(f"./../../data/{filename}", "r") as f:
        reader = csv.DictReader(f)
        reviews = list(reader)

    # Create an empty list for unique reviews
    unique_reviews = []

    # Loop through each review
    for review in reviews:
        # Check if the review is already in the list of unique reviews
        if review not in unique_reviews:
            # If the review is not in the list, append it to the list
            unique_reviews.append(review)

    # Write the list of unique reviews to the same CSV file
    with open(f"./../../data/{filename}", "w", newline='') as f:
        writer = csv.DictWriter(f, fieldnames=unique_reviews[0].keys())
        writer.writeheader()
        writer.writerows(unique_reviews)

    extract_location_and_date(filename)

    # Return the filename of the cleaned file
    return filename




asin = input("Enter the ASIN: ")
country = input("Enter the country: ")

date = datetime.datetime.now().strftime("%Y-%m-%d")
filename = f"{asin}_{date}.csv"
filepath = os.path.join("./../../data/", filename)

# Check if the file already exists and has data
if os.path.exists(filepath) and os.path.getsize(filepath) > 0:
    print(f"File {filename} already exists and has data.")
else:
    # Check if a file with the same name and an old date exists
    for file in os.listdir("./../../data/"):
        if file.startswith(asin) and file.endswith(".csv"):
            file_date = file.split("_")[1].split(".")[0]
            if file_date < date:
                os.remove(os.path.join("./../../data/", file))
                print(f"Deleted old file: {file}")

    filename = review_scrapper(asin, country)
    cleaned_filename = clean_dataset(filename)
    print(f"Output filename: {cleaned_filename}")
