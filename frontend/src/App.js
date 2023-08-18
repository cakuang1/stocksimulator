
import Sidebar from './components/Sidebar';
import Portfolio from './components/Portfolio';
import { ChakraProvider} from '@chakra-ui/react'

import { Routes, Route } from 'react-router-dom';
import Stocks from './components/Stocks';
import Stock from './components/Stock';
import Portfolioinfo from './components/Portfolioinfo';
import Trade from './components/Trade';
function App() {
  return (
    <ChakraProvider >
<div className="App">
  <div className='flex'>
    <Sidebar />
    <div className='bg-green-50 flex-grow'>
      <div className='flex justify-center items-center h-full py-7'>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/:portfolioid" element={<Portfolioinfo />} />
          <Route path="/stocks" element={<Stocks />} />
          <Route path="/stocks/:ticker" element={<Stock/>} />
          <Route path="/trade/:ticker" element={<Trade/>} />
        </Routes>
      </div>
    </div>
  </div>
</div>
      </ChakraProvider> 
  );
}



export default App;
