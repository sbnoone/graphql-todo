import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { AuthContext } from '../context/auth'

const Navigation = () => {
  const history = useHistory()
  const { user } = React.useContext(AuthContext)
  const path = history.location.pathname === '/' ? 'home' : history.location.pathname.substr(1)

  const [activeItem, setActiveItem] = React.useState(path)

  const handleItemClick = (e, { name }) => {
    setActiveItem(name)
  }

  return (
    <Menu pointing secondary>
      <Menu.Item name='home' as={Link} to='/' onClick={handleItemClick} active={activeItem === 'home'} />
      {!user ? (
        <>
          <Menu.Item
            position='right'
            name='login'
            onClick={handleItemClick}
            active={activeItem === 'login'}
            as={Link}
            to='/login'
          />
          <Menu.Item
            name='register'
            onClick={handleItemClick}
            active={activeItem === 'register'}
            as={Link}
            to='/register'
          />
        </>
      ) : (
        <Menu.Item
          name='logout'
          position='right'
          onClick={handleItemClick}
          active={activeItem === 'logout'}
          as={Link}
          to='/logout'
        />
      )}
    </Menu>
  )
}

export default Navigation
