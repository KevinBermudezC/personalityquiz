import {Link} from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>Which Element Are You?</h1>
      <h2>(Based on completely random things!)</h2>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/quiz">Quiz</Link>
      </nav>
    </header>
  )
}
export default Header
