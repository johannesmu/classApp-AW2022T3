import { useState, useEffect } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { FormText } from 'react-bootstrap/Form'

export function Signup(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
    <div className="container">
      <div className="row">
        <div className="col-md-4 offset-md-4 mt-4">
          <Tabs fill defaultActiveKey="sign up">
            <Tab eventKey="sign up" title="Sign up">
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
            </Tab>
            <Tab title="Sign in" eventKey="sign in">
              <p>Sign in</p>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  )
}