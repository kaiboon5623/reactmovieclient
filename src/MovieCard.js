//snippet rce
import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';

export class MovieCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      id,
      name,
      description,
      health,
      age,
      height,
      youtubeurl
    } = this.props.assignment;
    return (
      <div>
        <Card>
          {/* <CardImg top width="100%" alt="Card image cap" /> */}
          <CardBody>
            <CardTitle>{name}</CardTitle>
            <CardSubtitle>{id}</CardSubtitle>
            <CardSubtitle>{youtubeurl}</CardSubtitle>
            <CardText>{description}</CardText>

            <Button color="primary" onClick={() => this.props.removehero(id)}>
              Delete
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default MovieCard;
