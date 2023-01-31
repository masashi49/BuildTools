import React, { useState, useEffect } from "react"
import { render } from "react-dom";
import { getUsers } from "./common/usersAPI";
import "./style.css"; // ローダーを設定しないと読み込まない
import "./style.scss"; // scss用のローダーが必要
import One from "./One.module.css"
import Two from "./Two.module.css"
import "./kuma.css";
import moment from "moment"
import { hello } from "./sub";
console.log( hello() )



function App () {
    const [ state, setState ] = useState( "Click me" )
    const [ datas, setDatas ] = useState( [] )

    useEffect( () => {
        getUsers().then( json => {
            console.log( json )
        } );
    }, [] )

    const getUserModule = () => import(/* webpackChunkName: "DynamicAPI" */ "./common/usersAPIDynamic" ) // コメントアウトでチャンクのjsファイル名を決めることができる。DynamicAPI.jsとなる
    const dynamicImports = () => {
        getUserModule().then( ( { getUsersDynamic } ) => {
            getUsersDynamic().then( json => console.log( json ) )
        } )
    }

    return (
        <div>
            <button onClick={ () => setState( "clicked" ) }>{ state }</button>
            <button onClick={ dynamicImports }>Dynamic imports</button>
            <h2>h2です</h2>
            <h3 className={ One.one }>h3のOneです</h3>
            <h3 className={ Two.two }>h3のtwoです</h3>
            <h3 className={ One.ichigo }>いちごです</h3>
            <h3 className="ichigo">ベタ書きいちごです</h3>
            <h3 className={ One.aoi }>あおいです</h3>
            <h3 className="ran">ranです</h3>
            <p className="hungi">ふがです</p>
            <p className="kuma">くまです</p>
            <p className="inu">犬です</p>
        </div>
    )
}

render( <App />, document.getElementById( "root" ) )
