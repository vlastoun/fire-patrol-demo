import * as React from 'react';
import styled from 'styled-components';
import ColourResolver from '../../ColourResolver';


const Content = styled.div`
color: ${(props) => ColourResolver(props.group)};
font-size: 1em;
transition: all 0.3s cubic-bezier(.25,.8,.25,1);
&:hover{
  cursor: pointer;
  font-weight: 900;
}
`;


class CleverContent extends React.Component{
  constructor(props) {
    super(props);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
  }
  handleMouseEnter(){
    this.props.handleMouseEnter(this.props.id)
  }
  render(){
    return(
      <Content group={this.props.group} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.props.handleMouseLeave} onClick={this.props.handleMouseLeave}>
        {this.props.children}
      </Content>
    )
  }
}

export default CleverContent;
