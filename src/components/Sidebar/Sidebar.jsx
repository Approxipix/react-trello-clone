import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleSidebar } from '../../redux/rootReducer/actions/actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SidebarNavigation from './SidebarNavigation';
import BoardBackgroundEdit from '../Board/BoardBackgroundEdit';
import BoardDelete from '../Board/BoardDelete';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 19rem;
  left: 100%;
  background-color: #F4F5F7;
  box-shadow: 0 .75rem 1.5rem -.375rem rgba(9,30,66,.25);
  transform: ${props => props.isOpened ? 'translateX(-100%)' : 'none'};
  transition: transform .3s ease-in-out;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .75rem .5rem;
  border-bottom: 1px solid rgba(9,30,66,.13);
`;

const Title = styled.h3`
  font-size: 1rem;
  font-weight: 600;
`;

const Button = styled.button`
  color: #6b778c;
  font-size: 1rem;
  transition: color .1s ease-in;
  &:hover {
    color: #42526e;
  }
`;
Button.displayName = 'Button';

const Body = styled.div`
   padding: .75rem 1rem;
`;

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarView: null,
      sidebarTitle: 'Menu',
    }
  }

  componentWillUnmount() {
    this.props.actions.toggleSidebar(false)
  }

  changeView = (component, title) => {
    this.setState({
      sidebarView: component,
      sidebarTitle: title,
    });
  };

  sidebarView = () => {
    const { boards, currentBoardID } = this.props;
    const { sidebarView } = this.state;

    let board;
    if (boards[currentBoardID]) {
      board = boards[currentBoardID]
    }

    switch (sidebarView) {
      case ('BoardBackgroundEdit'):
        return <BoardBackgroundEdit boardId={board._boardId} boardColor={board.color}/>;
      case ('BoardDelete'):
        return <BoardDelete boardId={board._boardId}/>;
      default:
        return <SidebarNavigation changeView={this.changeView}/>;
    }
  };

  render() {
    const { isSidebarOpened } = this.props;
    const { sidebarTitle, sidebarView } = this.state;
    return (
      <Wrapper isOpened={isSidebarOpened}>
        <Header>
          <Button
            onClick={() => this.changeView(null, 'Menu')}
            disabled={!sidebarView}
          >
            {!!sidebarView && <FontAwesomeIcon icon="chevron-left"/>}
          </Button>
          <Title>
            {sidebarTitle}
          </Title>
          <Button onClick={() => this.props.actions.toggleSidebar(false)}>
            <FontAwesomeIcon icon="times"/>
          </Button>
        </Header>
        <Body>
          {this.sidebarView()}
        </Body>
      </Wrapper>
    );
  }
}

Sidebar.defaultProps = {
  currentBoardID: null,
  isSidebarOpened: false,
  boards: {},
};

Sidebar.propTypes = {
  currentBoardID: PropTypes.string,
  isSidebarOpened: PropTypes.bool,
  boards: PropTypes.objectOf(
    PropTypes.shape({
      _boardId: PropTypes.string,
      title: PropTypes.string,
      color: PropTypes.string.isRequired,
      lists: PropTypes.arrayOf(PropTypes.string)
    })
  ),
};


function mapStateToProps(state) {
  return {
    boards: state.boardReducer,
    currentBoardID: state.rootReducer.currentBoardID,
    isSidebarOpened: state.rootReducer.isSidebarOpened,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      toggleSidebar: toggleSidebar,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
