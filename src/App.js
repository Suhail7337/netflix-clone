
import './App.css';
import Banner from './components/banner/Banner';
import NavBar from './components/navbar/NavBar';
import RowPost from './components/rowpost/RowPost';
import {action, original, url} from "./urls"

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Banner/>
      <RowPost url={original} title="Netflix Originals" />
      <RowPost url={action} title="Action" isSmall  />
      <RowPost url={action} title="Action" isSmall  />


    </div>
  );
}

export default App;
