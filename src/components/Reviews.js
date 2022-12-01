import { useState, useEffect } from 'react'

export function Reviews(props) {
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        setReviews(props.reviews)
    }, [props.reviews])

    if (reviews.length == 0) {
        <div className="reviews">
            <p>There are currently no reviews for this book</p>
        </div>
    }
    else {
        const ReviewsCollection = reviews.map( (item) => {
            return(
                <div className="my-3">
                    <p>{item.Date}</p>
                    <p>{item.Text}</p>
                </div>
            )
        })

        return (
            <div className="reviews">
                {ReviewsCollection}
            </div>
        )
    }
}