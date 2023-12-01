from review_analyzer import analyzer
from visualizer import visualization

url = input("Enter URL: ")
out = analyzer(url)

if out:
    print("Success!")
    print("Generating graphs...")
    print(visualization(out))
    
else:
    print("Error!")