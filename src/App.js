import { useState, useEffect } from 'react'
import './App.css';
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Routes, Route } from 'react-router-dom';
// import page components
import { Home } from './pages/Home'
import { Contact } from './pages/Contact'
import { About } from './pages/About'
import { Signup } from './pages/Signup'
import { Signout } from './pages/Signout'
import { Signin } from './pages/Signin'
import { Detail } from './pages/Detail'

// import firebase
import { initializeApp } from "firebase/app"
import { FirebaseConfig } from './config/FirebaseConfig'
// import firebase firestore
import { 
  getFirestore, 
  getDocs, 
  collection,
  doc,
  getDoc 
} from "firebase/firestore";
// import firebase auth
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
}
  from "firebase/auth"
// import firebase storage
import { getStorage, ref, getDownloadURL } from "firebase/storage"

// initialise Firebase
const FBapp = initializeApp(FirebaseConfig)
// initialise Firebase Auth
const FBauth = getAuth(FBapp)
// initialise FireStore Database
const FBdb = getFirestore(FBapp)
// initialise Firebase Storage
const FBstorage = getStorage()


// function to create user account
const signup = (email, password) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(FBauth, email, password)
      .then((userCredential) => resolve(userCredential.user))
      .catch((error) => {
        // console.log(error)
        reject(error)
      })
  })
}

const signin = (email, password ) => {
  return new Promise( ( resolve, reject ) => {
    signInWithEmailAndPassword( FBauth, email, password )
      .then((userCredential) => resolve(userCredential.user) )
      .catch( (error) => reject(error) )
  } )
}

const signoutuser = () => {
  return new Promise((resolve, reject) => {
    signOut(FBauth)
      .then(() => resolve(true))
      .catch((error) => reject(error))
  })

}

const NavData = [
  { name: "Home", path: "/", public: true },
  { name: "About", path: "/about", public: true },
  { name: "Contact", path: "/contact", public: true },
  { name: "Sign Up", path: "/signup", public: true },
  { name: "Sign in", path: "/signin", public: true }
]

const NavDataAuth = [
  { name: "Home", path: "/", public: true },
  { name: "About", path: "/about", public: true },
  { name: "Contact", path: "/contact", public: true },
  { name: "Sign out", path: "/signout", public: true }
]

function App() {
  const [auth, setAuth] = useState()
  const [nav, setNav] = useState(NavData)
  const [ data, setData ] = useState([])

  useEffect( () => {
    if( data.length === 0 ) {
      getDataCollection('books')
    }
  } )

  // an observer to determine user's authentication status
  onAuthStateChanged(FBauth, (user) => {
    if (user) {
      setAuth(user)
      setNav(NavDataAuth)
    }
    else {
      // if user is null means visitor is not authenticated
      // console.log('not signed in')
      setAuth(null)
      setNav(NavData)
    }
  })

  const getDataCollection = async ( path ) => {
    const collectionData = await getDocs( collection(FBdb, path ) )
    let dbItems = []
    collectionData.forEach( (doc) => {
      let item = doc.data()
      item.id = doc.id
      dbItems.push( item )
    })
    setData( dbItems )
    // return dbItems
  }

  const getImageURL = (path) => {
    // create a reference to image in the path
    const ImageRef = ref( FBstorage, path )
    return new Promise(( resolve, reject ) => {
      getDownloadURL( ImageRef )
      .then((url) =>{ 
        resolve(url)
      } )
      .catch((error) => reject(error) )
    })
  }

  const getDocument = async ( col, id ) => {
    const docRef = doc( FBdb, col, id )
    const docData = await getDoc( docRef )
    if( docData.exists() ) {
      return docData.data()
    }
    else {
      return null
    }
  }

  

  return (
    <div className="App">
      <Header title="My app" headernav={nav} />
      <Routes>
        <Route path="/" element={<Home listData={ data } imageGetter={getImageURL} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup handler={signup} />} />
        <Route path="/signout" element={<Signout handler={signoutuser} auth={auth} />} />
        <Route path="/signin" element={<Signin handler={signin} />} />
        <Route path="/book/:bookId" element={<Detail getter={ getDocument} />} />
      </Routes>
      <Footer year="2022" />
    </div>
  );
}

//hello there

export default App;
