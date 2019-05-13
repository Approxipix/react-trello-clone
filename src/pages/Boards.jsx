import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import BoardAdder from '../components/Board/BoardAdder';

const Wrapper = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
`;

const BoardList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
  grid-auto-rows: 1fr;
  grid-gap: 1rem;
`;

const BoardItem = styled.li`
  padding: .6rem;
  background-color: ${props => props.color};
  border-radius: .4rem
  &:hover {
    box-shadow: inset 0px 0px 0px 100px rgba(0, 0, 0, .1);
  }
`;

const BoardTitle = styled.h2`
  margin-bottom: .5rem;
  font-size: 1rem;
  color: white;
  font-weight: 700;
  text-decoration: none;
  overflow-wrap: break-word;
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
  height: ${props => props.height}px;
  width: 1.5rem;
  margin-right: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.25);
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
          {boards.map((board, index) => (
            <NavLink key={index} to={`/board/${index}`}>
              <BoardItem color={board.color}>
                <BoardTitle>
                  {board.title}
                </BoardTitle>
                <BoardScheme>
                  {board.list.map(list => (
                    <BoardSchemeList
                      key={list.listId}
                      height={Math.min((list.task.length + 1) * 10, 100)}
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
