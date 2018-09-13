import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

import Search from "../forms/Search/Search";

const TopNavigation = () => (
  <Menu inverted color="teal">
    <Menu.Item as={Link} to="/">
      <Icon name="clipboard list" />
      Posts
    </Menu.Item>
    <Search />
  </Menu>
);

export default TopNavigation;
