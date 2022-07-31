import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import BookingRatingCinemas from '../BookingRatingCinemas/BookingRatingCinemas'

import defaultCinema from '../../../../../assets/images/defaultCinema.png'
const useStyles = makeStyles({
  root: {
    width: 'auto'
  },
  media: {
    height: 200,
    maxWidth: '100%'
  },
  container: {
    flexWrap: 'wrap',
  },
  typographyContainer: {
    paddingLeft: 8,
    // paddingTop: 16,
  }
});


export default function BookingCheckout(props) {
  const classes = useStyles(props);
  const [isOpen, setisOpen] = useState(false);
  const [cinemaChosen, setcinemaChosen] = useState();
  const [averageRating, setAverageRating] = useState();

  useEffect(() => {
    console.log("123456", props)
    if (props.currentCinemas.feedbacks.length > 0) {
      let total = 0;
      props.currentCinemas.feedbacks.map((item, _index) => {
        return total += item.rating;
      })
      let average = total / props.currentCinemas.feedbacks.length;
      setAverageRating(average)
    }
  });
  const {
    surroundedCinemas,
    selectedCinema,
    currentCinemas,
  } = props;
  const higherPricesCinemas = currentCinemas && surroundedCinemas && surroundedCinemas.length > 0
    ? surroundedCinemas.filter(higher => higher.ticketPrice > currentCinemas.ticketPrice)
    : []

  const lowerPricesCinemas = currentCinemas && surroundedCinemas && surroundedCinemas.length > 0
    ? surroundedCinemas.filter(lower => lower.ticketPrice <= currentCinemas.ticketPrice)
    : []

  const handleClickOpen = (cinema) => {
    setisOpen(true);
    if (cinema.feedbacks.length > 0) {
      let total = 0;
      cinema.feedbacks.map((item, _index) => {
        return total += item.rating;
      })
      let average = total / cinema.feedbacks.length;
      setAverageRating(average)
    }
    setcinemaChosen(cinema)
  }

  return (
    <Box marginTop={4}>
      <Grid container>
        <Grid item xs={6} md={12}>
          <Grid container spacing={2} className={classes.container}>
            {
              currentCinemas && surroundedCinemas && surroundedCinemas.length > 0 ?
                <>
                  <Typography gutterBottom variant="h4" component="h1" style={{ paddingLeft: 8, width: '100%', display: 'flex', whiteSpace: 'break-spaces' }}>
                    Compare prices and detailed reviews between theaters
                  </Typography>
                  <Typography gutterBottom variant="h4" component="h2" style={{ paddingLeft: 8, width: '100%', display: 'flex', whiteSpace: 'break-spaces' }}>
                    Cinemas with <div style={{ color: '#2AF426' }}>Lower Price</div>
                  </Typography>
                  {
                    lowerPricesCinemas && lowerPricesCinemas.length > 0 ?
                      lowerPricesCinemas.map(cinema =>
                        <Grid item style={{ width: 'calc(1/3 * 100%)' }}>
                          <Card className={classes.root} onClick={() => { handleClickOpen(cinema) }}>
                            <CardActionArea>
                              <div style={{ textAlign: 'center' }}>
                                <img alt="cinema" className={classes.media} src={cinema?.image} />
                              </div>
                              <CardContent>
                                <Typography gutterBottom variant="h5" component="h2" style={{ fontWeight: 'bold' }}>
                                  {cinema.name}
                                </Typography>
                                <Typography variant="h6" component="p" style={{ display: 'flex' }}>
                                  Location:
                                  <div style={{ color: 'rgba(255, 255, 255, 0.7)', paddingLeft: 8 }}>
                                    {cinema.location || ''}
                                  </div>
                                </Typography>
                                <Typography variant="h6" component="p" style={{ display: 'flex' }}>
                                  Price:
                                  <div style={{ color: 'rgba(255, 255, 255, 0.7)', paddingLeft: 8 }}>
                                    {`${cinema.ticketPrice} $` || '0 $'}
                                  </div>
                                </Typography>
                                <Typography variant="h6" component="p" style={{ display: 'flex' }}>
                                  Seats available:
                                  <div style={{ color: 'rgba(255, 255, 255, 0.7)', paddingLeft: 8 }}>
                                    {cinema.seatsAvailable || 0}
                                  </div>
                                </Typography>
                                <Rating
                                  name="simple-controlled"
                                  value={averageRating || 0}
                                  style={{ paddingTop: 8 }}
                                />
                              </CardContent>

                            </CardActionArea>
                          </Card>
                        </Grid>
                      )
                      : <Typography gutterBottom variant="h5" component="h2" style={{ paddingLeft: 8, width: '100%', display: 'flex', whiteSpace: 'break-spaces' }}>
                        There are no cinemas with <div style={{ color: '#2AF426' }}>Lower Price</div>
                      </Typography>
                  }

                  <Typography gutterBottom variant="h4" component="h2" style={{ paddingLeft: 8, width: '100%', display: 'flex', whiteSpace: 'break-spaces' }}>
                    Cinemas with <div style={{ color: '#DB0B0B' }}>Higher Price</div>
                  </Typography>
                  {
                    higherPricesCinemas && higherPricesCinemas.length > 0 ?
                      higherPricesCinemas.map(cinema =>
                        <Grid item style={{ width: 'calc(1/3 * 100%)' }}>
                          <Card className={classes.root} onClick={() => { handleClickOpen(cinema) }}>
                            <CardActionArea>
                              <CardMedia
                                className={classes.media}
                                image={defaultCinema}
                                title="Contemplative Reptile"
                              />
                              <CardContent>
                                <Typography gutterBottom variant="h5" component="h2" style={{ fontWeight: 'bold' }}>
                                  {cinema.name}
                                </Typography>
                                <Typography variant="h6" component="p" style={{ display: 'flex' }}>
                                  Location:
                                  <div style={{ color: 'rgba(255, 255, 255, 0.7)', paddingLeft: 8 }}>
                                    {cinema.location || ''}
                                  </div>
                                </Typography>
                                <Typography variant="h6" component="p" style={{ display: 'flex' }}>
                                  Price:
                                  <div style={{ color: 'rgba(255, 255, 255, 0.7)', paddingLeft: 8 }}>
                                    {`${cinema.ticketPrice} $` || '0 $'}
                                  </div>
                                </Typography>
                                <Typography variant="h6" component="p" style={{ display: 'flex' }}>
                                  Seats available:
                                  <div style={{ color: 'rgba(255, 255, 255, 0.7)', paddingLeft: 8 }}>
                                    {cinema.seatsAvailable || 0}
                                  </div>
                                </Typography>
                                <Rating
                                  name="simple-controlled"
                                  value={cinema?.feedback?.rating || 0}
                                  style={{ paddingTop: 8 }}
                                />
                              </CardContent>

                            </CardActionArea>
                          </Card>
                        </Grid>
                      )
                      : <Typography gutterBottom variant="h5" component="h2" style={{ paddingLeft: 8, width: '100%', display: 'flex', whiteSpace: 'break-spaces' }}>
                        There are no cinemas with <div style={{ color: '#DB0B0B' }}>Higher Price</div>
                      </Typography>
                  }
                </>
                :
                <Typography gutterBottom variant="h4" className={classes.typographyContainer} component="h2">
                  There are no other cinemas in the area
                </Typography>
            }
            <BookingRatingCinemas isOpen={isOpen} setisOpen={setisOpen} cinema={cinemaChosen} allCinema={props.allCinema} averageRating={averageRating} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
