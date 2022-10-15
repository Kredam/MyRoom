import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import Room from 'models/Room';

interface Props {
  rooms: Room[];
  follows: Object | undefined;
}

const RoomCards = ({ rooms }: Props): React.ReactElement => {
  return (
    <>
      {rooms.map((room: Room, key: number) => {
        return (
          <Grid item xs={4} key={key}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia component="img" height="140" image={room.picture} alt={room.name} />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {room.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </>
  );
};

export default RoomCards;
