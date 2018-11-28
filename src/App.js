import React, { Component } from 'react';
import './App.css';
import MovieCard from './MovieCard';
import axios from 'axios';

import {
  Jumbotron,
  Alert,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  UncontrolledCarousel
} from 'reactstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      alertVisible: false,
      id: '',
      Overwatch: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  //for popup
  onDismiss() {
    this.setState({ alertVisible: false });
  }

  getallheroes = () => {
    axios
      .get('https://mysterious-reaches-89583.herokuapp.com/getallheroes')
      .then(result => {
        this.setState({ Overwatch: result.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getallheroes();
  }

  //for form
  onSubmit = e => {
    e.preventDefault();
    this.setState({ alertVisible: false });

    const query = ` https://mysterious-reaches-89583.herokuapp.com/gethero?id=${
      this.state.id
    }`;

    console.log(query);

    axios
      .get(query)
      .then(result => {
        console.log(result.data);
        if (result.data === 'Not found') {
          this.setState({ alertVisible: true });
        }
        this.getallheroes();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  };

  // for form field
  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  removehero(id) {
    this.setState({
      Overwatch: this.state.Overwatch.filter(assignment => {
        if (assignment.id !== id) return assignment;
      })
    });
    const query = ` https://mysterious-reaches-89583.herokuapp.com/deletehero?id=${id}`;
    axios
      .get(query)
      .then(result => {
        this.getallheroes();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  }

  render() {
    let movieCards = this.state.Overwatch.map(assignment => {
      return (
        <Col sm="4" key={assignment.id}>
          <MovieCard
            removehero={this.removehero.bind(this)}
            assignment={assignment}
          />
        </Col>
      );
    });
    return (
      <div className="App">
        <Container>
          <Jumbotron id="jumboheader">
            <h1 className="display-4">Overwatch Hero</h1>
            <p className="lead">Search for Overwatch Hero</p>
          </Jumbotron>
          <Row>
            <Col>
              <Alert
                color="danger"
                isOpen={this.state.alertVisible}
                toggle={this.onDismiss}
              >
                Hero Not Found
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="id">Enter hero ID</Label>
                  <Input
                    id="id"
                    placeholder="Enter Hero ID"
                    onChange={this.onChange}
                  />
                </FormGroup>
                <Button color="primary">Submit</Button>
              </Form>
            </Col>
          </Row>
          <p />
          <Row>{movieCards}</Row>
        </Container>
      </div>
    );
  }
}

export default App;
