import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class NewPostPage extends Component {
  renderTextField(field) {
    return (
      <TextField
        id={`post-${field.label}`}
        label={field.label}
        fullWidth
        rows={10}
        multiline={field.multiline}
        margin='normal'
        {...field.input}
        variant='outlined'
        error={field.meta.touched && !!field.meta.error}
        helperText={field.meta.touched && field.meta.error}
      />
    );
  }
  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }
  render() {
    const { handleSubmit, pristine, invalid, submitting, reset } = this.props;
    return (
      <Box
        maxWidth={650}
        display='flex'
        bgcolor='grey.100'
        boxShadow={20}
        borderRadius={12}
        p={2}
      >
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field name='title' label='Title' component={this.renderTextField} />
          <Field
            name='description'
            label='Description'
            component={this.renderTextField}
          />
          <Field
            name='content'
            label='Content'
            multiline
            component={this.renderTextField}
          />
          <Button
            variant='contained'
            style={{ margin: 5 }}
            color='primary'
            type='submit'
            disabled={invalid || submitting}
          >
            Submit
          </Button>
          <Button
            variant='contained'
            style={{ margin: 5 }}
            type='submit'
            color='secondary'
            disabled={pristine || submitting}
            onClick={reset}
          >
            Cancel
          </Button>
        </form>
      </Box>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Please enter a Title';
  }
  if (!values.description) {
    errors.description = 'Please enter a short Description';
  }
  if (!values.content) {
    errors.content = 'Please enter some content for your Blog Post';
  }

  return errors;
}

export default reduxForm({
  form: 'NewBlogPostForm',
  validate,
})(connect(null, { createPost })(NewPostPage));
