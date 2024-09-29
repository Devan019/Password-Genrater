import { useState , useCallback , useEffect , useRef } from 'react'
import './App.css'

function App() {
  const [password, setPassword] = useState("")
  const [numberIn, setNumberIn] = useState(false)
  const [spcharIn, setSpcharIn] = useState(false)
  const [length, setlength] = useState(8)
  const passRef = useRef(null);

  const PassWordGenrater = useCallback(()=>{

    let str = "QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm";
    let pass = "";

    let no = "1234567890";
    let index = -1;

    if(numberIn){
      index = Math.floor(Math.random()*9);
      str += no;
    }
    if(spcharIn) str += '!@#$%^&*_+-=?><,.|~';
  
    let idx = -1;
    let char = 'a';

    for(let i = 0 ;i < length ;i++){
      if(i == index){
        idx = index;
        char = no.charAt(idx);
      }else{
        idx = Math.floor(Math.random()*str.length);
        char = str.charAt(idx);
      }
      pass += char;
    }

    setPassword(pass);


  } , [setPassword , numberIn , spcharIn , length])

  useEffect(PassWordGenrater , [length , numberIn, spcharIn ,PassWordGenrater]);

  const copyPass = useCallback(()=>{
    passRef.current?.select()
    passRef.current?.setSelectionRange(0 , 100);
    window.navigator.clipboard.writeText(password)
  } , [password])

  return (
    <>
      <h1 className='text-center text-white text-2xl p-20'>PassWord Genrater</h1>

      <div className=' bg-gray-600  w-5/12 m-auto h-1/5 p-5'>

        <div id="main" className='flex gap-4'>
          <input type="text"
            readOnly
            value={password}
            className='w-3/4 h-10'
            id='pass'
            ref={passRef}
          />
          <button
          onClick={copyPass}
          className=' bg-blue-300 p-2'>Copy</button>
        </div>

        <div className='flex justify-around items-center gap-20'>

          <div className='flex gap-2 p-2'>
            <input
              className=' cursor-pointer'
              min={8}
              max = {100}
              defaultValue={8}
              onChange={
                (evt) => {
                  setlength(evt.target.value)
                }
              }
              id='lenght'
              type="range" />
            <label className='text-white text-xl' htmlFor="lenght">
              lenght : {length}
            </label>
          </div>

          <div className='flex gap-3'>
            <input
              onChange={(evt) => {
                setNumberIn((prev) => prev = !prev)
              }}
              type="checkbox" name="numberIn" id="numberIn" />
            <label htmlFor="numberIn" className='text-white text-xl'>Number</label>
          </div>


          <div className='flex gap-3'>
            <input
              onChange={(evt) => {
                setSpcharIn((prev) => prev = !prev)
              }}
              type="checkbox" name="charin" id="charin" />
            <label htmlFor="charin" className='text-white text-xl'>char</label>
          </div>


        </div>
      </div>

    </>
  )
}

export default App
