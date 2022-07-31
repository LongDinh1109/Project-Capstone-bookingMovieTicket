import React from 'react';
import classnames from 'classnames';
import { Rating } from '@material-ui/lab';
import {
  Box,
  Typography,
  Button,
  makeStyles,
  withStyles,
  Grid
} from '@material-ui/core';
import { textTruncate } from '../../../../utils';
import { Link } from 'react-router-dom';
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import styles from './styles';
import ReactPlayer from 'react-player/youtube';

const useStyles = makeStyles(styles);

const StyledRating = withStyles({
  iconFilled: {
    color: 'transparent'
  },
  iconEmpty: {
    color: 'transparent'
  }
})(Rating);

function MovieBanner(props) {
  const { movie, fullDescription } = props;
  const classes = useStyles(props);
  const movieImage = movie && movie.image
    ? movie.image
    : 'https://source.unsplash.com/featured/?cinema';
  if (!movie) return null;
  console.log(movie.trailer);
  return (
    <div className={classes.movieHero}>
      <div className={classes.infoSection}>
        <header className={classes.movieHeader}>
          <Grid container>
            <Grid item>
              {fullDescription && (
                <Box mb={3} display="flex" alignItems="center" flexWrap="wrap">
                  {movie.genre.split(',').map((genre, index) => (
                    <Typography
                      key={`${genre}-${index}`}
                      className={classes.tag}
                      variant="body1"
                      color="inherit">
                      {genre}
                    </Typography>
                  ))}

                  <StyledRating
                    value={4}
                    readOnly
                    size="small"
                    emptyIcon={<StarBorderIcon fontSize="inherit" />}
                  />
                </Box>
              )}
              <Typography
                className={classes.movieTitle}
                variant="h1"
                color="inherit">
                {movie.title}
              </Typography>
              <Typography
                className={classes.descriptionText}
                variant="body1"
                color="inherit">
                {textTruncate(movie.description, 450)}
              </Typography>
              <Typography className={classes.director} variant="h4" color="inherit">
                By: {movie.director}
              </Typography>
              <Typography
                className={classes.duration}
                variant="body1"
                color="inherit">
                {movie.duration} min
              </Typography>
              <Typography className={classes.genre} variant="body1" color="inherit">
                {movie.genre}
              </Typography>
            </Grid>
            <Grid item sx={{ margin: 8 }}>
            <Typography className={classes.director} variant="h4" color="inherit">
              <ReactPlayer url={`${movie.trailer}`} width={"500px"} height={"300px"}/>
            </Typography>  
            </Grid>
          </Grid>
        </header>
      </div>
      <img
        className={classes.blurBackground}
        // style={{
        //   backgroundImage: `url(${movie.image})`
        // }}
        src={movieImage}
      />
      <div className={classes.movieActions}>
        {fullDescription ? (
          <Link to={`booking/${movie._id}`} style={{ textDecoration: 'none' }}>
            <Button variant="contained" className={classes.button}>
              Buy Tickets
            </Button>
          </Link>
        ) : (
          <Link to={`movie/${movie._id}`} style={{ textDecoration: 'none' }}>
            <Button className={classnames(classes.button, classes.learnMore)}>
              Learn More
              <ArrowRightAlt className={classes.buttonIcon} />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default MovieBanner;
