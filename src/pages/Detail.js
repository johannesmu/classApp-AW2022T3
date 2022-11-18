import { useParams } from "react-router-dom"

export function Detail ( props ) {
    let { bookId } = useParams()

    return(
        <div className="container my-4">
            <div className="row">
                <div className="col">
                    <h2>{bookId}</h2>
                    <h3>book cover image</h3>
                </div>
                <div className="col">
                    <h3>ISBN</h3>
                    <h3>Summary</h3>
                    <button className="btn btn-info">Add to Favouries</button>
                    <button className="btn btn-info">Review this book</button>
                </div>
            </div>
        </div>
    )
}