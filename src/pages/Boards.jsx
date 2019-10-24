import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import BoardAdd from '../components/Board/BoardAdd';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  padding: 1rem 1.5rem;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
`;

const BoardList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  grid-auto-rows: minmax(10rem, 1fr);
  grid-gap: 1rem;
`;

const BoardItem = styled.li`
  padding: .6rem;
  background-color: ${props => props.color};
  border-radius: .4rem;
  &:hover {
    box-shadow: inset 0 0 0 10rem rgba(0, 0, 0, .1);
  }
`;

const BoardTitle = styled.h2`
  margin-bottom: .5rem;
  font-size: 1rem;
  color: white;
  font-weight: 700;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const BoardScheme = styled.div`
  display: flex;
  height: 6.25rem;
  margin-right: .3rem;
  overflow: hidden;
`;

const BoardSchemeList = styled.div`
  display: inline-block;
  flex-shrink: 0;
  width: 1.5rem;
  height: ${props => props.height}px;
  margin-right: .4rem;
  border-radius: .2rem;
  background: rgba(255, 255, 255, 0.25);
`;

const Boards = (props) => {
  const { boards, lists } = props;
  let boardsItems = Object.keys(boards).map(key => boards[key]);
  let listItems = Object.keys(lists).map(key => lists[key]);
  return (
    <Wrapper>
      <Title>
        My Boards
      </Title>
      <BoardList>
        {boardsItems.map((board, index) => (
          <NavLink key={index} to={`/b/${board._boardId}`}>
            <BoardItem color={board.color}>
              <BoardTitle>
                {board.title}
              </BoardTitle>
              <BoardScheme>
                {board.lists.map((listId, index) => {
                  const list = listItems.find(list => list._listId === listId);
                  return (
                    <BoardSchemeList
                      key={index}
                      height={Math.min((list.cards.length + 1) * 10, 100)}
                    />
                  )
                })}
              </BoardScheme>
            </BoardItem>
          </NavLink>
        ))}
        <BoardAdd />
      </BoardList>
    </Wrapper>
  )
};

Boards.defaultProps = {
  boards: {},
  lists: {},
};

Boards.propTypes = {
  boards: PropTypes.objectOf(
    PropTypes.shape({
      _boardId: PropTypes.string.isRequired,
      title: PropTypes.string,
      color: PropTypes.string.isRequired,
      lists: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  lists: PropTypes.objectOf(
    PropTypes.shape({
      _listId: PropTypes.string.isRequired,
      title: PropTypes.string,
      cards: PropTypes.arrayOf(PropTypes.string).isRequired
    })
  ).isRequired,
};

function mapStateToProps(state) {
  return {
    boards: state.boardReducer,
    lists: state.listReducer
  }
}

export default connect(mapStateToProps)(Boards);
