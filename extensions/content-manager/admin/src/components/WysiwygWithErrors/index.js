import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isFunction } from 'lodash';
import cn from 'classnames';
import styled from 'styled-components';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-build-strapi';

import { Description, ErrorMessage, Label } from '@buffetjs/styles';
import { Error } from '@buffetjs/core';

const Wrapper = styled.div`
  padding-bottom: 2.8rem;
  font-size: 1.3rem;
  font-family: 'Lato';
  label {
    display: block;
    margin-bottom: 1rem;
  }
  &.bordered {
    .editorWrapper {
      border-color: red;
    }
  }
  > div + p {
    width: 100%;
    padding-top: 12px;
    font-size: 1.2rem;
    line-height: normal;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: -9px;
  }
  div,
  pre,
  code {
    ::-webkit-scrollbar {
      height: 5px;
      width: 5px;
      cursor: default;
    }
  }
`;

class Editor extends React.Component {
  render() {
    const {
      onChange,
      name,
      value
    } = this.props;

    return (
      <CKEditor
        editor={ClassicEditor}
        config={{
          fontColor: {
            colors: [
              {
                color: 'hsl(0, 76%, 57%)',
                label: 'Red'
              },
              {
                color: 'hsl(211, 78%, 32%)',
                label: 'Blue'
              },
              {
                color: 'hsl(0, 0%, 100%)',
                label: 'White',
                hasBorder: true
              },
            ]
          },
          fontBackgroundColor: {
            colors: [
              {
                color: 'hsl(0, 76%, 57%)',
                label: 'Red'
              },
              {
                color: 'hsl(211, 78%, 32%)',
                label: 'Blue'
              },
              {
                color: 'hsl(0, 0%, 100%)',
                label: 'White',
                hasBorder: true
              },
            ]
          },
        }}
        data={value}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange({ target: { name, value: data } });
        }}
      />
    );
  }
}

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};

class WysiwygWithErrors extends React.Component {
  render() {
    const {
      autoFocus,
      className,
      deactivateErrorHighlight,
      disabled,
      error: inputError,
      inputClassName,
      inputDescription,
      inputStyle,
      label,
      name,
      onBlur: handleBlur,
      onChange,
      placeholder,
      resetProps,
      style,
      tabIndex,
      validations,
      value,
      ...rest
    } = this.props;

    return (
      <Error inputError={inputError} name={name} type="text" validations={validations}>
        {({ canCheck, onBlur, error, dispatch }) => {
          const hasError = Boolean(error);

          return (
            <Wrapper
              className={`${cn(!isEmpty(className) && className)} ${hasError ? 'bordered' : ''}`}
              style={style}
            >
              <Label htmlFor={name}>{label}</Label>
              <Editor
                {...rest}
                autoFocus={autoFocus}
                className={inputClassName}
                disabled={disabled}
                deactivateErrorHighlight={deactivateErrorHighlight}
                error={hasError}
                name={name}
                onBlur={isFunction(handleBlur) ? handleBlur : onBlur}
                onChange={e => {
                  if (!canCheck) {
                    dispatch({
                      type: 'SET_CHECK',
                    });
                  }

                  dispatch({
                    type: 'SET_ERROR',
                    error: null,
                  });
                  onChange(e);
                }}
                placeholder={placeholder}
                resetProps={resetProps}
                style={inputStyle}
                tabIndex={tabIndex}
                value={value}
              />
              {!hasError && inputDescription && <Description>{inputDescription}</Description>}
              {hasError && <ErrorMessage>{error}</ErrorMessage>}
            </Wrapper>
          );
        }}
      </Error>
    );
  }
}


WysiwygWithErrors.defaultProps = {
  autoFocus: false,
  className: '',
  deactivateErrorHighlight: false,
  didCheckErrors: false,
  disabled: false,
  error: null,
  inputClassName: '',
  inputDescription: '',
  inputStyle: {},
  label: '',
  onBlur: false,
  placeholder: '',
  resetProps: false,
  style: {},
  tabIndex: '0',
  validations: {},
  value: null,
};

WysiwygWithErrors.propTypes = {
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  deactivateErrorHighlight: PropTypes.bool,
  didCheckErrors: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  inputClassName: PropTypes.string,
  inputDescription: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.shape({
      id: PropTypes.string,
      params: PropTypes.object,
    }),
  ]),
  inputStyle: PropTypes.object,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.shape({
      id: PropTypes.string,
      params: PropTypes.object,
    }),
  ]),
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  resetProps: PropTypes.bool,
  style: PropTypes.object,
  tabIndex: PropTypes.string,
  validations: PropTypes.object,
  value: PropTypes.string,
};

export default WysiwygWithErrors;
