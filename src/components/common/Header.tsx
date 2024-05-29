import {Button, Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/react";
import {Link} from "react-router-dom";

const Header = () => {
  return (
    <Navbar className='bg-blue-950 text-white'>
      <NavbarBrand>
        <p className="font-bold text-inherit">Parking</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link className='text-white' to='/'>
            Inicio
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className='text-white' to='/parqueadero'>
            Zona parqueadero
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className='text-white' to='/settings'>
            Ajustes
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className='text-white' to='/profile'>
            Perfil
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link className='text-white' to=''>Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="warning" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;