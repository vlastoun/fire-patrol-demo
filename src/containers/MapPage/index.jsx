import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {createStructuredSelector} from 'reselect';
import Point from '../../components/Point';
import MainMap from '../../components/Map-main';
import {selectObjects} from './selectors';

const IMG_WIDTH = 2610;
const IMG_HEIGHT = 1711;

const Container = styled.div`
  position: relative;
`;
/* eslint-disable class-methods-use-this */
class MapPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coefficient: 1,
    };
    this.calculateCoeficient = this.calculateCoeficient.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
  }
  componentDidMount() {
    this.calculateCoeficient();
    window.addEventListener('resize', this.calculateCoeficient);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.calculateCoeficient);
  }

  calculateCoeficient() {
    const calculatedCoefficient = (window.innerWidth / IMG_WIDTH);
    this.setState({ coefficient: calculatedCoefficient });
  }

  handleMouseEnter(event, id){
    console.log('Event: ', event);
    console.log('ID: ', id);
  }

  render() {
    const {objects} = this.props;
    return (
      <Container>
        <Switch>
          <Route component={MainMap} />
        </Switch>
        {objects.map((object) => (
          <Point
            id={object.id}
            key={object.id}
            top={(object.top / IMG_HEIGHT) * 100}
            left={(object.left / IMG_WIDTH) * 100}
            scale={this.state.coefficient}
            data="test"
            handleMouseEnter={this.handleMouseEnter}
          />
        ))}
      </Container>
    );
  }
}
const mapStateToProps = () => createStructuredSelector({
  objects: selectObjects(),
});


MapPage.propTypes = {
  objects: PropTypes.array.isRequired,
};
export default connect(mapStateToProps, null)(MapPage);
