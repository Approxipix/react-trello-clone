import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { editBoardColor } from '../redux/boardReducer/actions';
import styled from 'styled-components'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Progres = styled.div`
  position: relative;
  height: 10px;
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;
const ProgresBar = styled.div`
  position: absolute;
  display: block;
  width: 0;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: lightblue;
  width: ${props => props.width}%;
  transition: width 0.2s ease-in-out;
`;

class CheckListProgress extends Component {
  render() {
    const { allIrems, doneItems } = this.props;
    let width = 0;
    if (!!allIrems) {
      width = (doneItems * 100) / allIrems;
    }
    return (
      <>
        <Progres>
          <ProgresBar width={width}/>
        </Progres>
        {width.toFixed()} %
      </>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { rootReducer } = state;
  const board = rootReducer.boards[rootReducer.currentBoardIndex];
  const list = board.lists[ownProps.listIndex];
  const card = list.cards[ownProps.cardIndex];
  const items = card.checkLists[ownProps.checkBoxIndex].items;
  const allIrems = items.length;
  const doneItems = items.filter(item => !!item.status).length;
  return {
    allIrems: allIrems,
    doneItems: doneItems
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({

    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckListProgress);
