import { useState, useCallback , useEffect , useRef, use } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(0);
  const [numDecider, setNumDecider] = useState(false);
  const [charDecider, setCharDecider] = useState(false);
  const [password, setPassword] = useState("");
  const [btnName, setBtnName] = useState('Copy')
  // useRef hook is used to get the reference of the input field. it is used to copy the password to clipboard
  const passwordRef = useRef(null)
  // passwordGenerator function is used to generate the password based on the length, numDecider, charDecider
  // useCallback hook is used to prevent the function from being created again and again whenever the state changes
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numDecider) {
      str += "0123456789";
    }
    if (charDecider) {
      str += "@#%$^&*(){}[]+=-_~!";
    }
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numDecider, charDecider, setPassword ]); //setPassword is in dependency array for optimisation purpose 

// copyPaswordToClickboard function is used to copy the password to clipboard
  const copyPaswordToClickboard = useCallback(()=>{
    passwordRef?.current.select() // it is used to select the text in the input field which helps user to understand that the text is selected and is copied
    passwordRef?.current.setSelectionRange(0,99) // it provides the range of the text to be selected
    window.navigator.clipboard.writeText(password)
    setBtnName('Copied')
  },[password ])
  // useEffect hook is used to change the button name to 'Copy' whenever the length, numDecider, charDecider changes
  useEffect(()=>{
    setBtnName('Copy')
  },[length , numDecider, charDecider , ])
 


  // useEffect hook is used to run the passwordGenerator function whenever the length, numDecider, charDecider changes
  useEffect(()=>{
    passwordGenerator()
  },[length , numDecider, charDecider , passwordGenerator])

  return (
    <>
      <div className="w-full max-w-[650px] mx-auto shadow-md rounded-lg px-4 mt-14 text-orange-500 bg-gray-700">
        <h1 className='text-3xl pt-5 text-white'>Password Generator</h1>
        <div className="flex h-20 shadow rounded-lg overflow-hidden mb-2 items-center">
          <input
            className="bg-white rounded-lg w-full py-2 px-3"
            type="text"
            value={password}
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPaswordToClickboard} className='outline-none text-white bg-sky-600 px-3 py-[9px] ml-2 cursor-pointer shrink-0 rounded-lg '>{btnName}</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex  text-white items-center gap-x-4 mr-0'>
            <input onChange={(e)=>{setLength(e.target.value)}} className = "bg-white  mb-8" type="range" min={0} max={100} value={length}  />
            <label className='mb-8 text-[20px] w-[150px] text-left'>Length : {length}</label>
          </div>
          <div className='flex justify-items-start items-start text-white  w-[50%] gap-x-4'>
            <input onChange={()=>{setNumDecider((prev)=>!prev)}} type="checkbox" defaultChecked = {numDecider} id='numberInput' className='mt-2' />
            <label className='text-[20px]'>Numbers</label>
            <input onChange={()=>{setCharDecider((prev)=>!prev)}} type="checkbox" defaultChecked = {charDecider} id='characterInput' className='mt-2 ml-4' />
            <label className='text-[20px]'>Characters</label>
          </div>
        </div>
      </div>
    </>
  ); 
}

export default App;
