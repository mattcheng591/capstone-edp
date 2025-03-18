from flask import Flask, request, jsonify
import pandas as pd
from sklearn.neighbors import NearestNeighbors
# Assume model and data are already loaded

app = Flask(__name__)

@app.route('/recommend', methods=['POST'])
def recommend():
    product = request.json
    product_df = pd.DataFrame([product])
    product_encoded = pd.get_dummies(product_df, columns=['shoe_type', 'shoe_color', 'shoe_brand'])
    product_encoded = product_encoded.reindex(columns=features, fill_value=0)
    distances, indices = model.kneighbors(product_encoded)
    recommended_products = data.iloc[indices[0]].to_dict(orient='records')
    return jsonify(recommended_products)

if __name__ == '__main__':
    app.run(debug=True)
