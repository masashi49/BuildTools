import React, { useState, useEffect } from "react"
import { render } from "react-dom";
import { getUsers } from "./common/usersAPI";
import "./style.css"; // ローダーを設定しないと読み込まない
import "./style.scss"; // scss用のローダーが必要
import styles from './styleee.modules.css';
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
            <h2 class={ styles.h2 }>h2です</h2>
            <h3 class={ styles.h3 }>h3です</h3>
            <p className="className">ふがです</p>
        </div>
    )
}

render( <App />, document.getElementById( "root" ) )
