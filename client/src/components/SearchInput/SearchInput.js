import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import styles from './styles';

const SearchInput = props => {
  const { classes, className, onChange, style, searchdisable, ...rest } = props;

  const rootClassName = classNames(classes.root, className);

  return (
    <Fragment>
      {!searchdisable ? (
        <div className={rootClassName} style={style}>
          <SearchIcon className={classes.icon} />
          <Input
            {...rest}
            className={classes.input}
            disableUnderline
            onChange={onChange}
          />
        </div>
      ) : (<Fragment />)}
      </Fragment>)
};

SearchInput.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  style: PropTypes.object
};

SearchInput.defaultProps = {
  onChange: () => { }
};

export default withStyles(styles)(SearchInput);
