import { useState, useEffect } from 'react'

export function Signup ( props ) {
    return (
        <div className="container">
            <div className="row">
                <form className="col-md-4 offset-md-4">
                    <h2>Sign up for an account</h2>
                    <div className="mb-3">
                        <label htmlFor="useremail">Email</label>
                        <input type="email" id="useremail" placeholder="you@domain.com" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="userpw">Password</label>
                        <input type="password" id="userpw" placeholder="you@domain.com" className="form-control" />
                    </div>
                    <div className="d-grid">
                        <button type="submit" class="btn btn-primary">Sign up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}