import * as React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {NavLink, withRouter} from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { selectGroups, selectObjects } from './selectors';

const Heading = styled.div`
  font-weight: bold;
  font-size: 1.25em;
  padding-top: 0.4em
`;

const Content = styled.div`
  color: black;
  font-size: 1em;
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  &:hover{
    cursor: pointer;
    font-weight: 900;
  }
`;

const Wrapper = styled.div`
`;

const style = {
  active: {fontWeight: 900},
};

const navigationSublist = (objects, id) => {
  const sublist = R.filter(R.propEq('group', id), objects);
  return (
    <div>
      {sublist.map((object) => (
        <NavLink key={object.id} to={`/building/${object.id}`} exact activeStyle={style.active}>
          <Content>
            {object.label} {object.name}
          </Content>
        </NavLink>
      ))}
    </div>
  );
};

const NavigationContent = (props) => (
  <Wrapper>
    {props.groups.map((group) => (
      <div key={group.id}>
        <Heading>PC {group.unit} - {group.name}</Heading>
        {navigationSublist(props.objects, group.id)}
      </div>
    ))}
  </Wrapper>
);

NavigationContent.propTypes = {
  objects: PropTypes.array.isRequired,
  groups: PropTypes.array.isRequired,
};

const mapStateToProps = () => createStructuredSelector({
  objects: selectObjects(),
  groups: selectGroups(),
});


export default withRouter(connect(mapStateToProps, null)(NavigationContent));
