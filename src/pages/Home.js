import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'

export function Home(props) {
  const [pageData, setPageData] = useState([])

  useEffect(() => {
    setPageData(props.listData)
  } ,[props.listData])

  if (pageData.length > 0) {
    const itemCollection = pageData.map(( item, key ) => {
      return (
        <div className="col-md-4" key={key}>
          <div className="card">
            <Image urlgetter={ props.imageGetter } imgPath={"book_covers/" + item.Cover} />
            <div className="card-body">
              <h5 className="card-title">{item.Title}</h5>
              <Link to={"/book/" + item.id}>Detail</Link>
            </div>
          </div>
        </div>
      )
    })

    return (
      <div className="container my-4">
        <div className="row">
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
      <img src={imageURL} className="card-img-top" alt={props.Title} />
    )
  }
  else {
    return (
      <div>Loading...</div>
    )
  }
}