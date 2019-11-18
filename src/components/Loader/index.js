import React from "react";

export default ({ children, flag }) => (
    flag ?
        <div className = "loader-box">
            <img className = "loader" src="https://media3.giphy.com/media/17mNCcKU1mJlrbXodo/giphy.gif?cid=790b76111a743d7a8a84cb250928250965507ef78b29f7b8&rid=giphy.gif" alt="Loading"/>
        </div>
        : children);