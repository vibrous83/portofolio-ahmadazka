import { useState } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

function App() {
    const [likes, setLikes] = useState(0);
    const [tombol, setTombol] = useState(false);
    const [hasil, setHasil] = useState('Belum Selesai');

    //Logika
    function Tambah(){
        if(likes<10){
            setLikes(likes + 1);
        }
        else{
            setLikes('Done');
            setTombol(true);
            setHasil('Sudah Selesai');
        }
    }

    function Kurang(){
        if(likes<1){
            setLikes('Done');
            setTombol(true);
            setHasil('Sudah Selesai');
        }
        else{
            setLikes(likes - 1);
        }
    }

    function Reset(){
        setLikes(0);
        setTombol(false);
        setHasil('Belum Selesai');
    }

    return(
    <>
        <Header/>
        <p>{likes}</p>
        <button disabled={tombol} onClick={Tambah}>+</button>
        <button onClick={Reset}>Reset</button>
        <button disabled={tombol} onClick={Kurang}>-</button>
        <Footer hasil={hasil}/>
    </>
    );
}

export default App