import * as React from 'react';
import styled from 'styled-components';
import Map from './hydrants-map-2016.png';

const Img = styled.img`
  max-width: 100%;
`;

const HydrantsMap = () => <Img src={Map} alt="hlavni mapa budov"/>;

export default HydrantsMap;
