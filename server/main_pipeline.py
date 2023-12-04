from review_analyzer import analyzer
from visualizer import visualization
import time

def execute_pipeline(url):
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
    res = execute_pipeline(url)

    import json
    import os
    # Save res dict to output.json in ./data/
    output_dir = "./Output"
    os.makedirs(output_dir, exist_ok=True)
    output_file = os.path.join(output_dir, "output.json")
    with open(output_file, "w") as f:
        json.dump(res, f)

    # print("\n\n\n", res)
    # print(res['ScoreGraph']['positive'])

    # res['ScoreGraph']['positive'].show()
    