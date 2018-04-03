import React, { Component } from 'react';
import { compose } from 'redux';
import gql from 'graphql-tag';
import _ from 'lodash';
import { Query } from 'react-apollo';

import Navbar from './Navbar';
import Container from './Container';
import Loader from './Loader';

const GET_SCENE = gql`
  query scene($sceneId: ID!) {
    scene(where: {
      id: $sceneId
   }) {
      id
      name
      createdAt
    }
  }
`;

export default class Scene extends Component {
  render() {
    const {
      match: {
        params: {
          sceneId,
        },
      },
    } = this.props;

    return (
      <div>
        <Navbar {...this.props} />
        <Container>
          <Query query={GET_SCENE} variables={{ sceneId }}>
            {({ loading, error, data }) => {
              if (loading) return <Loader />;
              if (error) return `Error! ${error.message}`;

              const {
                scene: {
                  id,
                  name,
                },
              } = data;

              return (
                <div>
                  <h1>
                    Scene
                  </h1>

                  <div>
                    {name} ({id})
                  </div>

                </div>
              );
            }}
          </Query>
        </Container>
      </div>
    );
  }
}
