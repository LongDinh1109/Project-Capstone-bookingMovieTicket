import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Grid, makeStyles, TextareaAutosize, Typography, withStyles } from '@material-ui/core';
import defaultCinema from '../../../../../assets/images/defaultCinema.png'
import Rating from '@material-ui/lab/Rating';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { getCinemas, updateCinemas } from '../../../../../store/actions';
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
function AlertDialog(props) {
    //   const [open, setOpen] = useState(props.isOpen);
    //   const handleClickOpen = () => {
    //     setOpen(true);
    //   };
    // useEffect(() => {
    //     props.getUsers()
    // }, []);
    // console.log("first", props.cinema)
    const [notification, setnotification] = useState()

    const onSubmitAction = async () => {
        const { updateCinemas,getCinemas } = props;
        if(props.cinema?.feedbacks){
            const fb = { "feedbacks": [...props.cinema.feedbacks,feedbacks] }
            const newnotification = await updateCinemas(null, fb, props.cinema._id);
            setnotification(newnotification);
            if (newnotification && newnotification.status === 'success') getCinemas();
        }
    }
    const userName = JSON.parse(localStorage.getItem('user'))["name"] ?? "anonymous";
    const classes = useStyles(props);
    const cinema = props.cinema
    const [feedbacks, setFeedback] = useState(
        {
            name: userName,
            rating: null,
            comment: '',
        }
    )
    const [valueRating, setValueRating] = useState(0)
    const handleChange = (field, value) => {
        const newFeedback = { ...feedbacks }
        newFeedback[`${field}`] = value;
        setFeedback(newFeedback)
    }

    const handleClose = () => {
        props.setisOpen(false);
    };

    return (
        <div>
            <Dialog
                open={props.isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Cinema"}
                </DialogTitle>
                <DialogContent>
                    <Grid item style={{ width: '550px' }}>
                        <Card className={classes.root}>
                            <div style={{ textAlign: 'center' }}>
                                <img alt="cinema" className={classes.media} src={cinema?.image} />
                            </div>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2" style={{ fontWeight: 'bold' }}>
                                    {cinema?.name}
                                </Typography>
                                <Typography variant="h6" component="p" style={{ display: 'flex' }}>
                                    Location:
                                    <div style={{ color: 'rgba(255, 255, 255, 0.7)', paddingLeft: 8 }}>
                                        {cinema?.location || ''}
                                    </div>
                                </Typography>
                                <Typography variant="h6" component="p" style={{ display: 'flex' }}>
                                    Price:
                                    <div style={{ color: 'rgba(255, 255, 255, 0.7)', paddingLeft: 8 }}>
                                        {`${cinema?.ticketPrice} $` || '0 $'}
                                    </div>
                                </Typography>
                                <Typography variant="h6" component="p" style={{ display: 'flex' }}>
                                    Seats available:
                                    <div style={{ color: 'rgba(255, 255, 255, 0.7)', paddingLeft: 8 }}>
                                        {cinema?.seatsAvailable || 0}
                                    </div>
                                </Typography>
                                <Rating
                                    name="simple-controlled"
                                    value={cinema?.feedbacks?.rating || 0}
                                    style={{ paddingTop: 8 }}
                                />
                            </CardContent>
                            <CardContent>
                                <DialogTitle >
                                    {"Comments"}
                                </DialogTitle>
                                <TextareaAutosize
                                    aria-label="empty textarea"
                                    placeholder="Empty"
                                    style={{ width: 500, height: 90 }}
                                    onChange={e => { handleChange('comment', e.target.value) }}
                                />
                                <Rating
                                    style={{ paddingTop: 8 }}
                                    value={valueRating}
                                    onChange={(event, newValue) => {
                                        setValueRating(newValue);
                                        handleChange('rating', newValue)
                                    }}
                                />
                                <DialogActions>
                                    <Button onClick={handleClose}>cancel</Button>
                                    <Button onClick={()=>{onSubmitAction();handleClose()}} autoFocus>
                                        save
                                    </Button>
                                </DialogActions>
                            </CardContent>
                            {props.allCinema?.filter(item=> item._id === props.cinema?._id)?.[0]?.feedbacks?.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <CardContent>
                                            <DialogTitle >
                                                {item.name}
                                            </DialogTitle>
                                            <DialogTitle>{item.comment}</DialogTitle>
                                            <Rating
                                                style={{ paddingTop: 8 }}
                                                value={item.rating}
                                            />
                                        </CardContent>
                                    </div>
                                )
                            })}
                        </Card>
                        <DialogActions>
                            <Button onClick={handleClose}>close</Button>
                        </DialogActions>
                    </Grid>
                </DialogContent>

            </Dialog>
        </div>
    );
}

const mapStateToProps = null

const mapDispatchToProps = { getCinemas, updateCinemas };


export default connect(mapStateToProps,
    mapDispatchToProps)((AlertDialog))
