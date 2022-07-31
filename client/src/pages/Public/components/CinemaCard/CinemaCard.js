import React, { Fragment, useEffect, useState } from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Paper } from '../../../../components';
import { EventSeat, AttachMoney } from '@material-ui/icons';
import BookingRatingCinemas from '../../BookingPage/components/BookingRatingCinemas/BookingRatingCinemas';
import { Rating } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
    paddingBottom: theme.spacing(2),
    cursor: 'pointer'
  },
  imageWrapper: {
    height: '200px',
    margin: '0 auto',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    'object-fit': 'cover'
  },
  details: { padding: theme.spacing(3) },
  name: {
    fontSize: '18px',
    lineHeight: '21px',
    marginTop: theme.spacing(2),
    textTransform: 'capitalize'
  },
  city: {
    lineHeight: '16px',
    height: theme.spacing(4),
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
  },
  stats: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(3)
  },
  eventIcon: {
    color: theme.palette.text.secondary
  },
  eventText: {
    marginLeft: theme.spacing(1),
    color: theme.palette.text.secondary
  }
}));

function CinemaCard(props) {
  const classes = useStyles(props);
  const [isOpen, setisOpen] = useState(false);
  const { className, cinema } = props;
  const cinemaImage =
    cinema && cinema.image
      ? cinema.image
      : 'https://source.unsplash.com/featured/?cinema';

  const rootClassName = classNames(classes.root, className);
  const [averageRating, setAverageRating] = useState();
  useEffect(()=>{
    if (cinema.feedbacks.length > 0) {
      let total = 0;
      cinema.feedbacks.map((item, _index) => {
        return total += item.rating;
      })
      let average = total / cinema.feedbacks.length;
      setAverageRating(average)
    }
  })
  const chosenCinema = () => {
    if (cinema.feedbacks.length > 0) {
      let total = 0;
      cinema.feedbacks.map((item, _index) => {
        return total += item.rating;
      })
      let average = total / cinema.feedbacks.length;
      setAverageRating(average)
    }
    setisOpen(true);
  }
  return (
    <Fragment>
      <Paper className={rootClassName} onClick={chosenCinema}>
        <div className={classes.imageWrapper}>
          <img alt="cinema" className={classes.image} src={cinemaImage} />
        </div>
        <div className={classes.details}>
          <Typography className={classes.name} variant="h4">
            {cinema.name}
          </Typography>
          <Typography className={classes.city} variant="body1">
            {cinema.city}
          </Typography>
          <Rating
            name="simple-controlled"
            value={averageRating || 0}
            style={{ paddingTop: 8 }}
            readOnly
          />
        </div>
        <div className={classes.stats}>
          <AttachMoney className={classes.eventIcon} />
          <Typography className={classes.eventText} variant="body2">
            {cinema.ticketPrice} <span>$</span> per movie
          </Typography>
        </div>
        <div className={classes.stats}>
          <EventSeat className={classes.eventIcon} />
          <Typography className={classes.eventText} variant="body2">
            {cinema.seatsAvailable} seats Available
          </Typography>
        </div>
        {props.rating ? (<BookingRatingCinemas isOpen={isOpen} setisOpen={setisOpen} cinema={cinema} allCinema={props.allCinema} averageRating={averageRating} />) : (<Fragment></Fragment>)}

      </Paper>
    </Fragment>
  );
}

export default CinemaCard;
