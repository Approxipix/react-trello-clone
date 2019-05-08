import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import BoardAdder from '../components/BoardAdder';

const Wrapper = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
  font-size: 1.3rem;
  font-weight: 600;
`;

const BoardList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
`;

const BoardItem = styled.li`
  display: inline-flex;
  flex-direction: column;
  padding: .6rem;
  width: 100%;
  background-color: #2e7eaf;
  border-radius: .4rem
  transition: background-color .1s;
  &:hover {
    background-color: #0a6796;
  }
`;

const BoardTitle = styled.div`
  margin-bottom: .3rem;
  color: white;
  font-weight: 700;
  text-decoration: none;
  overflow-wrap: break-word;
`;

const BoardScheme = styled.div`
  display: flex;
  height: 100px;
  margin-right: 10px;
`;

const BoardSchemeList = styled.div`
  display: inline-block;
  box-sizing: border-box;
  width: 24px;
  height: 100%;
  margin-right: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.25);
  height: ${props => props.height}px;
`;

class Boards extends Component {
  render() {
    const { boards } = this.props;
    return (
      <Wrapper>
        <Title>
          My Boards
        </Title>
        <BoardList>
          {boards.map(board => (
            <NavLink key={board.boardId} to={`/board/${board.boardId}`}>
              <BoardItem>
                <BoardTitle>
                  {board.title}
                </BoardTitle>
                <BoardScheme>
                  {board.list.map(list => (
                    <BoardSchemeList
                      key={list.listId}
                      height={Math.min((list.task.length + 1) * 18, 1000)}
                    />
                  ))}
                </BoardScheme>
              </BoardItem>
            </NavLink>
          ))}
          <BoardAdder />
        </BoardList>
      </Wrapper>
    )
  }
}

function mapStateToProps(state) {
  return {
    boards: state.rootReducer.boards,
  }
}

export default connect(mapStateToProps)(Boards);
