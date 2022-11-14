
import { useState, useEffect } from 'react'

export function SignupForm(props) {
  const[email, setEmail] = useState('')
  const [passowrd, setPassword] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [validPassword, setValidPassword] = useState(false)

  useEffect(() => {
    // check the value of email
    // check if email contains @ and it's not the first character
    if (email.length >= 5 && email.indexOf('@') > 0) {
      setValidEmail(true)
    }
    else {
      setValidEmail(false)
    }
    // [email] makes this effect only affected by changes in email
  }, [email])

  useEffect(() => {
    if (password.length >= 8) {
      setValidPassword(true)
    }
    else {
      setValidPassword(false)
    }
    // [email] makes this effect only affected by changes in password
  }, [password])

  const submitHandler = (event) => {
    // stop the form from refreshing the page
    event.preventDefault()
    // capture data from form
    const data = new FormData(event.target)
    // pass the email and password in Formdata 
    props.handler(data.get("useremail"), data.get("userpw"))
      .then(() => console.log('success'))
      .catch((error) => {
        //console.log(error)
      })
  }

  return (
    <form onSubmit={submitHandler}>
      <h4 className="my-3 text-center">Sign up for an account</h4>
      <div className="mb-3">
        <label htmlFor="useremail">Email (valid email address) </label>
        <input
          type="email"
          id="useremail"
          name="useremail"
          placeholder="you@domain.com"
          className="form-control"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="userpw">Password (minimum 8 characters)</label>
        <input
          type="password"
          id="userpw"
          name="userpw"
          placeholder="you@domain.com"
          className="form-control"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={(validEmail && validPassword) ? false : true}
        >
          Sign up
        </button>
      </div>
    </form>
  )
}