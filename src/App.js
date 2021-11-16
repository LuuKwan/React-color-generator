import React, { useState } from "react";
import SingleColor from "./SingleColor";

import Values from "values.js";

function App() {
  const [color, setColor] = useState("");
  const [error, setError] = useState(false);
  const [colorList, setColorList] = useState(new Values(`#f15025`).all(10));
  const [option, setOption] = useState({ color: "", weight: 10 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOption({ ...option, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      let colors = new Values(option.color).all(parseInt(option.weight));
      console.log(option.weight);
      setError(false);
      setColorList(colors);

      //reset option
      setOption({ color: "", weight: 10 });
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };
  return (
    <>
      <section className="container">
        <h3>color generator</h3>
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="color">Color in hex</label>
          <input
            type="text"
            placeholder="#f15025"
            name="color"
            value={option.color}
            onChange={handleChange}
            className={`${error ? `error` : null}`}
          />
          <label htmlFor="weight">Weight</label>
          <input
            type="number"
            placeholder="10"
            name="weight"
            value={option.weight}
            onChange={handleChange}
          />
          <button className="btn" type="submit">
            submit
          </button>
        </form>
      </section>
      <section className="colors">
        {colorList.map((color, index) => {
          return (
            <SingleColor
              key={index}
              {...color}
              index={index}
              hexColor={color.hex}
            />
          );
        })}
      </section>
    </>
  );
}

export default App;
