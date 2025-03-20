import csv
import random
from datetime import datetime, timedelta

# Generate data for 50 characters
NUM_ROWS = 1000

# Create the CSV file
OUTPUT_FILE = "products.csv"


def choose_a_shoe():
    return random.choice(["sneakers", "boots"])


# Generate data rows
data_rows = []
for i in range(1, NUM_ROWS + 1):
    # Generate random values for each column
    timestamp = datetime.now() - timedelta(seconds=i)
    shoe_type = choose_a_shoe()
    shoeId = i
    if (shoe_type == "sneakers"):
        shoe_size = random.choice([6, 7, 8, 9, 10, 11, 12])
        shoe_color = random.choice(["red", "blue", "green", "black", "white"])
        shoe_brand = random.choice(["nike", "adidas", "reebok", "new balance"])
        price = random.choice([50, 60, 70, 80, 90, 100])
        popularity = random.choice([1, 2, 3, 4, 5])
        durability = random.choice([1, 2, 3, 4, 5])
    else:
        shoe_size = random.choice([6, 7, 8, 9, 10, 11, 12, 13, 14])
        shoe_color = random.choice(["brown", "black", "tan"])
        shoe_brand = random.choice(["timberland", "dr martens", "caterpillar"])
        price = random.choice([100, 120, 140, 160, 180, 200])
        popularity = random.choice([1, 2, 3, 4, 5])
        durability = random.choice([1, 2, 3, 4, 5])

    # Create the data row
    data_row = [
        timestamp.strftime("%Y-%m-%d %H:%M:%S"),
        shoeId,
        shoe_type,
        shoe_size,
        shoe_color,
        shoe_brand,
        price,
        popularity,
        durability
    ]

    # Add the data row to the list
    data_rows.append(data_row)

# Write the data to the CSV file
with open(OUTPUT_FILE, "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(
      [
        "timestamp", "shoeId", "shoe_type", "shoe_size", "shoe_color",
        "shoe_brand", "price", "popularity", "durability"
      ]
    )
    writer.writerows(data_rows)

print("Data generation complete.")
