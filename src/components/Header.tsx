import React from 'react';
import { Navbar, Image, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { logout } from 'store/actions';
import { getUserName, getUserPictureUrl } from 'store/selectors';
import { ReactComponent as LogoSvg } from 'assets/chats.svg';
import { getUiAvatarUrl } from 'services/avatarUiApi';
import styles from './Header.module.scss';

const mockUserName = 'JOHN DOE';

export interface HeaderProps {
  className?: string,
};

const Header: React.FC<HeaderProps> = function(props) {
  const userName = useSelector(getUserName);
  const userPictureUrl = useSelector(getUserPictureUrl);
  const userLogout = () => logout()();
  return (
    <Navbar bg="light" sticky="top" className={styles.bar + ' ' + props.className}>
      <div>
        <Navbar.Brand>
          <LogoSvg className={styles.logo} />
        </Navbar.Brand>
      </div>
      <div>
        <Image roundedCircle className={styles.pic}
          src={userPictureUrl || getUiAvatarUrl(userName)}
        />
        <Navbar.Text className="ml-2 mr-3 mr-md-4 mr-lg-5">{ userName || mockUserName }</Navbar.Text>
        <Button onClick={userLogout}>Log out</Button>
      </div>
    </Navbar>
  );
};

export default Header;
