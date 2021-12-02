import logo from './logo.svg';
import './App.css';
import President from "./components/President";
import Trump from './assets/pictures/trump.jpg';
import Biden from './assets/pictures/biden.jpg';

function App() {
  return (
  

        <div className="rowC">
          <div className="padding: 10rem">
            <President
            name="Joe Biden"
            description="President Biden represented Delaware for 36 years in the U.S. Senate before becoming the 47th Vice President of the United States. As President, Biden will restore America’s leadership and build our communities back better."
            picture={Biden}
            />
          </div>
          <div className="padding: 10rem">
            <President 
            name="Donald Trump"
            description="Ex-President Trump represented the United States Of America for 4 years before ending his term, losing to Joe biden. If reelected, trump will make america great again. He aims to create a non-rigged election with blockchain"
            picture={Trump}
            />
          </div>
        </div>
   

  );
}

export default App;
