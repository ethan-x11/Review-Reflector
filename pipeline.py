from review_analyzer import analyzer
from visualizer import visualization
import time

def execute(url):
    start_time = time.time()
    out = analyzer(url)

    if out not in [False, 'Runtime Error']:
        print("Generating visualizations...")
        res = visualization(out)
    else:
        res = "Error"
        
    end_time = time.time()
    total_time = end_time - start_time
    minutes = int(total_time // 60)
    seconds = int(total_time % 60)
    print(f"Total Operational Time: {minutes} minutes {seconds} seconds")
    
    return res
    
if __name__ == "__main__":
    url = input("Enter URL: ")
    res = execute(url)
    print("\n\n\n", res)
    # print(res['ScoreGraph']['positive'])

    # res['ScoreGraph']['positive'].show()
