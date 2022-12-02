import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'

export function Home(props) {
  const [pageData, setPageData] = useState([])

  useEffect(() => {
    setPageData(props.listData)
  })
  // inline styles for the row
  // flexible grid from https://css-tricks.com/books/greatest-css-tricks/flexible-grids/
  const styles = {
    display: "grid",
    // gridTemplateColumns: "1fr 1fr 1fr",
    // flexible grid
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "20px"
  }

  if (pageData.length > 0) {
    const itemCollection = pageData.map(( item, key ) => {
      return (
        <div className="d-flex" key={key}>
          <div className="card position-relative w-100 h-100">
            <Image urlgetter={ props.imageGetter } imgPath={"book_covers/" + item.Cover} />
            <div className="card-body d-flex flex-column justify-content-end">
              <h5 className="card-title">{item.Title}</h5>
              <Link 
                to={"/book/" + item.id} 
                className="position-absolute w-100 h-100 d-block"
                style={{top:"0px", left: "0px"}}
              >
                <span className="visually-hidden">Detail</span>
              </Link>
            </div>
          </div>
        </div>
      )
    })

    return (
      <div className="container my-4">
        <div style={styles}>
          {itemCollection}
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="container"></div>
    )
  }
}


function Image( props ) {
  const [imageURL,setImageURL] = useState()

  useEffect( () => {
    if( !imageURL ) {
      props.urlgetter( props.imgPath )
      .then((url) => setImageURL(url) )
      .catch( (error) => console.log(error) )
    }
  })

  if( imageURL ) {
    return (
      <img src={imageURL} className="card-img-top w-100" alt={props.Title} />
    )
  }
  else {
    return (
      <div>Loading...</div>
    )
  }
}