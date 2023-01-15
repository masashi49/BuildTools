import React, { useState } from "react"
import { render } from "react-dom";

import "./style.css"; // ローダーを設定しないと読み込まない
import "./style.scss"; // scss用のローダーが必要
import { hello } from "./sub";
console.log( hello() )

function App () {
    const [ state, setState ] = useState( "Click me" )
    return (
        <div>
            <button onClick={ () => setState( "clicked" ) }>{ state }</button>
        </div>
    )
}

render( <App />, document.getElementById( "root" ) )
