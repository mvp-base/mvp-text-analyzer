import { Navbar, Nav as Navigation } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function Nav() {
  return (
    <Navbar className="d-flex flex-column flex-fill align-items-start bg-primary px-3 gap-4 rounded-3 ">
      <LinkContainer to="/" className="bg-primary">
        <Navbar.Brand>
          <i className="bi bi-bar-chart-line"></i> {' Graph-Dashboard'}
        </Navbar.Brand>
      </LinkContainer>

      <Navigation className="d-flex flex-column w-100" id="MainNav">
        <LinkContainer to="/">
          <Navigation.Link className="text-white">Home</Navigation.Link>
        </LinkContainer>

        <LinkContainer to="/import">
          <Navigation.Link className="text-white">Import</Navigation.Link>
        </LinkContainer>
      </Navigation>
    </Navbar>
  );
}
