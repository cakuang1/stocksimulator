from django.shortcuts import render



import requests
from yahooquery import Ticker
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


# Extracts ticker from apewisdom GET requests for stcoks that are trending, returns a list of tickers


def GetTrendingData():
    def GetTrendingStocks():
        trending_stocks_url = 'https://apewisdom.io/api/v1.0/filter/all-stocks/page/1'
        response = requests.get(trending_stocks_url)
        data = response.json()
        tickers = [item["ticker"] for item in data["results"]]
        return tickers
    tickers = GetTrendingStocks()
    tickers = tickers[0:20]
    all_symbols = " ".join(tickers)
    myInfo = Ticker(all_symbols)
    myDict = myInfo.price
    returnlist = []
    for ticker in tickers:
        try:
            ticker = str(ticker)
            stockname = myDict[ticker]['longName']
            price = myDict[ticker]['regularMarketPrice']
            closingprice = myDict[ticker]['regularMarketPreviousClose']
            increase = '1' if (price) >= closingprice else '0'
            percent = f"{myDict[ticker]['regularMarketChangePercent'] * 100:.2f}%"
            tickeritem =  {
                'ticker': ticker,
                'name': stockname,
                'current_price':"{:.2f}".format(price),
                'change': "{:.2f}".format(price - closingprice),
                'percent_change': percent,
                'increase' : increase
            }
            returnlist.append(tickeritem)
        except:
            continue
    return returnlist



def GetTickerData(ticker):
    def GetBox(ticker):
        tickerdata = Ticker(ticker).price[ticker]
        returndic = {
        'ticker': ticker,
        'name':tickerdata['shortName'] ,
        'postMarketPrice' :tickerdata['postMarketPrice'],
        'postMarketChange' :tickerdata['postMarketChange'],
        'regularMarketChange' :tickerdata['regularMarketChange'],
        'regularMarketChangePercent' : tickerdata['regularMarketChangePercent'],
        'regularMarketPrice': tickerdata['regularMarketPrice'],
        'regularMarketVolume' : tickerdata['regularMarketVolume'],
        'regularMarketPrice' : tickerdata['regularMarketPrice'],
        'regularMarketPreviousClose' : tickerdata['regularMarketPreviousClose'],
        'regularMarketDayHigh' : tickerdata['regularMarketPreviousClose'],
        'regularMarketDayLow' : tickerdata['regularMarketPreviousClose'],
        'marketcap' : tickerdata['marketCap']
        }
        return returndic
    def GetGraph(ticker):
        df = Ticker(ticker).history(period = '1d',interval='5m').reset_index()[['date','open']]
        df['date'] = df['date'].dt.strftime('%H:%M')
        df['open'] = df['open'].round(2)
        df =df.rename(columns={'date': 'x', 'open': 'y'})
        return df.to_dict(orient='records')
    return GetGraph(ticker)







class TickerView(APIView):
    def get(self, request, ticker= None):
        if ticker is None:
            return Response({"error": "Ticker parameter is required."}, status=status.HTTP_400_BAD_REQUEST)
        print(ticker)
        try:
            data = GetTickerData(ticker)
        except Exception as e:
            return Response({'error': 'Object not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response(data, status=status.HTTP_200_OK)





class TrendingView(APIView):
    def get(self, request, pk=None):
        # HTTP response with a list of 
        try:
            data = GetTrendingData()
        except Exception as e:
            return Response({'error': 'Object not found'}, status=status.HTTP_404_NOT_FOUND)

        return Response(data, status=status.HTTP_200_OK)





    


