import { useCallback, useEffect, useState, useRef } from "react";
// import "./App.css";

function App() {
  const [length, setLength] = useState(10);
  const [numallowed, setNumAllowed] = useState(false);
  const [charallowed, setCharallowed] = useState(false);
  const [password, setPassword] = useState("");
  const [iscopied, setIscopied] = useState(false)

  const passGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numallowed) str += "0123456789";
    if (charallowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numallowed, charallowed, setPassword]);

  const passwordRef = useRef(null);


  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password);
    setIscopied(true)
  }, [password]);

  useEffect(() => {
    passGen();
  }, [length, numallowed, charallowed, passGen]);

  return (
    <>
      <div className="w-full  bg-blue-400 px-2 py-4  ">
        <nav className="">
          <a href="/" className="outline-line flex ">
            <li className="decoration-none hover:bg-blue-500 rounded-2xl px-2 py-2 flex">Home</li>
            <li className="decoration-none hover:bg-blue-500 rounded-2xl px-2 py-2 flex">About</li>
            <li className="decoration-none hover:bg-blue-500 rounded-2xl px-2 py-2 flex">Service</li>
            <li className="decoration-none hover:bg-blue-500 rounded-2xl px-2 py-2 flex">Contact</li>
          </a>
        </nav>
      </div>
      <div className="min-h-screen flex items-center bg-gray-600">
        <div className="w-full max-w-md px-4 py-3 mx-auto my-8 text-orange-500 bg-gray-800 rounded-lg shadow-md">
          <h1 className="my-3 text-center text-white">Password generator</h1>
          <div className="flex mb-4 overflow-hidden rounded-lg shadow">
            <input
              type="text"
              value={password}
              className="w-full px-3 py-1 outline-none bg-gray-600"
              placeholder="password"
              // readOnly
              ref={passwordRef}

            />
            <button
              onClick={copyPasswordToClipboard}
              className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 cursor-pointer hover:bg-blue-400"
            >
              {iscopied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="flex text-sm gap x-2">
            <div className="flex items-center gap-x-1">
              <input
                type="range"
                min={6}
                max={100}
                value={length}
                className="cursor-pointer"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label htmlFor="" className="mx-1">
                Length: {length}
              </label>
            </div>
            <input
              type="checkbox"
              defaultChecked={numallowed}
              id="numberInput"
              className="mx-2 "
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
            <div className="flex items-center  gap-x-1 mx-4">
              <input
                type="checkbox"
                defaultChecked={charallowed}
                id=""
                onChange={() => {
                  setCharallowed((prev) => !prev);
                }}
              />
              <label htmlFor="characterInput">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
