import React, { Component } from "react";
import { connect } from "react-redux";
import styled from 'styled-components'
import { bindActionCreators } from 'redux';
import { addList } from '../../redux/boardReducer/actions';

const Wrapper = styled.div`
  width: 15rem;
  margin: 0 .5rem;
  padding: .6rem;
  background-color: #e3e3e3;
  border-radius: .2rem
`;

const Title = styled.h4`
  margin-bottom: .5rem;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: .5rem;
  padding: .6rem;
  border: 1px solid #bdc3c7;
  border-radius: 3px;
  box-shadow: none;
  font-size: 1rem;
  color: #40424b;
  line-height: 1rem;
  outline: none;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  font-size: .9rem;
`;

const CreateButton = styled.button`
  border: 1px solid #bdc3c7;
  padding: .5rem;
  margin-right: .3rem;
  border-radius: 3px;
  box-shadow: none;
  color: #40424b;
  cursor: pointer;
`;

const CancelButton = styled.button`
  margin-left: .3rem;
  padding: 0;
  font-size: inherit;
  color: #3498db;
  cursor: pointer;
`;

const AddButton = styled.button`
  width: 15rem;
  margin: 0 .5rem;
  padding: .75rem;
  border-radius: .2rem;
  background: rgba(0, 0, 0, 0.1);
  color: #c3c3c3;
  font-size: 1rem; 
  text-align: left;
  transition: background-color .1s;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

class BoardAdder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      title: '',
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.outerClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.outerClick);
  }

  outerClick = (e) => {
    let { target } = e;
    if (target.id === 'column-add-btn' || target.id === 'column-add-form') {
      return;
    }
    if (!!target.closest && (target.closest('#column-add-form'))) {
      return;
    }
    this.setState({ isOpened: false });
  };

  handleChange = event => {
    this.setState({
      title: event.target.value
    });
  };

  handleKeyDown = event => {
    if (event.keyCode === 27) {
      this.setState({
        isOpened: false
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const { title } = this.state;
    if (!title) return;
    this.props.actions.addList({
      listTitle: title
    });
    this.setState({
      isOpened: false,
      title: ''
    });
  };

  toggleOpened = () => {
    this.setState({
      isOpened: !this.state.isOpened
    })
  };

  render = () => {
    const { isOpened, title } = this.state;
    return isOpened ? (
      <Wrapper>
        <Title>
          New Column
        </Title>
        <form onSubmit={this.handleSubmit} id="column-add-form">
          <Input
            autoFocus
            type="text"
            placeholder="Column name"
            value={title}
            onKeyDown={this.handleKeyDown}
            onChange={this.handleChange}
            spellCheck={false}
          />
          <Actions>
            <CreateButton
              type="submit"
              disabled={title === ""}
            >
              Save list
            </CreateButton>
            or
            <CancelButton
              onClick={() => this.toggleOpened()}
            >
              cancel
            </CancelButton>
          </Actions>
        </form>
      </Wrapper>
    ) : (
      <AddButton
        id={'column-add-btn'}
        onClick={() => this.toggleOpened()}
      >
        Add a new column...
      </AddButton>
    );
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      addList: addList,
    }, dispatch)
  };
}


export default connect(null, mapDispatchToProps)(BoardAdder);
