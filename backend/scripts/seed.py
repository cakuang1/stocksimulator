
from main.models import Stock

import csv


def run():
    with open('main/nasdaq.csv') as file:
        reader = csv.reader(file)
        next(reader)  # Advance past the header

        Stock.objects.all().delete()

        for row in reader:
            print(row)


            film = Stock(ticker=row[0],
                        name=row[1])
            film.save()