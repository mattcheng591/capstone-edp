import pandas as pd
from sklearn.neighbors import NearestNeighbors
from flask import Flask, request, jsonify
from pymongo import MongoClient

# Read CSV
df = pd.read_csv("products.csv")

# Load the data
data = pd.read_csv("products.csv")

# Drop the datetime column if it exists
if 'timestamp' in data.columns:
    data = data.drop(columns=['timestamp'])

# Use get_dummies to encode categorical variables
data_encoded = pd.get_dummies(data, columns=['shoe_type', 'shoe_color', 'shoe_brand'])

# Features for the model
features = data_encoded.columns
X = data_encoded

# Initialize the NearestNeighbors model
model = NearestNeighbors(n_neighbors=5, algorithm='auto')

# Fit the model
model.fit(X)

app = Flask(__name__)


client = MongoClient("mongodb://localhost:27017/")
db = client["online_store"]
orders_collection = db["orders"]

@app.route('/recommend', methods=['POST'])
def recommend():
    '''
    Example body:
    [
      {
        "shoe_type": "boots",
        "shoe_size": 8,
        "shoe_color": "black",
        "price": 120.00,
        "shoe_brand": "timberland",
        "popularity": 1,
        "durability": 3
      },
      {
        "shoe_type": "boots",
        "shoe_size": 9,
        "shoe_color": "tan",
        "price": 180.00,
        "shoe_brand": "caterpillar",
        "popularity": 4,
        "durability": 3
      }
    ]
    '''

    try:
        user_data = request.get_json()
        user_id = user_data.get("user_id")

        if not user_id:
          return jsonify({"error": "user_id is required"}), 400
        
        user_orders = list(orders_collection.find({"user_id": user_id}))

        if not user_orders:
            return jsonify({"error": "No orders found for this user"}), 404

        # Get the JSON data from the POST request
        current_purchases = user_orders

        # Create a DataFrame for the current purchases
        current_purchases_df = pd.DataFrame(current_purchases)

        # Use get_dummies to encode the current purchases
        current_purchases_encoded = pd.get_dummies(current_purchases_df, columns=['shoe_type', 'shoe_color', 'shoe_brand'])

        # Align the current purchases with the training data
        current_purchases_encoded = current_purchases_encoded.reindex(columns=features, fill_value=0)

        # Calculate the average feature values across all purchases
        average_purchase_encoded = current_purchases_encoded.mean(axis=0).to_frame().T

        # Find the nearest neighbors for the averaged purchase
        distances, indices = model.kneighbors(average_purchase_encoded)

        # Get the top 5 recommended products
        recommended_products = data.iloc[indices[0]]

        # Convert the recommended products to a JSON response
        return jsonify(recommended_products.to_dict(orient='records'))

    except Exception as e:
        return jsonify({'error': str(e)}), 400


if __name__ == '__main__':
    app.run(debug=True, port=5000)
