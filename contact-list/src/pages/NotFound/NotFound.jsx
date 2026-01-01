import { useState } from "react";
import { Link } from "react-router-dom";

export default function NotFound(){
  const [count, setCount] = useState(0)

  const addone = () => {
    setCount(count + 1)
  }
  return(
    <div className="shadow bg-white container rounded mt-4">
      <h1>NotFound 404</h1>
      <Link to='/'><button>Go home</button></Link>

      <p>You clicked {count} times</p>
      <button onClick={addone}>Click me</button>
    </div>
  )
}