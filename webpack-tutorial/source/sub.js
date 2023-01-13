export function hello () {
    return `hello worldddddd`
}

// babel-loaderがないと動かない
const fancyFunc = () => {
    return [ 1, 2 ]
}
const [ a, b ] = fancyFunc()

console.log( fancyFunc() )
