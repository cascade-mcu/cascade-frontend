import React, { Component } from 'react';
import { compose } from 'redux';
import gql from 'graphql-tag';
import _ from 'lodash';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import Navbar from './Navbar';
import Container from './Container';
import Loader from './Loader';
import EmptyDashboard from './EmptyDashboard';

import colors from '../theme/colors';
import step from '../theme/step';

import { reduxForm, Field } from 'redux-form'
import {
  TextField,
} from 'redux-form-material-ui'

const GET_SCENES = gql`
  {
    me {
      id

      defaultLocation {
        id
      }

      locations {
        scenes {
          id
          name
        }
      }
    }
  }
`;

const CREATE_SCENE = gql`
  mutation createScene($locationId: ID!, $name: String!) {
    createScene(
      data: {
        name: $name
        location: {
          connect: {
            id: $locationId
          }
        }
      }
    ) {
      id
    }
  }
`;

class Scenes extends Component {
  handleSuccess(token) {
    this.saveToken(token);
    this.props.history.push('/dashboard');
  }

  async createScene(mutation, formVariables, defaultLocation) {
    await mutation({
      variables: {
        ...formVariables,
        locationId: defaultLocation.id,
      },
    });
  }

  scenes(data) {
    const {
      me: {
        locations,
      },
    } = data;

    return _.flatMap(locations, 'scenes');
  }

  render() {
    const {
      handleSubmit,
    } = this.props;

    return (
      <div>
        <Navbar {...this.props} />

        <Container>
          <Query query={GET_SCENES} fetchPolicy='network-only'>
            {({ loading, error, data }) => {
              if (loading) return <Loader />;

              const {
                me: {
                  defaultLocation,
                },
              } = data;

              return (
                <div style={styles.container}>
                  <div style={styles.centeredContainer}>
                    <div>
                      Scenes
                    </div>

                    {_.map(this.scenes(data), (scene) => {
                      return (
                        <Button component={Link} to={`/scenes/${scene.id}`} key={scene.id} variant='raised' fullWidth>
                          {scene.name}
                        </Button>
                      );
                    })}

                    <Mutation mutation={CREATE_SCENE}>
                      {(createScene, { data, error }) => (
                        <form onSubmit={handleSubmit((formVariables) => this.createScene(createScene, formVariables, defaultLocation))}>
                          {_.get(data, 'createScene.id') && <Redirect to={`/scenes/${data.createScene.id}`} />}
                          <Field name='name' component={TextField} placeholder='Name your scene' />

                          <Button type='submit'>
                            Create a scene
                          </Button>
                        </form>
                      )}
                    </Mutation>
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

const styles = {
  container: {
    backgroundColor: colors.lightGrey,
    minHeight: '500px',
    padding: step(),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredContainer: {
    textAlign: 'center',
  },
};

export default compose(
  reduxForm({
    form: 'create-scene',
  }),
)(Scenes);
