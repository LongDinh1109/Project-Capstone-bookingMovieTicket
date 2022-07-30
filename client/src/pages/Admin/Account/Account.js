import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, withStyles } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { AccountProfile, AccountDetails } from './components';
import { uploadImage, getReservations, getMovies, getCinemas } from '../../../store/actions';
import { Portlet, PortletContent } from '../../../components';
import { ReservationsTable, ReservationsToolbar } from '../ReservationList/components';
import ReservationsCalendar from '../ReservationList/components/ReservationsCalendar/ReservationsCalendar';
import { match } from '../../../utils';

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing(4)
  }
});

class Account extends Component {
  state = { image: null,mode: 'list', search: '' };

  static propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
  };

  componentDidMount() {
    const {
      reservations,
      movies,
      cinemas,
      getReservations,
      getMovies,
      getCinemas
    } = this.props;

    if (!reservations.length) getReservations();
    if (!movies.length) getMovies();
    if (!cinemas.length) getCinemas();
  }

  onChangeMode = () =>
    this.setState(({ mode }) => ({ mode: mode === 'grid' ? 'list' : 'grid' }));

  onChangeSearch = e => this.setState({ search: e.target.value });

  render() {
    const { image ,mode, search} = this.state;
    const { classes, user, uploadImage, reservations, movies, cinemas } = this.props;
    console.log("=========",user)
    const filteredReservations = match(search, reservations, 'phone');
    const newRes = filteredReservations.filter(x => x.username == user.username )
    console.log("first",newRes)
    return (
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item lg={4} md={6} xl={4} xs={12}>
            <AccountProfile
              file={image}
              user={user}
              onUpload={event => {
                const file = event.target.files[0];
                this.setState({ image: file });
              }}
            />
          </Grid>
          <Grid item lg={8} md={6} xl={8} xs={12}>
            <AccountDetails
              file={image}
              user={user}
              uploadImage={uploadImage}
            />
          </Grid>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <ReservationsToolbar
              reservations={newRes}
              searchdisable="True"
              onChangeSearch={this.onChangeSearch}
              mode={mode}
              onChangeMode={this.onChangeMode}
            />
            <div className={classes.content}>
              {!newRes.length ? (
                <div className={classes.progressWrapper}>
                  <CircularProgress />
                </div>
              ) : mode === 'list' ? (
                <ReservationsTable
                  reservations={newRes}
                  movies={movies}
                  cinemas={cinemas}
                  reservationUser="True"
                />
              ) : (
                <ReservationsCalendar
                  reservations={newRes}
                  movies={movies}
                  cinemas={cinemas}
                />
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Account.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ reservationState, movieState, cinemaState, authState }) => ({
  user: authState.user,
  reservations: reservationState.reservations,
  movies: movieState.movies,
  cinemas: cinemaState.cinemas
});

const mapDispatchToProps = {
  getReservations,
  getMovies,
  getCinemas,
  uploadImage
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Account)
);
