import pandas as pd
from main.models import Stock




df=pd.read_csv('nasdaq.csv')

row_iter = df.iterrows()

objs = [

    Stock(
        ticker = row['Symbol'],
        name  = row['Company Name']
    )

    for index, row in row_iter

]

Stock.objects.bulk_create(objs)