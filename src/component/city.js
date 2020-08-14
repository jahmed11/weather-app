import React from "react";
import "./city.css";
const city = (props) => {
  return (
    <div className="city">
      <form onSubmit={props.searched}>
        <input
          className=" input"
          onChange={props.changed}
          type="text"
          placeholder="City"
        />
        <button className="btn btn-primary m-2">Search</button>
      </form>
    </div>
  );
};
export default city;
