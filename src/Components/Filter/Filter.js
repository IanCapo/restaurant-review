import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './Filter.css'

export default class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  filterOptions = (value) => {
    this.props.action(value)
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Filter by rating
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={e => this.filterOptions(2)}>2+ ☆</DropdownItem>
          <DropdownItem onClick={e => this.filterOptions(3)}>3+ ☆</DropdownItem>
          <DropdownItem onClick={e => this.filterOptions(4)}>4+ ☆</DropdownItem>
          <DropdownItem onClick={e => this.filterOptions(5)}>5+ ☆</DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={e => this.filterOptions('all')}>All</DropdownItem>
        </DropdownMenu>
      </Dropdown>

    );
  }
}
