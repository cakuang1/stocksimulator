
import Sidebar from './components/Sidebar';
import Portfolio from './components/Portfolio';
import { ChakraProvider} from '@chakra-ui/react'

import { Routes, Route } from 'react-router-dom';
import Stocks from './components/Stocks';
import Stock from './components/Stock';
import { Input} from '@chakra-ui/react'
function App() {
  return (
    <ChakraProvider >
      <div className="App">
        <div className='flex '>
        <Sidebar/>
        <div className=' w-full bg-green-50 flex justify-center items-center h-full py-7 h-screen'>  

        <Routes>
        <Route path="/" element={<Portfolio/>} />
          <Route path="/stocks" element={<Stocks/>} />
          <Route path="/stock/:tickerId" element = {<Stock/>}/>
      </Routes>


      </div>
       </div>
      </div>

      </ChakraProvider> 
  );
}

export default App;