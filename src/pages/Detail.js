import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'

import { Reviews } from "../components/Reviews"

export function Detail(props) {
  const [bookData, setBookData] = useState()
  const [bookReviews, setBookReviews] = useState([])

  let { bookId } = useParams()

  useEffect(() => {
    if (!bookData) {
      props.getter("books", bookId)
        .then((data) => {
          setBookData(data)
        })
    }
  })

  // fetch book reviews
  useEffect(() => {
    if (bookReviews.length == 0) {
      let reviews = props.getReviews(bookId)
      console.log(reviews)
    }
  }, [bookData])


  const reviewSubmitHandler = (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    props.addReview(data.get("bookId"), data.get("reviewtext"), data.get("userId"))
      .then((res) => console.log(res))
  }


  if (bookData) {
    return (
      <div className="container my-4">
        <div className="row">
          <div className="col">
            <h2>{bookData.Title}</h2>
            <h4>{bookData.Tagline}</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <DetailImage data={bookData} getter={props.imageGetter} />
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6">
                <h4>Author</h4>
                <p>{bookData.Author}</p>
                <h5>ISBN 10</h5>
                <p>{bookData.ISBN10}</p>
                <h5>ISBN 13</h5>
                <p>{bookData.ISBN13}</p>
              </div>
              <div className="col-md-6">
                <h5>Pages</h5>
                <p>{bookData.Pages}</p>
                <h5>Year</h5>
                <p>{bookData.Year}</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                {bookData.Summary}
              </div>
            </div>


            <div style={(props.auth) ? { display: "block" } : { display: "none" }}>
              {/* <button className="btn btn-info">Add to Favourites</button> */}
              <form method="post" onSubmit={reviewSubmitHandler}>
                <label className="form-label">
                  <h5>Write a review for {bookData.Title}</h5>
                </label>
                <textarea
                  cols="30"
                  rows="5"
                  name="reviewtext"
                  className="form-control"
                  placeholder="I love this book!..."
                ></textarea>
                <input type="hidden" name="userId" value={(props.auth) ? props.auth.uid : ""} />
                <input type="hidden" name="bookId" value={bookId} />
                <button className="btn btn-info my-2">Review this book</button>
              </form>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h2>Reviews</h2>
            <Reviews reviews={bookReviews} />
          </div>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="container my-4"></div>
    )
  }
}

function DetailImage(props) {
  const [imgUrl, setImgUrl] = useState()

  const ImageLoadingStyle = {
    display: "grid",
    aspectRatio: "3/4",
    backgroundColor: "#CCCCCC",
    placeItems: "center"
  }

  useEffect(() => {
    if (props.data) {
      props.getter("book_covers/" + props.data.Cover)
        .then((url) => setImgUrl(url))
    }
  }, [props.data])

  if (imgUrl) {
    return (
      <img src={imgUrl} style={{ width: "100%" }} alt="book cover" />
    )
  }
  else {
    return (
      <div style={ImageLoadingStyle}>
        <p>Loading...</p>
      </div>
    )
  }
}

