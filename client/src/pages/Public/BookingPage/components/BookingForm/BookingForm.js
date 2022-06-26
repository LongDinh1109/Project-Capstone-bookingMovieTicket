import React from 'react';
import { Grid, Box, TextField, MenuItem, Typography } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

export default function BookingForm(props) {
  const {
    cinemas,
    showtimes,
    selectedCinema,
    selectedCity,
    selectedDistrict,
    onChangeCinema,
    onChangeCity,
    onChangeDistrict,
    selectedDate,
    onChangeDate,
    times,
    selectedTime,
    onChangeTime
  } = props;
  const cities = cinemas
    .map(e=> e.city)
    .filter((value, index, array) => {return array.indexOf(value) === index});
  let citiesDetail = [];
  cities.forEach(city => {
    const district = cinemas
      .map(e=> city === e.city && e.district)
      .filter((value, index, array) => {return array.indexOf(value) === index});
    citiesDetail = [...citiesDetail, {city: city, district: district}]
  });
  // console.log('citiesDetail', cinemas, citiesDetail)
  const showtime = showtimes.find(
    showtime => showtime.cinemaId === selectedCinema
  );

  if (!cinemas.length)
    return (
      <Box
        display="flex"
        width={1}
        height={1}
        alignItems="center"
        justifyContent="center">
        <Typography align="center" variant="h2" color="inherit">
          No Cinema Available.
        </Typography>
      </Box>
    );
  // console.log('detail:', selectedCity, citiesDetail.filter(c => c.city === selectedCity))
  return (
    <Grid container spacing={3}>
      <Grid item xs>
        <TextField
          fullWidth
          select
          value={selectedCity}
          label="Select City"
          variant="outlined"
          onChange={onChangeCity}>
          {citiesDetail.map(city => (
            <MenuItem 
              key={'city_key_' + citiesDetail.indexOf(city)} 
              value={city.city}
              style={{textTransform: 'capitalize'}}
            >
              <div style={{textTransform: 'capitalize'}}>
                {city.city}
              </div>
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      {selectedCity && (<Grid item xs>
        <TextField
          fullWidth
          select
          value={selectedDistrict}
          label="Select District"
          variant="outlined"
          onChange={onChangeDistrict}>
          {citiesDetail.filter(c => c.city === selectedCity)?.[0]?.district?.map(d => d !== false ? (
            <MenuItem 
              key={'district_key_' + d} 
              value={d}
              style={{textTransform: 'capitalize'}}
            >
              <div style={{textTransform: 'capitalize'}}>
                {d}
              </div>
            </MenuItem>
          ): null)}
        </TextField>
      </Grid>)}
      {selectedDistrict && (<Grid item xs>
        <TextField
          fullWidth
          select
          value={selectedCinema}
          label="Select Cinema"
          variant="outlined"
          onChange={onChangeCinema}>
          {cinemas.map(cinema => {
            if (cinema.city === selectedCity && cinema.district === selectedDistrict)
            return (
              <MenuItem key={cinema._id} value={cinema._id}>
                {cinema.name}
              </MenuItem>
            )
            return null
          })}
        </TextField>
      </Grid>)}
      {showtime && (
        <Grid item xs>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              inputVariant="outlined"
              margin="none"
              fullWidth
              id="start-date"
              label="Start Date"
              minDate={new Date(showtime.startDate)}
              maxDate={new Date(showtime.endDate)}
              value={selectedDate}
              onChange={date => onChangeDate(date._d)}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      )}
      {selectedDate && (
        <Grid item xs>
          <TextField
            fullWidth
            select
            value={selectedTime}
            label="Select Time"
            variant="outlined"
            onChange={onChangeTime}>
            {times.map((time, index) => (
              <MenuItem key={time + '-' + index} value={time}>
                {time}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      )}
    </Grid>
  );
}
