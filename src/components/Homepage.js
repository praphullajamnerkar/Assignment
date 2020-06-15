import React from "react";
import { Modal, ModalHeader } from "reactstrap";
const TaskList = [{ id: 1, Name: "Task 1", Status: "inprogress" },
{ id: 2, Name: "Task 2", Status: "inprogress" },
{ id: 3, Name: "Task 3", Status: "todo" },
{ id: 4, Name: "Task 4", Status: "todo" },
{ id: 5, Name: "Task 5", Status: "todo" },
{ id: 6, Name: "Task 6", Status: "done" },
{ id: 7, Name: "Task 7", Status: "done" },
{ id: 8, Name: "Task 8", Status: "done" },
{ id: 9, Name: "Task 9", Status: "todo" },
{ id: 10, Name: "Task 10", Status: "inprogress" }];

class Homepage extends React.Component {
  slideIndex = 0;
  constructor(props) {
    super(props);
    this.state = {
      getTaskList: TaskList,
      msgModal: false,
      modal: false,
      selecteGroup: '',
      cardName: ''
    };
  }

  deleteMsg = (card, updateState) => {
    this.setState(state => ({
      msgModal: !state.msgModal,
      selectedCard: card,
      selecteGroup: updateState
    }));
  }

  deletCard = () => {
    let newState = this.state.getTaskList.filter(task => {
      return (task.id === this.state.selectedCard.id)
    })
    newState[0].Status = this.state.selecteGroup;
    var CopyArray = JSON.parse(JSON.stringify(this.state.getTaskList));
    var c = CopyArray.concat(newState)
    c.filter((item, pos) => c.indexOf(item) === pos)
    console.log('update', newState, CopyArray);
    this.setState({
      getTaskList: CopyArray,
      msgModal: false
    });
  }

  toggleModal = (status) => {
    this.setState(state => ({
      modal: !state.modal,
      selecteGroup: status ? status : ''
    }))
  }

  addCard = () => {
    if (this.state.cardName && this.state.selecteGroup) {
      var newArray = JSON.parse(JSON.stringify(this.state.getTaskList));
      newArray.push({
        id: this.state.getTaskList.length + 1,
        Name: this.state.cardName,
        Status: this.state.selecteGroup
      })
      this.setState({
        getTaskList: newArray,
        modal: false
      })
    } else {
      alert(`Card Name${!this.state.selecteGroup && ' and Card Group'} is mandatory field.`)
    }
  }

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    })
  }

  render() {
    let todoList = <div></div>
    todoList = this.state.getTaskList.map(task => {
      return task.Status && task.Status === "todo" && <div className="card p-2 my-1">
        <a class="close" onClick={() => this.deleteMsg(task, null)}>
          <span aria-hidden="true">&times;</span>
        </a>
        {task.Name}
      </div>
    })
    let inProgressList = <div></div>
    inProgressList = this.state.getTaskList.map(task => {
      return task.Status && task.Status === "inprogress" && <div className="card p-2 my-1">
        <a class="close" onClick={() => this.deleteMsg(task, 'todo')}>
          <span aria-hidden="true">&times;</span>
        </a>
        {task.Name}
      </div>
    })
    let doneList = <div></div>
    doneList = this.state.getTaskList.map(task => {
      return task.Status && task.Status === "done" && <div className="card p-2 my-1">
        <a class="close" onClick={() => this.deleteMsg(task, 'todo')}>
          <span aria-hidden="true">&times;</span>
        </a>
        {task.Name}
      </div>
    })
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card">
                <h5 className="card-header">Sample Application</h5>
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <div className="p-3 border rounded-sm">
                        <h4>To Do</h4>
                        {todoList}
                        <a onClick={() => this.toggleModal('todo')}>+ Add card</a>
                      </div>
                    </div>
                    <div className="col">
                      <div className="p-3 border rounded-sm">
                        <h4>In Progress</h4>
                        {inProgressList}
                        <a onClick={() => this.toggleModal('inprogress')}>+ Add card</a>
                      </div>
                    </div>
                    <div className="col">
                      <div className="p-3 border rounded-sm">
                        <h4>Done</h4>
                        {doneList}
                        <a onClick={() => this.toggleModal('done')}>+ Add card</a>
                      </div>
                    </div>
                    <div className="col">
                      <a onClick={() => this.toggleModal('another')}>+ Add another list</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal isOpen={this.state.msgModal} toggle={this.deleteMsg}>
          <div className="modal-body text-center">
            Do You realy want to Delet Card.
          </div>
          <div className="modal-footer text-right">
            <a className="btn btn-link" onClick={this.deleteMsg}>Cancel</a>
            <button className="btn btn-primary" onClick={this.deletCard}>Ok</button>
          </div>
        </Modal>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
          <div className="modal-header">Add Card</div>
          <div className="modal-body">
            {this.state.selecteGroup === 'another' && (
              <div className="form-group">
                <select name="selecteGroup" className="form-control" id="selecteGroup" onChange={this.handleInputChange}>
                  <option value="">Select Card Group </option>
                  <option value="todo">To Do</option>
                  <option value="inprogress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
            )}
            <input type="text" placeholder="Your Card Name" className="form-control" name="cardName" id="cardName" onChange={this.handleInputChange} />
          </div>
          <div className="modal-footer text-right">
            <a className="btn btn-link" onClick={this.toggleModal}>Cancel</a>
            <button className="btn btn-primary" onClick={this.addCard}>Done</button>
          </div>
        </Modal>
      </>
    );
  }
}

export default Homepage;
