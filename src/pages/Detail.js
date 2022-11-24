import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'

export function Detail ( props ) {
    const[ bookData, setBookData ] = useState()

    let { bookId } = useParams()

    useEffect( () => {
        if(!bookData) {
            props.getter("books", bookId)
            .then( (data) => {
                setBookData(data)
                // book image
                
            } )
        }
    })

   
    if( bookData ) {
    return(
        <div className="container my-4">
            <div className="row">
                <div className="col">
                    <h2>{ bookData.Title }</h2>
                    <h4>{ bookData.Tagline }</h4>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <DetailImage data={bookData} getter={props.imageGetter} />
                </div>
                <div className="col">
                    <h4>Author</h4>
                    <p>{bookData.Author}</p>
                    <h5>ISBN 10</h5>
                    <p>{bookData.ISBN10 }</p>
                    <h5>ISBN 13</h5>
                    <p>{bookData.ISBN13 }</p>
                    <h5>Pages</h5>
                    <p>{bookData.Pages }</p>
                    <h5>Year</h5>
                    <p>{bookData.Year }</p>
                    <div style={ (props.auth) ? { display: "block"} : { display: "none"} }>
                        <button className="btn btn-info">Add to Favouries</button>
                        <button className="btn btn-info">Review this book</button>
                    </div>
                </div>
            </div>
        </div>
    )
    }
    else {
        return(
            <div className="container my-4"></div>
        )
    }
}

function DetailImage( props ) {
    const[ imgUrl, setImgUrl ] = useState()

    useEffect( () => {
       if( props.data ) {
          props.getter("book_covers/" + props.data.Cover )
          .then( (url) => setImgUrl(url) )
       }
    }, [props.data ])

    if( imgUrl ) {
        return (
            <img src={imgUrl} style={{ width: "100%"}} />
        )
    }
    else {
        return <p>Loading...</p>
    }
}