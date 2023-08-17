from django.shortcuts import render



import requests
from yahooquery import Ticker
import yahooquery as yq
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
    tickers = tickers[0:60]
    myInfo = Ticker(tickers)
    myDict = myInfo.price
    returnlist = []
    for ticker in tickers:
        if isinstance(myDict[ticker], dict) and myDict[ticker].get('exchange') != 'NMS':
            continue
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
                'increase' : increase,
            }
            returnlist.append(tickeritem)
        except:
            continue
    return returnlist



def GetTickerData(ticker):
    def format_large_number(number):
        if abs(number) >= 1e9:  # Billion or more
            return f"{number / 1e9:.2f}B"
        elif abs(number) >= 1e6:  # Million or more
            return f"{number / 1e6:.2f}M"
        else:
            return str(number)
    tickertick = Ticker(ticker)
    tickerdata = tickertick.price[ticker]
    tickersummary = tickertick.summary_detail[ticker]
    tickerkeystats =tickertick.key_stats[ticker]
    def getTopData():
        topdic = {
            'regularMarketPrice': round(tickerdata['regularMarketPrice'],2),
            'regularMarketChange' :round(tickerdata['regularMarketChange'],2),
            'regularMarketChangePercent' : round(tickerdata['regularMarketChangePercent'] * 100,2),
            'change': tickerdata['regularMarketChange'] > 0,
               
        }
        return topdic
    def getBoxData():
        returndic = {
        'ticker': ticker,
        'name':tickerdata['shortName'] ,
        'exchange':tickerdata['exchangeName'],
        'regularMarketVolume' : format_large_number(tickerdata['regularMarketVolume']),
        'regularMarketPreviousClose' : tickerdata['regularMarketPreviousClose'],
        'regularMarketDayHigh' : tickerdata['regularMarketDayHigh'],
        'regularMarketDayLow' : tickerdata['regularMarketDayLow'],
        'averageDailyVolume10Day' : format_large_number(tickersummary['averageDailyVolume10Day']),
        'regularMarketOpen' : tickerdata['regularMarketOpen'],
        'trailingPE' : tickersummary['trailingPE'],
        'forwardPE' : tickersummary['forwardPE'],
        'fiftyTwoWeekLow' : tickersummary['fiftyTwoWeekLow'],
        'fiftyTwoWeekHigh' : tickersummary['fiftyTwoWeekHigh'],
        'priceHint' : tickersummary['priceHint'],
        'beta' : tickersummary['beta'],
        'forwardEps' : tickerkeystats['forwardEps'],
        'trailingEps' : tickerkeystats['trailingEps'],
        'pricetobook' : round(tickerkeystats['priceToBook'],2),
        'beta' : tickersummary['beta'],
        'marketcap' : format_large_number(tickersummary['marketCap']),
        }
        return returndic
    
    def GetGraph(ticker):
        df = Ticker(ticker).history(period = '1d',interval='1m').reset_index()[['date','open']]
        date_string = df['date'].iloc[0].date().strftime('%Y-%m-%d')
        df['date'] = df['date'].dt.strftime('%I:%M')    
        df['open'] = df['open'].round(2)
        df =df.rename(columns={'date': 'x', 'open': 'y'})
        return [df.to_dict(orient='records'),date_string]

    returndic = {'top': getTopData(),'box':getBoxData(),'graph':GetGraph(ticker)[0],'date' : GetGraph(ticker)[1]}
    return returndic


def getSearchData(query):
    data = yq.search(query)
    quotes = [quote for quote in data['quotes'] if quote.get('exchDisp') in ['NASDAQ', 'NYSE']][:4]
    return quotes


def GetList(tickers):
    data = Ticker(tickers).price
    newdata = [{i:data[i]['regularMarketPrice']} for i in data.keys()]
    return newdata


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



class Search(APIView):
    def get(self, request, query=None):
        # HTTP response with a list of 
        try:
            data = getSearchData(query)
        except Exception as e:
            return Response({'error': 'Object not found'}, status=status.HTTP_404_NOT_FOUND)

        return Response(data, status=status.HTTP_200_OK)



class Portfolio(APIView):
    def get(self, request, tickers=None):
        # HTTP response with a list of 
        try:
            tickers = tickers.split(',')
            data = GetList(tickers)
        except Exception as e:
            return Response({'error': 'Object not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response(data, status=status.HTTP_200_OK)
