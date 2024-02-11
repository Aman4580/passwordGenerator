import './App.css';
import { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const [pass,setPass] =useState("");
  const [length,setLength] =useState(8);
  const [charallowed,setCharallowed] = useState(false);
  const [numallowed,setNumallowed] = useState(false);

  const passRef = useRef(null);

  const passwordge = useCallback( ()=>  {
    let pas = "";
    let str = "abcdefghijklmnopqurstuvwxyzABCZXCVBBNMLKJHGFDSAQWERTYUIOP";
    if(numallowed) str += "0123456789";
    if(charallowed) str += "@#$%^&*([]*";
    for(let i=1;i<=length;i++){
      let val = Math.floor(Math.random()*str.length + 1);
      pas = pas + str.charAt(val);
    }
    setPass(pas);
     },[length,charallowed,numallowed]);

     const copyHandler = useCallback(() =>{
      window.navigator.clipboard.writeText(pass);
     },[pass])

     useEffect(()=>{
      passwordge();
     },[length,charallowed,numallowed,passwordge])


  return (
    <div className="App">
     <div className="box">
     <div>
     <span>
      <input className='b1'
        type='text'
        value={pass}
        readOnly
        placeholder='Password'
        ref={passRef}
      />
      <button
      onClick={copyHandler}
      >Copy</button>
      </span>
      </div>
      <div>
      <input 
      type='range'
      min={6}
      max={100}
      value={length}
      onChange={ (e) => {setLength(e.target.value)}}
      />
      <label>Length:{length}</label>
      <input
      type='checkbox'
        defaultChecked={numallowed}
        onChange={ ()=>{
          setNumallowed((pre) => !pre)
        }}
      />
      <label>NumAllowed</label>
      <input
      type='checkbox'
        defaultChecked={charallowed}
        onChange={ ()=>{
          setCharallowed((pre) => !pre)
        }}
      />
      <label>CharAllowed</label>
      </div>
     </div>
    </div>
  );
}

export default App;
