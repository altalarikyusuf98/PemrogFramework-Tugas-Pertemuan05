import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch

} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  Nav, Navbar, NavbarBrand, NavLink, Form, FormControl, Button
} from 'react-bootstrap';
import logo from "./logo.png"
import shirt from "./shirt1.jpg"

export default function Tugas() {
  return (
    <Router>
      <div>
        <Navbar bg="dark" variant="dark">
          <NavbarBrand className="fa fa-cutlery"></NavbarBrand>
          <Nav className="w-100">
            <NavLink className="mt-2">
              <Link className="text-white" to="/home" style={{ textDecoration: "none" }}>Home</Link>
            </NavLink>
            <NavbarBrand className="mt-2 mx-auto">
              <img src={logo}
              width="150"/>
            </NavbarBrand>
            <NavLink className="">
              <Link className="text-white" to="/about" style={{ textDecoration: "none" }}>
                <Form inline="true">
                  <Button variant="outline-info">About</Button>
                </Form>
              </Link>
            </NavLink>
          </Nav>
        </Navbar>

        <Switch>
          <Route path="/home">
            <PublicPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute path="/about">
            <ProtectedPage />
            <Switch>
              <AuthButton />
            </Switch>
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

// export default function AuthExample() {
//   return (
//     <Router>
//       <div>
//         <AuthButton />

//         <ul>
//           <li>
//             <Link to="/public">Public Page</Link>
//           </li>
//           <li>
//             <Link to="/private">Private Page</Link>
//           </li>
//         </ul>

//         <Switch>
//           <Route path="/public">
//             <PublicPage />
//           </Route>
//           <Route path="/login">
//             <LoginPage />
//           </Route>
//           <PrivateRoute path="/private">
//             <ProtectedPage />
//           </PrivateRoute>
//         </Switch>
//       </div>
//     </Router>
//   );
// }

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

function AuthButton() {
  let history = useHistory();

  return fakeAuth.isAuthenticated ? (
      <button className="btn btn-danger d-flex m-auto"
        onClick={() => {
          fakeAuth.signout(() => history.push("/home"));
      }}
      >
        Sign out
      </button>
  ) : (
    <p>You are not logged in.</p>
  );
}

function PrivateRoute({ children, ...rest}) {
  return (
    <Route
    {...rest}
    render={({ location }) => 
      fakeAuth.isAuthenticated ? (
        children
      ) : (
      <Redirect
      to={{
        pathname: "/login",
        state: { from: location }
      }}
    />
  )
}
/>
  );
}

function PublicPage() {
  return (
    <div className="w-100 container">
      <div className="row">
        <Image nama="Shirt" harga="Rp.75.000" detail="New Product" />
        <Image nama="Shirt" harga="Rp.75.000" detail="New Product" />
        <Image nama="Shirt" harga="Rp.75.000" detail="New Product" />
      </div>
    </div>
  )
}

function ProtectedPage() {
  let {path,url} = useRouteMatch();
  return (
    <div className="w-50 text-center cover-container d-flex h-100 p-3 mx-auto flex-column">
      <main role="main" class="inner cover">
        <h1 class="cover-heading">About page.</h1>
        <p class="lead">August.co Store is an Indonesian developing fashion brand which propose high quality and design in order to support your traveling and daily needs.</p>
      </main>
      <h2>
        Contact Us.
      </h2>
      <p>
      <Link to={`${url}/082123476518`}>Whatsapp</Link>
      </p>
      <p>
      <Link to={`${url}/@august.co`}>LINE ID</Link>
      </p>
      <Switch>
              <Route exact path="{path}">
                <h3>Please Choose Your Goods!</h3>
              </Route>
  
              <Route path={`${path}/:contactId`}>
                <Contact/>
              </Route>
  
          </Switch>
    </div>
  )
}

function Contact() {
  let{contactId} = useParams();

  return(
    <div>
      <p>{contactId}</p>
    </div>
  );
}

function LoginPage() {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/"} };
  let login = () => {
    fakeAuth.authenticate(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      <p>Silahkan melakukan login terlebih dahulu.</p>
      <button className="btn btn-success" onClick={login}>Log in</button>
    </div>
  );
}

function Image(props){
  return(
    <div className="col col-sm-4 portofolio-item mt-4">
      <div className="card h-100">
          <img src={shirt} alt="Gambar Thumbnail Artikel" className="card-img-top mh-100"/>
          <div className="card-body">
              <h4 className="card-title w-75 float-left">{props.nama}</h4>
              <h5 className="card-title w-75 text-primary">{props.harga}</h5>
              <hr/>
              <p className="card-text">{props.detail}</p>
          </div>
      </div>
    </div>
  )
}


// export default function NestingExample(){
//   return (
//     <Router>
//       <div>
//         <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/topics">Topics</Link>
//           </li>
//         </ul>

//         <hr />

//         <Switch>
//           <Route exact path="/">
//             <Home />
//           </Route>
//           <Route path="/topics">
//             <Topics />
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   )
// }

// export default function ParamsExample() {
//   return (
//     <Router>
//       <div>
//         <h2>Accounts</h2>
//         <ul>
//           <li>
//             <Link to="/netflix">Netflix</Link>
//           </li>
//           <li>
//             <Link to="/gmail">Gmail</Link>
//           </li>
//           <li>
//             <Link to="/yahoo">yahoo</Link>
//           </li>
//           <li>
//             <Link to="/amazon">Amazon</Link>
//           </li>
//         </ul>

//         <Switch>
//           <Route path="/:id" children={<Child />} />
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// function Child() {
//   let { id } = useParams();

//   return(
//     <div>
//       <h3>ID: {id}</h3>
//     </div>
//   )
// }

// export default function BasicExample() {
//   return (
//     <Router>
//       <div>
//         <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/about">About</Link>
//           </li>
//           <li>
//             <Link to="/dashboard">Dashboard</Link>
//           </li>
//         </ul>
//         <hr />

//         <Switch>
//           <Route exact path="/">
//             <Home />
//           </Route>
//           <Route exact path="/about">
//             <About />
//           </Route>
//           <Route exact path="/dashboard">
//             <Dashboard />
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   )
// }

// function Home(){
//   return (
//     <div>
//       <h2>Home</h2>
//     </div>
//   );
// }

// function About(){
//   return (
//     <div>
//       <h2>About</h2>
//     </div>
//   );
// }

// function Dashboard(){
//   return (
//     <div>
//       <h2>Dashboard</h2>
//     </div>
//   );
// }

// function Topics() {
//   let { path, url } = useRouteMatch();

//   return (
//     <div>
//       <h2>Topics</h2>
//       <ul>
//         <li>
//           <Link to={`${url}/Sate, Nasi Goreng`}>Kuliner</Link>
//         </li>
//         <li>
//           <Link to={`${url}/Wisata alam, Museum`}>Travelling</Link>
//         </li>
//         <li>
//           <Link to={`${url}/Ibis, JW Marriot`}>Review Hotel</Link>
//         </li>
//       </ul>

//       <Switch>
//         <Route exact path={path}>
//           <h3>Please select a topic.</h3>
//         </Route>
//         <Route path={`${path}/:topicId`}>
//           <Topic />
//         </Route>
//       </Switch>
//     </div>
//   );
// }

// function Topic() {
//   let { topicId } = useParams();

//   return (
//     <div>
//       <h3>{topicId}</h3>
//     </div>
//   );
// }