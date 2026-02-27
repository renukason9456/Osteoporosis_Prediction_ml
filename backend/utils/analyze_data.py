import pandas as pd

data = pd.read_csv("../data/osteoporosis_clean.csv")

print("\nShape:")
print(data.shape)

print("\nColumns:")
print(data.columns)

print("\nMissing Values:")
print(data.isnull().sum())

print("\nClass Distribution:")
print(data["Osteoporosis"].value_counts())

print("\nSample Data:")
print(data.head())